package com.example.demo;


class CarrosNotFoundException extends RuntimeException {

  CarrosNotFoundException(Long id) {
    super("Could not find carro " + id);
  }
}