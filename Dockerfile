FROM adoptopenjdk/openjdk11:latest
WORKDIR /app
COPY ./memeshare-backend/target/xmeme-0.0.1-SNAPSHOT.jar /app
ENTRYPOINT ["java","-jar","xmeme-0.0.1-SNAPSHOT.jar"]

