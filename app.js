/* ========================================
   BMW Flashcard App - Complete Implementation
   Database, State Management, Event Listeners, Quiz Functions
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

    getCurrentCard() {
        return this.currentDeck[this.currentCardIndex];
    },

    nextCard() {
        if (this.currentCardIndex < this.currentDeck.length - 1) {
            this.currentCardIndex++;
            this.isFlipped = false;
            return true;
        }
        return false;
    },

    previousCard() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            this.isFlipped = false;
            return true;
        }
        return false;
    },

    toggleFlip() {
        this.isFlipped = !this.isFlipped;
    },

    startQuiz() {
        this.isQuizStarted = true;
        this.currentCardIndex = 0;
        this.isFlipped = false;
    },

    resetQuiz() {
        this.isQuizStarted = false;
        this.currentCardIndex = 0;
        this.isFlipped = false;
    },

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('bmw-flashcard-theme', this.darkMode ? 'dark' : 'light');

        if (this.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    },

    getProgress() {
        if (this.currentDeck.length === 0) return 0;
        return Math.round(((this.currentCardIndex + 1) / this.currentDeck.length) * 100);
    }
};

/* ========================================
   3. DOM ELEMENTS OBJECT
   ======================================== */

const elements = {
    // Buttons
    startBtn: null,
    flipBtn: null,
    resetBtn: null,
    prevBtn: null,
    nextBtn: null,
    themeToggle: null,
    categoryBtns: [],

    // Card Elements
    flashcard: null,
    cardQuestion: null,
    cardAnswer: null,

    // Stats Elements
    currentCard: null,
    totalCards: null,
    progressFill: null,

    // Other Elements
    statusMessage: null,
    themeIcon: null,

    // Initialize all DOM references
    init() {
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.flipBtn = document.getElementById('flipBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.categoryBtns = Array.from(document.querySelectorAll('.category-btn'));

        // Card Elements
        this.flashcard = document.getElementById('flashcard');
        this.cardQuestion = document.getElementById('cardQuestion');
        this.cardAnswer = document.getElementById('cardAnswer');

        // Stats Elements
        this.currentCard = document.getElementById('currentCard');
        this.totalCards = document.getElementById('totalCards');
        this.progressFill = document.querySelector('.progress-fill');

        // Other Elements
        this.statusMessage = document.getElementById('statusMessage');
        this.themeIcon = document.querySelector('.theme-icon');
    }
};

/* ========================================
   4. EVENT LISTENERS SETUP
   ======================================== */

function setupEventListeners() {
    // Button Click Listeners
    if (elements.startBtn) {
        elements.startBtn.addEventListener('click', () => handleStartQuiz());
    }

    if (elements.flipBtn) {
        elements.flipBtn.addEventListener('click', () => handleFlipCard());
    }

    if (elements.resetBtn) {
        elements.resetBtn.addEventListener('click', () => handleResetQuiz());
    }

    if (elements.prevBtn) {
        elements.prevBtn.addEventListener('click', () => handlePreviousCard());
    }

    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', () => handleNextCard());
    }

    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => handleToggleTheme());
    }

    // Flashcard Click Listener
    if (elements.flashcard) {
        elements.flashcard.addEventListener('click', () => handleFlipCard());
    }

    // Category Button Listeners
    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => handleSelectCategory(e.target));
    });

    // Keyboard Listener
    document.addEventListener('keydown', (e) => handleKeyPress(e));
}

/* ========================================
   5. QUIZ MANAGEMENT FUNCTIONS
   ======================================== */

function startQuiz() {
    // Check if deck is empty
    if (appState.currentDeck.length === 0) {
        updateStatus('warning', 'No cards in this category. Please select another.');
        return;
    }

    // Initialize quiz state
    appState.isQuizStarted = true;
    appState.currentCardIndex = 0;
    appState.isFlipped = false;

    // Update UI
    updateQuizUI(true);
    displayCard();
    updateStatus('success', 'Quiz started! Click the card to flip it.');
}

function displayCard() {
    // Return early if deck is empty
    if (appState.currentDeck.length === 0) return;

    // Get current card
    const card = appState.getCurrentCard();
    if (!card) return;

    // Update card display
    if (elements.cardQuestion) {
        elements.cardQuestion.textContent = card.question;
    }

    if (elements.cardAnswer) {
        elements.cardAnswer.textContent = card.answer;
    }

    // Remove flipped class
    if (elements.flashcard) {
        elements.flashcard.classList.remove('flipped');
    }

    // Reset flip state
    appState.isFlipped = false;

    // Update all UI elements
    updateStats();
    updateNavButtons();
    announceCard(card);
}

function resetQuiz() {
    // Reset all state
    appState.currentCardIndex = 0;
    appState.isFlipped = false;
    appState.isQuizStarted = false;

    // Update UI
    updateQuizUI(false);

    // Reset card display to defaults
    if (elements.cardQuestion) {
        elements.cardQuestion.textContent = 'Select a category and click "Start Quiz" to begin!';
    }

    if (elements.cardAnswer) {
        elements.cardAnswer.textContent = 'Your answer will appear here.';
    }

    if (elements.flashcard) {
        elements.flashcard.classList.remove('flipped');
    }

    // Reset stats
    updateStats();
    updateStatus('success', 'Ready to learn! Select a category to get started.');
}

/* ========================================
   6. FLIP CARD FUNCTIONALITY
   ======================================== */

