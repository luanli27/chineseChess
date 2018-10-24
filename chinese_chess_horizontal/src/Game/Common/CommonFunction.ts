 class CommonFunction
 {
    public static setImageWithResName(image: eui.Image, resName: string)
    {
        if("" == resName)
            image.texture = null;
        else
            image.texture = RES.getRes(resName);
    } 

    public static changeNumberToTimerString(second : number) : string
	{
		let min = second/60;
		let minuteLessThanTen = min < 10;
		let sec = second%60;
		let secLessThanTen = sec < 10;

		//不考虑3位数的情况
		let finalMinString = minuteLessThanTen ? "0" + Math.floor(min) : Math.floor(min).toString();
		let finalSecString = secLessThanTen ? "0" + Math.floor(sec) : Math.floor(sec).toString();

		return finalMinString + ":" + finalSecString;
	}
 }