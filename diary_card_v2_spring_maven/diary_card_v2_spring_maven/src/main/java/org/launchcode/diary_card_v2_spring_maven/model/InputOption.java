package org.launchcode.diary_card_v2_spring_maven.model;

import javax.persistence.*;

@Table(name="input_options")
@Entity
public class InputOption {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @Column(name="label")
    private String label;

    @Column(name="value")
    private Integer value;

    public InputOption () {}

    public InputOption(String label, Integer value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() { return label; }

    public Integer getValue() { return value; }

    public Long getId() { return id; }
}
