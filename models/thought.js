const { triggerAsyncId } = require('async_hooks');
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, minlength: 1, maxlength: 280, required: true },
        createdAt: { type: Date, default: Date.now, get: formatDate }
        username: {}
    }

)



//formatDate getter for createdAt
