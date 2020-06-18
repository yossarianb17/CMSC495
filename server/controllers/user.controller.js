const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const User = mongoose.model('User');
const Transaction = require('../models/transaction.model');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.accountType = "checking";
    user.balance = 0;
    user.save((err, doc) => {
        if (!err)  
            res.send(doc);
        else {
            if (err.code == 11000){
                console.log(err);
                res.status(422).send(['Duplicate email adrress found.']);
            }
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}
function getEmail(id) {
    User.findOne({ _id: id },
        (err, user) => {
            if (!user)
                return null;
            else
                return user.email;
        }
    );
}
module.exports.transactionHistory = (req, res, next) => {
    Transaction.find({
        $or: [
            {userId: req._id},
            {to: getEmail(req._id)},
            ]
        },
        (err, transaction) => {
            if(!transaction)
                return res.status(404).json({ status: false, message: 'No transaction yet' });
            else {
                console.log('got it');
                console.log(transaction);
                return res.json({ transaction:transaction });
            }
        });
}
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email', 'balance', 'accountType']) });
        }
    );
}
module.exports.transfer = (req, res, next) => {
   User.findOne({email: req.body.email},
        (err, user) => {
            if(!user){
                return res.status(404).json({status: false, message: 'No user By this email'});
            }
            else {
                User.findOne({ _id: req._id},
                    (err, sender) => {
                        if(sender.email == user.email) {
                            return res.status(404).json({status: false, message: 'That is ur email'});
                        }
                        else {
                            if (sender.balance < req.body.amount){
                                res.status(422).json({ status: false, message: 'Balance low to withdraw the requested amount.' });
                            }
                            else {
                                sender.balance = sender.balance - Number(req.body.balance);
                                user.balance = user.balance + Number(req.body.balance);
                                user.save((err, doc) => {
                                    if(!err){
                                        sender.save((err, doc) => {
                                            if(!err){
                                                // res.send(doc);
                                                var transaction = new Transaction();
                                                transaction.userId = req._id;
                                                transaction.ownerEmail = sender.email;
                                                transaction.transactionType = "transfer";
                                                transaction.amount = Number(req.body.balance);
                                                transaction.from = sender.email;
                                                transaction.to = user.email;

                                                transaction.save((err, doc) => {
                                                    if(!err) {
                                                        res.send(doc);
                                                    }
                                                    else {
                                                        res.status(422).json({ status: false, message: 'Some problem occured contact admin' });
                                                    }
                                                });
                                            }
                                            else {
                                                res.status(422).json({ status: false, message: 'Some problem occured contact admin' });
                                            }
                                        });
                                    }
                                    else {
                                        console.log(err);
                                    }
                                });
                            }
                        }
                    }
                );
            }
        }
    );
}

module.exports.deposit = (req, res, next) => {
    const amount = Number(req.body.balance);
    User.findOne({_id: req._id},
        (err, user) => {
            if(!user){
                console.log('no user');
            }
            else {
                user.balance = user.balance + amount;
                user.save((err, doc) => {
                    if(!err){
                        var transaction = new Transaction();
                        transaction.userId = req._id;
                        transaction.ownerEmail = user.email;
                        transaction.transactionType = "deposit";
                        transaction.amount = Number(req.body.balance);
                        transaction.to = "-";
                        transaction.from = "-";
                        transaction.save((err, doc) => {
                            if(!err) {
                                res.send(doc);
                            }
                            else {
                                res.status(422).json({ status: false, message: 'Some problem occured contact admin' });
                            }
                        });
                    }
                    else {
                        console.log(err);
                    }
                });
            }
        });
}
module.exports.withdraw = (req, res, next) => {
    const amount = Number(req.body.balance);
    User.findOne({_id: req._id},
        (err, user) => {
            if(!user){
                console.log('no user');
            }
            else {
                if (user.balance < amount){
                    res.status(422).json({ status: false, message: 'Balance low to withdraw the requested amount.' });
                }
                else {
                    user.balance = user.balance - amount;
                        user.save((err, doc) => {
                            if(!err){
                                var transaction = new Transaction();
                                transaction.userId = req._id;
                                transaction.ownerEmail = user.email;
                                transaction.transactionType = "withdraw";
                                transaction.amount = Number(req.body.balance);
                                transaction.to = "-";
                                transaction.from = "-";
                                transaction.save((err, doc) => {
                                    if(!err) {
                                        res.send(doc);
                                    }
                                    else {
                                        res.status(422).json({ status: false, message: 'Some problem occured contact admin' });
                                    }
                                });
                            }
                            else {
                                console.log(err);
                            }
                    });
                }
            }
        }
    );
}






