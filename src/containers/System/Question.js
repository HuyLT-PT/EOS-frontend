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
            arrExams: [],
       }
    }

 async  componentDidMount() {
    
     await this.getAllExamsFromReact()  
     await this.getAllQuestionsFromExam() 
    }
    getAllExamsFromReact = async() => {
        let response = await getAllExams('ALL')
       // console.log('test1', response )
       if (response && response.errCode === 0) {
           this.setState({
               arrExams: response.exams
           }) 
        }
      //  console.log('check 1.5',this.state.arrExams)
    }
    getAllQuestionsFromExam = async() => {
        let response = await getAllQuestions('ALL')
      //  console.log('test2', response )
       if (response && response.errCode === 0) {
           this.setState({
               arrQuestions: response.questionsList
           }) 
        }
     //   console.log('check 2.5',this.state.arrQuestions)
    }
    render() {

        return (
            
            <>
                hello                  
                 
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


      