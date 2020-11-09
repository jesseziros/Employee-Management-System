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
        runTask();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([{
      name: 'department_id',
      type: 'inpute',
      message: 'Input roles department id',
    },
    {
      name: 'title',
      type: 'input',
      message: 'Input role title:',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Input role salary:',
    }])
    .then((answer) => {
      console.log(answer)
      let query = 'INSERT INTO role (department_id, title, salary) VALUES (?, ?, ?)';
      connection.query(query, [answer.department_id, answer.title, answer.salary], (err, res) => {
        if (err) throw err;
        log("Added Role")
        runTask();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([{
      name: 'first_name',
      type: 'input',
      message: "Input employee's first name:",
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Input employees last name:',
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Input employees role id:',
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Input employees manager_id:'
    }])
    .then((answer) => {
      let query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'
      connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
        if (err) throw err;
        log("Added Employee")
        runTask();
      });
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
    runTask();
  })
}

const viewRoles = () => {
  let query = 'SELECT * FROM role'
  connection.query(query, (err, res) => {
    if (err) throw err;
    table(res);
  })
  runTask();
}

const viewEmployees = () => {
  let query = 'SELECT * FROM employee'
  connection.query(query, (err, res) => {
    if (err) throw err;
    table(res);
    runTask();
  })
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
  let employeeChoices = [];
  let employees;
  let query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    employees = res
    if (err) throw err;
    for (let i = 0; i < employees.length; i++) {
      let newEmployee = {}
      newEmployee.name = employees[i].first_name + " " + employees[i].last_name
      newEmployee.value = employees[i].id
      employeeChoices.push(newEmployee);
    }
    inquirer
      .prompt({
        name: 'employee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: employeeChoices
      })
      .then((answer) => {
        log(answer)
        let roleChoices = [];
        let roles;
        let query = 'SELECT * FROM role';
        connection.query(query, (err, res) => {
          if (err) throw err;
          for (let i = 0; i < roles.length; i++) {
            let newRole = {}
            newRole.name = roles[i].title
            newRole.value = roles[i].id
            roleChoices.push(newRole);
          }
          inquirer
            .prompt({
              name: 'role',
              type: 'list',
              message: 'Which role would you like to assign this employee',
              choices: roleChoices
            })
            .then((answer) => {
              log(answer)
              let query = 'UPDATE employee SET ? WHERE ?';
              connection.query(query, [answer.role, answer.id], (err, res) => {
                if (err) throw err;
                log('Employee role updated!')
                runTask();
              })
            })
        })
      })
  })
}

const updateEmployeeManger = () => {
  let employeeChoices = [];
  let employees;
  let query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    employees = res
    if (err) throw err;
    for (let i = 0; i < employees.length; i++) {
      let newEmployee = {}
      newEmployee.name = employees[i].first_name + " " + employees[i].last_name
      newEmployee.value = employees[i].id
      employeeChoices.push(newEmployee);
    }
    inquirer
      .prompt({
        name: 'employee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: employeeChoices
      })
      .then((answer) => {
        console.log(answer)
        let managerChoices = employeeChoices.filter(employee => employee.value !== answer.employee)
        console.log(managerChoices);

        inquirer
          .prompt({
            name: 'manager',
            type: 'list',
            message: 'What manager would you like to assign?',
            choices: managerChoices
          })
          .then((response) =>{
            let query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
            connection.query(query, [response.manager, answer.employee], (err, res) => {
              if (err) throw err;
              console.log("Completed manager selection!")
              runTask();
          })
        })
      })
  })
}

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

const deleteDepartment = () => {
  let departmentChoices = [];
  let query = 'SELECT * FROM department'
  connection.query(query, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      let newDepartment = {};
      newDepartment.name = res[i].name;
      newDepartment.value = res[i].id;
      departmentChoices.push(newDepartment)
    }
    inquirer
      .prompt({
        name: 'department',
        type: 'list',
        message: 'What department would you like to delete?',
        choices: departmentChoices
      })
      .then((answer) => {
        let query = 'DELETE FROM department WHERE id = ?'
        connection.query(query, [answer.department], (err, res) => {
          if (err) throw err;
          console.log("Deleted department")
          runTask();
        })
      })
  })
}

const deleteRole = () => {
  let roleChoices = [];
  let query = 'SELECT * FROM role'
  connection.query(query, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      let newRole = {};
      newRole.title = res[i].name;
      newRole.value = res[i].id;
      roleChoices.push(newRole)
    }
    inquirer
      .prompt({
        name: 'role',
        type: 'list',
        message: 'What role would you like to delete',
        choice: roleChoices
      })
      .then((answer) => {
        let query = 'DELETE FROM role WHERE id = ?'
        connection.query(query, [answer.role], (err, res) => {
          if(err) throw err;
          console.log("Deleted role");
          runTask();
        })
      })
  })
}
