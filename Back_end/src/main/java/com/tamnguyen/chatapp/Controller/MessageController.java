package com.tamnguyen.chatapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tamnguyen.chatapp.Entities.Message;
import com.tamnguyen.chatapp.Services.MessageService;

@RestController
@RequestMapping("/message")
@CrossOrigin("*")
public class MessageController {
    @Autowired
    MessageService service;

    // @PostMapping()
    // public ResponseEntity<?> addMessage(@RequestBody Message message) {
    // service.createMessage(message);
    // return new ResponseEntity<>(null, HttpStatus.valueOf(201));
    // }
    @PostMapping()
    public ResponseEntity<Long> addMessage(@RequestBody Message message) {
        Long messageId = service.createMessage(message);
        return new ResponseEntity<>(messageId, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable Long id) {
        Message message = service.getMessageByID(id);
        if (message != null) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
