package org.launchcode.diary_card_v2_spring_maven.model.inputOptions.feelings;

public enum FeelingsAngryOptions {

    AGITATED("Agitated"),
    AGGRAVATED("Aggravated"),
    BITTER("Bitter"),
    CONTEMPT("Contempt"),
    CYNICAL("Cynical"),
    DISDAIN("Disdain"),
    DISGRUNTLED("Disgruntled"),
    DISTURBED("Disturbed"),
    EDGY("Edgy"),
    EXASPERATED("Exasperated"),
    FRUSTRATED("Frustrated"),
    FURIOUS("Furious"),
    GROUCHY("Grouchy"),
    HOSTILE("Hostile"),
    IMPATIENT("Impatient"),
    IRRITATED("Irritated"),
    IRATE("Irate"),
    MOODY("Moody"),
    OnEDGE("On-Edge"),
    OUTRAGED("Outraged"),
    PISSED("Pissed"),
    RESENTFUL("Resentful"),
    UPSET("Upset"),
    VINDICTIVE("Vindictive");

    private final String displayName;

    FeelingsAngryOptions(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
