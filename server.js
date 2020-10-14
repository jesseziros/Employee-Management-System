require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const { connect } = require('http2');
//const Add = require('./tasks/add')

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
        'Delete',
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
        case 'Delete':
          deleteTask();
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

const addDepartment = () => {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Input desired department:'
    })
    .then((answer) => {
      let query = 'INSERT INTO department WHERE id = ?';
      log(query);
      connection.query(query, [answer.name], (err, res) => {
        if (err) throw err;
        log(res.name)
      })
      runTask();
    });
};

const addRole = () => {
  inquirer
    .prompt({
      name: 'role',
      type: 'input',
      message: 'Input role title, salary and department_id:'
    })
    .then((answer) => {
      let query = 'INSERT INTO role WHERE id = ?, ?, ?';
      log(query);
      connection.query(query, [answer.title, answer.salary, answer.department_id], (err,res) => {
        if (err) throw err;
      });
      runTask();
    });
};

const addEmployee = () =>{
  inquirer
    .prompt({
      name: 'employee',
      type: 'input',
      message: "Input employee's first name, last, name,role_id and manager_id:"
    })
    .then((answer) => {
      let query = 'INPUT INTO employee WHERE id = ?, ?, ?, ?'
      log(query);
      connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
        if(err) throw err;
        log(res);
      });
      runTask();
    });
};

const viewTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to view?',
      choices: [
        'Departments',
        'Roles',
        'Employees',
        'Back to Main Menu'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Departments':
          viewDepartments();
          break;
        case 'Roles':
          viewRoles();
          break;
        case 'Employees':
          viewEmployees();
          break;
        case 'Back to Main Menu':
          runTask();
          break;
      }
    })
}

const updateTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to update?',
      choices: [
        'Employee Roles',
        'Employee Managers',
        'Back to Main Menu'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Employee Roles':
          updateEmployeeRole();
          break;
        case 'Employee Managers':
          updateEmployeeManger();
          break;
        case 'Back to Main Menu':
          runTask();
          break;
      }
    })
}

const deleteTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to delete?',
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
          deleteDepartment();
          break;
        case 'A Role':
          deleteRole();
          break;
        case 'An Employee':
          deleteEmployee();
          break;
        case 'Back to Main Menu':
          runTask();
          break;
      }
    });
}
