import BoardPage from 'pages/BoardPage'

export default class App
{
    pages = []

    constructor()
    {
        this.pages = [new BoardPage(this)];
    }

    goBack() {
        if (this.pages.length > 2)
            this.pages.pop()
    }

}