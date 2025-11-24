# Square UI Components

Beautiful, production-ready UI components from [Square UI](https://github.com/ln-dev7/square-ui).

## 🎯 Chat Interface

Modern AI chat interface with conversation history, model selection, and real-time messaging.

### Quick Start

```tsx
import { ChatSidebar, ChatMain } from "@/components/square-ui";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function ChatPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="w-64 border-r">
        <ChatSidebar />
      </div>
      <div className="flex-1 relative">
        <GridPattern className="pointer-events-none" />
        <div className="relative z-10 h-full">
          <ChatMain />
        </div>
      </div>
    </div>
  );
}
```

## 📦 Components

### Chat Components
- `ChatSidebar` - Conversation history sidebar
- `ChatMain` - Main chat container
- `ChatWelcomeScreen` - Initial welcome screen
- `ChatConversationView` - Active conversation view
- `ChatInputBox` - Message input
- `ChatMessage` - Individual message

### State Management
- `useChatStore` - Zustand store for chat state

## 🎨 Demo

Visit `/square-chat` to see the full chat interface.

## 📚 Documentation

See [SQUARE_UI_CHAT.md](../../../SQUARE_UI_CHAT.md) for complete documentation.

## 🔗 Resources

- [Square UI GitHub](https://github.com/ln-dev7/square-ui)
- [Live Demo](https://square-ui-chat.vercel.app/)
