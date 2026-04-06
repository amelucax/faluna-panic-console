(function () {
  function showBootError(message) {
    const node = document.getElementById("boot-error");
    if (!node) {
      return;
    }
    node.style.display = "block";
    node.textContent = `Faluna boot error:
${message}`;
  }

  window.addEventListener("error", (event) => {
    const detail = event.error && event.error.stack
      ? event.error.stack
      : `${event.message} @ ${event.filename || "unknown"}:${event.lineno || 0}:${event.colno || 0}`;
    showBootError(detail);
  });

  const GAME_DURATION = 60;
  const STARTING_STABILITY = 100;
  const GAME_LOOP_MS = 100;
  const MESSAGE_ROTATE_MS = 2800;
  const COMBO_WINDOW_MS = 2500;
  const TUTORIAL_TIMEOUT_MS = 15000;
  const BEST_SCORE_STORAGE_KEY = "faluna_panic_console_best_score";
  const LANGUAGE_STORAGE_KEY = "faluna_panic_console_lang";
  const LANG = {
    en: {
      title: "Faluna: Panic Console",
      eyebrow: "Faluna Emergency Ops",
      versionTag: "v1.2 Pre-Release Polish Update",
      homePanelLabel: "Console Ready",
      homeHeadline: "Push the unstable anomaly flood back.",
      subtitle: "Survive the system for 60 seconds.",
      homeDescription: "Keep clearing anomalies for 60 seconds, protect system stability, and hold the line through the final surge.",
      start: "Start",
      replay: "Play Again",
      back: "Back to Menu",
      bestScore: "BEST SCORE",
      homeTip: "Click anomaly cards to resolve them",
      ruleNormal: "Normal anomaly: one click, steady cleanup",
      ruleUrgent: "Urgent anomaly: shorter lifetime, higher priority",
      ruleStubborn: "Stubborn anomaly: needs two hits, stronger payoff",
      timer: "Time",
      score: "Score",
      combo: "Streak",
      comboIdle: "Keep your pace",
      comboChain: "Chain restored",
      comboBoost: "Multiplier up",
      comboBurst: "Rhythm burst",
      stability: "Stability",
      anomalyPanelLabel: "Live Incident Board",
      anomalyZone: "Anomaly Zone",
      falunaGuidance: "Faluna Guidance",
      resultPanelLabel: "Session Report",
      missionComplete: "MISSION COMPLETE",
      systemCollapse: "SYSTEM FAILURE",
      successSummary: "You held the console together for the full 60 seconds.",
      failureSummary: "Stability hit zero and the anomaly wave broke through.",
      finalScore: "Final Score",
      maxCombo: "Best Streak",
      resolvedCount: "Resolved",
      missedCount: "Missed",
      historicalBest: "Best Score",
      newRecord: "NEW RECORD",
      finalSurgeBanner: "FINAL SURGE",
      finalSurgeResult: "Final Surge survived",
      phase1: "Phase 1 / Calibration",
      phase2: "Phase 2 / Escalation",
      phase3: "Phase 3 / Overload",
      surgePhase: "Final Surge / Critical Zone",
      debug: "DEBUG",
      debugStandby: "Debug standby.",
      debugEnabled: "Debug on. Overlay layers ignore pointer events.",
      tutorialLabel: "Faluna Tutorial",
      tutorialContinue: "Continue",
      tutorialStep1: "This is an anomaly. Click it to resolve it.",
      tutorialStep2: "Good. Unresolved anomalies will reduce stability.",
      tutorialStep3: "If stability hits zero, the system collapses.",
      tutorialAfterHit: "Good. That counts as a successful resolve.",
      tutorialMissLead: "Now I'll let one through on purpose.",
      tutorialReady: "Do one run first. I'll guide you.",
      tutorialDone: "You understand the basics. Take over.",
      tutorialMissed: "See that? Stability already dropped.",
      phaseIntro: "Main wave starting. Hold that pace.",
      tutorialAnomalyName: "Training Anomaly",
      demoAnomalyName: "Demo Anomaly",
      warmupAnomalyName: "Warmup Anomaly",
      anomalyNormal: "Normal Anomaly",
      anomalyUrgent: "Urgent Anomaly",
      anomalyStubborn: "Stubborn Anomaly",
      actionNormal: "Tap to resolve",
      actionUrgent: "Lock it down",
      actionStubborn: "Hit twice",
      durability: "Durability",
      hpShort: "HP",
      hitUnit: "HIT",
      gradeS: "S / Stable Control",
      gradeA: "A / Emergency Response",
      gradeB: "B / Barely Held",
      gradeC: "C / Narrow Finish",
      gradeFail: "System Failure"
    },
    zh: {
      title: "Faluna: Panic Console",
      eyebrow: "Faluna 緊急應變控制台",
      versionTag: "v1.2 上架前拋光更新",
      homePanelLabel: "控制台就緒",
      homeHeadline: "把即將失控的異常浪潮壓回去。",
      subtitle: "在 60 秒內撐住失控的系統。",
      homeDescription: "在 60 秒內持續清除異常、維持系統穩定度，並撐過最後的壓力爆發。",
      start: "開始遊戲",
      replay: "再玩一次",
      back: "返回首頁",
      bestScore: "最高分",
      homeTip: "點擊異常卡片進行處理",
      ruleNormal: "一般異常：點一下即可處理",
      ruleUrgent: "緊急異常：存活更短，優先處理",
      ruleStubborn: "頑固異常：需要兩次命中，回報更高",
      timer: "倒數",
      score: "分數",
      combo: "連擊",
      comboIdle: "維持節奏",
      comboChain: "連擊重啟",
      comboBoost: "倍率提升",
      comboBurst: "節奏爆發",
      stability: "穩定度",
      anomalyPanelLabel: "即時異常面板",
      anomalyZone: "異常處理區",
      falunaGuidance: "Faluna 指引",
      resultPanelLabel: "結算報告",
      missionComplete: "任務完成",
      systemCollapse: "系統崩潰",
      successSummary: "你成功撐過了完整的 60 秒。",
      failureSummary: "穩定度歸零，異常浪潮突破了防線。",
      finalScore: "最終分數",
      maxCombo: "最高連擊",
      resolvedCount: "處理事件數",
      missedCount: "漏掉事件數",
      historicalBest: "歷史最高分",
      newRecord: "新紀錄！",
      finalSurgeBanner: "最終壓力區",
      finalSurgeResult: "成功撐過 Final Surge",
      phase1: "Phase 1 / 校準期",
      phase2: "Phase 2 / 升溫期",
      phase3: "Phase 3 / 過載期",
      surgePhase: "Final Surge / 極限壓力區",
      debug: "除錯",
      debugStandby: "除錯待命中。",
      debugEnabled: "除錯已啟用。覆蓋層已忽略指標事件。",
      tutorialLabel: "Faluna 教學",
      tutorialContinue: "繼續",
      tutorialStep1: "這是異常，點擊它來處理。",
      tutorialStep2: "很好，異常沒有處理會降低穩定度。",
      tutorialStep3: "穩定度歸零，系統就會崩潰。",
      tutorialAfterHit: "很好，這樣就算成功處理。",
      tutorialMissLead: "接下來我故意漏一個給你看。",
      tutorialReady: "先做一次，我會跟著你。",
      tutorialDone: "懂規則了，正式接管吧。",
      tutorialMissed: "看到了嗎，穩定度已經下降。",
      phaseIntro: "正式波次開始，維持這個節奏。",
      tutorialAnomalyName: "教學異常",
      demoAnomalyName: "示範用異常",
      warmupAnomalyName: "暖機異常",
      anomalyNormal: "一般異常",
      anomalyUrgent: "緊急異常",
      anomalyStubborn: "頑固異常",
      actionNormal: "點擊處理",
      actionUrgent: "立即鎖定",
      actionStubborn: "命中兩次",
      durability: "耐久",
      hpShort: "耐久",
      hitUnit: "HIT",
      gradeS: "S / 穩定控制",
      gradeA: "A / 緊急應對",
      gradeB: "B / 勉強守住",
      gradeC: "C / 驚險過關",
      gradeFail: "系統崩潰"
    }
  };

  const FALUNA_TEXT = {
    en: {
      normal: [
        "System conditions are still controllable.",
        "Anomaly volume is rising. Keep your pace.",
        "Monitoring values remain within tolerance.",
        "Stabilize your cleanup rhythm."
      ],
      pressure: [
        "Anomalies are stacking too fast. Prioritize urgent targets.",
        "Load is approaching a dangerous range.",
        "Don't let the board overflow.",
        "The mid-game pressure is ramping up."
      ],
      danger: [
        "Warning. Critical state approaching.",
        "A few more misses and we lose control.",
        "Stability is dropping fast.",
        "Don't let red anomalies live too long."
      ],
      combo: [
        "Good rhythm. Keep going.",
        "Your response tempo is holding.",
        "You're pulling this wave back.",
        "Clean work. Maintain it."
      ],
      surge: [
        "Final stretch. Hold the line.",
        "The anomaly wave is intensifying.",
        "Just a little longer. Keep steady.",
        "Final pressure zone. Prioritize high-risk events."
      ],
      fail: [
        "Stability has reached zero. Control is lost.",
        "The anomaly wave has broken through.",
        "Damage exceeded the safe threshold.",
        "The console has fallen."
      ],
      miss: [
        "One slipped through. Patch the gap.",
        "Stability took a hit. Pressure is building.",
        "Mistakes make the next wave harder."
      ]
    },
    zh: {
      normal: [
        "目前仍可控制。",
        "事件量正在上升，請保持節奏。",
        "監測數值仍在容許範圍內。",
        "維持你的清理節奏。"
      ],
      pressure: [
        "異常堆積過快，請優先處理緊急事件。",
        "負載已接近危險區間。",
        "別讓面板被異常塞滿。",
        "中段壓力正在快速升高。"
      ],
      danger: [
        "警告，系統接近崩潰。",
        "再漏掉幾個事件就守不住了。",
        "穩定度正在快速下降。",
        "不要讓紅色異常存活太久。"
      ],
      combo: [
        "很好，繼續保持。",
        "你的處理節奏很穩。",
        "你正在把這波壓回去。",
        "處理得很乾淨，繼續。"
      ],
      surge: [
        "最後階段，撐住。",
        "異常浪潮正在加劇。",
        "只差一點，穩住節奏。",
        "最終壓力區，請優先處理高風險事件。"
      ],
      fail: [
        "穩定度歸零，控制失效。",
        "異常浪潮已突破防線。",
        "損害已超過安全閾值。",
        "控制台已失守。"
      ],
      miss: [
        "有一個漏掉了，立刻補上。",
        "穩定度受損，壓力正在堆高。",
        "失誤會讓下一波更難處理。"
      ]
    }
  };

  const ANOMALY_TYPES = {
    normal: {
      label: "Normal Anomaly",
      className: "normal",
      hp: 1,
      lifetime: 3200,
      reward: 100,
      penalty: 10,
      actionText: "Tap to resolve"
    },
    urgent: {
      label: "Urgent Anomaly",
      className: "urgent",
      hp: 1,
      lifetime: 1700,
      reward: 150,
      penalty: 15,
      actionText: "Lock it down"
    },
    stubborn: {
      label: "Stubborn Anomaly",
      className: "stubborn",
      hp: 2,
      lifetime: 3600,
      reward: 200,
      penalty: 20,
      actionText: "Hit twice"
    }
  };

  const ANOMALY_NAMES = {
    en: {
      normal: ["Cache Drift", "Queue Noise", "Signal Jitter", "Route Error", "Port Surge"],
      urgent: ["Core Breach", "Thermal Spike", "Critical Alert", "Shield Tear"],
      stubborn: ["Locked Cluster", "Fortified Loop", "Reinforced Node", "Pinned Echo"]
    },
    zh: {
      normal: ["快取漂移", "佇列雜訊", "訊號抖動", "路由錯位", "連接埠湧流"],
      urgent: ["核心破口", "熱峰暴衝", "臨界警報", "護盾撕裂"],
      stubborn: ["鎖死叢集", "強化迴路", "加固節點", "釘住回聲"]
    }
  };

  const DIFFICULTY_PHASES = [
    {
      key: "phase1",
      label: "Phase 1 / Calibration",
      range: [0, 15],
      spawnRange: [1100, 1300],
      maxAnomalies: 3,
      weights: { normal: 0.7, urgent: 0.15, stubborn: 0.15 }
    },
    {
      key: "phase2",
      label: "Phase 2 / Escalation",
      range: [16, 40],
      spawnRange: [700, 950],
      maxAnomalies: 5,
      weights: { normal: 0.52, urgent: 0.28, stubborn: 0.2 }
    },
    {
      key: "phase3",
      label: "Phase 3 / Overload",
      range: [41, 60],
      spawnRange: [450, 650],
      maxAnomalies: 7,
      weights: { normal: 0.37, urgent: 0.43, stubborn: 0.2 }
    }
  ];
  const audioManager = {
    hooks: {
      success: null,
      urgentSuccess: null,
      miss: null,
      comboUp: null,
      gameOver: null
    },
    play(eventName) {
      const handler = this.hooks[eventName];
      if (typeof handler === "function") {
        handler();
      }
    }
  };

  const elements = {
    appShell: document.getElementById("app-shell"),
    screenFrame: document.getElementById("screen-frame"),
    damageOverlay: document.getElementById("damage-overlay"),
    feedbackLayer: document.getElementById("feedback-layer"),
    tutorialOverlay: document.getElementById("tutorial-overlay"),
    tutorialPanelLabel: document.getElementById("tutorial-panel-label"),
    tutorialText: document.getElementById("tutorial-text"),
    tutorialContinueButton: document.getElementById("tutorial-continue-button"),
    homeScreen: document.getElementById("home-screen"),
    gameScreen: document.getElementById("game-screen"),
    resultScreen: document.getElementById("result-screen"),
    startButton: document.getElementById("start-button"),
    restartButton: document.getElementById("restart-button"),
    homeButton: document.getElementById("home-button"),
    topEyebrow: document.getElementById("top-eyebrow"),
    versionPill: document.getElementById("version-pill"),
    gameTitle: document.getElementById("game-title"),
    homePanelLabel: document.getElementById("home-panel-label"),
    homeHeadline: document.getElementById("home-headline"),
    homeSubtitle: document.getElementById("home-subtitle"),
    homeDescription: document.getElementById("home-description"),
    bestScoreLabel: document.getElementById("best-score-label"),
    homeTip: document.getElementById("home-tip"),
    ruleNormal: document.getElementById("rule-normal"),
    ruleUrgent: document.getElementById("rule-urgent"),
    ruleStubborn: document.getElementById("rule-stubborn"),
    langEn: document.getElementById("lang-en"),
    langZh: document.getElementById("lang-zh"),
    timerLabel: document.getElementById("timer-label"),
    scoreLabel: document.getElementById("score-label"),
    comboLabel: document.getElementById("combo-label"),
    timerDisplay: document.getElementById("timer-display"),
    scoreDisplay: document.getElementById("score-display"),
    comboDisplay: document.getElementById("combo-display"),
    comboMultiplier: document.getElementById("combo-multiplier"),
    comboCaption: document.getElementById("combo-caption"),
    comboCard: document.getElementById("combo-card"),
    debugToggle: document.getElementById("debug-toggle"),
    finalSurgeBanner: document.getElementById("final-surge-banner"),
    phaseDisplay: document.getElementById("phase-display"),
    stabilityLabel: document.getElementById("stability-label"),
    stabilityDisplay: document.getElementById("stability-display"),
    stabilityFill: document.getElementById("stability-fill"),
    stabilityCard: document.querySelector(".stability-card"),
    timerCard: document.querySelector(".timer-card"),
    scoreCard: document.querySelector(".score-card"),
    anomalyPanelLabel: document.getElementById("anomaly-panel-label"),
    anomalyZoneTitle: document.getElementById("anomaly-zone-title"),
    anomalyArea: document.getElementById("anomaly-area"),
    falunaPanel: document.querySelector(".faluna-panel"),
    falunaAvatarShell: document.getElementById("faluna-avatar-shell"),
    falunaAvatarImage: document.getElementById("faluna-avatar-image"),
    falunaGuidanceLabel: document.getElementById("faluna-guidance-label"),
    falunaMessage: document.getElementById("faluna-message"),
    debugLog: document.getElementById("debug-log"),
    bestScoreDisplay: document.getElementById("best-score-display"),
    homeBestScore: document.getElementById("home-best-score"),
    resultPanelLabel: document.getElementById("result-panel-label"),
    resultTitle: document.getElementById("result-title"),
    resultSummary: document.getElementById("result-summary"),
    finalScoreLabel: document.getElementById("final-score-label"),
    finalScoreDisplay: document.getElementById("final-score-display"),
    resultGrade: document.getElementById("result-grade"),
    newRecordBadge: document.getElementById("new-record-badge"),
    resultBestScoreDisplay: document.getElementById("result-best-score-display"),
    resultBestScoreCard: document.getElementById("result-best-score-card"),
    resultBestScoreLabel: document.getElementById("result-best-score-label"),
    maxComboLabel: document.getElementById("max-combo-label"),
    maxComboDisplay: document.getElementById("max-combo-display"),
    resolvedCountLabel: document.getElementById("resolved-count-label"),
    resolvedCountDisplay: document.getElementById("resolved-count-display"),
    missedCountLabel: document.getElementById("missed-count-label"),
    missedCountDisplay: document.getElementById("missed-count-display"),
    finalSurgeResult: document.getElementById("final-surge-result")
  };

  const gameState = {
    screen: "home",
    isRunning: false,
    isTutorial: false,
    tutorialStep: 0,
    tutorialTextKey: null,
    hasSeenTutorial: false,
    debugMode: false,
    currentLang: "en",
    lastResult: null,
    score: 0,
    displayedScore: 0,
    stability: STARTING_STABILITY,
    timeLeft: GAME_DURATION,
    anomalies: [],
    nextSpawnAt: 0,
    messageCooldownAt: 0,
    currentPhase: DIFFICULTY_PHASES[0].key,
    tutorialTargetId: null,
    openingWave: {
      active: false,
      startAt: 0,
      activeUntil: 0,
      nextIndex: 0,
      schedule: [0, 850, 1700]
    },
    finalSurge: {
      active: false,
      survived: false
    },
    bestScore: null,
    isNewRecord: false,
    stats: {
      resolved: 0,
      missed: 0
    },
    timers: {
      loop: null,
      countdown: null,
      tutorial: null
    }
  };

  function t(key) {
    const copy = LANG[gameState.currentLang] || LANG.en;
    return copy[key] || key;
  }

  function getNumberLocale() {
    return gameState.currentLang === "zh" ? "zh-Hant-TW" : "en-US";
  }

  const comboManager = {
    state: {
      streak: 0,
      maxStreak: 0,
      lastSuccessAt: 0,
      multiplier: 1
    },

    reset() {
      this.state.streak = 0;
      this.state.maxStreak = 0;
      this.state.lastSuccessAt = 0;
      this.state.multiplier = 1;
    },

    getMultiplier() {
      if (this.state.streak >= 8) {
        return 1.2;
      }
      if (this.state.streak >= 5) {
        return 1.1;
      }
      return 1;
    },

    registerSuccess() {
      const now = Date.now();
      if (!this.state.lastSuccessAt || now - this.state.lastSuccessAt > COMBO_WINDOW_MS) {
        this.state.streak = 0;
      }

      const previousMultiplier = this.state.multiplier;
      this.state.streak += 1;
      this.state.lastSuccessAt = now;
      this.state.maxStreak = Math.max(this.state.maxStreak, this.state.streak);
      this.state.multiplier = this.getMultiplier();

      if (this.state.streak === 3 || previousMultiplier !== this.state.multiplier) {
        feedbackManager.showComboToast(this.state.streak, this.state.multiplier);
        uiRenderer.pulse(elements.comboCard, "level-up");
        audioManager.play("comboUp");
      }

      uiRenderer.updateCombo();
      return this.state.multiplier;
    },

    break(reason) {
      const hadCombo = this.state.streak >= 3;
      this.state.streak = 0;
      this.state.lastSuccessAt = 0;
      this.state.multiplier = 1;
      uiRenderer.updateCombo();

      if (hadCombo && reason === "miss") {
        falunaMessageManager.update("miss");
      }
    },

    update() {
      if (!gameState.isRunning || !this.state.lastSuccessAt || this.state.streak === 0) {
        return;
      }

      if (Date.now() - this.state.lastSuccessAt > COMBO_WINDOW_MS) {
        this.break("timeout");
      }
    }
  };

  const scoreManager = {
    loadBestScore() {
      try {
        const raw = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY);
        const parsed = raw ? Number.parseInt(raw, 10) : NaN;
        gameState.bestScore = Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
      } catch (error) {
        gameState.bestScore = gameState.bestScore != null ? gameState.bestScore : null;
      }
    },

    saveBestScore(score) {
      gameState.bestScore = score;
      try {
        window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(score));
      } catch (error) {
        // Fallback to in-memory state only.
      }
    },

    checkNewRecord(finalScore) {
      const hasRecord = typeof gameState.bestScore === "number";
      if (!hasRecord || finalScore > gameState.bestScore) {
        this.saveBestScore(finalScore);
        gameState.isNewRecord = true;
      } else {
        gameState.isNewRecord = false;
      }
    }
  };

  const languageManager = {
    loadLanguage() {
      try {
        const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored && LANG[stored]) {
          gameState.currentLang = stored;
        }
      } catch (error) {
        gameState.currentLang = gameState.currentLang || "en";
      }
    },

    setLanguage(lang) {
      if (!LANG[lang]) {
        return;
      }

      gameState.currentLang = lang;
      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      } catch (error) {
        // Fallback to in-memory only.
      }
      this.renderUI();
    },

      renderUI() {
        const setText = (node, value) => {
          if (node) {
            node.textContent = value;
          }
        };

        document.documentElement.lang = gameState.currentLang === "zh" ? "zh-Hant" : "en";
        document.title = t("title");
        setText(elements.topEyebrow, t("eyebrow"));
        setText(elements.versionPill, t("versionTag"));
        setText(elements.gameTitle, t("title"));
        setText(elements.homePanelLabel, t("homePanelLabel"));
        setText(elements.homeHeadline, t("homeHeadline"));
        setText(elements.homeSubtitle, t("subtitle"));
        setText(elements.homeDescription, t("homeDescription"));
        setText(elements.bestScoreLabel, t("bestScore"));
        setText(elements.startButton, t("start"));
        setText(elements.homeTip, t("homeTip"));
        setText(elements.ruleNormal, t("ruleNormal"));
        setText(elements.ruleUrgent, t("ruleUrgent"));
        setText(elements.ruleStubborn, t("ruleStubborn"));
        setText(elements.timerLabel, t("timer"));
        setText(elements.scoreLabel, t("score"));
        setText(elements.comboLabel, t("combo"));
        setText(elements.stabilityLabel, t("stability"));
        setText(elements.debugToggle, t("debug"));
        setText(elements.anomalyPanelLabel, t("anomalyPanelLabel"));
        setText(elements.anomalyZoneTitle, t("anomalyZone"));
        setText(elements.falunaGuidanceLabel, t("falunaGuidance"));
        setText(elements.resultPanelLabel, t("resultPanelLabel"));
        setText(elements.finalScoreLabel, t("finalScore"));
        setText(elements.maxComboLabel, t("maxCombo"));
        setText(elements.resolvedCountLabel, t("resolvedCount"));
        setText(elements.missedCountLabel, t("missedCount"));
        setText(elements.resultBestScoreLabel, t("historicalBest"));
        setText(elements.restartButton, t("replay"));
        setText(elements.homeButton, t("back"));
        setText(elements.finalSurgeBanner, t("finalSurgeBanner"));
        setText(elements.finalSurgeResult, t("finalSurgeResult"));
        setText(elements.newRecordBadge, t("newRecord"));
        setText(elements.debugLog, t("debugStandby"));
        setText(elements.tutorialPanelLabel, t("tutorialLabel"));
        if (gameState.tutorialTextKey && elements.tutorialText) {
          elements.tutorialText.textContent = t(gameState.tutorialTextKey);
        }
        setText(elements.tutorialContinueButton, t("tutorialContinue"));

        try {
          this.refreshDynamicTexts();
        } catch (error) {
          console.error("renderUI refresh failed", error);
        }

        if (elements.langEn) {
          elements.langEn.classList.toggle("active", gameState.currentLang === "en");
        }
        if (elements.langZh) {
          elements.langZh.classList.toggle("active", gameState.currentLang === "zh");
        }
      },

      refreshDynamicTexts() {
        gameState.anomalies = gameState.anomalies.map((anomaly) => ({
          ...anomaly,
          label:
            anomaly.type === "normal" ? t("anomalyNormal") :
            anomaly.type === "urgent" ? t("anomalyUrgent") :
            t("anomalyStubborn"),
          actionText:
            anomaly.type === "normal" ? t("actionNormal") :
            anomaly.type === "urgent" ? t("actionUrgent") :
            t("actionStubborn")
        }));
        uiRenderer.syncAnomalies();
        uiRenderer.updateCombo();
        difficultyController.updatePhaseUI();
        const falunaPool = difficultyController.isFinalSurgeActive()
          ? "surge"
          : gameState.stability < 30
            ? "danger"
            : comboManager.state.streak >= 3
              ? "combo"
              : gameState.screen === "game" && (gameState.anomalies.length >= Math.max(1, difficultyController.getMaxAnomalies() - 1) || gameState.timeLeft <= 20)
                ? "pressure"
                : "normal";
        falunaMessageManager.update(falunaPool);
        if (gameState.screen === "result" && gameState.lastResult) {
          uiRenderer.showResult(gameState.lastResult);
        }
      }
    };

  const difficultyController = {
    getElapsedSeconds() {
      return GAME_DURATION - gameState.timeLeft;
    },

    isFinalSurgeActive() {
      return gameState.isRunning && gameState.timeLeft <= 10;
    },

    getPhase() {
      const elapsed = this.getElapsedSeconds();
      if (elapsed >= DIFFICULTY_PHASES[2].range[0]) {
        return DIFFICULTY_PHASES[2];
      }
      if (elapsed >= DIFFICULTY_PHASES[1].range[0]) {
        return DIFFICULTY_PHASES[1];
      }
      return DIFFICULTY_PHASES[0];
    },

    getSpawnInterval() {
      const phase = this.getPhase();
      const [min, max] = phase.spawnRange;
      let interval = Math.floor(Math.random() * (max - min + 1)) + min;
      if (this.isFinalSurgeActive()) {
        interval = Math.max(280, Math.floor(interval * 0.75));
      }
      return interval;
    },

    getMaxAnomalies() {
      return this.getPhase().maxAnomalies + (this.isFinalSurgeActive() ? 1 : 0);
    },

    pickType() {
      const weights = { ...this.getPhase().weights };
      if (this.isFinalSurgeActive()) {
        weights.urgent *= 1.5;
      }

      const total = Object.values(weights).reduce((sum, value) => sum + value, 0);
      const roll = Math.random() * total;
      let cursor = 0;

      for (const typeKey of Object.keys(weights)) {
        cursor += weights[typeKey];
        if (roll <= cursor) {
          return typeKey;
        }
      }

      return "normal";
    },

    updatePhaseUI() {
      const phase = this.getPhase();
      gameState.currentPhase = phase.key;
      const finalSurge = this.isFinalSurgeActive();
      if (!finalSurge) {
        elements.phaseDisplay.textContent =
          phase.key === "phase1" ? t("phase1") :
          phase.key === "phase2" ? t("phase2") :
          t("phase3");
      } else {
        elements.phaseDisplay.textContent = t("surgePhase");
      }
      elements.phaseDisplay.classList.toggle("phase-3", phase.key === "phase3" || finalSurge);
      elements.finalSurgeBanner.classList.toggle("hidden", !finalSurge);
      elements.timerCard.classList.toggle("final-surge", finalSurge);
      elements.screenFrame.classList.toggle("final-surge-active", finalSurge);

      if (finalSurge && !gameState.finalSurge.active) {
        gameState.finalSurge.active = true;
        falunaMessageManager.update("surge");
      }
    }
  };

  const feedbackManager = {
    floatingNodes: [],

    clear() {
      elements.feedbackLayer.innerHTML = "";
      this.floatingNodes = [];
    },

    pulseDamage() {
      elements.damageOverlay.classList.remove("active");
      elements.screenFrame.classList.remove("shake");
      void elements.damageOverlay.offsetWidth;
      elements.damageOverlay.classList.add("active");
      elements.screenFrame.classList.add("shake");
      window.setTimeout(() => {
        elements.damageOverlay.classList.remove("active");
        elements.screenFrame.classList.remove("shake");
      }, 280);
    },

    showFloatingScore(text, x, y, type) {
      const node = document.createElement("div");
      node.className = `floating-score ${type}`;
      node.textContent = text;
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      elements.feedbackLayer.appendChild(node);

      window.setTimeout(() => {
        node.remove();
      }, 760);
    },

    showComboToast(streak, multiplier) {
      const node = document.createElement("div");
      node.className = "combo-toast";
      node.textContent = multiplier > 1 ? `${streak} STREAK  x${multiplier.toFixed(1)}` : `${streak} STREAK`;
      elements.feedbackLayer.appendChild(node);

      window.setTimeout(() => {
        node.remove();
      }, 640);
    }
  };

  const debugManager = {
    setEnabled(enabled) {
      gameState.debugMode = enabled;
      elements.debugToggle.classList.toggle("active", enabled);
      elements.debugToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
      elements.anomalyArea.classList.toggle("debug-mode", enabled);
      elements.debugLog.classList.toggle("hidden", !enabled);
      elements.debugLog.textContent = t("debugStandby");
      if (enabled) {
        this.log(t("debugEnabled"));
      }
    },

    toggle() {
      this.setEnabled(!gameState.debugMode);
    },

    log(message) {
      if (!gameState.debugMode) {
        return;
      }

      elements.debugLog.textContent = `[debug] ${message}`;
    }
  };

  const tutorialManager = {
    start() {
      gameController.resetState();
      gameState.isTutorial = true;
      gameState.tutorialStep = 1;
      uiRenderer.showScreen("game");
      uiRenderer.updateHud();
      uiRenderer.updateCombo();
      difficultyController.updatePhaseUI();
      this.showOverlay("tutorialStep1", false);
      falunaMessageManager.set(t("tutorialReady"), "normal");

      const anomaly = anomalyManager.spawnScripted({
        type: "normal",
        name: t("tutorialAnomalyName"),
        x: Math.max(24, Math.floor(elements.anomalyArea.clientWidth / 2) - 84),
        y: Math.max(24, Math.floor(elements.anomalyArea.clientHeight / 2) - 54),
        lifetime: 8000,
        tutorialFocus: true
      });

      gameState.tutorialTargetId = anomaly.id;
      gameState.timers.tutorial = window.setTimeout(() => {
        if (gameState.isTutorial) {
          this.finish();
        }
      }, TUTORIAL_TIMEOUT_MS);
    },

    showOverlay(textKey, showButton) {
      gameState.tutorialTextKey = textKey;
      elements.tutorialOverlay.classList.remove("hidden");
      elements.tutorialText.textContent = t(textKey);
      elements.tutorialContinueButton.classList.toggle("hidden", !showButton);
    },

    hideOverlay() {
      elements.tutorialOverlay.classList.add("hidden");
      elements.tutorialContinueButton.classList.add("hidden");
      gameState.tutorialTextKey = null;
    },

    handleResolved(anomalyId) {
      if (!gameState.isTutorial || gameState.tutorialStep !== 1 || anomalyId !== gameState.tutorialTargetId) {
        return;
      }

      gameState.tutorialStep = 2;
      gameState.tutorialTargetId = null;
      this.showOverlay("tutorialStep2", false);
      falunaMessageManager.set(t("tutorialMissLead"), "pressure");

      const anomaly = anomalyManager.spawnScripted({
        type: "urgent",
        name: t("demoAnomalyName"),
        x: Math.max(24, Math.floor(elements.anomalyArea.clientWidth / 2) - 84),
        y: Math.max(24, Math.floor(elements.anomalyArea.clientHeight / 2) - 54),
        lifetime: 5000,
        locked: true
      });

      gameState.tutorialTargetId = anomaly.id;

      window.setTimeout(() => {
        if (gameState.isTutorial && gameState.tutorialStep === 2) {
          anomalyManager.fail(anomaly.id, anomaly.penalty, { tutorial: true });
          this.advanceToFinalStep();
        }
      }, 1400);
    },

    advanceToFinalStep() {
      gameState.tutorialStep = 3;
      this.showOverlay("tutorialStep3", true);
      falunaMessageManager.set(t("tutorialDone"), "danger");
    },

    finish() {
      window.clearTimeout(gameState.timers.tutorial);
      gameState.timers.tutorial = null;
      this.hideOverlay();
      gameState.isTutorial = false;
      gameState.hasSeenTutorial = true;
      gameState.tutorialStep = 0;
      gameState.tutorialTargetId = null;
      gameController.startCoreGame();
    }
  };

  const uiRenderer = {
    showScreen(screenName) {
      gameState.screen = screenName;
      elements.homeScreen.classList.toggle("active", screenName === "home");
      elements.gameScreen.classList.toggle("active", screenName === "game");
      elements.resultScreen.classList.toggle("active", screenName === "result");
      elements.screenFrame.classList.toggle("game-mode", screenName === "game");
      elements.appShell.classList.toggle("game-active", screenName === "game");
    },

    pulse(element, extraClass) {
      if (!element) {
        return;
      }

      element.classList.remove("pulse");
      if (extraClass) {
        element.classList.remove(extraClass);
      }
      void element.offsetWidth;
      element.classList.add("pulse");
      if (extraClass) {
        element.classList.add(extraClass);
        window.setTimeout(() => element.classList.remove(extraClass), 320);
      }
      window.setTimeout(() => element.classList.remove("pulse"), 260);
    },

    flashRecord() {
      elements.homeBestScore.classList.remove("record-glow");
      elements.resultBestScoreCard.classList.remove("record-glow");
      void elements.homeBestScore.offsetWidth;
      elements.homeBestScore.classList.add("record-glow");
      elements.resultBestScoreCard.classList.add("record-glow");
    },

    updateBestScoreUI() {
      const text = typeof gameState.bestScore === "number" ? gameState.bestScore.toLocaleString(getNumberLocale()) : "--";
      elements.bestScoreDisplay.textContent = text;
      elements.resultBestScoreDisplay.textContent = text;
    },

    updateHud() {
      const targetScore = gameState.score;
      const scoreDelta = targetScore - gameState.displayedScore;
      if (scoreDelta > 0) {
        gameState.displayedScore += Math.max(1, Math.ceil(scoreDelta * 0.18));
      } else if (scoreDelta < 0) {
        gameState.displayedScore = targetScore;
      }

      if (Math.abs(targetScore - gameState.displayedScore) <= 2) {
        gameState.displayedScore = targetScore;
      }

      elements.timerDisplay.textContent = String(gameState.timeLeft);
      elements.scoreDisplay.textContent = gameState.displayedScore.toLocaleString(getNumberLocale());
      elements.stabilityDisplay.textContent = `${Math.max(0, gameState.stability)}%`;
      elements.stabilityFill.style.width = `${Math.max(0, gameState.stability)}%`;

      const isWarning = gameState.stability < 60 && gameState.stability >= 30;
      const isDanger = gameState.stability < 30;

      elements.stabilityFill.classList.toggle("warning", isWarning);
      elements.stabilityFill.classList.toggle("danger", isDanger);
      elements.stabilityFill.classList.toggle("critical", isDanger);
      elements.stabilityCard.classList.toggle("warning", isDanger);
      elements.timerCard.classList.toggle("warning", isDanger);
      elements.scoreCard.classList.toggle("warning", isDanger);
      elements.comboCard.classList.toggle("warning", isDanger);
      elements.screenFrame.classList.toggle("danger-zone", isDanger);
    },

    updateCombo() {
      const streak = comboManager.state.streak;
      const multiplier = comboManager.state.multiplier;
      elements.comboDisplay.textContent = String(streak);
      elements.comboMultiplier.textContent = `x${multiplier.toFixed(1)}`;
      elements.comboCard.classList.toggle("active", streak >= 3);

      if (streak >= 8) {
        elements.comboCaption.textContent = t("comboBurst");
      } else if (streak >= 5) {
        elements.comboCaption.textContent = t("comboBoost");
      } else if (streak >= 3) {
        elements.comboCaption.textContent = t("comboChain");
      } else {
        elements.comboCaption.textContent = t("comboIdle");
      }
    },

    flashStability() {
      elements.stabilityCard.classList.remove("flash");
      void elements.stabilityCard.offsetWidth;
      elements.stabilityCard.classList.add("flash");
    },

    createAnomalyElement(anomaly) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `anomaly-card ${anomaly.className}`;
      button.dataset.id = anomaly.id;
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        anomalyManager.hit(anomaly.id, button, event);
      });
      button.addEventListener("pointerenter", () => {
        debugManager.log(`hover ${anomaly.id}`);
      });
      elements.anomalyArea.appendChild(button);
      return button;
    },

    renderAnomaly(anomaly) {
      let button = elements.anomalyArea.querySelector(`[data-id="${anomaly.id}"]`);
      if (!button) {
        button = this.createAnomalyElement(anomaly);
      }

      button.style.left = `${anomaly.x}px`;
      button.style.top = `${anomaly.y}px`;
      button.disabled = anomaly.resolving || anomaly.locked;
      button.classList.toggle("tutorial-focus", Boolean(anomaly.tutorialFocus));
      button.classList.toggle("hit-confirm", Boolean(anomaly.hitConfirmUntil && Date.now() < anomaly.hitConfirmUntil));

      const elapsed = Date.now() - anomaly.createdAt;
      const progressRatio = Math.max(0, 1 - elapsed / anomaly.lifetime);
      const remainingHpDots = this.renderStubbornDots(anomaly);
      const actionMarkup = anomaly.type === "stubborn"
        ? `<span class="anomaly-hit-label"><span class="anomaly-hit-badge">${anomaly.hp} ${t("hitUnit")}</span>${remainingHpDots}</span>`
        : anomaly.actionText;

      button.innerHTML = `
        <div class="anomaly-type">
          <span>${anomaly.label}</span>
          <span>${anomaly.type === "stubborn" ? t("durability") : `${t("hpShort")} ${anomaly.hp}/${anomaly.maxHp}`}</span>
        </div>
        <div class="anomaly-name">${anomaly.name}</div>
        <div class="anomaly-meta">
          <span>+${anomaly.reward}</span>
          <span>${actionMarkup}</span>
        </div>
        <div class="anomaly-progress">
          <div class="anomaly-progress-bar" style="transform: scaleX(${progressRatio});"></div>
        </div>
      `;
    },

    renderStubbornDots(anomaly) {
      if (anomaly.type !== "stubborn") {
        return anomaly.actionText;
      }

      let dots = '<span class="stubborn-hits">';
      for (let index = 0; index < anomaly.maxHp; index += 1) {
        const isFilled = index < anomaly.maxHp - anomaly.hp;
        dots += `<span class="stubborn-dot ${isFilled ? "filled" : ""}"></span>`;
      }
      dots += "</span>";
      return dots;
    },

    syncAnomalies() {
      const anomalyIds = new Set(gameState.anomalies.map((anomaly) => anomaly.id));
      const nodes = Array.from(elements.anomalyArea.querySelectorAll(".anomaly-card"));

      nodes.forEach((node) => {
        if (!anomalyIds.has(node.dataset.id)) {
          node.remove();
        }
      });

      gameState.anomalies.forEach((anomaly) => {
        this.renderAnomaly(anomaly);
      });
    },

    playResolveAnimation(anomalyId, type) {
      const node = elements.anomalyArea.querySelector(`[data-id="${anomalyId}"]`);
      if (!node) {
        return;
      }

      node.classList.add("resolve");
      if (type === "urgent") {
        node.classList.add("hit");
      }
    },

    showResult(result) {
      const grade = result === "failure"
        ? t("gradeFail")
        : comboManager.state.maxStreak >= 10 && gameState.stats.missed <= 4
          ? t("gradeS")
          : comboManager.state.maxStreak >= 6 && gameState.stats.missed <= 8
            ? t("gradeA")
            : gameState.stats.missed <= 14
              ? t("gradeB")
              : t("gradeC");

      elements.resultTitle.textContent = result === "success" ? t("missionComplete") : t("systemCollapse");
      elements.resultSummary.textContent =
        result === "success"
          ? t("successSummary")
          : t("failureSummary");
      elements.finalScoreDisplay.textContent = gameState.score.toLocaleString(getNumberLocale());
      elements.resultGrade.textContent = grade;
      elements.newRecordBadge.classList.toggle("hidden", !gameState.isNewRecord);
      elements.finalSurgeResult.classList.toggle("hidden", !(gameState.finalSurge.survived && result === "success"));
      elements.maxComboDisplay.textContent = String(comboManager.state.maxStreak);
      elements.resolvedCountDisplay.textContent = String(gameState.stats.resolved);
      elements.missedCountDisplay.textContent = String(gameState.stats.missed);
      this.updateBestScoreUI();

      if (gameState.isNewRecord) {
        this.flashRecord();
      }
    },

    renderHomeScreenMeta() {
      this.updateBestScoreUI();
    }
  };

  const falunaMessageManager = {
    set(text, tone) {
      elements.falunaMessage.textContent = text;
      elements.falunaPanel.classList.toggle("warning", tone === "pressure" || tone === "surge");
      elements.falunaPanel.classList.toggle("danger", tone === "danger" || tone === "fail" || tone === "miss");
    },

    pick(poolName) {
      const langPool = FALUNA_TEXT[gameState.currentLang] || FALUNA_TEXT.en;
      const pool = langPool[poolName] || langPool.normal;
      return pool[Math.floor(Math.random() * pool.length)];
    },

    update(forcePool) {
      const now = Date.now();
      if (!forcePool && now < gameState.messageCooldownAt) {
        return;
      }

      let poolName = forcePool;
      if (!poolName) {
        if (difficultyController.isFinalSurgeActive()) {
          poolName = "surge";
        } else if (gameState.stability < 30) {
          poolName = "danger";
        } else if (comboManager.state.streak >= 3) {
          poolName = "combo";
        } else if (gameState.anomalies.length >= difficultyController.getMaxAnomalies() - 1 || gameState.timeLeft <= 20) {
          poolName = "pressure";
        } else {
          poolName = "normal";
        }
      }

      this.set(this.pick(poolName), poolName);
      gameState.messageCooldownAt = now + MESSAGE_ROTATE_MS;
    }
  };

  const anomalyManager = {
    spawn() {
      if (!gameState.isRunning || gameState.anomalies.length >= difficultyController.getMaxAnomalies()) {
        return;
      }

      const typeKey = difficultyController.pickType();
      const anomaly = this.buildAnomaly({
        type: typeKey
      });

      gameState.anomalies.push(anomaly);
      uiRenderer.syncAnomalies();
      falunaMessageManager.update();
    },

    spawnScripted(options) {
      const anomaly = this.buildAnomaly(options);
      gameState.anomalies.push(anomaly);
      uiRenderer.syncAnomalies();
      return anomaly;
    },

    buildAnomaly(options) {
      const typeKey = options.type || "normal";
      const config = ANOMALY_TYPES[typeKey];
      const bounds = elements.anomalyArea.getBoundingClientRect();
      const cardWidth = typeKey === "stubborn" ? (window.innerWidth <= 820 ? 168 : 188) : (window.innerWidth <= 820 ? 150 : 168);
      const cardHeight = typeKey === "stubborn" ? 124 : 112;

      return {
        id: `anomaly_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        type: typeKey,
        className: config.className,
        label:
          typeKey === "normal" ? t("anomalyNormal") :
          typeKey === "urgent" ? t("anomalyUrgent") :
          t("anomalyStubborn"),
        name: options.name || this.pickName(typeKey),
        hp: options.hp || config.hp,
        maxHp: options.maxHp || config.hp,
        lifetime: options.lifetime || config.lifetime,
        createdAt: Date.now(),
          reward: options.reward || config.reward,
          penalty: options.penalty || config.penalty,
        actionText:
          typeKey === "normal" ? t("actionNormal") :
          typeKey === "urgent" ? t("actionUrgent") :
          t("actionStubborn"),
          resolving: false,
          locked: Boolean(options.locked),
          tutorialFocus: Boolean(options.tutorialFocus),
          hitConfirmUntil: 0,
          pointerHandledAt: null,
          x: options.x != null ? options.x : this.randomBetween(20, Math.max(20, Math.floor(bounds.width - cardWidth - 20))),
          y: options.y != null ? options.y : this.randomBetween(20, Math.max(20, Math.floor(bounds.height - cardHeight - 20)))
        };
      },

    update() {
      const now = Date.now();
      const expired = gameState.anomalies.filter((anomaly) => !anomaly.resolving && now - anomaly.createdAt >= anomaly.lifetime);
      expired.forEach((anomaly) => this.fail(anomaly.id, anomaly.penalty));
    },

    hit(anomalyId, element, event) {
      if (!gameState.isRunning && !gameState.isTutorial) {
        return;
      }

      const anomaly = gameState.anomalies.find((item) => item.id === anomalyId);
      if (!anomaly || anomaly.resolving || anomaly.locked) {
        return;
      }

      if (event && anomaly.pointerHandledAt === event.timeStamp) {
        return;
      }

      anomaly.pointerHandledAt = event ? event.timeStamp : Date.now();
      if (event && gameState.debugMode) {
        const topElement = document.elementFromPoint(event.clientX, event.clientY);
        const topClass = topElement ? topElement.className || topElement.tagName : "none";
        debugManager.log(`hit ${anomaly.id} top=${topClass}`);
      }

      anomaly.hp -= 1;
      anomaly.hitConfirmUntil = Date.now() + 140;
      element.classList.add("press", "hit", "hit-confirm");
      window.setTimeout(() => {
        element.classList.remove("press", "hit");
      }, 90);
      window.setTimeout(() => {
        element.classList.remove("hit-confirm");
      }, 150);
      debugManager.log(`hit ${anomaly.id} hp=${anomaly.hp}/${anomaly.maxHp} pointer=${event ? event.pointerType : "n/a"}`);

      if (anomaly.hp <= 0) {
        const frameRect = elements.screenFrame.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        const floatX = rect.left - frameRect.left + rect.width / 2;
        const floatY = rect.top - frameRect.top + rect.height / 2;

        anomaly.resolving = true;
        const multiplier = gameState.isTutorial ? 1 : comboManager.registerSuccess();
        const gainedScore = Math.round(anomaly.reward * multiplier);
        gameState.score += gainedScore;
        gameState.displayedScore = gameState.score;
        if (!gameState.isTutorial) {
          gameState.stats.resolved += 1;
        }
        uiRenderer.playResolveAnimation(anomaly.id, anomaly.type);
        feedbackManager.showFloatingScore(`+${gainedScore}`, floatX, floatY, anomaly.type);
        uiRenderer.pulse(elements.scoreCard, "pop");
        if (gameState.isTutorial) {
          falunaMessageManager.set(t("tutorialAfterHit"), "combo");
        } else {
          falunaMessageManager.update(comboManager.state.streak >= 3 ? "combo" : "normal");
        }
        audioManager.play(anomaly.type === "urgent" ? "urgentSuccess" : "success");

        window.setTimeout(() => {
          this.remove(anomalyId);
        }, anomaly.type === "stubborn" ? 220 : 180);

        if (gameState.isTutorial) {
          tutorialManager.handleResolved(anomaly.id);
        }
      } else {
        if (anomaly.type === "stubborn") {
          debugManager.log(`stubborn remain ${anomaly.hp}`);
        }
        uiRenderer.syncAnomalies();
      }

      uiRenderer.updateHud();
    },

    fail(anomalyId, penaltyOverride, options = {}) {
      const anomaly = gameState.anomalies.find((item) => item.id === anomalyId);
      if (!anomaly || anomaly.resolving) {
        return;
      }

      gameState.stability = Math.max(0, gameState.stability - (penaltyOverride || anomaly.penalty));
      if (!gameState.isTutorial || !options.tutorial) {
        gameState.stats.missed += 1;
        comboManager.break("miss");
      }
      audioManager.play("miss");
      feedbackManager.pulseDamage();
      uiRenderer.flashStability();
      this.remove(anomalyId);
      if (gameState.isTutorial || options.tutorial) {
        falunaMessageManager.set(t("tutorialMissed"), "danger");
      } else {
        falunaMessageManager.update(gameState.stability < 30 ? "danger" : "miss");
      }
      uiRenderer.updateHud();

      if (gameState.stability <= 0 && !gameState.isTutorial) {
        gameController.endGame("failure");
      }
    },

    remove(anomalyId) {
      gameState.anomalies = gameState.anomalies.filter((anomaly) => anomaly.id !== anomalyId);
      uiRenderer.syncAnomalies();
    },

    clearAll() {
      gameState.anomalies = [];
      uiRenderer.syncAnomalies();
    },

    pickName(typeKey) {
      const langPool = ANOMALY_NAMES[gameState.currentLang] || ANOMALY_NAMES.en;
      const pool = langPool[typeKey] || ANOMALY_NAMES.en[typeKey];
      return pool[Math.floor(Math.random() * pool.length)];
    },

    randomBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  const gameController = {
    resetState() {
      this.clearTimers();
      gameState.isRunning = false;
      gameState.isTutorial = false;
      gameState.lastResult = null;
      gameState.score = 0;
      gameState.displayedScore = 0;
      gameState.stability = STARTING_STABILITY;
      gameState.timeLeft = GAME_DURATION;
      gameState.nextSpawnAt = 0;
      gameState.messageCooldownAt = 0;
      gameState.currentPhase = DIFFICULTY_PHASES[0].key;
      gameState.tutorialStep = 0;
      gameState.tutorialTextKey = null;
      gameState.tutorialTargetId = null;
      gameState.openingWave.active = false;
      gameState.openingWave.startAt = 0;
      gameState.openingWave.activeUntil = 0;
      gameState.openingWave.nextIndex = 0;
      gameState.finalSurge.active = false;
      gameState.finalSurge.survived = false;
      gameState.isNewRecord = false;
      gameState.stats.resolved = 0;
      gameState.stats.missed = 0;
      comboManager.reset();
      feedbackManager.clear();
      anomalyManager.clearAll();
      tutorialManager.hideOverlay();
      debugManager.setEnabled(gameState.debugMode);
      difficultyController.updatePhaseUI();
      uiRenderer.updateHud();
      uiRenderer.updateCombo();
      uiRenderer.renderHomeScreenMeta();
      falunaMessageManager.set(falunaMessageManager.pick("normal"), "normal");
    },

    startGame() {
      if (!gameState.hasSeenTutorial) {
        tutorialManager.start();
        return;
      }

      this.startCoreGame();
    },

    startCoreGame() {
      this.resetState();
      gameState.isRunning = true;
      uiRenderer.showScreen("game");
      uiRenderer.updateHud();
      uiRenderer.updateCombo();
      difficultyController.updatePhaseUI();
      falunaMessageManager.update("normal");

      gameState.openingWave.active = true;
      gameState.openingWave.startAt = Date.now();
      gameState.openingWave.activeUntil = gameState.openingWave.startAt + 3000;
      gameState.openingWave.nextIndex = 0;
      gameState.nextSpawnAt = gameState.openingWave.activeUntil;

      gameState.timers.loop = window.setInterval(() => {
        this.runLoop();
      }, GAME_LOOP_MS);

      gameState.timers.countdown = window.setInterval(() => {
        gameState.timeLeft -= 1;
        difficultyController.updatePhaseUI();
        uiRenderer.updateHud();

        if (gameState.timeLeft <= 0) {
          gameState.finalSurge.survived = true;
          this.endGame("success");
        } else {
          falunaMessageManager.update();
        }
      }, 1000);
    },

    runLoop() {
      if (!gameState.isRunning) {
        return;
      }

      const now = Date.now();
      comboManager.update();
      anomalyManager.update();
      difficultyController.updatePhaseUI();

      if (gameState.openingWave.active) {
        this.runOpeningWave(now);
      }

      if (now >= gameState.nextSpawnAt) {
        anomalyManager.spawn();
        gameState.nextSpawnAt = now + difficultyController.getSpawnInterval();
      }

      uiRenderer.syncAnomalies();
      uiRenderer.updateHud();
    },

    runOpeningWave(now) {
      const openingWave = gameState.openingWave;

      while (
        openingWave.nextIndex < openingWave.schedule.length &&
        now >= openingWave.startAt + openingWave.schedule[openingWave.nextIndex]
      ) {
        const offset = openingWave.nextIndex - 1;
        anomalyManager.spawnScripted({
          type: "normal",
          lifetime: 4200,
          x: Math.max(24, Math.floor(elements.anomalyArea.clientWidth / 2) - 84 + offset * 140),
          y: Math.max(24, Math.floor(elements.anomalyArea.clientHeight / 2) - 64 + Math.abs(offset) * 28),
          name: `${t("warmupAnomalyName")} ${openingWave.nextIndex + 1}`
        });
        openingWave.nextIndex += 1;
      }

      if (now >= openingWave.activeUntil) {
        openingWave.active = false;
        falunaMessageManager.set(t("phaseIntro"), "combo");
      }
    },

    endGame(result) {
      if (!gameState.isRunning) {
        return;
      }

      gameState.isRunning = false;
      gameState.lastResult = result;
      this.clearTimers();
      anomalyManager.clearAll();
      if (result === "failure") {
        falunaMessageManager.update("fail");
      }
      scoreManager.checkNewRecord(gameState.score);
      audioManager.play("gameOver");
      uiRenderer.showResult(result);
      uiRenderer.showScreen("result");
    },

    backToHome() {
      this.resetState();
      uiRenderer.showScreen("home");
    },

    clearTimers() {
      window.clearInterval(gameState.timers.loop);
      window.clearInterval(gameState.timers.countdown);
      window.clearTimeout(gameState.timers.tutorial);
      gameState.timers.loop = null;
      gameState.timers.countdown = null;
      gameState.timers.tutorial = null;
    }
  };

  function clampAnomalyPosition(anomaly) {
    const maxX = elements.anomalyArea.clientWidth - (anomaly.type === "stubborn" ? (window.innerWidth <= 820 ? 168 : 188) : (window.innerWidth <= 820 ? 150 : 168)) - 20;
    const maxY = elements.anomalyArea.clientHeight - (anomaly.type === "stubborn" ? 124 : 112) - 20;
    return {
      ...anomaly,
      x: Math.max(20, Math.min(anomaly.x, maxX)),
      y: Math.max(20, Math.min(anomaly.y, maxY))
    };
  }

  function bindEvents() {
    const bindButton = (node, handler) => {
      if (!node) {
        return;
      }
      node.onclick = handler;
      node.onpointerdown = null;
      node.onpointerup = null;
    };

    bindButton(elements.startButton, () => gameController.startGame());
    bindButton(elements.restartButton, () => gameController.startGame());
    bindButton(elements.homeButton, () => gameController.backToHome());
    bindButton(elements.tutorialContinueButton, () => tutorialManager.finish());
    bindButton(elements.debugToggle, () => debugManager.toggle());
    bindButton(elements.langEn, () => languageManager.setLanguage("en"));
    bindButton(elements.langZh, () => languageManager.setLanguage("zh"));
    window.addEventListener("resize", () => {
      if (!gameState.isRunning && !gameState.isTutorial) {
        return;
      }

      gameState.anomalies = gameState.anomalies.map((anomaly) => clampAnomalyPosition(anomaly));
      uiRenderer.syncAnomalies();
    });
  }

  function initFalunaAvatar() {
    if (!elements.falunaAvatarShell || !elements.falunaAvatarImage) {
      return;
    }

    const markLoaded = () => {
      elements.falunaAvatarShell.classList.remove("missing");
    };

    const markMissing = () => {
      elements.falunaAvatarShell.classList.add("missing");
    };

    elements.falunaAvatarImage.addEventListener("load", markLoaded);
    elements.falunaAvatarImage.addEventListener("error", markMissing);

    if (elements.falunaAvatarImage.complete && elements.falunaAvatarImage.naturalWidth > 0) {
      markLoaded();
    } else {
      markMissing();
    }
  }

  try {
    scoreManager.loadBestScore();
    languageManager.loadLanguage();
    bindEvents();
    initFalunaAvatar();
    languageManager.renderUI();
    gameController.backToHome();
  } catch (error) {
    showBootError(error && error.stack ? error.stack : String(error));
    throw error;
  }
})();



