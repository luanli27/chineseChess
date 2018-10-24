var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessBase = (function () {
    function ChessBase(chessValue, initPos) {
        this._chessvalue = chessValue;
        this._initPos = initPos;
    }
    Object.defineProperty(ChessBase.prototype, "initPos", {
        get: function () {
            return this._initPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessBase.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (pos) {
            this._position = pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessBase.prototype, "chessValue", {
        get: function () {
            return this._chessvalue;
        },
        enumerable: true,
        configurable: true
    });
    ChessBase.prototype.posIsOutOfChessboard = function (pos) {
        var result = false;
        if (pos.rowIndex < 0 || pos.rowIndex >= DefineString.rowCount || pos.columnIndex < 0 || pos.columnIndex >= DefineString.colomnCount) {
            result = true;
        }
        return result;
    };
    //目标位置是否在军营内（就是将，仕所呆的九宫格）
    ChessBase.prototype.targetPosIsInCampsite = function (pos) {
        var result;
        var inLegalRow = this.belongToPlayer == PlayerFlag.DownPlayer ? pos.rowIndex >= DefineString.downCampsiteLimitRow
            : pos.rowIndex <= DefineString.upCampsiteLimitRow;
        var inLegalColumn = pos.columnIndex >= DefineString.campsiteLeftLimitColumn
            && pos.columnIndex <= DefineString.campsiteRightLimitColumn;
        result = inLegalRow && inLegalColumn;
        return result;
    };
    ChessBase.prototype.targetPosIsInSelfField = function (pos) {
        var result = this.belongToPlayer == PlayerFlag.DownPlayer ? pos.rowIndex >= DefineString.riverRow
            : pos.rowIndex < DefineString.riverRow;
        return result;
    };
    return ChessBase;
}());
__reflect(ChessBase.prototype, "ChessBase");
//# sourceMappingURL=ChessBase.js.map