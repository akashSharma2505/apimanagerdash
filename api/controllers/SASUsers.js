var router = require('express').Router();
var TYPES = require('tedious').TYPES;
var base64 = require('node-base64-image');
var webshot = require('../lib/webshot');
var fs = require('fs');


//https://github.com/Microsoft/sql-server-samples/tree/master/samples/features/json/todo-app/nodejs-express4-rest-api

/* GET task listing. */
router.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.query("SELECT * FROM [dbo].[crewlist] FOR JSON PATH ")
        .into(res, '[]');
});
/*GET User specific details */
router.get('/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    req.query("SELECT * FROM [dbo].[crew] where EmpId = @id for json path")
        .param('id', req.params.id, TYPES.NVarChar)
        .into(res, '{}');
});

/*GET User Hotel details */
router.get('/:id/Hotel', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
        req.query("SELECT * FROM [dbo].[crew] where EmpId = @id for json path")
            .param('id', req.params.id, TYPES.NVarChar)
            .into(res, '{}');
    });
/*GET User Flight details */
    router.get('/:id/Flight', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
        req.query("SELECT * FROM [dbo].[crew] where EmpId = @id for json path")
            .param('id', req.params.id, TYPES.NVarChar)
            .into(res, '{}');
    });
    
module.exports = router;