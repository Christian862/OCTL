// 570712187705-ckmqij37j2n5tgedv6r5o3vmgbvbrdpt.apps.googleusercontent.com
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '570712187705-ckmqij37j2n5tgedv6r5o3vmgbvbrdpt.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          // this.auth.isSignedIn object 'inherits'/has the __proto__ attribute with a method called listen
          // it takes a callback to execute when this.auth.isSignedIn changes.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // The callback function to listen gets passed the isSignedIn boolen
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <div className="item">
          <button onClick={this.onSignOutClick} className="ui google button">
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="item">
          <button onClick={this.onSignInClick} className="ui google button">
            <i className="google icon" />
            Sign In with Google
          </button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()} </div>;
  }
}

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
