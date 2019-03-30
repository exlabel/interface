import React, {Component} from 'react'
import firebase from './../utils/firebase.js'


export default class Login extends Component {
	signIn() {
		const provider = new firebase.auth.FacebookAuthProvider();

		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  console.log(user)

		  let userJSON = {
			  name: user.displayName,
			  email: user.email,
			  profileURL: user.photoURL,
			  uid: user.uid
		  }
		  let db = firebase.firestore()
		  db.collection("users").doc(user.uid).set(userJSON)
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		  console.log(errorMessage)
		});
	}

	constructor(props) {
		super(props)
		this.signIn = this.signIn.bind(this)
	}

	componentDidMount() {
		let self = this
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			  // User is signed in.
			  self.props.history.push('/dashboard')
			}
		  });
	}

	render() {
		return (
			<div>
				<h1>Login</h1>
				<button onClick={this.signIn}>With Facebook</button>
			</div>
		)
	}
}