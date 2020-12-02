const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        zipcode: {
            type: Number
        },
        billing: {
            type: String
        }
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orgId: {
        type: Schema.Types.ObjectId,
        ref: 'Organisation',
        required: true
    }
});
module.exports = mongoose.model('Client', clientSchema)