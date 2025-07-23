package de.expenses.mapper;

import de.expenses.dto.BillingDto;
import de.expenses.dto.ExpenseDto;
import de.expenses.model.Billing;
import de.expenses.model.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BillingMapper {

	public List<BillingDto> toDtoList(List<Billing> entities);

	@Mapping(source = "payer.name", target = "payer")
	@Mapping(source = "receiver.name", target = "receiver")
	public BillingDto toDto(Billing entity);
}
