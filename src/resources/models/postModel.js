const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        owner: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: 'user',
            required: [true, "owner's id must be provided"],
        },
        title: {
            type: String,
            required: [true, "post's title must be provided"],
        },
        category: {
            type: String,
            ref: 'category',
            required: [true, 'category must be provided'],
        },
        like: {
            type: Number,
            default: 0,
            validator: {
                validate: function (value) {
                    return value >= 0;
                },
                message: (props) => `${props.value} is a negative number`,
            },
        },
        views: {
            type: Number,
            default: 0,
            validator: {
                validate: function (value) {
                    return value >= 0;
                },
                message: (props) => `${props.value} is a negative number`,
            },
        },
        content: {
            type: String,
            required: [true, 'content must be provided'],
        },
        approval: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('post', postSchema);
