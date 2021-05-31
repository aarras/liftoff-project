package org.launchcode.diary_card_v2_spring_maven.repository;

import org.launchcode.diary_card_v2_spring_maven.model.InputResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.List;

@Repository
public interface InputResponseRepository extends JpaRepository<InputResponse, Long> {
    List<InputResponse> findBySubmissionDate(Calendar submissionDate);
    List<InputResponse> findBySubmissionDateBetween(Calendar startDate, Calendar endDate);
}
