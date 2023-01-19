const { model, Schema, SchemaTypes } = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
    },
    password: String,
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }] // uno o varios si es uno quito []
});


module.exports = model('user', userSchema)