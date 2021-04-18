package diary_card_spring_g.repositories;

import diary_card_spring_g.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByFirstName(String firstName);
    List<User> findByLastName(String lastName);
}
