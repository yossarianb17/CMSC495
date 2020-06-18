const mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId
    },
    ownerEmail: {
        type: String
    },
    transactionType: {
        type: String
    },
    amount: {
        type: Number
    },
    from: {
        type: String
    },
    to: {
        type: String
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;