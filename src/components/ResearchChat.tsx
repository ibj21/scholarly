
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, MessageSquare, Bot, User, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const ResearchChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI Research Assistant. Upload some documents and I'll help you analyze them, answer questions, and provide insights. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const responses = [
      `Based on the documents you've uploaded, I can see that "${userMessage}" relates to several key concepts. Let me break this down for you:

1. **Main findings**: The research indicates strong correlations between the variables you're asking about.

2. **Methodology**: The studies used quantitative analysis with a sample size of over 1,000 participants.

3. **Implications**: This has significant impact on future research directions in this field.

Would you like me to elaborate on any of these points or provide more specific details from the source documents?`,
      
      `Great question about "${userMessage}"! From analyzing your uploaded documents, here's what I found:

The authors discuss this concept extensively in Section 3.2, where they present evidence supporting the hypothesis. The key takeaways are:

• Statistical significance was achieved (p < 0.05)
• Effect size was moderate to large (Cohen's d = 0.7)
• Results were consistent across different demographic groups

This aligns with previous research by Johnson et al. (2019) and contradicts some earlier findings by Smith (2017).`,
      
      `Interesting inquiry about "${userMessage}". Let me search through your documents...

I found relevant information across 3 different papers in your collection. Here's a synthesized answer:

**Definition**: The concept is defined as a multifaceted phenomenon with both theoretical and practical implications.

**Evidence**: Multiple studies provide converging evidence, with meta-analyses showing consistent effect patterns.

**Applications**: The findings have been successfully applied in clinical, educational, and organizational settings.

The strongest evidence comes from the randomized controlled trials discussed in your uploaded research papers.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: simulateAIResponse(inputValue.trim()),
        timestamp: new Date(),
        sources: ['Research Paper 1.pdf', 'Document Analysis.pdf', 'Study Results.pdf']
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      toast({
        title: "Response generated",
        description: "AI has analyzed your documents and provided an answer.",
      });
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Research Chat Assistant
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'assistant' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  
                  <div className={`flex items-center gap-2 mt-2 text-xs text-gray-500 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{formatTimestamp(message.timestamp)}</span>
                    {message.sources && (
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{message.sources.length} sources</span>
                      </div>
                    )}
                  </div>
                  
                  {message.sources && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.sources.map((source, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-blue-100"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          {source}
                          <ExternalLink className="h-2 w-2 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t p-4 bg-gray-50/50">
            <div className="flex gap-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your documents... (Press Enter to send, Shift+Enter for new line)"
                className="flex-1 min-h-[60px] max-h-[120px] resize-none border-gray-300 focus:border-blue-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="self-end bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ask questions about methodology, findings, or request document summaries
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchChat;
