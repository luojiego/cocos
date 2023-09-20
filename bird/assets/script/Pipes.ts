import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {
    @property({
        type: Node,
        tooltip: 'Top Pipe'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'Bottom Pipe'
    })
    public bottomPipe: Node;

    public tempStartLocationTop: Vec3 = new Vec3(0, 0, 0);
    public tempStartLocationBottom: Vec3 = new Vec3(0, 0, 0);

    public scene = screen.windowSize;

    public game;

    public pipeSpeed: number;
    public tempSpeed: number;

    isPass: boolean;

    onLoad() {
        this.game = find("GameCtrl").getComponent("GameCtrl")
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();

        this.isPass = false;
    }

    initPos() {
        this.tempStartLocationTop.x = (this.topPipe.getComponent(UITransform).width + this.scene.width)
        this.tempStartLocationBottom.x = (this.bottomPipe.getComponent(UITransform).width + this.scene.width)

        const gap = random(90, 100);
        const topHeight = random(0, 450);

        this.tempStartLocationTop.y = topHeight;
        this.tempStartLocationBottom.y = (topHeight - (gap*10));

        this.bottomPipe.setPosition(this.tempStartLocationBottom);
        this.topPipe.setPosition(this.tempStartLocationTop);
    }

    update(deltaTime :number) {
        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationBottom = this.bottomPipe.position;
        this.tempStartLocationTop = this.topPipe.position;

        this.tempStartLocationBottom.x -= this.tempSpeed;
        this.tempStartLocationTop.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.tempStartLocationBottom);
        this.topPipe.setPosition(this.tempStartLocationTop);

        if (this.isPass == false && this.topPipe.position.x < 0) {
            this.isPass = true;
            this.game.passPipe();

        }

        if (this.topPipe.position.x < -this.scene.width) {
            this.game.createPipe();
            this.destroy();
        }
    }

}

