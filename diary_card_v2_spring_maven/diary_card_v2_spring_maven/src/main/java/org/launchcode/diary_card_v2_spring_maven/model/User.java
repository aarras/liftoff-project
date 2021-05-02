package org.launchcode.diary_card_v2_spring_maven.model;

import lombok.Data;
import org.dom4j.tree.AbstractEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Table(name = "user")
@Entity
public class User extends AbstractEntity {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @Column(name="firstName")
    @NotBlank(message="First Name is required.")
    private String firstName;

    @Column(name="lastName")
    @NotBlank(message="Last Name is required.")
    private String lastName;

    @NotNull
    @Column(name="email")
    private String email;

    @NotNull
    @Column(name="pwHash")
    private String pwHash;

    public User() {}

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pwHash = encoder.encode(password);
    }

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getEmail() { return email; }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }
}
