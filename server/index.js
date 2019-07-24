const express = require('express');
const ctrl = require('./controllers/dataManagement.js');
const PORT = 3002;


const db = {
  users: {
   id: 0,
   data: [],
 },
 
  profiles: {
   id: 0,
   data: [],
 },

  posts: {
   id: 0,
   data: [],
 },

  comments: {
   id: 0,
   data: [],
 } 
}



const app = express();
app.use(express.json());


app.set('db',db);

//debug
app.get('/debug', (req, res) => {
		res.status(200).send(db);	
	});

//app.patch
app.patch('/update-profile/:profileId', ctrl.update);

//app.get
app.get('/get-profile', ctrl.getProfile);
app.get('/user/:userId/posts', ctrl.fetchPosts)
app.get('/posts/:postId', ctrl. viewPost)

//app.post
app.post('/create-post/:userId', ctrl.post);
app.post('/add-comment', ctrl.comment);
app.post('/sign-up',ctrl.signUp);


app.listen(PORT, () => {
  console.log(`
-----------------------------
|Server now live @ PORT:${PORT}|
-----------------------------
`);
})


