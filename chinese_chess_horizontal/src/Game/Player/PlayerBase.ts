class PlayerBase extends egret.DisplayObject
{
    public myChesses : Array<ChessBase> = new Array<ChessBase>();
    public playerData : PlayerData;
    public constructor(playerData : PlayerData)
    {
        super();
        this.playerData = playerData;
    }
}