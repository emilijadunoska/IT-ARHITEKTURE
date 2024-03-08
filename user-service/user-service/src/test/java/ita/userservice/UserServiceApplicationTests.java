package ita.userservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import ita.userservice.dto.UserRequest;
import ita.userservice.model.User;
import ita.userservice.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserServiceApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void shouldGetUserById() throws Exception {
        UserRequest userRequest = getUserRequest();
        String userRequestString = objectMapper.writeValueAsString(userRequest);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userRequestString))
                .andExpect(status().isCreated());

        User createdUser = userRepository.findAll().get(0);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/" + createdUser.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(createdUser.getId()));
    }

    @Test
    void shouldGetAllUsers() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    void shouldCreateUser() throws Exception {
        UserRequest userRequest = getUserRequest();
        String userRequestString = objectMapper.writeValueAsString(userRequest);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userRequestString))
                .andExpect(status().isCreated());
        Assertions.assertEquals(1, userRepository.findAll().size());
    }

    @Test
    void shouldUpdateUser() throws Exception {
        UserRequest userRequest = getUserRequest();
        String userRequestString = objectMapper.writeValueAsString(userRequest);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userRequestString))
                .andExpect(status().isCreated());

        User createdUser = userRepository.findAll().get(0);

        userRequest.setFirstName("UpdatedFirstName");

        String updateUserRequestString = objectMapper.writeValueAsString(userRequest);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/user/" + createdUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateUserRequestString))
                .andExpect(status().isOk());

        User updatedUser = userRepository.findById(createdUser.getId()).orElse(null);
        Assertions.assertNotNull(updatedUser);
        Assertions.assertEquals("UpdatedFirstName", updatedUser.getFirstName());
    }

    @Test
    void shouldDeleteUser() throws Exception {
        UserRequest userRequest = getUserRequest();
        String userRequestString = objectMapper.writeValueAsString(userRequest);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userRequestString))
                .andExpect(status().isCreated());

        User createdUser = userRepository.findAll().get(0);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/user/" + createdUser.getId()))
                .andExpect(status().isOk());

        Assertions.assertEquals(0, userRepository.findAll().size());
    }

    private UserRequest getUserRequest() {
        return UserRequest.builder()
                .firstName("John")
                .lastName("Doe")
                .email("johndoe@example.com")
                .role("user")
                .build();
    }

}
