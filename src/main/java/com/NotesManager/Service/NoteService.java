package com.NotesManager.Service;


import com.NotesManager.Model.Note;
import com.NotesManager.Model.User;
import com.NotesManager.Repository.NoteRepo;
import com.NotesManager.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private NoteRepo noteRepo;

    public Note create(Note note) {
        return noteRepo.save(note);
    }

    public List<Note> getall() {
        return noteRepo.findAll();
    }

    public Optional<Note> getId(long id) {
        return noteRepo.findById(id);
    }

    public ResponseEntity<String> deletenote(long id, Principal principal) {
        User u = repo.findByUsername(principal.getName()).orElseThrow();
        Note n = noteRepo.findById(id).orElseThrow();
        if(n.getUser().getId() != u.getId()){
            return ResponseEntity.status(403).body("Not found");
        }
        noteRepo.delete(n);
        return ResponseEntity.ok("Deleted..!");
    }

    public Note update(long id, Note notedetails) {
        Note note = noteRepo.findById(id).orElseThrow(()->new RuntimeException("Note Note Found With Id "+ id));
        note.setId(notedetails.getId());
        note.setTitle(notedetails.getTitle());
        note.setContent(notedetails.getContent());
        return noteRepo.save(note);
    }

    public List<Note> getUserNotes(Principal principal) {
        User u =repo.findByUsername(principal.getName()).orElseThrow();
        return noteRepo.findByUser(u);

    }


}
