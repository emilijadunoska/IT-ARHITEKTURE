package ita.groupclassesservice.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import lombok.Data;


import java.util.List;

@Data
@MongoEntity(database = "group-classes-service", collection = "GroupClass")
public class GroupClass extends ReactivePanacheMongoEntity {
    private String name;
    private String description;
    private String instructor;
    private int capacity;
    private List<String> attendees;

}
