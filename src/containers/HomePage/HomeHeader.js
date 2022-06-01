import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
class HomeHeader extends Component {

    render() {
      
        return (
            <React.Fragment>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <div className='header-logo'> </div>
                    </div>
                    <div className='center-content'>
                        <strong> Dai Hoc Bach Khoa Ha Noi</strong>
                        <br></br>
                        <strong> Truong Cong Nghe Thong Tin Va Truyen Thong</strong>
                    </div>
                    <div className='right-content'>
                        <div className='sp'><i className='fas fa-question-circle'> </i> </div>
                        <div className='flag'>VietNam</div>
                    </div>
                </div>
            </div>
            <div className='home-header-banner'>
                    <div className='title-one'>Exam Online System</div> 
                    <div className='title-two'>For Everyone</div>
                    <div className='search'></div> 
                    <div className='option'></div> 
            </div>
            </React.Fragment>
        );
    }

}
// redux
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
