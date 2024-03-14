package ita.membershipservice.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.types.ObjectId;

@NoArgsConstructor
@AllArgsConstructor
@Data
@MongoEntity(database = "membership-service", collection = "memberships")
@Builder
public class Membership {

    @BsonId
    private ObjectId id;
    private String userId;
    private String type;
    private Integer price;
    private String startDate;
    private String endDate;

    public Membership(String userId, String type, Integer price, String startDate, String endDate) {
        this.userId = userId;
        this.type = type;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
    }

}
