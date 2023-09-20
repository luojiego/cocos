import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioCtrl')
export class AudioCtrl extends Component {
    @property({
        type: [AudioClip],
        tooltip: "place audio clip here"
    })
    public clip: AudioClip[] = [];

    @property({
        type: AudioSource,
        tooltip: "place audio node here"
    })
    public audioSource: AudioSource;

    onAudioQueue(index:number) {
        if (index < this.clip.length) {
            const clip : AudioClip = this.clip[index];
            this.audioSource.playOneShot(clip);
        }
    }
}

