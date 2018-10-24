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
var AIPlayer = (function (_super) {
    __extends(AIPlayer, _super);
    function AIPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._defalutDepth = 3;
        _this._step = 0;
        return _this;
    }
    AIPlayer.prototype.OnStepEnd = function (e) {
        if (e.curPlayerFlag == this.playerData.flag) {
            //现在不清楚为什么同一帧发送同一事件两次，接收顺序不对，所以先将AI的反馈移到下一帧，解决后还原
            var timer = new egret.Timer(1);
            timer.addEventListener(egret.TimerEvent.TIMER, this.requestPlayChess, this);
            timer.start();
            var finalScore = this.calculateBestPlayLimitByDepth(this._defalutDepth, -Infinity, Infinity, e.chessboardData, this.playerData.flag);
            console.error("AI选择了value: " + this._bestSelect.chessValue + "    targetPos : " + this._bestSelectPos.rowIndex
                + "     " + this._bestSelectPos.columnIndex + "     总共决策了" + this._step + "次" + "best beta is : " + finalScore);
        }
    };
    //使用经典的alpha-beta裁枝算法来获取合适的出棋决策
    //此处价值是依据人类玩家评估的，alpha为人类玩家能获取的最好的值，beta值为AI能接受的最差值
    //核心思想为认定对手及我自己肯定会选取最优解（自己选择利益最大，给对手选择利益最小的）
    AIPlayer.prototype.calculateBestPlayLimitByDepth = function (depth, alpha, beta, chessboardData, curPlayerFlag) {
        //将结点局面评分转换为针对玩家的局面评分
        var chessboardEvaluateScore = EvaluateChessboardValueSystem.instance.evaluateScore(curPlayerFlag, chessboardData);
        var gameIsOver = chessboardEvaluateScore == Infinity;
        if (depth == this._defalutDepth && gameIsOver)
            this.setBestSelectWhenNotNeedRecursion(chessboardData);
        if (0 == depth || gameIsOver)
            return curPlayerFlag == this.playerData.flag ? -chessboardEvaluateScore : chessboardEvaluateScore;
        var highestAlpha = alpha;
        var lowestBeta = beta;
        for (var _i = 0, _a = chessboardData.allChessData; _i < _a.length; _i++) {
            var chessArray = _a[_i];
            for (var _b = 0, chessArray_1 = chessArray; _b < chessArray_1.length; _b++) {
                var chess = chessArray_1[_b];
                if (null != chess && chess.belongToPlayer == curPlayerFlag) {
                    this._step++;
                    var queryResult = chess.getChessQueryResult(chess.position, chessboardData);
                    var strategyPositions = queryResult.CanEatPosArray.concat(queryResult.CanMoveToPosArray);
                    for (var _c = 0, strategyPositions_1 = strategyPositions; _c < strategyPositions_1.length; _c++) {
                        var targetPos = strategyPositions_1[_c];
                        var nodeScore = 0;
                        var recordOrigPos = chess.position;
                        var moveResult = chessboardData.MoveChessToPos(chess, targetPos);
                        var nextPlayerFlag = curPlayerFlag == PlayerFlag.DownPlayer ? PlayerFlag.UpPlayer : PlayerFlag.DownPlayer;
                        nodeScore = this.calculateBestPlayLimitByDepth(depth - 1, highestAlpha, lowestBeta, chessboardData, nextPlayerFlag);
                        //reset chess position
                        chessboardData.MoveChessToPos(chess, recordOrigPos);
                        if (moveResult != null)
                            chessboardData.MoveChessToPos(moveResult, targetPos);
                        //AI决策时，本次递归有结果比人类能获取的价值（alpha）更差,结束本次递归(人类肯定不会选择这个决策，选了Ai肯定会给他这个决策)
                        if (curPlayerFlag == this.playerData.flag) {
                            if (nodeScore < alpha)
                                return alpha;
                            else {
                                if (nodeScore < lowestBeta) {
                                    lowestBeta = nodeScore;
                                    if (depth == this._defalutDepth) {
                                        this._bestSelect = chess;
                                        this._bestSelectPos = targetPos;
                                    }
                                }
                            }
                        }
                        else {
                            if (nodeScore > beta)
                                return beta;
                            else {
                                if (nodeScore > highestAlpha)
                                    highestAlpha = nodeScore;
                            }
                        }
                    }
                }
            }
        }
        return curPlayerFlag == this.playerData.flag ? lowestBeta : highestAlpha;
    };
    AIPlayer.prototype.requestPlayChess = function () {
        this.dispatchEvent(new RequestHandleChessGrid(RequestHandleChessGrid.eventName, this.playerData.flag, this._bestSelect.position));
        this.dispatchEvent(new RequestHandleChessGrid(RequestHandleChessGrid.eventName, this.playerData.flag, this._bestSelectPos));
        this._step = 0;
    };
    /*这个函数的作用是AI进入决策时（未进行子步推演），发现当前局面分为AI必胜（infinity），所以不需要进行递归运算，直接找出必胜的玩法
    */
    AIPlayer.prototype.setBestSelectWhenNotNeedRecursion = function (chessboardData) {
        for (var _i = 0, _a = chessboardData.allChessData; _i < _a.length; _i++) {
            var chessArray = _a[_i];
            for (var _b = 0, chessArray_2 = chessArray; _b < chessArray_2.length; _b++) {
                var chess = chessArray_2[_b];
                if (chess != null && chess.belongToPlayer == this.playerData.flag) {
                    var queryResult = chess.getChessQueryResult(chess.position, chessboardData);
                    for (var _c = 0, _d = queryResult.CanEatPosArray; _c < _d.length; _c++) {
                        var chessEatedPos = _d[_c];
                        var eatedChess = chessboardData.getChessData(chessEatedPos);
                        if (eatedChess.chessValue == Infinity) {
                            this._bestSelect = chess;
                            this._bestSelectPos = chessEatedPos;
                        }
                    }
                }
            }
        }
    };
    return AIPlayer;
}(PlayerBase));
__reflect(AIPlayer.prototype, "AIPlayer");
//# sourceMappingURL=AIPlayer.js.map