import { _decorator, CCInteger, Component, director, Node, Contact2DType, Collider2D, IPhysics2DContact, log} from 'cc';
import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

import { PipePool } from './PipePool';
import { AudioCtrl } from './AudioCtrl';

const AudioType = {
    Swoosh: 0,
    Hit: 1,
    Point: 2,
    Die: 3
}

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type: Ground,
        tooltip: 'Ground'
    })
    public ground: Ground;

    @property({
        type: Result,
        tooltip: 'Result'
    })
    public result: Result;

    @property({
        type: Bird,
        tooltip: 'Bird'
    })
    public bird: Bird;

    @property({
        type: PipePool,
        tooltip: 'Pipe Pool'
    })
    public pipeQueue: PipePool;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of the ground'
    })
    public speed: number = 200;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of pipes',
    })
    public pipeSpeed: number = 200;

    @property({
        type: AudioCtrl,
        tooltip: 'Audio Controller'
    })
    public audioCtrl: AudioCtrl;

    private isOver: boolean;

    private lastClickTime: number = 0;

    onLoad() {
        this.initListener();
        this.result.resetScore();
        director.pause();
        // game.pause();
        this.isOver = true;
    }

    initListener() {
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            let currentTime = Date.now();

            // 如果两次点击的时间差小于300毫秒，则不处理
            if (currentTime - this.lastClickTime < 200) {
                // 可以在这里阻止事件的进一步传播，如果需要的话
                log("时间小于 300ms");
                event.stopPropagation();
                return;
            }

            log("允许点击")

            this.lastClickTime = currentTime;

            if (this.isOver == true) {
                this.resetBird();
                this.resetGame();
            } else {
                this.bird.fly();
                this.audioCtrl.onAudioQueue(AudioType.Swoosh);
            }
        })
    }

    gameOver() {
        log("game over")
        this.result.showResult();
        this.isOver = true;

        director.pause();
        // game.pause();

    }

    resetGame() {
        this.result.resetScore();
        this.pipeQueue.resetPool();
        this.startGame();
        this.isOver = false;
    }

    resetBird() {
        this.bird.resetBird();
    }

    startGame() {
        this.result.hideResult();
        director.resume();
        // game.resume();
    }

    passPipe() {
        this.result.addScore();
        this.audioCtrl.onAudioQueue(AudioType.Point);
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    contactGroupPipe() {
        const collider = this.bird.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        log(otherCollider.node);
        this.bird.hitSomething = true;
        this.audioCtrl.onAudioQueue(AudioType.Hit);
    }

    birdStruck() {
        this.contactGroupPipe();

        if (this.bird.hitSomething == true) {
            this.audioCtrl.onAudioQueue(AudioType.Die);
            this.gameOver();
        }
    }

    update() {
        if (this.isOver == false) {
            this.birdStruck();
        }
    }
}

