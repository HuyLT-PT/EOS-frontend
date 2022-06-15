import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomePage.scss'
class Header extends Component {

    render() {
      
        return (
            <React.Fragment>
                <header className='header'>
                    <p href='##' className='logo'> <i className='fas fa-graduation-cap'>LOGO</i></p>
                    <nav className='navbar'>
                        <ul>
                            <li><p href='##'>Home</p></li>
                            <li><p href='##'>About</p></li>
                            <li><p href='##'>Course</p>
                                <ul>
                                    <li><p href='##'>Course1</p></li>
                                    <li><p href='##'>Course2</p></li>
                                    <li><p href='##'>Course3</p></li>
                                </ul>
                            </li>                           
                            <li><p href='##'>Page</p>
                                <ul>
                                    <li><p href='##'>Teacher</p></li>
                                    <li><p href='##'>Blogs</p></li>
                                </ul>
                            </li>
                            <li><p href='##'>Contact</p></li>
                            <li><i className='fas fa-user-circle'></i></li>
                        </ul>
                    </nav>
                </header>
                <div className='header-banner'>
                    <div className='content-up'>
                        <div className='title1'>Education From Home</div>
                        <div className='title2'>
                            I'm only one call away
                            I'll be there to save the day
                            Superman got nothing on me
                            I'm only one call away
                        </div>
                        <div className='search'>
                            <i className='fas fa-search'/>
                            <input type='text' placeholder='search everything you need'/> 
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='box'>
                            <div className='img-option1'></div>
                            <h3>Computer Science</h3>
                        </div>
                        <div className='box'>
                            <div className='img-option2'></div>
                            <h3>Computer Science</h3>
                        </div>
                        <div className='box'>
                            <div className='img-option3'></div>
                            <h3>Computer Science</h3>
                        </div>
                        <div className='box'>
                            <div className='img-option4'></div>
                            <h3>Computer Science</h3>
                        </div>
                        <div className='box'>
                            <div className='img-option5'></div>
                            <h3>Computer Science</h3>
                        </div>
                    </div>
                    <div className='shape'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
