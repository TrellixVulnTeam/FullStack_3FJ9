package com.example.demo.Client;

import com.fasterxml.jackson.databind.node.LongNode;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    @GetMapping
    public List<User> getAllUsers() {
        //throw new IllegalStateException("Not implemented"); // this is type of server error
        return userService.getAllUsers();
    }
    @PostMapping
    public void addUser(@RequestBody User user) { //adding new user to database
        userService.addUser(user);
    }
    @DeleteMapping("{userId}")
    public void deleteUser(@PathVariable("userId")Long userId){userService.deleteUser(userId);}

}
