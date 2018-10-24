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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        return _super.call(this) || this;
    }
    StartGameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StartGameView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.StartGameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    StartGameView.prototype.onClick = function () {
        this.dispatchEvent(new PlayerAskRestartGame(PlayerAskStartGame.eventName));
    };
    return StartGameView;
}(eui.Component));
__reflect(StartGameView.prototype, "StartGameView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=StartGameView.js.map