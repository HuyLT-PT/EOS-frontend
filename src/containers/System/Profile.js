import React, { Component,useState,useEffect } from 'react';
import { connect } from 'react-redux';
import './Profile.scss';


class Profile extends Component {
   
   constructor(props) {
       super(props);
       this.state = {
          position :' '
       }
    }

    async componentDidMount() {
        let t = this.props.userInfo.roleId
        if (t === '0') { this.setState({ position: 'ADMIN' }) }
        if (t === '1') { this.setState({ position: 'Student' }) }
        if (t === '2') { this.setState({ position: 'Teacher'})}
         
    }
    render() {
        
        console.log(this.props.userInfo)
        return (
            
        
        <div className='profile-background'>
                <div className='profile-container'>
                    <div className='profile-content-row'>
                        <div className='profile-top-content'>
                            <div className='profile-top-left'>
                                <i className='fas fa-user-circle' />
                                <p > User ID : { this.props.userInfo.id}</p>
                            </div>
                            <div className='profile-top-right'>
                                <h1 className='profile-name'> {this.props.userInfo.firstName} {this.props.userInfo.lastName} </h1>
                                <div className='profile-info'>
                                    <p> Email : {this.props.userInfo.email}</p>
                                    <p> Class : {this.props.userInfo.class}</p>
                                    <p> DateOfBirth : {this.props.userInfo.dateOfBirth}</p>
                                    <p> Address : {this.props.userInfo.address}</p>
                                    <p> Phone Number : {this.props.userInfo.phoneNumber}</p>
                                    <p> Gender : {this.props.userInfo.gender ? 'FeMale' : 'Male'}</p>
                                    <p> Position : {this.state.position}</p>
                                </div>
                                
                    
                            </div>
                        </div>
                        <div className='profile-low-content'>
        
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
