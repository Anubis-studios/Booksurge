# Book⚡Surge | KDP Publishing Suite

A comprehensive AI-powered book publishing platform built with React, Vite, and Tailwind CSS.

## Features

- 🤖 **AI Narrative Forge** - Generate complete book manuscripts with multi-stage pipeline
- 🎨 **Design Studio** - Interactive canvas for creating KDP-compliant book covers
- 📐 **KDP Compliance Engine** - Visual guides for print specifications and bleed zones
- 📚 **Library Management** - Import/export projects with JSON support
- 📖 **Reader View** - Beautiful manuscript reading experience
- 🔐 **Authentication** - Local storage-based user management
- 📱 **Responsive Design** - Mobile-first with desktop sidebar navigation

## Tech Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Context API for state management
- LocalStorage for persistence

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   └── Layout.tsx       # Header, Sidebar, MobileNav, Toasts
├── views/
│   ├── Login.tsx        # Authentication view
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Forge.tsx        # AI book generation pipeline
│   ├── Studio.tsx       # Design canvas
│   ├── Compliance.tsx   # KDP specs viewer
│   ├── Library.tsx      # Book management
│   └── Reader.tsx       # Manuscript reader
├── store.tsx            # State management context
├── App.tsx              # Main app component
└── index.css            # Global styles
```

## Features in Detail

### AI Narrative Forge
Multi-stage story generation pipeline:
1. Concept Generation
2. Story Bible Creation
3. Outline Architecture
4. Manuscript Drafting
5. Editorial Pass
6. Quality Control
7. Metadata Generation
8. Finalization

### Design Studio
Interactive canvas with:
- Drag-and-drop elements
- Text and shape tools
- Property editing panel
- Safe zone guides for KDP compliance

### KDP Compliance
Visual reference for:
- Trim sizes (6" x 9" standard)
- Bleed zones (+0.125")
- Safe zones (-0.5")
- Interior margins
- Page count requirements

## License

MIT
