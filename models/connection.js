const mongoose = require("mongoose")

const connectionString = 'mongodb+srv://theosirieix:V11FalZ3SySRmWKN@cluster0.k0pnihs.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log('Database connected'))
    .catch(error => console.error(error));