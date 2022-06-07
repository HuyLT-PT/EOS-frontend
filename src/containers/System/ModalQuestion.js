import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import { getAllExams} from '../../services/examSevice'
import _ from 'lodash'
class ModalQuestion extends Component {

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
        this.props.toggleQuestionModal()
    } 
    handleViewQuestion = ()=>{
            this.props.editQuestion()
    }
    render() {
        //console.log('check render', this.state)
        //console.log('check prop', this.prop)
        return (
            <div className='Modal-question-container'>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Question-List</ModalHeader>
                    <ModalBody>
                
            
                         <div className='Exam-table mt-3 mx-1'>
                                <table id="customers">
                                    <tbody>
                                    <tr>
                                            <th scope="col">Exam ID</th>
                                            <th scope="col">Question</th>
                                            <th scope="col">Content</th>
                                            <th scope="col">Actions</th>
                                    </tr>
                                    {
                                        
                                        
        
                                       //         return (
                                                    <tr>
                                                        <td>this is exam id</td>
                                                        <td>this is 2</td>
                                                        <td>this is 3 </td>
                                                        <td>
                                                            <button className='btn-edit' onClick={() => { this.handleViewQuestion() }}><i className='fas fa-pencil-alt'></i></button>
                                                        </td>
                                                    </tr>
                                        //        )
                                        //    }) 
                                    }
                                                              
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3' >Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalQuestion);


      