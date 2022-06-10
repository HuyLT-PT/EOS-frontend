import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllClasses } from '../../services/classService'
import ModalStudentList from './ModalStudentList';
import { getAllStudents } from '../../services/userService'
import { getAllExams } from '../../services/examService';
import ModalExamList from './ModalExamList';
class ClassManage extends Component {

   constructor(props) {
       super(props);
       this.state = {
           arrClass: [],
           isOpenModalStudentList: false,
           isOpenModalExamList:false,
           arrStudents: {},
           arrExam :{},
           STT1: [],
           STT2: [],
           arrTeacher: [],
           countS: [],
           countE: [],
       }
    }

async  componentDidMount() {
    await this.getAllClassesFromReact()
 
    }
    getAllClassesFromReact   = async() => {
        let response = await getAllClasses('ALL')
       // console.log(response)
       if (response && response.errCode === 0) {
           this.setState({
               arrClass: response.classes,
               arrTeacher: response.teacher,
               countS: response.students,
               countE :response.exams
           }) 
        }
        let arrC = this.state.arrClass
        let arrS = this.state.countS
        let arrE = this.state.countE
        arrC&&arrC.map((index1, item1) => {
            arrS && arrS.map((index2, item2) => {
              
                    if (index1.name === index2.class) {
                       index1.numberOfStudent = index1.numberOfStudent+1 
                    }  
                                
            })
        })
        arrC&&arrC.map((index1, item1) => {
            arrE && arrE.map((index2, item2) => {
                   if (index1.name === index2.impClass) {
                       index1.examImp = index1.examImp+1 
                    }          
                            
            })
        })
        this.setState({
            arrClass : arrC
        })
    }
    toggleStudentListModal = ()=>{
        this.setState({
            isOpenModalStudentList : !this.state.isOpenModalStudentList
        })
    }
    toggleExamListModal = () => {
           this.setState({
            isOpenModalExamList : !this.state.isOpenModalExamList
        })
    }
    handleViewStudent = async(data) => {
        
        let arr = await getAllStudents(data.id) 


        let stt =[]
        for (let i = 0; i < arr.users.length; i++){
                stt.push(i+1)
        } 
        
        this.setState({
            isOpenModalStudentList: true,
            arrStudents: arr,
            STT1: stt,
            class1 : data.name,
        })
    }

    handleViewExam = async (data) => {
        let arr = await getAllExams(data.id)
        let stt =[]
        for (let i = 0; i < arr.exams.length; i++){
                stt.push(i+1)
        } 
        this.setState({
            isOpenModalExamList: true,
            arrExam: arr,
            STT2: stt,
            class2:data.name
        })
    }
    
    render() {
        let arrC = this.state.arrClass
        let arrT = this.state.arrTeacher
        
       arrT&&arrT.map((index1, item1) => {
            arrC && arrC.map((index2, item2) => {
                                
                    if (index1.id === index2.teacherId) {
                        index2.teacher = index1.firstName + ' ' + index1.lastName
                    }              
            })
        })

        return (
            
            <>
                {   this.state.isOpenModalStudentList&&
                    <ModalStudentList
                        isOpen={this.state.isOpenModalStudentList}
                        toggle={this.toggleStudentListModal}
                        arrStudents={this.state.arrStudents}
                        STT={this.state.STT1}
                        Class = { this.state.class1}
                    />            
                }
                {   this.state.isOpenModalExamList&&
                    <ModalExamList
                        isOpen={this.state.isOpenModalExamList}
                        toggle={this.toggleExamListModal}
                        arrExam={this.state.arrExam}
                        STT={this.state.STT2}
                        class ={ this.state.class2}
                       
                    />            
                }
               <div className="Exam-container">
                <div className='title text-center'>Manage Class</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' >
                        <i className='fas fa-plus'></i>
                        Add Class
                    </button>
                </div>
                <div className='Exam-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Teacher</th>
                            <th scope="col">NumberOfStudent</th>
                            <th scope="col">examImp</th>
                            <th scope="col">CreateAt</th>
                            <th scope="col">UpdateAt</th>
                            <th scope="col">Actions</th>
                        </tr>
                        {
                                arrC && arrC.map((item, index) => {


                                     
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.name} </td>
                                            <td>{item.teacher} </td>
                                            <td>{item.numberOfStudent} </td>
                                            <td>{item.examImp}</td>
                                            <td>{item.createdAt} </td>
                                            <td>{item.updatedAt} </td>
                                            <td>
                                                <button className='btn-view' onClick= { ()=>{this.handleViewStudent(item)}}><i className='fas fa-users'></i></button>
                                                <button className='btn-edit' onClick= { ()=>{this.handleViewExam(item)}}><i className='fas fa-file'></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>             
                 
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassManage);


      