class GameView extends BaseView
{
	public Chessboard : ChessboardView;
	public startGamePopup : StartGameView;
	public restartGamePopup : RestartGameView;
	public playerInfo : PlayerInfoView;
	public enemyInfo : enemyInfoView;
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

	public setPlayerInfo(playerInfoView : PlayerInfoView, playerData : PlayerData)
	{
		playerInfoView.setInfo(playerData);
	}

	public setEnemyInfo(enemyInfoView : enemyInfoView, playerData : PlayerData)
	{
		enemyInfoView.setInfo(playerData);
	}

	public initChessboard()
	{
		let controler = this._controler as GameControler;
		this.Chessboard.initBoard(controler.gameData.chessboardStringData);
	}

	public showPopup(popup : eui.Component)
	{
		popup.enabled = true;
		popup.alpha = 1;
	}

	public closePopup(popup : eui.Component)
	{
		popup.enabled = false;
		popup.alpha = 0;
	}

	public showRestartPopup(isWin : boolean)
	{
		this.restartGamePopup.setGameResultInfo(isWin);
		this.showPopup(this.restartGamePopup);
	}
}