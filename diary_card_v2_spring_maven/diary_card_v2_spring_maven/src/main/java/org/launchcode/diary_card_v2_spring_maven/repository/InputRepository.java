package org.launchcode.diary_card_v2_spring_maven.repository;

import org.launchcode.diary_card_v2_spring_maven.model.Form;
import org.launchcode.diary_card_v2_spring_maven.model.Input;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InputRepository extends JpaRepository<Input, Long> {
    List<Input> findByLabelContaining(String name);
    List<Input> findByForm(Optional<Form> form);
}
