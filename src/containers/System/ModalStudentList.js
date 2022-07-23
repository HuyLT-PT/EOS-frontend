import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import ModalQuestionView from './ModalQuestionView';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
const pdfExportComponent = React.createRef(null);
class ModalStudentList extends Component {

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

    downloadStudentsList = () => {
         pdfExportComponent.current.save();
    }
    render() {

        let STT = this.props.STT
        let arrS = this.props.arrStudents.users
        let mes = ''
        if (STT.length === 0) {
            mes = 'HAS NO STUDENTS'
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
                    <ModalHeader toggle={() => { this.toggle() }}>CLASS  {this.props.Class}  {mes}</ModalHeader>
                    <ModalBody>
                        <PDFExport paperSize='auto' margin="2cm" ref={pdfExportComponent} fileName={this.props.Class +'Students'} >
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
                                            <th scope="col">Gender</th>     
                                    </tr> 
                                    {
                                        STT && STT.map((item, index) => {
                                        return (
                                                    <tr>
                                                        <td>{item}</td>
                                                        <td>{arrS[index].email}</td>
                                                        <td>{arrS[index].firstName + ' '+arrS[index].lastName}</td>
                                                        <td>{arrS[index].dateOfBirth}</td>
                                                        <td>{arrS[index].phoneNumber}</td>
                                                        <td>{arrS[index].address}</td>
                                                        <td>{arrS[index].gender ? 'Female' : 'Male'}</td>
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
                        <Button color="primary" className='px-3' onClick={() => { this.downloadStudentsList() }}>DownLoad</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalStudentList);


      