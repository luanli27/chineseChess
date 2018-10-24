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
var EnterGameView = (function (_super) {
    __extends(EnterGameView, _super);
    function EnterGameView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnterGameView.eventName = "EnterGameView";
    return EnterGameView;
}(egret.Event));
__reflect(EnterGameView.prototype, "EnterGameView");
var OnChessGridClick = (function (_super) {
    __extends(OnChessGridClick, _super);
    function OnChessGridClick(type, chessPos, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.chessPos = chessPos;
        return _this;
    }
    OnChessGridClick.eventName = "OnChessClick";
    return OnChessGridClick;
}(egret.Event));
__reflect(OnChessGridClick.prototype, "OnChessGridClick");
var RequestHandleChessGrid = (function (_super) {
    __extends(RequestHandleChessGrid, _super);
    function RequestHandleChessGrid(type, playerFlag, gridPos, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.playerFlag = playerFlag;
        _this.gridPos = gridPos;
        return _this;
    }
    RequestHandleChessGrid.eventName = "RequstHandleChessGrid";
    return RequestHandleChessGrid;
}(egret.Event));
__reflect(RequestHandleChessGrid.prototype, "RequestHandleChessGrid");
var OnGameStartEvent = (function (_super) {
    __extends(OnGameStartEvent, _super);
    function OnGameStartEvent(type, curPlayerFlag, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.curPlayerFlag = curPlayerFlag;
        return _this;
    }
    OnGameStartEvent.eventName = "OnGameStartEvent";
    return OnGameStartEvent;
}(egret.Event));
__reflect(OnGameStartEvent.prototype, "OnGameStartEvent");
var OnStepEndEvent = (function (_super) {
    __extends(OnStepEndEvent, _super);
    function OnStepEndEvent(type, curPlayerFlag, chessboardData, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.curPlayerFlag = curPlayerFlag;
        _this.chessboardData = chessboardData;
        return _this;
    }
    OnStepEndEvent.eventName = "OnStepEndEvent";
    return OnStepEndEvent;
}(egret.Event));
__reflect(OnStepEndEvent.prototype, "OnStepEndEvent");
var PlayerAskStartGame = (function (_super) {
    __extends(PlayerAskStartGame, _super);
    function PlayerAskStartGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerAskStartGame.eventName = "PlayerAskStartGame";
    return PlayerAskStartGame;
}(egret.Event));
__reflect(PlayerAskStartGame.prototype, "PlayerAskStartGame");
var PlayerAskRestartGame = (function (_super) {
    __extends(PlayerAskRestartGame, _super);
    function PlayerAskRestartGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerAskRestartGame.eventName = "PlayerAskRestartGame";
    return PlayerAskRestartGame;
}(egret.Event));
__reflect(PlayerAskRestartGame.prototype, "PlayerAskRestartGame");
var PlayerGiveupEvent = (function (_super) {
    __extends(PlayerGiveupEvent, _super);
    function PlayerGiveupEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerGiveupEvent.eventName = "PlayerGiveup";
    return PlayerGiveupEvent;
}(egret.Event));
__reflect(PlayerGiveupEvent.prototype, "PlayerGiveupEvent");
var PlayerBackChessEvent = (function (_super) {
    __extends(PlayerBackChessEvent, _super);
    function PlayerBackChessEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerBackChessEvent.eventName = "PlayerBackChessEvent";
    return PlayerBackChessEvent;
}(egret.Event));
__reflect(PlayerBackChessEvent.prototype, "PlayerBackChessEvent");
var PlayerStepTimerRunOutEvent = (function (_super) {
    __extends(PlayerStepTimerRunOutEvent, _super);
    function PlayerStepTimerRunOutEvent(type, playerFlag, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.flag = playerFlag;
        return _this;
    }
    PlayerStepTimerRunOutEvent.eventName = "PlayerStepTimerRunOutEvent";
    return PlayerStepTimerRunOutEvent;
}(egret.Event));
__reflect(PlayerStepTimerRunOutEvent.prototype, "PlayerStepTimerRunOutEvent");
var PlayerRoundTimerRunOutEvent = (function (_super) {
    __extends(PlayerRoundTimerRunOutEvent, _super);
    function PlayerRoundTimerRunOutEvent(type, playerFlag, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.flag = playerFlag;
        return _this;
    }
    PlayerRoundTimerRunOutEvent.eventName = "PlayerRoundTimerRunOutEvent";
    return PlayerRoundTimerRunOutEvent;
}(egret.Event));
__reflect(PlayerRoundTimerRunOutEvent.prototype, "PlayerRoundTimerRunOutEvent");
//# sourceMappingURL=Events.js.map