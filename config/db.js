const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // por aviso de cambio en la librería - si no da aviso de warning 
mongoose.connect(process.env.MONGO_URI);
