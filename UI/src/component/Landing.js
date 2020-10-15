import React from 'react';
import { connect } from 'react-redux';
import { Route , Switch } from 'react-router-dom';
import { authDetail } from '../helper';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import { Footer } from './Layout/Footer';
import LoginComponent from './LoginComponent';
import PageNotFound from '../error/PageNotFound';
import Store from './Store';
import StoreAdd from './Store/Add';
import StoreEdit from './Store/Edit';
class AdminLanding extends React.Component{
    render() {
        return(
            <>
                <Header propsData={this.props}/>
                <Sidebar propsData={this.props}/>
                <Switch>         
                    <Route path="/" component={LoginComponent} exact/>
                    <Route exact path="/store" component={Store}/> 
                    <Route exact path="/store-add" component={StoreAdd}/>
                    <Route exact path="/store-edit/:id" component={StoreEdit}/>
                    <Route path="" component={PageNotFound}/>
                </Switch>
                <Footer />                
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth
    }
};

export default connect(mapStateToProps,null)(AdminLanding);


