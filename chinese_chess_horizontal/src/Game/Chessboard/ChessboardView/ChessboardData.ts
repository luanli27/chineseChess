class ChessboardData
{
    private _allChessData : Array<Array<ChessBase>>;
    public constructor(allChessData : Array<Array<ChessBase>>)
    {
        this._allChessData = allChessData;
    }

    public get allChessData()
    {
        return this._allChessData;
    }

    public getRowData(rowIndex : number)
    {
        return this._allChessData[rowIndex];
    }

    public setRowData(rowIndex : number, rowData : Array<ChessBase>)
    {
        this._allChessData[rowIndex] = rowData;
    }

    public getColumnData(columnIndex : number)
    {
        return this._allChessData[columnIndex];
    }

    public setColumnData(columnIndex : number, ColomnData : Array<ChessBase>)
    {
        this._allChessData[columnIndex] = ColomnData;
    }

    public getChessData(chessPos : ChessPosition)
    {
         return this._allChessData[chessPos.rowIndex][chessPos.columnIndex];
    }

    public putChessAtPos( chess : ChessBase, chessPos : ChessPosition)
    {
        if(null != chess)
            chess.position = chessPos;
        this._allChessData[chessPos.rowIndex][chessPos.columnIndex] = chess;
    }

    public MoveChessToPos(chess : ChessBase, targetPos : ChessPosition) : ChessBase
    {
        let result = null;
        if(null != chess)
        {
            result = this._allChessData[targetPos.rowIndex][targetPos.columnIndex];
            this._allChessData[chess.position.rowIndex][chess.position.columnIndex] = null;
            chess.position = targetPos;
            this._allChessData[targetPos.rowIndex][targetPos.columnIndex] = chess;
        }

        return result;
    }
}