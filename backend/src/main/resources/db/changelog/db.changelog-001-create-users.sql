--liquibase formatted sql

--changeset dev:001-create-users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);