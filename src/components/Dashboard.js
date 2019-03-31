import React, {Component} from 'react'
import firebase from './../utils/firebase.js'
import axios, { post } from 'axios';
import Song from './Song.js'
import NewSong from './NewSong.js'

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			songs: []
		}
	}

	componentDidMount() {
		let self = this
		if (firebase.auth().currentUser == null) {
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					let db = firebase.firestore()
					db.collection('users').doc(user.uid).collection("songs").get().then((snapshot) => {
						snapshot.forEach(doc => {
							console.log(doc.data())
							let songs = self.state.songs
							songs.push(doc.data())
							self.setState({songs: songs})
						})
					})
				} else {
					
				}
			})
		} else {
			let self = this
			let db = firebase.firestore()
			db.collection('users').doc(firebase.auth().currentUser.uid).collection("songs").onSnapshot((doc) => {
				let songs = self.state.songs
				if (doc["data"]) {
					songs.push(doc.data())
				} else {
					songs.push(doc)
				}
				console.log(doc)
				self.setState({songs: songs})
			})
		}
		
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
				<div className="w3-container">
					<NewSong/>
				</div>
				<div className="w3-container">
					<h1>Your Songs</h1>
					<div className="w3-row">
					{this.state.songs.map((song, key) => {
							console.log(song)
							return <Song key={key} data={song}/>
						})}
					</div>
				</div>
			</div>
		)
	}
}