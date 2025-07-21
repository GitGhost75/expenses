--liquibase formatted sql

--changeset dev:004-alter-expenses-add-payer
ALTER TABLE expenses ADD user_id UUID NOT NULL;

ALTER TABLE expenses ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);
