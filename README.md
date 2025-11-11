# Para Executar a Aplicaçao

- Abra o terminal integrado do VS Code (PowerShell).
- Execute:
  ```powershell
  .\mvnw.cmd clean package
  ```
  (Isso limpa tudo, recompila e roda os testes unitários.)

- Para rodar direto sem Docker:
  ```powershell
  .\mvnw.cmd spring-boot:run
  ```
  - Abra no navegador: http://localhost:8081  
  (Pronto, o app vai estar rodando.)

Requisitos
- Java 17+ instalado e com JAVA_HOME configurado.
- Maven Wrapper (mvnw.cmd) no projeto.
- Porta 8081 livre.

---

## Docker — opção simples (a mais direta)

Se preferir rodar em Docker, o jeito mais simples é: primeiro gerar o JAR localmente e depois criar uma imagem leve só pra rodar o JAR.

1) No terminal integrado do VS Code:
```powershell
.\mvnw.cmd clean package
```
2) Crie um arquivo chamado `Dockerfile` com este conteúdo:
```dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","/app/app.jar"]
```
3) Build e run (mesmo terminal):
```powershell
docker build -t mi-app:latest .
docker run --rm -p 8081:8081 --name mi-app mi-app:latest
```
- Depois abre: http://localhost:8081

