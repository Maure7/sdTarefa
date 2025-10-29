FROM eclipse-temurin:21
WORKDIR /app
COPY . /app/
RUN ./mvnw clean package
EXPOSE 8080
CMD ["java", "-jar", "/app/target/demo-0.0.1-SNAPSHOT.jar"]
