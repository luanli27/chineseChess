var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DefineString = (function () {
    function DefineString() {
    }
    /**
     * ---------------------------------------------view res string----------------------------------------------
     */
    DefineString.chessCanMoveInImg = "dot_png";
    DefineString.upPlayerChessMoveOut = "b_box_png";
    DefineString.downPlayerChessMoveOut = "r_box_png";
    DefineString.downPlayerCategory = "red_png";
    DefineString.upPlayerCategory = "black_png";
    /**
     * ---------------------------------------------chessboard config---------------------------------------------
     */
    DefineString.rowCount = 10;
    DefineString.colomnCount = 9;
    DefineString.riverRow = 5;
    DefineString.downCampsiteLimitRow = 7;
    DefineString.upCampsiteLimitRow = 2;
    DefineString.campsiteLeftLimitColumn = 3;
    DefineString.campsiteRightLimitColumn = 5;
    /**
     * ---------------------------------------------view info string---------------------------------------------
     */
    DefineString.win = "你赢了!";
    DefineString.lost = "你输了!";
    /**
     * ---------------------------------------------game rule config---------------------------------------------
     */
    DefineString.defaultBackStep = 2;
    DefineString.singleStepTimeLimit = 60;
    DefineString.singleRoundTimeLimit = 1000;
    return DefineString;
}());
__reflect(DefineString.prototype, "DefineString");
//# sourceMappingURL=DefineString.js.map