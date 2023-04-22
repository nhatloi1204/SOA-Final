const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followUser = new Schema(
    {
        userID: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: 'user',
            required: [true, 'userID must be provided'],
        },
        followUserID: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: 'user',
            required: [true, 'followUserID must be provided'],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('follow', followUser);
