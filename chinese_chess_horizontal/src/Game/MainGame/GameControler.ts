class GameControler extends BaseControler {
    private _gameData: GameData;
    public get gameData() { return this._gameData; }
    private get gameView() { return this._view as GameView; }
    public constructor() {
        super();
        this._gameData = new GameData();
        this._gameData.initChessInstances();
    }

    public onAskEnterView() {
        super.onAskEnterView();
        this.setPlayerFlag();
        this.setStartingPlayer();
        this.initPlayerInfoView();
        this.registerEvent();
    }

    private setPlayerFlag() {
        this._gameData.localPlayer.playerData.flag = PlayerFlag.DownPlayer;
        this._gameData.otherPlayer.playerData.flag = PlayerFlag.UpPlayer;
        this.gameView.playerInfo.setFlag(this._gameData.localPlayer.playerData.flag);
        this.gameView.enemyInfo.setFlag(this._gameData.otherPlayer.playerData.flag);
    }

    private setStartingPlayer() {
        this._gameData.curPlayerFlag = PlayerFlag.DownPlayer;
    }

    private setNextRoundPlayerFlag() {
        this.gameData.curPlayerFlag = this._gameData.curPlayerFlag == PlayerFlag.DownPlayer
            ? PlayerFlag.UpPlayer
            : PlayerFlag.DownPlayer;
    }

    private initPlayerInfoView() {
        this.gameView.setPlayerInfo(this.gameView.playerInfo, this._gameData.localPlayer.playerData);
        this.gameView.setEnemyInfo(this.gameView.enemyInfo, this.gameData.otherPlayer.playerData);
    }

    private registerEvent() {
        let localPlayer = this._gameData.localPlayer;
        for (let index = 0; index < this.gameView.Chessboard.ChessGridGroup.numChildren; index++)
            this.gameView.Chessboard.ChessGridGroup.getChildAt(index).addEventListener(OnChessGridClick.eventName,
                localPlayer.onChessGridClick,
                localPlayer);
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
    }

    private onGameStart()
    {
        this.dispatchEvent(new OnGameStartEvent(OnGameStartEvent.eventName, this._gameData.curPlayerFlag));     
    }

    private onAskStartGame() {
        this.gameView.closePopup(this.gameView.startGamePopup);
        this.gameView.initChessboard();
        this.onGameStart();
    }

    private onAskRestartGame() 
    {
        this.cleanChessSelectedState();
        this._gameData.resetChessboardData();
        this.gameView.closePopup(this.gameView.restartGamePopup);
        this.gameView.initChessboard();
        this.setStartingPlayer();
        this.onGameStart();
    }

    private onPlayerGiveup() {
        this.gameView.showRestartPopup(false);
    }

    private onPlayerAskBackChess() {
        let stepArray = this._gameData.stepResultArray;
        if(stepArray.length >= DefineString.defaultBackStep)
        {
            this.cleanChessSelectedState();
            this._gameData.backStep();
            this.gameView.initChessboard();
            for (let step of stepArray)
                this.gameView.Chessboard.backChessToPos(step.startPos, step.endPos);
        }
    }

    private onRequestHandleChessGrid(e: RequestHandleChessGrid) {
        if (this.isThisPlayerRound(e.playerFlag))
            this.onChooseChessGrid(e.playerFlag, e.gridPos);
    }

    private isThisPlayerRound(playerFlag: PlayerFlag) {
        let result = false;
        let currentPlayerFlag = this._gameData.curPlayerFlag;
        if (currentPlayerFlag == playerFlag)
            result = true;

        return result;
    }

    //移动吃棋的核心逻辑
    private onChooseChessGrid(playerFlag: PlayerFlag, chessPos: ChessPosition) {
        if (playerFlag == PlayerFlag.UpPlayer)
            console.error("AI选择的格子位置为 ： " + chessPos.rowIndex + "   " + chessPos.columnIndex);
        let chess = this._gameData.chessboardData.getChessData(chessPos);
        let hasChessSelected = this._gameData.hasChessBeenSelected();
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
                    let chessEated = this.eatEnemyChess(chessPos);
                    if (null != chessEated) {
                        if (chessEated.chessValue == Infinity)
                            this.OnGameEnd();
                        else
                            this.onStepEnd();
                    }
                }
            }
        }
    }

    private isThisPlayerChess(playerFlag: PlayerFlag, chess: ChessBase) {
        return chess.belongToPlayer == playerFlag;
    }

    private onChessSelected(chessPos: ChessPosition) {
        let chessBoardView = this.gameView.Chessboard;
        let queryResult = this._gameData.chessboardData.getChessData(chessPos)
            .getChessQueryResult(chessPos, this._gameData.chessboardData);

        this.cleanChessSelectedState();
        this._gameData.setSelectedChessIndex(chessPos);
        chessBoardView.onSelectedChess(chessPos);
        this._gameData.chessQueryResult = queryResult;
        chessBoardView.setAllReachableGrid(queryResult.CanMoveToPosArray);
    }

    private cleanChessSelectedState()
    {
        if (this._gameData.hasChessBeenSelected()) {
            this.gameView.Chessboard.cleanSelectedChessState(this._gameData.curSelectedChessPos, this._gameData.chessQueryResult.CanMoveToPosArray);
        }
    }

    private MoveToGrid(chessPos: ChessPosition) {
        let legalMove = this._gameData.posElementIsInArray(chessPos, this.gameData.chessQueryResult.CanMoveToPosArray);
        if (legalMove) {
            let chessBoardView = this.gameView.Chessboard;
            if (this._gameData.needCleanChessMoveOutState())
                chessBoardView.cleanChessOutState(this.gameData.chessMoveOutPos, this.gameData.enemyLastTimeSelectedChessPos);
            this._gameData.moveCurSelectChessToPos(chessPos);
            this.cleanChessSelectedState();
            chessBoardView.MoveChessToPos(this._gameData.curSelectedChessPos, chessPos);
        }

        return legalMove;
    }

    private eatEnemyChess(chessPos: ChessPosition): ChessBase {
        let result = null;
        let legalEat = this._gameData.posElementIsInArray(chessPos, this.gameData.chessQueryResult.CanEatPosArray);
        if (legalEat) {
            let chessBoardView = this.gameView.Chessboard;
            if (this._gameData.needCleanChessMoveOutState())
                chessBoardView.cleanChessOutState(this.gameData.chessMoveOutPos, this.gameData.enemyLastTimeSelectedChessPos);
            result = this._gameData.eatEnemyChess(chessPos);
            this.cleanChessSelectedState();
            chessBoardView.eatEnemyChess(this._gameData.curSelectedChessPos, chessPos);
        }

        return result;
    }

    private onStepEnd() {
        this.setNextRoundPlayerFlag();
        this._gameData.resetSeletedChessIndex();
        this.dispatchEvent(new OnStepEndEvent(OnStepEndEvent.eventName, this._gameData.curPlayerFlag, this._gameData.chessboardData));
    }

    private OnGameEnd() {
        this.gameView.showRestartPopup(this._gameData.curPlayerFlag == this.gameData.localPlayer.playerData.flag);
    }

    private onPlayerStepTimerRunOut(e : PlayerStepTimerRunOutEvent)
    {
        this.gameView.showRestartPopup(e.flag != this.gameData.localPlayer.playerData.flag);
    }

    private onPlayerRoundTimerRunOut(e : PlayerRoundTimerRunOutEvent)
    {
        this.gameView.showRestartPopup(e.flag != this.gameData.localPlayer.playerData.flag);
    }
}