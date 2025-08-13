--liquibase formatted sql

--changeset dev:007-insert-receivers

INSERT INTO expense_receivers (expense_id, user_id)
SELECT e.id AS expense_id, u.id AS user_id
FROM expenses e
JOIN users u ON u.group_code = e.group_code
WHERE NOT EXISTS (
    SELECT 1
    FROM expense_receivers er
    WHERE er.expense_id = e.id
      AND er.user_id = u.id
);