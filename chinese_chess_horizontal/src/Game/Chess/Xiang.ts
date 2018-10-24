class Xiang extends ChessBase
{
    public getChessQueryResult(pos : ChessPosition, boardData : ChessboardData) : ChessQueryResult
    {
        let result = new ChessQueryResult();
        let targetPositons: Array<ChessPosition> = [new ChessPosition(pos.rowIndex - 2, pos.columnIndex - 2),
                                                    new ChessPosition(pos.rowIndex - 2, pos.columnIndex + 2),
                                                    new ChessPosition(pos.rowIndex + 2, pos.columnIndex - 2), 
                                                    new ChessPosition(pos.rowIndex + 2, pos.columnIndex + 2)
                                                   ];    
        for(let targetPos of targetPositons)
            this.filterPos(targetPos, boardData, result);                                   
        return result;
    }

    private filterPos(targetPos : ChessPosition, boardData : ChessboardData, result : ChessQueryResult)
    {
        if (!this.posIsOutOfChessboard(targetPos)) 
        {      
            let isInSelfField = this.targetPosIsInSelfField(targetPos);
            if(isInSelfField)
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
}