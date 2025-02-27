package com.unis.repository;

import com.unis.model.Auditoria;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AuditoriaRepository implements PanacheRepository<Auditoria> {
}
