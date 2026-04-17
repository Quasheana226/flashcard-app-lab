# 🚗 BMW Parts Master - Flashcard Learning App

A modern, accessible web application for learning BMW automotive knowledge through interactive flashcards. Master BMW engine components, chassis systems, interior features, electrical systems, and exterior design through an engaging quiz interface.

## 🌐 Live Demo

**[Launch the App →](https://quasheana226.github.io/flashcard-app-lab/)**

Try the app right now: https://quasheana226.github.io/flashcard-app-lab/

## 🌟 Features

### Core Functionality

- **Interactive Flashcard System** - Click to flip cards and reveal answers with smooth 3D animations
- **Category-Based Learning** - Organize cards into 5 specialized categories:
  - 🔧 Engine (M54, N54, N63, turbocharging, Valvetronic)
  - 🏎️ Chassis (xDrive, ABS, DSC, suspension systems)
  - 🪑 Interior (iDrive, HUD, Comfort Access, gesture control)
  - ⚡ Electrical (LED lighting, ConnectedDrive, DSC, ECU)
  - 🎨 Exterior (kidney grille, M Sport, carbon fiber, design elements)

### User Experience

- **30+ BMW Flashcards** - Comprehensive database with questions and detailed answers
- **Progress Tracking** - Visual progress bar showing quiz completion percentage
- **Card Counter** - Current card position and total cards in category
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Navigation** - Efficient shortcuts:
  - **Space** - Flip card
  - **→ (Right Arrow)** - Next card
  - **← (Left Arrow)** - Previous card

### Accessibility

- **WCAG 2.1 Level AA Compliant** - Meets accessibility standards
- **Screen Reader Support** - Full ARIA labels and dynamic announcements
- **Color Contrast** - Minimum 4.5:1 ratio for readability
- **Touch-Friendly Buttons** - 48px minimum touch targets (WCAG AAA)
- **Semantic HTML** - Proper use of heading hierarchy and landmarks

### Design & Theming

- **Light/Dark Mode Toggle** - Persistent theme preference with localStorage
- **CSS Custom Properties** - Fully themeable design system with 40+ variables
- **Smooth Animations** - 3D card flip with perspective transforms
- **Professional Color Scheme** - BMW-inspired blue and accent colors

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend or build tools required

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Quasheana226/flashcard-app-lab.git
cd flashcards-app
```

2. **Open in browser**

```bash
# Simply open index.html in your browser
open index.html
# or
python -m http.server 8000  # Optional: serve locally
```

## 📖 Usage

### Getting Started

1. **Select a Category** - Click on one of the category buttons:
   - All Parts
   - Engine
   - Chassis
   - Interior
   - Electrical
   - Exterior

2. **Start the Quiz** - Click the "Start Quiz" button to begin

3. **Study Cards** - Click the card to flip and reveal the answer

4. **Navigate** - Use Previous/Next buttons or arrow keys to move between cards

5. **Reset** - Click "Reset" to clear progress and start over

### Controls

| Button     | Action                                    |
| ---------- | ----------------------------------------- |
| Start Quiz | Begin quiz session with selected category |
| Flip Card  | Reveal/hide card answer                   |
| Previous   | Move to previous card                     |
| Next       | Move to next card                         |
| Reset      | End quiz and return to initial state      |
| 🌙/☀️      | Toggle between dark and light modes       |

## 🏗️ Project Structure

```
flashcards-app/
├── index.html          # Semantic HTML structure
├── styles.css          # Responsive CSS with themes
├── app.js              # Complete JavaScript application
└── README.md           # This file
```

### File Descriptions

**index.html** (170+ lines)

- Semantic HTML5 structure with proper landmark elements
- Navigation bar with theme toggle
- Stats bar with progress tracking
- Flashcard display container with 3D transforms
- Quiz controls and navigation buttons
- Category selection grid
- Info section with learning tips

**styles.css** (900+ lines)

- CSS custom properties system for theming
- Light theme with blue primary colors
- Dark theme with navy backgrounds
- Responsive breakpoints (480px, 768px, 1200px)
- 3D flip animation with transform-style
- Mobile-first design approach
- WCAG AA color contrast compliance

**app.js** (520+ lines)

- Flashcard database with 30+ BMW-related Q&A pairs
- State management with appState object
- Event listeners for all interactive elements
- Quiz flow management (start, display, reset, flip)
- Keyboard shortcut handling
- Theme persistence with localStorage
- Accessibility announcements for screen readers

## 🎨 Technologies Used

### Frontend

- **HTML5** - Semantic markup with ARIA attributes
- **CSS3** - Custom properties, Flexbox, Grid, 3D Transforms
- **JavaScript (ES6+)** - Vanilla JS, no frameworks required

### Key Features

- **localStorage API** - Persistent user preferences
- **CSS Transforms** - 3D flip animation with perspective
- **ARIA Live Regions** - Dynamic accessibility announcements
- **Data Attributes** - Flexible data binding for cards

## ♿ Accessibility Features

### Visual

- Color-blind friendly palette with sufficient contrast
- Multiple visual indicators (color + icons + text)
- Resizable text support
- Focus indicators on interactive elements

### Auditory

- Text-based content (no audio required)
- Captions for any future video content

### Motor

- Keyboard navigation for all features
- Large clickable targets (minimum 48px)
- No time-based interactions

### Cognitive

- Clear labeling and instructions
- Consistent navigation patterns
- Progress indicators
- Simple, focused interface

## 📱 Browser Support

| Browser | Desktop | Tablet | Mobile |
| ------- | ------- | ------ | ------ |
| Chrome  | ✅      | ✅     | ✅     |
| Firefox | ✅      | ✅     | ✅     |
| Safari  | ✅      | ✅     | ✅     |
| Edge    | ✅      | ✅     | ✅     |
| IE 11   | ❌      | ❌     | ❌     |

Requires support for:

- CSS Grid and Flexbox
- CSS Custom Properties
- CSS Transforms (3D)
- ES6 JavaScript
- localStorage API

## 🔧 Development

### Customizing Content

Edit the `flashcardsDatabase` object in `app.js`:

```javascript
const flashcardsDatabase = {
  all: [
    {
      question: "Your question here?",
      answer: "Your answer here",
      category: "engine", // or chassis, interior, electrical, exterior
    },
    // Add more cards...
  ],
};
```

### Modifying Themes

Update CSS custom properties in `styles.css`:

```css
:root {
  --color-primary: #1e40af;
  --color-accent: #dc2626;
  --bg-primary: #ffffff;
  /* ... more variables */
}

[data-theme="dark"] {
  --color-primary: #3b82f6;
  --bg-primary: #0f172a;
  /* ... more variables */
}
```

### Adding Categories

1. Add new category to database arrays
2. Create new category button in HTML
3. Add CSS styles for new category if needed
4. Category automatically appears in selection grid

## 📊 Performance

- **Bundle Size** - ~40KB total (HTML + CSS + JS)
- **Load Time** - < 1s on standard connections
- **Memory** - ~2-3MB with 30+ cards in memory
- **Animation** - 60fps smooth transforms
- **Accessibility** - No performance impact

## 🎯 Learning Outcomes

Users will learn about:

1. **BMW Engine Technology** - Historic and modern powerplants
2. **Suspension & Handling** - xDrive, DSC, and performance systems
3. **Infotainment Systems** - iDrive, connectivity, and interfaces
4. **Electrical Systems** - LED lighting, battery management, sensors
5. **Design Language** - BMW's iconic styling elements and packages

## 🔐 Privacy & Data

- **No External Requests** - All content is local
- **No Data Collection** - No analytics or tracking
- **Browser Storage Only** - Theme preference saved in localStorage only
- **No Account Required** - Use immediately, no signup

## 🐛 Known Limitations

- Card content fixed at load time (no real-time updates)
- No spaced repetition or scoring system
- Limited to 6 categories (extensible)
- Desktop-optimized display (mobile works but smaller)

## 🚀 Future Enhancements

- [ ] Add scoring and performance metrics
- [ ] Implement spaced repetition algorithm
- [ ] Add card creation/editing interface
- [ ] Export/import card sets
- [ ] Multiplayer quiz modes
- [ ] Progress persistence across sessions
- [ ] Audio pronunciation guides
- [ ] Flashcard images for visual learning
- [ ] Study streak tracking
- [ ] Difficulty levels

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check existing documentation
- Review the code comments for implementation details

## 🙏 Acknowledgments

- BMW Parts Master database from automotive enthusiasts
- WCAG accessibility guidelines
- Modern CSS techniques and best practices
- Open source web standards

---

**Happy Learning! 🚗📚**

Built with ❤️ for BMW enthusiasts and learners
