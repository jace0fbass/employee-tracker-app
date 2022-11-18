-- seeds employee department data into the department table
INSERT INTO department (name) VALUES ("Manager");

INSERT INTO department (name) VALUES ("Sales");

INSERT INTO department (name) VALUES ("Warehouse");

-- seeds employee role data into the role table
INSERT INTO role (title, salary, department_id) VALUES ("Manager", 100000, 1);

INSERT INTO role (title, salary, department_id) VALUES ("Inside Sales", 80000, 2);

INSERT INTO role (title, salary, department_id) VALUES ("Shipping and Receiving", 50000, 3);

-- seeds employee identification data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rocko", "Smodernlife", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mort", "Alkombat", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pete", "Anpeet", 3, 1);