import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import _ from 'lodash'
import { Link } from 'react-router-dom';

class ModalConfirm extends Component {

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
    handleOpenExam = () => {
        this.props.handleOpenExam()
    }
    render() {
        let arr = this.props.currE
      
        return (
               
            <>  
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}> CLASS {arr.impClass+' '+arr.name} </ModalHeader>
                    <ModalBody>
                        <div>
                            <h1>{arr.name}</h1>
                            <h2>Class : {arr.impClass}</h2>
                            <h2>Subjetc : {arr.subject}</h2>
                            <h2>Time : {arr.time}</h2>
                            <h2>Question : {arr.numberOfQuestion}</h2>
                            <h1> Are you sure you want to take the {arr.name} ? </h1>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/system/exam-question"><Button color="primary" className='px-3'>OKELA</Button></Link>{' '}
                        <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>{' '}
                        <Button color="secondary" className='px-3' onClick={() => { this.handleOpenExam() }}>Ok</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);


      