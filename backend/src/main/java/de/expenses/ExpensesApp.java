package de.expenses;

import de.expenses.configuration.CorsProperties;
import de.expenses.configuration.ServerProperties;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@OpenAPIDefinition(
		info = @Info(title = "Expenses API", version = "0.2.0", description = "Verwalte Gruppen-Ausgaben")
)
@SpringBootApplication
@EnableConfigurationProperties({CorsProperties.class, ServerProperties.class})
public class ExpensesApp {
	public static void main(String[] args) {
		SpringApplication.run(ExpensesApp.class, args);
	}
}
