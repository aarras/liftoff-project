package org.launchcode.diary_card_v2_spring_maven.model;

import org.dom4j.tree.AbstractEntity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Table(name="input")
@Entity
public class Input {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @NotBlank(message="Input Label is required.")
    @Size(max=20, message="Input name must be less than 20 characters")
    @Column(name="label")
    private String label;

    @Column(name="type")
    private String type;

    @ManyToOne
    @NotNull(message = "Form is required")
    private Form form;

    public Input() {}

    public Input(String label) {
        this.label = label;
    }

    public Input(String label, String type, Form form) {
        this.label = label;
        this.type = type;
        this.form = form;
    }

    public String getLabel() { return label; }

    public void setLabel(String label) { this.label = label; }

    public String getType() { return type; }

    public void setType(String type) { this.type = type; }

    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
    }

    public Long getId() { return id; }

}
