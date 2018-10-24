abstract class ChessBase
{
    public belongToPlayer : PlayerFlag;
    private _initPos : ChessPosition;
    public get initPos()
    {
        return this._initPos;
    }

    protected _position : ChessPosition;
    public get position()
    {
        return this._position;
    }
    public set position(pos : ChessPosition)
    {
        this._position = pos;
    }

    protected _chessvalue : number;
    public get chessValue()
    {
        return this._chessvalue;
    }

    //返回可移动位置数组和可吃棋子的位置数组
    public abstract getChessQueryResult(pos : ChessPosition, boardData : ChessboardData) : ChessQueryResult;
    public constructor(chessValue : number, initPos : ChessPosition)
    {
        this._chessvalue = chessValue;
        this._initPos = initPos;
    }
    public posIsOutOfChessboard(pos : ChessPosition) : boolean
    {
        let result = false;
        if(pos.rowIndex < 0 || pos.rowIndex >= DefineString.rowCount || pos.columnIndex < 0 || pos.columnIndex >= DefineString.colomnCount)
        {
            result = true;
        }

        return result;
    }

    //目标位置是否在军营内（就是将，仕所呆的九宫格）
    public targetPosIsInCampsite(pos : ChessPosition) : boolean
    {
        let result;
        let inLegalRow = this.belongToPlayer  == PlayerFlag.DownPlayer ? pos.rowIndex >= DefineString.downCampsiteLimitRow
                       : pos.rowIndex <= DefineString.upCampsiteLimitRow;
        let inLegalColumn = pos.columnIndex >= DefineString.campsiteLeftLimitColumn 
                         && pos.columnIndex <= DefineString.campsiteRightLimitColumn; 
        result = inLegalRow && inLegalColumn;
        return result;
    }

    public targetPosIsInSelfField(pos : ChessPosition)
    {
        let result = this.belongToPlayer == PlayerFlag.DownPlayer ? pos.rowIndex >= DefineString.riverRow 
                          : pos.rowIndex < DefineString.riverRow;
        
        return result;
    }
}