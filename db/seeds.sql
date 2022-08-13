DROP DATABASE IF EXISTS election;
CREATE DATABASE election;
USE election;

INSERT INTO employee (first_name, last_name, role_id, mananger_id)
VALUES
    ('Sam', 'Fields'),
    ('Katie', 'Holmes'),
    ('Sierra', 'Tiffany'),
    ('Keith', 'Nap'),
    ('Joe', 'Renalds'),
    ('Vivienne', 'West'),
    ('Cherry', 'Masterson'),
    ('Minnie', 'Gold');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', '100000'),
    ('Salespeson', '80000'),
    ('Lead Engineer', '150000'),
    ('Software Engineer', '120000'),
    ('Account Manager', '160000'),
    ('Accountant', '150000'),
    ('Legal Team Lead', '250000'),
    ('Lawyer', '190000');

INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');
    