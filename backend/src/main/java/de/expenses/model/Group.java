package de.expenses.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

	private String name;

	@OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<User> members;

}