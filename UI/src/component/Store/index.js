import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {
    getStoreList,
    alertNotification
} from '../../action';
import { CommonConstant } from '../../constant';
class Store extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalItemsCount : 0,
            activePage: 1,
            storeList : [],
            totalItemsCount : 0,
            limit: 20,
            pageRangeDisplayed:6,
            searchKey: "",
            loading:true,
            noRecord : "",
        }
    }
    componentDidMount(){
        this.dataFeeding();
    }
    dataFeeding = () => {
        let searchKey = "";
        if(document.getElementById("search"))
            searchKey = document.getElementById("search").value;
        const {
            activePage,
            limit
        } = this.state;
        const offset = (activePage * limit) - limit;
        let obj = {
            searchKey,
            offset,
            limit
        };
        this.props.getStoreList(obj);
    }
    handlePageChange = (page , key) => {
        this.setState({
            activePage : page
        },() =>{
            this.dataFeeding();
        })
    }
    componentWillReceiveProps(nextProps) {
        const {
            type,
            error,
            payload,
            count
        } = nextProps['store'];
        this.setState({
            loading : false,
            noRecord : ""
        })
        if(type === CommonConstant.GETSTORELISTSUCCESS){
            if(payload) {
                this.setState({
                    storeList : (payload.length > 0) ? payload : [],
                    loading:false,
                    totalItemsCount: count,
                    noRecord : (payload.length<=0) ? "No records found!" :""
                })
            }
        }
        if(type === CommonConstant.GETSTORELISTFAIL){
            this.props.alertNotification(error,'fail');
        }
    }
    render() {
        const {
            totalItemsCount,
            loading,
            noRecord,
            activePage,
            limit,
            pageRangeDisplayed,
            storeList,
        } = this.state;
        return(
            <div className="content-wrapper" style={{overflow:'hidden'}}>
                <section className="content-header">
                    <h1>
                    Store List - {totalItemsCount}
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/dashboard">
                            <i className="fa fa-dashboard"></i> Home</Link>
                        </li>
                        <li className="active">Store List</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header">
                                <div className="row form-group">
                                    <div className="col-md-12">
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" id="search" style={{width:'94%'}} autoComplete="off" />
                                            <a type="button" className="btn btn-info btn-flat new-customer-go" onClick={this.dataFeeding}>Go!</a>
                                        </div>
                                        <div className="col-md-6">
                                            <Link className="btn btn-success btn-flat pull-right" to={'/store-add'}>New Store</Link>
                                        </div>
                                    </div>                                    
                                </div>                                
                            </div>
                            <div className="box-body">
                            <table id="example2" className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Store Name</th>
                                        <th>Store Code</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {
                                        (storeList.length > 0) && 
                                        storeList.map((val,key) =>{
                                            const {
                                                id,
                                                storeName,
                                                email,
                                                phone,
                                                storeCode,
                                                isActive
                                            } = val;
                                            return (
                                                <tr key={id}>
                                                    <td>
                                                        {storeName}
                                                    </td>
                                                    <td>
                                                        {storeCode}
                                                    </td>
                                                    <td>
                                                        {email}
                                                    </td>
                                                    <td>
                                                        {phone}
                                                    </td>
                                                    <td>
                                                        {(isActive) ? 'Active' : 'Deactive'}
                                                    </td>
                                                    <td>
                                                    <Link to={`/store-edit/${storeCode}`} title="Edit Store" className="btn btn-sm"><i className="fa fa-lg fa-edit fa-lg"></i> </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {
                                (loading) && <i className="fa fa-refresh fa-spin loader"></i>
                            }
                            {
                                <p className="no-record-found">{noRecord}</p>
                            }
                            {
                                <Pagination
                                activePage={activePage}
                                itemsCountPerPage={limit}
                                totalItemsCount={totalItemsCount}
                                pageRangeDisplayed={pageRangeDisplayed}
                                onChange={this.handlePageChange}
                                />                                
                            }
                            </div>
                        </div>
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
};
export default connect(mapStateToProps,{
    getStoreList,
    alertNotification
})(Store);