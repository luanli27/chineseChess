class ChessboardView extends eui.Component implements  eui.UIComponent 
{
	public ChessGridGroup : eui.Group;
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
	}

	public initBoard(boardData : Array<Array<string>>)
	{
		let chessPos : ChessPosition = new ChessPosition(0,0);
		for(let i = 0; i < boardData.length; i++)
		{
			for(let j = 0; j < boardData[i].length; j++)
			{
				chessPos.rowIndex = i;
				chessPos.columnIndex = j;
				let grid = this.getGroupChildByChessPos(chessPos);
				grid.setPos(new ChessPosition(i,j));
				let initString = boardData[i][j] + "_png";
				if('   ' == initString)
					grid.setState(ChessGridState.empty);
				else
					grid.setState(ChessGridState.initChess, initString);
			}
		}
	}

	private indexOfGridGroupChild(chessPos : ChessPosition)
	{
		return chessPos.rowIndex * DefineString.colomnCount + chessPos.columnIndex;
	}

	private getGroupChildByChessPos(chessPos : ChessPosition) : ChessGrid
	{
		let childIndex = this.indexOfGridGroupChild(chessPos);
		
		return this.ChessGridGroup.getChildAt(childIndex) as ChessGrid;
	}

	public cleanSelectedChessState(chessPos : ChessPosition, positions : Array<ChessPosition>)
	{
		let grid = this.getGroupChildByChessPos(chessPos);
		grid.onChessUnselected();

		for(let pos of positions)
		{
			let grid = this.getGroupChildByChessPos(pos);
			if(grid.state == ChessGridState.canMoveIn)
				grid.setState(ChessGridState.empty);
		}	
	}

	public cleanChessOutState(moveOutPos : ChessPosition, enemyLastselectPos : ChessPosition)
	{
		let grid = this.getGroupChildByChessPos(moveOutPos);
		grid.setState(ChessGridState.empty);
		let enemySelectGrid = this.getGroupChildByChessPos(enemyLastselectPos);
		enemySelectGrid.setState(ChessGridState.cancleSeleted);
	}

	public setAllReachableGrid(positions : Array<ChessPosition>)
	{
		for(let pos of positions)
		{
			let gridView = this.getGroupChildByChessPos(pos);
			gridView.setState(ChessGridState.canMoveIn);
		}
	}

	public onSelectedChess(ChessPosition)
	{
		let grid = this.getGroupChildByChessPos(ChessPosition);
		grid.onChessSelected();
	}

	public MoveChessToPos(chessPos : ChessPosition, targetPos : ChessPosition)
	{
		let curGrid = this.getGroupChildByChessPos(chessPos);
		let targetGrid = this.getGroupChildByChessPos(targetPos);

		targetGrid.setState(ChessGridState.moveIn, curGrid.chessResName);
		curGrid.setState(ChessGridState.chessOut);
	}

	public eatEnemyChess(chessPos : ChessPosition, targetPos : ChessPosition)
	{
		let curGrid = this.getGroupChildByChessPos(chessPos);
		let targetGrid = this.getGroupChildByChessPos(targetPos);

		targetGrid.setState(ChessGridState.moveIn, curGrid.chessResName);
		curGrid.setState(ChessGridState.chessOut);
	}

	public backChessToPos(chessPos : ChessPosition, targetPos : ChessPosition)
	{
		let curGrid = this.getGroupChildByChessPos(chessPos);
		let targetGrid = this.getGroupChildByChessPos(targetPos);
		targetGrid.setState(ChessGridState.initChess, curGrid.chessResName);
		curGrid.setState(ChessGridState.empty);
	}
}