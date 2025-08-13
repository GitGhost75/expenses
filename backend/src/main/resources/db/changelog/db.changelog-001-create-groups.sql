--liquibase formatted sql

--changeset dev:001-create-groups
CREATE TABLE groups (
    code VARCHAR(9) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL UNIQUE
);
