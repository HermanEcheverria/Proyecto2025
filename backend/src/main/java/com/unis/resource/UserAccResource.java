package com.unis.resource;

import com.unis.model.UserAcc;
import com.unis.service.UserAccService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Optional;

@Path("/usuarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserAccResource {

    @Inject
    UserAccService userAccService;

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") Long id) {
        Optional<UserAcc> user = userAccService.getUserById(id);
        return user.map(Response::ok).orElseGet(() -> Response.status(Response.Status.NOT_FOUND)).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateUser(@PathParam("id") Long id, UserAcc updatedUser) {
        try {
            userAccService.updateUser(id, updatedUser);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}/cambiar-rol")
    public Response changeUserRole(@PathParam("id") Long id, @QueryParam("nuevoRol") int nuevoRol) {
        try {
            userAccService.changeUserRole(id, nuevoRol);
            return Response.ok().entity("Rol cambiado correctamente").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
