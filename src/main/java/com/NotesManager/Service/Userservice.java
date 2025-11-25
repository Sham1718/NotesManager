package com.NotesManager.Service;

import com.NotesManager.DTO.AuthRequest;
import com.NotesManager.Model.User;
import com.NotesManager.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class Userservice {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepo userRepo;
    public void save(AuthRequest req) {
        User u=new User();
        u.setUsername(req.getUser());
        u.setPassword(passwordEncoder.encode(req.getPass()));
        u.setEmail(req.getEmail());
        u.setPhoneNo(req.getPhone());
        userRepo.save(u);

    }
}
