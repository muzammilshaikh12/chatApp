const express = require('express')

const bodyParser = require('body-parser');

const app = express()

const cors =  require('cors')

app.use(cors())

app.use(bodyParser.json());

const sequelize = require('./util/database');

// Routes
const route = require('./routes/user')

app.use(route)
// Models

const userModel = require('./models/user')
const chatModel = require('./models/chat')

// Associations
userModel.hasMany(chatModel)
chatModel.belongsTo(userModel)

sequelize.sync()
.then(result=>{
    app.listen(3000)
})