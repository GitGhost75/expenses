package de.expenses.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
}