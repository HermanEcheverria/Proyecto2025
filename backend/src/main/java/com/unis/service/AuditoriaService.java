package com.unis.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.Date;
import com.unis.model.Auditoria;
import com.unis.repository.AuditoriaRepository;

@ApplicationScoped
public class AuditoriaService {

    @Inject
    AuditoriaRepository auditoriaRepository;

    @Transactional
    public void registrarCambio(String accion, String descripcion, String categoria, String tipoCambio, 
                                Long idUsuario, Long idHospital, Long idEntidad, String nombreEntidad) {
        Auditoria auditoria = new Auditoria();
        auditoria.setAccion(accion);
        auditoria.setDescripcion(descripcion);
        auditoria.setFecha(new Date());
        auditoria.setIdUsuario(idUsuario);
        auditoria.setIdHospital(idHospital);
        auditoria.setCategoria(categoria);
        auditoria.setTipoCambio(tipoCambio);
        auditoria.setIdEntidad(idEntidad);
        auditoria.setNombreEntidad(nombreEntidad);
        auditoriaRepository.persist(auditoria);
    }
}
