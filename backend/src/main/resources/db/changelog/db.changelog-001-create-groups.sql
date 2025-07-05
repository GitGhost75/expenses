--liquibase formatted sql

--changeset dev:001-create-groups
CREATE TABLE groups (
    id UUID PRIMARY KEY,
    code VARCHAR(9) NOT NULL,
    name VARCHAR(255) NOT NULL
);

ALTER TABLE groups
    ADD CONSTRAINT unique_group_name UNIQUE (name);