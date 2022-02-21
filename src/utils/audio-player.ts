import { base } from '../api';

class AudioPlayer {
  static audio: HTMLAudioElement = new Audio();

  static playEffect(src: string): void {
    AudioPlayer.audio.src = `${base}/${src}`;
    AudioPlayer.audio.play();
  }
}

export { AudioPlayer };
