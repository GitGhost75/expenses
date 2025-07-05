package de.expenses.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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

//	@ManyToOne
//	@JoinColumn(name = "group_id")
//	private GroupCode group;

//	@ManyToOne
//	@JoinColumn(name = "paid_by")
//	private User paidBy;

	private BigDecimal amount;

	@Column(columnDefinition = "TEXT")
	private String description;

	private LocalDateTime date;
}