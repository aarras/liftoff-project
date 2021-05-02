package org.launchcode.diary_card_v2_spring_maven.model.inputOptions.feelings;

public enum FeelingsAcceptingOptions {

    CALM("Calm"),
    CENTERED("Centered"),
    CONTENT("Content"),
    FULFILLED("Fulfilled"),
    PATIENT("Patient"),
    PEACEFUL("Peaceful"),
    RELAXED("Relaxed"),
    SERENE("Serene"),
    TRUSTING("Trusting");

    private final String displayName;

    FeelingsAcceptingOptions(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
