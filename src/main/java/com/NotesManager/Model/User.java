package com.NotesManager.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity

public class User {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long id;

    private String username;
    private String email;
    private long phoneNo;
    private String password;
}
