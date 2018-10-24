class BaseView extends eui.Component implements  eui.UIComponent 
{
    protected _controler : BaseControler;
    public bindControler(controler)
    {
        this._controler = controler;
    }

    public openView()
    {
    }

    public closeView(){}
}