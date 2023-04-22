const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tags = [
    'Technology',
    'Travel',
    'Business',
    'Entertainment',
    'Sport',
    'Education',
    'World',
    'Social',
    'Networking',
    'Discover',
    'Law',
    'Blockchain',
    'Game',
    'Fashion',
    'Movie',
    'School',
    'Job',
    'Website',
    'Development',
    'News',
    'Start-up',
    'Food',
    'Family',
    'Banking',
    'Social Media',
    'Design',
    'Enrollment',
    'Real estate',
];

const categorySchema = new Schema(
    {
        category: {
            type: String,
            required: [true, 'category must be provided'],
            enum: {
                values: [...tags],
                message: '{VALUE} is not supported',
            },
        },
        popular: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('category', categorySchema);
