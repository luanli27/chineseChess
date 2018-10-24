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
var ChessGridState;
(function (ChessGridState) {
    ChessGridState[ChessGridState["empty"] = 0] = "empty";
    ChessGridState[ChessGridState["initChess"] = 1] = "initChess";
    ChessGridState[ChessGridState["chessOut"] = 2] = "chessOut";
    ChessGridState[ChessGridState["canMoveIn"] = 3] = "canMoveIn";
    ChessGridState[ChessGridState["moveIn"] = 4] = "moveIn";
    ChessGridState[ChessGridState["cancleSeleted"] = 5] = "cancleSeleted";
})(ChessGridState || (ChessGridState = {}));
var ChessGrid = (function (_super) {
    __extends(ChessGrid, _super);
    function ChessGrid() {
        return _super.call(this) || this;
    }
    ChessGrid.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ChessGrid.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    ChessGrid.prototype.init = function () {
        this.gridButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    ChessGrid.prototype.setState = function (state, extraInfo) {
        switch (state) {
            case ChessGridState.empty:
                this.chessResName = "";
                this.setChessMoveOutImg("");
                break;
            case ChessGridState.initChess:
                this.chessResName = extraInfo;
                this.gridImg.fillMode = "scale";
                this.gridImg.x = 0;
                this.gridImg.y = 0;
                this.setChessMoveOutImg("");
                break;
            case ChessGridState.chessOut:
                this.gridImg.fillMode = "clip";
                this.gridImg.x = 0;
                this.gridImg.y = 0;
                this.chessResName = "";
                var imgName = this.chessResName.charAt(0) == 'r' ? DefineString.downPlayerChessMoveOut : DefineString.upPlayerChessMoveOut;
                this.setChessMoveOutImg(imgName);
                break;
            case ChessGridState.moveIn:
                this.chessResName = extraInfo;
                this.gridImg.fillMode = "scale";
                this.gridImg.x = 0;
                this.gridImg.y = 0;
                var resName = this.chessResName.charAt(0) == 'r' ? DefineString.downPlayerChessMoveOut : DefineString.upPlayerChessMoveOut;
                this.setChessMoveOutImg(resName);
                break;
            case ChessGridState.canMoveIn:
                this.chessResName = DefineString.chessCanMoveInImg;
                this.gridImg.fillMode = "clip";
                this.gridImg.x = 11;
                this.gridImg.y = 9;
                break;
            case ChessGridState.cancleSeleted:
                this.setChessMoveOutImg("");
                break;
        }
        this.setImgWithChessName(this.chessResName);
        this.state = state;
    };
    ChessGrid.prototype.onChessSelected = function () {
        if (null != this.gridImg)
            this.gridImg.alpha = 0.6;
    };
    ChessGrid.prototype.onChessUnselected = function () {
        if (null != this.gridImg)
            this.gridImg.alpha = 1;
    };
    ChessGrid.prototype.setImgWithChessName = function (name) {
        CommonFunction.setImageWithResName(this.gridImg, name);
    };
    ChessGrid.prototype.setChessMoveOutImg = function (name) {
        CommonFunction.setImageWithResName(this.moveOutImg, name);
    };
    ChessGrid.prototype.setPos = function (chessPos) {
        this.chessPos = chessPos;
    };
    ChessGrid.prototype.onClick = function () {
        this.dispatchEvent(new OnChessGridClick(OnChessGridClick.eventName, this.chessPos));
    };
    return ChessGrid;
}(eui.Component));
__reflect(ChessGrid.prototype, "ChessGrid", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ChessGrid.js.map