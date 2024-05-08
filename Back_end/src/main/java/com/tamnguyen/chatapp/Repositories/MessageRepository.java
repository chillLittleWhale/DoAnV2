package com.tamnguyen.chatapp.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tamnguyen.chatapp.Entities.Message;
@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{
    // @Query("SELECT m FROM Message m WHERE (m.senderId = ?1 AND m.receiverId = ?2) OR (m.senderId = ?2 AND m.receiverId = ?1) ORDER BY m.id ASC")
    // List<Message> getConversationBetween(Long senderId, Long receiverId);
}
