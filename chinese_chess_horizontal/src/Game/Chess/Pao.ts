class Pao extends ChessBase
{
    public getChessQueryResult(pos : ChessPosition, boardData : ChessboardData) : ChessQueryResult
    {
        let result = new ChessQueryResult();

        for(let i = pos.rowIndex - 1, getBlock = false; i >= 0; i--)
        {   
            let chessPos = new ChessPosition(i,pos.columnIndex);
            let chess = boardData.getChessData(chessPos);
            if(null == chess)
            {
                if(!getBlock)
                    result.CanMoveToPosArray.push(chessPos);
            }
            else
            {
                if(getBlock)
                {
                    if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(chessPos);
                    break;
                }
                else
                    getBlock = true;
            }
        }

        for(let i = pos.rowIndex + 1, getBlock = false; i < DefineString.rowCount; i++)
        {   
            let chessPos = new ChessPosition(i,pos.columnIndex);
            let chess = boardData.getChessData(chessPos);
            if(null == chess)
            {
                if(!getBlock)
                    result.CanMoveToPosArray.push(chessPos);
            }
            else
            {
                if(getBlock)
                {
                    if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(chessPos);
                    break;
                }
                else
                    getBlock = true;
            }
        }

        for(let j = pos.columnIndex - 1, getBlock = false; j >= 0; j--)
        {   
            let chessPos = new ChessPosition(pos.rowIndex,j);
            let chess = boardData.getChessData(chessPos);
            if(null == chess)
            {
                if(!getBlock)
                    result.CanMoveToPosArray.push(chessPos);
            }
            else
            {
                if(getBlock)
                {
                    if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(chessPos);
                    break;
                }
                else
                    getBlock = true;
            }
        }

        for(let j = pos.columnIndex + 1, getBlock = false; j < DefineString.colomnCount; j++)
        {   
            let chessPos = new ChessPosition(pos.rowIndex,j);
            let chess = boardData.getChessData(chessPos);
            if(null == chess)
            {
                if(!getBlock)
                    result.CanMoveToPosArray.push(chessPos);
            }
            else
            {
                if(getBlock)
                {
                    if(chess.belongToPlayer != this.belongToPlayer)
                    result.CanEatPosArray.push(chessPos);
                    break;
                }
                else
                    getBlock = true;
            }
        }

        return result;
    }
}