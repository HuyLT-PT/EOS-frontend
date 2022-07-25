import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllExams, deleteExamService, editExamService, createNewExamService } from '../../services/examService'
import ModalEditExam from './ModalEditExam';
import ModalExam from './ModalExam';
import { emitter } from '../../utils/emitter'
import { useHistory } from "react-router-dom";
import history from '../../history';
import ModalQuestion from './ModalQuestion';
import ModalQuestionView from './ModalQuestionView';
import ModalQuestionList from './ModalQuestionList';
import ModalDownload  from './ModalDownload';
import { applyMiddleware } from 'redux';
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
           questionEdit: {} ,
           examForDownLoad: {},
           isOpenModalDownload :  false
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
    toggleDownloadModal = () => {
        this.setState({
            isOpenModalDownload: !this.state.isOpenModalDownload
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
               arrExams: response.data
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
            let response = await createNewExamService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
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
            let res = await deleteExamService(exam.id)
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
        let arr = exam
        this.setState({
            isOpenModalDownload: !this.state.isOpenModalDownload ,
            examForDownLoad : arr
            
        })
    }
    handleDowload = (exam) => {
        alert('choose')
    }
    handleViewExam = async(exam) => {        
        let arr = []
        let length = exam.numberOfQuestion
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
        console.log(exam)
        try {
            let res = await editExamService(exam)
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
            isOpenModalQuestionList : !this.state.isOpenModalQuestionList
        })
    }
    render() {
        let arrExams = this.state.arrExams
        let curEx = this.state.currentExamFromExamList
        
        let arr =[]
        let t = this.props.userInfo.class
        if (t === null) { arr = arrExams }
        for (let i = 0; i < arrExams.length; i++){
            if (arrExams[i].impClass === t) {
               arr.push(arrExams[i])
            }
        }
        console.log(arr)
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
                   this.state.isOpenModalDownload &&
                    <ModalDownload
                        isOpen={this.state.isOpenModalDownload}
                        toggleDownloadModal={this.toggleDownloadModal} 
                        examForDownLoad ={this.state.examForDownLoad}
                    /> 
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
                            <th scope="col">Status</th>
                            <th scope="col">CreateAt</th>
                            <th scope="col">UpdateAt</th>
                            <th scope="col">Actions</th>
                        </tr>
                        
                            {
                                arr && arr.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.name} </td>
                                            <td>{item.subject} </td>
                                            <td>{item.time} </td>
                                            <td>{item.numberOfQuestion} </td>
                                            <td>{item.impClass} </td>
                                            <td>{item.status} </td>
                                            <td>{item.createdAt} </td>
                                            <td>{item.updatedAt} </td>
                                            <td>
                                                <button className='btn-edit' onClick={() => { this.handleEditExam(item) }}><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' onClick={() => { this.handleDeleteExam(item) }}><i className='fas fa-trash-alt'></i></button>
                                                <button className='btn-view' onClick={() => { this.handleViewExam(item) }}><i className='far fa-eye'></i></button>
                                                <button className='btn-download' onClick={() => { this.handleDowloadExam(item) }}><i className='fas fa-sign-out-alt'></i></button>
                                                <button className='btn-download' onClick={() => { this.handleDowload(item) }}><a href='https://drive.google.com/file/d/1YGknZQx8t4i-aspKFXr8HH5fIDNs47aR/view' > <i className='fas fa-sign-out-alt'/></a></button>
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
                userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamManage);

