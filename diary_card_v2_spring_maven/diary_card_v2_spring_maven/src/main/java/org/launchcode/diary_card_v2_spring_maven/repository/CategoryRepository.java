package org.launchcode.diary_card_v2_spring_maven.repository;

import org.launchcode.diary_card_v2_spring_maven.model.Category;
import org.launchcode.diary_card_v2_spring_maven.model.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByNameContaining(String name);
    List<Category> findByForm(Optional<Form> form);
}
