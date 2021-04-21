package org.launchcode.diary_card_v2_spring_maven.service;

import org.launchcode.diary_card_v2_spring_maven.model.User;
import org.launchcode.diary_card_v2_spring_maven.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }
}
