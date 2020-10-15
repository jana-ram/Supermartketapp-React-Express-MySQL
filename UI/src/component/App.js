import React from 'react';
import LoginComponent from './LoginComponent';
import { Switch , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from '../helper/Alert';
import { PrivateRoute } from '../routes/PrivateRoute';
import { PublicRoute } from '../routes/PublicRoute';
import Landing from './Landing';
import { ToastContainer} from 'react-toastify';
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedUser : false,
            alertNotification : false,
            notificationContent : "",  
            typeOfMsg:""          
        }
    }
    componentDidMount(){
        this.authChecking();
    }

    authChecking = () =>{        
        let authUserDetail = localStorage.getItem('users');
        if(authUserDetail){
            this.setState({
                loggedUser : true,
            });
            if(document.getElementById('root')){
                var bodyClass = document.getElementById('root');
                if(bodyClass){                    
                    if(bodyClass.classList.contains('hold-transition')){
                        bodyClass.classList.remove('hold-transition');
                    }
                    if(bodyClass.classList.contains('login-page')) {
                        bodyClass.classList.remove('login-page')
                    }
                    let classesToAdd = [ 'hold-transition', 'skin-blue', 'sidebar-mini' ];
                    bodyClass.classList.add(...classesToAdd);
                }
            }
        }
    }
    componentWillReceiveProps(nextProps){
        this.authChecking();
        if(this.props.alertNotification.payload != nextProps['alertNotification']['payload']) {
            if(nextProps['alertNotification']) {
                const {
                    payload,
                    type,
                } = nextProps['alertNotification'];
                this.setState({
                    alertNotification : true,
                    notificationContent : (payload) ? payload : "",
                    typeOfMsg : type
                });
            }
        } else {
            this.setState({
                alertNotification : false,
                notificationContent : "",
                typeOfMsg : ""
            });
        }
    }
    render(){
        const {
            alertNotification,
            notificationContent,
            typeOfMsg,
            loggedUser
        } = this.state;
        return(
            <>   
                <ToastContainer 
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            {
                (alertNotification && notificationContent) && Alert(notificationContent,typeOfMsg)
            }
            <div className={(loggedUser) ? "wrapper" : "login-box"}>           
                <Switch>
                    <PublicRoute authed={loggedUser} path='/' component={LoginComponent} exact />
                    <PrivateRoute authed={true} path="/store" component={Landing}  exact />
                    <PrivateRoute authed={true} path="/store-add" component={Landing}  exact />
                    <PrivateRoute authed={true} path="/store-edit/:id" component={Landing}  exact />
                </Switch>
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        alertNotification,
        auth
    } = state;
    return {
        alertNotification,
        auth
    }
}
export default withRouter(connect(mapStateToProps)(App));