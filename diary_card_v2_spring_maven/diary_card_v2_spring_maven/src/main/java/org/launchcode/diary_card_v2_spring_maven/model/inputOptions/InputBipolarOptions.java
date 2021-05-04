package org.launchcode.diary_card_v2_spring_maven.model.inputOptions;

public enum InputBipolarOptions {

    MANIC("Manic"),
    NORMAL("Normal"),
    DEPRESSED("Depressed");

    private final String displayName;

    InputBipolarOptions(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
