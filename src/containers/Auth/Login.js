import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from "../../services/userSevice";


class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('loging success');
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            console.log('error message', e.response);
        }
        
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
        console.log(event.target.value)
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
        console.log(event.target.value)
    }
    hanleShowHiddenPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='longin-content-row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>UserName</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your email'
                                value={this.state.username}
                                onChange={(event)=> this.handleOnChangeUsername(event)}
                                />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                className='form-control'
                                placeholder='Enter your password'
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <span
                                    onClick={() => { this.hanleShowHiddenPassword() }}
                                >
                                    <i className={this.state.isShowPassword ? 'far fa-eye': 'far fa-eye-slash'}></i>
                                </span>                               
                            </div>                      
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='login-btn' onClick={()=>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12 login-forgot-password'>
                            <span>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-center'> </span>
                        </div>
                        <div className='col-12 login-social'>
                            <div></div>   
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
      //  adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
      //  adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
