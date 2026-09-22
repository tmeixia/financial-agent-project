package com.example.agent.web;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
class ChatController {

    private final ChatClient chat;

    ChatController(ChatClient chat) {
        this.chat = chat;
    }

    @GetMapping("/chat")
    String chat(@RequestParam String q) {
        return chat.prompt().user(q).call().content();
    }
}
