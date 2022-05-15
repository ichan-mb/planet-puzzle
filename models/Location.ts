export default class Location
{
    x: number = -1;
    y: number = -1;

    public constructor(x:number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    public toString = () : string => {
        return `(${this.x}, ${this.y})`;
    }

    public isLeftOf(location: Location): boolean {
        return location.y == this.y && location.x == this.x + 1;
    }

    public isRightOf(location: Location): boolean {
        return location.y == this.y && location.x == this.x - 1;
    }

    public isTopOf(location: Location): boolean {
        return location.x == this.x && location.y == this.y + 1;
    }

    public isBottomOf(location: Location): boolean {
        return location.x == this.x && location.y == this.y - 1;
    }

    public isLocatedAround(location: Location): boolean {
        return this.isLeftOf(location) ||
            this.isRightOf(location) ||
            this.isBottomOf(location) ||
            this.isTopOf(location);
    }

    public isEqual(location: Location): boolean
    {
        return this.x == location.x && this.y == location.y;
    }

    public compareTo(location: Location): number
    {
        if (this.y < location.y) return -1;
        else if (this.y > location.y) return 1;
        else
        {
            if (this.x < location.x ) return -1;
            else if (this.x > location.x) return 1;
            else return 0;
        }
    }
}