class Jiang extends ChessBase
{
    public getChessQueryResult(pos : ChessPosition, boardData : ChessboardData) : ChessQueryResult
    {
        let result = new ChessQueryResult();
        let targetPositons: Array<ChessPosition> = [new ChessPosition(pos.rowIndex - 1, pos.columnIndex),
                                                    new ChessPosition(pos.rowIndex + 1, pos.columnIndex),
                                                    new ChessPosition(pos.rowIndex, pos.columnIndex - 1), 
                                                    new ChessPosition(pos.rowIndex, pos.columnIndex + 1)
                                                   ];    
        for(let targetPos of targetPositons)
            this.filterPos(targetPos, boardData, result);  
        let eatJiangResult = this.eatEnemyJiangResult(boardData);      
        if(null != eatJiangResult)                 
            result.CanEatPosArray.push(eatJiangResult);          
        return result;
    }

    private filterPos(targetPos : ChessPosition, boardData : ChessboardData, result : ChessQueryResult)
    {
        if (!this.posIsOutOfChessboard(targetPos)) 
        {      
            let inCampsite = this.targetPosIsInCampsite(targetPos);    
            if(inCampsite)
            {
                let chess = boardData.getChessData(targetPos);
                if (null == chess)
                    result.CanMoveToPosArray.push(targetPos);
                else 
                {
                    if (chess.belongToPlayer != this.belongToPlayer)
                        result.CanEatPosArray.push(targetPos);
                }     
            }         
        }
    }

    private eatEnemyJiangResult(boardData : ChessboardData) : ChessPosition
    {
        let result : ChessPosition = null;
        let checkPos = new ChessPosition(this._position.rowIndex, this._position.columnIndex);
        let flag = this.belongToPlayer;
        if(flag == PlayerFlag.DownPlayer)
        {
            for(let rowIndex = this._position.rowIndex - 1; rowIndex >= 0; rowIndex--)
            {
                checkPos.rowIndex = rowIndex;
                let chess = boardData.getChessData(checkPos);
                if(null != chess)
                {
                    if(chess.chessValue != this._chessvalue)
                        break;
                    else
                    {
                        result = checkPos;
                        break;
                    }
                }
            }
        }
        else if(flag == PlayerFlag.UpPlayer)
        {
            for(let rowIndex = this._position.rowIndex + 1; rowIndex < DefineString.rowCount; rowIndex++)
            {
                checkPos.rowIndex = rowIndex;
                let chess = boardData.getChessData(checkPos);
                if(null != chess)
                {
                    if(chess.chessValue != this._chessvalue)
                        break;
                    else
                    {
                        result = checkPos;
                        break;
                    }
                }
            }
        }
    

        return result;
    }
}