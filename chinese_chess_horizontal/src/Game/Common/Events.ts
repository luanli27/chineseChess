class EnterGameView extends egret.Event
{
    public static eventName : string = "EnterGameView";
}

class OnChessGridClick extends egret.Event
{
    public static eventName : string = "OnChessClick";
    public chessPos : ChessPosition;
    public constructor(type : string, chessPos : ChessPosition, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this.chessPos = chessPos;
    }
}

class RequestHandleChessGrid extends egret.Event
{
    public static eventName : string = "RequstHandleChessGrid";
    public playerFlag : PlayerFlag;
    public gridPos : ChessPosition; 
    public constructor(type : string, playerFlag : PlayerFlag, gridPos : ChessPosition, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this.playerFlag = playerFlag;
        this.gridPos = gridPos;
    }
}

class OnGameStartEvent extends egret.Event
{
    public static eventName : string = "OnGameStartEvent";
    public curPlayerFlag : PlayerFlag;
    public constructor(type : string, curPlayerFlag : PlayerFlag, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this.curPlayerFlag = curPlayerFlag;
    }
}

class OnStepEndEvent extends egret.Event
{
    public static eventName : string = "OnStepEndEvent";
    public curPlayerFlag : PlayerFlag;
    public chessboardData : ChessboardData;
    public constructor(type : string, curPlayerFlag : PlayerFlag, chessboardData : ChessboardData, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this.curPlayerFlag = curPlayerFlag;
        this.chessboardData = chessboardData;
    }
}

class PlayerAskStartGame extends egret.Event
{
    public static eventName : string = "PlayerAskStartGame";
}

class PlayerAskRestartGame extends egret.Event
{
    public static eventName : string = "PlayerAskRestartGame";
}

class PlayerGiveupEvent extends egret.Event
{
    public static eventName : string = "PlayerGiveup";
}

class PlayerBackChessEvent extends egret.Event
{
    public static eventName : string = "PlayerBackChessEvent";
}

class PlayerStepTimerRunOutEvent extends egret.Event
{
    public static eventName : string = "PlayerStepTimerRunOutEvent";
    public flag : PlayerFlag;
    public constructor(type : string, playerFlag : PlayerFlag, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this.flag = playerFlag;
    }
}

class PlayerRoundTimerRunOutEvent extends egret.Event
{
    public static eventName : string = "PlayerRoundTimerRunOutEvent";
    public flag : PlayerFlag;
    public constructor(type : string, playerFlag : PlayerFlag, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this.flag = playerFlag;
    }
}

