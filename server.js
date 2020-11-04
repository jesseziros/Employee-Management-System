require('dotenv').config();
require("console.table")
const mysql = require('mysql');
const inquirer = require('inquirer');

const log = (msg) => console.log(msg);
const table = (msg) => console.table(msg);

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
        'Department',
        'Role',
        'Employee',
        'Back to Main Menu'
      ]
    })
    .then((answer) => {
      log(answer)
      switch (answer.action) {
        case 'Department':
          addDepartment();
          break;
        case 'Role':
          addRole();
          break;
        case 'Employee':
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
      let query = 'INSERT INTO department (name) VALUES (?) ';
      connection.query(query, [answer.name], (err, res) => {
        if (err) throw err;
        log("Added Department")
      });
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
      let query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      connection.query(query, [answer.title, answer.salary, answer.department_id], (err, res) => {
        if (err) throw err;
        log("Added Role")
      });
      runTask();
    });
};

const addEmployee = () => {
  inquirer
    .prompt({
      name: 'employee',
      type: 'input',
      message: "Input employee's first name, last, name,role_id and manager_id:"
    })
    .then((answer) => {
      let query = 'INPUT INTO employee WHERE id = ?, ?, ?, ?'
      connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
        if (err) throw err;
        log("Added Employee")
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

const viewDepartments = () => {
  let query = 'SELECT * FROM department'
  connection.query(query, (err, res) => {
    if (err) throw err;
    table(res);
  })
  runTask();
}

const viewRoles = () => {
  let query = 'SELECT * FROM role'
  connection.query(query, (err, res) => {
    if (err) throw err;
    table(res);
  })
  runTask();
}

const viewEmployees = () =>{
  let query = 'SELECT * FROM employee'
  connection.query(query, (err, res) => {
    if (err) throw err;
    table(res);
  })
  runTask();
};

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

const updateEmployeeRole = () => {
  let employeeChoices =[];
  let employees;
  let query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    employees = res
    if (err) throw err;
    for (let i = 0; i < employees.length; i++) {
      employeeChoices.push(employees[i]);

    }
    inquirer
    .prompt({
      name: 'employee',
      type: 'list',
      message: 'Which employee would you like to update?',
      choices: employeeChoices
    })
    // .then((answer) => {
    // })
  })
}

//UPDATE *role* SET salary = ** WHERE *role_id* = id

const deleteTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to delete?',
      choices: [
        'Department',
        'Role',
        'Employee',
        'Back to Main Menu'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Department':
          deleteDepartment();
          break;
        case 'Role':
          deleteRole();
          break;
        case 'Employee':
          deleteEmployee();
          break;
        case 'Back to Main Menu':
          runTask();
          break;
      }
    });
}
