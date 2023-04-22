const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'userName is required'],
            unique: true,
            validate: {
                validator: function (value) {
                    return typeof value != Number;
                },
                message: (props) => `${props.value} is not a valid user name`,
            },
        },
        password: String,
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: [true, 'this email has been used'],
        },
        Bio: {
            type: String,
            default: '',
        },
        phoneNumber: {
            type: Number,
            validate: {
                validator: function (value) {
                    return typeof value != String;
                },
                message: (props) => `${props.value} is not a valid phone number`,
            },
        },
        image: {
            type: String,
            default: 'https://api.dicebear.com/6.x/adventurer/svg',
        },
        block: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('user', userSchema);
