--liquibase formatted sql

--changeset dev:002-create-users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    group_id UUID
);