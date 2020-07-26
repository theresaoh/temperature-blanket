import React from 'react';
import '../styles/login.css';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_SERVER_URL;

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
    const { email, password } = this.state;
    axios.post(`${apiUrl}/api/user`, {
      email: email,
      password: password
    });
    axios.get(`${apiUrl}/api/world`)
    .then(res => {console.log(res)})
    
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
        <form className="login-form">
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
            <button onClick={(event) => {this.submitForm(event)}}>Log In</button>
          </div>
        </form>
      </div>
    )
  }

}

export default Login;