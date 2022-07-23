import React, { Component, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import { getAllQuestions , saveAnswer2DB } from '../../services/questionService'
import {getResultExam,getAnswerFromStudent,saveExam,uploadImgForExamAns} from '../../services/examService'
import {Example} from './Example'
import { assignUniqueKeysToParts } from 'react-intl/src/utils';

function test() {
    let t = Date.parse(new Date())

    let d = Date.parse(localStorage.getItem('user1exam2'))
    


    if(t<d) { return true}else{return false}
}
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
           arrQuestions: [],
           ans: [false , false, false, false],
           studentAns: [],
           test : Array(50).fill(0).map(row => new Array(4).fill(false))
       }
    }
    
 async  componentDidMount() {
     let exam = this.props.currExam 

     let t = setInterval( async() => { 
         
        let x= test()
         
        
        
         if (x === true) { } else {
             clearInterval(t) 
             await this.submitExam()
                
         }
         
     }, 1000);
     
     await this.getAllQuestionsFromExam(exam.id)

     if (exam && !_.isEmpty(exam)) {
            this.setState({
                id : exam.id,
                name: exam.name,
                subject: exam.subject,
                time:exam.time,
                numberOfQuestion: exam.numberOfQuestion,
                impClass: exam.impClass,
          
            })
     }
    
      await this.getAnswer()
     
     // test APi
    /* let data = { examId: 3, studentId: 3 }
     
     let test = await uploadImgForExamAns(data)
     console.log(data)*/
            
            
    }
    getAllQuestionsFromExam = async(examId) => {
        let response = await getAllQuestions(examId)
        let arr = response.data
        if (response && response.errCode === 0) {
           this.setState({
               arrQuestions: arr
           }) 
        }
        
    }
    toggle = () => {
        this.props.toggle()
    } 
    saveAnswer = async(event,data,option,index) => {
        data.key = ''
        const { value, checked } = event.target;
        let arr = this.state.test[index]
        let c = ' '
        let ans = this.state.studentAns
        for (let i = 0; i < ans.length; i++){
            if (ans[i].questionId === data.id) {
                c= ans[i].studentAnswer
            }
        }
         
            if (c === 'A') { arr[0] = true }
            if (c === 'B') { arr[1] = true }
            if (c === 'C') { arr[2] = true }
            if (c === 'D') { arr[3] = true }
        
        if (checked) {
             arr[option] = true 
            
                    
        }  else {
            arr[option] = false
         
        }
     
     
         
        let key = ''
                if (arr[0] === true) { key = key + 'A'}
                if (arr[1] === true) { key = key + 'B'}
                if (arr[2] === true) { key = key + 'C'}
                if (arr[3] === true) { key = key + 'D'}
        data.key = key  

        

        let res = await saveAnswer2DB(data) 
        
     
    
    }
    submitExam = async () => {
        let res = await getResultExam(this.state.id)
        let data = {}
        data.examId = this.state.id
        data.studentId = this.props.userInfo.id
        data.data = this.state.studentAns
       
         let save = await saveExam(data)
        alert(res + '/' + this.state.numberOfQuestion)
        this.props.checkPoint(res)
    }
    getAnswer = async () => {
       
        let ans = await getAnswerFromStudent(this.state.id) 
       
        this.setState({
            studentAns : ans
        })
        for (let i = 0; i < ans.length; i++){  
           
    
            if (ans[i].studentAnswer !== 'A' && ans[i].studentAnswer !== 'B' && ans[i].studentAnswer !== 'C' && ans[i].studentAnswer !== 'D')
            {
         
                for (let j = 0; j <ans[i].studentAnswer.length; j++) {

                
                    document.getElementById(ans[i].studentAnswer[j] + i).checked = true;
                }
               
            } else {
                 document.getElementById(ans[i].studentAnswer + i).checked = true;
            }
               
                      
        }      
    }

    render() {

        let STT = []
        for (let i = 0; i < this.state.numberOfQuestion; i++) {
            STT.push(i+1)
        }
        let arrQ = this.state.arrQuestions
    
        return (
                
            <>  
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-do-exam'}
                    size='lg'
                    centered
                >
                <ModalHeader
                        toggle={() => { this.toggle() }}> Question List {'' }
                </ModalHeader>

                <div className='show-time-container' >
                        <p style={{ fontSize: '15px' }}>
                            Current Time
                            <Example
                                data={this.state.time}
                               
                            />
                            
                        </p>
                        <p style={{ fontSize: '15px' }}>Time to End :
                            <br></br>
                            {localStorage.getItem('user1exam2')}
                        </p>
                   
                </div>
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
                                            <td> <input type='checkbox' id={'A'+index}  value='A' onClick={(event) => { this.saveAnswer(event,arrQ[index],'0',index) }}></input> {arrQ[index].optionA} </td>
                                            <td> <input type='checkbox' id={'B'+index}  value='B' onClick={(event) => { this.saveAnswer(event,arrQ[index],'1',index) }}></input> {arrQ[index].optionB} </td>
                                            <td> <input type='checkbox' id={'C'+index}  value='C' onClick={(event) => { this.saveAnswer(event,arrQ[index],'2',index) }}></input> {arrQ[index].optionC} </td>
                                            <td> <input type='checkbox' id={'D' + index} value='D' onClick={(event) => { this.saveAnswer(event, arrQ[index], '3', index) }}></input> {arrQ[index].optionD} </td>
                                       
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
        userInfo : state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDoExam);


      