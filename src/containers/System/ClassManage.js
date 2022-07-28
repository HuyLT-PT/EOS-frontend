import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllClasses } from '../../services/classService'
import ModalStudentList from './ModalStudentList';
import { getAllStudents } from '../../services/userService'
import { getAllExams } from '../../services/examService';
import ModalExamList from './ModalExamList';
import { Arc } from '@progress/kendo-drawing';
class ClassManage extends Component {

   constructor(props) {
       super(props);
       this.state = {
           arrClass: [],
           isOpenModalStudentList: false,
           isOpenModalExamList:false,
           arrStudents: {},
           arrExam :{},
           STT1: [],
           STT2: [],
           arrTeacher: [],
           countS: [],
           countE: [],
           std: [],
           studentId:''
       }
    }

async  componentDidMount() {
    await this.getAllClassesFromReact()
    await this.getAllStudents()
   
    }
    getAllStudents = async () => {
        let res = await getAllStudents('ALL')
        let arr = []
        let sclass = this.props.userInfo.class
        if (sclass === null) {
            this.setState({
            std:res.users
            })
        } else {
            let t= res.users
        for (let i = 0; i < t.length; i++){
            if(t[i].class===sclass){arr.push(t[i])}
        }
        this.setState({
            std:arr
        })
        }
        
    }
    getAllClassesFromReact = async () => {
        
        
        let response = await getAllClasses('ALL')
       
       if (response && response.errCode === 0) {
           this.setState({
               arrClass: response.classes,
               arrTeacher: response.teacher,
               countS: response.students,
               countE :response.exams
           }) 
        }
        let arrC = this.state.arrClass
        
        let arrS = this.state.countS
        let arrE = this.state.countE
        arrC&&arrC.map((index1, item1) => {
            arrS && arrS.map((index2, item2) => {
              
                    if (index1.name === index2.class) {
                       index1.numberOfStudent = index1.numberOfStudent+1 
                    }  
                                
            })
        })
        
        arrC&&arrC.map((index1, item1) => {
            arrE && arrE.map((index2, item2) => {
                   if (index1.name === index2.impClass) {
                       index1.examImp = index1.examImp+1 
                    }          
                            
            })
        })
   
        this.setState({
            arrClass : arrC
        })
    }
    toggleStudentListModal = ()=>{
        this.setState({
            isOpenModalStudentList : !this.state.isOpenModalStudentList
        })
    }
    toggleExamListModal = () => {
           this.setState({
            isOpenModalExamList : !this.state.isOpenModalExamList
        })
    }
 
    handleViewStudent = async(data) => {
        
        let arr = await getAllStudents(data.id) 


        let stt =[]
        for (let i = 0; i < arr.users.length; i++){
                stt.push(i+1)
        } 
        
        this.setState({
            isOpenModalStudentList: true,
            arrStudents: arr,
            STT1: stt,
            class1 : data.name,
        })
    }
    handleViewStudentInfo = async(data) => {
        alert('update soon')
    }

    handleViewExam = async (data) => {
        let arr = await getAllExams(data.id)
        let stt =[]
        for (let i = 0; i < arr.data.length; i++){
                stt.push(i+1)
        } 
        this.setState({
            isOpenModalExamList: true,
            arrExam: arr,
            STT2: stt,
            class2:data.name
        })
    }
    handleViewExamInfo = async (data) => {
  
       this.setState({
           isOpenModalExamList: true,
           studentId: data.id
        })
    }
    
    render() {

        let t = this.props.userInfo.class
        
        let test = []
        if (t === '12A1') { test.id = 1 }
        if (t === '12A2') { test.id = 2 }
        if (t === '12A3') { test.id = 3 }
        if (t === '12A4') { test.id = 4 }
        if (t === '12A5') { test.id = 5 }
       
        
        
        let arrC = this.state.arrClass
        let arrT = this.state.arrTeacher
        let arr = ''
        arrT&&arrT.map((index1, item1) => {
            arrC && arrC.map((index2, item2) => {
                                
                    if (index1.id === index2.teacherId) {
                        index2.teacher = index1.firstName + ' ' + index1.lastName
                    }              
            })
        })
        if (t===null) {arr =arrC}
        for (let i = 0; i < arrC.length; i++){
            if (arrC[i].name === t) {
                arr = [arrC[i]]
            }
        }
        let std = this.state.std
      
        return (
            
            <>
                {   this.state.isOpenModalStudentList&&
                    <ModalStudentList
                        isOpen={this.state.isOpenModalStudentList}
                        toggle={this.toggleStudentListModal}
                        arrStudents={this.state.arrStudents}
                        STT={this.state.STT1}
                        Class = { this.state.class1}
                    />            
                }
                {   this.state.isOpenModalExamList&&
                    <ModalExamList
                        isOpen={this.state.isOpenModalExamList}
                        toggle={this.toggleExamListModal}
                        arrExam={this.state.arrExam}
                        STT={this.state.STT2}
                        class={this.state.class2}
                        classId={test.id}
                        stdId={this.state.studentId}
                       
                    />            
                }
               <div className="Exam-container">
                <div className='title text-center'>Manage Class</div>
                <div className='mx-1'>
                
                        <button className='btn btn-primary px-3'
                            
                            onClick={() => { this.handleViewStudent(test) }}
                        >
                   
                        Student List
                    </button>
                </div>
                <div className='Exam-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Class</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                             <th scope="col">DateOfBirth</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Address</th>
                            <th scope="col">PhoneNumber</th>
                            <th scope="col">Info</th>
                        </tr>
                        {
                                std && std.map((item, index) => {


                              
                                    return (
                                        <tr>
                                            <td>{index+1} </td>
                                            <td>{item.email} </td>
                                            <td>{item.class} </td>
                                            <td>{item.firstName} </td>
                                            <td>{item.lastName} </td>
                                            <td>{item.dateOfBirth}</td>
                                            <td>{item.gender?'FeMale':'Male'} </td>
                                            <td>{item.address} </td>
                                            <td>{item.phoneNumber} </td>
                                            <td>
                                                <button className='btn-view' onClick= { ()=>{this.handleViewStudentInfo(item)}}><i className='fas fa-users'></i></button>
                                                <button className='btn-edit' onClick= { ()=>{this.handleViewExamInfo(item)}}><i className='fas fa-file'></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassManage);


      