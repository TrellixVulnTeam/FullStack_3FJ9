package com.example.demo.Client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository
        extends JpaRepository<User, Long> {
    public Boolean existsUserByEmail(String email);
    public Boolean existsUserById(Long id);
}
