import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllusers , deleteUserSevice} from '../../services/userSevice'
import ModalUser from './ModalUser';
import { createNewUserSevice, editUserSevice } from '../../services/userSevice'
import { emitter } from '../../utils/emitter'
import ModalEditUser from './ModalEditUser';
    
class UserManage extends Component {
    // ham tao state
   constructor(props) {
       super(props);
       this.state = {
           arrUsers: [] ,
           isOpenModalUser: false,
           isOpenModalEditUser: false,
           userEdit : {}
       }
    }

   async componentDidMount() {
       await this.getAllUsersFromReact();
    }
/*  life cycle
   * run component
   * 1. run contructor -> init state
   * 2. DidMount ( set state ) -> 
   * 3. render
*/
    getAllUsersFromReact = async() => {
        let response = await getAllusers('ALL')
       if (response && response.errCode === 0) {
           this.setState({
               arrUsers: response.users
           },
           /*    () => {
                console.log('check',this.state.arrUsers) // call backs
           } */
           ) 
          // console.log('check',this.state.arrUsers)
       }
    }
    handlerAddNewUser = () => {
        this.setState({
           isOpenModalUser: true,
        })
    
    }
    toggleUserModal = () => {      
      this.setState({
            isOpenModalUser: !this.state.isOpenModalUser 
      })         
    } 
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser 
      })    
    }
    createNewUser =async (data) => {
        
        try {
            let response = await createNewUserSevice(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                // eslint-disable-next-line no-undef
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser : false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }        
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteUser = async(user) => {
        try {
            let res = await deleteUserSevice(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage)
            }

        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        console.log('check',user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit :user
        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserSevice(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser :false
                })
                await this.getAllUsersFromReact()
            } else {
                alert (res.errCode)
            }
           
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser   
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser ={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleUserEditModal={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser ={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage User</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={()=>this.handlerAddNewUser()}>
                        <i className='fas fa-plus'></i>
                        Add User
                    </button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">DateOfBirth</th>
                            <th scope="col">PhoneNumber</th>
                            <th scope="col">Address</th>
                            <th scope="col">Gender</th>
                            <th scope="col">RoleID</th>
                            <th scope="col">CreateAt</th>
                            <th scope="col">UpdateAt</th>
                            <th scope="col">Actions</th>
                        </tr>
                        
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                //    console.log('check map ',item,index)
                                    return (
                                        <tr>
                                            <td>{item.id} </td>
                                            <td>{item.email} </td>
                                            <td>{item.firstName} </td>
                                            <td>{item.lastName} </td>
                                            <td>{item.dateOfBirth} </td>
                                            <td>{item.phoneNumber} </td>
                                            <td>{item.address} </td>
                                            <td>{item.gender? 'Female':'Male'} </td>
                                            <td>{item.roleid} </td>
                                            <td>{item.createdAt} </td>
                                            <td>{item.updatedAt} </td>
                                            <td>
                                                <button className='btn-edit' onClick={() => { this.handleEditUser(item) }}><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' onClick={() => { this.handleDeleteUser(item) }}><i className='fas fa-trash-alt'></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
