package de.expenses.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class GroupTest {

    private Group group;

    @BeforeEach
    void setUp() {
        group = new Group("TestGroup", "TEST001", new ArrayList<>(), new ArrayList<>(), LocalDate.now());
    }

    @Test
    void testNoArgsConstructor() {
        Group defaultGroup = new Group();
        assertNotNull(defaultGroup);
        assertTrue(defaultGroup.getMembers().isEmpty());
        assertTrue(defaultGroup.getExpenses().isEmpty());
    }

    @Test
    void testAllArgsConstructor() {
        List<User> members = new ArrayList<>();
        User user1 = new User();
        user1.setName("User1");
        members.add(user1);
        List<Expense> expenses = new ArrayList<>();
        expenses.add(new Expense());

        Group allArgsGroup = new Group("AnotherGroup", "ANOTHER002", members, expenses, LocalDate.now());

        assertEquals("AnotherGroup", allArgsGroup.getName());
        assertEquals("ANOTHER002", allArgsGroup.getCode());
        assertEquals(1, allArgsGroup.getMembers().size());
        assertEquals(1, allArgsGroup.getExpenses().size());
    }

    @Test
    void testAddMember() {
        User user1 = new User();
        user1.setName("User1");
        User user2 = new User();
        user2.setName("User2");

        assertEquals(0, group.getMembers().size());

        group.addMember(user1);
        assertEquals(1, group.getMembers().size());
        assertTrue(group.getMembers().contains(user1));

        group.addMember(user2);
        assertEquals(2, group.getMembers().size());
        assertTrue(group.getMembers().contains(user2));
    }

    @Test
    void testAddExpense() {
        Expense expense1 = new Expense();
        Expense expense2 = new Expense();

        assertEquals(0, group.getExpenses().size());

        group.addExpense(expense1);
        assertEquals(1, group.getExpenses().size());
        assertTrue(group.getExpenses().contains(expense1));

        group.addExpense(expense2);
        assertEquals(2, group.getExpenses().size());
        assertTrue(group.getExpenses().contains(expense2));
    }

    @Test
    void testAddNullMember() {
        group.addMember(null);
        assertEquals(1, group.getMembers().size());
        assertNull(group.getMembers().get(0));
    }

    @Test
    void testAddNullExpense() {
        group.addExpense(null);
        assertEquals(1, group.getExpenses().size());
        assertNull(group.getExpenses().get(0));
    }
}
