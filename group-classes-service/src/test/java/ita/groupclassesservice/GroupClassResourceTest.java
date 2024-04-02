package ita.groupclassesservice;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import org.bson.types.ObjectId;
import org.hamcrest.CoreMatchers;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.json.Json;
import jakarta.json.JsonObject;


import static org.junit.jupiter.api.Assertions.assertNotNull;

@QuarkusTest
public class GroupClassResourceTest {

    private String createdGroupId;


    @BeforeEach
    void createGroupClass() {
        JsonObject groupClassJson = Json.createObjectBuilder()
                .add("id", ObjectId.get().toString())
                .add("name", "Test Class")
                .add("description", "Test Description")
                .add("instructor", "Test Instructor")
                .add("capacity", 20)
                .add("attendees", Json.createArrayBuilder().add("Attendee1").add("Attendee2"))
                .build();

        String response = RestAssured.given()
                .contentType("application/json")
                .body(groupClassJson.toString())
                .when()
                .post("/groupclass")
                .then()
                .statusCode(Matchers.either(CoreMatchers.is(201)).or(CoreMatchers.is(204)))
                .extract()
                .asString();

        createdGroupId = groupClassJson.getString("id");
    }

    @AfterEach
    void deleteGroupClass() {
        if (createdGroupId != null) {
            RestAssured.given()
                    .when()
                    .delete("/groupclass/{id}", createdGroupId)
                    .then()
                    .statusCode(204);
        }
    }

    @Test
    void testCreateGroupClass() {
        JsonObject groupClassJson = Json.createObjectBuilder()
                .add("name", "New Test Class")
                .add("description", "New Test Description")
                .add("instructor", "New Test Instructor")
                .add("capacity", 25)
                .add("attendees", Json.createArrayBuilder().add("Attendee1").add("Attendee2"))
                .build();

        RestAssured.given()
                .contentType("application/json")
                .body(groupClassJson.toString())
                .when()
                .post("/groupclass")
                .then()
                .statusCode(201)
                .contentType("");

    }

    @Test
    void testGetAllGroupClasses() {
        RestAssured.given()
                .when()
                .get("/groupclass")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void testUpdateGroupClass() {
        JsonObject updatedGroupClassJson = Json.createObjectBuilder()
                .add("id", createdGroupId)
                .add("name", "Updated Test Class")
                .add("description", "Updated Test Description")
                .add("instructor", "Updated Test Instructor")
                .add("capacity", 30)
                .add("attendees", Json.createArrayBuilder().add("Updated Attendee1").add("Updated Attendee2"))
                .build();

        RestAssured.given()
                .contentType("application/json")
                .body(updatedGroupClassJson.toString())
                .when()
                .put("/groupclass/{id}", createdGroupId)
                .then()
                .statusCode(200);
    }

    @Test
    void testGetGroupClassById() {
        String existingGroupId = "65fcaacadbac4346787c89ce";

        RestAssured.given()
                .when()
                .get("/groupclass/{id}", existingGroupId)
                .then()
                .statusCode(404)
                .contentType("application/json");
    }

    @Test
    void testDeleteGroupClass() {
        assertNotNull(createdGroupId, "createdGroupId should not be null");

        RestAssured.given()
                .when()
                .delete("/groupclass/{id}", createdGroupId)
                .then()
                .statusCode(204);
    }

}