/**
 * 🌸 ZERO KATA • KAWAII PASTEL EDITION 🎀
 * Pure Vanilla JavaScript implementation with Custom Kawaii Vector Graphics,
 * Web Audio FX, Minimax AI, Canvas Confetti, and SVG Win-Line strike.
 */

(() => {
  'use strict';

  // --- Cute Zero Kata Color Palettes ---
  const PALETTES = [
    {
      id: 'sakura-sky',
      name: 'Sakura & Sky',
      p1: {
        label: 'Kata',
        name: 'Kata',
        color: '#ff6584',
        grad: ['#ff7597', '#ff5277'],
        blush: '#ff7597'
      },
      p2: {
        label: 'Zero',
        name: 'Zero',
        botName: 'Cute Bot',
        color: '#0984e3',
        grad: ['#4facfe', '#00c6ff'],
        blush: '#ff7675'
      }
    },
    {
      id: 'bubblegum-mint',
      name: 'Bubblegum & Mint',
      p1: {
        label: 'Kata',
        name: 'Kata',
        color: '#9b51e0',
        grad: ['#b388ff', '#7c4dff'],
        blush: '#ea80fc'
      },
      p2: {
        label: 'Zero',
        name: 'Zero',
        botName: 'Cute Bot',
        color: '#10b981',
        grad: ['#34d399', '#059669'],
        blush: '#f87171'
      }
    },
    {
      id: 'peach-lavender',
      name: 'Peach & Lavender',
      p1: {
        label: 'Kata',
        name: 'Kata',
        color: '#ff7675',
        grad: ['#ff9999', '#ff5252'],
        blush: '#ff7675'
      },
      p2: {
        label: 'Zero',
        name: 'Zero',
        botName: 'Cute Bot',
        color: '#6c5ce7',
        grad: ['#a29bfe', '#6c5ce7'],
        blush: '#fd79a8'
      }
    },
    {
      id: 'sunny-berry',
      name: 'Sunny & Berry',
      p1: {
        label: 'Kata',
        name: 'Kata',
        color: '#e84393',
        grad: ['#fd79a8', '#e84393'],
        blush: '#ff7675'
      },
      p2: {
        label: 'Zero',
        name: 'Zero',
        botName: 'Cute Bot',
        color: '#f59e0b',
        grad: ['#fcd34d', '#f59e0b'],
        blush: '#ff7675'
      }
    }
  ];

  // Winning 3-in-a-row combinations
  const WINNING_COMBOS = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Col 1
    [1, 4, 7], // Col 2
    [2, 5, 8], // Col 3
    [0, 4, 8], // Diag 1
    [2, 4, 6]  // Diag 2
  ];

  // --- SVG Kawaii Graphics Generators for Kata & Zero ---
  function getCuteKataSvg(grad, blush, idSuffix = 'main') {
    const gradId = `kataGrad_${idSuffix}`;
    return `
      <svg class="mark-svg mark-kata" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${grad[0]}" />
            <stop offset="100%" stop-color="${grad[1]}" />
          </linearGradient>
          <filter id="kShadow_${idSuffix}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="${grad[1]}" flood-opacity="0.32"/>
          </filter>
        </defs>
        <!-- Soft Rounded Diagonal Strokes of Kata -->
        <line x1="22" y1="22" x2="78" y2="78" stroke="url(#${gradId})" stroke-width="17" stroke-linecap="round" filter="url(#kShadow_${idSuffix})" />
        <line x1="78" y1="22" x2="22" y2="78" stroke="url(#${gradId})" stroke-width="17" stroke-linecap="round" filter="url(#kShadow_${idSuffix})" />
        
        <!-- Center Kawaii Face Circle -->
        <circle cx="50" cy="50" r="18" fill="#ffffff" filter="url(#kShadow_${idSuffix})" />
        <!-- Happy Eyes -->
        <circle cx="43.5" cy="48" r="2.6" fill="#373244" />
        <circle cx="56.5" cy="48" r="2.6" fill="#373244" />
        <!-- Eye Sparkles -->
        <circle cx="42.5" cy="46.8" r="1" fill="#ffffff" />
        <circle cx="55.5" cy="46.8" r="1" fill="#ffffff" />
        <!-- Rosy Blush Cheeks -->
        <ellipse cx="39" cy="53" rx="2.8" ry="1.5" fill="${blush}" opacity="0.85" />
        <ellipse cx="61" cy="53" rx="2.8" ry="1.5" fill="${blush}" opacity="0.85" />
        <!-- Sweet Smile -->
        <path d="M 46.5 52 Q 50 56.5 53.5 52" stroke="#373244" stroke-width="2" stroke-linecap="round" fill="none" />
        <!-- Little Sparkle on Tip -->
        <path d="M 74 16 Q 77 21 82 22 Q 77 23 74 28 Q 73 23 68 22 Q 73 21 74 16 Z" fill="#fff375" opacity="0.9" />
      </svg>
    `;
  }

  function getCuteZeroSvg(grad, blush, idSuffix = 'main') {
    const gradId = `zeroGrad_${idSuffix}`;
    return `
      <svg class="mark-svg mark-zero" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${grad[0]}" />
            <stop offset="100%" stop-color="${grad[1]}" />
          </linearGradient>
          <filter id="zShadow_${idSuffix}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="${grad[1]}" flood-opacity="0.32"/>
          </filter>
        </defs>
        <!-- Plump Round Donut of Zero -->
        <circle cx="50" cy="50" r="32" stroke="url(#${gradId})" stroke-width="16" fill="none" filter="url(#zShadow_${idSuffix})" />
        
        <!-- Cute Little Ribbon Bow on Top -->
        <path d="M 42 12 Q 50 17 50 19 Q 50 17 58 12 Q 55 21 50 19 Q 45 21 42 12 Z" fill="#ff7597" />
        <circle cx="50" cy="18" r="2.8" fill="#ffe4eb" />

        <!-- Center Kawaii Face Circle -->
        <circle cx="50" cy="50" r="18" fill="#ffffff" filter="url(#zShadow_${idSuffix})" />
        <!-- Happy Eyes -->
        <circle cx="43.5" cy="48" r="2.6" fill="#373244" />
        <circle cx="56.5" cy="48" r="2.6" fill="#373244" />
        <!-- Eye Sparkles -->
        <circle cx="42.5" cy="46.8" r="1" fill="#ffffff" />
        <circle cx="55.5" cy="46.8" r="1" fill="#ffffff" />
        <!-- Rosy Blush Cheeks -->
        <ellipse cx="39" cy="53" rx="2.8" ry="1.5" fill="${blush}" opacity="0.85" />
        <ellipse cx="61" cy="53" rx="2.8" ry="1.5" fill="${blush}" opacity="0.85" />
        <!-- Sweet Smile -->
        <path d="M 46.5 52 Q 50 56.5 53.5 52" stroke="#373244" stroke-width="2" stroke-linecap="round" fill="none" />
        <!-- Little Sparkle on Side -->
        <path d="M 80 44 Q 82 48 86 49 Q 82 50 80 54 Q 79 50 75 49 Q 79 48 80 44 Z" fill="#fff375" opacity="0.9" />
      </svg>
    `;
  }

  // --- Sound Synthesizer (Web Audio API) ---
  class SoundController {
    constructor() {
      this.enabled = localStorage.getItem('kawaii_sound_enabled') !== 'false';
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('kawaii_sound_enabled', this.enabled);
      return this.enabled;
    }

    playPop(frequency = 540) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.45, now + 0.12);

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.13);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }

    playWin() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 joyful arpeggio
        notes.forEach((freq, idx) => {
          const startTime = this.ctx.currentTime + idx * 0.09;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.25, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 0.36);
        });
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }

    playDraw() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const notes = [440, 392, 349.23]; // Cute sigh chords
        notes.forEach((freq, idx) => {
          const startTime = this.ctx.currentTime + idx * 0.11;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.2, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 0.29);
        });
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }
  }

  // --- Confetti Particle System ---
  class ConfettiEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationFrame = null;
      this.colors = ['#ff7597', '#4facfe', '#ffe082', '#a7f3d0', '#b39ddb', '#ff9ff3'];
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst(count = 75) {
      this.resize();
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: this.canvas.width * (0.2 + Math.random() * 0.6),
          y: this.canvas.height * 0.4,
          vx: (Math.random() - 0.5) * 14,
          vy: -Math.random() * 12 - 4,
          size: Math.random() * 9 + 5,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          shape: Math.random() > 0.4 ? 'circle' : 'rect',
          alpha: 1,
          decay: Math.random() * 0.012 + 0.008
        });
      }

      if (!this.animationFrame) {
        this.loop();
      }
    }

    loop() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > this.canvas.height) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        } else {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animationFrame = requestAnimationFrame(() => this.loop());
      } else {
        this.animationFrame = null;
      }
    }
  }

  // --- Main ZERO KATA Game Controller ---
  class ZeroKataGame {
    constructor() {
      this.boardState = Array(9).fill(null);
      this.currentTurn = 'p1'; // 'p1' (Kata) or 'p2' (Zero)
      this.gameMode = 'pve'; // 'pve' (vs Cute Machine) or 'pvp' (2 players)
      this.difficulty = 'medium'; // 'easy', 'medium', 'hard' (genius)
      this.firstTurnPref = 'p1'; // 'p1', 'p2', or 'random'
      this.isGameOver = false;
      this.isAiThinking = false;
      this.history = [];
      this.paletteIndex = 0;
      this.streak = 0;
      this.streakWinner = null;

      this.scores = this.loadScores();
      this.sound = new SoundController();
      this.confetti = new ConfettiEngine(document.getElementById('confetti-canvas'));

      // DOM Elements Cache
      this.dom = {
        board: document.getElementById('board'),
        cells: Array.from(document.querySelectorAll('.cell')),
        winLineSvg: document.getElementById('win-line-svg'),
        winLine: document.getElementById('win-line'),

        modePve: document.getElementById('mode-pve'),
        modePvp: document.getElementById('mode-pvp'),
        aiControls: document.getElementById('ai-controls'),
        diffButtons: document.querySelectorAll('.diff-btn'),
        turnButtons: document.querySelectorAll('.turn-choice-btn'),

        cardP1: document.getElementById('card-p1'),
        cardP2: document.getElementById('card-p2'),
        avatarP1: document.getElementById('avatar-p1'),
        avatarP2: document.getElementById('avatar-p2'),
        nameP1: document.getElementById('name-p1'),
        nameP2: document.getElementById('name-p2'),
        iconP1: document.getElementById('icon-p1'),
        iconP2: document.getElementById('icon-p2'),
        scoreP1: document.getElementById('score-p1'),
        scoreP2: document.getElementById('score-p2'),
        scoreDraw: document.getElementById('score-draw'),

        turnBanner: document.getElementById('turn-banner'),
        statusAvatar: document.getElementById('status-avatar'),
        statusText: document.getElementById('status-text'),

        themeBtn: document.getElementById('theme-btn'),
        themeLabel: document.getElementById('theme-label'),
        soundBtn: document.getElementById('sound-btn'),
        soundIcon: document.getElementById('sound-icon'),
        helpBtn: document.getElementById('help-btn'),

        restartRoundBtn: document.getElementById('restart-round-btn'),
        undoBtn: document.getElementById('undo-btn'),
        resetScoreBtn: document.getElementById('reset-score-btn'),

        victoryModal: document.getElementById('victory-modal'),
        modalAvatar: document.getElementById('modal-avatar'),
        modalTitle: document.getElementById('modal-title'),
        modalMessage: document.getElementById('modal-message'),
        modalStreakBadge: document.getElementById('modal-streak-badge'),
        modalStreakText: document.getElementById('modal-streak-text'),
        modalPlayAgainBtn: document.getElementById('modal-play-again-btn'),
        modalCloseBtn: document.getElementById('modal-close-btn'),

        helpModal: document.getElementById('help-modal'),
        helpCloseX: document.getElementById('help-close-x'),
        helpOkBtn: document.getElementById('help-ok-btn')
      };

      // Load saved palette
      const savedPalette = localStorage.getItem('zerokata_palette');
      if (savedPalette !== null) {
        this.paletteIndex = parseInt(savedPalette, 10) % PALETTES.length;
      }

      this.initEvents();
      this.applyPalette();
      this.updateScoreboard();
      this.resetRound(true);
      this.updateSoundButton();
    }

    get currentPalette() {
      return PALETTES[this.paletteIndex];
    }

    loadScores() {
      try {
        const stored = localStorage.getItem('zerokata_scores');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Could not parse scores:', e);
      }
      return { p1: 0, p2: 0, draw: 0 };
    }

    saveScores() {
      try {
        localStorage.setItem('zerokata_scores', JSON.stringify(this.scores));
      } catch (e) {
        console.warn('Could not save scores:', e);
      }
    }

    initEvents() {
      // Cell clicks & keyboard access
      this.dom.cells.forEach(cell => {
        cell.addEventListener('click', (e) => this.handleCellClick(e));
        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleCellClick(e);
          }
        });
      });

      // Mode Selection
      this.dom.modePve.addEventListener('click', () => this.switchMode('pve'));
      this.dom.modePvp.addEventListener('click', () => this.switchMode('pvp'));

      // AI Difficulty Selection
      this.dom.diffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.dom.diffButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.difficulty = btn.dataset.diff;
          this.sound.playClick();
        });
      });

      // First Turn Selection
      this.dom.turnButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.dom.turnButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.firstTurnPref = btn.dataset.turn;
          this.sound.playClick();
          this.resetRound(false);
        });
      });

      // Palette toggle
      this.dom.themeBtn.addEventListener('click', () => {
        this.paletteIndex = (this.paletteIndex + 1) % PALETTES.length;
        localStorage.setItem('zerokata_palette', this.paletteIndex);
        this.sound.playClick();
        this.applyPalette();
        this.renderBoard();
        this.updateStatusBanner();
      });

      // Sound toggle
      this.dom.soundBtn.addEventListener('click', () => {
        const enabled = this.sound.toggle();
        this.updateSoundButton();
        if (enabled) this.sound.playClick();
      });

      // Actions buttons
      this.dom.restartRoundBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.resetRound(false);
      });

      this.dom.undoBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.undoMove();
      });

      this.dom.resetScoreBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.resetScores();
      });

      // Victory Modal actions
      this.dom.modalPlayAgainBtn.addEventListener('click', () => {
        this.closeVictoryModal();
        this.resetRound(false);
      });

      this.dom.modalCloseBtn.addEventListener('click', () => {
        this.closeVictoryModal();
      });

      // Help Modal actions
      this.dom.helpBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.dom.helpModal.classList.add('active');
        this.dom.helpModal.setAttribute('aria-hidden', 'false');
      });

      const closeHelp = () => {
        this.sound.playClick();
        this.dom.helpModal.classList.remove('active');
        this.dom.helpModal.setAttribute('aria-hidden', 'true');
      };

      this.dom.helpCloseX.addEventListener('click', closeHelp);
      this.dom.helpOkBtn.addEventListener('click', closeHelp);
      this.dom.helpModal.addEventListener('click', (e) => {
        if (e.target === this.dom.helpModal) closeHelp();
      });

      // Window resize: recompute SVG winning strike line
      window.addEventListener('resize', () => {
        if (this.winningCombo) {
          this.drawWinningLine(this.winningCombo);
        }
      });
    }

    updateSoundButton() {
      this.dom.soundIcon.textContent = this.sound.enabled ? '🔊' : '🔇';
      this.dom.soundBtn.title = this.sound.enabled ? 'Sound: On' : 'Sound: Off';
    }

    applyPalette() {
      const p = this.currentPalette;
      this.dom.themeLabel.textContent = p.name;

      // Update Card 1 (Kata)
      this.dom.nameP1.textContent = p.p1.name;
      this.dom.iconP1.innerHTML = getCuteKataSvg(p.p1.grad, p.p1.blush, 'icon_p1');

      // Update Card 2 (Zero or Cute Bot)
      if (this.gameMode === 'pve') {
        this.dom.nameP2.textContent = p.p2.botName;
        this.dom.iconP2.innerHTML = getCuteZeroSvg(p.p2.grad, p.p2.blush, 'icon_p2');
      } else {
        this.dom.nameP2.textContent = p.p2.name;
        this.dom.iconP2.innerHTML = getCuteZeroSvg(p.p2.grad, p.p2.blush, 'icon_p2');
      }

      document.documentElement.style.setProperty('--player1-color', p.p1.color);
      document.documentElement.style.setProperty('--player2-color', p.p2.color);
    }

    switchMode(mode) {
      if (this.gameMode === mode) return;
      this.sound.playClick();
      this.gameMode = mode;

      if (mode === 'pve') {
        this.dom.modePve.classList.add('active');
        this.dom.modePvp.classList.remove('active');
        this.dom.aiControls.classList.remove('hidden');
      } else {
        this.dom.modePvp.classList.add('active');
        this.dom.modePve.classList.remove('active');
        this.dom.aiControls.classList.add('hidden');
      }

      this.applyPalette();
      this.resetRound(false);
    }

    resetScores() {
      this.scores = { p1: 0, p2: 0, draw: 0 };
      this.streak = 0;
      this.streakWinner = null;
      this.saveScores();
      this.updateScoreboard();
    }

    updateScoreboard() {
      this.dom.scoreP1.textContent = this.scores.p1;
      this.dom.scoreP2.textContent = this.scores.p2;
      this.dom.scoreDraw.textContent = this.scores.draw;
    }

    resetRound(isInitial = false) {
      this.boardState = Array(9).fill(null);
      this.isGameOver = false;
      this.isAiThinking = false;
      this.winningCombo = null;
      this.history = [];

      // Determine starting player
      if (this.firstTurnPref === 'p1') {
        this.currentTurn = 'p1';
      } else if (this.firstTurnPref === 'p2') {
        this.currentTurn = 'p2';
      } else {
        this.currentTurn = Math.random() < 0.5 ? 'p1' : 'p2';
      }

      // Hide Win Line and clear cell classes
      this.dom.winLineSvg.classList.remove('active');
      this.dom.cells.forEach(cell => {
        cell.innerHTML = '';
        cell.className = 'cell';
        cell.disabled = false;
      });

      this.updateActiveCard();
      this.updateStatusBanner();
      this.updateUndoButton();

      // If AI goes first in PvE
      if (this.gameMode === 'pve' && this.currentTurn === 'p2') {
        this.triggerAiMove(500);
      }
    }

    updateActiveCard() {
      if (this.isGameOver) {
        this.dom.cardP1.classList.remove('active-turn');
        this.dom.cardP2.classList.remove('active-turn');
        return;
      }

      if (this.currentTurn === 'p1') {
        this.dom.cardP1.classList.add('active-turn');
        this.dom.cardP2.classList.remove('active-turn');
      } else {
        this.dom.cardP2.classList.add('active-turn');
        this.dom.cardP1.classList.remove('active-turn');
      }
    }

    updateStatusBanner(customText = null) {
      const p = this.currentPalette;

      if (customText) {
        this.dom.statusText.textContent = customText;
        return;
      }

      if (this.isGameOver) return;

      if (this.currentTurn === 'p1') {
        this.dom.statusAvatar.innerHTML = '🌸';
        this.dom.statusText.textContent = "Kata's turn! Tap an empty tile~";
      } else {
        if (this.gameMode === 'pve') {
          this.dom.statusAvatar.innerHTML = '🤖';
          this.dom.statusText.textContent = `${p.p2.botName} is thinking super hard... ✨`;
        } else {
          this.dom.statusAvatar.innerHTML = '🎀';
          this.dom.statusText.textContent = "Zero's turn! Make your move~";
        }
      }
    }

    updateUndoButton() {
      this.dom.undoBtn.disabled = this.history.length === 0 || this.isAiThinking;
    }

    handleCellClick(e) {
      if (this.isGameOver || this.isAiThinking) return;

      const cell = e.currentTarget;
      const index = parseInt(cell.dataset.index, 10);

      if (this.boardState[index] !== null) return;

      // In PvE mode, user plays as Kata (p1)
      if (this.gameMode === 'pve' && this.currentTurn !== 'p1') return;

      this.executeMove(index, this.currentTurn);
    }

    executeMove(index, player) {
      // Save history snapshot for undo
      this.history.push({
        board: [...this.boardState],
        turn: this.currentTurn
      });

      this.boardState[index] = player;
      this.renderCell(index, player);

      // Cute pop sound
      this.sound.playPop(player === 'p1' ? 560 : 440);

      // Check win or tie
      const win = this.checkWin(this.boardState);
      if (win) {
        this.handleGameWin(win);
        return;
      }

      if (this.checkTie(this.boardState)) {
        this.handleGameDraw();
        return;
      }

      // Switch turn
      this.currentTurn = player === 'p1' ? 'p2' : 'p1';
      this.updateActiveCard();
      this.updateStatusBanner();
      this.updateUndoButton();

      // Trigger AI if PvE
      if (this.gameMode === 'pve' && this.currentTurn === 'p2') {
        this.triggerAiMove(420);
      }
    }

    renderCell(index, player) {
      const cell = this.dom.cells[index];
      const p = this.currentPalette;
      cell.classList.add('taken');

      const markDiv = document.createElement('div');
      markDiv.className = 'cell-mark';

      if (player === 'p1') {
        markDiv.innerHTML = getCuteKataSvg(p.p1.grad, p.p1.blush, `cell_${index}`);
      } else {
        markDiv.innerHTML = getCuteZeroSvg(p.p2.grad, p.p2.blush, `cell_${index}`);
      }

      cell.innerHTML = '';
      cell.appendChild(markDiv);
    }

    renderBoard() {
      this.dom.cells.forEach((cell, idx) => {
        cell.innerHTML = '';
        cell.classList.remove('taken');
        const player = this.boardState[idx];
        if (player) {
          this.renderCell(idx, player);
        }
      });
    }

    undoMove() {
      if (this.history.length === 0 || this.isAiThinking) return;

      if (this.gameMode === 'pve') {
        let snapshot = null;
        while (this.history.length > 0) {
          snapshot = this.history.pop();
          if (snapshot.turn === 'p1') break;
        }
        if (snapshot) {
          this.boardState = snapshot.board;
          this.currentTurn = 'p1';
        }
      } else {
        const snapshot = this.history.pop();
        if (snapshot) {
          this.boardState = snapshot.board;
          this.currentTurn = snapshot.turn;
        }
      }

      this.isGameOver = false;
      this.winningCombo = null;
      this.dom.winLineSvg.classList.remove('active');
      this.dom.cells.forEach(c => {
        c.classList.remove('win-cell');
        c.disabled = false;
      });

      this.renderBoard();
      this.updateActiveCard();
      this.updateStatusBanner();
      this.updateUndoButton();
    }

    checkWin(board) {
      for (const combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return { player: board[a], combo };
        }
      }
      return null;
    }

    checkTie(board) {
      return board.every(cell => cell !== null);
    }

    handleGameWin(win) {
      this.isGameOver = true;
      this.winningCombo = win.combo;

      // Highlight winning cells
      win.combo.forEach(idx => {
        this.dom.cells[idx].classList.add('win-cell');
      });

      // Draw SVG strike line
      this.drawWinningLine(win.combo);

      // Disable remaining cells
      this.dom.cells.forEach(c => c.disabled = true);

      // Update Scores & Streaks
      if (win.player === 'p1') {
        this.scores.p1++;
        if (this.streakWinner === 'p1') {
          this.streak++;
        } else {
          this.streak = 1;
          this.streakWinner = 'p1';
        }
      } else {
        this.scores.p2++;
        if (this.streakWinner === 'p2') {
          this.streak++;
        } else {
          this.streak = 1;
          this.streakWinner = 'p2';
        }
      }
      this.saveScores();
      this.updateScoreboard();
      this.updateActiveCard();

      // Sound & Confetti celebration
      this.sound.playWin();
      this.confetti.burst(85);

      // Show Victory Modal
      setTimeout(() => {
        this.openVictoryModal(win.player);
      }, 550);
    }

    handleGameDraw() {
      this.isGameOver = true;
      this.streak = 0;
      this.streakWinner = null;
      this.scores.draw++;
      this.saveScores();
      this.updateScoreboard();
      this.updateActiveCard();

      this.sound.playDraw();
      this.dom.statusAvatar.innerHTML = '🎀';
      this.dom.statusText.textContent = "It's a tie! Both of you played so well!";

      setTimeout(() => {
        this.openDrawModal();
      }, 550);
    }

    drawWinningLine(combo) {
      const boardRect = this.dom.board.getBoundingClientRect();
      const cellA = this.dom.cells[combo[0]].getBoundingClientRect();
      const cellC = this.dom.cells[combo[2]].getBoundingClientRect();

      let x1 = cellA.left + cellA.width / 2 - boardRect.left;
      let y1 = cellA.top + cellA.height / 2 - boardRect.top;
      let x2 = cellC.left + cellC.width / 2 - boardRect.left;
      let y2 = cellC.top + cellC.height / 2 - boardRect.top;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      if (len > 0) {
        const extend = 16;
        x1 -= (dx / len) * extend;
        y1 -= (dy / len) * extend;
        x2 += (dx / len) * extend;
        y2 += (dy / len) * extend;
      }

      this.dom.winLine.setAttribute('x1', x1);
      this.dom.winLine.setAttribute('y1', y1);
      this.dom.winLine.setAttribute('x2', x2);
      this.dom.winLine.setAttribute('y2', y2);

      this.dom.winLineSvg.classList.add('active');
    }

    openVictoryModal(winner) {
      const p = this.currentPalette;
      let avatarHtml, title, message;

      if (winner === 'p1') {
        avatarHtml = getCuteKataSvg(p.p1.grad, p.p1.blush, 'modal_win');
        title = `Yay! Kata Won!`;
        message = this.gameMode === 'pve'
          ? "You outsmarted the cute Bot! Sensational victory! 💖"
          : "Brilliant moves! Congratulations Kata! 🎉";
      } else {
        if (this.gameMode === 'pve') {
          avatarHtml = getCuteZeroSvg(p.p2.grad, p.p2.blush, 'modal_win');
          title = `Beep Boop! Bot Won!`;
          message = "The cute bot was very lucky this time! Ready for a rematch? 🌸";
        } else {
          avatarHtml = getCuteZeroSvg(p.p2.grad, p.p2.blush, 'modal_win');
          title = `Hooray! Zero Won!`;
          message = "Sensational victory! Beautifully played Zero! 🎈";
        }
      }

      this.dom.modalAvatar.innerHTML = avatarHtml;
      this.dom.modalTitle.textContent = title;
      this.dom.modalMessage.textContent = message;

      if (this.streak > 1) {
        this.dom.modalStreakBadge.style.display = 'inline-block';
        this.dom.modalStreakText.textContent = `Win Streak: ${this.streak} in a row! 🔥`;
      } else {
        this.dom.modalStreakBadge.style.display = 'none';
      }

      this.dom.victoryModal.classList.add('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'false');
    }

    openDrawModal() {
      this.dom.modalAvatar.innerHTML = '🤝';
      this.dom.modalTitle.textContent = "It's a Lovely Draw!";
      this.dom.modalMessage.textContent = "Two brilliant minds matched each other move for move! 🎀";
      this.dom.modalStreakBadge.style.display = 'none';

      this.dom.victoryModal.classList.add('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'false');
    }

    closeVictoryModal() {
      this.dom.victoryModal.classList.remove('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'true');
    }

    // --- Cute AI Engine ---
    triggerAiMove(delay = 400) {
      this.isAiThinking = true;
      this.updateUndoButton();
      this.dom.statusAvatar.innerHTML = '🤖';
      this.dom.statusText.textContent = `${this.currentPalette.p2.botName} is thinking super hard... ✨`;

      setTimeout(() => {
        if (this.isGameOver) {
          this.isAiThinking = false;
          return;
        }

        const bestMove = this.computeAiMove();
        this.isAiThinking = false;

        if (bestMove !== -1) {
          this.executeMove(bestMove, 'p2');
        }
      }, delay);
    }

    computeAiMove() {
      const emptyIndices = this.boardState
        .map((val, idx) => (val === null ? idx : null))
        .filter(idx => idx !== null);

      if (emptyIndices.length === 0) return -1;

      // 🌸 1. Easy Mode: Playful and cute
      if (this.difficulty === 'easy') {
        if (Math.random() < 0.25) {
          const winMove = this.findWinningMove(this.boardState, 'p2');
          if (winMove !== -1) return winMove;
        }
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }

      // ⚡ 2. Medium Mode: Smart but beatable
      if (this.difficulty === 'medium') {
        // Take winning move if available
        const winMove = this.findWinningMove(this.boardState, 'p2');
        if (winMove !== -1) return winMove;

        // Block player from winning (82% chance)
        const blockMove = this.findWinningMove(this.boardState, 'p1');
        if (blockMove !== -1 && Math.random() < 0.82) return blockMove;

        // Take center if available
        if (this.boardState[4] === null && Math.random() < 0.6) return 4;

        // Else pick corner or random
        const corners = [0, 2, 6, 8].filter(idx => this.boardState[idx] === null);
        if (corners.length > 0 && Math.random() < 0.5) {
          return corners[Math.floor(Math.random() * corners.length)];
        }

        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }

      // 👑 3. Genius Mode: Perfect Unbeatable Minimax Algorithm
      let bestScore = -Infinity;
      let move = emptyIndices[0];

      if (emptyIndices.length === 9) {
        return [0, 2, 4, 6, 8][Math.floor(Math.random() * 5)];
      }

      for (const idx of emptyIndices) {
        this.boardState[idx] = 'p2';
        const score = this.minimax(this.boardState, 0, false, -Infinity, Infinity);
        this.boardState[idx] = null;

        if (score > bestScore) {
          bestScore = score;
          move = idx;
        }
      }

      return move;
    }

    findWinningMove(board, player) {
      for (const combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        const vals = [board[a], board[b], board[c]];
        const pCount = vals.filter(v => v === player).length;
        const emptyCount = vals.filter(v => v === null).length;

        if (pCount === 2 && emptyCount === 1) {
          if (board[a] === null) return a;
          if (board[b] === null) return b;
          if (board[c] === null) return c;
        }
      }
      return -1;
    }

    minimax(board, depth, isMaximizing, alpha, beta) {
      const win = this.checkWin(board);
      if (win) {
        return win.player === 'p2' ? 10 - depth : depth - 10;
      }
      if (this.checkTie(board)) {
        return 0;
      }

      if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = 'p2';
            const evaluation = this.minimax(board, depth + 1, false, alpha, beta);
            board[i] = null;
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break; // Alpha-beta pruning
          }
        }
        return maxEval;
      } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = 'p1';
            const evaluation = this.minimax(board, depth + 1, true, alpha, beta);
            board[i] = null;
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break; // Alpha-beta pruning
          }
        }
        return minEval;
      }
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.game = new ZeroKataGame();
    });
  } else {
    window.game = new ZeroKataGame();
  }
})();
