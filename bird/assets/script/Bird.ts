import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, easing, RigidBody2D, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({
        type: CCFloat,
        tooltip: 'how high can they fly'
    })
    public jumpHeight: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'how long can they fly'
    })
    public jumpDuration: number = 3.5;

    public birdAnimation: Animation;
    public birdLocation: Vec3;

    public hitSomething: boolean;

    onLoad() {
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation);
    }

    resetBird() {
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);
        // 重置旋转
        this.node.angle = 0;

        // 如果使用了物理引擎
        const rigidBody = this.node.getComponent(RigidBody2D);
        if (rigidBody) {
            // 重置速度
            rigidBody.linearVelocity = v2(0, 0);
            rigidBody.angularVelocity = 0;
            
            // 如果有其他需要重置的物理属性，比如摩擦力、弹性等，也可以在这里设置
        }
        this.hitSomething = false;
    }
    
    fly() {
        this.birdAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), 
                {easing: "smooth", onUpdate: (target: Vec3, ration: number)=>{
                this.node.position = target;
                }})
            .start();

        this.birdAnimation.play();
    }
}

