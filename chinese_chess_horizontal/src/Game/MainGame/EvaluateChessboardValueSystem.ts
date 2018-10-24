/**
 * 对棋盘的局势进行估值，用于AI计算，根据返回值进行决策
 * 估分基于三大模块：
 * 1.棋子本身的价值
 * 2.棋子所产生的威胁力以及保护能力
 * 3.棋子的移动能力
 * 所有相关数值以及估值模块比较粗糙，需要体验后分析后调整（复杂的情况要考虑棋子间配合，棋子后几步产生的威胁值，将帅安全，
 * 棋子所在棋盘位置的权重值等等，这些判断暂时不做）
 */
class EvaluateChessboardValueSystem {
    private readonly _defenceFactor = 0.2;
    private readonly _threadFactor = 0.3;
    private readonly _moveValue = 0.01;
    private readonly _jiangIsAttackedValue = 5;
    private readonly _jiangIsDefencedValue = 101;
    private static _instance: EvaluateChessboardValueSystem;
    private constructor() { }

    public static get instance() {
        if (null == this._instance)
            this._instance = new EvaluateChessboardValueSystem();

        return this._instance;
    }

    public evaluateScore(curPlayerFlag: PlayerFlag, chessboardData: ChessboardData): number {
        let result = 0;
        let enemySituationScore = 0;
        let curPlayerSituationScore = 0;

        for (let chessArray of chessboardData.allChessData) 
        {
            for (let chess of chessArray) {
                if (null != chess) 
                {
                    let singleChessTotalValue = 0;
                    let queryResult = chess.getChessQueryResult(chess.position, chessboardData);
                    let canEatPosArray = queryResult.CanEatPosArray;
                    let canMovePosArray = queryResult.CanMoveToPosArray;
                    let attackValue = 0;
                    let defenceValue = 0;


                    for (let canEatPos of canEatPosArray) 
                    {
                        let canEatChess = chessboardData.getChessData(canEatPos);
                        //当前执棋玩家的棋子具有防御能力
                        if(chess.belongToPlayer == curPlayerFlag)
                        {
                            let enemyQueryResult = canEatChess.getChessQueryResult(canEatPos, chessboardData);
                            let enemyCanEatPosArray = enemyQueryResult.CanEatPosArray;
                            for (let enemyCanEatPos of enemyCanEatPosArray) 
                            {
                                let defenceChess = chessboardData.getChessData(enemyCanEatPos);
                                if(defenceChess.chessValue == Infinity)
                                    defenceValue += this._defenceFactor * this._jiangIsDefencedValue;
                                else    
                                    defenceValue += this._defenceFactor * defenceChess.chessValue;
                            }    
                        }
                        if (canEatChess.chessValue == Infinity)
                        {
                            //可以吃帅的话直接返回极值(前提是当前执棋玩家的棋子)
                            if(chess.belongToPlayer == curPlayerFlag)
                                return Infinity;
                            else
                                singleChessTotalValue += this._jiangIsAttackedValue;
                        }
                        else
                             attackValue += this._threadFactor * canEatChess.chessValue;
                        singleChessTotalValue += attackValue + defenceValue;
                    }

                    //对棋子的移动能力进行加分
                    if (chess.chessValue != Infinity) 
                    {
                        for (let canMovePos of canMovePosArray) 
                            singleChessTotalValue += this._moveValue;
                    }

                    //棋子的基础战力加分
                    if (chess.chessValue != Infinity)
                        singleChessTotalValue += chess.chessValue;

                    if(chess.belongToPlayer == curPlayerFlag)
                        curPlayerSituationScore += singleChessTotalValue;
                    else
                        enemySituationScore += singleChessTotalValue;
                }
            }

            result = curPlayerSituationScore - enemySituationScore;
        }

        return result;
    }
}