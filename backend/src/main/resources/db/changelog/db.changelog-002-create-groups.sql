--liquibase formatted sql

--changeset dev:002-create-groups
CREATE TABLE groups (
    id UUID PRIMARY KEY,
    name VARCHAR(255)
);