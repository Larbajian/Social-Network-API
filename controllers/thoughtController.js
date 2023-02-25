const{ thought } = require('../models');
const { populate } = require('../models/thought');


module.exports = {
//GET to get all thoughts
getThoughts(req,res) {
    thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

//GET to get a single thought by its _id
getSingleThought(req,res) {
    thought.findOne({_id: req.params.thoughtId})
    .select('-__v')
    .then((thought) =>
      !thought 
        ? res.status(404).json({message: 'No thought found with this id.'})
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
createThought(req,res) {
    thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

//PUT to update a thought by its _id
updateThought(req,res) {
    thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      {runValidators: true, new: true}
    )
      .then((thought) =>
        !thought 
          ? res.status(404).json({ message: 'No thought to update with this id.'})
          : res.json(thought)
          )
          .catch((err) =>res.status(500).json(err));
  },

//DELETE to remove a thought by its _id
deleteThought(req,res) {
    thought.findOneAndDelete( {_id: req.params.thoughtId} )
      .then((thought) => 
      !thought 
        ? res.status(404).json({ message: 'No thought to delete with this id.'})
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

///api/thoughts/:thoughtId/reactions

//POST to create a reaction stored in a single thought's reactions array field
addReaction(req,res) {
    thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions:req.body}},
        {runValidators: true, new:true}
    )
    .then((thought) => 
    !thought 
      ? res.status(404).json({ message: 'No thought to add reaction to found with that id.' })
      : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

//DELETE to pull and remove a reaction by the reaction's reactionId value
deleteReaction(req,res) {
    thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: req.params.reactionId},
        {runValidators: true, new:true}
    )
    .then((thought) => 
    !thought 
      ? res.status(404).json({ message: 'No thought to delete reaction to found with that id.' })
      : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  

};