import Tile from "../models/Tile";
import Score from "../models/Score";
import Puzzle from "../models/Puzzle";
import TimerService from "../services/TimerService"
import App from "../App";
import ScorePage from "pages/ScorePage";

import vibration from "FuseJS/Vibration"
import share from "FuseJS/Share"

export default class BoardPage {

    n: number;
    tiles: Tile[] = []
    moveCount: number = 0;
    scores: Score[] = [];
    puzzle: Puzzle;
    timerService:TimerService;
    whitespaceTile:Tile;
    app:App;

    constructor(app:App)
    {
        this.app = app;
        this.n = 5;
        this.generate();
        this.timerService = new TimerService();
        this.timerService.startTimer();
    }

    get timer(): string
    {
        return this.timerService.timer;
    }

    get correctTilesCount(): number
    {
        let count = 0;
        this.tiles.forEach(tile => {
            if (tile.isAtCorrectLocation && !tile.tileIsWhiteSpace)
                count++;
        })
        return count;
    }

    public tileSizeChanged(args:any)
    {
        this.resetPuzzleSize();
    }

    public resetPuzzleSize()
    {
        this.timerService.stopTimer();
        this.moveCount = 0;
        this.generate();
        this.timerService .startTimer();
    }

    public swapTile(tile: Tile) : void
    {
        let tileCurrLoc = tile.currentLocation;
        let whitespaceCurrLoc = this.whitespaceTile.currentLocation;

        tile.setCurrentPosition(whitespaceCurrLoc);
        this.whitespaceTile.setCurrentPosition(tileCurrLoc);

        if (tile.isAtCorrectLocation)
        {
            if (this.puzzle.isSolved)
            {
                this.timerService.stopTimer();
                vibration.vibrate(0.2);
                this.saveScore();
            }
            else
            {
                vibration.vibrate('medium');
            }
        }
        this.pulsateSurroundWhitespace(this.whitespaceTile)
        this.moveCount++;
    }

    saveScore()
    {
        let score = new Score(this.timerService.timer, this.moveCount, this.n, new Date());
        this.scores.push(score);
    }

    public tileTapped(args: any): boolean
    {
        if (this.puzzle.tileIsBottomOfWhiteSpace(args.data) ||
                this.puzzle.tileIsTopOfWhiteSpace(args.data) ||
                this.puzzle.tileIsLeftOfWhiteSpace(args.data) ||
                this.puzzle.tileIsRightOfWhiteSpace(args.data))
            this.swapTile(args.data);
        return true;
    }

    public shareResult()
    {
        share.shareText('PlanetPuzzle Solved!', `I have solved the PlanetPuzzle in ${this.timer} with ${this.moveCount} moves. Now it's your turn. `)
    }

    public gotoScorePage()
    {
        this.app.pages.push(new ScorePage(this.app, this.scores));
    }

    private pulsateSurroundWhitespace(whiespaceTile:Tile)
    {
        this.tiles.forEach((tile:Tile) => {
            tile.setPulsate(false);
            if (tile.currentLocation.isBottomOf(whiespaceTile.currentLocation) ||
                    tile.currentLocation.isTopOf(whiespaceTile.currentLocation) ||
                    tile.currentLocation.isTopOf(whiespaceTile.currentLocation) ||
                    tile.currentLocation.isLeftOf(whiespaceTile.currentLocation) ||
                    tile.currentLocation.isRightOf(whiespaceTile.currentLocation)
            )
                tile.setPulsate(true);
        })
    }

    private generate(): void
    {
        // reset variables
        this.puzzle = null;
        this.moveCount = 0;

        let tilesCorrectLocations = Puzzle.generateTileCorrectLocation(this.n);
        let tilesCurrentLocations = [...tilesCorrectLocations];

        let tiles = Puzzle.getTilesFromLocations(tilesCorrectLocations, tilesCurrentLocations);
        this.puzzle = new Puzzle(this.n, tiles, this.moveCount);

        while(!this.puzzle.isSolvable() || this.puzzle.getNumberOfCorrectTiles() != 0)
        {
            const shuffleLocation = tilesCurrentLocations
                                        .map(value => ({ value, sort: Math.random() }))
                                        .sort((a, b) => a.sort - b.sort)
                                        .map(({ value }) => value);
            this.puzzle.tiles = Puzzle.getTilesFromLocations(tilesCorrectLocations, shuffleLocation);
        }
        this.updateTiles(this.puzzle.tiles);
        this.findAndSetWhitespaceTile();
        this.pulsateSurroundWhitespace(this.whitespaceTile);
    }

    private updateTiles(tiles:Tile[])
    {
        this.tiles.splice(0, this.tiles.length);
        this.tiles = tiles
    }

    private findAndSetWhitespaceTile()
    {
        const whiteSpaceTileIndex = this.tiles.findIndex(t => t.tileIsWhiteSpace);
        this.whitespaceTile = this.tiles[whiteSpaceTileIndex];
    }

}