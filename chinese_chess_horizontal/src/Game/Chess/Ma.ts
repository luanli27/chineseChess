class Ma extends ChessBase
{
    public getChessQueryResult(pos : ChessPosition, boardData : ChessboardData) : ChessQueryResult
    {
        let result = new ChessQueryResult();
        let targetPositons: Array<Array<ChessPosition>> = [[new ChessPosition(pos.rowIndex - 2, pos.columnIndex - 1), new ChessPosition(pos.rowIndex - 1, pos.columnIndex)],
                                                           [new ChessPosition(pos.rowIndex - 2, pos.columnIndex + 1), new ChessPosition(pos.rowIndex - 1, pos.columnIndex)],
                                                           [new ChessPosition(pos.rowIndex + 2, pos.columnIndex - 1), new ChessPosition(pos.rowIndex + 1, pos.columnIndex)],
                                                           [new ChessPosition(pos.rowIndex + 2, pos.columnIndex + 1), new ChessPosition(pos.rowIndex + 1, pos.columnIndex)],
                                                           [new ChessPosition(pos.rowIndex - 1, pos.columnIndex - 2), new ChessPosition(pos.rowIndex, pos.columnIndex - 1)],
                                                           [new ChessPosition(pos.rowIndex - 1, pos.columnIndex + 2), new ChessPosition(pos.rowIndex, pos.columnIndex + 1)],
                                                           [new ChessPosition(pos.rowIndex + 1, pos.columnIndex - 2), new ChessPosition(pos.rowIndex, pos.columnIndex - 1)],
                                                           [new ChessPosition(pos.rowIndex + 1, pos.columnIndex + 2), new ChessPosition(pos.rowIndex, pos.columnIndex + 1)],
                                                         ];                                     
        for(let targetPos of targetPositons)
            this.filterPos(targetPos[0], targetPos[1], boardData, result);

        return result;
    }

    private filterPos(targetPos : ChessPosition, blockPos : ChessPosition, boardData : ChessboardData, result : ChessQueryResult)
    {
        if (!this.posIsOutOfChessboard(targetPos) && null == boardData.getChessData(blockPos)) 
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