package org.launchcode.diary_card_v2_spring_maven.model.inputOptions.feelings;

public enum FeelingsJoyOptions {

    AMAZED("Amazed"),
    AWE("Awe"),
    BLISS("Bliss"),
    DELIGHTED("Delighted"),
    EAGER("Eager"),
    ECSTATIC("Ecstatic"),
    ENCHANTED("Enchanted"),
    ENERGIZED("Energized"),
    ENGAGED("Engaged"),
    ENTHUSIASTIC("Enthusiastic"),
    EXCITED("Excited"),
    FREE("Free"),
    HAPPY("Happy"),
    INSPIRED("Inspired"),
    INVIGORATED("Invigorated"),
    LIVELY("Lively"),
    PASSIONATE("Passionate"),
    PLAYFUL("Playful"),
    RADIANT("Radiant"),
    REFRESHED("Refreshed"),
    REJUVENATED("Rejuvenated"),
    RENEWED("Renewed"),
    SATISFIED("Satisfied"),
    THRILLED("Thrilled"),
    VIBRANT("Vibrant");

    private final String displayName;

    FeelingsJoyOptions(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
