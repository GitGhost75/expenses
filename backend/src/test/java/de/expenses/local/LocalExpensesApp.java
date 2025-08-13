package de.expenses.local;

import de.expenses.ExpensesApp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class LocalExpensesApp extends ExpensesApp {
	public static void main(String[] args) {
		System.setProperty("spring.profiles.active", "TEST");
		SpringApplication.run(LocalExpensesApp.class, args);
	}
}
