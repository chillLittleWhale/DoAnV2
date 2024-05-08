package com.tamnguyen.chatapp.Services;

import com.tamnguyen.chatapp.Entities.Conversation;

public interface ConversationService {

    public abstract Conversation getConversation(Long id);
    public abstract void createConversation(Conversation conversation);
    public abstract void deleteConversation(Long id);
    public abstract void updateConversation(Long id, Conversation conversation);
    
}
