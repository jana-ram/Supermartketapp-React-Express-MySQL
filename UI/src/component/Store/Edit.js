import React from 'react';
import { connect } from 'react-redux';
import {
    storeAddEdit,
    alertNotification,
    getStoreDetailById
} from '../../action';
import {
    CommonConstant
} from '../../constant';
import { Link } from 'react-router-dom';
import {
    emptyValidationCheck,
    emailFormatValidation
} from '../../validation';

class StoreEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            storeName : "",
            phone : "",
            address : "",
            email : "",
            storeCode : "",
            storeId : 0,
            submit:false,  
            submitLoader : false,
            emailError : ""
        }
    }
    inputChanges = (e) => {
        const { name , value } = e.target;
        this.setState({
            [name] : value
        });
    }
    componentDidMount(){
        const {
            params
        } = this.props.match;
        if(params){
            const {
                id
            } = params;
            this.props.getStoreDetailById(id);
        }
    }
    submitData = () =>{
        const {
            storeName,
            phone,
            address,
            email,
        } = this.state;
        this.setState({
            submit : true,
            emailError : ""
        });
        let error = 0;
        if(!emptyValidationCheck(storeName)) {
            error = 1;
        }
        if(!emptyValidationCheck(phone)) {
            error = 1;
        }
        if(!emptyValidationCheck(address)) {
            error = 1;
        }
        if(!emptyValidationCheck(email)) {
            error = 1;
            this.setState({
                emailError : "Please enter email address"
            });
        } else {
            if(!emailFormatValidation(email)){
                error = 1;
                this.setState({
                    emailError : "Please enter valid email address"
                });
            }
        }
        if(error === 0){
            this.setState({
                submitLoader : true
            });
            this.props.storeAddEdit(this.state);
        }

    }
    componentWillReceiveProps(nextProps) {
        const {
            payload,
            type,
            error
        } = nextProps['store'];
        this.setState({
            submitLoader : false
        });

        if(type === CommonConstant.GETSTOREDETAILBYIDSUCCESS){
            if(payload){
                const {
                    storeName,
                    phone,
                    address,
                    email,
                    id ,
                    storeCode
                } = payload;
                this.setState({
                    storeName,
                    phone,
                    address,
                    email,
                    storeId : id ,
                    storeCode
                })
            }
        }
        if(type === CommonConstant.GETSTOREDETAILBYIDFAIL){
            this.props.alertNotification(error,'fail');
        }
        if(type === CommonConstant.ADDEDITSTORESUCCESS){
            this.props.alertNotification('Store updated Successfuly !','success');
            this.props.history.push('/store');
        }

        if(type === CommonConstant.ADDEDITSTOREFAIL){
            this.props.alertNotification(error,'fail');
        }
        
    }    
    render() {
        const {
            storeName,
            phone,
            address,
            email,
            submit,  
            submitLoader,
            emailError,
            storeCode
        } = this.state;
        return(
            <div className="content-wrapper">
                <section className="content-header">
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/dashboard">
                            <i className="fa fa-dashboard"></i> Home</Link>
                        </li>
                        <li className="active">
                            <Link to="/store/add">
                            <i className="fa fa-user"></i> Store</Link>
                        </li>
                    </ol>
                </section>


                <section className="content">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Edit Store</h3>
                                </div>
                                <form ref={(el) =>
                                this.customerAddFormData = el}>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label htmlFor="fname">Store Name <span className="required mandatory">*</span></label>
                                        <input type="text" className="form-control" id="storeName" name="storeName" onChange={this.inputChanges} autoComplete="off" value={storeName}/>
                                        {
                                            (submit && !storeName) &&
                                            <div className="errorMessage">Please enter store name</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fname">Store Code <span className="required mandatory">*</span></label>
                                        <input type="text" className="form-control" id="storeName" name="storeName" onChange={this.inputChanges} autoComplete="off" value={storeCode} readOnly={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fname">Mobile <span className="required mandatory">*</span></label>
                                        <input type="text" className="form-control" id="phone" name="phone" onChange={this.inputChanges} value={phone}/>
                                        {
                                            (submit && !phone) &&
                                            <div className="errorMessage">Please enter phone number</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fname">Email <span className="required mandatory">*</span></label>
                                        <input type="text" className="form-control" id="email" name="email" onChange={this.inputChanges} value={email}/>
                                        {
                                            (submit && emailError) &&
                                            <div className="errorMessage">{emailError}</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fname">Address <span className="required mandatory">*</span></label>
                                        <input type="text" className="form-control" id="address" name="address" onChange={this.inputChanges} value={address}/>
                                        {
                                            (submit && !address) &&
                                            <div className="errorMessage">Please enter phone address</div>
                                        }
                                    </div>
                                </div>
                                </form>
                                <div className="box-footer">
                                {
                                    (!submitLoader) &&

                                    <a  className="btn btn-primary pull-right" onClick={this.submitData}>Save</a>
                                }
                                {
                                    (submitLoader) &&
                                     <a className="buttonload pull-right" style={{display:'inline'}} id="submitBtnLoader">
                                     <i className="fa fa-spinner fa-spin"></i> Loading
                                     </a>
                                }
                                <Link  className="btn btn-warning pull-left" to="/store">Back</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                        </div>
                </section>

            </div>
        )
    }

}
const mapStateToProps = (state) => {
    const { store } = state;
    return {
        store
    }
}
export default connect(mapStateToProps,{
    storeAddEdit,
    alertNotification,
    getStoreDetailById
})(StoreEdit);