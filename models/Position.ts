export default class Position {

    left: number;
    top: number;
    right: number;
    bottom: number;

    public constructor(left: number, top: number, right: number, bottom: number)
    {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    public zero() : void {
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
    }

    public copyWith(left: number, top: number, right: number, bottom: number): Position
    {
        return new Position(
            left ? left : this.left,
            top ? top : this.top,
            right ? right : this.right,
            bottom ? bottom : this.bottom
        );
    }
}