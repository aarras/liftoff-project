package org.launchcode.diary_card_v2_spring_maven.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Table(name="category")
@Entity
public class Category {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @NotBlank(message="Category is required.")
    @NotNull(message="Category is required.")
    @Size(max=20, message="Category name must be less than 20 characters.")
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="inputType")
    private String inputType;

    @Column(name="orders")
    private Integer order;

    @ManyToOne
    @NotNull
    private Form form;

    public Category() {}

    public Category(String name, String inputType, Integer order, Form form) {
        this.name = name;
        this.inputType = inputType;
        this.order = order;
        this.form = form;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInputType() {
        return inputType;
    }

    public void setInputType(String inputType) {
        this.inputType = inputType;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
    }


}
