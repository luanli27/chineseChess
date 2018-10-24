var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonFunction = (function () {
    function CommonFunction() {
    }
    CommonFunction.setImageWithResName = function (image, resName) {
        if ("" == resName)
            image.texture = null;
        else
            image.texture = RES.getRes(resName);
    };
    CommonFunction.changeNumberToTimerString = function (second) {
        var min = second / 60;
        var minuteLessThanTen = min < 10;
        var sec = second % 60;
        var secLessThanTen = sec < 10;
        //不考虑3位数的情况
        var finalMinString = minuteLessThanTen ? "0" + Math.floor(min) : Math.floor(min).toString();
        var finalSecString = secLessThanTen ? "0" + Math.floor(sec) : Math.floor(sec).toString();
        return finalMinString + ":" + finalSecString;
    };
    return CommonFunction;
}());
__reflect(CommonFunction.prototype, "CommonFunction");
//# sourceMappingURL=CommonFunction.js.map