var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对棋盘的局势进行估值，用于AI计算，根据返回值进行决策
 * 估分基于三大模块：
 * 1.棋子本身的价值
 * 2.棋子所产生的威胁力以及保护能力
 * 3.棋子的移动能力
 * 所有相关数值以及估值模块比较粗糙，需要体验后分析后调整（复杂的情况要考虑棋子间配合，棋子后几步产生的威胁值，将帅安全，
 * 棋子所在棋盘位置的权重值等等，这些判断暂时不做）
 */
var EvaluateChessboardValueSystem = (function () {
    function EvaluateChessboardValueSystem() {
        this._defenceFactor = 0.2;
        this._threadFactor = 0.3;
        this._moveValue = 0.01;
        this._jiangIsAttackedValue = 5;
        this._jiangIsDefencedValue = 101;
    }
    Object.defineProperty(EvaluateChessboardValueSystem, "instance", {
        get: function () {
            if (null == this._instance)
                this._instance = new EvaluateChessboardValueSystem();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    EvaluateChessboardValueSystem.prototype.evaluateScore = function (curPlayerFlag, chessboardData) {
        var result = 0;
        var enemySituationScore = 0;
        var curPlayerSituationScore = 0;
        for (var _i = 0, _a = chessboardData.allChessData; _i < _a.length; _i++) {
            var chessArray = _a[_i];
            for (var _b = 0, chessArray_1 = chessArray; _b < chessArray_1.length; _b++) {
                var chess = chessArray_1[_b];
                if (null != chess) {
                    var singleChessTotalValue = 0;
                    var queryResult = chess.getChessQueryResult(chess.position, chessboardData);
                    var canEatPosArray = queryResult.CanEatPosArray;
                    var canMovePosArray = queryResult.CanMoveToPosArray;
                    var attackValue = 0;
                    var defenceValue = 0;
                    for (var _c = 0, canEatPosArray_1 = canEatPosArray; _c < canEatPosArray_1.length; _c++) {
                        var canEatPos = canEatPosArray_1[_c];
                        var canEatChess = chessboardData.getChessData(canEatPos);
                        //当前执棋玩家的棋子具有防御能力
                        if (chess.belongToPlayer == curPlayerFlag) {
                            var enemyQueryResult = canEatChess.getChessQueryResult(canEatPos, chessboardData);
                            var enemyCanEatPosArray = enemyQueryResult.CanEatPosArray;
                            for (var _d = 0, enemyCanEatPosArray_1 = enemyCanEatPosArray; _d < enemyCanEatPosArray_1.length; _d++) {
                                var enemyCanEatPos = enemyCanEatPosArray_1[_d];
                                var defenceChess = chessboardData.getChessData(enemyCanEatPos);
                                if (defenceChess.chessValue == Infinity)
                                    defenceValue += this._defenceFactor * this._jiangIsDefencedValue;
                                else
                                    defenceValue += this._defenceFactor * defenceChess.chessValue;
                            }
                        }
                        if (canEatChess.chessValue == Infinity) {
                            //可以吃帅的话直接返回极值(前提是当前执棋玩家的棋子)
                            if (chess.belongToPlayer == curPlayerFlag)
                                return Infinity;
                            else
                                singleChessTotalValue += this._jiangIsAttackedValue;
                        }
                        else
                            attackValue += this._threadFactor * canEatChess.chessValue;
                        singleChessTotalValue += attackValue + defenceValue;
                    }
                    //对棋子的移动能力进行加分
                    if (chess.chessValue != Infinity) {
                        for (var _e = 0, canMovePosArray_1 = canMovePosArray; _e < canMovePosArray_1.length; _e++) {
                            var canMovePos = canMovePosArray_1[_e];
                            singleChessTotalValue += this._moveValue;
                        }
                    }
                    //棋子的基础战力加分
                    if (chess.chessValue != Infinity)
                        singleChessTotalValue += chess.chessValue;
                    if (chess.belongToPlayer == curPlayerFlag)
                        curPlayerSituationScore += singleChessTotalValue;
                    else
                        enemySituationScore += singleChessTotalValue;
                }
            }
            result = curPlayerSituationScore - enemySituationScore;
        }
        return result;
    };
    return EvaluateChessboardValueSystem;
}());
__reflect(EvaluateChessboardValueSystem.prototype, "EvaluateChessboardValueSystem");
//# sourceMappingURL=EvaluateChessboardValueSystem.js.map