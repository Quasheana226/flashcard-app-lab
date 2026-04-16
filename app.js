/* ========================================
   BMW Flashcard App - Database & State Management
   ======================================== */

/* ========================================
   1. FLASHCARD DATABASE
   ======================================== */

const flashcardsDatabase = {
  all: [
    // Engine Cards
    { question: "What is the M54 engine commonly found in?", answer: "BMW 3-Series (E46) and 5-Series (E39)", category: "engine" },
    { question: "What displacement is the M54B30 engine?", answer: "3.0 liters (3000cc)", category: "engine" },
    { question: "When did BMW introduce the N54 engine?", answer: "2006 in the 335i", category: "engine" },
    { question: "What technology does the N54 feature?", answer: "Twin-turbocharged gasoline engine with direct injection", category: "engine" },
    { question: "What is the displacement of the N63 engine?", answer: "4.4 liters V8 with twin-turbochargers", category: "engine" },
    { question: "Which models use the N63 engine?", answer: "7-Series (F01/F02), X5 (E70/F15), X6 (E71/F16)", category: "engine" },
    { question: "What does Valvetronic do?", answer: "Continuously adjusts intake valve lift without a throttle butterfly for improved efficiency", category: "engine" },
    { question: "What is turbocharging?", answer: "Using exhaust gases to spin a turbine that compresses intake air for more power", category: "engine" },
    { question: "What does DOHC stand for?", answer: "Dual Overhead Camshaft - two camshafts per cylinder head", category: "engine" },
    
    // Chassis Cards
    { question: "What is xDrive?", answer: "BMW's intelligent all-wheel drive system with dynamic power distribution", category: "chassis" },
    { question: "What does ABS prevent?", answer: "Anti-lock Braking System prevents wheel lockup during emergency braking", category: "chassis" },
    { question: "What is DSC?", answer: "Dynamic Stability Control - electronic stability program for improved handling", category: "chassis" },
    { question: "What suspension type do modern BMWs use?", answer: "Double wishbone independent suspension with coil springs", category: "chassis" },
    { question: "What does AWD provide over RWD?", answer: "Better traction, improved stability in winter, faster acceleration", category: "chassis" },
    { question: "What is the benefit of M Sport suspension?", answer: "Stiffer springs and dampers for improved handling and reduced body roll", category: "chassis" },
    { question: "What does adaptive suspension do?", answer: "Adjusts damping in real-time based on driving conditions and road surface", category: "chassis" },
    { question: "What is the difference between xDrive and RWD?", answer: "xDrive is all-wheel drive with electronic differential, RWD is rear-wheel drive only", category: "chassis" },
    
    // Interior Cards
    { question: "What is iDrive?", answer: "BMW's integrated infotainment system with controller and touchscreen display", category: "interior" },
    { question: "What does HUD stand for?", answer: "Head-Up Display - projects driving information onto the windshield", category: "interior" },
    { question: "What is Comfort Access?", answer: "Keyless entry and push-button start system with proximity detection", category: "interior" },
    { question: "What features does iDrive 7 include?", answer: "Touchscreen, gesture control, voice commands, and smartphone integration", category: "interior" },
    { question: "What is the iDrive controller called?", answer: "The rotary controller/knob used to navigate iDrive menus", category: "interior" },
    { question: "What navigation system do BMWs use?", answer: "BMW Navigation Professional with real-time traffic information", category: "interior" },
    { question: "What is Gesture Control?", answer: "Allows controlling iDrive with hand gestures recognized by a sensor", category: "interior" },
    
    // Electrical Cards
    { question: "What is BMW's LED lighting called?", answer: "LED Intelligent Light System for adaptive headlights and daytime running lights", category: "electrical" },
    { question: "What technology powers BMW's headlights?", answer: "Adaptive LED headlights with curve light function", category: "electrical" },
    { question: "What is ConnectedDrive?", answer: "BMW's connected services platform integrating vehicle with mobile devices", category: "electrical" },
    { question: "What is DSC's role in the electrical system?", answer: "Uses sensors and ABS pump to maintain dynamic stability electronically", category: "electrical" },
    { question: "What does BMW Assist provide?", answer: "Emergency services connection and roadside assistance via built-in cellular", category: "electrical" },
    { question: "What technology manages engine timing?", answer: "Electronic Control Unit (ECU) with multiple sensors monitoring engine parameters", category: "electrical" },
    { question: "What is the purpose of the battery in modern BMWs?", answer: "Powers electrical systems and provides voltage regulation via alternator", category: "electrical" },
    
    // Exterior Cards
    { question: "What is BMW's iconic kidney grille?", answer: "The distinctive twin-kidney-shaped grille that is BMW's trademark design", category: "exterior" },
    { question: "What is the M Sport package?", answer: "Aggressive styling package with M bumpers, side skirts, and M wheels", category: "exterior" },
    { question: "What materials are used in modern BMW exterior?", answer: "Steel chassis with lightweight aluminum and carbon fiber components", category: "exterior" },
    { question: "What is the benefit of carbon fiber roof?", answer: "Reduces weight and lowers center of gravity for better performance", category: "exterior" },
    { question: "What does the blue kidney grille indicate?", answer: "BMW i electric vehicle models", category: "exterior" },
    { question: "What are M aerodynamic enhancements?", answer: "Splitters, spoilers, and diffusers that improve downforce and stability", category: "exterior" },
    { question: "What is the BMW 'Flame' design element?", answer: "Character line running along the body side from front to rear", category: "exterior" },
  ]
};

