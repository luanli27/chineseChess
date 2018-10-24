class PlayerStepResult
{
    public chessControled : ChessBase;
    public eatResult : ChessBase;
    public startPos : ChessPosition;
    public endPos : ChessPosition;

    public constructor(chessControled : ChessBase, eatResult : ChessBase, startPos : ChessPosition, endPos : ChessPosition)
    {
        this.chessControled = chessControled;
        this.eatResult = eatResult;
        this.startPos = new ChessPosition(startPos.rowIndex, startPos.columnIndex);
        this.endPos =  new ChessPosition(endPos.rowIndex, endPos.columnIndex);
    }
}