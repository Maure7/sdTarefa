FROM eclipse-temurin:21
WORKDIR /app

# Copy source
COPY . /app/

# Ensure wrapper is executable and build the jar (skip tests for faster image build)
RUN chmod +x /app/mvnw \
	&& /app/mvnw -q -DskipTests package

# App listens on 8081 (configured in application.properties)
EXPOSE 8081

# Allow overriding port via env at runtime (e.g., -e SERVER_PORT=8080)
ENV SERVER_PORT=8081

CMD ["java", "-jar", "/app/target/demo-0.0.1-SNAPSHOT.jar"]
