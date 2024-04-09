const mongoose = require('mongoose');
                          
const todoSchema = mongoose.Schema({
    todo:{  
        type:String,
    },  
    created_on: {
        type: Date,
        default: Date.now,
      },
});

const todoModel = mongoose.model('todo',todoSchema);

module.exports = todoModel