// Populate category arrays by filtering
flashcardsDatabase.engine = flashcardsDatabase.all.filter(card => card.category === 'engine');
flashcardsDatabase.chassis = flashcardsDatabase.all.filter(card => card.category === 'chassis');
flashcardsDatabase.interior = flashcardsDatabase.all.filter(card => card.category === 'interior');
flashcardsDatabase.electrical = flashcardsDatabase.all.filter(card => card.category === 'electrical');
flashcardsDatabase.exterior = flashcardsDatabase.all.filter(card => card.category === 'exterior');

/* ========================================
   2. APP STATE MANAGEMENT
   ======================================== */

const appState = {
  currentCardIndex: 0,
  isFlipped: false,
  isQuizStarted: false,
  currentCategory: 'all',
  currentDeck: [...flashcardsDatabase.all],
  darkMode: localStorage.getItem('bmw-flashcard-theme') === 'dark' || false,
  
  // Initialize from localStorage if available
  init() {
    const savedTheme = localStorage.getItem('bmw-flashcard-theme');
    if (savedTheme === 'dark') {
      this.darkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  },
  
  // Update current deck based on category
  setCategory(category) {
    this.currentCategory = category;
    if (category === 'all') {
      this.currentDeck = [...flashcardsDatabase.all];
    } else {
      this.currentDeck = flashcardsDatabase[category] || [];
    }
    this.currentCardIndex = 0;
    this.isFlipped = false;
  },
  
  // Get current card
  getCurrentCard() {
    return this.currentDeck[this.currentCardIndex];
  },
  
  // Navigate to next card
  nextCard() {
    if (this.currentCardIndex < this.currentDeck.length - 1) {
      this.currentCardIndex++;
      this.isFlipped = false;
      return true;
    }
    return false;
  },
  
  // Navigate to previous card
  previousCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.isFlipped = false;
      return true;
    }
    return false;
  },
  
  // Toggle card flip
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  },
  
  // Start quiz
  startQuiz() {
    this.isQuizStarted = true;
    this.currentCardIndex = 0;
    this.isFlipped = false;
  },
  
  // Reset quiz
  resetQuiz() {
    this.isQuizStarted = false;
    this.currentCardIndex = 0;
    this.isFlipped = false;
  },
  
  // Toggle dark mode
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('bmw-flashcard-theme', this.darkMode ? 'dark' : 'light');
    
    if (this.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  },
  
  // Get progress percentage
  getProgress() {
    if (this.currentDeck.length === 0) return 0;
    return Math.round(((this.currentCardIndex + 1) / this.currentDeck.length) * 100);
  }
};

/* ========================================
   3. THEME MANAGER
   ======================================== */

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.init();
  }

  init() {
    appState.init();
    
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
      this.updateToggleState();
    }
  }

  toggleTheme() {
    appState.toggleDarkMode();
    this.updateToggleState();
  }

  updateToggleState() {
    if (this.themeToggle) {
      const isDark = appState.darkMode;
      this.themeToggle.setAttribute('aria-pressed', isDark);
      
      const icon = this.themeToggle.querySelector('.theme-icon');
      if (icon) {
      }        icon.textContent = ' : 'isDark ? '
    }
  }
}

