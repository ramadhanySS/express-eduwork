const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eduwork-native');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => console.log('Server database terhubung'));
