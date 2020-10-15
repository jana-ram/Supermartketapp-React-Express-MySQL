import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class PageNotFound extends React.Component{
    state = {
        pageName : ""
    }
    render() {
        return(
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        404 Error Page
                    </h1>
                    <ol className="breadcrumb">
                        <li><Link to="/dashboard"><i className="fa fa-dashboard"></i> Home</Link></li>
                        <li className="active">404 error</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="error-page">
                        <h2 className="headline text-yellow"> 404</h2>
                        <div className="error-content">
                            <h3><i className="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>
                            <p>
                            We could not find the page you were looking for.
                            Meanwhile, you may <Link to="/dashboard">return to dashboard</Link> or try using the search form.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth
    }
};

export default connect(mapStateToProps,null)(PageNotFound);


