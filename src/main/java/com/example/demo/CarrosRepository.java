package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

interface CarrosRepository extends JpaRepository<Carros, Long> {
}