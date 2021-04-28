package org.launchcode.diary_card_v2_spring_maven.controller;

import org.launchcode.diary_card_v2_spring_maven.model.User;
import org.launchcode.diary_card_v2_spring_maven.repository.UserRepository;
import org.launchcode.diary_card_v2_spring_maven.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    // create employee rest api
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.addUser(user);
    }

}
