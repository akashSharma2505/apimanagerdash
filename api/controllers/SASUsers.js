var router = require('express').Router();
var express = require('express');
var TYPES = require('tedious').TYPES;
var base64 = require('node-base64-image');
var webshot = require('../lib/webshot');
var bodyParser = require('body-parser');
var tediousExpress = require('express4-tedious');

var app = express();
var fs = require('fs');


//https://github.com/Microsoft/sql-server-samples/tree/master/samples/features/json/todo-app/nodejs-express4-rest-api

/* GET task listing. */
router.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("request value is " + req.query.q);
    req.query("SELECT * FROM [dbo].[SASUser] ORDER BY RoleOrder ASC FOR JSON PATH ")
        .into(res, '[]');
});
/*GET User specific details */
router.get('/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    req.query("SELECT * FROM [dbo].[SASUser] where UserID = @id for json path")
        .param('id', req.params.id, TYPES.NVarChar)
        .into(res, '{}');
});

/* PUT update task. */
router.put('/:id', function (req, res) {

    req.query("UPDATE [dbo].[SASUser] SET [CompletionStatus] = 1 WHERE UserID=@id")
        .param('@id', req.param.id, TYPES.NVarChar)
        .exec(res);

});


/*GET User Hotel details */
router.get('/:id/Hotel/:loc/:dt', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.params.loc != "null" || req.params.dt != "null") {
        if (req.params.loc == "null") {
            req.query("SELECT * FROM [dbo].[Hotel] where UserID = @id AND CheckinDate = @dt for json path")
                .param('id', req.params.id, TYPES.NVarChar)
                .param('loc', req.params.loc, TYPES.NVarChar)
                .param('dt', req.params.dt, TYPES.NVarChar)
                .into(res, '{}');
        }
        else if (req.params.dt == "null") {
            req.query("SELECT * FROM [dbo].[Hotel] where UserID = @id AND City = @loc for json path")
                .param('id', req.params.id, TYPES.NVarChar)
                .param('loc', req.params.loc, TYPES.NVarChar)
                .param('dt', req.params.dt, TYPES.NVarChar)
                .into(res, '{}');
        }
        else {
            req.query("SELECT * FROM [dbo].[Hotel] where UserID = @id AND City = @loc AND CheckinDate = @dt for json path")
                .param('id', req.params.id, TYPES.NVarChar)
                .param('loc', req.params.loc, TYPES.NVarChar)
                .param('dt', req.params.dt, TYPES.NVarChar)
                .into(res, '{}');
        }
    }
    else {

        req.query("SELECT * FROM [dbo].[Hotel] where UserID = @id for json path")
            .param('id', req.params.id, TYPES.NVarChar)
            .param('loc', req.params.loc, TYPES.NVarChar)
            .param('dt', req.params.dt, TYPES.NVarChar)
            .into(res, '{}');
    }
  
});
/*GET User Flight details */
router.get('/:id/Flight/:loc/:dt', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("request value is " + req.params.dt);
    if (req.params.loc != "null" || req.params.dt != "null") {
        if (req.params.loc == "null") {
            req.query("SELECT * FROM [dbo].[Flight] where UserID = @id AND ArrivaleDate = @dt for json path")
                .param('id', req.params.id, TYPES.NVarChar)
                .param('loc', req.params.loc, TYPES.NVarChar)
                .param('dt', req.params.dt, TYPES.NVarChar)
                .into(res, '{}');
        }
        else if (req.params.dt == "null") {
            req.query("SELECT * FROM [dbo].[Flight] where UserID = @id AND Destination = @loc for json path")
                .param('id', req.params.id, TYPES.NVarChar)
                .param('loc', req.params.loc, TYPES.NVarChar)
                .param('dt', req.params.dt, TYPES.NVarChar)
                .into(res, '{}');
        }
        else {
            req.query("SELECT * FROM [dbo].[Flight] where UserID = @id AND Destination = @loc AND ArrivaleDate = @dt for json path")
                .param('id', req.params.id, TYPES.NVarChar)
                .param('loc', req.params.loc, TYPES.NVarChar)
                .param('dt', req.params.dt, TYPES.NVarChar)
                .into(res, '{}');
        }
    }
    else {

        req.query("SELECT * FROM [dbo].[Flight] where UserID = @id for json path")
            .param('id', req.params.id, TYPES.NVarChar)
            .param('loc', req.params.loc, TYPES.NVarChar)
            .param('dt', req.params.dt, TYPES.NVarChar)
            .into(res, '{}');
    }

});

module.exports = router;