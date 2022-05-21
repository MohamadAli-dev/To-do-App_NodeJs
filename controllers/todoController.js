var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
const uri = "mongodb+srv://Azzmi:test@todo.wyymf.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

// Create a schema - This is like a blueprint for objects
var todoSchema = new mongoose.Schema({
    item: String
});

// Create a todo model
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({
//     item: 'Make bed'
// }).save((err) => {
//     if (err) return err;
//     console.log('item saved');
// });

// var data = [{
//     item: 'get milk'
// }, {
//     item: 'walk dog'
// }, {
//     item: 'kick some coding ass'
// }];

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to view
        Todo.find({}, (err, data) => {
            if (err) throw err;

            res.render('todo', {
                todos: data
            });
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne((err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });
};