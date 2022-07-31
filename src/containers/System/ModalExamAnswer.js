import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormText } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import { getAllQuestions , editQuestionService } from '../../services/questionService'
import ModalQuestionView from './ModalQuestionView';
import {getAllStudents, getAllusers} from '../../services/userService'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { getAllExams,getResultExam } from '../../services/examService';
const pdfExportComponent = React.createRef(null);
class ModalExamAnswer extends Component {

   constructor(props) {
       super(props);
       this.state = {
            point: '',
            exam: this.props.exams,
            student: ''
       }
    }

    async componentDidMount() {
       await this.getStudent()
        await this.getPoint()
         
    }
    toggle = () => {
      this.props.toggleExamAns()
    } 

    downloadExamsList = () => {
         pdfExportComponent.current.save();
    }
    getStudent = async () => {
        let u = this.props.userInfo.class
     
        let user = await getAllStudents('ALL')
        
        let data = user.users
        let student = []
        if (u === null) { student = data }
        
        else{for (let i = 0; i < data.length; i++){
            if(u===data[i].class) { student.push(data[i])}
        }}
        this.setState({
            student : student
        })
    }

    getPoint = async () => {
        let examId = this.state.exam.id

        let s = this.state.student 
        let point = []
        for (let i = 0; i < s.length; i++){
            let p = await getResultExam(examId, s[i].id) 
            if(p===-1){p=0}
           point.push(p)
        }
        this.setState({
           point:point
       })
    }
    render() {
        let arr = []
        let s = this.state.student
        let p= this.state.point
        for (let i = 0; i < s.length; i++){
            arr.push(i+1)
        }
        
        return (
               
            <>  
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>{`${this.state.exam.name}_Class${this.props.userInfo.class}`}</ModalHeader>
                    <ModalBody>
                        <PDFExport paperSize='auto' margin="2cm" ref={pdfExportComponent} fileName={`${this.state.exam.name}_Class${this.props.userInfo.class}`} >
                         <div className='Exam-table mt-3 mx-1'>
                                <table id="customers">
                                <tbody>
                          
                                    <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">DateOfBirth</th>
                                            <th scope="col">PhoneNumber</th>
                                            <th scope="col">Address</th>   
                                            <th scope="col">gender</th> 
                                            <th scope="col">Point</th> 
                                    </tr> 
                                    {  
                                        arr && arr.map((item, index) => {
                                        return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{s[index].email}</td>
                                                        <td>{s[index].firstName + ' ' + s[index].lastName}</td>
                                                        <td>{s[index].dateOfBirth}</td>
                                                        <td>{s[index].phoneNumber}</td>
                                                        <td>{s[index].address}</td>
                                                        <td>{s[index].gender ? 'Female' : 'Male'}</td>
                                                        <td>{p[index] +'/'+this.state.exam.numberOfQuestion}</td>
                                                    </tr>
                                                )
                                })
                            }
                                            
                            
                                        
                        
                               </tbody>
                            </table>
                            </div> 
                        </PDFExport>    
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => { this.downloadExamsList() }}>DownLoad</Button>{' '}
                        <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalExamAnswer);


      