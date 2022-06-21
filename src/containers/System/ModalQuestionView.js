import { update } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isForInStatement } from 'typescript';
import { emitter } from '../../utils/emitter'

class ModalQuestionView extends Component {

   constructor(props) {
       super(props);
       this.state = {
            id: '',
            examId: '',
            content: '',
            optionA: ' ',
            optionB: ' ',
            optionC: ' ',
            optionD: ' ',
            key: '',
            arrKey: [false,false,false,false],
       }

    //   this.listenToEmitter()
    }

 /*   listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', ()=> {
            this.setState({
                
            })
        })
    } */
    componentDidMount() {
        let question = this.props.currentQuestion
        if (question) {
            this.setState({
                id: question.id,
                examId: this.props.examId,
                content: question.content,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
                key: question.key
            })
        } 
    }

    toggle = () => {
        this.props.toggleQuestionEditModal()
    } 
    handleOnChangeInput = (event, id) => {
        // should
        let copyState = { ...this.state }
        
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }) 
    }

    handleOnChangeAnswer = (event, id, option) => {
        // should      
        const { value, checked } = event.target;       
        let arr = this.state.arrKey


        if (checked) {             
            arr[option] = true
        } else {
            arr[option] = false
        }

        this.setState({
            arrKey: arr
        })
    }
    checkValideInput = () => {
        let isValid = true 
        let arrInput = ['content', 'optionA', 'optionB', 'optionC', 'optionD']
        for (let i = 0; i < arrInput.length;i++){
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('missing :' + arrInput[i])
                break
            }
        }
        return isValid
    }
    handleSaveQuestion = () => {
        let isValid = this.checkValideInput()
       
        if (isValid === true) {
            // call api
           
            this.props.editQuestion(this.state)           
        }
        
    }
    render() {

       
        return (
            <div className='Modal-question-container'>
                {
                  
               } 
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Question-view</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container max-width-input'>
                                <label>Content</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'content')}} value={this.state.content} ></input>
                            </div>
                            <div className='input-container'>
                                <label >Option A</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'optionA')}} value={this.state.optionA}></input>
                            </div>
                            <div className='input-container'>
                                <label>Option B</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'optionB')}} value={this.state.optionB}></input>
                            </div>
                            <div className='input-container'>
                                <label>Option C</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'optionC')}} value={this.state.optionC}></input>
                            </div>
                            <div className='input-container'>
                                <label>Option D</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'optionD')}} value={this.state.optionD}></input>
                            </div>


                            <div className=''>
                                <label> Answer</label> <br></br>
                                <input type='checkbox' onChange={(event)=>{this.handleOnChangeAnswer(event,'key','0')}} value='A'/> 
                                <label> Option A</label> <br></br>
                                <input type='checkbox' onChange={(event)=>{this.handleOnChangeAnswer(event,'key','1')}} value='B'/>
                                <label >Option B</label> <br></br>
                                <input type='checkbox'  onChange={(event)=>{this.handleOnChangeAnswer(event,'key','2')}} value='C'/>
                                <label> Option C</label> <br></br>
                                <input type='checkbox' onChange={(event)=>{this.handleOnChangeAnswer(event,'key','3')}} value='D'/>
                                <label> Option D</label>
                            </div>
                        </div>       
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => { this.handleSaveQuestion() }}>Save</Button>{' '}
                        <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalQuestionView);


      