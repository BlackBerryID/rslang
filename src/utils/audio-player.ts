import { base } from "../api";

class AudioPlayer {

  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  public playEffect(src: string): void {
    this.audio.src = `${base}/${src}`;
    this.audio.play();
  }
}

export { AudioPlayer }
