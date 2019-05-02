import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {

  constructor(props){
    super(props);
    this.state = { inputValue: '', inputLocationValue: '' };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.updateInputLocationValue = this.updateInputLocationValue.bind(this);
  }  

  componentDidMount() {
    this.props.getProfiles();
  }

  getInitialState = function(){
    return {
      inputValue: '',
      inputLocationValue : ''
    };
  }

  updateInputValue = function(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  updateInputLocationValue = function(evt) {
    this.setState({
      inputLocationValue: evt.target.value
    });
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0 && this.state.inputValue === '' && this.state.inputLocationValue === '') {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else if(profiles.length > 0 && this.state.inputValue !== '' && this.state.inputLocationValue === ''){
        profileItems = profiles.map(profile => (profile.user.name.toLowerCase().includes(this.state.inputValue.toLowerCase())) ? <ProfileItem key={profile._id} profile={profile} />  : '');
      } else if(profiles.length > 0 && this.state.inputValue === '' && this.state.inputLocationValue !== ''){
        profileItems = profiles.map(profile => (profile.location.toLowerCase().includes(this.state.inputLocationValue.toLowerCase())) ? <ProfileItem key={profile._id} profile={profile} />  : '');
      } else if(profiles.length > 0 && this.state.inputValue !== '' && this.state.inputLocationValue !== ''){
        profileItems = profiles.map(profile => (profile.user.name.toLowerCase().includes(this.state.inputValue.toLowerCase()) && profile.location.toLowerCase().includes(this.state.inputLocationValue.toLowerCase())) ? <ProfileItem key={profile._id} profile={profile} />  : '');
      } 
      else{
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              <div className="card card-body bg-light mb-3">
              <strong>Name : </strong><input type="text" placeholder="Search.." onChange={this.updateInputValue}></input>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <strong>Location : </strong><input type="text" placeholder="Search.." onChange={this.updateInputLocationValue}></input> </div>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
