var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessboardData = (function () {
    function ChessboardData(allChessData) {
        this._allChessData = allChessData;
    }
    Object.defineProperty(ChessboardData.prototype, "allChessData", {
        get: function () {
            return this._allChessData;
        },
        enumerable: true,
        configurable: true
    });
    ChessboardData.prototype.getRowData = function (rowIndex) {
        return this._allChessData[rowIndex];
    };
    ChessboardData.prototype.setRowData = function (rowIndex, rowData) {
        this._allChessData[rowIndex] = rowData;
    };
    ChessboardData.prototype.getColumnData = function (columnIndex) {
        return this._allChessData[columnIndex];
    };
    ChessboardData.prototype.setColumnData = function (columnIndex, ColomnData) {
        this._allChessData[columnIndex] = ColomnData;
    };
    ChessboardData.prototype.getChessData = function (chessPos) {
        return this._allChessData[chessPos.rowIndex][chessPos.columnIndex];
    };
    ChessboardData.prototype.putChessAtPos = function (chess, chessPos) {
        if (null != chess)
            chess.position = chessPos;
        this._allChessData[chessPos.rowIndex][chessPos.columnIndex] = chess;
    };
    ChessboardData.prototype.MoveChessToPos = function (chess, targetPos) {
        var result = null;
        if (null != chess) {
            result = this._allChessData[targetPos.rowIndex][targetPos.columnIndex];
            this._allChessData[chess.position.rowIndex][chess.position.columnIndex] = null;
            chess.position = targetPos;
            this._allChessData[targetPos.rowIndex][targetPos.columnIndex] = chess;
        }
        return result;
    };
    return ChessboardData;
}());
__reflect(ChessboardData.prototype, "ChessboardData");
//# sourceMappingURL=ChessboardData.js.map