import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu,studentMenu,teacherMenu } from './menuApp';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp : []
        }
            
    }
    componentDidMount() {
        let { userInfo } = this.props 
        if (userInfo && !_.isEmpty(userInfo)) {
            let menu = []
            let role = userInfo.roleId
            if (role === '0') {
                menu = adminMenu;
            }
            if (role === '1') {
                menu = studentMenu;
            }
            if (role === '2') {
                menu = teacherMenu;
            }

            this.setState({
                menuApp : menu
            })
        }
    }
    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
