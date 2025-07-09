package de.expenses;

import de.expenses.configuration.CorsProperties;
import de.expenses.configuration.ServerProperties;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({CorsProperties.class, ServerProperties.class})
public class ExpensesApp {
	public static void main(String[] args) {
		SpringApplication.run(ExpensesApp.class, args);
	}
}
