package ita.userservice.service;

import ita.userservice.dto.UserResponse;
import ita.userservice.repository.UserRepository;
import ita.userservice.dto.UserRequest;
import ita.userservice.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    // GET ONE
    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapUserToUserResponse(user);
    }

    // GET ALL
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());
    }

    // POST
    public void createUser(UserRequest userRequest) {
        User user = User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
                .role(userRequest.getRole())
                .build();

        userRepository.save(user);
        log.info("User {} is saved", user.getId());
    }

    // PUT
    public void updateUser(String id, UserRequest userRequest) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existingUser.setFirstName(userRequest.getFirstName());
        existingUser.setLastName(userRequest.getLastName());
        existingUser.setEmail(userRequest.getEmail());
        existingUser.setPassword(userRequest.getPassword());
        existingUser.setRole(userRequest.getRole());

        userRepository.save(existingUser);
        log.info("User {} is updated", id);
    }

    // DELETE
    public void deleteUser(String id) {
        userRepository.deleteById(id);
        log.info("User {} is deleted", id);
    }

    private UserResponse mapUserToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }


}
