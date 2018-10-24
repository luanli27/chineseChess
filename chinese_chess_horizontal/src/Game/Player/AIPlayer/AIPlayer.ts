class AIPlayer extends PlayerBase {
    private readonly _defalutDepth = 3;
    private _bestSelect: ChessBase;
    private _bestSelectPos: ChessPosition;
    private _step = 0;

    public OnStepEnd(e: OnStepEndEvent) {
        if (e.curPlayerFlag == this.playerData.flag) 
        {
            //现在不清楚为什么同一帧发送同一事件两次，接收顺序不对，所以先将AI的反馈移到下一帧，解决后还原
            let timer = new egret.Timer(1);
		    timer.addEventListener(egret.TimerEvent.TIMER, this.requestPlayChess, this);
		    timer.start();
            let finalScore = this.calculateBestPlayLimitByDepth(this._defalutDepth, -Infinity, Infinity, e.chessboardData, this.playerData.flag);
            console.error("AI选择了value: " + this._bestSelect.chessValue + "    targetPos : " + this._bestSelectPos.rowIndex
                + "     " + this._bestSelectPos.columnIndex + "     总共决策了" + this._step + "次" +"best beta is : "+ finalScore);
        }
    }

    //使用经典的alpha-beta裁枝算法来获取合适的出棋决策
    //此处价值是依据人类玩家评估的，alpha为人类玩家能获取的最好的值，beta值为AI能接受的最差值
    //核心思想为认定对手及我自己肯定会选取最优解（自己选择利益最大，给对手选择利益最小的）
    public calculateBestPlayLimitByDepth(depth: number, alpha: number, beta: number, chessboardData: ChessboardData,
        curPlayerFlag: PlayerFlag): number {
        //将结点局面评分转换为针对玩家的局面评分
        let chessboardEvaluateScore = EvaluateChessboardValueSystem.instance.evaluateScore(curPlayerFlag, chessboardData);
        let gameIsOver = chessboardEvaluateScore == Infinity;
        if(depth == this._defalutDepth && gameIsOver)
            this.setBestSelectWhenNotNeedRecursion(chessboardData);
        if (0 == depth || gameIsOver)
            return curPlayerFlag == this.playerData.flag ? -chessboardEvaluateScore : chessboardEvaluateScore;

        let highestAlpha = alpha;
        let lowestBeta = beta;

        for (let chessArray of chessboardData.allChessData) 
        {
            for (let chess of chessArray)
             {
                if (null != chess && chess.belongToPlayer == curPlayerFlag) 
                {
                    this._step ++;
                    let queryResult = chess.getChessQueryResult(chess.position, chessboardData);
                    let strategyPositions = queryResult.CanEatPosArray.concat(queryResult.CanMoveToPosArray);
                    for (let targetPos of strategyPositions) 
                    {
                        let nodeScore = 0;
                        let recordOrigPos = chess.position;
                        let moveResult = chessboardData.MoveChessToPos(chess, targetPos);
                        let nextPlayerFlag = curPlayerFlag == PlayerFlag.DownPlayer ? PlayerFlag.UpPlayer : PlayerFlag.DownPlayer;
  
                        nodeScore = this.calculateBestPlayLimitByDepth(depth - 1, highestAlpha, lowestBeta, chessboardData, nextPlayerFlag);
                         //reset chess position
                        chessboardData.MoveChessToPos(chess, recordOrigPos);
                        if(moveResult != null)
                            chessboardData.MoveChessToPos(moveResult, targetPos);
                        //AI决策时，本次递归有结果比人类能获取的价值（alpha）更差,结束本次递归(人类肯定不会选择这个决策，选了Ai肯定会给他这个决策)
                        if (curPlayerFlag == this.playerData.flag) 
                        {
                            if (nodeScore < alpha)   
                                return alpha;
                            else 
                            {  
                                if(nodeScore < lowestBeta)
                                {
                                    lowestBeta = nodeScore;
                                    if(depth == this._defalutDepth)
                                    {
                                        this._bestSelect = chess;
                                        this._bestSelectPos = targetPos;
                                    }
                                }                        
                            }
                        }
                        //人类决策时，当前策略价值比AI能接受的价值更高，结束本次递归
                        else {
                            if (nodeScore > beta)
                                return beta;
                            else 
                            {
                                if(nodeScore > highestAlpha)
                                    highestAlpha = nodeScore;
                            }
                        }
                    }
                }
            }
        }

        return curPlayerFlag == this.playerData.flag ? lowestBeta : highestAlpha;
    }

    private requestPlayChess()
    {
        this.dispatchEvent(new RequestHandleChessGrid(RequestHandleChessGrid.eventName, this.playerData.flag, this._bestSelect.position));
        this.dispatchEvent(new RequestHandleChessGrid(RequestHandleChessGrid.eventName, this.playerData.flag, this._bestSelectPos));
        this._step = 0;
    }

    /*这个函数的作用是AI进入决策时（未进行子步推演），发现当前局面分为AI必胜（infinity），所以不需要进行递归运算，直接找出必胜的玩法
    */
    private setBestSelectWhenNotNeedRecursion(chessboardData: ChessboardData)
    {
        for(let chessArray of chessboardData.allChessData)
        {   
            for (let chess of chessArray)
            {
                if(chess != null && chess.belongToPlayer == this.playerData.flag)
                {
                    let queryResult = chess.getChessQueryResult(chess.position, chessboardData);
                    for(let chessEatedPos of queryResult.CanEatPosArray)
                    {
                        let eatedChess = chessboardData.getChessData(chessEatedPos);
                        if(eatedChess.chessValue == Infinity)
                        {
                            this._bestSelect = chess;
                            this._bestSelectPos = chessEatedPos;
                        }
                    }
                }
            }
        }
    }
}