import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getAllClasses} from '../../services/classService'
class ClassManage extends Component {

   constructor(props) {
       super(props);
       this.state = {
            arrClass: []
       }
    }

 async  componentDidMount() {
    await this.getAllClassesFromReact()
 
    }
    getAllClassesFromReact   = async() => {
       let response = await getAllClasses('ALL')
       if (response && response.errCode === 0) {
           this.setState({
               arrClass: response.classes
           }) 
       }
    }
    render() {
        console.log(this.state)
        let arrC = this.state.arrClass
        return (
            
            <>
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
                            <th scope="col">ExamImp</th>
                            <th scope="col">CreateAt</th>
                            <th scope="col">UpdateAt</th>
                            <th scope="col">Actions</th>
                        </tr>
                                {
                                arrC && arrC.map((item, index) => {
                               // console.log('check map ',item,index)
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.name} </td>
                                            <td>{item.teacher} </td>
                                            <td>{item.numberOfStudent} </td>
                                            <td>{item.examImp} </td>
                                            <td>{item.createdAt} </td>
                                            <td>{item.updatedAt} </td>
                                            <td>
                                                <button className='btn-view' ><i className='fas fa-users'></i></button>
                                                <button className='btn-edit' ><i className='fas fa-file'></i></button>
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


      