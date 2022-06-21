import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import { getAllQuestions , saveAnswer2DB } from '../../services/questionService'
import {getResultExam} from '../../services/examService'

class ModalDoExam extends Component {

   constructor(props) {
       super(props);
       this.state = {
           id: '',
           name: '',
           subject: '',
           time: '',
           numberOfQuestion: '',
           impClass: '',
           arrQuestions: []
       }
    }

 async  componentDidMount() {
     let exam = this.props.currExam 

     
     await this.getAllQuestionsFromExam(exam.id)

     if (exam && !_.isEmpty(exam)) {
            this.setState({
                id : exam.id,
                name: exam.name,
                subject: exam.subject,
                time:exam.time,
                numberOfQuestion: exam.numberOfQuestion,
                impClass:exam.impClass,
            })
        }
    }
    getAllQuestionsFromExam = async(examId) => {
        let response = await getAllQuestions(examId)
        let arr = response.questionsList
        if (response && response.errCode === 0) {
           this.setState({
               arrQuestions: arr
           }) 
        }
        
    }
    toggle = () => {
        this.props.toggle()
    } 
    saveAnswer = async(event,data) => {

        const { value, checked } = event.target;

    // console.log(`${value} of question ${data.id} exam ${data.examId} is choose`);
    
        if (checked) {
            data.key = value 
            let  res = await saveAnswer2DB(data)
    //       console.log(res)
        }
    }
    submitExam = async() => {
        console.log(this.state)
        let res = await getResultExam(this.state.id)
        alert(res+'/'+this.state.numberOfQuestion)
    }
    render() {
     
        let STT = []
        for (let i = 0; i < this.state.numberOfQuestion; i++) {
            STT.push(i+1)
        }
        let arrQ = this.state.arrQuestions
        
        return (
                
            <>  {
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
                                            <th scope="col">STT</th>
                                            <th scope="col">Content</th>
                                            <th scope="col">OptionA</th>
                                            <th scope="col">OptionB</th>
                                            <th scope="col">OptionC</th>
                                            <th scope="col">OptionD</th>
                                      
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
                                            <td>{arrQ[index].content}</td>  
                                            <td> <input type='checkbox'  value='A' onClick={(event) => { this.saveAnswer(event,arrQ[index]) }}></input> {arrQ[index].optionA} </td>
                                            <td> <input type='checkbox'  value='B' onClick={(event) => { this.saveAnswer(event,arrQ[index]) }}></input> {arrQ[index].optionB} </td>
                                            <td> <input type='checkbox'  value='C' onClick={(event) => { this.saveAnswer(event,arrQ[index]) }}></input> {arrQ[index].optionC} </td>
                                            <td> <input type='checkbox'  value='D' onClick={(event) => { this.saveAnswer(event,arrQ[index]) }}></input> {arrQ[index].optionD} </td>
                  
                                        </tr>
                                    )
                                })
                            }
                                                                                                                         
                             </tbody>
                            </table>
                        </div>    
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => { this.submitExam() }}>Sumbit</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDoExam);


      