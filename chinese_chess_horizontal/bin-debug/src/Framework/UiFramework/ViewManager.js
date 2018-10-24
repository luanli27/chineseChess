var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this._controlerLoadedMap = {};
        return _this;
    }
    Object.defineProperty(ViewManager, "instance", {
        get: function () {
            if (null == this._instance)
                this._instance = new ViewManager();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewManager.prototype.init = function (stage) {
        this.setStage(stage);
        this.RegisterEventHandler();
    };
    ViewManager.prototype.setStage = function (stage) {
        this._stage = stage;
    };
    ViewManager.prototype.RegisterEventHandler = function () {
        var _this = this;
        this._stage.addEventListener(EnterGameView.eventName, function () { _this.askEnterView(ViewName.GameView, GameControler, GameView); }, this);
    };
    ViewManager.prototype.askEnterView = function (viewName, controler, view) {
        if (null == this._controlerLoadedMap[viewName]) {
            this._controlerLoadedMap[viewName] = new controler();
            var viewInstance = new view;
            this._stage.addChild(viewInstance);
            this._controlerLoadedMap[viewName].bindView(viewInstance);
        }
        this._controlerLoadedMap[viewName].onAskEnterView();
    };
    ViewManager.prototype.closeView = function (viewName) {
    };
    return ViewManager;
}(egret.EventDispatcher));
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map