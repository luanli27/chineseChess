class ChessPosition
{
    private _rowIndex : number;
    private _columnIndex : number;

    public constructor(rowIndex : number, columnIndex : number)
    {
        this._rowIndex = rowIndex;
        this._columnIndex = columnIndex;
    }

    public get rowIndex()
    {
        return this._rowIndex;
    }

    public get columnIndex()
    {
        return this._columnIndex;
    }

    public set rowIndex(rowIndex : number)
    {
        this._rowIndex = rowIndex;
    }

    public set columnIndex(columnIndex : number)
    {
        this._columnIndex = columnIndex;
    }
}