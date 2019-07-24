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
		 userId: db.users.id,
		 thumbnail: "",
		 about:  "",
	}
	db.profiles.data.push(profileData)
	res.status(201).send(db)
	db.profiles.id++
	db.users.id++
	},
	update:(req, res) => {
	const db = req.app.get('db');
	const profileIndex = db.profiles.data.findIndex(profile => profile.id === parseInt(req.params.profileId))
	if (profileIndex!==-1){
		const { thumbnail, about } = req.body
		const profId = db.profiles.data[profileIndex].id
		const userId  = parseInt(req.params.profileId);

		db.profiles.data[profileIndex] = {id:profId, userId:userId, thumbnail: thumbnail, about:about }
		return res.status(200).send(db)
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
	 res.status(201).send(db)
	},
	comment: (req, res) => {
	  const db = req.app.get('db');
	  const {comment, postId, userId} = req.body
	
	 let commentData = {
		commentId: db.comments.id,
		comment,
		postId,
		userId
	 }
	
	db.comments.data.push(commentData)
	db.comments.id++
	res.status(201).send(db)
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
	fetchPosts: (req, res) => {
	  const db = req.app.get('db');
	  const { userId } = req.params
	  const user = db.posts.data.filter(p => p.userId === parseInt(userId))
	  
	  res.status(200).send(user)  
	},
	viewPost: (req, res) => {
	  const db = req.app.get('db');
	  const { postId } = req.params
	  const post = db.posts.data.find(p => p.postId === parseInt(postId))
	
	  if (post.length = 0){
		res.status(404).send({error: 'not found'})
	  }
	  res.status(200).send(post)	
	}
}
