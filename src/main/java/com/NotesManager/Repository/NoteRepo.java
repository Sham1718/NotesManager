package com.NotesManager.Repository;


import com.NotesManager.Model.Note;
import com.NotesManager.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepo extends JpaRepository<Note,Long> {
    List<Note> findByUser(User user);



}
