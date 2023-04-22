const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
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
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: [true, 'this email has been used'],
        },
        image: {
            type: String,
            default: 'https://api.dicebear.com/6.x/adventurer/svg',
        },
        phoneNumber: {
            type: Number,
            unique: [true, 'this phone number has been used'],
            validate: {
                validator: function (value) {
                    return typeof value != String;
                },
                message: (props) => `${props.value} is not a valid phone number`,
            },
        },
        Role: {
            type: String,
            required: [true, "employee's role must be provided"],
            enum: {
                values: ['Account Staff', 'Post Staff', 'Admin'],
                message: '{VALUE} is not a valid role'
            },
        },
        Location: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('employee', employeeSchema);
