package ita.groupclassesservice.rest;
import io.smallrye.mutiny.Uni;
import ita.groupclassesservice.model.GroupClass;
import ita.groupclassesservice.repository.GroupClassRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/groupclass")
public class GroupClassResource {

    @Inject
    GroupClassRepository groupClassRepository;


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<Response> createGroupClass(GroupClass groupClass) {
        String name = groupClass.getName();
        String description = groupClass.getDescription();
        String instructor = groupClass.getInstructor();
        int capacity = groupClass.getCapacity();
        List<String> attendees = groupClass.getAttendees();

        return groupClassRepository.addGroupClass(name, description, instructor, capacity, attendees)
                .map(response -> Response.status(Response.Status.CREATED).entity(response).build());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<Response> getAllGroupClasses() {
        return groupClassRepository.getAllGroupClasses();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Uni<Response> getGroupClassById(@PathParam("id") String id) {
        return groupClassRepository.getGroupClassById(id);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<Response> updateGroupClass(@PathParam("id") String id, GroupClass groupClass) {
        String name = groupClass.getName();
        String description = groupClass.getDescription();
        String instructor = groupClass.getInstructor();
        int capacity = groupClass.getCapacity();
        List<String> attendees = groupClass.getAttendees();

        return groupClassRepository.updateGroupClass(id, name, description, instructor, capacity, attendees)
                .map(response -> Response.status(Response.Status.OK).entity("Group class with ID " + id + " updated").build());
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<Void> deleteGroupClass(@PathParam("id") String id) {
        return groupClassRepository.deleteGroupClass(id);
    }


}
