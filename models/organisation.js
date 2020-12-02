const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organisationSchema = new Schema({
    cname: {
        type: String,
        required: true
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
    image: {
        type: String,
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
    account: {
        items: [{
            bank: {
                type: String,
            },
            acc_name: {
                type: String
            },
            acc_type: {
                type: String
            },
            acc_number: {
                type: Number
            },
            ifsc_code: {
                type: String
            },
            gst_no: {
                type: String
            },
            cin: {
                type: String
            }
        }]
    },
    admin: {
        type: String,
        required: true
    },
    members: {
        user: [{
            name: {
                type: String
            },
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            user_status: {
                type: Boolean,
                default: true
            }
        }]
    }
},{
    timestamps: true
});

organisationSchema.methods.addUsers = function (user) {
    const userIndex = this.members.user.findIndex(cp => {
        return cp.userId.toString() === user._id.toString();
    });
    const updatedUsers = [...this.members.user];

    if (userIndex >= 0) {
    } else {
        updatedUsers.push({
            name: `${user.fname} ${user.lname}`,
            userId: user._id,
            user_status: true
        });
    }
    const updatedUser = {
        user: updatedUsers
    };
    this.members = updatedUser;
    return this.save();
};

module.exports = mongoose.model('Organisation', organisationSchema);