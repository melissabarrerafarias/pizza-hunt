const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); 

const PizzaSchema = new Schema({ // schema constructor from mongoose 
  pizzaName: {
    type: String, // adheres to the built in JavaScript data types
    required: true, // requires field (similar to sequelize 'allowNull: false');
    trim: true // works same as JavaScript trim() 
  },
  createdBy: {
    type: String, 
    required: true, 
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now, 
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  size: {
    type: String,
    require: true,
    enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],// stands for enumerable (refers to data that can be iterated over)
    default: 'Large'
  },
  toppings: [],  // indicates array as data type
  comments: [
    { // expects ObjectId and its data to come from Comment model
      type: Schema.Types.ObjectId,
      ref: 'Comment' // tells Pizza model which document to search 
    }
  ],
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

//get total count of comments and replies on retrieval 
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;