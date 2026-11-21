/**
 * 🎮 KAWAII ARCADE & GAME HUB 🎀
 * Zero Kata, Stone Paper Scissors (1P, 2P & 3P Modes), and Memory Cards.
 * Pure Vanilla JavaScript with Web Audio Synthesizer, Minimax AI, and Confetti Engine.
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. SOUND CONTROLLER (Procedural Web Audio API)
  // ==========================================================================
  class SoundController {
    constructor() {
      this.enabled = localStorage.getItem('arcade_sound_enabled') !== 'false';
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
      localStorage.setItem('arcade_sound_enabled', this.enabled);
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

    playShoot() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.18);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.19);
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }

    playWin() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
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
        const notes = [440, 392, 349.23];
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

  // ==========================================================================
  // 2. CANVAS CONFETTI ENGINE
  // ==========================================================================
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
        p.vy += 0.35;
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

  // ==========================================================================
  // 3. ZERO KATA GAME LOGIC
  // ==========================================================================
  const ZK_PALETTES = [
    {
      id: 'baby-girl-boy',
      name: 'Baby Girl & Boy',
      p1: { label: 'Baby Kata', name: 'Baby Kata', color: '#ff6584', grad: ['#ff7597', '#ff5277'], blush: '#ff7597' },
      p2: { label: 'Baby Zero', name: 'Baby Zero', botName: 'Baby Bot', color: '#0284c7', grad: ['#38bdf8', '#0284c7'], blush: '#ff7675' }
    },
    {
      id: 'teddy-duckling',
      name: 'Teddy & Duckling',
      p1: { label: 'Teddy Kata', name: 'Teddy Kata', color: '#c27803', grad: ['#e59819', '#b45309'], blush: '#f87171' },
      p2: { label: 'Duckling Zero', name: 'Duckling Zero', botName: 'Baby Bot', color: '#eab308', grad: ['#fde047', '#eab308'], blush: '#fb7185' }
    },
    {
      id: 'baby-bunny-kitty',
      name: 'Bunny & Kitty',
      p1: { label: 'Baby Bunny', name: 'Baby Bunny', color: '#f43f5e', grad: ['#fb7185', '#e11d48'], blush: '#fb7185' },
      p2: { label: 'Baby Kitty', name: 'Baby Kitty', botName: 'Kitty Bot', color: '#8b5cf6', grad: ['#a78bfa', '#7c3aed'], blush: '#f472b6' }
    },
    {
      id: 'pacifier-rattle',
      name: 'Pacifier & Rattle',
      p1: { label: 'Pacifier Kata', name: 'Pacifier Kata', color: '#ec4899', grad: ['#f472b6', '#db2777'], blush: '#fb7185' },
      p2: { label: 'Rattle Zero', name: 'Rattle Zero', botName: 'Rattle Bot', color: '#10b981', grad: ['#34d399', '#059669'], blush: '#f87171' }
    }
  ];

  const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

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
        <line x1="22" y1="22" x2="78" y2="78" stroke="url(#${gradId})" stroke-width="17" stroke-linecap="round" filter="url(#${shadowId})" />
        <line x1="78" y1="22" x2="22" y2="78" stroke="url(#${gradId})" stroke-width="17" stroke-linecap="round" filter="url(#${shadowId})" />
        <circle cx="50" cy="50" r="19" fill="#fff6ec" filter="url(#${shadowId})" />
        <path d="M 50 31 Q 54 26 48 24 Q 45 28 50 31" fill="#c48a56" />
        <circle cx="43" cy="48" r="3" fill="#373244" />
        <circle cx="57" cy="48" r="3" fill="#373244" />
        <circle cx="42" cy="46.5" r="1.2" fill="#ffffff" />
        <circle cx="56" cy="46.5" r="1.2" fill="#ffffff" />
        <ellipse cx="38" cy="53" rx="3.5" ry="2" fill="${blush}" opacity="0.85" />
        <ellipse cx="62" cy="53" rx="3.5" ry="2" fill="${blush}" opacity="0.85" />
        <ellipse cx="50" cy="56" rx="5.5" ry="4" fill="${grad[0]}" />
        <circle cx="50" cy="56" r="2.2" fill="#ffffff" />
        <path d="M 47 59 Q 50 64 53 59" stroke="${grad[0]}" stroke-width="2" fill="none" stroke-linecap="round" />
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
        <circle cx="50" cy="50" r="32" stroke="url(#${gradId})" stroke-width="16" fill="none" filter="url(#${shadowId})" />
        <path d="M 36 21 Q 50 11 64 21 Q 50 17 36 21 Z" fill="${grad[0]}" />
        <circle cx="50" cy="12" r="3.5" fill="#fde047" />
        <circle cx="50" cy="50" r="19" fill="#fff6ec" filter="url(#${shadowId})" />
        <path d="M 50 31 Q 46 26 52 24 Q 55 28 50 31" fill="#c48a56" />
        <circle cx="43" cy="48" r="3" fill="#373244" />
        <circle cx="57" cy="48" r="3" fill="#373244" />
        <circle cx="42" cy="46.5" r="1.2" fill="#ffffff" />
        <circle cx="56" cy="46.5" r="1.2" fill="#ffffff" />
        <ellipse cx="38" cy="53" rx="3.5" ry="2" fill="${blush}" opacity="0.85" />
        <ellipse cx="62" cy="53" rx="3.5" ry="2" fill="${blush}" opacity="0.85" />
        <ellipse cx="50" cy="56" rx="5.5" ry="4" fill="${grad[0]}" />
        <circle cx="50" cy="56" r="2.2" fill="#ffffff" />
        <path d="M 47 59 Q 50 64 53 59" stroke="${grad[0]}" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M 80 44 Q 82 48 86 49 Q 82 50 80 54 Q 79 50 75 49 Q 79 48 80 44 Z" fill="#fff375" opacity="0.9" />
      </svg>
    `;
  }

  // ==========================================================================
  // 4. STONE PAPER SCISSOR GAME ENGINE (1P, 2P & 3P)
  // ==========================================================================
  const RPS_ICONS = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
  };

  const RPS_NAMES = {
    rock: 'Stone',
    paper: 'Paper',
    scissors: 'Scissor'
  };

  // Helper to determine winner in 2-choice head to head:
  // Returns 1 if a beats b, -1 if b beats a, 0 if tie
  function rpsCompare(a, b) {
    if (a === b) return 0;
    if (
      (a === 'rock' && b === 'scissors') ||
      (a === 'paper' && b === 'rock') ||
      (a === 'scissors' && b === 'paper')
    ) {
      return 1;
    }
    return -1;
  }

  // ==========================================================================
  // 5. BONUS MEMORY CARDS LOGIC
  // ==========================================================================
  const MEMO_ICONS = ['🧸', '🐥', '🐰', '🐱', '🍼', '👶', '⭐', '💖'];

  // ==========================================================================
  // 6. MASTER ARCADE APPLICATION
  // ==========================================================================
  class KawaiiArcadeApp {
    constructor() {
      // Global Controllers
      this.sound = new SoundController();
      this.confetti = new ConfettiEngine(document.getElementById('confetti-canvas'));

      // DOM Elements Cache
      this.dom = {
        // Nav & Views
        views: document.querySelectorAll('.view-panel'),
        tabButtons: document.querySelectorAll('.nav-tab-btn'),
        navHomeBtn: document.getElementById('nav-home-btn'),
        globalSoundBtn: document.getElementById('global-sound-btn'),
        soundIcon: document.getElementById('sound-icon'),
        globalHelpBtn: document.getElementById('global-help-btn'),
        playButtons: document.querySelectorAll('[data-open]'),

        // Modals
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
        helpOkBtn: document.getElementById('help-ok-btn'),

        // Zero Kata Elements
        zkBoard: document.getElementById('zk-board'),
        zkCells: Array.from(document.querySelectorAll('#zk-board .cell')),
        zkWinLineSvg: document.getElementById('zk-win-line-svg'),
        zkWinLine: document.getElementById('zk-win-line'),
        zkModePve: document.getElementById('zk-mode-pve'),
        zkModePvp: document.getElementById('zk-mode-pvp'),
        zkAiControls: document.getElementById('zk-ai-controls'),
        zkDiffButtons: document.querySelectorAll('.zk-diff-btn'),
        zkTurnButtons: document.querySelectorAll('.zk-turn-btn'),
        zkCardP1: document.getElementById('zk-card-p1'),
        zkCardP2: document.getElementById('zk-card-p2'),
        zkNameP1: document.getElementById('zk-name-p1'),
        zkNameP2: document.getElementById('zk-name-p2'),
        zkIconP1: document.getElementById('zk-icon-p1'),
        zkIconP2: document.getElementById('zk-icon-p2'),
        zkScoreP1: document.getElementById('zk-score-p1'),
        zkScoreP2: document.getElementById('zk-score-p2'),
        zkScoreDraw: document.getElementById('zk-score-draw'),
        zkTurnBanner: document.getElementById('zk-turn-banner'),
        zkStatusAvatar: document.getElementById('zk-status-avatar'),
        zkStatusText: document.getElementById('zk-status-text'),
        zkThemeBtn: document.getElementById('zk-theme-btn'),
        zkThemeLabel: document.getElementById('zk-theme-label'),
        zkRestartBtn: document.getElementById('zk-restart-btn'),
        zkUndoBtn: document.getElementById('zk-undo-btn'),
        zkResetScoreBtn: document.getElementById('zk-reset-score-btn'),

        // Stone Paper Scissor Elements
        rpsMode1p: document.getElementById('rps-mode-1p'),
        rpsMode2p: document.getElementById('rps-mode-2p'),
        rpsMode3p: document.getElementById('rps-mode-3p'),
        rps3pSubcontrols: document.getElementById('rps-3p-subcontrols'),
        rpsSubButtons: document.querySelectorAll('.rps-sub-btn'),
        rpsScoreP1: document.getElementById('rps-score-p1'),
        rpsScoreP2: document.getElementById('rps-score-p2'),
        rpsScoreP3: document.getElementById('rps-score-p3'),
        rpsScoreDraw: document.getElementById('rps-score-draw'),
        rpsBadgeP1: document.getElementById('rps-badge-p1'),
        rpsBadgeP2: document.getElementById('rps-badge-p2'),
        rpsBadgeP3: document.getElementById('rps-badge-p3'),
        rpsCardP3: document.getElementById('rps-card-p3'),
        rpsTurnBanner: document.getElementById('rps-turn-banner'),
        rpsStatusAvatar: document.getElementById('rps-status-avatar'),
        rpsStatusText: document.getElementById('rps-status-text'),
        rpsPodiumP1: document.getElementById('rps-podium-p1'),
        rpsPodiumP2: document.getElementById('rps-podium-p2'),
        rpsPodiumP3: document.getElementById('rps-podium-p3'),
        podiumLabelP1: document.getElementById('podium-label-p1'),
        podiumLabelP2: document.getElementById('podium-label-p2'),
        podiumLabelP3: document.getElementById('podium-label-p3'),
        handDisplayP1: document.getElementById('hand-display-p1'),
        handDisplayP2: document.getElementById('hand-display-p2'),
        handDisplayP3: document.getElementById('hand-display-p3'),
        choiceNameP1: document.getElementById('choice-name-p1'),
        choiceNameP2: document.getElementById('choice-name-p2'),
        choiceNameP3: document.getElementById('choice-name-p3'),
        rpsCountdown: document.getElementById('rps-countdown'),
        choicePromptLabel: document.getElementById('choice-prompt-label'),
        choiceButtons: document.querySelectorAll('.choice-btn'),
        rpsNextRoundBtn: document.getElementById('rps-next-round-btn'),
        rpsResetScoresBtn: document.getElementById('rps-reset-scores-btn'),
        rpsModeInfoBtn: document.getElementById('rps-mode-info-btn'),

        // Memory Mini-Game Elements
        memoGrid: document.getElementById('memo-grid'),
        memoMoves: document.getElementById('memo-moves'),
        memoMatches: document.getElementById('memo-matches'),
        memoTimer: document.getElementById('memo-timer'),
        memoRestartBtn: document.getElementById('memo-restart-btn'),
        memoRestartTopBtn: document.getElementById('memo-restart-top-btn')
      };

      // App State
      this.currentView = 'view-hub';

      // Zero Kata State
      this.zkBoardState = Array(9).fill(null);
      this.zkCurrentTurn = 'p1';
      this.zkGameMode = 'pve';
      this.zkDifficulty = 'medium';
      this.zkFirstTurnPref = 'p1';
      this.zkIsGameOver = false;
      this.zkIsAiThinking = false;
      this.zkHistory = [];
      this.zkPaletteIndex = 0;
      this.zkStreak = 0;
      this.zkStreakWinner = null;
      this.zkScores = this.loadZkScores();

      // RPS State
      this.rpsMode = '1p'; // '1p', '2p', '3p'
      this.rpsSubMode = '1h2b'; // '1h2b', '3h', '2h1b'
      this.rpsScores = { p1: 0, p2: 0, p3: 0, draw: 0 };
      this.rpsStreak = 0;
      this.rpsIsAnimating = false;
      this.rpsTurnWaiting = 1; // In 2P/3P Human pass mode: which player's turn to pick
      this.rpsP1Choice = null;
      this.rpsP2Choice = null;
      this.rpsP3Choice = null;

      // Memory State
      this.memoCards = [];
      this.memoFlipped = [];
      this.memoMatchedCount = 0;
      this.memoMoveCount = 0;
      this.memoTimerInterval = null;
      this.memoSeconds = 0;
      this.memoIsLocked = false;

      this.initEvents();
      this.updateSoundButton();
      this.initZeroKata();
      this.initRps();
      this.initMemory();
    }

    // ========================================================================
    // GLOBAL NAVIGATION & ROUTER
    // ========================================================================
    switchView(targetId) {
      this.currentView = targetId;

      this.dom.views.forEach(v => {
        v.classList.remove('active');
        if (v.id === targetId) {
          v.classList.add('active');
        }
      });

      this.dom.tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === targetId);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });

      // If switching to view, refresh display
      if (targetId === 'view-zerokata' && this.zkWinningCombo) {
        setTimeout(() => this.drawZkWinningLine(this.zkWinningCombo), 100);
      }
    }

    initEvents() {
      // Nav Tabs
      this.dom.tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.sound.playClick();
          this.switchView(btn.dataset.target);
        });
      });

      this.dom.navHomeBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.switchView('view-hub');
      });

      // Quick Play buttons on cards & back buttons
      this.dom.playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.sound.playClick();
          this.switchView(btn.dataset.open);
        });
      });

      // Global Sound Toggle
      this.dom.globalSoundBtn.addEventListener('click', () => {
        const enabled = this.sound.toggle();
        this.updateSoundButton();
        if (enabled) this.sound.playClick();
      });

      // Help Modal
      this.dom.globalHelpBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.openHelpModal();
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

      // Victory Modal actions
      this.dom.modalCloseBtn.addEventListener('click', () => {
        this.dom.victoryModal.classList.remove('active');
        this.dom.victoryModal.setAttribute('aria-hidden', 'true');
      });

      this.dom.modalPlayAgainBtn.addEventListener('click', () => {
        this.dom.victoryModal.classList.remove('active');
        this.dom.victoryModal.setAttribute('aria-hidden', 'true');
        if (this.currentView === 'view-zerokata') {
          this.resetZkRound(false);
        } else if (this.currentView === 'view-rps') {
          this.resetRpsRound();
        } else if (this.currentView === 'view-memo') {
          this.restartMemory();
        }
      });
    }

    updateSoundButton() {
      this.dom.soundIcon.textContent = this.sound.enabled ? '🔊' : '🔇';
      this.dom.globalSoundBtn.title = this.sound.enabled ? 'Sound: On' : 'Sound: Off';
    }

    openHelpModal() {
      this.dom.helpModal.classList.add('active');
      this.dom.helpModal.setAttribute('aria-hidden', 'false');
    }

    // ========================================================================
    // ZERO KATA IMPLEMENTATION
    // ========================================================================
    get currentZkPalette() {
      return ZK_PALETTES[this.zkPaletteIndex];
    }

    loadZkScores() {
      try {
        const stored = localStorage.getItem('arcade_zk_scores');
        if (stored) return JSON.parse(stored);
      } catch (e) {}
      return { p1: 0, p2: 0, draw: 0 };
    }

    saveZkScores() {
      try {
        localStorage.setItem('arcade_zk_scores', JSON.stringify(this.zkScores));
      } catch (e) {}
    }

    initZeroKata() {
      // Cells
      this.dom.zkCells.forEach(cell => {
        cell.addEventListener('click', (e) => this.handleZkCellClick(e));
        cell.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleZkCellClick(e);
          }
        });
      });

      // Modes
      this.dom.zkModePve.addEventListener('click', () => this.switchZkMode('pve'));
      this.dom.zkModePvp.addEventListener('click', () => this.switchZkMode('pvp'));

      // Difficulties
      this.dom.zkDiffButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.dom.zkDiffButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.zkDifficulty = btn.dataset.diff;
          this.sound.playClick();
        });
      });

      // First Turn
      this.dom.zkTurnButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.dom.zkTurnButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.zkFirstTurnPref = btn.dataset.turn;
          this.sound.playClick();
          this.resetZkRound(false);
        });
      });

      // Palette toggle
      this.dom.zkThemeBtn.addEventListener('click', () => {
        this.zkPaletteIndex = (this.zkPaletteIndex + 1) % ZK_PALETTES.length;
        this.sound.playClick();
        this.applyZkPalette();
        this.renderZkBoard();
        this.updateZkStatusBanner();
      });

      // Actions
      this.dom.zkRestartBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.resetZkRound(false);
      });

      this.dom.zkUndoBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.undoZkMove();
      });

      this.dom.zkResetScoreBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.zkScores = { p1: 0, p2: 0, draw: 0 };
        this.zkStreak = 0;
        this.zkStreakWinner = null;
        this.saveZkScores();
        this.updateZkScoreboard();
      });

      window.addEventListener('resize', () => {
        if (this.zkWinningCombo && this.currentView === 'view-zerokata') {
          this.drawZkWinningLine(this.zkWinningCombo);
        }
      });

      this.applyZkPalette();
      this.updateZkScoreboard();
      this.resetZkRound(true);
    }

    applyZkPalette() {
      const p = this.currentZkPalette;
      this.dom.zkThemeLabel.textContent = p.name;
      this.dom.zkNameP1.textContent = p.p1.name;
      this.dom.zkIconP1.innerHTML = getCuteBabyKataSvg(p, 'nav_zk_p1');

      if (this.zkGameMode === 'pve') {
        this.dom.zkNameP2.textContent = p.p2.botName;
        this.dom.zkIconP2.innerHTML = getCuteBabyZeroSvg(p, 'nav_zk_p2');
      } else {
        this.dom.zkNameP2.textContent = p.p2.name;
        this.dom.zkIconP2.innerHTML = getCuteBabyZeroSvg(p, 'nav_zk_p2');
      }

      document.documentElement.style.setProperty('--player1-color', p.p1.color);
      document.documentElement.style.setProperty('--player2-color', p.p2.color);
    }

    switchZkMode(mode) {
      if (this.zkGameMode === mode) return;
      this.sound.playClick();
      this.zkGameMode = mode;

      if (mode === 'pve') {
        this.dom.zkModePve.classList.add('active');
        this.dom.zkModePvp.classList.remove('active');
        this.dom.zkAiControls.classList.remove('hidden');
      } else {
        this.dom.zkModePvp.classList.add('active');
        this.dom.zkModePve.classList.remove('active');
        this.dom.zkAiControls.classList.add('hidden');
      }

      this.applyZkPalette();
      this.resetZkRound(false);
    }

    updateZkScoreboard() {
      this.dom.zkScoreP1.textContent = this.zkScores.p1;
      this.dom.zkScoreP2.textContent = this.zkScores.p2;
      this.dom.zkScoreDraw.textContent = this.zkScores.draw;
    }

    resetZkRound(isInitial = false) {
      this.zkBoardState = Array(9).fill(null);
      this.zkIsGameOver = false;
      this.zkIsAiThinking = false;
      this.zkWinningCombo = null;
      this.zkHistory = [];

      if (this.zkFirstTurnPref === 'p1') {
        this.zkCurrentTurn = 'p1';
      } else if (this.zkFirstTurnPref === 'p2') {
        this.zkCurrentTurn = 'p2';
      } else {
        this.zkCurrentTurn = Math.random() < 0.5 ? 'p1' : 'p2';
      }

      this.dom.zkWinLineSvg.classList.remove('active');
      this.dom.zkCells.forEach(cell => {
        cell.innerHTML = '';
        cell.className = 'cell';
        cell.disabled = false;
      });

      this.updateZkActiveCard();
      this.updateZkStatusBanner();
      this.updateZkUndoButton();

      if (this.zkGameMode === 'pve' && this.zkCurrentTurn === 'p2') {
        this.triggerZkAiMove(500);
      }
    }

    updateZkActiveCard() {
      if (this.zkIsGameOver) {
        this.dom.zkCardP1.classList.remove('active-turn');
        this.dom.zkCardP2.classList.remove('active-turn');
        return;
      }

      if (this.zkCurrentTurn === 'p1') {
        this.dom.zkCardP1.classList.add('active-turn');
        this.dom.zkCardP2.classList.remove('active-turn');
      } else {
        this.dom.zkCardP2.classList.add('active-turn');
        this.dom.zkCardP1.classList.remove('active-turn');
      }
    }

    updateZkStatusBanner(customText = null) {
      const p = this.currentZkPalette;

      if (customText) {
        this.dom.zkStatusText.textContent = customText;
        return;
      }

      if (this.zkIsGameOver) return;

      if (this.zkCurrentTurn === 'p1') {
        this.dom.zkStatusAvatar.innerHTML = '👶';
        this.dom.zkStatusText.textContent = `${p.p1.name}'s turn! Tap a tile~`;
      } else {
        if (this.zkGameMode === 'pve') {
          this.dom.zkStatusAvatar.innerHTML = '🤖';
          this.dom.zkStatusText.textContent = `${p.p2.botName} is babbling happily... ✨`;
        } else {
          this.dom.zkStatusAvatar.innerHTML = '🍼';
          this.dom.zkStatusText.textContent = `${p.p2.name}'s turn! Make a cozy move~`;
        }
      }
    }

    updateZkUndoButton() {
      this.dom.zkUndoBtn.disabled = this.zkHistory.length === 0 || this.zkIsAiThinking;
    }

    handleZkCellClick(e) {
      if (this.zkIsGameOver || this.zkIsAiThinking) return;

      const cell = e.currentTarget;
      const index = parseInt(cell.dataset.index, 10);

      if (this.zkBoardState[index] !== null) return;
      if (this.zkGameMode === 'pve' && this.zkCurrentTurn !== 'p1') return;

      this.executeZkMove(index, this.zkCurrentTurn);
    }

    executeZkMove(index, player) {
      this.zkHistory.push({
        board: [...this.zkBoardState],
        turn: this.zkCurrentTurn
      });

      this.zkBoardState[index] = player;
      this.renderZkCell(index, player);

      this.sound.playPop(player === 'p1' ? 560 : 440);

      const win = this.checkZkWin(this.zkBoardState);
      if (win) {
        this.handleZkWin(win);
        return;
      }

      if (this.checkZkTie(this.zkBoardState)) {
        this.handleZkDraw();
        return;
      }

      this.zkCurrentTurn = player === 'p1' ? 'p2' : 'p1';
      this.updateZkActiveCard();
      this.updateZkStatusBanner();
      this.updateZkUndoButton();

      if (this.zkGameMode === 'pve' && this.zkCurrentTurn === 'p2') {
        this.triggerZkAiMove(420);
      }
    }

    renderZkCell(index, player) {
      const cell = this.dom.zkCells[index];
      const p = this.currentZkPalette;
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

    renderZkBoard() {
      this.dom.zkCells.forEach((cell, idx) => {
        cell.innerHTML = '';
        cell.classList.remove('taken');
        const player = this.zkBoardState[idx];
        if (player) {
          this.renderZkCell(idx, player);
        }
      });
    }

    undoZkMove() {
      if (this.zkHistory.length === 0 || this.zkIsAiThinking) return;

      if (this.zkGameMode === 'pve') {
        let snapshot = null;
        while (this.zkHistory.length > 0) {
          snapshot = this.zkHistory.pop();
          if (snapshot.turn === 'p1') break;
        }
        if (snapshot) {
          this.zkBoardState = snapshot.board;
          this.zkCurrentTurn = 'p1';
        }
      } else {
        const snapshot = this.zkHistory.pop();
        if (snapshot) {
          this.zkBoardState = snapshot.board;
          this.zkCurrentTurn = snapshot.turn;
        }
      }

      this.zkIsGameOver = false;
      this.zkWinningCombo = null;
      this.dom.zkWinLineSvg.classList.remove('active');
      this.dom.zkCells.forEach(c => {
        c.classList.remove('win-cell');
        c.disabled = false;
      });

      this.renderZkBoard();
      this.updateZkActiveCard();
      this.updateZkStatusBanner();
      this.updateZkUndoButton();
    }

    checkZkWin(board) {
      for (const combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return { player: board[a], combo };
        }
      }
      return null;
    }

    checkZkTie(board) {
      return board.every(cell => cell !== null);
    }

    handleZkWin(win) {
      this.zkIsGameOver = true;
      this.zkWinningCombo = win.combo;

      win.combo.forEach(idx => {
        this.dom.zkCells[idx].classList.add('win-cell');
      });

      this.drawZkWinningLine(win.combo);
      this.dom.zkCells.forEach(c => c.disabled = true);

      if (win.player === 'p1') {
        this.zkScores.p1++;
        if (this.zkStreakWinner === 'p1') this.zkStreak++;
        else { this.zkStreak = 1; this.zkStreakWinner = 'p1'; }
      } else {
        this.zkScores.p2++;
        if (this.zkStreakWinner === 'p2') this.zkStreak++;
        else { this.zkStreak = 1; this.zkStreakWinner = 'p2'; }
      }

      this.saveZkScores();
      this.updateZkScoreboard();
      this.updateZkActiveCard();

      this.sound.playWin();
      this.confetti.burst(80);

      setTimeout(() => {
        const p = this.currentZkPalette;
        const avatar = win.player === 'p1' ? getCuteBabyKataSvg(p, 'win_m') : getCuteBabyZeroSvg(p, 'win_m');
        const winnerName = win.player === 'p1' ? p.p1.name : (this.zkGameMode === 'pve' ? p.p2.botName : p.p2.name);
        this.openVictoryModal(avatar, `Yay! ${winnerName} Won!`, 'What a sensational cute victory! 🎈', this.zkStreak);
      }, 500);
    }

    handleZkDraw() {
      this.zkIsGameOver = true;
      this.zkStreak = 0;
      this.zkStreakWinner = null;
      this.zkScores.draw++;
      this.saveZkScores();
      this.updateZkScoreboard();
      this.updateZkActiveCard();

      this.sound.playDraw();
      this.dom.zkStatusAvatar.innerHTML = '🍼';
      this.dom.zkStatusText.textContent = "It's a cozy tie! You both played so sweetly!";

      setTimeout(() => {
        this.openVictoryModal('🍼', "It's a Cozy Tie!", "Two sweet little babies matched each other move for move! 🎀", 0);
      }, 500);
    }

    drawZkWinningLine(combo) {
      const boardRect = this.dom.zkBoard.getBoundingClientRect();
      const cellA = this.dom.zkCells[combo[0]].getBoundingClientRect();
      const cellC = this.dom.zkCells[combo[2]].getBoundingClientRect();

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

      this.dom.zkWinLine.setAttribute('x1', x1);
      this.dom.zkWinLine.setAttribute('y1', y1);
      this.dom.zkWinLine.setAttribute('x2', x2);
      this.dom.zkWinLine.setAttribute('y2', y2);

      this.dom.zkWinLineSvg.classList.add('active');
    }

    triggerZkAiMove(delay = 400) {
      this.zkIsAiThinking = true;
      this.updateZkUndoButton();
      this.dom.zkStatusAvatar.innerHTML = '🤖';
      this.dom.zkStatusText.textContent = `${this.currentZkPalette.p2.botName} is thinking super hard... ✨`;

      setTimeout(() => {
        if (this.zkIsGameOver) {
          this.zkIsAiThinking = false;
          return;
        }

        const bestMove = this.computeZkAiMove();
        this.zkIsAiThinking = false;

        if (bestMove !== -1) {
          this.executeZkMove(bestMove, 'p2');
        }
      }, delay);
    }

    computeZkAiMove() {
      const emptyIndices = this.zkBoardState
        .map((val, idx) => (val === null ? idx : null))
        .filter(idx => idx !== null);

      if (emptyIndices.length === 0) return -1;

      if (this.zkDifficulty === 'easy') {
        if (Math.random() < 0.25) {
          const winMove = this.findZkWinningMove(this.zkBoardState, 'p2');
          if (winMove !== -1) return winMove;
        }
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }

      if (this.zkDifficulty === 'medium') {
        const winMove = this.findZkWinningMove(this.zkBoardState, 'p2');
        if (winMove !== -1) return winMove;

        const blockMove = this.findZkWinningMove(this.zkBoardState, 'p1');
        if (blockMove !== -1 && Math.random() < 0.82) return blockMove;

        if (this.zkBoardState[4] === null && Math.random() < 0.6) return 4;

        const corners = [0, 2, 6, 8].filter(idx => this.zkBoardState[idx] === null);
        if (corners.length > 0 && Math.random() < 0.5) {
          return corners[Math.floor(Math.random() * corners.length)];
        }

        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }

      // Genius Unbeatable Minimax
      let bestScore = -Infinity;
      let move = emptyIndices[0];

      if (emptyIndices.length === 9) {
        return [0, 2, 4, 6, 8][Math.floor(Math.random() * 5)];
      }

      for (const idx of emptyIndices) {
        this.zkBoardState[idx] = 'p2';
        const score = this.minimaxZk(this.zkBoardState, 0, false, -Infinity, Infinity);
        this.zkBoardState[idx] = null;

        if (score > bestScore) {
          bestScore = score;
          move = idx;
        }
      }

      return move;
    }

    findZkWinningMove(board, player) {
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

    minimaxZk(board, depth, isMaximizing, alpha, beta) {
      const win = this.checkZkWin(board);
      if (win) {
        return win.player === 'p2' ? 10 - depth : depth - 10;
      }
      if (this.checkZkTie(board)) {
        return 0;
      }

      if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = 'p2';
            const evaluation = this.minimaxZk(board, depth + 1, false, alpha, beta);
            board[i] = null;
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break;
          }
        }
        return maxEval;
      } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === null) {
            board[i] = 'p1';
            const evaluation = this.minimaxZk(board, depth + 1, true, alpha, beta);
            board[i] = null;
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
          }
        }
        return minEval;
      }
    }

    // ========================================================================
    // STONE PAPER SCISSOR IMPLEMENTATION (1P, 2P & 3P)
    // ========================================================================
    initRps() {
      // Mode tabs
      this.dom.rpsMode1p.addEventListener('click', () => this.switchRpsMode('1p'));
      this.dom.rpsMode2p.addEventListener('click', () => this.switchRpsMode('2p'));
      this.dom.rpsMode3p.addEventListener('click', () => this.switchRpsMode('3p'));

      // 3P Sub options
      this.dom.rpsSubButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.dom.rpsSubButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.rpsSubMode = btn.dataset.sub;
          this.sound.playClick();
          this.setupRpsUi();
          this.resetRpsRound();
        });
      });

      // Human Choice Buttons (Stone, Paper, Scissor)
      this.dom.choiceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.rpsIsAnimating) return;
          const choice = btn.dataset.choice;
          this.handleRpsChoiceClick(choice);
        });
      });

      // Actions
      this.dom.rpsNextRoundBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.resetRpsRound();
      });

      this.dom.rpsResetScoresBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.rpsScores = { p1: 0, p2: 0, p3: 0, draw: 0 };
        this.rpsStreak = 0;
        this.updateRpsScoreboard();
      });

      this.dom.rpsModeInfoBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.openHelpModal();
      });

      this.setupRpsUi();
      this.updateRpsScoreboard();
      this.resetRpsRound();
    }

    switchRpsMode(mode) {
      if (this.rpsMode === mode) return;
      this.sound.playClick();
      this.rpsMode = mode;

      this.dom.rpsMode1p.classList.toggle('active', mode === '1p');
      this.dom.rpsMode2p.classList.toggle('active', mode === '2p');
      this.dom.rpsMode3p.classList.toggle('active', mode === '3p');

      this.dom.rps3pSubcontrols.classList.toggle('hidden', mode !== '3p');

      this.rpsScores = { p1: 0, p2: 0, p3: 0, draw: 0 };
      this.rpsStreak = 0;
      this.setupRpsUi();
      this.updateRpsScoreboard();
      this.resetRpsRound();
    }

    setupRpsUi() {
      if (this.rpsMode === '1p') {
        this.dom.rpsBadgeP1.textContent = '👶 You';
        this.dom.rpsBadgeP2.textContent = '🤖 Machine';
        this.dom.podiumLabelP1.textContent = 'You';
        this.dom.podiumLabelP2.textContent = 'Machine';
        this.dom.rpsCardP3.classList.add('hidden');
        this.dom.rpsPodiumP3.classList.add('hidden');
      } else if (this.rpsMode === '2p') {
        this.dom.rpsBadgeP1.textContent = '👶 Player 1';
        this.dom.rpsBadgeP2.textContent = '🍼 Player 2';
        this.dom.podiumLabelP1.textContent = 'Player 1';
        this.dom.podiumLabelP2.textContent = 'Player 2';
        this.dom.rpsCardP3.classList.add('hidden');
        this.dom.rpsPodiumP3.classList.add('hidden');
      } else if (this.rpsMode === '3p') {
        this.dom.rpsCardP3.classList.remove('hidden');
        this.dom.rpsPodiumP3.classList.remove('hidden');

        if (this.rpsSubMode === '1h2b') {
          this.dom.rpsBadgeP1.textContent = '👶 You';
          this.dom.rpsBadgeP2.textContent = '🤖 Bot 1';
          this.dom.rpsBadgeP3.textContent = '🤖 Bot 2';
          this.dom.podiumLabelP1.textContent = 'You';
          this.dom.podiumLabelP2.textContent = 'Bot 1';
          this.dom.podiumLabelP3.textContent = 'Bot 2';
        } else if (this.rpsSubMode === '3h') {
          this.dom.rpsBadgeP1.textContent = '👶 Player 1';
          this.dom.rpsBadgeP2.textContent = '🍼 Player 2';
          this.dom.rpsBadgeP3.textContent = '🧸 Player 3';
          this.dom.podiumLabelP1.textContent = 'Player 1';
          this.dom.podiumLabelP2.textContent = 'Player 2';
          this.dom.podiumLabelP3.textContent = 'Player 3';
        } else if (this.rpsSubMode === '2h1b') {
          this.dom.rpsBadgeP1.textContent = '👶 Player 1';
          this.dom.rpsBadgeP2.textContent = '🍼 Player 2';
          this.dom.rpsBadgeP3.textContent = '🤖 Bot 3';
          this.dom.podiumLabelP1.textContent = 'Player 1';
          this.dom.podiumLabelP2.textContent = 'Player 2';
          this.dom.podiumLabelP3.textContent = 'Bot 3';
        }
      }
    }

    updateRpsScoreboard() {
      this.dom.rpsScoreP1.textContent = this.rpsScores.p1;
      this.dom.rpsScoreP2.textContent = this.rpsScores.p2;
      this.dom.rpsScoreP3.textContent = this.rpsScores.p3;
      this.dom.rpsScoreDraw.textContent = this.rpsScores.draw;
    }

    resetRpsRound() {
      this.rpsIsAnimating = false;
      this.rpsTurnWaiting = 1;
      this.rpsP1Choice = null;
      this.rpsP2Choice = null;
      this.rpsP3Choice = null;

      // Reset podium displays
      this.dom.handDisplayP1.innerHTML = '<span class="hand-placeholder">❔</span>';
      this.dom.handDisplayP2.innerHTML = '<span class="hand-placeholder">❔</span>';
      this.dom.handDisplayP3.innerHTML = '<span class="hand-placeholder">❔</span>';
      this.dom.choiceNameP1.textContent = '-';
      this.dom.choiceNameP2.textContent = '-';
      this.dom.choiceNameP3.textContent = '-';
      this.dom.rpsCountdown.textContent = '';

      this.dom.rpsPodiumP1.classList.remove('winner');
      this.dom.rpsPodiumP2.classList.remove('winner');
      this.dom.rpsPodiumP3.classList.remove('winner');

      this.dom.choiceButtons.forEach(btn => btn.disabled = false);

      // Prompt label update
      if (this.rpsMode === '1p') {
        this.dom.choicePromptLabel.textContent = 'Choose your throw:';
        this.dom.rpsStatusAvatar.innerHTML = '🪨';
        this.dom.rpsStatusText.textContent = 'Ready! Choose Stone, Paper, or Scissor!';
      } else if (this.rpsMode === '2p') {
        this.dom.choicePromptLabel.textContent = "Player 1: Secretly make your pick!";
        this.dom.rpsStatusAvatar.innerHTML = '👶';
        this.dom.rpsStatusText.textContent = "Player 1's turn to pick secretly!";
      } else if (this.rpsMode === '3p') {
        if (this.rpsSubMode === '1h2b') {
          this.dom.choicePromptLabel.textContent = 'Choose your throw vs Both Bots:';
          this.dom.rpsStatusAvatar.innerHTML = '🌟';
          this.dom.rpsStatusText.textContent = 'Ready! Pick to battle both Bots!';
        } else {
          this.dom.choicePromptLabel.textContent = "Player 1: Pick secretly!";
          this.dom.rpsStatusAvatar.innerHTML = '👶';
          this.dom.rpsStatusText.textContent = "Player 1's secret pick!";
        }
      }
    }

    handleRpsChoiceClick(choice) {
      this.sound.playClick();

      // Mode 1: 1P vs Machine
      if (this.rpsMode === '1p') {
        this.rpsP1Choice = choice;
        const choices = ['rock', 'paper', 'scissors'];
        this.rpsP2Choice = choices[Math.floor(Math.random() * choices.length)];
        this.runRpsShowdown(2);
        return;
      }

      // Mode 2: 2 Players Pass & Play
      if (this.rpsMode === '2p') {
        if (this.rpsTurnWaiting === 1) {
          this.rpsP1Choice = choice;
          this.rpsTurnWaiting = 2;
          this.dom.handDisplayP1.innerHTML = '<span class="hand-placeholder">🔒</span>';
          this.dom.choiceNameP1.textContent = 'Locked in!';
          this.dom.choicePromptLabel.textContent = "Player 2: Secretly make your pick!";
          this.dom.rpsStatusAvatar.innerHTML = '🍼';
          this.dom.rpsStatusText.textContent = "Player 2's turn to pick!";
        } else if (this.rpsTurnWaiting === 2) {
          this.rpsP2Choice = choice;
          this.runRpsShowdown(2);
        }
        return;
      }

      // Mode 3: 3 Players Mode
      if (this.rpsMode === '3p') {
        const choices = ['rock', 'paper', 'scissors'];

        if (this.rpsSubMode === '1h2b') {
          // 1 Human + 2 Bots
          this.rpsP1Choice = choice;
          this.rpsP2Choice = choices[Math.floor(Math.random() * choices.length)];
          this.rpsP3Choice = choices[Math.floor(Math.random() * choices.length)];
          this.runRpsShowdown(3);
        } else if (this.rpsSubMode === '3h') {
          // 3 Humans pass & pick
          if (this.rpsTurnWaiting === 1) {
            this.rpsP1Choice = choice;
            this.rpsTurnWaiting = 2;
            this.dom.handDisplayP1.innerHTML = '<span class="hand-placeholder">🔒</span>';
            this.dom.choiceNameP1.textContent = 'Locked in!';
            this.dom.choicePromptLabel.textContent = "Player 2: Pick secretly!";
            this.dom.rpsStatusText.textContent = "Player 2's secret pick!";
          } else if (this.rpsTurnWaiting === 2) {
            this.rpsP2Choice = choice;
            this.rpsTurnWaiting = 3;
            this.dom.handDisplayP2.innerHTML = '<span class="hand-placeholder">🔒</span>';
            this.dom.choiceNameP2.textContent = 'Locked in!';
            this.dom.choicePromptLabel.textContent = "Player 3: Pick secretly!";
            this.dom.rpsStatusText.textContent = "Player 3's secret pick!";
          } else if (this.rpsTurnWaiting === 3) {
            this.rpsP3Choice = choice;
            this.runRpsShowdown(3);
          }
        } else if (this.rpsSubMode === '2h1b') {
          // 2 Humans + 1 Bot
          if (this.rpsTurnWaiting === 1) {
            this.rpsP1Choice = choice;
            this.rpsTurnWaiting = 2;
            this.dom.handDisplayP1.innerHTML = '<span class="hand-placeholder">🔒</span>';
            this.dom.choiceNameP1.textContent = 'Locked in!';
            this.dom.choicePromptLabel.textContent = "Player 2: Pick secretly!";
            this.dom.rpsStatusText.textContent = "Player 2's secret pick!";
          } else if (this.rpsTurnWaiting === 2) {
            this.rpsP2Choice = choice;
            this.rpsP3Choice = choices[Math.floor(Math.random() * choices.length)];
            this.runRpsShowdown(3);
          }
        }
      }
    }

    runRpsShowdown(playerCount) {
      this.rpsIsAnimating = true;
      this.dom.choiceButtons.forEach(btn => btn.disabled = true);
      this.dom.choicePromptLabel.textContent = 'SHOOTING...';

      // Countdown: 3, 2, 1, SHOOT!
      const steps = ['3...', '2...', '1...', 'SHOOT!'];
      let stepIdx = 0;

      const countdownInterval = setInterval(() => {
        if (stepIdx < steps.length) {
          this.dom.rpsCountdown.textContent = steps[stepIdx];
          this.sound.playShoot();

          // Shake hands
          this.dom.handDisplayP1.innerHTML = '✊';
          this.dom.handDisplayP2.innerHTML = '✊';
          if (playerCount === 3) {
            this.dom.handDisplayP3.innerHTML = '✊';
          }
          stepIdx++;
        } else {
          clearInterval(countdownInterval);
          this.dom.rpsCountdown.textContent = '';
          this.revealRpsOutcome(playerCount);
        }
      }, 350);
    }

    revealRpsOutcome(playerCount) {
      // Reveal throws
      this.dom.handDisplayP1.innerHTML = RPS_ICONS[this.rpsP1Choice];
      this.dom.choiceNameP1.textContent = RPS_NAMES[this.rpsP1Choice];

      this.dom.handDisplayP2.innerHTML = RPS_ICONS[this.rpsP2Choice];
      this.dom.choiceNameP2.textContent = RPS_NAMES[this.rpsP2Choice];

      if (playerCount === 3) {
        this.dom.handDisplayP3.innerHTML = RPS_ICONS[this.rpsP3Choice];
        this.dom.choiceNameP3.textContent = RPS_NAMES[this.rpsP3Choice];
      }

      // Evaluate 2-Player Match
      if (playerCount === 2) {
        const res = rpsCompare(this.rpsP1Choice, this.rpsP2Choice);
        const nameP1 = this.dom.podiumLabelP1.textContent;
        const nameP2 = this.dom.podiumLabelP2.textContent;

        if (res === 0) {
          // Draw
          this.rpsScores.draw++;
          this.rpsStreak = 0;
          this.sound.playDraw();
          this.dom.rpsStatusAvatar.innerHTML = '🤝';
          this.dom.rpsStatusText.textContent = `Both threw ${RPS_NAMES[this.rpsP1Choice]}! It's a Draw!`;
        } else if (res === 1) {
          // P1 wins
          this.rpsScores.p1++;
          this.rpsStreak++;
          this.dom.rpsPodiumP1.classList.add('winner');
          this.sound.playWin();
          this.confetti.burst(65);
          this.dom.rpsStatusAvatar.innerHTML = '🎉';
          this.dom.rpsStatusText.textContent = `${RPS_NAMES[this.rpsP1Choice]} beats ${RPS_NAMES[this.rpsP2Choice]}! ${nameP1} Wins!`;
        } else {
          // P2 wins
          this.rpsScores.p2++;
          this.rpsStreak = 0;
          this.dom.rpsPodiumP2.classList.add('winner');
          this.sound.playWin();
          this.confetti.burst(65);
          this.dom.rpsStatusAvatar.innerHTML = '🎉';
          this.dom.rpsStatusText.textContent = `${RPS_NAMES[this.rpsP2Choice]} beats ${RPS_NAMES[this.rpsP1Choice]}! ${nameP2} Wins!`;
        }
      }

      // Evaluate 3-Player Match
      if (playerCount === 3) {
        const c1 = this.rpsP1Choice;
        const c2 = this.rpsP2Choice;
        const c3 = this.rpsP3Choice;
        const name1 = this.dom.podiumLabelP1.textContent;
        const name2 = this.dom.podiumLabelP2.textContent;
        const name3 = this.dom.podiumLabelP3.textContent;

        const uniqueChoices = Array.from(new Set([c1, c2, c3]));

        if (uniqueChoices.length === 1) {
          // All 3 picked identical
          this.rpsScores.draw++;
          this.sound.playDraw();
          this.dom.rpsStatusAvatar.innerHTML = '🤝';
          this.dom.rpsStatusText.textContent = `All 3 threw ${RPS_NAMES[c1]}! It's a 3-way Draw!`;
        } else if (uniqueChoices.length === 3) {
          // All 3 picked different (Rock, Paper, Scissors)
          this.rpsScores.draw++;
          this.sound.playDraw();
          this.dom.rpsStatusAvatar.innerHTML = '🤝';
          this.dom.rpsStatusText.textContent = `Rock, Paper & Scissor all appeared! Perfect Draw!`;
        } else {
          // Exactly 2 distinct choices appeared!
          // Find which of the two choices wins
          const [optA, optB] = uniqueChoices;
          const winningOption = rpsCompare(optA, optB) === 1 ? optA : optB;
          const losingOption = winningOption === optA ? optB : optA;

          const winners = [];
          if (c1 === winningOption) {
            winners.push({ id: 1, name: name1 });
            this.rpsScores.p1++;
            this.dom.rpsPodiumP1.classList.add('winner');
          }
          if (c2 === winningOption) {
            winners.push({ id: 2, name: name2 });
            this.rpsScores.p2++;
            this.dom.rpsPodiumP2.classList.add('winner');
          }
          if (c3 === winningOption) {
            winners.push({ id: 3, name: name3 });
            this.rpsScores.p3++;
            this.dom.rpsPodiumP3.classList.add('winner');
          }

          this.sound.playWin();
          this.confetti.burst(75);
          this.dom.rpsStatusAvatar.innerHTML = '🎉';

          const winnerNames = winners.map(w => w.name).join(' & ');
          this.dom.rpsStatusText.textContent = `${RPS_NAMES[winningOption]} beats ${RPS_NAMES[losingOption]}! ${winnerNames} Win!`;
        }
      }

      this.updateRpsScoreboard();
      this.rpsIsAnimating = false;
      this.dom.choiceButtons.forEach(btn => btn.disabled = false);
    }

    // ========================================================================
    // MEMORY MATCH BONUS MINI-GAME
    // ========================================================================
    initMemory() {
      this.dom.memoRestartBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.restartMemory();
      });

      this.dom.memoRestartTopBtn.addEventListener('click', () => {
        this.sound.playClick();
        this.restartMemory();
      });

      this.restartMemory();
    }

    restartMemory() {
      clearInterval(this.memoTimerInterval);
      this.memoSeconds = 0;
      this.memoMoveCount = 0;
      this.memoMatchedCount = 0;
      this.memoFlipped = [];
      this.memoIsLocked = false;

      this.dom.memoMoves.textContent = '0';
      this.dom.memoMatches.textContent = '0 / 8';
      this.dom.memoTimer.textContent = '00:00';

      this.memoTimerInterval = setInterval(() => {
        this.memoSeconds++;
        const mins = String(Math.floor(this.memoSeconds / 60)).padStart(2, '0');
        const secs = String(this.memoSeconds % 60).padStart(2, '0');
        this.dom.memoTimer.textContent = `${mins}:${secs}`;
      }, 1000);

      // 16 cards (8 pairs)
      const deck = [...MEMO_ICONS, ...MEMO_ICONS].sort(() => Math.random() - 0.5);

      this.dom.memoGrid.innerHTML = '';
      deck.forEach((icon, idx) => {
        const card = document.createElement('div');
        card.className = 'memo-card';
        card.dataset.icon = icon;
        card.dataset.index = idx;

        card.innerHTML = `
          <div class="memo-face front">🎀</div>
          <div class="memo-face back">${icon}</div>
        `;

        card.addEventListener('click', () => this.handleMemoCardClick(card));
        this.dom.memoGrid.appendChild(card);
      });
    }

    handleMemoCardClick(card) {
      if (this.memoIsLocked || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
      }

      this.sound.playPop(520);
      card.classList.add('flipped');
      this.memoFlipped.push(card);

      if (this.memoFlipped.length === 2) {
        this.memoMoveCount++;
        this.dom.memoMoves.textContent = this.memoMoveCount;
        this.checkMemoMatch();
      }
    }

    checkMemoMatch() {
      const [cardA, cardB] = this.memoFlipped;
      const isMatch = cardA.dataset.icon === cardB.dataset.icon;

      if (isMatch) {
        this.sound.playWin();
        cardA.classList.add('matched');
        cardB.classList.add('matched');
        this.memoMatchedCount++;
        this.dom.memoMatches.textContent = `${this.memoMatchedCount} / 8`;
        this.memoFlipped = [];

        if (this.memoMatchedCount === 8) {
          clearInterval(this.memoTimerInterval);
          this.confetti.burst(85);
          setTimeout(() => {
            this.openVictoryModal('🧸', 'Memory Master!', `You matched all pairs in ${this.memoMoveCount} moves! 🎉`, 1);
          }, 450);
        }
      } else {
        this.memoIsLocked = true;
        setTimeout(() => {
          cardA.classList.remove('flipped');
          cardB.classList.remove('flipped');
          this.memoFlipped = [];
          this.memoIsLocked = false;
        }, 900);
      }
    }

    // ========================================================================
    // MODAL WINDOWS
    // ========================================================================
    openVictoryModal(avatar, title, message, streak = 0) {
      this.dom.modalAvatar.innerHTML = typeof avatar === 'string' && avatar.includes('<svg') ? avatar : `<span style="font-size:2.8rem">${avatar}</span>`;
      this.dom.modalTitle.textContent = title;
      this.dom.modalMessage.textContent = message;

      if (streak > 1) {
        this.dom.modalStreakBadge.style.display = 'inline-block';
        this.dom.modalStreakText.textContent = `Win Streak: ${streak} in a row! 🔥`;
      } else {
        this.dom.modalStreakBadge.style.display = 'none';
      }

      this.dom.victoryModal.classList.add('active');
      this.dom.victoryModal.setAttribute('aria-hidden', 'false');
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.arcade = new KawaiiArcadeApp();
    });
  } else {
    window.arcade = new KawaiiArcadeApp();
  }
})();
