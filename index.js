const express = require("express");
const app = express();

app.use(express.static(__dirname + '/client'))

// MongoDB Atlas Starts Here
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require("mongoose");

const mongooseUri = "mongodb+srv://ApplicationUser:FpAu5387@final-project-animalgue.fpwuzdn.mongodb.net/AnimalGuessingGameLeaderboard";
mongoose.connect(mongooseUri, {useNewUrlParser: true}, {useUnifiedTopology: true});
const leaderboardSchema = {
	name: String,
	score: String
};
const Points = mongoose.model("points", leaderboardSchema);

app.post("/create", function(req, res){
	let newNote = new Points({
		name: req.body.name,
		score: req.body.score
	});
	
	newNote.save();
	res.redirect("/");
});

const renderNotes = (notesArray) => {
	let text = "Leaderboard Entries:\n\n";
	notesArray.forEach((note)=>{
		text += "Name: " + note.name  + "\n";
		text += "Score: " + note.score  + "\n";
		text += "ID:" + note._id + "\n\n";
	});
	text += "Total Count: " + notesArray.length;
	return text;
};

app.get("/read", function(request, response) {
	Points.find({}).then(notes => { 
		response.type('text/plain');
		response.send(renderNotes(notes));
	});
});
// MongoDB Atlas Ends Here

const port = process.env.PORT || 3000
app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})
