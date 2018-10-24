class ViewManager extends egret.EventDispatcher{
    private constructor(){super();}
    private _stage : eui.UILayer;
    private static _instance : ViewManager;
    private _controlerLoadedMap : {[key : number] : BaseControler} = {};

    public static get instance()
    {
        if(null == this._instance)
            this._instance = new ViewManager();
        return this._instance;
    }

    public init(stage : eui.UILayer)
    {
        this.setStage(stage);
        this.RegisterEventHandler();
    }

    public setStage(stage : eui.UILayer)
    {
        this._stage = stage;
    }

    private RegisterEventHandler()
    {
        this._stage.addEventListener(EnterGameView.eventName, () => {this.askEnterView(ViewName.GameView, GameControler, GameView)}, this);
    }

    public askEnterView(viewName : ViewName, controler : typeof BaseControler, view : typeof BaseView)
    {
        if(null == this._controlerLoadedMap[viewName])
        {
            this._controlerLoadedMap[viewName] = new controler();
            let viewInstance = new view;
            this._stage.addChild(viewInstance);
            this._controlerLoadedMap[viewName].bindView(viewInstance);
        }

        this._controlerLoadedMap[viewName].onAskEnterView();
    }

    public closeView(viewName : ViewName)
    {
    }
}