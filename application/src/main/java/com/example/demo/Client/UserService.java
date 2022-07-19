package com.example.demo.Client;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService { //buisness logic
    private final UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public void deleteUser(Long id) {
        if(!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User with id " + id + " does not exist");
        }
        userRepository.deleteById(id);}
    public void addUser(User user) {
        if(userRepository.existsUserByEmail(user.getEmail())) {
            throw new IllegalArgumentException("User with this email already exists");
        }
        userRepository.save(user);
    }

}
