import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllStudents ,saveStudentClass} from '../../services/userService'
import ModalStudent2Class from './ModalStudent2Class';
class StudentManage extends Component {

   constructor(props) {
       super(props);
       this.state = {
           arrStudents: [],
           isOpenModalAddStudent2Class: false,
           currentStudent :{}
       }
    }

    async  componentDidMount() {
        await this.getAllStudentsFromReact()
 
    }
    toggleModalStudent2Class = () => {
        this.setState({
            isOpenModalAddStudent2Class: !this.state.isOpenModalAddStudent2Class
      })   
    }
    getAllStudentsFromReact = async() => {
        let response = await getAllStudents('ALL')
       
       if (response && response.errCode === 0) {
           this.setState({
               arrStudents: response.users
           },          
           ) 
       }
    }
    handleAddStudend2Class = (data) => {
        
        this.setState({
            isOpenModalAddStudent2Class: true,
            currentStudent: data
        })
    } 
    saveStudent = async(data) => {
        try {
     
            let res = await saveStudentClass(data)
            
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalAddStudent2Class: false 
                    
                })
                await this.getAllStudentsFromReact()
            } else {
                alert (res.errCode)
            }
           
        } catch (e) {
            console.log(e) 
        } 
    }
    render() {
         let arrStudents = this.state.arrStudents
         //   console.log(this.state)
        return (
            
            <>
                {this.state.isOpenModalAddStudent2Class &&
                <ModalStudent2Class
                    isOpen={this.state.isOpenModalAddStudent2Class}
                    toggle={this.toggleModalStudent2Class}
                    currentStudent ={this.state.currentStudent}
                    saveStudent = {this.saveStudent}
                />}
               <div className="Exam-container">
                <div className='title text-center'>Manage Student</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'>
                        <i className=''></i>
                        Student List
                    </button>
                </div>
                <div className='Exam-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Class</th>
                            <th scope="col">DateOfBirth</th>
                            <th scope="col">PhoneNumber</th>
                            <th scope="col">Address</th>
                            <th scope="col">Gender</th>
                            
                            <th scope="col">CreateAt</th>
                            <th scope="col">UpdateAt</th>
                            <th scope="col">Actions</th>
                        </tr>
                                {
                                     arrStudents && arrStudents.map((item, index) => {
                                //    console.log('check map ',item,index)
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.email} </td>
                                            <td>{item.firstName} </td>
                                            <td>{item.lastName} </td>
                                            <td>{item.class} </td>
                                            <td>{item.dateOfBirth} </td>
                                            <td>{item.phoneNumber} </td>
                                            <td>{item.address} </td>
                                            <td>{item.gender? 'Female':'Male'} </td>                                  
                                            <td>{item.createdAt} </td>
                                            <td>{item.updatedAt} </td>
                                            <td>
                                          
                                                <button className='btn-delete'><i className='fas fa-plus' onClick={() => { this.handleAddStudend2Class(item) }}></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentManage);


      