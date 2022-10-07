import React from 'react'
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import TopHeader from './Header'

import db from "./firebase"
import { collection, query, getDocs } from "firebase/firestore";
import { Navigate } from 'react-router-dom';

import Toast from './Toast'


class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      authenticated: false,
      failed: false, 
    };
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem("authenticated");

    if(loggedIn === true){
      this.setState({
        authenticated: true
      });
    }
 }

  loginUser = async () => {
      // console.log('this.state: ' + JSON.stringify(this.state))
      // const first = query(
      //   collection(db, "users"),
      // );
      // const snapshot = await getDocs(first);
      // var users = snapshot.docs.map(doc => doc.data());

      // console.log('users: ' + JSON.stringify(snapshot))
      // users.forEach(user => {

      //   if (this.state.email === user.email){
      //     if (this.state.password === user.password){
            
      //       localStorage.setItem("authenticated", true)
      //       localStorage.setItem("email", this.state.email)
      //       this.setState({
      //         authenticated: true
      //       });
      //       return
      //     }
      //   }

      //   this.setState({
      //     password: "",
      //     failed: true
      //   });
      //   console.log('state: '+ this.state.failed);
        
      // });
    const auth = getAuth();
    console.log('auth: ' + auth)
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('user: ', JSON.stringify(user));
        localStorage.setItem("authenticated", true)
        localStorage.setItem("email", this.state.email)
        this.setState({
          authenticated: true
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({
              password: "",
              failed: true
            });
      });
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  triggerResetEmail = async () => {

    const auth = getAuth();
    await sendPasswordResetEmail(auth, this.state.email);
    console.log("Password reset email sent")
  }

  googleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("authenticated", true)
        localStorage.setItem("email", this.state.email)
        this.setState({
          authenticated: true
        });
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        this.setState({
          password: "",
          failed: true
        });
        // ...
      });
  }

  render() {

    if (this.state.authenticated) {
      return <Navigate to={'/'}/>;
    }

    return (
      <div>
      <TopHeader />
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='blue' textAlign='center'>
        Log-in
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.updateInput} value={this.state.email} name="email"/>
          <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.updateInput} value={this.state.password} name="password"
          />

          <Button color='blue' fluid size='large' onClick={this.loginUser}>
            Login
          </Button>
        </Segment>
        {this.state.failed && <Toast />}
      </Form>
      <div className="resetPassword-main">
        <button className="resetBtn" type="button" onClick={this.triggerResetEmail}>Reset password</button>
      </div>
      <div className="resetPassword-main">
        <button className="resetBtn" type="button" onClick={this.googleSignIn}>Sign with Google</button>
      </div>
      <Message>
        New user? <a href='/signup'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
  </div>

    )
}
}
export default Login