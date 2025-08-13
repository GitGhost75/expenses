package de.expenses.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "expenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expense {

	@Id
	@GeneratedValue
	@JdbcTypeCode(SqlTypes.UUID)
	private UUID id;

	@ManyToOne
	@JoinColumn(name = "group_code")
	private Group group;

	private BigDecimal amount;

	@Column(columnDefinition = "TEXT")
	private String description;

	private LocalDateTime date;

	@ManyToMany
	@JoinTable(
			name = "expense_payers",
			joinColumns = @JoinColumn(name = "expense_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> payers = new ArrayList<>();

	public void addPayer(User payer) {
		payers.add(payer);
	}

	public void removePayer(User payer) {
		payers.remove(payer);
	}

	@ManyToMany
	@JoinTable(
			name = "expense_receivers",
			joinColumns = @JoinColumn(name = "expense_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> receivers = new ArrayList<>();

	public void addReceiver(User receiver) {
		receivers.add(receiver);
	}

	public void removeReceiver(User receiver) {
		receivers.remove(receiver);
	}
}