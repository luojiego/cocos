import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

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
        type: CCInteger,
        tooltip: 'Change the speed of the ground'
    })
    public speed: number = 200;

    onLoad() {
        this.initListener();

        this.result.resetScore();

        director.pause();
    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            this.bird.fly();
        })
    }
    
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
                break;
            case KeyCode.KEY_P:
                this.result.addScore();
                break;
            case KeyCode.KEY_Q:
                this.resetGame();
                this.bird.resetBird();
                break;
        }
    }

    gameOver() {
        this.result.showResult();

        director.pause();
    }

    resetGame() {
        this.result.resetScore();

        this.startGame();
    }

    startGame() {
        this.result.hideResult();
        director.resume();
    }
}

