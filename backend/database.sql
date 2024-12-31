-- Create the 'appointments' table
    CREATE TABLE appointments (
        appointment_id SERIAL PRIMARY KEY,
        client_id INT,
        team_id INT,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        status VARCHAR(50)
    );

    -- Create the 'clients' table
    CREATE TABLE clients (
        client_id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        phone VARCHAR(20),
        address TEXT,
        preferences TEXT
    );

    -- Create the 'invoices' table
    CREATE TABLE invoices (
        invoice_id SERIAL PRIMARY KEY,
        appointment_id INT,
        amount DECIMAL(10, 2),
        issue_date DATE,
        due_date DATE,
        payment_status VARCHAR(50),
        FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
    );

    -- Create the 'teams' table
    CREATE TABLE teams (
        team_id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        working_hours TEXT,
        payroll_info TEXT
    );

    -- Add foreign key constraints to 'appointments' table
    ALTER TABLE appointments
    ADD CONSTRAINT fk_client
    FOREIGN KEY (client_id)
    REFERENCES clients(client_id);

    ALTER TABLE appointments
    ADD CONSTRAINT fk_team
    FOREIGN KEY (team_id)
    REFERENCES teams(team_id);
