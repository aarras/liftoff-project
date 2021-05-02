package org.launchcode.diary_card_v2_spring_maven.controller;

import org.launchcode.diary_card_v2_spring_maven.model.Form;
import org.launchcode.diary_card_v2_spring_maven.repository.FormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class FormController {

    @Autowired
    public FormRepository formRepository;

    @GetMapping("/forms")
    public ResponseEntity<List<Form>> getAllForms(@RequestParam(required = false) String name) {
        try {
            List<Form> forms = new ArrayList<Form>();

            if (name == null)
                formRepository.findAll().forEach(forms::add);
            else
                formRepository.findByNameContaining(name).forEach(forms::add);

            if (forms.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(forms, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/forms/{id}")
    public ResponseEntity<Form> getFormById(@PathVariable("id") long id) {

        Optional<Form> formData = formRepository.findById(id);

        if (formData.isPresent()) {
            return new ResponseEntity<>(formData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/forms")
    public ResponseEntity<Form> createForm(@RequestBody Form form) {
        try {
            Form _form = formRepository
                    .save(new Form(form.getName()));
            return new ResponseEntity<>(_form, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/forms/{id}")
    public ResponseEntity<Form> updateForm(@PathVariable("id") long id, @RequestBody Form form) {
        Optional<Form> formData = formRepository.findById(id);

        if (formData.isPresent()) {
            Form _form = formData.get();
            _form.setName(form.getName());
            return new ResponseEntity<>(formRepository.save(_form), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/forms/{id}")
    public ResponseEntity<HttpStatus> deleteForm(@PathVariable("id") long id) {
        try {
            formRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/forms")
    public ResponseEntity<HttpStatus> deleteAllForms() {
        try {
            formRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
