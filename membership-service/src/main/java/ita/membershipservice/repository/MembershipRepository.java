package ita.membershipservice.repository;

import io.quarkus.mongodb.panache.PanacheMongoRepository;
import ita.membershipservice.model.Membership;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MembershipRepository implements PanacheMongoRepository<Membership> {

    public Membership findByUserId(String userId) {
        return find("userId", userId).firstResult();
    }

}
