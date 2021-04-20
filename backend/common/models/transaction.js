'use strict';

var app = require('../../server/server');
var User = app.models.user;

module.exports = function (Transaction) {


    // IMPORTANT: forward the options arg
    // console.log(User)
    //post route create transaction
    Transaction.createTransaction = function (ctx, options, model, cb) {
        console.log("this is option ", ctx.req);

        const userId = options.accessToken.userId;

        const { customer_name, amount, description, type } = model;
        Transaction.create({
            customer_name,
            amount,
            description,
            type,
            userId
        });

        cb(null, model);
    }

    Transaction.remoteMethod('createTransaction', {
        description: "this is desicriptions",
        http: { "verb": "post", "path": "/create-transaction" },
        accepts: [
            { "arg": "ctx", "type": "object", "http": { source: "context" } },
            { "arg": "options", "type": "object", "http": "optionsFromRequest" },
            {
                arg: "model", type: {
                    "customer_name": "string",
                    "amount": "number",
                    "description": "string",
                    "type": "string"
                },
                root: true,
                http: { source: 'body' }
            }
        ],
        returns: {
            arg: "model",
            type: 'Object',
            root: true
        },

    });

    //get transaction
    Transaction.getTransaction = async function (ctx, options, startDate, endDate, cb) {

        const userId = options.accessToken.userId;
        const where = startDate && endDate ?
            {
                userId: userId,
                created_at: {
                    between: [new Date(startDate), new Date(endDate)]
                }
            } : { userId: userId };
        const trans = await Transaction.find({
            include: "user", where
        });

        return trans;

    }

    Transaction.remoteMethod('getTransaction', {
        description: "this is desicriptions",
        http: { "verb": "get", "path": "/get-transaction" },
        accepts: [
            { "arg": "ctx", "type": "object", "http": { source: "context" } },
            { "arg": "options", "type": "object", "http": "optionsFromRequest" },
            {
                arg: "startDate", type: "string",
                http: { source: 'query' }
            }, {
                arg: "endDate", type: "string",
                http: { source: 'query' }
            }
        ],
        returns: {
            arg: "model",
            type: 'Object',
            root: true
        },

    });

};
