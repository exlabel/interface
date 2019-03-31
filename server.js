const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const fs = require('fs')

const cors = require('cors')
var whitelist = [
    'http://localhost:3000',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'build')));
app.post("/processAudio", (req, res) => {
	console.log("received request to process audio")
	var mp3SongName = 'test.mp3';
	var mp3_file = fs.createWriteStream(mp3SongName);
	
	mp3_file.on('open', function (fd) {
		req.on('data', function(data){
			mp3_file.write(data);
		}); 
	
		req.on('end', function(){
			console.log("wrote file")
			mp3_file.end();
			// now that we've saved the file temporarily
			console.log("running python")
			var spawn = require("child_process").spawn; 
			var process = spawn('python',["./python/sentiment_analysis/main.py", 
								mp3SongName] )
			// Takes stdout data from script which executed 
			// with arguments and send this data to res object 
			process.stdout.on('data', function(data) { 
				console.log(data.toString())
				res.send(data.toString()); 
			})
	  	});
	});
  })
app.put('/processAudio', async function (req, res) {
	console.log(req.rawBody)
	return res.send('hi')
})
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);