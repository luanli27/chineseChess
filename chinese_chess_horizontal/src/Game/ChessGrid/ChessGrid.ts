enum ChessGridState{empty, initChess, chessOut, canMoveIn, moveIn, cancleSeleted}
class ChessGrid extends eui.Component implements  eui.UIComponent {
	public gridButton : eui.Button;
	public gridImg : eui.Image;
	public moveOutImg : eui.Image;

	public chessPos : ChessPosition;
	public chessResName : string;
	public state : ChessGridState;
	public constructor() 
	{
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init()
	{
		this.gridButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}

	public setState(state : ChessGridState, extraInfo ?: string)
	{
		switch(state)
		{
			case ChessGridState.empty :
				this.chessResName = "";
				this.setChessMoveOutImg("");
				break;
			case ChessGridState.initChess : 
				this.chessResName = extraInfo;
				this.gridImg.fillMode = "scale";
				this.gridImg.x = 0;
				this.gridImg.y = 0;
				this.setChessMoveOutImg("");
				break;
			case ChessGridState.chessOut : 
				this.gridImg.fillMode = "clip";
				this.gridImg.x = 0;
				this.gridImg.y = 0;		
				this.chessResName = "";
				let imgName = this.chessResName.charAt(0) == 'r' ? DefineString.downPlayerChessMoveOut : DefineString.upPlayerChessMoveOut;
				this.setChessMoveOutImg(imgName);
				break;
			case ChessGridState.moveIn : 
				this.chessResName = extraInfo;
				this.gridImg.fillMode = "scale";
				this.gridImg.x = 0;
				this.gridImg.y = 0;
				let resName = this.chessResName.charAt(0) == 'r' ? DefineString.downPlayerChessMoveOut : DefineString.upPlayerChessMoveOut;
				this.setChessMoveOutImg(resName);
				break;
			case ChessGridState.canMoveIn :
				this.chessResName = DefineString.chessCanMoveInImg;
				this.gridImg.fillMode = "clip";
				this.gridImg.x = 11;
				this.gridImg.y = 9;
				break;
			case ChessGridState.cancleSeleted : 
				this.setChessMoveOutImg("");
				break;
		}

		this.setImgWithChessName(this.chessResName); 
		this.state = state;
	}

	public onChessSelected()
	{
		if(null != this.gridImg)
			this.gridImg.alpha = 0.6;
	}

	public onChessUnselected()
	{
		if(null != this.gridImg)
			this.gridImg.alpha = 1;
	}

	public setImgWithChessName(name : string)
	{
		CommonFunction.setImageWithResName(this.gridImg, name);
	}

	public setChessMoveOutImg(name : string)
	{
		CommonFunction.setImageWithResName(this.moveOutImg, name);
	}

	public setPos(chessPos : ChessPosition)
	{
		this.chessPos = chessPos;
	}

	private onClick()
	{
		this.dispatchEvent(new OnChessGridClick(OnChessGridClick.eventName, this.chessPos));
	}
}