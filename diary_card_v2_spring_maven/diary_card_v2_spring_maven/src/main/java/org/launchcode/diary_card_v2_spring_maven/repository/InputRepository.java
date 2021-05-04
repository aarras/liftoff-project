package org.launchcode.diary_card_v2_spring_maven.repository;

import org.launchcode.diary_card_v2_spring_maven.model.Input;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InputRepository extends JpaRepository<Input, Long> {
}
