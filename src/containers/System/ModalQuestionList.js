import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import { getAllQuestions , editQuestionService, getAllQuestionsForTeacher } from '../../services/questionService'
import ModalQuestionView from './ModalQuestionView';

class ModalQuestionList extends Component {

   constructor(props) {
       super(props);
       this.state = {
           // exam 
           id: '',  
           name: '',
           subject: '',
           time: '',
           numberOfQuestion: '',
           impClass: '',
            //question
           arrQuestions: [],
           questionEdit: [],
           isOpenModalEditQuestion: false ,
           // other
           STT: [],
          
       }
    }

 async  componentDidMount() {
     let exam = this.props.getCurrentExam

    await this.getAllQuestonsFromExam(exam.id)

        let arr = this.props.STT
        if (exam && !_.isEmpty(exam)) {
            this.setState({
                STT : arr,
                id : exam.id,
                name: exam.name,
                subject: exam.subject,
                time:exam.time,
                numberOfQuestion: exam.numberOfQuestion,
                impClass:exam.impClass,
            })
        }
    }

    toggle = () => {
        this.props.toggleQuestionModal()
    } 
    toggleQuestionEditModal = () => {
        
       this.setState({
           isOpenModalEditQuestion: !this.state.isOpenModalEditQuestion,
     }) 
    }
    handleViewQuestion = (question) => {
        let arr = question
        
        if (arr === {}) {
            
        }
       // console.log(question)
       //console.log( 'check question',question)
       this.setState({
            isOpenModalEditQuestion: true,
            questionEdit : arr
       })   
       
    }

    getAllQuestonsFromExam = async(examId) => {
        let response = await getAllQuestionsForTeacher(examId)
        let arr = response.data

        // console.log(response)
       if (response && response.errCode === 0) {
           this.setState({
               arrQuestions: arr
           }) 
       }
    }

    doEditQuestion = async(question) => {
        try {
 
            let arr = question.arrKey
            question.key = ''
                if (arr[0] === true) { question.key = question.key + 'A'}
                if (arr[1] === true) { question.key = question.key + 'B'}
                if (arr[2] === true) { question.key = question.key + 'C'}
                if (arr[3] === true) { question.key = question.key + 'D'}
          
      
            let res = await editQuestionService(question)
            
            if (res.errCode === 0) {
                this.setState({
                    isOpenModalEditQuestion: false                    
                })
              
                await this.getAllQuestonsFromExam(this.state.id)
            } else {
                alert (res.errCode)
            }
           
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        let STT = this.state.STT
        let arrQ = this.state.arrQuestions
        let q = this.state.questionEdit
       // console.log('Check state q', this.props)
        return (
                
            <>  {
                    this.state.isOpenModalEditQuestion &&
                    <ModalQuestionView
                        isOpen={this.state.isOpenModalEditQuestion}
                        toggleQuestionEditModal={this.toggleQuestionEditModal}
                        editQuestion={this.doEditQuestion}
                        currentQuestion={this.state.questionEdit} 
                        examId = {this.state.id}
                    
                    /> 
                }
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Question List</ModalHeader>
                    <ModalBody>
                        
                         <div className='Exam-table mt-3 mx-1'>
                                <table id="customers">
                                <tbody>
                          
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Exam Name</th>
                                            <th scope="col">Subject</th>
                                            <th scope="col">Content</th>
                                            <th scope="col">Answer</th>
                                            <th scope="col">Actions</th>
                                     </tr>      
                            {
                                        STT && STT.map((item, index) => {
                                           // console.log ('check index ',arrQ[index])
                                            if (arrQ[index] === undefined) {
                                                arrQ[index] = {}
                                            }

                                    return (
                                        <tr>
                                            <td>{item}</td>
                                            <td>{this.state.id} - { this.state.name}</td>
                                            <td>{this.state.subject}</td>
                                            <td>{arrQ[index].content}</td>  
                                            <td>{arrQ[index].key }</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => { this.handleViewQuestion(arrQ[index]) }}><i className='fas fa-pencil-alt'></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                                                                                                                         
                               </tbody>
                            </table>
                        </div>    
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => { this.toggle() }}>Save</Button>{' '}
                        <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalQuestionList);


      