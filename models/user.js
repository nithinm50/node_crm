const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const possibleProfiles = ["administrator", "standard"];

const userSchema = new Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    profile: {
        type: String,
        default: 'administrator',
        enum: possibleProfiles
    },
    alias: {
        type: String
    },
    phone: {
        type: Number
    },
    mobile: {
        type: Number
    },
    website: {
        type: String
    },
    dob: {
        type: String
    },
    password: {
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
        zipcode: {
            type: Number
        },
        country: {
            type: String
        }
    },
    orgId: {
        type: Schema.Types.ObjectId,
        ref: 'Organisation'
    },
    resetToken: String,
    TokenExpiry: Date,
    created_at: {
        type: Date,
        default: Date.now
    },

});


userSchema.virtual('possibleProfiles').get(function () {
    return possibleProfiles;
});

userSchema.methods.addOrganisation = function (id) {
    this.orgId = id;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);