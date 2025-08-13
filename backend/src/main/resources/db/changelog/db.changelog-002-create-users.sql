--liquibase formatted sql

--changeset dev:002-create-users
CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    group_code VARCHAR(9) NOT NULL,
    CONSTRAINT fk_group FOREIGN KEY (group_code) REFERENCES groups(code),
    CONSTRAINT uq_users_name UNIQUE (group_code, name)
);
