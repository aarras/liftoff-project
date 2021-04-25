package org.launchcode.diary_card_v2_spring_maven.controller;

import org.launchcode.diary_card_v2_spring_maven.model.User;
import org.launchcode.diary_card_v2_spring_maven.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
//@RequestMapping()
//public class UserController {
//
//    private UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping
//    @ResponseStatus(HttpStatus.OK)
//    public List<User> getAll() {
//        return userService.getAll();
//    }
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.OK)
//    public User addNew(@RequestBody User user) {
//        return userService.addUser(user);
//    }
//}
