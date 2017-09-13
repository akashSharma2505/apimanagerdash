var router = require('express').Router();
var TYPES = require('tedious').TYPES;


//https://github.com/Microsoft/sql-server-samples/tree/master/samples/features/json/todo-app/nodejs-express4-rest-api

/* GET task listing. */
router.get('/', function (req, res) {

    req.query("SELECT * FROM [dbo].[Change] ORDER BY [ScheduleStartDate] FOR JSON PATH ")
        .into(res, '[]');

});

/* GET single task. */
router.get('/:id', function (req, res) {
    
    req.query("SELECT * FROM [dbo].[Change] where ChangeNumber = @id ORDER BY [ScheduleStartDate]  for json path")
        .param('id', req.params.id, TYPES.NVarChar)
        .into(res, '{}');
});

/* POST create task. */
router.post('/', function (req, res) {
    
    req.query("exec createTodo @todo")
        .param('todo', req.body, TYPES.NVarChar)
        .exec(res);

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

module.exports = router;