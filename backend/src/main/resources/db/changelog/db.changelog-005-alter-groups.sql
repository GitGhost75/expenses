--liquibase formatted sql

--changeset dev:005-alter-groups-add-creation-date
ALTER TABLE groups ADD created_at DATE;

