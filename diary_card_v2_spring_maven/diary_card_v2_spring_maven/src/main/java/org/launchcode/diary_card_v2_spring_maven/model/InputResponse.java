package org.launchcode.diary_card_v2_spring_maven.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Table(name="inputResponse")
@Entity
public class InputResponse {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @NotNull
    @Column(name="submissionDate")
    private Date submissionDate;

    @NotBlank
    @Column(name="response")
    private String response;

    @ManyToOne
    @NotNull
    private Input input;

    public InputResponse(Date submissionDate, String response, Input input) {
        this.submissionDate = submissionDate;
        this.response = response;
        this.input = input;
    }

    public InputResponse() {}

    public Long getId() { return id; }

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public Input getInput() {
        return input;
    }

    public void setInput(Input input) {
        this.input = input;
    }
    
}
