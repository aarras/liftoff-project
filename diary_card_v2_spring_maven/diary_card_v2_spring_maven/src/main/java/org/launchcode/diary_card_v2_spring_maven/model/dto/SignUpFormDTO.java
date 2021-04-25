package org.launchcode.diary_card_v2_spring_maven.model.dto;

public class SignUpFormDTO extends SignInFormDTO {

    private String verifyPassword;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }
}
