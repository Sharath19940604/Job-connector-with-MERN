import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logoutuser} from '../../actions/authActions'
import {clearCurrentProfile} from '../../actions/profileActions'
 class Navbar extends Component {
   onLogoutClick(e){
     e.preventDefault();
     this.props.clearCurrentProfile();
     this.props.logoutuser();
   }
  render() {
    const { isAuthenticated,user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
         <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <a href="/login" onClick={this.onLogoutClick.bind(this)} className = "nav-link">
                <img src={user.avatar} alt={user.name} style={{width:'25px', marginRight: '5px'}} title = "Email id should be connected to gravatar to display the image"/>
                Logout
                </a>
              </li>
            </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link> 
              </li>
            </ul>
   );
    

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated? authLinks : guestLinks} 
            
          </div>
        </div>
      </nav>
    )
  }
}
Navbar.propTypes = {
  logoutuser: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps,{ logoutuser,clearCurrentProfile }) (Navbar);