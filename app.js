const connection = require('./db');
const inquirer = require('inquirer');
const cTable = require('console.table');
// starts the application
initialPrompt();

function initialPrompt() {
	return inquirer
		.prompt([
			{
				name: 'toDoNext',
				message: 'What would you like to do?',
				type: 'list',
				choices: [
					'View all Employees',
					'View all Departments',
					'View all Roles',
					'Add a new Employee',
					'Add a new Department',
					'Add a new Role',
					'Update an Employee Role',
					'Exit CMS'
				]
			}
		])
		.then((answers) => {
			switch (answers.toDoNext) {
				case 'View all Employees':
					displayEmployees();
					break;
				case 'View all Departments':
					displayDepartments();
					break;
				case 'View all Roles':
					displayRoles();
					break;
				case 'Add a new Employee':
					addEmployee();
					break;
				case 'Add a new Department':
					addDepartment();
					break;
				case 'Add a new Role':
					addRole();
					break;
				case 'Update an Employee Role':
					updateEmployee();
					break;
				default:
					console.log('\nExited CMS!\n\n');
					break;
			}
		});
}

function displayEmployees() {
	connection.query('SELECT * FROM employee', (err, data) => {
		if (err) throw err;
		const table = cTable.getTable(data);
		console.log(table);
		initialPrompt();
	});
}

function displayDepartments() {
	// reads department names
	connection.query('SELECT * FROM department', (err, data) => {
		if (err) throw err;
		const table = cTable.getTable(data);
		console.log(table);
		initialPrompt();
	});
}
function displayRoles() {
	// reads department names
	connection.query('SELECT * FROM role', (err, data) => {
		if (err) throw err;
		const table = cTable.getTable(data);
		console.log(table);
		initialPrompt();
	});
}

function addEmployee() {
	inquirer
		.prompt([
			{
				name: 'firstName',
				message: 'What is their first name?',
				type: 'input'
			},
			{
				name: 'lastName',
				message: 'What is their last name?',
				type: 'input'
			},
			{
				name: 'roleId',
				message: 'What is their role ID?',
				type: 'input'
			},
			{
				name: 'managerId',
				message: 'What is the ID of their manager?',
				type: 'input'
			}
		])
		.then((answers) => {
			const { firstName, lastName, roleId, managerId } = answers;
			connection.query(
				'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)',
				[firstName, lastName, roleId, managerId],
				(err, data) => {
					if (err) throw err;
					console.log('\nnew employee successfully added! \n\n');
					initialPrompt();
				}
			);
		});
}

function addDepartment() {
	inquirer
		.prompt([
			{
				name: 'name',
				message: 'What is the department name?',
				type: 'input'
			}
		])
		.then((answers) => {
			connection.query('INSERT INTO department(name) VALUES (?)', [answers.name], (err, data) => {
				if (err) throw err;
				console.log('\nnew department successfully added! \n\n');
				initialPrompt();
			});
		});
}
function addRole() {
	inquirer
		.prompt([
			{
				name: 'title',
				message: 'What is the role title?',
				type: 'input'
			},
			{
				name: 'salary',
				message: 'What is the role salary?',
				type: 'input'
			},
			{
				name: 'departmentId',
				message: 'What is the associated department ID?',
				type: 'input'
			}
		])
		.then((answers) => {
			connection.query(
				'INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)',
				[answers.title, answers.salary, answers.departmentId],
				(err, data) => {
					if (err) throw err;
					console.log('\nnew role successfully added! \n\n');
					initialPrompt();
				}
			);
		});
}
function updateEmployee() {
	inquirer
		.prompt([
			{
				name: 'id',
				message: 'What is the ID of the employee you want to update?',
				type: 'input'
			},
			{
				name: 'role',
				message: 'What would you like their new role ID to be?',
				type: 'input'
			}
		])
		.then((answers) => {
			connection.query(
				'UPDATE employee SET role_id = ? WHERE id = ?',
				[answers.role, answers.id],
				(err, data) => {
					if (err) throw err;
					console.log('\nemployee successfully updated! \n\n');
					initialPrompt();
				}
			);
		});
}
