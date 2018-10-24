class BaseControler extends egret.DisplayObject
{
    protected _view : BaseView;
    public bindView(view : BaseView)
    {
        this._view = view;
        this._view.bindControler(this);
    }

    public onAskEnterView()
    {
        this._view.openView();
    }
}