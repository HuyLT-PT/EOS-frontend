import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import {getAllQuestions, downloadExamFromReact}  from '../../services/questionSevice'
import ReactToPdf from 'react-to-pdf'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
 // const ref = React.createRef()


const pdfExportComponent = React.createRef(null);
const options = {

};
class ModalDownload extends Component {

   constructor(props) {
       super(props);
       this.state = {
           arrQuesiton: [] ,
           STT : []
       }
    }
 async  componentDidMount() {
        await this.getQuesiton()
    }
    toggle = () => {
        this.props.toggleDownloadModal()
    } 
    getQuesiton =async() => {
        let res = await getAllQuestions(this.props.examForDownLoad.id)
        let arr = []
       
         for (let i = 0; i < this.props.examForDownLoad.numberOfQuestion ; i++){
            arr.push(i+1)
        }
        this.setState({
            arrQuesiton: res.questionsList,
            STT : arr
            
        })
    }
    downloadExam = async() => {
         pdfExportComponent.current.save();
    }
    render() {

     // console.log('check props', this.props.examForDownLoad.numberOfQuestion)
     //  console.log('check render', this.state.arrQuesiton)
        let STT = this.state .STT
        let arrQ = this.state.arrQuesiton
        //console.log(arrQ)
     /*   return (
            <>
                <Modal isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-exam-download-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Exam Download  </ModalHeader>
                    <ModalBody>
                            <>
                                <div className='Exam-container'>                                   
                                        <p>{this.props.examForDownLoad.name}</p> 
                                        <p>{this.props.examForDownLoad.subject}</p> 
                                        <p>Class: {this.props.examForDownLoad.impClass}  Time : {this.props.examForDownLoad.time} mins</p> 
                                        <p >NumberOfQuestion {this.props.examForDownLoad.numberOfQuestion}</p>
                            {
                                STT && STT.map((item, index) => {
                                        if (arrQ[index] === undefined) {
                                                arrQ[index] = {}
                                    }
                                    
                                    return (
                                         <>  Question{item}  : {arrQ[index].content}  
                                            <br></br>
                                            A : {arrQ[index].optionA}
                                            <br></br>
                                            B: {arrQ[index].optionB}
                                            <br></br>
                                            C : {arrQ[index].optionC}
                                            <br></br>
                                            D : {arrQ[index].optionD}
                                            <br></br>
                                        </>
                                    )
                                    })
                            }
                                </div>
                              
                            
                        </>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )  */
  /*      return (
                
            <>   
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-exam-download-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Exam Download  </ModalHeader>
                    <ModalBody>
                        <ReactToPdf targetRef={ref}>
                            {({ topdf }) => (
                                <div className='Exam-container'>
                            <div className='Exam-content'>
                                <p>{this.props.examForDownLoad.name}</p> 
                                <p>{this.props.examForDownLoad.subject}</p> 
                                <p>Class: {this.props.examForDownLoad.impClass}  Time : {this.props.examForDownLoad.time} mins</p> 
                                <p >NumberOfQuestion {this.props.examForDownLoad.numberOfQuestion}</p>
                            </div>
                            {
                                        STT && STT.map((item, index) => {
                                         if (arrQ[index] === undefined) {
                                                arrQ[index] = {}
                                            }
                                            
                                    return (
                                        <>  Question{item}  : {arrQ[index].content}  
                                            <br></br>
                                            A : {arrQ[index].optionA}
                                            <br></br>
                                            B: {arrQ[index].optionB}
                                            <br></br>
                                            C : {arrQ[index].optionC}
                                            <br></br>
                                            D : {arrQ[index].optionD}
                                            <br></br>
                                        </>
                                    )
                                })
                        </div>  
                            )}
                            
                      </ReactToPdf>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3'onClick={() => { this.downloadExam() }}>Download</Button>{' '}
                        <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        ) */
        return (
            <>
                
            <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-exam-download-container'}
                    size='lg'
                    centered
                    
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Exam Download  </ModalHeader>
                    <ModalBody >

                        <PDFExport paperSize="A4" margin="2cm" ref={pdfExportComponent} fileName={this.props.examForDownLoad.name+this.props.examForDownLoad.impClass}>
                             <>
                                <div className='Exam-container'>                                   
                                        <p>{this.props.examForDownLoad.name}</p> 
                                        <p>Subject :{this.props.examForDownLoad.subject}</p> 
                                        <p>Class: {this.props.examForDownLoad.impClass}  Time : {this.props.examForDownLoad.time} mins</p> 
                                        <p >NumberOfQuestion {this.props.examForDownLoad.numberOfQuestion}</p>
                            {
                                STT && STT.map((item, index) => {
                                        if (arrQ[index] === undefined) {
                                                arrQ[index] = {}
                                    }
                                    
                                    return (
                                         <>  Question{item}  : {arrQ[index].content}  
                                            <br></br>
                                            A : {arrQ[index].optionA}
                                            <br></br>
                                            B: {arrQ[index].optionB}
                                            <br></br>
                                            C : {arrQ[index].optionC}
                                            <br></br>
                                            D : {arrQ[index].optionD}
                                            <br></br>
                                        </>
                                    )
                                    })
                            }
                                </div>
                              
                            
                        </>
                        </PDFExport>    
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3'onClick={() => { this.downloadExam() }}>Download</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDownload);


      