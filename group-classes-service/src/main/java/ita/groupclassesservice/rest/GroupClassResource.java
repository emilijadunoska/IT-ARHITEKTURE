package ita.groupclassesservice.rest;
import io.smallrye.mutiny.Uni;
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
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<Void> createGroupClass(@QueryParam("name") String name,
                                      @QueryParam("description") String description,
                                      @QueryParam("instructor") String instructor,
                                      @QueryParam("capacity") int capacity,
                                      @QueryParam("attendees") List<String> attendees) {
        return groupClassRepository.addGroupClass(name, description, instructor, capacity, attendees).replaceWithVoid();
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
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<Void> updateGroupClass(@PathParam("id") String id,
                                      @QueryParam("name") String name,
                                      @QueryParam("description") String description,
                                      @QueryParam("instructor") String instructor,
                                      @QueryParam("capacity") int capacity,
                                      @QueryParam("attendees") List<String> attendees) {
        return groupClassRepository.updateGroupClass(id, name, description, instructor, capacity, attendees);
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<Void> deleteGroupClass(@PathParam("id") String id) {
        return groupClassRepository.deleteGroupClass(id);
    }


}
