import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import ExamManage from '../containers/System/ExamManage';
import Question from '../containers/System/Question';
import ClassManage from '../containers/System/ClassManage'
import StudentManage from '../containers/System/StudentManage'
import StudentExam from '../containers/System/StudentExam';
import Profile from '../containers/System/Profile';
class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/exam-manage" component={ExamManage} />
                        <Route path="/system/class-manage" component={ClassManage} />
                        <Route path="/system/student-manage" component={StudentManage} />
                        <Route path="/system/student-exam" component={StudentExam} /> 
                        <Route path="/system/exam-question" component={Question} />
                        <Route path="/system/profile" component={Profile} />
                        { /*    <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />*/}
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
