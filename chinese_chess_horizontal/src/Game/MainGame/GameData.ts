class GameData {
    //暂时使用临时数据
    public localPlayer: Player = new Player(new PlayerData(1, "nintendo", "playerHead02_png"));
    public otherPlayer: AIPlayer = new AIPlayer(new PlayerData(1, "alpha", "playerHead03_png"));
    public chessboardData: ChessboardData;
    public curPlayerFlag: PlayerFlag;
    public curSelectedChessPos = new ChessPosition(-1, -1);
    private _chessMoveOutPos = new ChessPosition(-1, -1);
    private _enemyLastTimeSelectedChessPos = new ChessPosition(-1, -1);
    private _chessQueryResult = new ChessQueryResult();
    private _stepResultArray = new Array<PlayerStepResult>();

    public get chessQueryResult() {
        return this._chessQueryResult;
    }

    public set chessQueryResult(chessQueryResult: ChessQueryResult) {
        this._chessQueryResult = chessQueryResult;
    }

    //note : keep the string below the same as chess img resource name
    public chessboardStringData: Array<Array<string>> =
    [
        ['b_c', 'b_m', 'b_x', 'b_s', 'b_j', 'b_s', 'b_x', 'b_m', 'b_c'],
        ['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],
        ['   ', 'b_p', '   ', '   ', '   ', '   ', '   ', 'b_p', '   '],
        ['b_z', '   ', 'b_z', '   ', 'b_z', '   ', 'b_z', '   ', 'b_z'],
        ['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],
        ['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],
        ['r_z', '   ', 'r_z', '   ', 'r_z', '   ', 'r_z', '   ', 'r_z'],
        ['   ', 'r_p', '   ', '   ', '   ', '   ', '   ', 'r_p', '   '],
        ['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],
        ['r_c', 'r_m', 'r_x', 'r_s', 'r_j', 'r_s', 'r_x', 'r_m', 'r_c'],
    ];

    public initChessInstances() {
        if (null == this.chessboardData) {
            this.chessboardData = new ChessboardData(new Array<Array<ChessBase>>());
            for (let row = 0; row < this.chessboardStringData.length; row++) {
                for (let column = 0; column < this.chessboardStringData[row].length; column++) {
                    let origString = this.chessboardStringData[row][column];
                    let instance: ChessBase = null;
                    switch (origString) {
                        case '   ':
                            instance = null;
                            break;
                        case 'b_c':
                        case 'r_c':
                            instance = new Che(100, new ChessPosition(row, column));
                            break;
                        case 'b_m':
                        case 'r_m':
                            instance = new Ma(70, new ChessPosition(row, column));
                            break;
                        case 'b_x':
                        case 'r_x':
                            instance = new Xiang(30, new ChessPosition(row, column));
                            break;
                        case 'b_s':
                        case 'r_s':
                            instance = new Shi(20, new ChessPosition(row, column));
                            break;
                        case 'b_j':
                        case 'r_j':
                            instance = new Jiang(Infinity, new ChessPosition(row, column));
                            break;
                        case 'b_p':
                        case 'r_p':
                            instance = new Pao(80, new ChessPosition(row, column));
                            break;
                        case 'b_z':
                        case 'r_z':
                            instance = new Zu(10, new ChessPosition(row, column));
                            break;
                    }

                    if (null == this.chessboardData.getRowData(row))
                        this.chessboardData.setRowData(row, new Array<ChessBase>());
                    if (null != instance)
                        instance.belongToPlayer = origString[0] == 'r' ? PlayerFlag.DownPlayer : PlayerFlag.UpPlayer;
                    this.chessboardData.putChessAtPos(instance, new ChessPosition(row, column));
                }
            }
        }
    }

    public resetChessboardData() {
        for (let chessArray of this.chessboardData.allChessData) {
            for (let restChess of chessArray) {
                if (null != restChess)
                    this.chessboardData.MoveChessToPos(restChess, restChess.initPos);
            }
        }

        for (let stepResult of this._stepResultArray) {
            if (null != stepResult.eatResult)
                this.chessboardData.putChessAtPos(stepResult.eatResult, stepResult.eatResult.initPos);
        }

        this._stepResultArray.splice(0, this._stepResultArray.length);
        this.resetSeletedChessIndex();
        this.resetChessMoveOutPos();
        this.resetEnemyLastTimeSelectedChessPos();
    }

    public backStep() 
    {
        let stepArray = this.stepResultArray;

        if(stepArray.length >= DefineString.defaultBackStep)
        {
            for(let backStep =  DefineString.defaultBackStep; backStep > 0; backStep --)
            {
                let stepResult = this.backChess();
                this.chessboardData.MoveChessToPos(stepResult.chessControled, stepResult.startPos);
                let chessEated = stepResult.eatResult;
                if(null != chessEated)
                    this.chessboardData.putChessAtPos(stepResult.eatResult, stepResult.endPos);
            }

            this.resetSeletedChessIndex();
            this.resetChessMoveOutPos();
            this.resetEnemyLastTimeSelectedChessPos();
        }
    }

    public hasChessBeenSelected(): boolean {
        return this.curSelectedChessPos.rowIndex != -1;
    }

    public setSelectedChessIndex(chessPos: ChessPosition) {
        this.curSelectedChessPos = chessPos;
    }

    public resetSeletedChessIndex() {
        this.curSelectedChessPos = new ChessPosition(-1, -1);
    }

    public moveCurSelectChessToPos(targetPos: ChessPosition) {
        if (this.posElementIsInArray(targetPos, this._chessQueryResult.CanMoveToPosArray)) {
            let curSelectChess = this.chessboardData.getChessData(this.curSelectedChessPos);
            this.chessMoveOutPos = curSelectChess.position;
            this._stepResultArray.push(new PlayerStepResult(curSelectChess, null, curSelectChess.position, targetPos));
            this.chessboardData.MoveChessToPos(curSelectChess, targetPos);
            this._enemyLastTimeSelectedChessPos = curSelectChess.position;
        }
    }

    public needCleanChessMoveOutState(): boolean {
        return this._chessMoveOutPos.rowIndex != -1;
    }

    public get chessMoveOutPos() {
        return this._chessMoveOutPos;
    }

    public set chessMoveOutPos(pos: ChessPosition) {
        this._chessMoveOutPos.rowIndex = pos.rowIndex;
        this._chessMoveOutPos.columnIndex = pos.columnIndex;
    }

    public resetChessMoveOutPos() {
        this._chessMoveOutPos.rowIndex = -1;
        this._chessMoveOutPos.columnIndex = -1;
    }

    public get enemyLastTimeSelectedChessPos() {
        return this._enemyLastTimeSelectedChessPos;
    }

    public eatEnemyChess(targetPos: ChessPosition): ChessBase {
        let chessEated = null;
        if (this.posElementIsInArray(targetPos, this._chessQueryResult.CanEatPosArray)) {
            let curSelectChess = this.chessboardData.getChessData(this.curSelectedChessPos);
            this.chessMoveOutPos = curSelectChess.position;
            let stepResult = new PlayerStepResult(curSelectChess, chessEated, curSelectChess.position, targetPos)
            chessEated = this.chessboardData.MoveChessToPos(curSelectChess, targetPos);
            stepResult.eatResult = chessEated;
            this._stepResultArray.push(stepResult);
            this._enemyLastTimeSelectedChessPos = curSelectChess.position;
        }

        return chessEated;
    }

    private resetEnemyLastTimeSelectedChessPos() {
        this._enemyLastTimeSelectedChessPos.rowIndex = -1;
        this._enemyLastTimeSelectedChessPos.columnIndex = -1;
    }

    public posElementIsInArray(pos: ChessPosition, posArray: Array<ChessPosition>): boolean {
        let result = false;
        for (let posElement of posArray) {
            if (posElement.rowIndex == pos.rowIndex && posElement.columnIndex == pos.columnIndex)
                result = true;
        }

        return result;
    }

    private backChess(): PlayerStepResult {
        return this._stepResultArray.pop();
    }

    public get stepResultArray() {
        return this._stepResultArray;
    }
}