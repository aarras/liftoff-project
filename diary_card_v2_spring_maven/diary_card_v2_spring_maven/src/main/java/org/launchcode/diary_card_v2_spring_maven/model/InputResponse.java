package org.launchcode.diary_card_v2_spring_maven.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Calendar;

@Table(name="inputResponse")
@Entity
public class InputResponse {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @NotNull
    @Column(name="submissionDate")
    private Calendar submissionDate;

    @NotBlank
    @Column(name="response")
    private String response;

    @ManyToOne
    @NotNull
    private Input input;

    public InputResponse(Calendar submissionDate, String response, Input input) {
        this.submissionDate = submissionDate;
        this.response = response;
        this.input = input;
    }

    public InputResponse() {}

    public Long getId() { return id; }

    public Calendar getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Calendar submissionDate) {
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
