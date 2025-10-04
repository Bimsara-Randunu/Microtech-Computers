package com.example2.demo2.repo;

import com.example2.demo2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo  extends JpaRepository<User,Long> {
    @Query(value =  "SELECT * FROM User WHERE id=?1",nativeQuery = true)
    User getUserById(Long id);
    Optional<User> findByEmail(String email);  // Use Optional to avoid NullPointerException
}
