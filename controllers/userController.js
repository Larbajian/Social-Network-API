const { user, thought } =  require('../models');
const { populate } = require('../models/user');

module.exports = {
//GET all users
getUsers(req,res) {
  user.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},

//GET a single user by its _id and populated thought and friend data

getSingleUser(req,res) {
  user.findOne({_id: req.params.userId})
  .select('-__v')
  .then((user) =>
    !user 
      ? res.status(404).json({message: 'No user found with this id.'})
      : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

//POST a new user:

createUser(req,res) {
    user.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

//PUT to update a user by its _id

updateUser(req,res) {
  user.findOneAndUpdate(
    {_id: req.params.userId},
    {$set: req.body},
    {runValidators: true, new: true}
  )
    .then((user) =>
      !user 
        ? res.status(404).json({ message: 'No user to update with this id.'})
        : res.json(user)
        )
        .catch((err) =>res.status(500).json(err));
},

//BONUS: Remove a user's associated thoughts when deleted
deleteUserAndThoughts(req, res) {
  user.findOneAndDelete({ _id: req.params.userId })
  .then((user) =>
  !user
    ? res.status(404).json({message: 'No user found with that id.'})
    : thought.deleteMany({_id: {$in: user.thoughts}})
  )
  .then(() => res.json({ message: "User and user's thoughts deleted!"}))
  .catch((err) => res.status(500).json(err));
},


addFriend({params},res) {
  user.findOneAndUpdate(
    {_id: params.userId},
    {$addToSet: {friends:params.friendId }},
    {new: true}
  )
  .select('-__v')
  .populate('friends')
  .then((user) => 
  !user 
    ? res.status(404).json({ message: 'No user to add friend to found with that id.' })
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

deleteFriend({params},res) {
  user.findOneAndUpdate(
    {_id: params.userId},
    {$pull: {friends:params.friendId }},
    {runValidators: true, new: true}
  )
  .select('-__v')
  .populate('friends')
  .then((user) => 
  !user 
    ? res.status(404).json({ message: 'No user to delete friend from found with that id.' })
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
}


};