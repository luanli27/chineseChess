var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerStepResult = (function () {
    function PlayerStepResult(chessControled, eatResult, startPos, endPos) {
        this.chessControled = chessControled;
        this.eatResult = eatResult;
        this.startPos = new ChessPosition(startPos.rowIndex, startPos.columnIndex);
        this.endPos = new ChessPosition(endPos.rowIndex, endPos.columnIndex);
    }
    return PlayerStepResult;
}());
__reflect(PlayerStepResult.prototype, "PlayerStepResult");
//# sourceMappingURL=PlayerStepResult.js.map