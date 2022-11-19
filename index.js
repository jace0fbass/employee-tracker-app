import mysql from "mysql2";
import inquirer from "inquirer";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_tracker_app_db",
});

// function to start prompt
const startPrompt = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update a department", "Update a role", "Update an employee", "Delete a department", "Delete a role", "Delete an employee"]
    },
  ])
  if (answers.action === "View all departments") {
    getDepartments();
  } else if (answers.action === "View all roles") {
    getRoles();
  } else if (answers.action === "View all employees") {
    getEmployees();
  } else if (answers.action === "Add a department") {
    addDepartment();
  } else if (answers.action === "Add a role") {
    addRole();
  } else if (answers.action === "Add an employee") {
    addEmployee();
  } else if (answers.action === "Update a department") {
    updateDepartment();
  } else if (answers.action === "Update a role") {
    updateRole();
  } else if (answers.action === "Update an employee") {
    updateEmployee();
  } else if (answers.action === "Delete a departmemt") {
    deleteDepartment();
  } else if (answers.action === "Delete a role") {
    deleteRole();
  } else if (answers.action === "Delete an employee") {
    deleteEmployee();
  } else {
      process.exit(0)
  }
}

// GET department
const getDepartments = async () => {
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM department");
    console.table(results);
    startPrompt();
  } catch (err) {
    throw new Error(err);
  }
};

// GET role
const getRoles = async () => {
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM role");
    console.table(results);
    startPrompt();
  } catch (err) {
    throw new Error(err);
  }
};

// GET employee
const getEmployees = async () => {
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM employee");
    console.table(results);
    startPrompt();
  } catch (err) {
    throw new Error(err);
  }
};

// ADD department
const addDepartment = async () => {

};

// ADD role
const addRole = async () => {

};

// ADD employee
const addEmployee = async () => {

};

// UPDATE department
const updateDepartment = async () => {

};

// UPDATE role
const updateRole = async () => {

};

// UPDATE employee
const updateEmployee = async () => {

};

// DELETE department
const deleteDepartment = async () => {

};

// DELETE role
const deleteRole = async () => {

};

// DELETE employee
const deleteEmployee = async () => {

};

// start the prompt
startPrompt()
export default connection;
