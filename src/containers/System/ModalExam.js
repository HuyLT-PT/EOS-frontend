import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalExam extends Component {

   constructor(props) {
       super(props);
       this.state = {
           name: '',
           subject: '',
           time: '',
           numberOfQuestion: '',
           impClass:'',
       }

       this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', ()=> {
            this.setState({
                name: '',
                subject: '',
                time: '',
                numberOfQuestion: '',
                impClass:''
            })
        })
    }
    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleExamModal()
    } 

    handleOnChangeInput = (event, id) => {
        
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }) 
    }
    checkValideInput = () => {
        let isValid = true 
        let arrInput = ['name', 'subject', 'time', 'numberOfQuestion', 'impClass']
        for (let i = 0; i < arrInput.length;i++){
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('missing :' + arrInput[i])
                break
            }
        }
        return isValid
    }

    handleAddNewExam = () => {
        let isValid = this.checkValideInput()
        if (isValid === true) {
            // call api
            this.props.createNewExam(this.state)
            
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
                    <ModalHeader toggle={() => { this.toggle() }}>Create new user</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Name</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'name')}} value={this.state.name}></input>
                            </div>
                            <div className='input-container'>
                                <label>Subject</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'subject')}} value={this.state.subject}></input>
                            </div>
                            <div className='input-container'>
                                <label>Time</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'time')}} value={this.state.time}></input>
                            </div>
                            <div className='input-container'>
                                <label>NumberOfQuestion</label>
                                <select type='text' onChange={(event) => { this.handleOnChangeInput(event, 'numberOfQuestion') }} value={this.state.numberOfQuestion}>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="50">50</option>
                                </select>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>ImpClass</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'impClass')}} value={this.state.impClass}></input>
                            </div>
                        </div>                     
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => { this.handleAddNewExam() }}>Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalExam);


      