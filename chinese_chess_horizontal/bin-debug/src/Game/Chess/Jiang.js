var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Jiang = (function (_super) {
    __extends(Jiang, _super);
    function Jiang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Jiang.prototype.getChessQueryResult = function (pos, boardData) {
        var result = new ChessQueryResult();
        var targetPositons = [new ChessPosition(pos.rowIndex - 1, pos.columnIndex),
            new ChessPosition(pos.rowIndex + 1, pos.columnIndex),
            new ChessPosition(pos.rowIndex, pos.columnIndex - 1),
            new ChessPosition(pos.rowIndex, pos.columnIndex + 1)
        ];
        for (var _i = 0, targetPositons_1 = targetPositons; _i < targetPositons_1.length; _i++) {
            var targetPos = targetPositons_1[_i];
            this.filterPos(targetPos, boardData, result);
        }
        var eatJiangResult = this.eatEnemyJiangResult(boardData);
        if (null != eatJiangResult)
            result.CanEatPosArray.push(eatJiangResult);
        return result;
    };
    Jiang.prototype.filterPos = function (targetPos, boardData, result) {
        if (!this.posIsOutOfChessboard(targetPos)) {
            var inCampsite = this.targetPosIsInCampsite(targetPos);
            if (inCampsite) {
                var chess = boardData.getChessData(targetPos);
                if (null == chess)
                    result.CanMoveToPosArray.push(targetPos);
                else {
                    if (chess.belongToPlayer != this.belongToPlayer)
                        result.CanEatPosArray.push(targetPos);
                }
            }
        }
    };
    Jiang.prototype.eatEnemyJiangResult = function (boardData) {
        var result = null;
        var checkPos = new ChessPosition(this._position.rowIndex, this._position.columnIndex);
        var flag = this.belongToPlayer;
        if (flag == PlayerFlag.DownPlayer) {
            for (var rowIndex = this._position.rowIndex - 1; rowIndex >= 0; rowIndex--) {
                checkPos.rowIndex = rowIndex;
                var chess = boardData.getChessData(checkPos);
                if (null != chess) {
                    if (chess.chessValue != this._chessvalue)
                        break;
                    else {
                        result = checkPos;
                        break;
                    }
                }
            }
        }
        else if (flag == PlayerFlag.UpPlayer) {
            for (var rowIndex = this._position.rowIndex + 1; rowIndex < DefineString.rowCount; rowIndex++) {
                checkPos.rowIndex = rowIndex;
                var chess = boardData.getChessData(checkPos);
                if (null != chess) {
                    if (chess.chessValue != this._chessvalue)
                        break;
                    else {
                        result = checkPos;
                        break;
                    }
                }
            }
        }
        return result;
    };
    return Jiang;
}(ChessBase));
__reflect(Jiang.prototype, "Jiang");
//# sourceMappingURL=Jiang.js.map