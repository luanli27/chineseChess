var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessPosition = (function () {
    function ChessPosition(rowIndex, columnIndex) {
        this._rowIndex = rowIndex;
        this._columnIndex = columnIndex;
    }
    Object.defineProperty(ChessPosition.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (rowIndex) {
            this._rowIndex = rowIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessPosition.prototype, "columnIndex", {
        get: function () {
            return this._columnIndex;
        },
        set: function (columnIndex) {
            this._columnIndex = columnIndex;
        },
        enumerable: true,
        configurable: true
    });
    return ChessPosition;
}());
__reflect(ChessPosition.prototype, "ChessPosition");
//# sourceMappingURL=ChessPosition.js.map