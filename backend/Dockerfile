# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# Nur pom.xml kopieren und Dependencies vorbereiten (Cache-Schritt!)
COPY pom.xml .
RUN mvn dependency:go-offline

# Dann erst den restlichen Code kopieren
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage (schlank)
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]