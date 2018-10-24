class PlayerInfoView extends BaseView
{
	public head : eui.Image;
	public level : eui.Label;
	public playerName : eui.Label;
	public giveupButton : eui.Button;
	public backButton : eui.Button;
	public stepTimer : eui.Label;
	public roundTimer : eui.Label;
	public category : eui.Image;

	private _roundTimer : number;
	private _stepTimer : number;
	private _isMyStep : boolean;
	private _myFlag : PlayerFlag;
	private _timer : egret.Timer;

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
		this.registerEvents();
	}

	private registerEvents()
	{
		this.giveupButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.giveUp, this);
		this.backButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backChess, this);
	}

	private giveUp()
	{
		this.dispatchEvent(new PlayerGiveupEvent(PlayerGiveupEvent.eventName));
	}

	private backChess()
	{
		this.dispatchEvent(new PlayerBackChessEvent(PlayerBackChessEvent.eventName));
	}

	public setInfo(playerData : PlayerData)
	{
		let categoryImgRes = this._myFlag == PlayerFlag.DownPlayer ? DefineString.downPlayerCategory : DefineString.upPlayerCategory;
		CommonFunction.setImageWithResName(this.category, categoryImgRes);
		CommonFunction.setImageWithResName(this.head, playerData.iconUrl);
		this.level.text = "lv:" +  playerData.level.toString();
		this.playerName.text = playerData.nickName;
		this.stepTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleStepTimeLimit);
		this.roundTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleRoundTimeLimit);
	}

	public onGameStart(e : OnGameStartEvent)
	{
		this._stepTimer = DefineString.singleStepTimeLimit;
		this._roundTimer = DefineString.singleRoundTimeLimit;
		this._isMyStep = e.curPlayerFlag == this._myFlag;
		if(null != this._timer)
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.updatePerSecond, this);
		this._timer = new egret.Timer(1000);
		this._timer.addEventListener(egret.TimerEvent.TIMER, this.updatePerSecond, this);
		this._timer.start();
	}

	public onStepEnd(e : OnStepEndEvent)
	{
		this._isMyStep = e.curPlayerFlag == this._myFlag;
		if(this._isMyStep)
			this._stepTimer = DefineString.singleStepTimeLimit;
		else
			this.stepTimer.text = CommonFunction.changeNumberToTimerString(DefineString.singleStepTimeLimit);
	}

	public updatePerSecond()
	{
		if(this._isMyStep)
		{
			this._stepTimer -= 1;
			this._roundTimer -= 1;
			if(this._stepTimer <= 0)
			{
				this.dispatchEvent(new PlayerStepTimerRunOutEvent(PlayerStepTimerRunOutEvent.eventName, this._myFlag));
				this._timer.stop();
			}
			if(this._roundTimer <= 0)
			{
				this.dispatchEvent(new PlayerRoundTimerRunOutEvent(PlayerRoundTimerRunOutEvent.eventName, this._myFlag));
				this._timer.stop();
			}

			this.stepTimer.text = CommonFunction.changeNumberToTimerString(this._stepTimer); 
			this.roundTimer.text = CommonFunction.changeNumberToTimerString(this._roundTimer); 
		}
	}

	public setFlag(flag : PlayerFlag)
	{
		this._myFlag = flag;
	}
}