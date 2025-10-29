package com.example.demo;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
class Carros {

  private @Id @GeneratedValue Long id;
  private String marca;
  private String modelo;

  Carros() {}

  Carros(String marca, String modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getMarca() { return marca; }
  public void setMarca(String marca) { this.marca = marca; }

  public String getModelo() { return modelo; }
  public void setModelo(String modelo) { this.modelo = modelo; }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Carros)) return false;
    Carros carros = (Carros) o;
    return Objects.equals(id, carros.id) &&
           Objects.equals(marca, carros.marca) &&
           Objects.equals(modelo, carros.modelo);
  }

  @Override
  public int hashCode() { return Objects.hash(id, marca, modelo); }

  @Override
  public String toString() {
    return "Carros{" +
      "id=" + id +
      ", marca='" + marca + '\'' +
      ", modelo='" + modelo + '\'' +
      '}';
  }
}