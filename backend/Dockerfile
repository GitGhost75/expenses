# 1. Verwende ein schlankes JDK-Image
FROM eclipse-temurin:17-jdk-alpine

# 2. Arbeitsverzeichnis setzen
WORKDIR /app

# 3. Die JAR-Datei ins Image kopieren (nach `mvn package`)
COPY ../target/expenses-app-0.0.1-SNAPSHOT.jar app.jar

# 4. Port (optional, dokumentarisch)
EXPOSE 8080

# 5. Startbefehl
ENTRYPOINT ["java", "-jar", "app.jar"]