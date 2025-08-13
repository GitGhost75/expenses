--liquibase formatted sql

--changeset dev:008-alter-groups-constraint
ALTER TABLE groups DROP INDEX name;

