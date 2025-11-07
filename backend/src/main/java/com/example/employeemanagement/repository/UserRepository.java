package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
=======
import java.util.Optional;

/** This interface represents the repository for users. */
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
}
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
