package com.NotesManager.DTO;


import lombok.Data;

@Data
public class AuthRequest {
    private String user;
    private String pass;
    private String email;
    private long phone;
}
