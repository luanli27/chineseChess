class enemyInfoView extends eui.Component implements  eui.UIComponent 
{
	public head : eui.Image;
	public level : eui.Label;
	public playerName : eui.Label;
	public stepTimer : eui.Label;
	public roundTimer : eui.Label;
	public category : eui.Image;

	private _rountTimer : number;
	private _stepTimer : number;
	private _isMyStep : boolean;
	private _myFlag : PlayerFlag;

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
	}

	public setInfo(playerData : PlayerData)
	{
		let categoryImgRes = this._myFlag == PlayerFlag.DownPlayer ? DefineString.downPlayerCategory : DefineString.upPlayerCategory;
		CommonFunction.setImageWithResName(this.category, categoryImgRes);
		CommonFunction.setImageWithResName(this.head, playerData.iconUrl);
		this.level.text = "lv:" + playerData.level.toString();
		this.playerName.text = playerData.nickName;
		this.stepTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleStepTimeLimit);
		this.roundTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleRoundTimeLimit);
	}

	public onGameStart(e : OnGameStartEvent)
	{

	}

	public onStepEnd(e : OnStepEndEvent)
	{

	}

	public timerFunc()
	{

	}

	public setFlag(flag : PlayerFlag)
	{
		this._myFlag = flag;
	}
	
}