# Stage 1: Build the app
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

COPY mvnw .          
COPY .mvn/ .mvn
COPY pom.xml ./

COPY src ./src

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:17-jdk

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 2090

ENTRYPOINT ["java", "-jar", "app.jar"]