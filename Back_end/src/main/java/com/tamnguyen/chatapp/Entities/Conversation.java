package com.tamnguyen.chatapp.Entities;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "conversations")
public class Conversation {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupName;
    
    private List<Long> participantList= new ArrayList<>();

    private List<Long> messageList= new ArrayList<>();
}
