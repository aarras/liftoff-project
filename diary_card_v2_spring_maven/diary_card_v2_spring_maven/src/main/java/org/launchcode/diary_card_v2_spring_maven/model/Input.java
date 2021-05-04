package org.launchcode.diary_card_v2_spring_maven.model;

import lombok.Data;
import org.dom4j.tree.AbstractEntity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Table(name="input")
@Entity
public class Input extends AbstractEntity {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @NotBlank(message="Input Label is required.")
    @Column(name="label")
    private String label;

    @Column(name="type")
    private String type;

    public Input() {}

    public Input(String label, String type) {
        this.label = label;
        this.type = type;
    }

    public String getName() { return label; }

    public String getType() { return type; }

}
