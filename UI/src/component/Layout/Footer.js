import React from 'react';
import { Link } from 'react-router-dom';
export const Footer = () =>{
    const date = new Date().getFullYear();
    return(
        <footer className="main-footer">
            <div className="pull-right hidden-xs">
               <b>Version</b> 1.0.0
            </div>
            <strong>Copyright &copy; {date} <Link to="/store">{process.env.REACT_APP_SITENAME}</Link>.</strong> All rights
            reserved.
         </footer>
    )
}