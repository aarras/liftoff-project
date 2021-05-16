package org.launchcode.diary_card_v2_spring_maven.controller;

import org.apache.coyote.Response;
import org.launchcode.diary_card_v2_spring_maven.model.InputResponse;
import org.launchcode.diary_card_v2_spring_maven.repository.InputRepository;
import org.launchcode.diary_card_v2_spring_maven.repository.InputResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class InputResponseController {

    @Autowired
    public InputResponseRepository inputResponseRepository;

    @Autowired
    public InputRepository inputRepository;

    @GetMapping("/input-responses")
    public ResponseEntity<List<InputResponse>> getAllInputResponsesByDate(@RequestParam(required = false)Date submissionDate) {

        try {
            List<InputResponse> inputResponses = new ArrayList<InputResponse>();

            inputResponseRepository.findBySubmissionDate(submissionDate).forEach(inputResponses::add);

            if (inputResponses.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(inputResponses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/input-response/{id}")
    public ResponseEntity<InputResponse> getInputResponseById(@PathVariable("id") long id) {
        Optional<InputResponse> inputResponseData = inputResponseRepository.findById(id);

        if (inputResponseData.isPresent()) {
            return new ResponseEntity<>(inputResponseData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/input-responses")
    public ResponseEntity<InputResponse> createInputResponse(@RequestBody InputResponse inputResponse) {
        try {
            InputResponse _inputResponse = inputResponseRepository
                    .save(new InputResponse(inputResponse.getSubmissionDate(), inputResponse.getResponse(), inputResponse.getInput()));
            return new ResponseEntity<>(_inputResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("input-response/{id}")
    public ResponseEntity<InputResponse> updateInputResponse(@PathVariable("id") long id, @RequestBody InputResponse inputResponse) {
        Optional<InputResponse> inputResponseData = inputResponseRepository.findById(id);

        if (inputResponseData.isPresent()) {
            InputResponse _inputResponse = inputResponseData.get();
            _inputResponse.setResponse(inputResponse.getResponse());
            _inputResponse.setSubmissionDate(inputResponse.getSubmissionDate());
            return new ResponseEntity<>(inputResponseRepository.save(_inputResponse), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/input-response/{id}")
    public ResponseEntity<HttpStatus> deleteInputResponse(@PathVariable("id") long id) {
        try {
            inputResponseRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