function flipCard() {
    // Return early if quiz not started
    if (!appState.isQuizStarted) return;

    // Get current card before toggling
    const card = appState.getCurrentCard();
    if (!card) return;

    // Toggle the flip state
    appState.toggleFlip();

    // Toggle the CSS class
    if (elements.flashcard) {
        if (appState.isFlipped) {
            elements.flashcard.classList.add('flipped');
        } else {
            elements.flashcard.classList.remove('flipped');
        }
    }

    // Create announcement message based on flipped state
    const announcement = appState.isFlipped
        ? `Answer: ${card.answer}`
        : `Question: ${card.question}`;

    // Announce to screen readers
    announce(announcement);
}

function announce(message) {
    // Create new div element for accessibility announcement
    const announcer = document.createElement('div');

    // Set ARIA attributes for screen readers
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');

    // Add screen-reader-only class
    announcer.className = 'sr-only';

    // Set the announcement message
    announcer.textContent = message;

    // Append to document body
    document.body.appendChild(announcer);

    // Remove element after 1000ms to avoid accumulation
    setTimeout(() => {
        announcer.remove();
    }, 1000);
}

/* ========================================
   7. EVENT HANDLERS
   ======================================== */

function handleStartQuiz() {
    startQuiz();
}

function handleFlipCard() {
    flipCard();
}

function handleResetQuiz() {
    resetQuiz();
}

function handleNextCard() {
    if (appState.nextCard()) {
        displayCard();
    }
}

function handlePreviousCard() {
    if (appState.previousCard()) {
        displayCard();
    }
}

function handleSelectCategory(btn) {
    elements.categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.category || 'all';
    appState.setCategory(category);

    // Reset quiz if it was active
    if (appState.isQuizStarted) {
        resetQuiz();
    }

    updateStatus('success', `Category: ${btn.textContent} (${appState.currentDeck.length} cards)`);
}

function handleToggleTheme() {
    appState.toggleDarkMode();
    updateThemeToggle();
}

function handleKeyPress(e) {
    if (!appState.isQuizStarted) return;

    switch (e.code) {
        case 'Space':
            e.preventDefault();
            handleFlipCard();
            break;
        case 'ArrowRight':
            handleNextCard();
            break;
        case 'ArrowLeft':
            handlePreviousCard();
            break;
    }
}

/* ========================================
   8. UI UPDATE HELPER FUNCTIONS
   ======================================== */

function updateStatus(type, message) {
    if (!elements.statusMessage) return;

    elements.statusMessage.textContent = message;
    elements.statusMessage.className = `status-message ${type}`;

    // Auto-clear after 3 seconds
    setTimeout(() => {
        if (elements.statusMessage) {
            elements.statusMessage.textContent = '';
            elements.statusMessage.className = 'status-message';
        }
    }, 3000);
}

function updateQuizUI(isActive) {
    if (elements.flipBtn) {
        elements.flipBtn.disabled = !isActive;
    }

    if (elements.resetBtn) {
        elements.resetBtn.disabled = !isActive;
    }

    if (elements.startBtn) {
        elements.startBtn.disabled = isActive;
    }

    updateNavButtons();
}

function updateNavButtons() {
    if (!appState.isQuizStarted) {
        if (elements.prevBtn) elements.prevBtn.disabled = true;
        if (elements.nextBtn) elements.nextBtn.disabled = true;
        return;
    }

    if (elements.prevBtn) {
        elements.prevBtn.disabled = appState.currentCardIndex === 0;
    }

    if (elements.nextBtn) {
        elements.nextBtn.disabled = appState.currentCardIndex === appState.currentDeck.length - 1;
    }
}

function updateStats() {
    if (elements.currentCard) {
        elements.currentCard.textContent = appState.isQuizStarted ? appState.currentCardIndex + 1 : 0;
    }

    if (elements.totalCards) {
        elements.totalCards.textContent = appState.currentDeck.length;
    }

    if (elements.progressFill) {
        const progress = appState.getProgress();
        elements.progressFill.style.width = (appState.isQuizStarted ? progress : 0) + '%';
    }
}

function updateThemeToggle() {
  if (elements.themeToggle) {
    const isDark = appState.darkMode;
    elements.themeToggle.setAttribute('aria-pressed', isDark);
    
    if (elements.themeIcon) {
      elements.themeIcon.textContent = isDark ? '🌙' : '☀️';
    }
  }
}
function announceCard(card) {
    if (!card) return;

    const announcement = appState.isFlipped 
        ? `Answer: ${card.answer}`
        : `Question: ${card.question}. Card ${appState.currentCardIndex + 1} of ${appState.currentDeck.length}`;

    if (elements.statusMessage) {
        elements.statusMessage.textContent = announcement;
    }
}
    /* ========================================
       9. INITIALIZATION FUNCTIONS
       ======================================== */

    function initTheme() {
        const savedTheme = localStorage.getItem('bmw-flashcard-theme');
        if (savedTheme === 'dark') {
            appState.darkMode = true;
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        updateThemeToggle();
    }

    function init() {
        // Initialize DOM element references
        elements.init();

        // Setup all event listeners
        setupEventListeners();

        // Initialize theme from localStorage
        initTheme();

        // Update stats display
        updateStats();
    }

    /* ========================================
       10. APP STARTUP
       ======================================== */

    // Initialize app when DOM is loaded
    document.addEventListener('DOMContentLoaded', init);
