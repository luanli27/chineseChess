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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        return _super.call(this) || this;
    }
    GameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GameView.prototype.setPlayerInfo = function (playerInfoView, playerData) {
        playerInfoView.setInfo(playerData);
    };
    GameView.prototype.setEnemyInfo = function (enemyInfoView, playerData) {
        enemyInfoView.setInfo(playerData);
    };
    GameView.prototype.initChessboard = function () {
        var controler = this._controler;
        this.Chessboard.initBoard(controler.gameData.chessboardStringData);
    };
    GameView.prototype.showPopup = function (popup) {
        popup.enabled = true;
        popup.alpha = 1;
    };
    GameView.prototype.closePopup = function (popup) {
        popup.enabled = false;
        popup.alpha = 0;
    };
    GameView.prototype.showRestartPopup = function (isWin) {
        this.restartGamePopup.setGameResultInfo(isWin);
        this.showPopup(this.restartGamePopup);
    };
    return GameView;
}(BaseView));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map