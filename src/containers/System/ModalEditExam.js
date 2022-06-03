import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalEditExam extends Component {

   constructor(props) {
       super(props);
       this.state = {
           id: '',
           name: '',
           subject: '',
           time: '',
           numberOfQuestion: '',
           impclass:'',
       }
    }

    componentDidMount() {
        let exam = this.props.currentExam
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

    toggle = () => {
        this.props.toggleExamEditModal()
    } 

    handleOnChangeInput = (event, id) => {
        // should
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }) 
    }
    checkValideInput = () => {
        let isValid = true 
        let arrInput = ['impClass', 'name', 'subject', 'time', 'numberOfQuestion']
        for (let i = 0; i < arrInput.length;i++){
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('missing :' + arrInput[i])
                break
            }
        }
        return isValid
    }

    handleSaveExam = () => {
        let isValid = this.checkValideInput()
        if (isValid === true) {
            // call api
            this.props.editExam(this.state)
            
        }
        
    }

    render() {
           // console.log(this.props)
           // console.log(this.props.isOpen)
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Edit Exam</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Name</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'name')}} value={this.state.name} disabled></input>
                            </div>
                            <div className='input-container'>
                                <label>Subject</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'subject')}} value={this.state.subject} disabled></input>
                            </div>
                            <div className='input-container'>
                                <label>Time</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'time')}} value={this.state.time}></input>
                            </div>
                            <div className='input-container'>
                                <label>NumberOfQuestion</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'numberOfQuestion')}} value={this.state.numberOfQuestion} disabled></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>ImpClass</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'impClass')}} value={this.state.impClass}></input>
                            </div>
                        </div>                     
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => { this.handleSaveExam() }}>Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditExam);


      