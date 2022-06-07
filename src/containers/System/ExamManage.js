import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllExams, deleteExamSevice, editExamSevice, createNewExamSevice } from '../../services/examSevice'
import {getAllQuestions}  from '../../services/questionSevice'
import ModalEditExam from './ModalEditExam';
import ModalExam from './ModalExam';
import { emitter } from '../../utils/emitter'
import { useHistory } from "react-router-dom";
import history from '../../history';
import ModalQuestion from './ModalQuestion';
import ModalQuestionView from './ModalQuestionView';
import ModalQuestionList from './ModalQuestionList';
    
class ExamManage extends Component {
    // state
   constructor(props) {
       super(props);
       this.state = {
           STT: [],
           arrExams: [],
           arrQuestions:[] ,
           isOpenModalEditExam: false,
           isOpenModalExam : false,
           examEdit: {},
           isOpenModalQuestionList: false,
           isOpenModalEditQuestion: false,
           currentExamFromExamList: {},
           questionEdit : {}
       }
    }

   async componentDidMount() {
       await this.getAllExamsFromReact();
  
    }
/*  life cycle
   * run component
   * 1. run contructor -> init state
   * 2. DidMount ( set state ) -> 
   * 3. render
*/
    
    // toggle
    toggleExamModal = () => {      
      this.setState({
            isOpenModalExam: !this.state.isOpenModalExam
      })         
    } 
    toggleExamEditModal = () => {
        this.setState({
            isOpenModalEditExam: !this.state.isOpenModalEditExam 
      })    
    }
    toggQuestionModal = () => {
        this.setState({
            isOpenModalQuestionList: !this.state.isOpenModalQuestionList
      }) 
    }
    toggleQuestionEditModal = () => {
        this.setState({
            isOpenModalEditQuestion: !this.state.isOpenModalEditQuestion,
            isOpenModalQuestionList: !this.state.isOpenModalQuestionList
      }) 
    }

    // exam 
    getAllExamsFromReact = async() => {
        let response = await getAllExams('ALL')
       if (response && response.errCode === 0) {
           this.setState({
               arrExams: response.exams
           }) 
       }
    }
    handlerAddNewExam = () => {
        this.setState({
           isOpenModalExam: true,
        })
    
    }
    createNewExam =async (data) => {
        
        try {
            let response = await createNewExamSevice(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                // eslint-disable-next-line no-undef
                await this.getAllExamsFromReact();
                this.setState({
                    isOpenModalExam : false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }        
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteExam = async(exam) => {
        try {
            let res = await deleteExamSevice(exam.id)
            if (res && res.errCode === 0) {
                await this.getAllExamsFromReact();
            } else {
                alert(res.errMessage)
            }

        } catch (e) {
            console.log(e)
        }
    }
    handleEditExam = (exam) => {
        this.setState({
            isOpenModalEditExam: true,
            examEdit : exam
        })
    }
    handleDowloadExam=(exam) => {
         alert('hihihi')

    }
    handleViewExam = async(exam) => { 
        
        let arr = []
        let length = exam.numberOfQuestion
       // await this.getAllExamsFromReact(exam.id)      
        for (let i = 0; i < length; i++){
            arr.push(i+1)
        }
        this.setState({
                isOpenModalQuestionList: !this.state.isOpenModalQuestionList ,
                currentExamFromExamList: exam,
                STT: arr             
        })
    }
    doEditExam = async (exam) => {
        try {
            let res = await editExamSevice(exam)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditExam: false 
                    
                })
                await this.getAllExamsFromReact()
            } else {
                alert (res.errCode)
            }
           
        } catch (e) {
            console.log(e)
        }
    }
    // Question

    editQuestion = () => {

        this.setState({
          //  isOpenModalEditQuestion: false ,
            isOpenModalQuestionList : !this.state.isOpenModalQuestionList
        })
    }
   /* doEditQuestion = async(question) => {
        try {
            let res = await editExamSevice(question)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditQuestion: false 
                    
                })
                await this.getAllQuestionsFromExam()
            } else {
                alert (res.errCode)
            }
           
        } catch (e) {
            console.log(e)
        }
    } */
    render() {
        //console.log('exam question', this.state.currentExamFromExamList.id)
        //console.log('exam edit', this.state.examEdit)
        let arrExams = this.state.arrExams
        let curEx = this.state.currentExamFromExamList
        //console.log('check1 ', this.state.arrQuestions)
        return (
            <div className="Exam-container">
                <ModalExam  
                    isOpen={this.state.isOpenModalExam}
                    toggleExamModal={this.toggleExamModal}
                    createNewExam ={this.createNewExam}
                />
                {
                    this.state.isOpenModalEditExam &&
                    <ModalEditExam
                        isOpen={this.state.isOpenModalEditExam}
                        toggleExamEditModal={this.toggleExamEditModal}
                        currentExam={this.state.examEdit}
                        editExam ={this.doEditExam}
                    />

                }
                {   
                    this.state.isOpenModalQuestionList &&
                    <ModalQuestionList
                        isOpen={this.state.isOpenModalQuestionList}
                        toggleQuestionModal={this.toggQuestionModal}
                        editQuestion={this.editQuestion}
                        getCurrentExam={this.state.currentExamFromExamList}
                        STT={this.state.STT}
                    />
                }
                {
        /*            this.state.isOpenModalEditQuestion &&
                    <ModalQuestionView
                        isOpen={this.state.isOpenModalEditQuestion}
                        toggleQuestionEditModal={this.toggleQuestionEditModal}
                        editQuestion={this.doEditQuestion}
                        currentQuestion = {this.state.questionEdit} 
                    /> */
                }

                <div className='title text-center'>Manage Exam</div>
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
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Time</th>
                            <th scope="col">NumberOfQuestion</th>
                            <th scope="col">ImpClass</th>
                            <th scope="col">CreateAt</th>
                            <th scope="col">UpdateAt</th>
                            <th scope="col">Actions</th>
                        </tr>
                        
                            {
                                arrExams && arrExams.map((item, index) => {
                               // console.log('check map ',item,index)
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.name} </td>
                                            <td>{item.subject} </td>
                                            <td>{item.time} </td>
                                            <td>{item.numberOfQuestion} </td>
                                            <td>{item.impClass} </td>
                                            <td>{item.createdAt} </td>
                                            <td>{item.updatedAt} </td>
                                            <td>
                                                <button className='btn-edit' onClick={() => { this.handleEditExam(item) }}><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' onClick={() => { this.handleDeleteExam(item) }}><i className='fas fa-trash-alt'></i></button>
                                                <button className='btn-view' onClick={() => { this.handleViewExam(item) }}><i className='far fa-eye'></i></button>
                                                <button className='btn-download' onClick={() => { this.handleDowloadExam(item) }}><i className='fas fa-sign-out-alt'></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ExamManage);

