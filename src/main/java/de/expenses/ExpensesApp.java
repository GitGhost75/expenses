package de.expenses;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
		info = @Info(title = "Expenses API", version = "1.0", description = "Verwalte Gruppen-Ausgaben")
)
@SpringBootApplication
public class ExpensesApp {
	public static void main(String[] args) {
		SpringApplication.run(ExpensesApp.class, args);
	}
}
