import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

   constructor(props) {
       super(props);
       this.state = {
           email: '',
           password: '',
           firstName: '',
           lastName: '',
           address: '',
           dateOfBirth: '',
            phoneNumber: '',
            class: '',
            roleId: '',
            gender: ''
       }

       this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', ()=> {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                dateOfBirth: '',
                phoneNumber: '',
                class: '',
                roleId: '',
                gender: ''
            })
        })
    }
    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleUserModal()
    } 

    handleOnChangeInput = (event, id) => {
        // should
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }/*, () => {
             console.log('check state',this.state) 
        }*/) 
    }
    checkValideInput = () => {
        let isValid = true 
        let arrInput = ['email', 'password']
        for (let i = 0; i < arrInput.length;i++){
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('missing :' + arrInput[i])
                break
            }
        }
        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValideInput()
        if (isValid === true) {
            // call api
            this.props.createNewUser(this.state)
            
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
                                <label>Email</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'email')}} value={this.state.email}></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password' onChange={(event)=>{this.handleOnChangeInput(event,'password')}} value={this.state.password}></input>
                            </div>
                            <div className='input-container'>
                                <label>FirstName</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'firstName')}} value={this.state.firstName}></input>
                            </div>
                            <div className='input-container'>
                                <label>LastName</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'lastName')}} value={this.state.lastName}></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Class</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'class')}} value={this.state.class}></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Address</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'address')}} value={this.state.address}></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Date Of Birth</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'dateOfBirth')}} value={this.state.dateOfBirth}></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>Phone Number</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'phoneNumber')}} value={this.state.phoneNumber}></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>RoleId</label>
                                <input type='text' onChange={(event)=>{this.handleOnChangeInput(event,'roleId')}} value={this.state.roleId}></input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label>gender</label>
                                <select type='text' onChange={(event) => { this.handleOnChangeInput(event, 'gender') }} value={this.state.gender}>
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                </select>
                            </div>
                        </div>                     
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


      