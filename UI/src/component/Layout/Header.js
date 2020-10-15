import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { authDetail } from '../../helper';
class Header extends React.Component{
    state = {
        pageName : "",
        logoutShow : false,
        toggleMenu : false
    }
    hideAndShow = () => {
        this.setState({
            logoutShow : !this.state.logoutShow
        });
    }

    sideBarToggle = () =>{
        const screenSize = window.innerWidth;
        this.setState({
            toggleMenu : !this.state.toggleMenu
        });
        var bodyClass = document.getElementById('root');
        if(bodyClass){   
            if(this.state.toggleMenu){
                let classesToAdd = (screenSize >= 760) ? [ 'sidebar-collapse' ] : ['sidebar-open'];
                bodyClass.classList.add(...classesToAdd);
            } else {
                if(bodyClass.classList.contains('sidebar-collapse')){
                    bodyClass.classList.remove('sidebar-collapse');
                }
                if(bodyClass.classList.contains('sidebar-open')){
                    bodyClass.classList.remove('sidebar-open');
                }
            } 
        }

    }
    signOut = (propsData) => {
        localStorage.removeItem("users");
        window.location.href ='/';
    }
    render() {
        const { propsData } = this.props;
        const {
            logoutShow
        } = this.state;
        const {
            username
         } = authDetail();
        return(
            <header className="main-header">
                <Link to="/" className="logo"><img src={`${process.env.REACT_APP_STATIC_URL}/img/logo.png`}  alt="coralReefMart-logo" style={{width: '28%'}} alt="coralReefMart-log"/></Link>
                <nav className="navbar navbar-static-top">
                <a onClick={this.sideBarToggle} className="sidebar-toggle" data-toggle="push-menu" role="button">
                <span className="sr-only">Toggle navigation</span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className={(logoutShow) ? "open dropdown user user-menu" : "dropdown user user-menu"}  onClick={this.hideAndShow}>
                            <a onClick={this.hideAndShow} className="dropdown-toggle cursor" data-toggle="dropdown">
                            <img src={`${process.env.REACT_APP_STATIC_URL}/dist/img/user2-160x160.jpg`} className="user-image" alt="User-Image" />
                            <span className="hidden-xs">{username}</span>
                            </a>
                            <ul className="dropdown-menu">
                            <li className="user-header">
                                <img src={`${process.env.REACT_APP_STATIC_URL}/dist/img/user2-160x160.jpg`}className="img-circle" alt="User-Image" />
                                <p>
                                    Admin
                                    <small>Admin</small>
                                </p>
                            </li>
                            <li className="user-footer">
                                <div className="pull-right">
                                    <a onClick={(e) =>this.signOut(propsData)} className="btn btn-default btn-flat" >Sign out</a>
                                </div>
                            </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth
    }
};

export default connect(mapStateToProps,null)(Header);
