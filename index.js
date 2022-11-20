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
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee's manager",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
      ],
    },
  ]);
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
  } else if (answers.action === "Update an employee's manager") {
    updateEmployeeManager();
  } else if (answers.action === "Delete a department") {
    deleteDepartment();
  } else if (answers.action === "Delete a role") {
    deleteRole();
  } else if (answers.action === "Delete an employee") {
    deleteEmployee();
  } else {
    process.exit(0);
  }
};

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
    const [results] = await connection.promise().query("SELECT * FROM role");
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
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Department name: ",
    },
  ]);
  try {
    const [results] = await connection
      .promise()
      .query("INSERT INTO department (name) VALUES (?)", answers.name);
  } catch (err) {
    throw new Error(err);
  }
  console.log("Department added");
  startPrompt();
};

// ADD role
const addRole = async () => {
  connection.query("SELECT * FROM department", async (err, res) => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Role title: ",
      },
      {
        type: "number",
        name: "salary",
        message: "Salary: ",
      },
      {
        type: "list",
        name: "departmentName",
        message: "Department name: ",
        choices: res.map((department) => department.name),
      },
    ]);
    try {
      const department = res.find(
        (department) => department.name === answers.departmentName
      );
      const [results] = await connection
        .promise()
        .query(
          "INSERT INTO role (title, salary, department_Id) VALUES (?, ?, ?)",
          [answers.title, answers.salary, department.id]
        );
    } catch (err) {
      throw new Error(err);
    }
    console.log("Role added.");
    startPrompt();
  });
};

// ADD employee
const addEmployee = async () => {
  connection.query("SELECT * FROM role", async (err, res) => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "First name: ",
      },
      {
        type: "input",
        name: "last_name",
        message: "Last name: ",
      },
      {
        type: "list",
        name: "roleName",
        message: "Role name: ",
        choices: res.map((role) => role.title),
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the employee's manager's ID number?",
        choices: res.map((manager_id) => manager_id.id),
      },
    ]);
    try {
      const role = res.find((role) => role.title === answers.roleName);
      const manager = res.find((manager) => manager.id === answers.manager_id);
      const [results] = await connection
        .promise()
        .query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [answers.first_name, answers.last_name, role.id, answers.manager_id]
        );
    } catch (err) {
      throw new Error(err);
    }
    console.log("Employee added.");
    startPrompt();
  });
};

// UPDATE employee manager ///////////////  NOT DONE  ///////////////
const updateEmployeeManager = async () => {
  connection.query(
    "SELECT * FROM employee WHERE manager_id NOT NULL",
    async (err, res) => {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "allEmps",
          message: "Which employee is getting a new manager?.",
        },
        {
          type: "input",
          name: "newManager",
          message: "What is the employee's new manager's ID number?",
          choices: res.map((newManager) => newManager.id),
        },
      ]);
      try {
        const updatedManager = res.find(
          (updatedManager) => updatedManager.id === answers.newManager
        );
        const [results] = await connection
          .promise()
          .query("INSERT INTO employee (manager_id) VALUES (?)", [
            answers.newManager,
          ]);
      } catch (err) {
        throw new Error(err);
      }
      console.log("Manager updated.");
      startPrompt();
    }
  );
};

// DELETE department
const deleteDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Which department do you want to delete?",
    },
  ]);
  try {
    const [results] = await connection
      .promise()
      .query("DELETE FROM department WHERE name=?", answers.name);
  } catch (err) {
    throw new Error(err);
  }
  console.log("Department deleted.");
  startPrompt();
};

// DELETE role
const deleteRole = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Which role do you want to delete?",
    },
  ]);
  try {
    const [results] = await connection
      .promise()
      .query("DELETE FROM role WHERE title=?", answers.name);
  } catch (err) {
    throw new Error(err);
  }
  console.log("Role deleted.");
  startPrompt();
};

// DELETE employee
const deleteEmployee = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the employee you want to delete?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the employee you want to delete?",
    },
  ]);
  try {
    const [results] = await connection
      .promise()
      .query("DELETE FROM employee WHERE first_name=? AND last_name=?", [
        answers.firstName,
        answers.lastName,
      ]);
  } catch (err) {
    throw new Error(err);
  }
  console.log("Employee deleted.");
  startPrompt();
};

// SUM of all salaries ////////////  NOT DONE  //////////////
const salarySum = async () => {
  try {

  } catch (err) {
  throw new Error(err);
  }
  console.table(results)
  startPrompt();
};

// start the prompt
startPrompt();
export default connection;
