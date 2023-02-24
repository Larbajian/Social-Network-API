const {Schema, model, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reationBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        //get: formatDate,
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minlength: 1,
      maxlength: 280,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions:[reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thought = model('thought', thoughtSchema);

module.exports = thought;


