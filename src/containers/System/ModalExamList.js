import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import { getAllQuestions , editQuestionService } from '../../services/questionService'
import ModalQuestionView from './ModalQuestionView';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
const pdfExportComponent = React.createRef(null);
class ModalExamList extends Component {

   constructor(props) {
       super(props);
       this.state = {

       }
    }

 async  componentDidMount() {
    }

    toggle = () => {
      this.props.toggle()
    } 

    downloadExamsList = () => {
         pdfExportComponent.current.save();
    }
    render() {

        let STT = this.props.STT
        let arrE = this.props.arrExam.exams
        let mes = ''

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
                    <ModalHeader toggle={() => { this.toggle() }}> CLASS  {this.props.class}  {mes}</ModalHeader>
                    <ModalBody>
                        <PDFExport paperSize='auto' margin="2cm" ref={pdfExportComponent} fileName={this.props.class +' '+'Exam'} >
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
                                    </tr> 
                                    { 
                                            STT && STT.map((item, index) => {
                                            
                                        return (
                                                    <tr>
                                                        <td>{item}</td>
                                                        <td>{arrE[index].name}</td>
                                                        <td>{arrE[index].subject}</td>
                                                        <td>{arrE[index].time}</td>
                                                        <td>{arrE[index].numberOfQuestion}</td>
                                                        <td>{arrE[index].status}</td>
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


      