import React from 'react';
import '../styles/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  submitForm = async (event) => {
    event.preventDefault();
    console.log("sup");
  }

  onInputChange = async (event) => {
    event.persist();
    this.setState({
      [event.target.id] : event.target.value
    }, ()=> {console.log(this.state)})
  }

  render() {
    return (
      <div id="login-component">
        <div>Login</div>
        <form className="login-form" onSubmit={(event) => {this.submitForm()}}>
          <div className="row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" onChange={(event) => {this.onInputChange(event)}}></input>
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(event) => {this.onInputChange(event)}}></input>
          </div>
          <div className="row">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirm-password" onChange={(event) => {this.onInputChange(event)}}></input>
          </div>
          <div className="button">
            <button>Log In</button>
          </div>
        </form>
      </div>
    )
  }

}

export default Login;