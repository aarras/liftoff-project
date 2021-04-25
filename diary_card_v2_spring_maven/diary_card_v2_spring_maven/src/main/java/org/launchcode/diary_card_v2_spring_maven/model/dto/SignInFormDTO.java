package org.launchcode.diary_card_v2_spring_maven.model.dto;

import com.sun.istack.NotNull;

import javax.validation.constraints.Size;

public class SignInFormDTO {

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String email;

    @NotNull
    @Size(min = 8, max = 30, message = "Invalid password. Must be between 8 and 30 characters long.")
    private String password;

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }
}
