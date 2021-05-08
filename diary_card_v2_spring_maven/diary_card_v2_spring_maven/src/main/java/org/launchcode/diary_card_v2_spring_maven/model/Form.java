package org.launchcode.diary_card_v2_spring_maven.model;

import lombok.Data;
import org.dom4j.tree.AbstractEntity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Table(name = "form")
@Entity
public class Form {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @Column(name="name")
    @NotBlank(message = "Form Name is required.")
    @Size(max = 100, message = "Form name must be less than 100 characters")
    private String name;

    public Form() {}

    public Form(String name) { this.name = name; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public Long getId() { return id; }

    @Override
    public String toString() {
        return "Form [id=" + id + ", name=" + name + "]";
    }
}
