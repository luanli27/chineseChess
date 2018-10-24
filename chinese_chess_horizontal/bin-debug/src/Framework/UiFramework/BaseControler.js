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
var BaseControler = (function (_super) {
    __extends(BaseControler, _super);
    function BaseControler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseControler.prototype.bindView = function (view) {
        this._view = view;
        this._view.bindControler(this);
    };
    BaseControler.prototype.onAskEnterView = function () {
        this._view.openView();
    };
    return BaseControler;
}(egret.DisplayObject));
__reflect(BaseControler.prototype, "BaseControler");
//# sourceMappingURL=BaseControler.js.map