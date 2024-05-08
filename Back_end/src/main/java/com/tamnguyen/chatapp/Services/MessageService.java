package com.tamnguyen.chatapp.Services;

import java.util.List;

import com.tamnguyen.chatapp.Entities.Message;

public interface MessageService {
    public abstract Message getMessageByID(Long id);
    // public abstract List<Message> getConversationBetween(Long senderId, Long receiverId);
    public abstract Long createMessage(Message message);
}
