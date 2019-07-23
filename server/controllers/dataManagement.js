
module.exports = {
	signUp: (req, res) => {
	 const db = req.app.get('db');
	 const {email, password} = req.body
	 let userData = {
		id: db.users.id,
		email: email,
		password: password
	 }

	db.users.data.push(userData)
	let profileData = {
		 id: db.profiles.id,
		 thumbnail: "",
		 about:  "",
	}
	db.profiles.data.push(profileData)
	res.status(200).send('data sent!')
	db.profiles.id++
	db.users.id++
	},
	update:(req, res) => {
	const db = req.app.get('db');
	const {profileId} = req.params
	const profileIndex = db.profiles.data.findIndex(profile => profile.id === parseInt(profileId))
	if (profileIndex!==-1){
		const { thumbnail, about } = req.body
		var id  = parseInt(profileId);
		db.profiles.data[profileIndex] = {id, thumbnail, about}
		return res.status(200).send('updated!')
	  }
	return res.status(404).send({error: 'not found!'})
	},
	post: (req, res) => {
	  const db = req.app.get('db');
	  const { content } = req.body
	  var { userId } = req.params
	  userId = parseInt(userId)
	  let postData = {
	 	postId: db.posts.id,
		userId: userId,
		content: content
	  }
	
	  db.posts.data.push(postData)
	  db.posts.id++
	 res.status(200).send('posted complete!')
	},
	comment: (req, res) => {
	 const db = req.app.get('db');
	 const {comment} = req.body
	 var {userId, postId} = req.params
	
	 let commentData = {
		commentId: db.comments.id,
		content: comment,
		postId: postId,
		userId: userId
	 }
	
	db.comments.data.push(commentData)
	db.comments.id++
	res.status(200).send('comment added!')
	},
	getProfile: (req, res) => {
	 const db = req.app.get('db');
	 const { email  } = req.query
	 const user  = db.users.data.find(p => {
		return	p.email === email	
	 })
	const profile = db.profiles.data.find(p => p.id === user.id)
	res.status(200).send(profile)
	},
	debug: (req, res) => {
	  res.status(200).json(req.app.get('db'))
	}

}
