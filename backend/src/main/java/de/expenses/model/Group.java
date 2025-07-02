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

	@Id
	@GeneratedValue
	@JdbcTypeCode(SqlTypes.UUID)
	private UUID id;

	@Column(unique = true)
	private String name;

	@ManyToMany
	@JoinTable(name = "group_members",
			joinColumns = @JoinColumn(name = "group_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id"))
	private List<User> members;

	public void addMember(User member) {
		if (members == null) {
			members = new ArrayList<>();
		}
		members.add(member);
	}

	public void removeMember(User member) {
		if (members != null) {
			members.remove(member);
		}
	}

}