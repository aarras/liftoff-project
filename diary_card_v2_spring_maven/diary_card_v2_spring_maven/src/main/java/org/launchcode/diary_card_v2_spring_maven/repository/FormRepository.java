package org.launchcode.diary_card_v2_spring_maven.repository;

import org.launchcode.diary_card_v2_spring_maven.model.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {
    List<Form> findByNameContaining(String name);
}
