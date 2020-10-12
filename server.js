require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');

const log = (msg) => console.log(msg)

const connection = mysql.createConnection({
  host: 'localhost',
  PORT: 3306,
  user: 'root',
  password: process.env.PASSWORD,
  database: 'employee_managementDB'
});

connection.connect((err) => {
  if (err) throw err
  runTask();
});

const runTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Would you like to:',
      choices: [
        'Add',
        'View',
        'Update',
        'exit'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add':
          addTask();
          break;
        
        case 'View':
          viewTask();
          break;
        
        case 'Update':
          updateTask();
          break;

        case 'exit':
          connection.end();
          break;
      }
    });
}

const addTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What you like to add?',
      choices: [
        'A Department',
        'A Role',
        'An Employee',
        'Back to Main Menu'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'A Department':
          addDepartment();
          break;
        case 'A Role':
          addRole();
          break;
        case 'An Employee':
          addEmployee();
          break;
        case 'Back to Main Menu':
          runTask();
          break;
      }
    })
}