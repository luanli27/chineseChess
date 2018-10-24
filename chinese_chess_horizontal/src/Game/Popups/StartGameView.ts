class StartGameView extends eui.Component implements  eui.UIComponent 
{
	public StartGameButton : eui.Button;
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
		this.StartGameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	private onClick()
	{
		this.dispatchEvent(new PlayerAskRestartGame(PlayerAskStartGame.eventName));
	}
	
}