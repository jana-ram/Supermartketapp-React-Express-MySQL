import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authDetail } from '../../helper';
class Sidebar extends React.Component{
    render() {
       const {
          username
       } = authDetail();
        return(
            <aside className="main-sidebar">
            <section className="sidebar">
               <div className="user-panel">
                  <div className="pull-left image">
                     <img src={`${process.env.REACT_APP_STATIC_URL}/dist/img/user2-160x160.jpg`} className="img-circle" alt="User Image" />
                  </div>
                  <div className="pull-left info">
                     <p>{username}</p>
                     <Link to="/"><i className="fa fa-circle text-success"></i> Admin</Link>
                  </div>
               </div>
               <ul className="sidebar-menu" data-widget="tree">
                  <li className='active'>
                     <Link to="/store">
                     <i className="fa fa-home"></i> <span>Store</span>
                     </Link>
                  </li>                              
               </ul>
            </section>
         </aside>
        )
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth
    }
};

export default connect(mapStateToProps,null)(Sidebar);
