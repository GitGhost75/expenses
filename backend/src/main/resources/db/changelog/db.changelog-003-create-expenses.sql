--liquibase formatted sql

--changeset dev:003-create-expenses
CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    amount DECIMAL(19, 2),
    description TEXT,
    date DATETIME
);