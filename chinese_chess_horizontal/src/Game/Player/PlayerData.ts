class PlayerData
{
    private _level : number;
    private _nickName : string;
    private _iconUrl : string;
    private _flag : PlayerFlag;

    public constructor(level : number, nickName : string, iconUrl : string)
    {
        this._level = level;
        this._nickName = nickName;
        this._iconUrl = iconUrl;
    }

    public get level()
    {
        return this._level;
    }

    public get nickName()
    {
        return this._nickName;
    }

    public get iconUrl()
    {
        return this._iconUrl;
    }

    public get flag()
    {
        return this._flag;
    }

    public set flag(flag : PlayerFlag)
    {
        this._flag = flag;
    }
}