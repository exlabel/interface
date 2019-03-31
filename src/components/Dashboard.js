import React, {Component} from 'react'
import firebase from './../utils/firebase.js'
import axios, { post } from 'axios';

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.logOut = this.logOut.bind(this)
		this.musicUploaded = this.musicUploaded.bind(this)
		this.fileChange = this.fileChange.bind(this)
		this.state = {
			lyrics: "no lyrics transcribed at this moment"
		}
	}

	logOut() {
		let self = this
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			self.props.history.push('/')
		  }, function(error) {
			// An error happened.
		  });
	}

	musicUploaded(e) {
		e.preventDefault()
		this.fileUpload(this.state.file).then((response) => {
			console.log(response.data)
			this.setState({
				lyrics: response.data
			})
		})

		console.log(this.uploadInput.value)
		console.log(this.songTitle.value)

		// send data to express
		let audioBinary = this.binaryString
		console.log(audioBinary)
		// const makeWithSpeechRequest = (audioBinary) => {
		// 	request({
		// 	  url: '/parseAudio',
		// 	  method: 'POST',
		// 	  body: audioBinary,
		// 	  encoding: null
		// 	}, (error, response, body) => {
		// 	  if (error) {
		// 		 console.log('Error sending message: ', error)
		// 	  } else {
		// 		console.log('Response: ', response.body)
		// 	  }
		// 	})
		//   }
		// // call python script
		// const spawn = require("child_process").spawn;
		// const pythonProcess = spawn('python',["./../python/nir.py", this.uploadInput.value])
		// pythonProcess.on('data', (data) => {
		// 	console.log(data)
		// })
	}

	fileChange(e) {
		this.setState({file: e.target.files[0]})
	}

	fileUpload(file) {
		const url = '/processAudio'
		const formData = new FormData()
		formData.append('file', file)
		const config = {
			headers: {
				'content-type': 'application/octet-stream'
			}
		}
		return post(url, file, config)
	}

	componentDidMount() {
		let self = this
		firebase.auth().onAuthStateChanged(
			function(user) {
				if (!user) {
					// User is signed out.
					self.props.history.push('/')
				}
			}
		)
	}

	render() {
		return (
			<div>
				<h1>Dashboard | <button onClick={this.logOut}>Log Out</button></h1>
				<form onSubmit={this.musicUploaded} action="#" >
					<input ref={(ref) => { this.uploadInput = ref }} onChange={this.fileChange} type="file" />
					<input ref={(ref) => { this.songTitle = ref; }} type="text" placeholder="Song Title" />
					<button>Upload</button>
				</form>
				<p>
					Lyrics Transcription:<br/><br/>
					{this.state.lyrics}
				</p>
			</div>
		)
	}
}