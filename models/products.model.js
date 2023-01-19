const { model, Schema } = require('mongoose');
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    stock: Number,
    available: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },  // cuando se muestra en tipo json o tipo object que tiene que hacer
    timestamps: true // crea dos propiedades de gratis createdAt y updatedAt 
});

// variable o propiedad calculada no está en la base de datos pero si hago product.propuedad virtual la voy a poder extraer. aquí no se puede meter funcion flecha porque crea su propio ámbito y el this no funcionaría. 
productSchema.virtual('price_tax').get(function () {
    return this.price * 1.21;
}); // para que salga siempre lo metemos como un nuevo parámetro del nuevo schema. 

// esto es para actualizar el precio cuando actualizamos el precio con iva, metida el metodo dentro del modelo 
productSchema.virtual('price_tax').set(function (newValue) {
    this.price = newValue / 1.21;
});

// para crear métodos dentro del modelo 
//actives es una clave cuando yo ponga Product.actives() ejecutará la función
productSchema.statics.actives = function () {
    return model('product').find({ // return porque devuelve una promesa y ya se gestiona de forma externa. 
        available: true,
        stock: { $gt: 0 } // mayor que cero - $gt validador de mongoose (no se lo que es)
    })
    //forma de acceder al product sin llamarlo porque aquí no está. 
}

module.exports = model('product', productSchema)
// el primero hace referencia a la colección a la que hace referencia en singular, la segunda el esquema que va a tener ese producto

//exportmos con el método model el nombre de la colección en SINGULAR y el schema que le corresponde 