package org.launchcode.diary_card_v2_spring_maven.controller;

import org.launchcode.diary_card_v2_spring_maven.model.Form;
import org.launchcode.diary_card_v2_spring_maven.model.Input;
import org.launchcode.diary_card_v2_spring_maven.repository.FormRepository;
import org.launchcode.diary_card_v2_spring_maven.repository.InputRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class InputController {

    @Autowired
    public InputRepository inputRepository;

    @Autowired
    public FormRepository formRepository;

    @GetMapping("/inputs")
    public ResponseEntity<List<Input>> getAllInputs(@RequestParam(required = false) String label) {
        try {
            List<Input> inputs = new ArrayList<Input>();

            if (label == null)
                inputRepository.findAll().forEach(inputs::add);
            else
                inputRepository.findByLabelContaining(label).forEach(inputs::add);

            if (inputs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(inputs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/form/{id}/inputs")
    public ResponseEntity<List<Input>> getAllInputsByForm(@PathVariable("id") long id) {

        Optional<Form> formData = formRepository.findById(id);

        try {
            List<Input> inputs = new ArrayList<Input>();

            inputRepository.findByForm(formData).forEach(inputs::add);

        if (inputs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

            return new ResponseEntity<>(inputs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/inputs/{id}")
    public ResponseEntity<Input> getInputById(@PathVariable("id") long id) {

        Optional<Input> inputData = inputRepository.findById(id);

        if (inputData.isPresent()) {
            return new ResponseEntity<>(inputData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/inputs")
    public ResponseEntity<Input> createInput(@RequestBody Input input) {

        try {
            Input _input = inputRepository
                    .save(new Input(input.getLabel(), input.getType(), input.getForm()));
            return new ResponseEntity<>(_input, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/inputs/{id}")
    public ResponseEntity<Input> updateForm(@PathVariable("id") long id, @RequestBody Input input) {
        Optional<Input> inputData = inputRepository.findById(id);

        if (inputData.isPresent()) {
            Input _input = inputData.get();
            _input.setLabel(input.getLabel());
            return new ResponseEntity<>(inputRepository.save(_input), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/inputs/{id}")
    public ResponseEntity<HttpStatus> deleteInput(@PathVariable("id") long id) {
        try {
            inputRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/inputs")
    public ResponseEntity<HttpStatus> deleteAllInputs() {
        try {
            inputRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
