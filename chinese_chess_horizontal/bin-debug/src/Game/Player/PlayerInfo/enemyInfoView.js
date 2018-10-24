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
var enemyInfoView = (function (_super) {
    __extends(enemyInfoView, _super);
    function enemyInfoView() {
        return _super.call(this) || this;
    }
    enemyInfoView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    enemyInfoView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    enemyInfoView.prototype.setInfo = function (playerData) {
        var categoryImgRes = this._myFlag == PlayerFlag.DownPlayer ? DefineString.downPlayerCategory : DefineString.upPlayerCategory;
        CommonFunction.setImageWithResName(this.category, categoryImgRes);
        CommonFunction.setImageWithResName(this.head, playerData.iconUrl);
        this.level.text = "lv:" + playerData.level.toString();
        this.playerName.text = playerData.nickName;
        this.stepTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleStepTimeLimit);
        this.roundTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleRoundTimeLimit);
    };
    enemyInfoView.prototype.onGameStart = function (e) {
    };
    enemyInfoView.prototype.onStepEnd = function (e) {
    };
    enemyInfoView.prototype.timerFunc = function () {
    };
    enemyInfoView.prototype.setFlag = function (flag) {
        this._myFlag = flag;
    };
    return enemyInfoView;
}(eui.Component));
__reflect(enemyInfoView.prototype, "enemyInfoView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=enemyInfoView.js.map