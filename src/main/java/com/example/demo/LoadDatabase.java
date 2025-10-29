package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(CarrosRepository repository) {

    return args -> {
      log.info("Preloading " + repository.save(new Carros("Chevrolet", "S10")));
      log.info("Preloading " + repository.save(new Carros("Honda", "Civic")));
    };
  }
}