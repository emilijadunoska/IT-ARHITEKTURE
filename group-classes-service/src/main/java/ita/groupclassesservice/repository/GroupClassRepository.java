package ita.groupclassesservice.repository;

import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoRepository;
import io.smallrye.mutiny.Uni;
import ita.groupclassesservice.jms.producer.GroupClassLogProducer;
import ita.groupclassesservice.model.GroupClass;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.inject.Inject;
import jakarta.jms.*;

import java.util.List;

@ApplicationScoped
public class GroupClassRepository implements ReactivePanacheMongoRepository<GroupClass> {

    private static final Logger logger = LoggerFactory.getLogger(GroupClassRepository.class);

    @Inject
    GroupClassLogProducer groupClassLogProducer;

    public Uni<Void> addGroupClass(String name, String description, String instructor, int capacity, List<String> attendees) {
        GroupClass groupClass = new GroupClass();
        groupClass.setName(name);
        groupClass.setInstructor(instructor);
        groupClass.setCapacity(capacity);
        groupClass.setDescription(description);
        groupClass.setAttendees(attendees);
        return groupClass.persist().replaceWithVoid().onItem().transform(ignored -> {
            String logMessage = "New group class added: " + name;
            try (JMSContext context = groupClassLogProducer.getContext()) {
                Queue queue = context.createQueue("GroupClassQueue");
                context.createProducer().send(queue, logMessage);
                logger.info(logMessage);
            } catch (Exception e) {
                logger.error("Failed to send log message", e);
            }
            return null;
        }).onFailure().invoke(throwable -> logger.error("Failed to add group class", throwable)).replaceWithVoid();
    }

    public Uni<Response> getAllGroupClasses() {
        return findAll().list().onItem().transformToUni(groupClasses -> {
            String logMessage = "Retrieved all group classes";
            try (JMSContext context = groupClassLogProducer.getContext()) {
                Queue queue = context.createQueue("GroupClassQueue");
                context.createProducer().send(queue, logMessage);
                logger.info(logMessage);
            } catch (Exception e) {
                logger.error("Failed to send log message", e);
            }
            if (groupClasses.isEmpty()) {
                return Uni.createFrom().item(Response.status(Response.Status.NOT_FOUND).entity("No group classes found").build());
            } else {
                return Uni.createFrom().item(Response.ok(groupClasses).build());
            }
        }).onFailure().recoverWithItem(throwable -> {
            logger.error("Failed to get all group classes", throwable);
            return Response.serverError().entity("Failed to retrieve group classes").build();
        });
    }

    public Uni<Response> getGroupClassById(String id) {
        ObjectId objectId = new ObjectId(id);
        return findById(objectId).onItem().transformToUni(groupClass -> {
            String logMessage = "Retrieved group class by id: " + id;
            try (JMSContext context = groupClassLogProducer.getContext()) {
                Queue queue = context.createQueue("GroupClassQueue");
                context.createProducer().send(queue, logMessage);
                logger.info(logMessage);
            } catch (Exception e) {
                logger.error("Failed to send log message", e);
            }
            if (groupClass != null) {
                return Uni.createFrom().item(Response.ok(groupClass).build());
            } else {
                return Uni.createFrom().item(Response.status(Response.Status.NOT_FOUND).entity("Group class not found with id: " + id).build());
            }
        }).onFailure().recoverWithItem(throwable -> {
            logger.error("Failed to get group class by id: " + id, throwable);
            return Response.serverError().entity("Failed to retrieve group class").build();
        });
    }

    public Uni<Void> deleteGroupClass(String id) {
        ObjectId objectId = new ObjectId(id);
        return deleteById(objectId).replaceWithVoid()
                .onItem().invoke(ignored -> {
                    String logMessage = "Deleted group class with id: " + id;
                    try (JMSContext context = groupClassLogProducer.getContext()) {
                        Queue queue = context.createQueue("GroupClassQueue");
                        context.createProducer().send(queue, logMessage);
                        logger.info(logMessage);
                    } catch (Exception e) {
                        logger.error("Failed to send log message", e);
                    }
                })
                .onFailure().invoke(throwable -> logger.error("Failed to delete group class with id: " + id, throwable));
    }

    public Uni<Void> updateGroupClass(String id, String name, String description, String instructor, int capacity, List<String> attendees) {
        try {
            ObjectId objectId = new ObjectId(id);
            return findById(objectId)
                    .onItem().ifNotNull().transformToUni(existingGroupClass -> {
                        existingGroupClass.setName(name);
                        existingGroupClass.setDescription(description);
                        existingGroupClass.setInstructor(instructor);
                        existingGroupClass.setCapacity(capacity);
                        existingGroupClass.setAttendees(attendees);
                        return existingGroupClass.update().replaceWithVoid()
                                .onItem().invoke(ignored -> {
                                    String logMessage = "Updated group class with id: " + id;
                                    try (JMSContext context = groupClassLogProducer.getContext()) {
                                        Queue queue = context.createQueue("GroupClassQueue");
                                        context.createProducer().send(queue, logMessage);
                                        logger.info(logMessage);
                                    } catch (Exception e) {
                                        logger.error("Failed to send log message", e);
                                    }
                                });
                    })
                    .onFailure().recoverWithNull();

        } catch (Exception ex) {
            logger.error("Invalid ObjectId format for id: " + id, ex);
            return Uni.createFrom().failure(ex);
        }
    }
}
