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
var Shi = (function (_super) {
    __extends(Shi, _super);
    function Shi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shi.prototype.getChessQueryResult = function (pos, boardData) {
        var result = new ChessQueryResult();
        var targetPositons = [new ChessPosition(pos.rowIndex - 1, pos.columnIndex - 1),
            new ChessPosition(pos.rowIndex - 1, pos.columnIndex + 1),
            new ChessPosition(pos.rowIndex + 1, pos.columnIndex - 1),
            new ChessPosition(pos.rowIndex + 1, pos.columnIndex + 1)
        ];
        for (var _i = 0, targetPositons_1 = targetPositons; _i < targetPositons_1.length; _i++) {
            var targetPos = targetPositons_1[_i];
            this.filterPos(targetPos, boardData, result);
        }
        return result;
    };
    Shi.prototype.filterPos = function (targetPos, boardData, result) {
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
    return Shi;
}(ChessBase));
__reflect(Shi.prototype, "Shi");
//# sourceMappingURL=Shi.js.map