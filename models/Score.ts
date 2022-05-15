export default class Score
{
    time: string;
    movesCount: number;
    puzzleSize: number
    createTime: Date;

    constructor(time: string, movesCount: number, puzzleSize: number, createTime: Date)
    {
        this.time = time;
        this.movesCount = movesCount;
        this.puzzleSize = puzzleSize;
        this.createTime = createTime;
    }
}
