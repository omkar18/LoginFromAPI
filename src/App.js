import React, { Component } from "react";
import "./App.css";
import PasswordMask from 'react-password-mask';
import {PostData} from './PostData';
import {Redirect} from 'react-router-dom';


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};
class App extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      formErrors: {
        username: "",
        password: "",
        redirect : false
      }
    };
  }


  handleSubmit = e => {
    // e.preventDefault();

    // if (formValid(this.state)) {
    //   console.log(`
    //     --SUBMITTING--
    //     username: ${this.state.username}
    //     Password: ${this.state.password}
    //   `);
    // } else {
    //   console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    // }
    // fetch('https://testapi.extraaedge.com/token')
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(myJson) {
    //   console.log(JSON.stringify(myJson));
    // });
  };

// Login functionality
  login(){
    if(this.state.username && this.state.password){
      PostData('login',this.state).then((result) => {
       let responseJson = result;
       if(responseJson.userData){         
         sessionStorage.setItem('userData',JSON.stringify(responseJson));
         this.setState({redirect: true});
       }else{
         console.log('error');
       }
       
      });
};
}

// handle changes event
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "username":
      formErrors.username =
      value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };


  render() {
    // Redirect after successful login
    if(this.state.redirect){
      return(<Redirect to={'/App'}/>)
    }
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <img className = "logo" src={require('./seed.png')} />        
            <form noValidate>
            {/* UserName field */}
            <div className="username">
              <label htmlFor="username">User Name</label>
              <input className={formErrors.username.length > 0 ? "error" : null}
                placeholder="User Name"
                type="text"
                name="username"
                noValidate
                onChange={this.handleChange}
              />

             {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <PasswordMask className={formErrors.password.length > 0 ? "error" : null}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div>
              <input type="checkbox"/><span>Remember me</span>
              <span className="forgot-password">Forgot Password</span>
            </div>
            <div className="login-btn">
              <button type="submit" onClick= {this.login}>LOGIN</button>
              
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default App;