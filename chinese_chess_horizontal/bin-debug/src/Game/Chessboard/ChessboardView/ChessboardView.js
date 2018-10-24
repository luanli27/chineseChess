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
var ChessboardView = (function (_super) {
    __extends(ChessboardView, _super);
    function ChessboardView() {
        return _super.call(this) || this;
    }
    ChessboardView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ChessboardView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ChessboardView.prototype.initBoard = function (boardData) {
        var chessPos = new ChessPosition(0, 0);
        for (var i = 0; i < boardData.length; i++) {
            for (var j = 0; j < boardData[i].length; j++) {
                chessPos.rowIndex = i;
                chessPos.columnIndex = j;
                var grid = this.getGroupChildByChessPos(chessPos);
                grid.setPos(new ChessPosition(i, j));
                var initString = boardData[i][j] + "_png";
                if ('   ' == initString)
                    grid.setState(ChessGridState.empty);
                else
                    grid.setState(ChessGridState.initChess, initString);
            }
        }
    };
    ChessboardView.prototype.indexOfGridGroupChild = function (chessPos) {
        return chessPos.rowIndex * DefineString.colomnCount + chessPos.columnIndex;
    };
    ChessboardView.prototype.getGroupChildByChessPos = function (chessPos) {
        var childIndex = this.indexOfGridGroupChild(chessPos);
        return this.ChessGridGroup.getChildAt(childIndex);
    };
    ChessboardView.prototype.cleanSelectedChessState = function (chessPos, positions) {
        var grid = this.getGroupChildByChessPos(chessPos);
        grid.onChessUnselected();
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var pos = positions_1[_i];
            var grid_1 = this.getGroupChildByChessPos(pos);
            if (grid_1.state == ChessGridState.canMoveIn)
                grid_1.setState(ChessGridState.empty);
        }
    };
    ChessboardView.prototype.cleanChessOutState = function (moveOutPos, enemyLastselectPos) {
        var grid = this.getGroupChildByChessPos(moveOutPos);
        grid.setState(ChessGridState.empty);
        var enemySelectGrid = this.getGroupChildByChessPos(enemyLastselectPos);
        enemySelectGrid.setState(ChessGridState.cancleSeleted);
    };
    ChessboardView.prototype.setAllReachableGrid = function (positions) {
        for (var _i = 0, positions_2 = positions; _i < positions_2.length; _i++) {
            var pos = positions_2[_i];
            var gridView = this.getGroupChildByChessPos(pos);
            gridView.setState(ChessGridState.canMoveIn);
        }
    };
    ChessboardView.prototype.onSelectedChess = function (ChessPosition) {
        var grid = this.getGroupChildByChessPos(ChessPosition);
        grid.onChessSelected();
    };
    ChessboardView.prototype.MoveChessToPos = function (chessPos, targetPos) {
        var curGrid = this.getGroupChildByChessPos(chessPos);
        var targetGrid = this.getGroupChildByChessPos(targetPos);
        targetGrid.setState(ChessGridState.moveIn, curGrid.chessResName);
        curGrid.setState(ChessGridState.chessOut);
    };
    ChessboardView.prototype.eatEnemyChess = function (chessPos, targetPos) {
        var curGrid = this.getGroupChildByChessPos(chessPos);
        var targetGrid = this.getGroupChildByChessPos(targetPos);
        targetGrid.setState(ChessGridState.moveIn, curGrid.chessResName);
        curGrid.setState(ChessGridState.chessOut);
    };
    ChessboardView.prototype.backChessToPos = function (chessPos, targetPos) {
        var curGrid = this.getGroupChildByChessPos(chessPos);
        var targetGrid = this.getGroupChildByChessPos(targetPos);
        targetGrid.setState(ChessGridState.initChess, curGrid.chessResName);
        curGrid.setState(ChessGridState.empty);
    };
    return ChessboardView;
}(eui.Component));
__reflect(ChessboardView.prototype, "ChessboardView", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ChessboardView.js.map