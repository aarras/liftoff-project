package org.launchcode.diary_card_v2_spring_maven.service;

import org.launchcode.diary_card_v2_spring_maven.model.Form;
import org.launchcode.diary_card_v2_spring_maven.repository.FormRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormService {

    private FormRepository formRepository;

    public FormService(FormRepository formRepository) { this.formRepository = formRepository; }

    public List<Form> getAll() { return formRepository.findAll(); }

    public Form addForm(Form form) {
        return formRepository.save(form);
    }
}
