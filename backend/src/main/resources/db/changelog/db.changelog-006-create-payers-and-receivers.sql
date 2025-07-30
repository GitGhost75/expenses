--liquibase formatted sql

--changeset dev:006-create-payers-and-receivers
CREATE TABLE expense_payers (
    expense_id UUID NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (expense_id, user_id),
    CONSTRAINT fk_expense_payer_expense FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
    CONSTRAINT fk_expense_payer_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE expenses DROP CONSTRAINT fk_user;

CREATE TABLE expense_receivers (
    expense_id UUID NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (expense_id, user_id),
    CONSTRAINT fk_expense_receiver_expense FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
    CONSTRAINT fk_expense_receiver_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO expense_payers (expense_id, user_id)
SELECT id AS expense_id, user_id FROM expenses
WHERE user_id IS NOT NULL;

ALTER TABLE expenses DROP COLUMN user_id;