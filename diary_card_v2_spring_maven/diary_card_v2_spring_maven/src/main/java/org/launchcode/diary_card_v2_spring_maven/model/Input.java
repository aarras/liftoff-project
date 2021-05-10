package org.launchcode.diary_card_v2_spring_maven.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Table(name="inputs")
@Entity
public class Input {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @NotBlank(message="Input Label is required.")
    @Size(max=20, message="Input name must be less than 20 characters.")
    @Column(name="label")
    private String label;

    @ManyToOne
    @NotNull
    private Category category;

    public Input() {}

    public Input(String label) {
        this.label = label;
    }

    public Input(String label, Category category) {
        this.label = label;
        this.category = category;
    }

    public String getLabel() { return label; }

    public void setLabel(String label) { this.label = label; }

    public Category getCategory() {
        return category;
    }

    public void setForm(Category category) {
        this.category = category;
    }

    public Long getId() { return id; }

}
