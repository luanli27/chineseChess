var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerData = (function () {
    function PlayerData(level, nickName, iconUrl) {
        this._level = level;
        this._nickName = nickName;
        this._iconUrl = iconUrl;
    }
    Object.defineProperty(PlayerData.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "nickName", {
        get: function () {
            return this._nickName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "iconUrl", {
        get: function () {
            return this._iconUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "flag", {
        get: function () {
            return this._flag;
        },
        set: function (flag) {
            this._flag = flag;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerData;
}());
__reflect(PlayerData.prototype, "PlayerData");
//# sourceMappingURL=PlayerData.js.map