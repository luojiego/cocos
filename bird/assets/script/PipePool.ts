import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab
    })
    public prefabPipe: Prefab = null;

    @property({
        type: Node
    })
    public pipePoolHome;

    public pool = new NodePool;

    public createPipe;

    initPool() {
        const initCount = 3;
        for (let i = 0; i < initCount; i++) {
            this.createPipe = instantiate(this.prefabPipe);
            if (i == 0) {
                this.pipePoolHome.addChild(this.createPipe);
            } else {
                this.pool.put(this.createPipe);
            }
        }
    }

    addPool() {
        if (this.pool.size() > 0) {
            this.createPipe = this.pool.get();
        } else {
            this.createPipe = instantiate(this.prefabPipe);
        }
        this.pipePoolHome.addChild(this.createPipe);
    }

    resetPool() {
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}

