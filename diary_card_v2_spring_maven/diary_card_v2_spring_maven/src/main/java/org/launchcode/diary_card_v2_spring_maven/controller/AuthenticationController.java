package org.launchcode.diary_card_v2_spring_maven.controller;

import org.launchcode.diary_card_v2_spring_maven.model.User;
import org.launchcode.diary_card_v2_spring_maven.model.dto.SignInFormDTO;
import org.launchcode.diary_card_v2_spring_maven.model.dto.SignUpFormDTO;
import org.launchcode.diary_card_v2_spring_maven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/")
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Long userId = (Long) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    @GetMapping("/sign-up")
    public String displaySignUpForm(Model model) {
        model.addAttribute(new SignUpFormDTO());
        model.addAttribute("title", "Sign Up");
        return "/sign-up";
    }

    @PostMapping("/sign-up")
    public String processSignUpForm(@ModelAttribute @Valid SignUpFormDTO signUpFormDTO,
                                          Errors errors, HttpServletRequest request,
                                          Model model) {

        if (errors.hasErrors()) {
            model.addAttribute("title", "Sign Up");
            return "sign-up";
        }

        User existingUser = userRepository.findByEmail(signUpFormDTO.getEmail());

        if (existingUser != null) {
            errors.rejectValue("email", "email.alreadyexists", "A user with that email already exists");
            model.addAttribute("title", "Sign Up");
            return "sign-up";
        }

        String password = signUpFormDTO.getPassword();
        String verifyPassword = signUpFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
            model.addAttribute("title", "Sign Up");
            return "sign-up";
        }

        User newUser = new User(signUpFormDTO.getFirstName(), signUpFormDTO.getLastName(), signUpFormDTO.getEmail(), signUpFormDTO.getPassword());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        return "redirect:/sign-in";

    }

    @GetMapping("/sign-in")
    public String displaySignInForm(Model model) {
        model.addAttribute(new SignInFormDTO());
        model.addAttribute("title", "Sign In");
        return "sign-in";
    }

    @PostMapping("/sign-in")
    public String processSignInForm(@ModelAttribute @Valid SignInFormDTO signInFormDTO,
                                    Errors errors, HttpServletRequest request,
                                    Model model) {

        if (errors.hasErrors()) {
            model.addAttribute("title", "Sign In");
            return "sign-in";
        }

        User theUser = userRepository.findByEmail(signInFormDTO.getEmail());

        if (theUser == null) {
            errors.rejectValue("email", "email.invalid", "The given email does not exist");
            model.addAttribute("title", "Sign In");
            return "sign-in";
        }

        String password = signInFormDTO.getPassword();

        if (!theUser.isMatchingPassword(password)) {
            errors.rejectValue("password", "password.invalid", "Invalid password");
            model.addAttribute("title", "Sign In");
            return "sign-in";
        }

        setUserInSession(request.getSession(), theUser);

        return "redirect:";
    }

    @GetMapping("/sign-out")
    public String signOut(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/sign-in";
    }
}
