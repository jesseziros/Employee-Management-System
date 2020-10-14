const inquirer = require('inquirer');

class Add {
  
  addTask = () => {
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
}
module.exports = new Add();