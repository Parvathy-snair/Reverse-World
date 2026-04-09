class SoundManager {
  constructor() {
    this.enabled = false;
    this.sounds = {
      open: new Audio('/assets/open.mp3.mpeg'),
      win: new Audio('/assets/win.mp3.mpeg'),
      lose: new Audio('/assets/lose.mp3.mpeg'),
      draw: new Audio('/assets/draw.mp3.mpeg'),
      prank: new Audio('/assets/prank.mp3.mpeg'),
      transition: new Audio('/assets/transition.mp3.mpeg'),
      quit: new Audio('/assets/quit.mp3.mpeg'),
      // Fallbacks if user didn't upload these yet
      pregame: new Audio('/assets/pregame.mp3.mpeg'),
      bg_notif: new Audio('/assets/bg_notif.mp3.mpeg')
    };

    // Preload
    Object.values(this.sounds).forEach(s => {
      s.load();
      s.volume = 0.5;
    });
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopAll();
    }
  }

  play(soundKey) {
    if (!this.enabled || !this.sounds[soundKey]) return;
    const sound = this.sounds[soundKey];
    sound.loop = false;
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Audio play blocked by browser."));
  }

  playLoop(soundKey) {
    if (!this.enabled || !this.sounds[soundKey]) return;
    const sound = this.sounds[soundKey];
    sound.loop = true;
    sound.play().catch(e => console.log("Audio loop blocked by browser."));
  }

  stop(soundKey) {
    if (this.sounds[soundKey]) {
      this.sounds[soundKey].pause();
      this.sounds[soundKey].currentTime = 0;
    }
  }

  stopAll() {
    Object.keys(this.sounds).forEach(key => this.stop(key));
  }

  // Convenience methods
  playOpen() { this.play('open'); }
  playWin() { this.play('win'); }
  playLose() { this.play('lose'); }
  playDraw() { this.play('draw'); }
  
  startPrank() { this.playLoop('prank'); }
  stopPrank() { this.stop('prank'); }
  
  startTransition() { this.playLoop('transition'); }
  stopTransition() { this.stop('transition'); }
  
  startPregame() { this.playLoop('pregame'); }
  stopPregame() { this.stop('pregame'); }
  
  startBGNotif() { this.playLoop('bg_notif'); }
  stopBGNotif() { this.stop('bg_notif'); }
}

export default new SoundManager();
