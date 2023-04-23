const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        commentatorID: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: 'user',
            required: [true, 'commentatorID must be provided'],
        },
        postID: {
            type: [mongoose.SchemaType.ObjectId],
            ref: 'post',
            required: [true, 'postID must be provided'],
        },
        content: {
            type: String,
            required: true,
        },
        like: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('comment', commentSchema);
