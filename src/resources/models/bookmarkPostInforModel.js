const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkPostInfo = new Schema(
    {
        userID: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: 'user',
            required: [true, 'userID must be provided'],
        },
        postID: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: 'post',
            required: [true, 'postID must be provided'],
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('bookmarkPostInfo', bookmarkPostInfo);
