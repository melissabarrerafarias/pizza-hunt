const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({ // schema constructor from mongoose 
  pizzaName: {
    type: String // adheres to the built in JavaScript data types
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  size: {
    type: String,
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
    },
    id: false
  }
);

//get total count of comments and replies on retrieval 
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;