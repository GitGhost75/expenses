package de.expenses.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "groups")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "members")
@ToString(exclude = "members")
public class Group {

	@Column(unique = true)
	private String name;

	@Id
	@Column(nullable = false, unique = true)
	private String code;

	@OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<User> members = new ArrayList<>();

	public void addMember(User member) {
		members.add(member);
	}

	@OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Expense> expenses = new ArrayList<>();

	public void addExpense(Expense expense) {
		expenses.add(expense);
	}

	@Override
	public String toString() {
		return "Group{name=" + name + ", memberCount=" + (members != null ? members.size() : 0) + "}";
	}
}