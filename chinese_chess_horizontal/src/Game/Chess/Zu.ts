class Zu extends ChessBase
{
    public getChessQueryResult(pos : ChessPosition, boardData : ChessboardData) : ChessQueryResult
    {
        let result = new ChessQueryResult();
        let isInSelfField = this.targetPosIsInSelfField(pos);
        let verticalDirection = this.belongToPlayer == PlayerFlag.DownPlayer ? -1 : 1;
        let targetPosInSelfField : Array<ChessPosition> = [new ChessPosition(pos.rowIndex + verticalDirection, pos.columnIndex)]; 
        let targetPosInEnemyField : Array<ChessPosition> = [new ChessPosition(pos.rowIndex + verticalDirection, pos.columnIndex),
                                                            new ChessPosition(pos.rowIndex, pos.columnIndex - 1),
                                                            new ChessPosition(pos.rowIndex, pos.columnIndex + 1)]; 
        let targetPositons = isInSelfField ? targetPosInSelfField : targetPosInEnemyField;
        for(let targetPos of targetPositons)
            this.filterPos(targetPos, boardData, result);
        return result;
    }

    private filterPos(targetPos : ChessPosition, boardData : ChessboardData, result : ChessQueryResult)
    {
       if (!this.posIsOutOfChessboard(targetPos)) 
        {      
            let chess = boardData.getChessData(targetPos);
            if (null == chess)
                result.CanMoveToPosArray.push(targetPos);
            else 
            {
                if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(targetPos);
            }          
        }
    }
}