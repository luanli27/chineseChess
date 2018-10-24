class DefineString
{
    /**
     * ---------------------------------------------view res string----------------------------------------------
     */
    public static readonly chessCanMoveInImg = "dot_png";
    public static readonly upPlayerChessMoveOut = "b_box_png";
    public static readonly downPlayerChessMoveOut = "r_box_png";
    public static readonly downPlayerCategory = "red_png";
    public static readonly upPlayerCategory = "black_png";
    /**
     * ---------------------------------------------chessboard config---------------------------------------------
     */
    public static readonly rowCount = 10;
    public static readonly colomnCount = 9;
    public static readonly riverRow = 5;
    public static readonly downCampsiteLimitRow = 7;
    public static readonly upCampsiteLimitRow = 2;
    public static readonly campsiteLeftLimitColumn = 3;
    public static readonly campsiteRightLimitColumn = 5;
    /**
     * ---------------------------------------------view info string---------------------------------------------
     */
    public static readonly win = "你赢了!";
    public static readonly lost = "你输了!";
    /**
     * ---------------------------------------------game rule config---------------------------------------------
     */
    public static readonly defaultBackStep = 2;
    public static readonly singleStepTimeLimit = 60;
    public static readonly singleRoundTimeLimit = 1000;
}