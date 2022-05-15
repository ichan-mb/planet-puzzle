import Score from "../models/Score";
import App from "../App";

export default class ScorePage {

    scores:Score[];
    app:App;

    constructor(app:App, scores:Score[]) {
        this.app = app;
        this.scores = scores
    }

    goBack() {
        if (this.app.pages.length > 1)
            this.app.pages.pop()
    }
}