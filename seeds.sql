USE employee_managementDB;

INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Sales');

INSERT INTO role (title, salary, department_id) VALUES ('Senior Front End Developer', 160000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Back End Developer', 180000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Font End Developer', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Back End Developer', 120000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Head of Sales', 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Salesman', 45000, 2);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jesse', 'Ziros', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('John', 'Doe', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Michela', 'Moore', 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jain', 'Dan', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sylvester', 'Stone', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Josh', 'Gaffingan', 6, 5);
