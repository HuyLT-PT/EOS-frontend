import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllExams } from '../../services/examService';
import { Link } from 'react-router-dom';
import ModalConfirm from '../System/ModalConfirm'
import ModalDoExam from './ModalDoExam';
class StudentExam extends Component {

   constructor(props) {
       super(props);
       this.state = {
           isOpenModalDoExam: false,
           isOpenModalDoExamForStudent:false,
           countE: [],
           arrExam:[] ,
           classIdOfStudent : 1
       }
    }

    async componentDidMount() {
     await this.getAllClassesForStudent()
    }

    getAllClassesForStudent   = async() => {
        let response = await getAllExams(this.state.classIdOfStudent)
    
       if (response && response.errCode === 0) {
           this.setState({
               countE : response.exams
           }) 
        }
    }
    handleDoExam = (data) => {
        //console.log(data)
        if (data.status === null) {
            alert('Incomplete Exam')
        } else {
            this.setState({
                isOpenModalDoExam: true,
                arrExam: data
            })
        }
    }
    handleOpenExam = () => {
        this.setState({
            isOpenModalDoExam: false,
            isOpenModalDoExamForStudent: true
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
          
        })
    }
    render() {

        let arrE = this.state.countE

        return (
            
        
            <>
                {   this.state.isOpenModalDoExam&&
                    <ModalConfirm
                        isOpen={this.state.isOpenModalDoExam}
                        toggle={this.toggle}
                        currE={this.state.arrExam}
                        handleOpenExam = {this.handleOpenExam}
                    />

                }

                {   this.state.isOpenModalDoExamForStudent&&
                    <ModalDoExam
                        isOpen={this.state.isOpenModalDoExamForStudent}
                        toggle={this.toggleTwo}
                        currExam ={ this.state.arrExam}
                    />


                }
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
                            <th scope="col">Subject</th>
                            <th scope="col">Time</th>
                            <th scope="col">NumberOfQuestion</th>
                            <th scope="col">Status</th>  
                            <th scope="col">Actions</th>      
                        </tr>
                        
                            {
                               
                                arrE && arrE.map((item, index) => {


                                     
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.name} </td>
                                            <td>{item.subject} </td>
                                            <td>{item.time} </td>
                                            <td>{item.numberOfQuestion}</td>
                                            <td>{item.status}</td>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentExam);
