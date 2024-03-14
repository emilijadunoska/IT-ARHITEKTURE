package ita.membershipservice;

import static org.junit.jupiter.api.Assertions.assertEquals;

import jakarta.inject.Inject;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;
import ita.membershipservice.model.Membership;
import ita.membershipservice.repository.MembershipRepository;

@QuarkusTest
public class MembershipServiceTest {

    @Inject
    MembershipRepository membershipRepository;

    private Membership membership;

    @BeforeEach
    void setUp() {
        membershipRepository.deleteAll();

        membership = new Membership();
        membership.setUserId("user123");
        membership.setType("premium");
        membership.setPrice(50);
        membership.setStartDate("2024-04-01");
        membership.setEndDate("2024-04-30");
        membershipRepository.persist(membership);
    }

    @Test
    void testFindById() {
        Membership foundMembership = membershipRepository.findById(membership.getId());
        assertEquals("user123", foundMembership.getUserId());
        assertEquals("premium", foundMembership.getType());
        assertEquals(50, foundMembership.getPrice());
        assertEquals("2024-04-01", foundMembership.getStartDate());
        assertEquals("2024-04-30", foundMembership.getEndDate());
    }

}
