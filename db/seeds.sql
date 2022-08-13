INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', '100000', 4),
    ('Salespeson', '80000', 4),
    ('Lead Engineer', '150000', 1),
    ('Software Engineer', '120000', 1),
    ('Account Manager', '160000', 2),
    ('Accountant', '150000', 2),
    ('Legal Team Lead', '250000', 3),
    ('Lawyer', '190000', 3);
INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Sam', 'Fields', 1),
    ('Katie', 'Holmes', 6),
    ('Sierra', 'Tiffany', 4),
    ('Keith', 'Nap', 8),
    ('Joe', 'Renalds', 5),
    ('Vivienne', 'West', 2),
    ('Cherry', 'Masterson', 3),
    ('Minnie', 'Gold', 7);
    