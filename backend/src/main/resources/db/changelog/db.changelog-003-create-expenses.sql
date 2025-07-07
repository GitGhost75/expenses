--liquibase formatted sql

--changeset dev:003-create-expenses
CREATE TABLE expenses (
    id UUID PRIMARY KEY NOT NULL,
    amount DECIMAL(19, 2),
    description TEXT,
    date DATETIME,
    group_code VARCHAR(9) NOT NULL,
    CONSTRAINT fk_expenses_group FOREIGN KEY (group_code) REFERENCES groups(code)
);