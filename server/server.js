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

let user;
let todo;

sequelize.sync({force: true})
.then(() => 
{
  console.log('\x1b[33m', 'connecting to database', '\x1b[00m');
  app.listen(PORT, () => 
  {
    console.log('\x1b[33m', `🔮 Now listening on PORT ${PORT}!`, '\x1b[00m');
  });
})
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
        const newUser = await User.create(
          {
            username: 'asdf',
            password: 'asdf'
          }
        );
        console.log(newUser);
        user = newUser;
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
  setTimeout( async () => 
  { 
    console.log(``);
    console.log('\x1b[36m', '❄️ testing seeding a todo into the database', '\x1b[00m');
    try 
    {
      const todoInfo = await Todo.findAll();
      console.log(todoInfo);
      if (todoInfo[0] === undefined)
      {
        const newTodo = await Todo.create(
          {
            text: 'test todo text',
            createdAt: new Date().toString()
          }
        );
        console.log(newTodo);
        todo = newTodo;
      }
    } 
    catch (error) 
    {
      console.log(error);
    }
  }, 1000);
})
.then(() => 
{
  setTimeout( async () => 
  {
    try 
    {
      console.log(``);
      console.log('\x1b[35m', ' ⚛️  testing seeding both user and todo related into the linker table into the database', '\x1b[00m');
      const linkerTable = await Linker.findAll();
      console.log(linkerTable);
      if (linkerTable[0] === undefined) 
      {
        //update Linker table with new user and todo data
        const newLinkerTable = await Linker.create(
          {
            user_id: user.dataValues.id,
            todo_id: todo.dataValues.id
          }
        );
        console.log(newLinkerTable);;
      }
    } 
    catch (error) 
    {
      console.log(error);
    }  
  }, 1500);
})
.catch(error => console.log(error));