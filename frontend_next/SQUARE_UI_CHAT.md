# Square UI Chat Integration

Successfully integrated the beautiful AI chat interface from [Square UI](https://github.com/ln-dev7/square-ui/tree/master/templates/chat).

## 🎯 Overview

**Square UI Chat** is a modern AI chat interface with:
- Conversation history sidebar
- Welcome screen with model/mode selection
- Real-time chat interface
- Message threading
- Archive/delete conversations
- Responsive design
- Dark mode support

**Live Demo:** https://square-ui-chat.vercel.app/

---

## ✅ What Was Integrated

### Dependencies Installed

```bash
npm install vaul zustand
```

**New Libraries:**
- `vaul` - Drawer component for mobile
- `zustand` - State management

### UI Components Added

- ✅ `grid-pattern.tsx` - Decorative grid background
- ✅ `separator.tsx` - Visual separator (via shadcn)
- ✅ `sheet.tsx` - Mobile sidebar drawer (already existed)

### Chat Components

**Location:** `/src/components/square-ui/chat/`

1. **`chat-sidebar.tsx`** - Conversation history sidebar
   - New chat button
   - Chat list with search
   - Archive management
   - Context menus

2. **`chat-main.tsx`** - Main chat container
   - State management
   - Message handling
   - Welcome/conversation view switching

3. **`chat-welcome-screen.tsx`** - Initial welcome screen
   - Model selection
   - Mode selection (fast/balanced/creative)
   - Prompt suggestions
   - Input box

4. **`chat-conversation-view.tsx`** - Active conversation view
   - Message list
   - Auto-scroll
   - Input box
   - Reset button

5. **`chat-input-box.tsx`** - Message input component
   - Textarea with auto-resize
   - Send button
   - Keyboard shortcuts (Cmd/Ctrl + Enter)

6. **`chat-message.tsx`** - Individual message component
   - User/AI message styling
   - Timestamp
   - Avatar

### State Management

**Location:** `/src/store/chat-store.ts`

Zustand store with:
- Chat list management
- Message handling
- Archive/unarchive
- Delete conversations
- Create new chats

### Mock Data

**Location:** `/src/mock-data/chats.ts`

Sample chat conversations for demo purposes.

---

## 🚀 Usage

### Basic Implementation

```tsx
"use client";

import { useState } from "react";
import { ChatSidebar, ChatMain } from "@/components/square-ui";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function ChatPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border">
        <ChatSidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden relative">
        <GridPattern className="pointer-events-none" />
        <div className="relative z-10 h-full">
          <ChatMain />
        </div>
      </div>
    </div>
  );
}
```

### With Mobile Support

```tsx
"use client";

import { useState } from "react";
import { ChatSidebar, ChatMain } from "@/components/square-ui";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r">
        <ChatSidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <ChatSidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Menu Button */}
        <div className="md:hidden p-4">
          <Button onClick={() => setSidebarOpen(true)}>
            <MenuIcon />
          </Button>
        </div>

        <ChatMain />
      </div>
    </div>
  );
}
```

---

## 📄 Demo Page

**URL:** `/square-chat`

Visit http://localhost:3000/square-chat to see the full chat interface.

**Features:**
- ✅ Responsive sidebar (desktop/mobile)
- ✅ Welcome screen with model selection
- ✅ Conversation view
- ✅ Message input
- ✅ Grid pattern background
- ✅ Dark mode toggle
- ✅ GitHub link

---

## 🎨 Components Breakdown

### ChatSidebar

**Features:**
- New chat button
- Search conversations
- Chat list (recent/archived)
- Context menu (archive/delete)
- Responsive design

**Props:** None (uses Zustand store)

```tsx
import { ChatSidebar } from "@/components/square-ui";

<ChatSidebar />
```

---

### ChatMain

**Features:**
- Welcome screen (initial state)
- Conversation view (active chat)
- Message state management
- Auto-switching between views

**Props:** None (internal state)

```tsx
import { ChatMain } from "@/components/square-ui";

<ChatMain />
```

---

### ChatWelcomeScreen

**Features:**
- Model selection dropdown
- Mode selection (fast/balanced/creative)
- Prompt suggestions
- Input box

**Props:**
```typescript
{
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  selectedMode: string;
  onModeChange: (mode: string) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
}
```

---

### ChatConversationView

**Features:**
- Message list with auto-scroll
- User/AI message rendering
- Input box
- Reset conversation button

**Props:**
```typescript
{
  messages: Message[];
  message: string;
  onMessageChange: (message: string) => void;
  onSend: (content: string) => void;
  onReset: () => void;
}
```

---

### ChatInputBox

**Features:**
- Auto-resizing textarea
- Send button
- Keyboard shortcuts (Cmd/Ctrl + Enter to send)
- Disabled state when empty

**Props:**
```typescript
{
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}
```

---

### ChatMessage

**Features:**
- User/AI styling
- Avatar display
- Timestamp
- Message content

**Props:**
```typescript
{
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}
```

---

## 🛠️ State Management (Zustand)

### Chat Store

**Location:** `/src/store/chat-store.ts`

**State:**
```typescript
{
  chats: Chat[];
  selectedChatId: string | null;
}
```

**Actions:**
```typescript
{
  selectChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">) => void;
  createNewChat: () => void;
  archiveChat: (chatId: string) => void;
  unarchiveChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
}
```

**Usage:**
```tsx
import { useChatStore } from "@/store/chat-store";

function MyComponent() {
  const { chats, selectChat, createNewChat } = useChatStore();

  return (
    <button onClick={createNewChat}>
      New Chat
    </button>
  );
}
```

---

## 📊 Data Types

### Chat

```typescript
interface Chat {
  id: string;
  title: string;
  icon: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}
```

### Message

```typescript
interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}
```

---

## 🎯 Customization

### Change AI Response

Edit `chat-main.tsx`:

```tsx
const handleSend = () => {
  // Add user message
  setMessages([...messages, {
    id: Date.now().toString(),
    content: message,
    sender: "user",
    timestamp: new Date(),
  }]);

  // Add AI response (customize this)
  setTimeout(() => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: "Your custom AI response here",
      sender: "ai",
      timestamp: new Date(),
    }]);
  }, 1000);
};
```

### Connect to Real AI API

```tsx
const handleSend = async () => {
  const userMessage = {
    id: Date.now().toString(),
    content: message,
    sender: "user" as const,
    timestamp: new Date(),
  };

  setMessages([...messages, userMessage]);
  setMessage("");

  // Call your AI API
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message: userMessage.content }),
  });

  const data = await response.json();

  setMessages(prev => [...prev, {
    id: Date.now().toString(),
    content: data.response,
    sender: "ai",
    timestamp: new Date(),
  }]);
};
```

### Change Models/Modes

Edit `chat-welcome-screen.tsx`:

```tsx
const models = [
  { value: "gpt-4", label: "GPT-4" },
  { value: "claude-3", label: "Claude 3" },
  { value: "gemini-pro", label: "Gemini Pro" },
];

const modes = [
  { value: "fast", label: "Fast", description: "Quick responses" },
  { value: "balanced", label: "Balanced", description: "Balanced quality" },
  { value: "creative", label: "Creative", description: "Most creative" },
];
```

### Customize Styling

All components use Tailwind CSS and respect your theme:

```tsx
// Example: Change sidebar width
<div className="w-80 border-r"> {/* Changed from w-64 */}
  <ChatSidebar />
</div>

// Example: Change message colors
// Edit chat-message.tsx
<div className={cn(
  "p-4 rounded-lg",
  sender === "user" 
    ? "bg-blue-500 text-white" // Custom user color
    : "bg-gray-100 dark:bg-gray-800" // Custom AI color
)}>
  {content}
</div>
```

---

## 🔧 Integration with Existing Chat

If you already have a chat component, you can:

1. **Use just the UI components:**
```tsx
import { ChatMessage, ChatInputBox } from "@/components/square-ui";

// Use in your existing chat
{messages.map(msg => (
  <ChatMessage key={msg.id} {...msg} />
))}

<ChatInputBox
  value={input}
  onChange={setInput}
  onSend={handleSend}
/>
```

2. **Use the store separately:**
```tsx
import { useChatStore } from "@/store/chat-store";

// Access chat state anywhere
const { chats, addMessage } = useChatStore();
```

3. **Replace mock data:**
```tsx
// In chat-store.ts
import { create } from "zustand";
import { myChats } from "@/lib/my-data"; // Your data

export const useChatStore = create<ChatState>((set) => ({
  chats: myChats, // Use your data
  // ... rest of store
}));
```

---

## 📱 Responsive Design

The chat interface is fully responsive:

### Mobile (< 768px)
- Sidebar hidden by default
- Menu button to open sidebar
- Full-width chat area
- Touch-optimized

### Tablet (768px - 1024px)
- Sidebar visible
- Compact layout

### Desktop (≥ 1024px)
- Full sidebar
- Spacious chat area
- Hover states

---

## 🎨 Theming

The chat interface supports dark mode automatically via `next-themes`:

```tsx
// Theme toggle is included
import { ThemeToggle } from "@/components/ui/theme-toggle";

<ThemeToggle />
```

**Colors used:**
- `background` - Main background
- `foreground` - Text color
- `border` - Borders
- `muted` - Muted text
- `accent` - Hover states

---

## 🐛 Troubleshooting

### Messages not appearing
Check that you're calling `setMessages` correctly:
```tsx
setMessages([...messages, newMessage]); // ✅ Correct
setMessages(newMessage); // ❌ Wrong
```

### Sidebar not showing on mobile
Ensure Sheet component is imported:
```tsx
import { Sheet, SheetContent } from "@/components/ui/sheet";
```

### Store not updating
Make sure you're using the store correctly:
```tsx
const { chats, addMessage } = useChatStore(); // ✅ Correct
const chats = useChatStore().chats; // ⚠️ Won't re-render
```

---

## 🔗 Resources

- **Original Template:** https://github.com/ln-dev7/square-ui/tree/master/templates/chat
- **Live Demo:** https://square-ui-chat.vercel.app/
- **Zustand Docs:** https://zustand-demo.pmnd.rs/
- **Vaul Docs:** https://vaul.emilkowal.ski/

---

## 🎉 Next Steps

1. **Test the demo** - Visit `/square-chat`
2. **Customize messages** - Update AI responses
3. **Connect to API** - Integrate with your AI backend
4. **Add features** - File uploads, code highlighting, etc.
5. **Deploy** - Push to production

Enjoy your beautiful AI chat interface! 💬✨
