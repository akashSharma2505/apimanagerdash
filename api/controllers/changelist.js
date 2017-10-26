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
    req.query("SELECT * FROM [dbo].[Change] ORDER BY [ScheduleStartDate] FOR JSON PATH ")
        .into(res, '[]');
});




/* GET single task. */
router.get('/:id', function (req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    req.query("SELECT * FROM [dbo].[Change] where ChangeNumber = @id ORDER BY [ScheduleStartDate]  for json path")
        .param('id', req.params.id, TYPES.NVarChar)
        .into(res, '{}');
});

/* POST create task. */
router.post('/html2image/', function (req, res) {
    var fragment = req.body;
    var options = {
        siteType: 'html'
        , defaultWhiteBackground: true
    };

    var imageName = Date.now() + 'MyProduct.png';

    webshot(fragment, './products/' + imageName, options, function (err) {
        if (err) return console.log(err);
        console.log('OK');
    });

    var imageUrl = { "imgUrl": "https://fff0bd70.ngrok.io/" + imageName };

    res.send(imageUrl);
});

/* PUT update task. */
router.put('/:id', function (req, res) {

    req.query("exec updateTodo @id, @todo")
        .param('id', req.params.id, TYPES.Int)
        .param('todo', req.body, TYPES.NVarChar)
        .exec(res);

});

/* DELETE single task. */
router.delete('/:id', function (req, res) {

    req.query("delete from todo where id = @id")
        .param('id', req.params.id, TYPES.Int)
        .exec(res);

});



// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;