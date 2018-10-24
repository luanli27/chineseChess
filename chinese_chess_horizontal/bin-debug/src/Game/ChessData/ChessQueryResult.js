var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessQueryResult = (function () {
    function ChessQueryResult() {
        this.CanMoveToPosArray = new Array();
        this.CanEatPosArray = new Array();
    }
    return ChessQueryResult;
}());
__reflect(ChessQueryResult.prototype, "ChessQueryResult");
//# sourceMappingURL=ChessQueryResult.js.map