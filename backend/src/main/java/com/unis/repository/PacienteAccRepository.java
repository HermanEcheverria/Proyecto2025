package com.unis.repository;

import com.unis.model.PacienteAcc;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PacienteAccRepository implements PanacheRepository<PacienteAcc> {
}
