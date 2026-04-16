// BMW Flashcard App - Theme Management

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.htmlElement = document.documentElement;
        this.storageKey = 'bmw-flashcard-theme';
        
        this.init();
    }

    init() {
        // Load saved theme preference
        const savedTheme = localStorage.getItem(this.storageKey) || 'light';
        this.setTheme(savedTheme);
        
        // Attach event listeners
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches && !localStorage.getItem(this.storageKey)) {
                this.setTheme('dark');
            } else if (!e.matches && !localStorage.getItem(this.storageKey)) {
                this.setTheme('light');
            }
        });
    }

    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        
        if (this.themeToggle) {
            const isDark = theme === 'dark';
            this.themeToggle.setAttribute('aria-pressed', isDark);
            
            const icon = this.themeToggle.querySelector('.theme-icon');
            if (icon) {
            }                icon.textContent = ' : 'isDark ? '
        }
        
        localStorage.setItem(this.storageKey, theme);
    }
}

// Flashcard Management
class FlashcardApp {
    constructor() {
        this.currentCardIndex = 0;
        this.cards = [
            { id: 1, question: 'What is the engine block called in German?', answer: 'Motorblock', category: 'engine' },
            { id: 2, question: 'What is the transmission in German?', answer: 'Getriebe', category: 'engine' },
            { id: 3, question: 'What is the chassis in German?', answer: 'Fahrgestell', category: 'chassis' },
            { id: 4, question: 'What is the steering wheel in German?', answer: 'Lenkrad', category: 'interior' },
            { id: 5, question: 'What is the battery in German?', answer: 'Batterie', category: 'electrical' },
            { id: 6, question: 'What is the hood in German?', answer: 'Motorhaube', category: 'exterior' },
        ];
        this.filteredCards = [...this.cards];
        this.currentCategory = 'all';
        this.quizStarted = false;
        this.isFlipped = false;
        
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.updateStats();
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
        this.quizStarted = true;
        this.currentCardIndex = 0;
        this.isFlipped = false;
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('flipBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('prevBtn').disabled = this.currentCardIndex === 0;
        document.getElementById('nextBtn').disabled = this.currentCardIndex === this.filteredCards.length - 1;
        
        this.updateCardDisplay();
        this.showStatus('Quiz started! Click flip to reveal answers.');
    }

    flipCard() {
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.toggle('flipped');
            this.isFlipped = !this.isFlipped;
        }
    }

    nextCard() {
        if (this.currentCardIndex < this.filteredCards.length - 1) {
            this.currentCardIndex++;
            this.isFlipped = false;
            this.updateCardDisplay();
            this.updateNavigationButtons();
        }
    }

    previousCard() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            this.isFlipped = false;
            this.updateCardDisplay();
            this.updateNavigationButtons();
        }
    }

    updateCardDisplay() {
        const card = this.filteredCards[this.currentCardIndex];
        if (!card) return;
        
        document.getElementById('cardQuestion').textContent = card.question;
        document.getElementById('cardAnswer').textContent = card.answer;
        
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.remove('flipped');
        }
        
        this.updateStats();
    }

    updateStats() {
        document.getElementById('currentCard').textContent = this.quizStarted ? this.currentCardIndex + 1 : 1;
        document.getElementById('totalCards').textContent = this.filteredCards.length;
        
        const progress = this.quizStarted ? ((this.currentCardIndex + 1) / this.filteredCards.length) * 100 : 0;
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }

    updateNavigationButtons() {
        document.getElementById('prevBtn').disabled = this.currentCardIndex === 0;
        document.getElementById('nextBtn').disabled = this.currentCardIndex === this.filteredCards.length - 1;
    }

    selectCategory(btn) {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.currentCategory = btn.dataset.category;
        
        if (this.currentCategory === 'all') {
            this.filteredCards = [...this.cards];
        } else {
            this.filteredCards = this.cards.filter(card => card.category === this.currentCategory);
        }
        
        this.currentCardIndex = 0;
        this.isFlipped = false;
        this.updateStats();
        this.updateCardDisplay();
        this.showStatus(`Showing ${this.filteredCards.length} cards from ${btn.textContent}`);
    }

    resetQuiz() {
        this.quizStarted = false;
        this.currentCardIndex = 0;
        this.isFlipped = false;
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('flipBtn').disabled = true;
        document.getElementById('resetBtn').disabled = true;
        document.getElementById('prevBtn').disabled = true;
        document.getElementById('nextBtn').disabled = true;
        
        document.getElementById('cardQuestion').textContent = 'What is the engine block called in German?';
        document.getElementById('cardAnswer').textContent = 'Motorblock';
        
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.classList.remove('flipped');
        }
        
        this.updateStats();
        this.showStatus('Quiz reset. Click "Start Quiz" to begin!');
    }

    handleKeyboard(e) {
        if (!this.quizStarted) return;
        
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
            statusDiv.classList.remove('error');
            statusDiv.classList.add('success');
            
            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.classList.remove('success');
            }, 3000);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new FlashcardApp();
});
