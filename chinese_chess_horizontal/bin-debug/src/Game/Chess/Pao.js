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
var Pao = (function (_super) {
    __extends(Pao, _super);
    function Pao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pao.prototype.getChessQueryResult = function (pos, boardData) {
        var result = new ChessQueryResult();
        for (var i = pos.rowIndex - 1, getBlock = false; i >= 0; i--) {
            var chessPos = new ChessPosition(i, pos.columnIndex);
            var chess = boardData.getChessData(chessPos);
            if (null == chess) {
                if (!getBlock)
                    result.CanMoveToPosArray.push(chessPos);
            }
            else {
                if (getBlock) {
                    if (chess.belongToPlayer != this.belongToPlayer)
                        result.CanEatPosArray.push(chessPos);
                    break;
                }
                else
                    getBlock = true;
            }
        }
        for (var i = pos.rowIndex + 1, getBlock = false; i < DefineString.rowCount; i++) {
            var chessPos = new ChessPosition(i, pos.columnIndex);
            var chess = boardData.getChessData(chessPos);
            if (null == chess) {
                if (!getBlock)
                    result.CanMoveToPosArray.push(chessPos);
            }
            else {
                if (getBlock) {
                    if (chess.belongToPlayer != this.belongToPlayer)
                        result.CanEatPosArray.push(chessPos);
                    break;
                }
                else
                    getBlock = true;
            }
        }
        for (var j = pos.columnIndex - 1, getBlock = false; j >= 0; j--) {
            var chessPos = new ChessPosition(pos.rowIndex, j);
            var chess = boardData.getChessData(chessPos);
            if (null == chess) {
                if (!getBlock)
                    result.CanMoveToPosArray.push(chessPos);
            }
            else {
                if (getBlock) {
                    if (chess.belongToPlayer != this.belongToPlayer)
                        result.CanEatPosArray.push(chessPos);
                    break;
                }
                else
                    getBlock = true;
            }
        }
        for (var j = pos.columnIndex + 1, getBlock = false; j < DefineString.colomnCount; j++) {
            var chessPos = new ChessPosition(pos.rowIndex, j);
            var chess = boardData.getChessData(chessPos);
            if (null == chess) {
                if (!getBlock)
                    result.CanMoveToPosArray.push(chessPos);
            }
            else {
                if (getBlock) {
                    if (chess.belongToPlayer != this.belongToPlayer)
                        result.CanEatPosArray.push(chessPos);
                    break;
                }
                else
                    getBlock = true;
            }
        }
        return result;
    };
    return Pao;
}(ChessBase));
__reflect(Pao.prototype, "Pao");
//# sourceMappingURL=Pao.js.map