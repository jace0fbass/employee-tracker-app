import mysql from 'mysql2'
import inquirer from 'inquirer';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employee_tracker_app_db'
});



