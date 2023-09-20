import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: 'First ground'
    })
    public first: Node;

    @property({
        type: Node,
        tooltip: 'second ground'
    })
    public second: Node;

    @property({
        type: Node,
        tooltip: 'third ground'
    })
    public third: Node;

    public firstWidth: number;
    public secondWidth: number;
    public thirdWidth: number;

    public firstLocation = new Vec3;
    public secondLocation = new Vec3;
    public thirdLocation = new Vec3;

    public gameSpeed: number = 200;

    onLoad() {
        this.startUp();
    }

    startUp() {
        this.firstWidth = this.first.getComponent(UITransform).width;
        this.secondWidth = this.second.getComponent(UITransform).width;
        this.thirdWidth = this.third.getComponent(UITransform).width;
        
        this.firstLocation.x = 0;
        this.secondLocation.x = this.firstWidth;
        this.thirdLocation.x = this.firstWidth + this.secondWidth;

        this.first.setPosition(this.firstLocation);
        this.second.setPosition(this.secondLocation);
        this.third.setPosition(this.thirdLocation);

    }

    update(deltaTime: number) {
        this.firstLocation = this.first.getPosition();
        this.secondLocation = this.second.getPosition();
        this.thirdLocation = this.third.getPosition();

        this.firstLocation.x -= this.gameSpeed * deltaTime;
        this.secondLocation.x -= this.gameSpeed * deltaTime;
        this.thirdLocation.x -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        if (this.firstLocation.x <= -this.firstWidth) {
            this.firstLocation.x = canvas.getComponent(UITransform).width;
        }

        if (this.secondLocation.x <= -this.secondWidth) {
            this.secondLocation.x = canvas.getComponent(UITransform).width;
        }

        if (this.thirdLocation.x <= -this.thirdWidth) {
            this.thirdLocation.x = canvas.getComponent(UITransform).width;
        }

        this.first.setPosition(this.firstLocation);
        this.second.setPosition(this.secondLocation);
        this.third.setPosition(this.thirdLocation);
    }
}

