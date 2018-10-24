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
var GameControler = (function (_super) {
    __extends(GameControler, _super);
    function GameControler() {
        var _this = _super.call(this) || this;
        _this._gameData = new GameData();
        _this._gameData.initChessInstances();
        return _this;
    }
    Object.defineProperty(GameControler.prototype, "gameData", {
        get: function () { return this._gameData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameControler.prototype, "gameView", {
        get: function () { return this._view; },
        enumerable: true,
        configurable: true
    });
    GameControler.prototype.onAskEnterView = function () {
        _super.prototype.onAskEnterView.call(this);
        this.setPlayerFlag();
        this.setStartingPlayer();
        this.initPlayerInfoView();
        this.registerEvent();
    };
    GameControler.prototype.setPlayerFlag = function () {
        this._gameData.localPlayer.playerData.flag = PlayerFlag.DownPlayer;
        this._gameData.otherPlayer.playerData.flag = PlayerFlag.UpPlayer;
        this.gameView.playerInfo.setFlag(this._gameData.localPlayer.playerData.flag);
        this.gameView.enemyInfo.setFlag(this._gameData.otherPlayer.playerData.flag);
    };
    GameControler.prototype.setStartingPlayer = function () {
        this._gameData.curPlayerFlag = PlayerFlag.DownPlayer;
    };
    GameControler.prototype.setNextRoundPlayerFlag = function () {
        this.gameData.curPlayerFlag = this._gameData.curPlayerFlag == PlayerFlag.DownPlayer
            ? PlayerFlag.UpPlayer
            : PlayerFlag.DownPlayer;
    };
    GameControler.prototype.initPlayerInfoView = function () {
        this.gameView.setPlayerInfo(this.gameView.playerInfo, this._gameData.localPlayer.playerData);
        this.gameView.setEnemyInfo(this.gameView.enemyInfo, this.gameData.otherPlayer.playerData);
    };
    GameControler.prototype.registerEvent = function () {
        var localPlayer = this._gameData.localPlayer;
        for (var index = 0; index < this.gameView.Chessboard.ChessGridGroup.numChildren; index++)
            this.gameView.Chessboard.ChessGridGroup.getChildAt(index).addEventListener(OnChessGridClick.eventName, localPlayer.onChessGridClick, localPlayer);
        localPlayer.addEventListener(RequestHandleChessGrid.eventName, this.onRequestHandleChessGrid, this);
        this._gameData.otherPlayer.addEventListener(RequestHandleChessGrid.eventName, this.onRequestHandleChessGrid, this);
        this.addEventListener(OnStepEndEvent.eventName, this._gameData.otherPlayer.OnStepEnd, this._gameData.otherPlayer);
        this.gameView.startGamePopup.addEventListener(PlayerAskStartGame.eventName, this.onAskStartGame, this);
        this.gameView.restartGamePopup.addEventListener(PlayerAskRestartGame.eventName, this.onAskRestartGame, this);
        this.gameView.playerInfo.addEventListener(PlayerGiveupEvent.eventName, this.onPlayerGiveup, this);
        this.gameView.playerInfo.addEventListener(PlayerBackChessEvent.eventName, this.onPlayerAskBackChess, this);
        this.addEventListener(OnGameStartEvent.eventName, this.gameView.playerInfo.onGameStart, this.gameView.playerInfo);
        this.addEventListener(OnGameStartEvent.eventName, this.gameView.enemyInfo.onGameStart, this.gameView.enemyInfo);
        this.addEventListener(OnStepEndEvent.eventName, this.gameView.playerInfo.onStepEnd, this.gameView.playerInfo);
        this.addEventListener(OnStepEndEvent.eventName, this.gameView.enemyInfo.onStepEnd, this.gameView.enemyInfo);
        this.gameView.playerInfo.addEventListener(PlayerStepTimerRunOutEvent.eventName, this.onPlayerStepTimerRunOut, this);
        this.gameView.playerInfo.addEventListener(PlayerRoundTimerRunOutEvent.eventName, this.onPlayerRoundTimerRunOut, this);
        this.gameView.enemyInfo.addEventListener(PlayerStepTimerRunOutEvent.eventName, this.onPlayerStepTimerRunOut, this);
        this.gameView.enemyInfo.addEventListener(PlayerRoundTimerRunOutEvent.eventName, this.onPlayerRoundTimerRunOut, this);
    };
    GameControler.prototype.onGameStart = function () {
        this.dispatchEvent(new OnGameStartEvent(OnGameStartEvent.eventName, this._gameData.curPlayerFlag));
    };
    GameControler.prototype.onAskStartGame = function () {
        this.gameView.closePopup(this.gameView.startGamePopup);
        this.gameView.initChessboard();
        this.onGameStart();
    };
    GameControler.prototype.onAskRestartGame = function () {
        this.cleanChessSelectedState();
        this._gameData.resetChessboardData();
        this.gameView.closePopup(this.gameView.restartGamePopup);
        this.gameView.initChessboard();
        this.setStartingPlayer();
        this.onGameStart();
    };
    GameControler.prototype.onPlayerGiveup = function () {
        this.gameView.showRestartPopup(false);
    };
    GameControler.prototype.onPlayerAskBackChess = function () {
        var stepArray = this._gameData.stepResultArray;
        if (stepArray.length >= DefineString.defaultBackStep) {
            this.cleanChessSelectedState();
            this._gameData.backStep();
            this.gameView.initChessboard();
            for (var _i = 0, stepArray_1 = stepArray; _i < stepArray_1.length; _i++) {
                var step = stepArray_1[_i];
                this.gameView.Chessboard.backChessToPos(step.startPos, step.endPos);
            }
        }
    };
    GameControler.prototype.onRequestHandleChessGrid = function (e) {
        if (this.isThisPlayerRound(e.playerFlag))
            this.onChooseChessGrid(e.playerFlag, e.gridPos);
    };
    GameControler.prototype.isThisPlayerRound = function (playerFlag) {
        var result = false;
        var currentPlayerFlag = this._gameData.curPlayerFlag;
        if (currentPlayerFlag == playerFlag)
            result = true;
        return result;
    };
    //移动吃棋的核心逻辑
    GameControler.prototype.onChooseChessGrid = function (playerFlag, chessPos) {
        if (playerFlag == PlayerFlag.UpPlayer)
            console.error("AI选择的格子位置为 ： " + chessPos.rowIndex + "   " + chessPos.columnIndex);
        var chess = this._gameData.chessboardData.getChessData(chessPos);
        var hasChessSelected = this._gameData.hasChessBeenSelected();
        if (null == chess) {
            if (hasChessSelected) {
                if (this.MoveToGrid(chessPos))
                    this.onStepEnd();
            }
        }
        else {
            if (this.isThisPlayerChess(playerFlag, chess))
                this.onChessSelected(chessPos);
            else {
                if (hasChessSelected) {
                    var chessEated = this.eatEnemyChess(chessPos);
                    if (null != chessEated) {
                        if (chessEated.chessValue == Infinity)
                            this.OnGameEnd();
                        else
                            this.onStepEnd();
                    }
                }
            }
        }
    };
    GameControler.prototype.isThisPlayerChess = function (playerFlag, chess) {
        return chess.belongToPlayer == playerFlag;
    };
    GameControler.prototype.onChessSelected = function (chessPos) {
        var chessBoardView = this.gameView.Chessboard;
        var queryResult = this._gameData.chessboardData.getChessData(chessPos)
            .getChessQueryResult(chessPos, this._gameData.chessboardData);
        this.cleanChessSelectedState();
        this._gameData.setSelectedChessIndex(chessPos);
        chessBoardView.onSelectedChess(chessPos);
        this._gameData.chessQueryResult = queryResult;
        chessBoardView.setAllReachableGrid(queryResult.CanMoveToPosArray);
    };
    GameControler.prototype.cleanChessSelectedState = function () {
        if (this._gameData.hasChessBeenSelected()) {
            this.gameView.Chessboard.cleanSelectedChessState(this._gameData.curSelectedChessPos, this._gameData.chessQueryResult.CanMoveToPosArray);
        }
    };
    GameControler.prototype.MoveToGrid = function (chessPos) {
        var legalMove = this._gameData.posElementIsInArray(chessPos, this.gameData.chessQueryResult.CanMoveToPosArray);
        if (legalMove) {
            var chessBoardView = this.gameView.Chessboard;
            if (this._gameData.needCleanChessMoveOutState())
                chessBoardView.cleanChessOutState(this.gameData.chessMoveOutPos, this.gameData.enemyLastTimeSelectedChessPos);
            this._gameData.moveCurSelectChessToPos(chessPos);
            this.cleanChessSelectedState();
            chessBoardView.MoveChessToPos(this._gameData.curSelectedChessPos, chessPos);
        }
        return legalMove;
    };
    GameControler.prototype.eatEnemyChess = function (chessPos) {
        var result = null;
        var legalEat = this._gameData.posElementIsInArray(chessPos, this.gameData.chessQueryResult.CanEatPosArray);
        if (legalEat) {
            var chessBoardView = this.gameView.Chessboard;
            if (this._gameData.needCleanChessMoveOutState())
                chessBoardView.cleanChessOutState(this.gameData.chessMoveOutPos, this.gameData.enemyLastTimeSelectedChessPos);
            result = this._gameData.eatEnemyChess(chessPos);
            this.cleanChessSelectedState();
            chessBoardView.eatEnemyChess(this._gameData.curSelectedChessPos, chessPos);
        }
        return result;
    };
    GameControler.prototype.onStepEnd = function () {
        this.setNextRoundPlayerFlag();
        this._gameData.resetSeletedChessIndex();
        this.dispatchEvent(new OnStepEndEvent(OnStepEndEvent.eventName, this._gameData.curPlayerFlag, this._gameData.chessboardData));
    };
    GameControler.prototype.OnGameEnd = function () {
        this.gameView.showRestartPopup(this._gameData.curPlayerFlag == this.gameData.localPlayer.playerData.flag);
    };
    GameControler.prototype.onPlayerStepTimerRunOut = function (e) {
        this.gameView.showRestartPopup(e.flag != this.gameData.localPlayer.playerData.flag);
    };
    GameControler.prototype.onPlayerRoundTimerRunOut = function (e) {
        this.gameView.showRestartPopup(e.flag != this.gameData.localPlayer.playerData.flag);
    };
    return GameControler;
}(BaseControler));
__reflect(GameControler.prototype, "GameControler");
//# sourceMappingURL=GameControler.js.map