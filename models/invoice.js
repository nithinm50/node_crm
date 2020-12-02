const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    iNo:{
        type: String,
    },
    po_no:{
        type: String,
        required: true
    },
    issueDate:{
        type: String,
        required: true
    },
    dueDate:{
        type: String,
        required: true
    },
    clientId:{
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    product:{
        item: [{
            name: {
                type: String
            },
            sac_no: {
                type: String
            },
            quantity:{
                type: Number
            },
            rate: {
                type: Number
            },
            amount:{
                type: Number
            }
        }]
    },
    commession:{
        type: Number
    },
    tax:{
        type: String,
        default: 'state',
        enum: ["state", "interstate"]
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        default: 'new',
        enum: ["new", "sent", "partially paid", "paid"]
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);