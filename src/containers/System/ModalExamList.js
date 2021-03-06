import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormText } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import { getAllQuestions , editQuestionService } from '../../services/questionService'
import ModalQuestionView from './ModalQuestionView';
import {getAllusers} from '../../services/userService'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { getAllExams,getResultExam } from '../../services/examService';
const pdfExportComponent = React.createRef(null);
class ModalExamList extends Component {

   constructor(props) {
       super(props);
       this.state = {
           user: '',
           exams: [],
           point: ''
       }
    }

    async componentDidMount() {
        let classId = this.props.classId
        if (classId === undefined) {
            if (this.props.stdId < 14) { classId = 1 }
            if (this.props.stdId < 25 && this.props.stdId >15) { classId = 2 }
            if (this.props.stdId > 25) { classId = 3 }
            
        }
      
        let t = await getAllusers(this.props.stdId)
        let c = await getAllExams(classId)
        let cc = c.data
        let point =[]
        for (let i = 0; i < cc.length; i++){
            let p = await getResultExam(cc[i].id, this.props.stdId)
          
            if(p === -1){p=0}
            point.push(p)
        }
      
        this.setState({
            user: t.users,
            exams: c.data,
            point:point
        })

    }
    toggle = () => {
      this.props.toggle()
    } 

    downloadExamsList = () => {
         pdfExportComponent.current.save();
    }
    render() {
        let STT = this.props.STT
        let arrE = this.props.arrExam.data
        let mes = ''
        let arrC = this.state.exams
        arrE = arrC
        let arrP = this.state.point
 
        if (STT.length === 0) {
            mes = 'HAS NO EXAMS'
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
                    <ModalHeader toggle={() => { this.toggle() }}> EXAM OF { this.state.user.firstName} { this.state.user.lastName}</ModalHeader>
                    <ModalBody>
                        <PDFExport paperSize='auto' margin="2cm" ref={pdfExportComponent} fileName={`${ this.state.user.firstName}  ${ this.state.user.lastName} Exam List`} >
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
                                            <th scope="col">Point</th> 
                                    </tr> 
                                    { 
                                            arrE && arrE.map((item, index) => {
                                            
                                        return (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>{arrE[index].name}</td>
                                                        <td>{arrE[index].subject}</td>
                                                        <td>{arrE[index].time}</td>
                                                        <td>{arrE[index].numberOfQuestion}</td>
                                                        <td>{arrE[index].status}</td>
                                                        <td>{arrP[index] + '/'+arrE[index].numberOfQuestion}</td>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalExamList);


      