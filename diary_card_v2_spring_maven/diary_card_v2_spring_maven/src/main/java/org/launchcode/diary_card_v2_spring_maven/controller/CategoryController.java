package org.launchcode.diary_card_v2_spring_maven.controller;

import org.launchcode.diary_card_v2_spring_maven.model.Category;
import org.launchcode.diary_card_v2_spring_maven.model.Form;
import org.launchcode.diary_card_v2_spring_maven.repository.CategoryRepository;
import org.launchcode.diary_card_v2_spring_maven.repository.FormRepository;
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
public class CategoryController {

    @Autowired
    public CategoryRepository categoryRepository;

    @Autowired
    public FormRepository formRepository;

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories(@RequestParam(required = false) String name) {
        try {
            List<Category> categories = new ArrayList<Category>();

            if (name == null)
                categoryRepository.findAll().forEach(categories::add);
            else
                categoryRepository.findByNameContaining(name).forEach(categories::add);

            if (categories.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/form/{id}/categories")
    public ResponseEntity<List<Category>> getAllCategoriesByForm(@PathVariable("id") long id) {

        Optional<Form> formData = formRepository.findById(id);

        try {
            List<Category> categories = new ArrayList<Category>();

            categoryRepository.findByForm(formData).forEach(categories::add);

            if (categories.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") long id) {

        Optional<Category> categoryData = categoryRepository.findById(id);

        if (categoryData.isPresent()) {
            return new ResponseEntity<>(categoryData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {

        try {
            Category _category = categoryRepository
                    .save(new Category(category.getName(), category.getInputType(), category.getOrder(), category.getForm()));
            return new ResponseEntity<>(_category, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") long id, @RequestBody Category category) {
        Optional<Category> categoryData = categoryRepository.findById(id);

        if (categoryData.isPresent()) {
            Category _category = categoryData.get();
            _category.setName(category.getName());
            return new ResponseEntity<>(categoryRepository.save(_category), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id") long id) {
        try {
            categoryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/categories")
    public ResponseEntity<HttpStatus> deleteAllCategories() {
        try {
            categoryRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
