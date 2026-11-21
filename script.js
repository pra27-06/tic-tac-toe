/**
 * 👶 ZERO KATA • CUTE BABIES EDITION 🍼
 * Pure Vanilla JavaScript implementation with Adorable Baby Vector Graphics,
 * Web Audio FX, Minimax AI, Canvas Confetti, and SVG Win-Line strike.
 */

(() => {
  'use strict';

  // --- Cute Baby Zero Kata Color Themes ---
  const PALETTES = [
    {
      id: 'baby-girl-boy',
      name: 'Baby Girl & Boy',
      p1: {
        label: 'Baby Kata',
        name: 'Baby Kata',
        color: '#ff6584',
        grad: ['#ff7597', '#ff5277'],
        blush: '#ff7597'
      },
      p2: {
        label: 'Baby Zero',
        name: 'Baby Zero',
        botName: 'Baby Bot',
        color: '#0284c7',
        grad: ['#38bdf8', '#0284c7'],
        blush: '#ff7675'
      }
    },
    {
      id: 'teddy-duckling',
      name: 'Teddy & Duckling',
      p1: {
        label: 'Teddy Kata',
        name: 'Teddy Kata',
        color: '#c27803',
        grad: ['#e59819', '#b45309'],
        blush: '#f87171'
      },
      p2: {
        label: 'Duckling Zero',
        name: 'Duckling Zero',
        botName: 'Baby Bot',
        color: '#eab308',
        grad: ['#fde047', '#eab308'],
        blush: '#fb7185'
      }
    },
    {
      id: 'baby-bunny-kitty',
      name: 'Bunny & Kitty',
      p1: {
        label: 'Baby Bunny',
        name: 'Baby Bunny',
        color: '#f43f5e',
        grad: ['#fb7185', '#e11d48'],
        blush: '#fb7185'
      },
      p2: {
        label: 'Baby Kitty',
        name: 'Baby Kitty',
        botName: 'Kitty Bot',
        color: '#8b5cf6',
        grad: ['#a78bfa', '#7c3aed'],
        blush: '#f472b6'
      }
    },
    {
      id: 'pacifier-rattle',
      name: 'Pacifier & Rattle',
      p1: {
        label: 'Pacifier Kata',
        name: 'Pacifier Kata',
        color: '#ec4899',
        grad: ['#f472b6', '#db2777'],
        blush: '#fb7185'
      },
      p2: {
        label: 'Rattle Zero',
        name: 'Rattle Zero',
        botName: 'Rattle Bot',
        color: '#10b981',
        grad: ['#34d399', '#059669'],
        blush: '#f87171'
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

  // --- SVG Kawaii Cute Baby Graphics Generators for Kata & Zero ---
  function getCuteBabyKataSvg(palette, idSuffix = 'main') {
    const grad = palette.p1.grad;
    const blush = palette.p1.blush;
    const gradId = `kataBabyGrad_${idSuffix}`;
    const shadowId = `kShadow_${idSuffix}`;

    return `
      <svg class="mark-svg mark-kata" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${grad[0]}" />
            <stop offset="100%" stop-color="${grad[1]}" />
          </linearGradient>
          <filter id="${shadowId}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="${grad[1]}" flood-opacity="0.32"/>
          </filter>
        </defs>
        <!-- Soft Rounded Diagonal Strokes of Kata -->
        <line x1="22" y1="22" x2="78" y2="78" stroke="url(#${gradId})" stroke-width="17" stroke-linecap="round" filter="url(#${shadowId})" />
        <line x1="78" y1="22" x2="22" y2="78" stroke="url(#${gradId})" stroke-width="17" stroke-linecap="round" filter="url(#${shadowId})" />
        
        <!-- Cute Baby Face in Center -->
        <circle cx="50" cy="50" r="19" fill="#fff6ec" filter="url(#${shadowId})" />
        <!-- Baby Hair Curl -->
        <path d="M 50 31 Q 54 26 48 24 Q 45 28 50 31" fill="#c48a56" />
        <!-- Big Shiny Baby Eyes -->
        <circle cx="43" cy="48" r="3" fill="#373244" />
        <circle cx="57" cy="48" r="3" fill="#373244" />
        <!-- Sparkles in Eyes -->
        <circle cx="42" cy="46.5" r="1.2" fill="#ffffff" />
        <circle cx="56" cy="46.5" r="1.2" fill="#ffffff" />
        <circle cx="44.2" cy="49" r="0.6" fill="#ffffff" />
        <circle cx="58.2" cy="49" r="0.6" fill="#ffffff" />
        <!-- Chubby Rosy Cheeks -->
        <ellipse cx="38" cy="53" rx="3.5" ry="2" fill="${blush}" opacity="0.85" />
        <ellipse cx="62" cy="53" rx="3.5" ry="2" fill="${blush}" opacity="0.85" />
        <!-- Cute Baby Pacifier (Chupie) -->
        <ellipse cx="50" cy="56" rx="5.5" ry="4" fill="${grad[0]}" />
        <circle cx="50" cy="56" r="2.2" fill="#ffffff" />
        <path d="M 47 59 Q 50 64 53 59" stroke="${grad[0]}" stroke-width="2" fill="none" stroke-linecap="round" />
        <!-- Sparkle Accent -->
        <path d="M 75 16 Q 78 21 83 22 Q 78 23 75 28 Q 74 23 69 22 Q 74 21 75 16 Z" fill="#fff375" opacity="0.9" />
      </svg>
    `;
  }

  function getCuteBabyZeroSvg(palette, idSuffix = 'main') {
    const grad = palette.p2.grad;
    const blush = palette.p2.blush;
    const gradId = `zeroBabyGrad_${idSuffix}`;
    const shadowId = `zShadow_${idSuffix}`;

    return `
      <svg class="mark-svg mark-zero" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${grad[0]}" />
            <stop offset="100%" stop-color="${grad[1]}" />
          </linearGradient>
          <filter id="${shadowId}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="${grad[1]}" flood-opacity="0.32"/>
          </filter>
        </defs>
        <!-- Plump Round Donut Ring of Zero -->
        <circle cx="50" cy="50" r="32" stroke="url(#${gradId})" stroke-width="16" fill="none" filter="url(#${shadowId})" />
        
        <!-- Baby Cap / Bonnet on Top of Zero -->
        <path d="M 36 21 Q 50 11 64 21 Q 50 17 36 21 Z" fill="${grad[0]}" />
        <circle cx="50" cy="12" r="3.5" fill="#fde047" />

        <!-- Cute Baby Face in Center -->
        <circle cx="50" cy="50" r="19" fill="#fff6ec" filter="url(#${shadowId})" />
        <!-- Baby Hair Curl -->
        <path d="M 50 31 Q 46 26 52 24 Q 55 28 50 31" fill="#c48a56" />
        <!-- Big Shiny Baby Eyes -->
        <circle cx="43" cy="48" r="3" fill="#373244" />
        <circle cx="57" cy="48" r="3" fill="#373244" />
        <!-- Sparkles in Eyes -->
        <circle cx="42" cy="46.5" r="1.2" fill="#ffffff" />
        <circle cx="56" cy="46.5" r="1.2" fill="#ffffff" />
        <circle cx="44.2" cy="49" r="0.6" fill="#ffffff" />
        <circle cx="58.2" cy="49" r="0.6" fill="#ffffff" />
        <!-- Chubby Rosy Cheeks -->
        <ellipse cx="38" cy="53" rx="3.5" ry="2" fill="${blush}" opacity="0.85" />
        <ellipse cx="62" cy="53" rx="3.5" ry="2" fill="${blush}" opacity="0.85" />
        <!-- Sweet Baby Pacifier (Chupie) -->
        <ellipse cx="50" cy="56" rx="5.5" ry="4" fill="${grad[0]}" />
        <circle cx="50" cy="56" r="2.2" fill="#ffffff" />
        <path d="M 47 59 Q 50 64 53 59" stroke="${grad[0]}" stroke-width="2" fill="none" stroke-linecap="round" />
        <!-- Sparkle Accent -->
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
        // Cheerful nursery music box arpeggio: C5, E5, G5, C6
        const notes = [523.25, 659.25, 783.99, 1046.50];
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
        const notes = [440, 392, 349.23]; // Soft sweet sigh chords
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
      this.colors = ['#ff7597', '#38bdf8', '#fde047', '#a7f3d0', '#c084fc', '#fb7185'];
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
      this.currentTurn = 'p1'; // 'p1' (Baby Kata) or 'p2' (Baby Zero)
      this.gameMode = 'pve'; // 'pve' (vs Baby Bot) or 'pvp' (2 players)
      this.difficulty = 'medium'; // 'easy' (Crawling), 'medium' (Babbling), 'hard' (Genius)
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
      const savedPalette = localStorage.getItem('zerokata_baby_palette');
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
        const stored = localStorage.getItem('zerokata_baby_scores');
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
        localStorage.setItem('zerokata_baby_scores', JSON.stringify(this.scores));
      } catch (e) {
        console.warn('Could not save scores:', e);
      }
    }

    initEvents() {
      // Cell clicks
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
        localStorage.setItem('zerokata_baby_palette', this.paletteIndex);
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

      // Update Card 1 (Baby Kata)
      this.dom.nameP1.textContent = p.p1.name;
      this.dom.iconP1.innerHTML = getCuteBabyKataSvg(p, 'icon_p1');

      // Update Card 2 (Baby Zero or Baby Bot)
      if (this.gameMode === 'pve') {
        this.dom.nameP2.textContent = p.p2.botName;
        this.dom.iconP2.innerHTML = getCuteBabyZeroSvg(p, 'icon_p2');
      } else {
        this.dom.nameP2.textContent = p.p2.name;
        this.dom.iconP2.innerHTML = getCuteBabyZeroSvg(p, 'icon_p2');
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
        this.dom.statusAvatar.innerHTML = '👶';
        this.dom.statusText.textContent = `${p.p1.name}'s turn! Tap an empty tile~`;
      } else {
        if (this.gameMode === 'pve') {
          this.dom.statusAvatar.innerHTML = '🤖';
          this.dom.statusText.textContent = `${p.p2.botName} is babbling happily... ✨`;
        } else {
          this.dom.statusAvatar.innerHTML = '🍼';
          this.dom.statusText.textContent = `${p.p2.name}'s turn! Make a cozy move~`;
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

      // Cute pop sound: higher pitch for Baby Kata, deeper pop for Baby Zero
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
        markDiv.innerHTML = getCuteBabyKataSvg(p, `cell_${index}`);
      } else {
        markDiv.innerHTML = getCuteBabyZeroSvg(p, `cell_${index}`);
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
      this.dom.statusAvatar.innerHTML = '🍼';
      this.dom.statusText.textContent = "It's a cozy tie! You both played so sweetly!";

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
        avatarHtml = getCuteBabyKataSvg(p, 'modal_win');
        title = `Yay! ${p.p1.name} Won!`;
        message = this.gameMode === 'pve'
          ? "You outsmarted the cute Baby Bot! So adorable! 💖"
          : `Sensational victory! Congratulations ${p.p1.name}! 🎉`;
      } else {
        if (this.gameMode === 'pve') {
          avatarHtml = getCuteBabyZeroSvg(p, 'modal_win');
          title = `Giggle! Baby Bot Won!`;
          message = "The cute Baby Bot got super lucky! Want another snuggly round? 🌸";
        } else {
          avatarHtml = getCuteBabyZeroSvg(p, 'modal_win');
          title = `Hooray! ${p.p2.name} Won!`;
          message = `Sensational victory! Beautifully played ${p.p2.name}! 🎈`;
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
      this.dom.modalAvatar.innerHTML = '🍼';
      this.dom.modalTitle.textContent = "It's a Cozy Tie!";
      this.dom.modalMessage.textContent = "Two sweet little babies matched each other move for move! 🎀";
      this.dom.modalStreakBadge.style.display = 'none';

      this.dom.victoryModal.classList.add('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'false');
    }

    closeVictoryModal() {
      this.dom.victoryModal.classList.remove('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'true');
    }

    // --- Cute Baby AI Engine ---
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

      // 🌸 1. Crawling Mode: Playful and cute
      if (this.difficulty === 'easy') {
        if (Math.random() < 0.25) {
          const winMove = this.findWinningMove(this.boardState, 'p2');
          if (winMove !== -1) return winMove;
        }
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }

      // ⚡ 2. Babbling Mode: Smart but beatable
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

      // 👑 3. Baby Genius: Perfect Unbeatable Minimax Algorithm
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
