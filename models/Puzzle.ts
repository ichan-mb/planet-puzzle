import Location from "./Location";
import Tile from "./Tile";

export default class Puzzle {

    n: number;
    tiles: Tile[] = [];
    movesCount: number;

    constructor(n: number, tiles: Tile[], movesCount: number = 0)
    {
        this.n = n;
        this.tiles = tiles;
        this.movesCount = movesCount;
    }

    get whiteSpaceTile(): Tile
    {
        let found: Tile;
        this.tiles.some(tile => {
            if (tile.tileIsWhiteSpace)
            {
                found = tile;
                return true;
            }
        });
        return found;
    }

    get isSolved(): boolean
    {
        return this.getNumberOfCorrectTiles() == this.tiles.length - 1;
    }

    public tileIsMovable(tile: Tile): boolean
    {
        if (tile.tileIsWhiteSpace)
            return false;
        return tile.currentLocation.isLocatedAround(this.whiteSpaceTile.currentLocation)
    }

    public tileIsLeftOfWhiteSpace(tile: Tile): boolean
    {
        return tile.currentLocation.isLeftOf(this.whiteSpaceTile.currentLocation);
    }

    public tileIsRightOfWhiteSpace(tile: Tile): boolean
    {
        return tile.currentLocation.isRightOf(this.whiteSpaceTile.currentLocation);
    }

    public tileIsTopOfWhiteSpace(tile: Tile): boolean
    {
        return tile.currentLocation.isTopOf(this.whiteSpaceTile.currentLocation);
    }

    public tileIsBottomOfWhiteSpace(tile: Tile): boolean
    {
        return tile.currentLocation.isBottomOf(this.whiteSpaceTile.currentLocation);
    }

    private isInversion(tile1: Tile, tile2: Tile): boolean
    {
        if (!tile2.tileIsWhiteSpace && tile1.value != tile2.value)
        {
            if (tile2.value < tile1.value)
                return tile2.currentLocation.compareTo(tile1.currentLocation) > 0;
            else
                return tile1.currentLocation.compareTo(tile2.currentLocation) > 0;
        }

        return false
    }

    public countInversions(): number
    {
        let count = 0;
        for (let i: number = 0; i < this.tiles.length; i++)
        {
            const tileI = this.tiles[i];
            if (tileI.tileIsWhiteSpace)
                continue;

            for (let j: number = i + 1; j < this.tiles.length; j++)
            {
                const tileJ = this.tiles[j];
                if (this.isInversion(tileI, tileJ))
                    count++
            }
        }
        return count;
    }

    public isSolvable() : boolean
    {
        const height = this.tiles.length / this.n;

        const inversions = this.countInversions();
        if (this.n % 2 == 1)
            return inversions % 2 == 0;

        let whitespace: Tile;
        this.tiles.some(tile => {
            if (tile.tileIsWhiteSpace)
            {
                whitespace = tile;
                return true;
            }
        })
        const whitespaceRow = whitespace.currentLocation.y;
        if (((height - whitespaceRow)) % 2)
            return inversions % 2 == 0;
        else
            return inversions % 2 == 1;
    }

    public getNumberOfCorrectTiles(): number
    {
        let numberOfCorrectTiles = 0;
        this.tiles.forEach(tile => {
            if (!tile.tileIsWhiteSpace)
                if (tile.currentLocation.isEqual(tile.correctLocation))
                    numberOfCorrectTiles++;
        })
        return numberOfCorrectTiles;
    }

    public static generateTileCorrectLocation(n: number): Location[]
    {
        let tilesCorrectLocation: Location[] = []
        for (let i: number = 0; i< n; i++)
        {
            for (let j: number = 0; j < n; j++)
            {
                let location: Location = new Location(j, i);
                tilesCorrectLocation.push(location);
            }
        }
        return tilesCorrectLocation;
    }

    public static getTilesFromLocations(correctLocations: Location[], currentLocation: Location[]): Tile[]
    {
        let tiles: Tile[] = []
        for (let i: number = 0; i< correctLocations.length; i++)
        {
            let tile = new Tile(
                i + 1,
                correctLocations[i],
                currentLocation[i],
                i == correctLocations.length - 1
            )
            tiles.push(tile)
        }
        return tiles;
    }
}