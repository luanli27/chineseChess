var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
        //暂时使用临时数据
        this.localPlayer = new Player(new PlayerData(1, "nintendo", "playerHead02_png"));
        this.otherPlayer = new AIPlayer(new PlayerData(1, "alpha", "playerHead03_png"));
        this.curSelectedChessPos = new ChessPosition(-1, -1);
        this._chessMoveOutPos = new ChessPosition(-1, -1);
        this._enemyLastTimeSelectedChessPos = new ChessPosition(-1, -1);
        this._chessQueryResult = new ChessQueryResult();
        this._stepResultArray = new Array();
        //note : keep the string below the same as chess img resource name
        this.chessboardStringData = [
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
    }
    Object.defineProperty(GameData.prototype, "chessQueryResult", {
        get: function () {
            return this._chessQueryResult;
        },
        set: function (chessQueryResult) {
            this._chessQueryResult = chessQueryResult;
        },
        enumerable: true,
        configurable: true
    });
    GameData.prototype.initChessInstances = function () {
        if (null == this.chessboardData) {
            this.chessboardData = new ChessboardData(new Array());
            for (var row = 0; row < this.chessboardStringData.length; row++) {
                for (var column = 0; column < this.chessboardStringData[row].length; column++) {
                    var origString = this.chessboardStringData[row][column];
                    var instance = null;
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
                        this.chessboardData.setRowData(row, new Array());
                    if (null != instance)
                        instance.belongToPlayer = origString[0] == 'r' ? PlayerFlag.DownPlayer : PlayerFlag.UpPlayer;
                    this.chessboardData.putChessAtPos(instance, new ChessPosition(row, column));
                }
            }
        }
    };
    GameData.prototype.resetChessboardData = function () {
        for (var _i = 0, _a = this.chessboardData.allChessData; _i < _a.length; _i++) {
            var chessArray = _a[_i];
            for (var _b = 0, chessArray_1 = chessArray; _b < chessArray_1.length; _b++) {
                var restChess = chessArray_1[_b];
                if (null != restChess)
                    this.chessboardData.MoveChessToPos(restChess, restChess.initPos);
            }
        }
        for (var _c = 0, _d = this._stepResultArray; _c < _d.length; _c++) {
            var stepResult = _d[_c];
            if (null != stepResult.eatResult)
                this.chessboardData.putChessAtPos(stepResult.eatResult, stepResult.eatResult.initPos);
        }
        this._stepResultArray.splice(0, this._stepResultArray.length);
        this.resetSeletedChessIndex();
        this.resetChessMoveOutPos();
        this.resetEnemyLastTimeSelectedChessPos();
    };
    GameData.prototype.backStep = function () {
        var stepArray = this.stepResultArray;
        if (stepArray.length >= DefineString.defaultBackStep) {
            for (var backStep = DefineString.defaultBackStep; backStep > 0; backStep--) {
                var stepResult = this.backChess();
                this.chessboardData.MoveChessToPos(stepResult.chessControled, stepResult.startPos);
                var chessEated = stepResult.eatResult;
                if (null != chessEated)
                    this.chessboardData.putChessAtPos(stepResult.eatResult, stepResult.endPos);
            }
            this.resetSeletedChessIndex();
            this.resetChessMoveOutPos();
            this.resetEnemyLastTimeSelectedChessPos();
        }
    };
    GameData.prototype.hasChessBeenSelected = function () {
        return this.curSelectedChessPos.rowIndex != -1;
    };
    GameData.prototype.setSelectedChessIndex = function (chessPos) {
        this.curSelectedChessPos = chessPos;
    };
    GameData.prototype.resetSeletedChessIndex = function () {
        this.curSelectedChessPos = new ChessPosition(-1, -1);
    };
    GameData.prototype.moveCurSelectChessToPos = function (targetPos) {
        if (this.posElementIsInArray(targetPos, this._chessQueryResult.CanMoveToPosArray)) {
            var curSelectChess = this.chessboardData.getChessData(this.curSelectedChessPos);
            this.chessMoveOutPos = curSelectChess.position;
            this._stepResultArray.push(new PlayerStepResult(curSelectChess, null, curSelectChess.position, targetPos));
            this.chessboardData.MoveChessToPos(curSelectChess, targetPos);
            this._enemyLastTimeSelectedChessPos = curSelectChess.position;
        }
    };
    GameData.prototype.needCleanChessMoveOutState = function () {
        return this._chessMoveOutPos.rowIndex != -1;
    };
    Object.defineProperty(GameData.prototype, "chessMoveOutPos", {
        get: function () {
            return this._chessMoveOutPos;
        },
        set: function (pos) {
            this._chessMoveOutPos.rowIndex = pos.rowIndex;
            this._chessMoveOutPos.columnIndex = pos.columnIndex;
        },
        enumerable: true,
        configurable: true
    });
    GameData.prototype.resetChessMoveOutPos = function () {
        this._chessMoveOutPos.rowIndex = -1;
        this._chessMoveOutPos.columnIndex = -1;
    };
    Object.defineProperty(GameData.prototype, "enemyLastTimeSelectedChessPos", {
        get: function () {
            return this._enemyLastTimeSelectedChessPos;
        },
        enumerable: true,
        configurable: true
    });
    GameData.prototype.eatEnemyChess = function (targetPos) {
        var chessEated = null;
        if (this.posElementIsInArray(targetPos, this._chessQueryResult.CanEatPosArray)) {
            var curSelectChess = this.chessboardData.getChessData(this.curSelectedChessPos);
            this.chessMoveOutPos = curSelectChess.position;
            var stepResult = new PlayerStepResult(curSelectChess, chessEated, curSelectChess.position, targetPos);
            chessEated = this.chessboardData.MoveChessToPos(curSelectChess, targetPos);
            stepResult.eatResult = chessEated;
            this._stepResultArray.push(stepResult);
            this._enemyLastTimeSelectedChessPos = curSelectChess.position;
        }
        return chessEated;
    };
    GameData.prototype.resetEnemyLastTimeSelectedChessPos = function () {
        this._enemyLastTimeSelectedChessPos.rowIndex = -1;
        this._enemyLastTimeSelectedChessPos.columnIndex = -1;
    };
    GameData.prototype.posElementIsInArray = function (pos, posArray) {
        var result = false;
        for (var _i = 0, posArray_1 = posArray; _i < posArray_1.length; _i++) {
            var posElement = posArray_1[_i];
            if (posElement.rowIndex == pos.rowIndex && posElement.columnIndex == pos.columnIndex)
                result = true;
        }
        return result;
    };
    GameData.prototype.backChess = function () {
        return this._stepResultArray.pop();
    };
    Object.defineProperty(GameData.prototype, "stepResultArray", {
        get: function () {
            return this._stepResultArray;
        },
        enumerable: true,
        configurable: true
    });
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map