class RestartGameView extends eui.Component implements  eui.UIComponent 
{
	public restartButton : eui.Button;
	public gameResultText : eui.Label;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.restartButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	private onClick()
	{
		this.dispatchEvent(new PlayerAskRestartGame(PlayerAskRestartGame.eventName));
	}

	public setGameResultInfo(isWin : boolean)
	{
		this.gameResultText.text = isWin ? DefineString.win : DefineString.lost;
	}
}