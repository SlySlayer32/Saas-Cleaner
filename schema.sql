-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    address TEXT,
    phone_number TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the team_members table
CREATE TABLE team_members (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT,
    availability TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    client_id UUID REFERENCES clients(id),
    team_member_id UUID REFERENCES team_members(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the invoices table
CREATE TABLE invoices (
    id UUID PRIMARY KEY,
    appointment_id UUID REFERENCES appointments(id),
    client_id UUID REFERENCES clients(id),
    amount NUMERIC(10, 2) NOT NULL,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP WITH TIME ZONE
);
