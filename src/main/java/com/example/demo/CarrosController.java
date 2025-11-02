package com.example.demo;


import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class CarrosController {

  private final CarrosRepository repository;

  CarrosController(CarrosRepository repository) {
    this.repository = repository;
  }



  @GetMapping("/carros")
  List<Carros> all() {
    return repository.findAll();
  }


  @PostMapping("/carros")
  Carros newCarros(@RequestBody Carros newCarros) {
    return repository.save(newCarros);
  }


  
  @GetMapping("/carros/{id}")
  Carros one(@PathVariable Long id) {
    
    return repository.findById(id)
      .orElseThrow(() -> new CarrosNotFoundException(id));
  }

  @PutMapping("/carros/{id}")
  Carros replaceCarros(@RequestBody Carros newCarros, @PathVariable Long id) {
    
    return repository.findById(id)
      .map(carros -> {
        carros.setMarca(newCarros.getMarca());
        carros.setModelo(newCarros.getModelo());
        return repository.save(carros);
      })
      .orElseGet(() -> {
        newCarros.setId(id);
        return repository.save(newCarros);
      });
  }

  @DeleteMapping("/carros/{id}")
  void deleteCarro(@PathVariable Long id) {
    repository.deleteById(id);
  }
}