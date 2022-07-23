import React, { Component, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import _, { constant } from 'lodash'
import { Link } from 'react-router-dom';


class ModalShowTime extends Component {

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
   
    render() {
        
        return (
               
            <>  
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                     className={'modal-show-time'}
                    
                >
                    <ModalHeader toggle={() => { this.toggle() }}> CLASS </ModalHeader>
                    <ModalBody>
                   
                       
                    </ModalBody>
                    <ModalFooter>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalShowTime);


      