import React, { Component,useState,useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllExams,getAnswerFromStudent,getResultExam } from '../../services/examService';
import { Link } from 'react-router-dom';
import ModalConfirm from '../System/ModalConfirm'
import ModalDoExam from './ModalDoExam';
import ModalShowTime from './ModalShowTime'


function formatDate(date) {
  const hour =`0${date.getHours()}`.slice(-2)
  const min = `0${date.getMinutes()}`.slice(-2)
  const sec = `0${date.getSeconds()}`.slice(-2)
  return `${ hour }: ${ min } : ${ sec }`
  
}

class StudentExam extends Component {
   
   constructor(props) {
       super(props);
       this.state = {
           isOpenModalDoExam: false,
           isOpenModalDoExamForStudent:false,
           countE: [],
           arrExam:[] ,
           classIdOfStudent: 1,
           isOpen: new Array(20).fill(true),
           point: new Array(20).fill(0),
           time4s: '',
           isOpenModalShowTime: '',
           timeStart :''
       }
    }

    async componentDidMount() {
        await this.getAllClassesForStudent()
        await this.getExamResult()
        


         
    }
    getExamResult = async () => {
        let arr = []
        let t = this.props.userInfo.class
        let userId = this.props.userInfo.id
        let arrE =this.state.countE 
        if (t === null) { arr = arrE }
        for (let i = 0; i < arrE.length; i++){
            if (arrE[i].impClass === t) {
               arr.push(arrE[i])
            }
        }
        let arr1 = this.state.point
        let arr2 = this.state.isOpen
         for (let i = 0; i < arr.length; i++){
             let examId = arr[i].id
             let point = await getResultExam(examId, userId)

             if (point === -1) {
                 
             } else {
                 arr1[i] = point
                 arr2[i] = false
                 this.setState({
            
                     isOpen: arr2,
                     point: arr1
                 })
             }
        }

       
        
    } 
    getAllClassesForStudent   = async() => {
        let response = await getAllExams('ALL')
    
       if (response && response.errCode === 0) {
           this.setState({
               countE : response.data
           }) 
        }
    }
    handleDoExam = (data) => {
        //console.log(data)
        if (data.status !== 'In-progress' || this.state.isOpen[data.id-1] === false) {
            alert('Incomplete Exam or You completed this exam')
        } else {
            this.setState({
                isOpenModalDoExam: true,
                arrExam: data
            })
        }
    }
    handleOpenExam = () => {
        const now = Date.parse(new Date())
    
        let time = this.state.arrExam.time*60*1000
         
        let end = now + time

        end = new Date(end) 
        
     
        let timeEnd = formatDate(end)
        let user = this.props.userInfo
        let exam = this.state.arrExam.id
     
       
      
        let timefors = localStorage.getItem(`user${user.id}exam${exam}`)
        
        if (timefors) {
            console.log(' k lưu nữa đâu')
        } else {
            localStorage.setItem(`user${user.id}exam${exam}`, end)
        }
        this.setState({
            isOpenModalDoExam: false,
            isOpenModalDoExamForStudent: true,
            isOpenModalShowTime: true,
           
        })

        
    }
    toggle = () => {
        this.setState({
            isOpenModalDoExam: !this.state.isOpenModalDoExam,
            
        })
    }
    toggleTwo = () => {
        this.setState({
            isOpenModalDoExamForStudent: !this.state.isOpenModalDoExamForStudent,
            isOpenModalShowTime: !this.state.isOpenModalShowTime,
        })
    }
    toggle3 = () => {
        this.setState({
            isOpenModalShowTime: !this.state.isOpenModalShowTime,
          
        })
    }
    checkPoint = (data) => {
        let arrP = this.state.point
        let arrC = this.state.isOpen
        let id = this.state.arrExam.id
        
        arrC[id - 1] = false
        arrP[id-1] = data
        
        this.setState({
            isOpenModalDoExamForStudent: false,
            isOpen: arrC,
            point: arrP
        })
    }
    render() {
       
    
        let arrE = this.state.countE
        let arr = []
        let t = this.props.userInfo.class
        if (t === null) { arr = arrE }
        for (let i = 0; i < arrE.length; i++){
            if (arrE[i].impClass === t) {
               arr.push(arrE[i])
            }
        }
      
        return (
            
        
            <>  
                <div className='elm' >
                    <div className='elm1' >

                    </div>
                    <div className='elm2 '>
                {   this.state.isOpenModalDoExam&&
                    <ModalConfirm
                        isOpen={this.state.isOpenModalDoExam}
                        toggle={this.toggle}
                        currE={this.state.arrExam}
                        handleOpenExam={this.handleOpenExam}
                        
                    />
                

                }
                    </div>
                    <div className='elm3'>
                {   this.state.isOpenModalDoExamForStudent&&
                    <ModalDoExam
                        isOpen={this.state.isOpenModalDoExamForStudent}
                        toggle={this.toggleTwo}
                        currExam={this.state.arrExam}
                        checkPoint={this.checkPoint}                     
                    />


                        }
                </div>
            </div>
            <div className="Student-Exam-container">
                <div className='title text-center'>Student Exam</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={()=>this.handlerAddNewExam()}>
                        <i className='fas fa-plus'></i>
                        Add Exam
                    </button>
                </div>
                <div className='Exam-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Name</th>
                            <th scope="col">class</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Time</th>
                            <th scope="col">NumberOfQuestion</th>
                            <th scope="col">Status</th>  
                            <th scope='col'>Point</th> 
                            <th scope="col">Actions</th>    
                                   
                        </tr>
                        
                            {
                               
                                arr && arr.map((item, index) => {                  
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.name} </td>
                                            <td>{item.impClass} </td>
                                            <td>{item.subject} </td>
                                            <td>{item.time} </td>
                                            <td>{item.numberOfQuestion}</td>
                                            <td>{item.status}</td>
                                            <td>{this.state.isOpen[index]===true? 'Not yet exam':` ${this.state.point[index]+ '/'+ item.numberOfQuestion} `}</td>
                                             <td>
                                                <button className='btn-view' onClick={() => { this.handleDoExam(item) }}><i className='fas fa-file'></i></button>
                                                
                                            </td>
                                        </tr>
                                        
                                    )
                                })
    
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentExam);
