import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllExams,deleteExamSevice,editExamSevice,createNewExamSevice} from '../../services/examSevice'
import ModalEditExam from './ModalEditExam';
import ModalExam from './ModalExam';
import { emitter } from '../../utils/emitter'

    
class ExamManage extends Component {
    // ham tao state
   constructor(props) {
       super(props);
       this.state = {
           arrExams: [],
           isOpenModalEditExam: false,
           isOpenModalExam : false,
           examEdit: {}
       }
    }

   async componentDidMount() {
       await this.getAllExamsFromReact();
    }
/*  life cycle
   * run component
   * 1. run contructor -> init state
   * 2. DidMount ( set state ) -> 
   * 3. render
*/
    getAllExamsFromReact = async() => {
        let response = await getAllExams('ALL')
       if (response && response.errCode === 0) {
           this.setState({
               arrExams: response.exams
           }) 
       }
    }
    handlerAddNewExam = () => {
        this.setState({
           isOpenModalExam: true,
        })
    
    }
    toggleExamModal = () => {      
      this.setState({
            isOpenModalExam: !this.state.isOpenModalExam
      })         
    } 
    toggleExamEditModal = () => {
        this.setState({
            isOpenModalEditExam: !this.state.isOpenModalEditExam 
      })    
    }
    createNewExam =async (data) => {
        
        try {
            let response = await createNewExamSevice(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                // eslint-disable-next-line no-undef
                await this.getAllExamsFromReact();
                this.setState({
                    isOpenModalExam : false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }        
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteExam = async(exam) => {
        try {
            let res = await deleteExamSevice(exam.id)
            if (res && res.errCode === 0) {
                await this.getAllExamsFromReact();
            } else {
                alert(res.errMessage)
            }

        } catch (e) {
            console.log(e)
        }
    }
    handleEditExam = (exam) => {
        console.log('check',exam)
        this.setState({
            isOpenModalEditExam: true,
            examEdit : exam
        })
    }
    handleDowloadExam=(exam) => {
        alert('hihihi')
    }
    doEditExam = async (exam) => {
        try {
            let res = await editExamSevice(exam)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditExam: false 
                    
                })
                await this.getAllExamsFromReact()
            } else {
                alert (res.errCode)
            }
           
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        console.log('check render', this.state)
        let arrExams = this.state.arrExams
        return (
            <div className="Exam-container">
                <ModalExam  
                    isOpen={this.state.isOpenModalExam}
                    toggleExamModal={this.toggleExamModal}
                    createNewExam ={this.createNewExam}
                />
                {
                    this.state.isOpenModalEditExam &&
                    <ModalEditExam
                        isOpen={this.state.isOpenModalEditExam}
                        toggleExamEditModal={this.toggleExamEditModal}
                        currentExam={this.state.examEdit}
                        editExam ={this.doEditExam}
                    />
                }

                <div className='title text-center'>Manage Exam</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={()=>this.handlerAddNewExam()}>
                        <i className='fas fa-plus'></i>
                        Add Exam
                    </button>
                </div>
                <div className='Exam-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Time</th>
                            <th scope="col">NumberOfQuestion</th>
                            <th scope="col">ImpClass</th>
                            <th scope="col">CreateAt</th>
                            <th scope="col">UpdateAt</th>
                            <th scope="col">Actions</th>
                        </tr>
                        
                            {
                                arrExams && arrExams.map((item, index) => {
                                    console.log('check map ',item,index)
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.name} </td>
                                            <td>{item.subject} </td>
                                            <td>{item.time} </td>
                                            <td>{item.numberOfQuestion} </td>
                                            <td>{item.impClass} </td>
                                            <td>{item.createdAt} </td>
                                            <td>{item.updatedAt} </td>
                                            <td>
                                                <button className='btn-edit' onClick={() => { this.handleEditExam(item) }}><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' onClick={() => { this.handleDeleteExam(item) }}><i className='fas fa-trash-alt'></i></button>
                                                <button className='btn-download' onClick={() => { this.handleDowloadExam(item) }}><i className='fas fa-sign-out-alt'></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ExamManage);

