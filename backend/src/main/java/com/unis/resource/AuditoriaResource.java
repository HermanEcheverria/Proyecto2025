package com.unis.resource;

import java.util.List;

import com.unis.model.Auditoria;
import com.unis.service.AuditoriaService;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;


@Path("/api/auditoria")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuditoriaResource {

    @Inject
    AuditoriaService auditoriaService;

    @POST
@Path("/registrar")
public Response registrar(Auditoria auditoria) {
    if (auditoria == null) {
        return Response.status(Response.Status.BAD_REQUEST)
                .entity("El cuerpo de la solicitud está vacío o mal formateado.")
                .build();
    }

    auditoriaService.registrarCambio(
        auditoria.getAccion(),
        auditoria.getDescripcion(),
        auditoria.getCategoria(),
        auditoria.getTipoCambio(),
        auditoria.getIdUsuario(),
        auditoria.getIdHospital(),
        auditoria.getIdEntidad(),
        auditoria.getNombreEntidad()
    );

    return Response.ok().entity("Registro de auditoría exitoso.").build();
}


    @GET
    @Path("/listar")
    public List<Auditoria> listar(@QueryParam("pagina") int pagina, @QueryParam("tamano") int tamano) {
        return Auditoria.findAll(Sort.descending("fecha")).page(Page.of(pagina, tamano)).list();
    }

    @GET
    @Path("/filtrar")
    public List<Auditoria> filtrar(@QueryParam("fechaInicio") String fechaInicio, @QueryParam("fechaFin") String fechaFin,
                                   @QueryParam("idUsuario") Long idUsuario, @QueryParam("tipoCambio") String tipoCambio) {
        return Auditoria.find("fecha BETWEEN ?1 AND ?2 AND (idUsuario = ?3 OR ?3 IS NULL) AND (tipoCambio = ?4 OR ?4 IS NULL)",
                fechaInicio, fechaFin, idUsuario, tipoCambio).list();
    }
}
