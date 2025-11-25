package com.NotesManager.Controller;


import com.NotesManager.Model.Note;
import com.NotesManager.Model.User;
import com.NotesManager.Repository.UserRepo;
import com.NotesManager.Service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:5173")

public class NoteController {

//    @GetMapping
//    public String notes(){
//        return"API Working";
//    }

    @Autowired
    private UserRepo repo;

    @Autowired
    private NoteService noteService;

    @PostMapping
    public Note CreateNote(@RequestBody Note note, Principal principal){
        User u=repo.findByUsername(principal.getName()).orElseThrow();
        note.setUser(u);
        return noteService.create(note);
    }

    @GetMapping
    public List<Note> GetAllNotes(){
        return noteService.getall();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> GetByid(@PathVariable long id){
        return noteService.getId(id)
                .map(ResponseEntity :: ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletenote(@PathVariable long id,Principal principal){
        noteService.deletenote(id,principal);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updatenote(@PathVariable long id, @RequestBody Note notedetails ,Principal principal){
        try {
            return ResponseEntity.ok(noteService.update(id,notedetails));

        }catch (RuntimeException e){
                return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/mine")
    public ResponseEntity<List<Note>> GetUserNotes(Principal principal){
        List<Note> notes =noteService.getUserNotes(principal);
        return  ResponseEntity.ok(notes);
    }
}
