class Player extends PlayerBase
{
    public onChessGridClick(e : OnChessGridClick)
    {   
        this.dispatchEvent(new RequestHandleChessGrid(RequestHandleChessGrid.eventName, this.playerData.flag, e.chessPos));            
    }
}