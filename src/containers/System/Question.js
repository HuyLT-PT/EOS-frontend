import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import {getAllQuestions}  from '../../services/questionService'
import { getAllExams, deleteExamService, editExamService, createNewExamService } from '../../services/examService'
class Question extends Component {

   constructor(props) {
       super(props);
       this.state = {
            arrQuestions :[] ,
       }
    }

 async  componentDidMount() {
      
     await this.getAllQuestionsFromExam() 
    }

    getAllQuestionsFromExam = async() => {
        let response = await getAllQuestions(1)

       if (response && response.errCode === 0) {
           this.setState({
               arrQuestions: response.questionsList
           }) 
        }
    }
    render() {
        let arr = this.state.arrQuestions
        let arrT = []
        for (let i = 0; i < 50; i++){
            arrT.push(i+1)
        }
     
        return (
            <>
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
                                        arrT && arrT.map((item, index) => {
                                           // console.log ('check index ',arrQ[index])
                        

                                    return (
                                        <tr>
                                            <td>{item}</td>
                                            
                                        </tr>
                                    )
                                })
                            }
                                                                                                                         
                               </tbody>
                            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Question);


      