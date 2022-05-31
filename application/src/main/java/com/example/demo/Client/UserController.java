package com.example.demo.Client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {

    @GetMapping
    public List<User> getAllUsers() {
        return Arrays.asList( new User(1L, "John Doe", "BANg@eijr.pl", Gender.MALE), new User(2L, "Biedok", "waijfiw", Gender.MALE));
    }
}
