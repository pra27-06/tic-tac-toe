/**
 * 🌴 ZERO KATA • GTA VI VICE CITY EDITION ⚡
 * Vanilla JavaScript Engine with Neon Vector Graphics, Retro Synthwave Audio,
 * Kingpin Minimax AI, Neon Confetti, and High-Voltage Laser Strikes.
 */

(() => {
  'use strict';

  // --- GTA VI Vice City Neon Palettes ---
  const PALETTES = [
    {
      id: 'vice-sunset',
      name: 'Vice City Sunset',
      p1: {
        label: 'KATA',
        name: 'KATA',
        color: '#ff007f',
        grad: ['#ff007f', '#ff5277'],
        glow: 'rgba(255, 0, 127, 0.75)'
      },
      p2: {
        label: 'ZERO',
        name: 'ZERO',
        botName: 'VICE AI',
        color: '#00f0ff',
        grad: ['#00f0ff', '#00a8ff'],
        glow: 'rgba(0, 240, 255, 0.75)'
      }
    },
    {
      id: 'miami-midnight',
      name: 'Miami Midnight',
      p1: {
        label: 'KATA',
        name: 'KATA',
        color: '#bf55ec',
        grad: ['#bf55ec', '#9b51e0'],
        glow: 'rgba(191, 85, 236, 0.75)'
      },
      p2: {
        label: 'ZERO',
        name: 'ZERO',
        botName: 'VICE AI',
        color: '#00ff88',
        grad: ['#00ff88', '#00cc66'],
        glow: 'rgba(0, 255, 136, 0.75)'
      }
    },
    {
      id: 'gold-coast',
      name: 'Gold Coast Heist',
      p1: {
        label: 'KATA',
        name: 'KATA',
        color: '#ffaa00',
        grad: ['#ffaa00', '#ff6a00'],
        glow: 'rgba(255, 170, 0, 0.75)'
      },
      p2: {
        label: 'ZERO',
        name: 'ZERO',
        botName: 'VICE AI',
        color: '#ff1744',
        grad: ['#ff1744', '#d50000'],
        glow: 'rgba(255, 23, 68, 0.75)'
      }
    },
    {
      id: 'cyber-neon',
      name: 'Cyber Neon',
      p1: {
        label: 'KATA',
        name: 'KATA',
        color: '#ccff00',
        grad: ['#ccff00', '#76ff03'],
        glow: 'rgba(204, 255, 0, 0.75)'
      },
      p2: {
        label: 'ZERO',
        name: 'ZERO',
        botName: 'VICE AI',
        color: '#2979ff',
        grad: ['#2979ff', '#00b0ff'],
        glow: 'rgba(41, 121, 255, 0.75)'
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

  // --- GTA VI Neon Vector Graphics for Kata & Zero ---
  function getGtaKataSvg(grad, glow, idSuffix = 'main') {
    const gradId = `kataNeonGrad_${idSuffix}`;
    const glowId = `kataNeonGlow_${idSuffix}`;
    return `
      <svg class="mark-svg mark-kata" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${grad[0]}" />
            <stop offset="100%" stop-color="${grad[1]}" />
          </linearGradient>
          <filter id="${glowId}" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="${grad[0]}" flood-opacity="0.9"/>
            <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="${grad[1]}" flood-opacity="0.6"/>
          </filter>
        </defs>
        <!-- Outer Glowing Neon Laser Tube -->
        <g filter="url(#${glowId})">
          <line x1="20" y1="20" x2="80" y2="80" stroke="url(#${gradId})" stroke-width="16" stroke-linecap="round" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="url(#${gradId})" stroke-width="16" stroke-linecap="round" />
        </g>
        <!-- Inner Bright White-Hot Plasma Core -->
        <line x1="20" y1="20" x2="80" y2="80" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.95" />
        <line x1="80" y1="20" x2="20" y2="80" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.95" />
        
        <!-- Center Cyber Core Hub -->
        <circle cx="50" cy="50" r="10" fill="#0c0418" stroke="url(#${gradId})" stroke-width="3" />
        <circle cx="50" cy="50" r="4" fill="#ffffff" />
        <!-- Electric Sparks -->
        <polygon points="76,14 78,22 84,23 79,26 81,32 76,28 72,31 74,25 69,23 75,21" fill="#fff" opacity="0.9" />
      </svg>
    `;
  }

  function getGtaZeroSvg(grad, glow, idSuffix = 'main') {
    const gradId = `zeroNeonGrad_${idSuffix}`;
    const glowId = `zeroNeonGlow_${idSuffix}`;
    return `
      <svg class="mark-svg mark-zero" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${grad[0]}" />
            <stop offset="100%" stop-color="${grad[1]}" />
          </linearGradient>
          <filter id="${glowId}" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="${grad[0]}" flood-opacity="0.9"/>
            <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="${grad[1]}" flood-opacity="0.6"/>
          </filter>
        </defs>
        <!-- Outer Glowing Neon Ring -->
        <g filter="url(#${glowId})">
          <circle cx="50" cy="50" r="30" stroke="url(#${gradId})" stroke-width="16" fill="none" />
        </g>
        <!-- Inner Bright White-Hot Plasma Core -->
        <circle cx="50" cy="50" r="30" stroke="#ffffff" stroke-width="6" fill="none" opacity="0.95" />
        
        <!-- Center Cyber Radar Crosshair Hub -->
        <circle cx="50" cy="50" r="8" fill="none" stroke="url(#${gradId})" stroke-width="2" />
        <circle cx="50" cy="50" r="3" fill="#ffffff" />
        <!-- Electric Pulse Accent -->
        <polygon points="84,46 87,50 92,51 88,54 89,58 85,55 81,57 83,53 79,51 84,50" fill="#fff" opacity="0.9" />
      </svg>
    `;
  }

  // --- Synthwave Sound Synthesizer (Web Audio API) ---
  class SynthAudioController {
    constructor() {
      this.enabled = localStorage.getItem('gta_sound_enabled') !== 'false';
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
      localStorage.setItem('gta_sound_enabled', this.enabled);
      return this.enabled;
    }

    playMove(isKata = true) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // High punchy 80s synth hit for Kata, deeper laser punch for Zero
        if (isKata) {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        } else {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(480, now);
          osc.frequency.exponentialRampToValueAtTime(110, now + 0.16);

          gain.gain.setValueAtTime(0.32, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        }

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.17);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }

    playMissionPassed() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        // High-energy Vice City Synthwave Fanfare: G3 -> C4 -> D4 -> G4 -> C5
        const chords = [196.00, 261.63, 293.66, 392.00, 523.25];
        chords.forEach((freq, idx) => {
          const startTime = this.ctx.currentTime + idx * 0.08;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.22, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.42);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 0.44);
        });
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }

    playBusted() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        // Heavy low-pass synth drop for Stalemate
        const notes = [220, 196, 174.61]; // A3, G3, F3
        notes.forEach((freq, idx) => {
          const startTime = this.ctx.currentTime + idx * 0.12;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
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

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }
  }

  // --- Neon Cyber Confetti / Sparks Particle System ---
  class NeonConfettiEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationFrame = null;
      this.colors = ['#ff007f', '#00f0ff', '#ffaa00', '#ffffff', '#ff5277', '#76ff03'];
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst(count = 85) {
      this.resize();
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: this.canvas.width * (0.2 + Math.random() * 0.6),
          y: this.canvas.height * 0.42,
          vx: (Math.random() - 0.5) * 16,
          vy: -Math.random() * 14 - 5,
          size: Math.random() * 9 + 4,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          shape: Math.random() > 0.35 ? 'diamond' : 'rect',
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
        p.vy += 0.38; // gravity
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
        this.ctx.shadowColor = p.color;
        this.ctx.shadowBlur = 8;

        if (p.shape === 'diamond') {
          this.ctx.beginPath();
          this.ctx.moveTo(0, -p.size);
          this.ctx.lineTo(p.size * 0.7, 0);
          this.ctx.lineTo(0, p.size);
          this.ctx.lineTo(-p.size * 0.7, 0);
          this.ctx.closePath();
          this.ctx.fill();
        } else {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
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

  // --- Main ZERO KATA Game Engine (GTA VI Edition) ---
  class ZeroKataGame {
    constructor() {
      this.boardState = Array(9).fill(null);
      this.currentTurn = 'p1'; // 'p1' (Kata) or 'p2' (Zero)
      this.gameMode = 'pve'; // 'pve' (vs Vice AI) or 'pvp' (Street Duel)
      this.difficulty = 'medium'; // 'easy' (Rookie), 'medium' (Hustler), 'hard' (Kingpin)
      this.firstTurnPref = 'p1'; // 'p1', 'p2', or 'random'
      this.isGameOver = false;
      this.isAiThinking = false;
      this.history = [];
      this.paletteIndex = 0;
      this.streak = 0;
      this.streakWinner = null;

      this.scores = this.loadScores();
      this.sound = new SynthAudioController();
      this.confetti = new NeonConfettiEngine(document.getElementById('confetti-canvas'));

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
        missionTag: document.getElementById('mission-tag'),
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
      const savedPalette = localStorage.getItem('gta_zerokata_palette');
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
        const stored = localStorage.getItem('gta_zerokata_scores');
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
        localStorage.setItem('gta_zerokata_scores', JSON.stringify(this.scores));
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

      // First Strike Selection
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
        localStorage.setItem('gta_zerokata_palette', this.paletteIndex);
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

      // Window resize: recompute SVG winning laser line
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
      this.dom.iconP1.innerHTML = getGtaKataSvg(p.p1.grad, p.p1.glow, 'icon_p1');

      // Update Card 2 (Zero or Vice AI)
      if (this.gameMode === 'pve') {
        this.dom.nameP2.textContent = p.p2.botName;
        this.dom.iconP2.innerHTML = getGtaZeroSvg(p.p2.grad, p.p2.glow, 'icon_p2');
      } else {
        this.dom.nameP2.textContent = p.p2.name;
        this.dom.iconP2.innerHTML = getGtaZeroSvg(p.p2.grad, p.p2.glow, 'icon_p2');
      }

      document.documentElement.style.setProperty('--player1-color', p.p1.color);
      document.documentElement.style.setProperty('--player2-color', p.p2.color);
      document.documentElement.style.setProperty('--neon-pink', p.p1.color);
      document.documentElement.style.setProperty('--neon-cyan', p.p2.color);
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
        this.dom.statusAvatar.innerHTML = '⚡';
        this.dom.statusText.textContent = "KATA'S TURN • SEIZE THE STREET";
      } else {
        if (this.gameMode === 'pve') {
          this.dom.statusAvatar.innerHTML = '🤖';
          this.dom.statusText.textContent = `${p.p2.botName} IS CALCULATING HEIST... ⚡`;
        } else {
          this.dom.statusAvatar.innerHTML = '⭕';
          this.dom.statusText.textContent = "ZERO'S TURN • CLAIM THE DISTRICT";
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

      // Punchy Synthwave move sound
      this.sound.playMove(player === 'p1');

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
        this.triggerAiMove(380);
      }
    }

    renderCell(index, player) {
      const cell = this.dom.cells[index];
      const p = this.currentPalette;
      cell.classList.add('taken');

      const markDiv = document.createElement('div');
      markDiv.className = 'cell-mark';

      if (player === 'p1') {
        markDiv.innerHTML = getGtaKataSvg(p.p1.grad, p.p1.glow, `cell_${index}`);
      } else {
        markDiv.innerHTML = getGtaZeroSvg(p.p2.grad, p.p2.glow, `cell_${index}`);
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

      // Draw SVG laser strike line
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

      // Sound & Neon Confetti celebration
      this.sound.playMissionPassed();
      this.confetti.burst(90);

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

      this.sound.playBusted();
      this.dom.statusAvatar.innerHTML = '⚠️';
      this.dom.statusText.textContent = "STALEMATE • NO ONE RULES THE STREETS";

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
        const extend = 18;
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

      this.dom.missionTag.textContent = "MISSION PASSED";
      this.dom.missionTag.style.background = "linear-gradient(135deg, #ffaa00 0%, #ff5e00 100%)";

      if (winner === 'p1') {
        avatarHtml = getGtaKataSvg(p.p1.grad, p.p1.glow, 'modal_win');
        title = `KATA RULES VICE CITY!`;
        message = this.gameMode === 'pve'
          ? "RESPECT +100 • YOU OVERTHREW THE VICE SYNDICATE! 💰"
          : "RESPECT +100 • KATA CONQUERED THE TURF! 🔥";
      } else {
        if (this.gameMode === 'pve') {
          avatarHtml = getGtaZeroSvg(p.p2.grad, p.p2.glow, 'modal_win');
          title = `BUSTED! VICE AI PREVAILED!`;
          message = "THE SYNDICATE DEFENDED THEIR EMPIRE. READY FOR RETALIATION? ⚡";
        } else {
          avatarHtml = getGtaZeroSvg(p.p2.grad, p.p2.glow, 'modal_win');
          title = `ZERO RULES VICE CITY!`;
          message = "RESPECT +100 • ZERO SEIZED TOTAL STREET CONTROL! 🌴";
        }
      }

      this.dom.modalAvatar.innerHTML = avatarHtml;
      this.dom.modalTitle.textContent = title;
      this.dom.modalMessage.textContent = message;

      if (this.streak > 1) {
        this.dom.modalStreakBadge.style.display = 'inline-block';
        this.dom.modalStreakText.textContent = `HEAT LEVEL: ${Math.min(this.streak + 1, 5)} STARS 🔥 (${this.streak} WINS)`;
      } else {
        this.dom.modalStreakBadge.style.display = 'none';
      }

      this.dom.victoryModal.classList.add('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'false');
    }

    openDrawModal() {
      this.dom.missionTag.textContent = "STALEMATE";
      this.dom.missionTag.style.background = "linear-gradient(135deg, #64748b 0%, #334155 100%)";

      this.dom.modalAvatar.innerHTML = '<span style="font-size:2.8rem">⚠️</span>';
      this.dom.modalTitle.textContent = "GRIDLOCKED!";
      this.dom.modalMessage.textContent = "BOTH SYNDICATES MATCHED HEAT FOR HEAT. NO CASH WON.";
      this.dom.modalStreakBadge.style.display = 'none';

      this.dom.victoryModal.classList.add('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'false');
    }

    closeVictoryModal() {
      this.dom.victoryModal.classList.remove('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'true');
    }

    // --- Vice AI Engine ---
    triggerAiMove(delay = 380) {
      this.isAiThinking = true;
      this.updateUndoButton();
      this.dom.statusAvatar.innerHTML = '🤖';
      this.dom.statusText.textContent = `${this.currentPalette.p2.botName} IS CALCULATING TURF... ⚡`;

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

      // 🌴 1. Rookie: Casual & chaotic street hustler
      if (this.difficulty === 'easy') {
        if (Math.random() < 0.25) {
          const winMove = this.findWinningMove(this.boardState, 'p2');
          if (winMove !== -1) return winMove;
        }
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }

      // 🏎️ 2. Hustler: Aggressive & tactical
      if (this.difficulty === 'medium') {
        // Take winning move if available
        const winMove = this.findWinningMove(this.boardState, 'p2');
        if (winMove !== -1) return winMove;

        // Block player from winning (82% chance)
        const blockMove = this.findWinningMove(this.boardState, 'p1');
        if (blockMove !== -1 && Math.random() < 0.82) return blockMove;

        // Seize center tile
        if (this.boardState[4] === null && Math.random() < 0.65) return 4;

        // Pick corners
        const corners = [0, 2, 6, 8].filter(idx => this.boardState[idx] === null);
        if (corners.length > 0 && Math.random() < 0.5) {
          return corners[Math.floor(Math.random() * corners.length)];
        }

        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }

      // 👑 3. Kingpin: Mathematically Unbeatable Minimax Algorithm
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
