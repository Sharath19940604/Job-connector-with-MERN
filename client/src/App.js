import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutuser } from './actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import {clearCurrentProfile} from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';


//Checking for token
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  //decoding token and getting user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //setting to current user
 store.dispatch(setCurrentUser(decoded));
 //checking for  expired token
 const CurrentTime = Date.now() /1000;
 if (decoded.exp < CurrentTime){
    store.dispatch(logoutuser());
    store.dispatch(clearCurrentProfile());
    window.location.href ='/login';
 }
}

class App extends Component {
  render() {
    return (
      <Provider store ={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                </Switch>
                <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                </Switch>
                <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                </Switch>
                <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                </Switch>
                <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation}/>
                </Switch>
                <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />  
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