/* ========================================
   4. FLASHCARD APP
   ======================================== */

class FlashcardApp {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateDisplay();
  }

  attachEventListeners() {
    document.getElementById('startBtn')?.addEventListener('click', () => this.startQuiz());
    document.getElementById('flipBtn')?.addEventListener('click', () => this.flipCard());
    document.getElementById('resetBtn')?.addEventListener('click', () => this.resetQuiz());
    document.getElementById('prevBtn')?.addEventListener('click', () => this.previousCard());
    document.getElementById('nextBtn')?.addEventListener('click', () => this.nextCard());
    
    document.querySelectorAll('.category-btn')?.forEach(btn => {
      btn.addEventListener('click', (e) => this.selectCategory(e.target));
    });
    
    document.getElementById('flashcard')?.addEventListener('click', () => this.flipCard());
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  startQuiz() {
    appState.startQuiz();
    this.updateDisplay();
    this.showStatus('Quiz started! Click the card to flip it.');
  }

  flipCard() {
    if (!appState.isQuizStarted) return;
    appState.toggleFlip();
    this.updateCardDisplay();
  }

  nextCard() {
    if (appState.nextCard()) {
      this.updateDisplay();
    }
  }

  previousCard() {
    if (appState.previousCard()) {
      this.updateDisplay();
    }
  }

  selectCategory(btn) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.category || 'all';
    appState.setCategory(category);
    this.updateDisplay();
    this.showStatus(`Category: ${btn.textContent} (${appState.currentDeck.length} cards)`);
  }

  resetQuiz() {
    appState.resetQuiz();
    this.updateDisplay();
    this.showStatus('Quiz reset. Click "Start Quiz" to begin!');
  }

  updateDisplay() {
    this.updateButtonStates();
    this.updateCardDisplay();
    this.updateStats();
  }

  updateCardDisplay() {
    const card = appState.getCurrentCard();
    if (!card) return;

    document.getElementById('cardQuestion').textContent = card.question;
    document.getElementById('cardAnswer').textContent = card.answer;

    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
      if (appState.isFlipped) {
        flashcard.classList.add('flipped');
      } else {
        flashcard.classList.remove('flipped');
      }
    }
  }

  updateStats() {
    const currentEl = document.getElementById('currentCard');
    const totalEl = document.getElementById('totalCards');
    const progressFill = document.querySelector('.progress-fill');

    if (currentEl) currentEl.textContent = appState.isQuizStarted ? appState.currentCardIndex + 1 : 1;
    if (totalEl) totalEl.textContent = appState.currentDeck.length;

    if (progressFill) {
      const progress = appState.getProgress();
      progressFill.style.width = (appState.isQuizStarted ? progress : 0) + '%';
    }
  }

  updateButtonStates() {
    const startBtn = document.getElementById('startBtn');
    const flipBtn = document.getElementById('flipBtn');
    const resetBtn = document.getElementById('resetBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (startBtn) startBtn.disabled = appState.isQuizStarted;
    if (flipBtn) flipBtn.disabled = !appState.isQuizStarted;
    if (resetBtn) resetBtn.disabled = !appState.isQuizStarted;
    if (prevBtn) prevBtn.disabled = !appState.isQuizStarted || appState.currentCardIndex === 0;
    if (nextBtn) nextBtn.disabled = !appState.isQuizStarted || appState.currentCardIndex === appState.currentDeck.length - 1;
  }

  handleKeyboard(e) {
    if (!appState.isQuizStarted) return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        this.flipCard();
        break;
      case 'ArrowRight':
        this.nextCard();
        break;
      case 'ArrowLeft':
        this.previousCard();
        break;
    }
  }

  showStatus(message) {
    const statusDiv = document.getElementById('statusMessage');
    if (statusDiv) {
      statusDiv.textContent = message;
      statusDiv.classList.add('success');
      
      setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.classList.remove('success');
      }, 3000);
    }
  }
}

/* ========================================
   5. INITIALIZE APP
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new FlashcardApp();
});
