package org.launchcode.diary_card_v2_spring_maven.model.dto;

import com.sun.istack.NotNull;

public class SignUpFormDTO extends SignInFormDTO {

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private String verifyPassword;

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }
}
