import React from 'react';
import { connect } from 'react-redux';
import {
    loginRequest,
    alertNotification
} from '../action';
import {
    emptyValidationCheck
} from '../validation';
import {
    AuthConstant
} from '../constant';

import { Link } from 'react-router-dom';

class LoginComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password:"",
            submit:false,
            loading:false,
            disabled:false
        };
    }
    componentDidMount(){
        localStorage.removeItem("users");
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps['auth']) {
            const {
                payload,
                error,
                type
            } = nextProps['auth'];
            this.setState({
                loading:false,
                disabled:false
            })
            if(type === AuthConstant.LOGINSUCCESS) { 
                if(payload){
                    const {
                        id,
                        username,
                        accessToken
                    } = payload;            
                    let user = { 
                    username,
                    id,
                    accessToken
                    };              
                    localStorage.setItem('users', JSON.stringify(user)); 
                    this.props.history.push('/store');
                }
            }           
            if(type === AuthConstant.LOGINFAIL) {
                this.props.alertNotification(error,'fail');
            }
        }
        
    }
    inputChanges = (e) => {
        const { name , value } = e.target;
        this.setState({
            [name] : value
        });
    }
    onSubmitForm = (event) => {
        event.preventDefault();
        const {
            username,
            password,
        } = this.state;
        this.setState({
            submit:true
        });
        var formErrorCount = 0;
        if(!emptyValidationCheck(username)){
            formErrorCount = 1;
        }
        if(!emptyValidationCheck(password)){
            formErrorCount = 1;
        }
        if(formErrorCount === 0){
            this.setState({
                disabled:true,
                loading:true
            });
            this.props.loginRequest(this.state);
        }
    }
    render() {
        const {
            password,
            submit,
            disabled,
            loading,
            username
        } = this.state;
        return(
            <div className="login-box">
                <div className="login-logo">
                    <Link to="/"><img src={`${process.env.REACT_APP_STATIC_URL}/img/logo.png`}  alt="coralReefMart-logo" style={{width: '48%'}}/></Link>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in</p>
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-group has-feedback">
                            <input type="text" className="form-control" name="username" placeholder="Email" onChange={this.inputChanges} autoComplete="off"/>
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                            {
                                (submit && !username) &&                                
                                <div className="inputError">Please enter user name </div>
                            }
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.inputChanges} autoComplete="off"/>
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                            {
                                (submit && !password) &&                                
                                <div className="inputError">Please enter password</div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-xs-7">
                            </div>
                            <div className="col-xs-5">
                            {
                                (loading)  ? 
                                <a className="buttonload">
                                <i className="fa fa-spinner fa-spin"></i> Login
                                </a> : <button type="submit" className="btn btn-primary btn-block btn-flat" disabled={disabled}>Sign In</button>
                            }                    
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth
    }
}

export default connect(
    mapStateToProps,{
        loginRequest,
        alertNotification
    }
)(LoginComponent);
