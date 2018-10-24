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
var PlayerInfoView = (function (_super) {
    __extends(PlayerInfoView, _super);
    function PlayerInfoView() {
        return _super.call(this) || this;
    }
    PlayerInfoView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    PlayerInfoView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.registerEvents();
    };
    PlayerInfoView.prototype.registerEvents = function () {
        this.giveupButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giveUp, this);
        this.backButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backChess, this);
    };
    PlayerInfoView.prototype.giveUp = function () {
        this.dispatchEvent(new PlayerGiveupEvent(PlayerGiveupEvent.eventName));
    };
    PlayerInfoView.prototype.backChess = function () {
        this.dispatchEvent(new PlayerBackChessEvent(PlayerBackChessEvent.eventName));
    };
    PlayerInfoView.prototype.setInfo = function (playerData) {
        var categoryImgRes = this._myFlag == PlayerFlag.DownPlayer ? DefineString.downPlayerCategory : DefineString.upPlayerCategory;
        CommonFunction.setImageWithResName(this.category, categoryImgRes);
        CommonFunction.setImageWithResName(this.head, playerData.iconUrl);
        this.level.text = "lv:" + playerData.level.toString();
        this.playerName.text = playerData.nickName;
        this.stepTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleStepTimeLimit);
        this.roundTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleRoundTimeLimit);
    };
    PlayerInfoView.prototype.onGameStart = function (e) {
        this._stepTimer = DefineString.singleStepTimeLimit;
        this._roundTimer = DefineString.singleRoundTimeLimit;
        this._isMyStep = e.curPlayerFlag == this._myFlag;
        if (null != this._timer)
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.updatePerSecond, this);
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.updatePerSecond, this);
        this._timer.start();
    };
    PlayerInfoView.prototype.onStepEnd = function (e) {
        this._isMyStep = e.curPlayerFlag == this._myFlag;
        if (this._isMyStep)
            this._stepTimer = DefineString.singleStepTimeLimit;
        else
            this.stepTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleStepTimeLimit);
    };
    PlayerInfoView.prototype.updatePerSecond = function () {
        if (this._isMyStep) {
            this._stepTimer -= 1;
            this._roundTimer -= 1;
            if (this._stepTimer <= 0) {
                this.dispatchEvent(new PlayerStepTimerRunOutEvent(PlayerStepTimerRunOutEvent.eventName, this._myFlag));
                this._timer.stop();
            }
            if (this._roundTimer <= 0) {
                this.dispatchEvent(new PlayerRoundTimerRunOutEvent(PlayerRoundTimerRunOutEvent.eventName, this._myFlag));
                this._timer.stop();
            }
            this.stepTimer.text = CommonFunction.changeNumberToTimerString(this._stepTimer);
            this.roundTimer.text = CommonFunction.changeNumberToTimerString(this._roundTimer);
        }
    };
    PlayerInfoView.prototype.setFlag = function (flag) {
        this._myFlag = flag;
    };
    return PlayerInfoView;
}(BaseView));
__reflect(PlayerInfoView.prototype, "PlayerInfoView");
//# sourceMappingURL=PlayerInfoView.js.map