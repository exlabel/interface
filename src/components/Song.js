import React, {Component} from 'react'

export default class Song extends Component {
	render() {
		let videoURL = `${this.props.data.videoURL}#t=0.5`
		return (
			<div className="w3-col m4 song width20">
				<video width="400" preload="metadata" controls>
				<source src={videoURL} type="video/mp4"/>
				Your browser does not support HTML5 video.
				</video>
				<div className="w3-container w3-center">
					<h3>{this.props.data.name}</h3>
					<p>{this.props.data.lyrics}</p>
				</div>
			</div>
		)
	}
}