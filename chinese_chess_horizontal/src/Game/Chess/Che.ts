class Che extends ChessBase
{
    public getChessQueryResult(pos : ChessPosition, boardData : ChessboardData) : ChessQueryResult
    {
        let result = new ChessQueryResult();

        for(let i = pos.rowIndex - 1; i >= 0; i--)
        {   
            let chessPos = new ChessPosition(i,pos.columnIndex);
            let chess = boardData.getChessData(chessPos);
            if(null == chess)
                result.CanMoveToPosArray.push(chessPos);
            else
            {
                if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(chessPos);
                break;
            }
        }

        for(let i = pos.rowIndex + 1; i < DefineString.rowCount; i++)
        {   
            let chessPos = new ChessPosition(i,pos.columnIndex);
            let chess = boardData.getChessData(chessPos);
            if(null == chess)
                result.CanMoveToPosArray.push(chessPos);
            else
            {
                if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(chessPos)
                break;
            }
        }

        for(let j = pos.columnIndex - 1; j >= 0; j--)
        {   
            let chessPos = new ChessPosition(pos.rowIndex,j);
            let chess = boardData.getChessData(chessPos);
            if(null == chess)
                result.CanMoveToPosArray.push(chessPos);
            else
            {
                if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(chessPos)
                break;
            }
        }

        for(let j = pos.columnIndex + 1; j < DefineString.colomnCount; j++)
        {   
            let chessPos = new ChessPosition(pos.rowIndex,j);
            let chess = boardData.getChessData(chessPos);
            if(null == chess)
                result.CanMoveToPosArray.push(chessPos);
            else
            {
                if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(chessPos)
                break;
            }
        }

        return result;
    }
}