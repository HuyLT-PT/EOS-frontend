import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalStudent2Class extends Component {

   constructor(props) {
       super(props);
       this.state = {
           currentStudent: this.props.currentStudent,
           id : this.props.currentStudent.id
       }

    
    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggle()
    } 

    handleSaveStudentClass = () => {
        let isValid = this.checkValideInput()
        if (isValid === true) {
            // call api
            this.props.saveStudent(this.state)
            
        }
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
        let arrInput = ['class']
        for (let i = 0; i < arrInput.length;i++){
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('missing :' + arrInput[i])
                break
            }
        }
        return isValid
    }

    render() {

        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Enter Your Class</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container max-width-input'>
                                <label>Your Class</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'class')}} value={this.state.currentStudent.class}></input>
                            </div>

                        </div>                  
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => { this.handleSaveStudentClass() }} >Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalStudent2Class);


      