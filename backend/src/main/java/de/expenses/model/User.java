package de.expenses.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue
	@JdbcTypeCode(SqlTypes.UUID)
	private UUID id;

	private String name;

	@Column(unique = true)
	private String email;

	@ManyToOne
	@JoinColumn(name = "group_id")
	private Group group;
}