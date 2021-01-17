const path = require('path');
const express = require('express');
const app = express();
// const routes = require('./controllers');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const sequelize = require('./connConfig/connection.js');
const { User, Todo, Linker } = require('./models');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const appSession = {
  secret: process.env.SECRET,
  cookie: {
    //some cookie settings here...
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize })
};

app.use(session(appSession));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
// app.use(routes);

sequelize.sync({force: true})
.then(() => 
{
  setTimeout( async () => 
  {
    console.log(``);
    console.log('\x1b[34m', '🌱 testing seeding a user into the user table at server start', '\x1b[00m');
    try 
    {
      const userInfo = await User.findAll();
      console.log(userInfo);
      if (userInfo[0] === undefined) 
      {
        const newUser = await User.create({
          username: 'test',
          password: 'test'
        });
        console.log(newUser);
      }
    } 
    catch (error)
    {
      console.log(error);
    }
  }, 500);
})
.then(() => 
{
  console.log('\x1b[33m', 'connecting to database', '\x1b[00m');
  app.listen(PORT, () => 
  {
    console.log('\x1b[33m', `🔮 Now listening on PORT ${PORT}!`, '\x1b[00m');
  });
})
.catch(error => console.log(error));