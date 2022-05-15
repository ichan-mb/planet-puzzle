import Location from './Location'

export default class Tile
{
    value: number;
    correctLocation: Location;
    currentLocation: Location;
    tileIsWhiteSpace: boolean;
    isPulsating: boolean;

    constructor(value: number, correctLocation: Location, currentLocation: Location, tileIsWhiteSpace: boolean)
    {
        this.value = value;
        this.correctLocation = correctLocation;
        this.currentLocation = currentLocation;
        this.tileIsWhiteSpace = tileIsWhiteSpace;
    }

    get isAtCorrectLocation() : boolean
    {
        return this.currentLocation.isEqual(this.correctLocation);
    }

    public setCurrentPosition(currentLocation: Location): void
    {
        this.currentLocation = currentLocation
    }

    public setPulsate(pulsate:boolean)
    {
        this.isPulsating = pulsate
    }

}