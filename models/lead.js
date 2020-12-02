const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadSchema = new Schema({
    fname: {
        type: String
    },
    lname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    fax: {
        type: String
    },
    mobile: {
        type: Number
    },
    website: {
        type: String
    },
    lead_source: {
        type: String
    },
    lead_status: {
        type: String
    },
    industry: {
        type: String
    },
    rating: {
        type: String
    },
    revenue: {
        type: String
    },
    email_opt: {
        type: Boolean
    },
    utm_source: {
        type: String
    },
    utm_medium: {
        type: String
    },
    utm_campaign: {
        type: String
    },
    utm_content: {
        type: String
    },
    address: {
        area: {
            type: String
        },
        street: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        zipcode: {
            type: Number
        }
    },
    description: {
        type: String
    },
    image: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_by: {
        name:{
            type: String
        },
        id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        }
    },
    modified_by: {
        name:{
            type: String 
        },
        id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        }
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema)