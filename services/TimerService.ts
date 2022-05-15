export default class TimerService
{
    min:any;
    sec:any;
    stoptime:boolean = true;
    jobHandle:number;
    timer:string = '00:00:00';

    public startTimer() {
        if (this.stoptime == true) {
            this.stoptime = false;
            this.min = 0;
            this.sec = 0;
            this.timer = '00:00';
            this.jobHandle = setInterval(this.timerCycle, 1000, this);
        }
    }

    public stopTimer() {
        if (this.stoptime == false) {
            this.stoptime = true;
            clearInterval(this.jobHandle);
        }
    }

    private timerCycle(self:TimerService) {
        if (self.stoptime)
            return

        self.sec = parseInt(self.sec);
        self.min = parseInt(self.min);

        self.sec++;

        if (self.sec == 60) {
            self.min = self.min + 1;
            self.sec = 0;
        }
        if (self.min == 60) {
            self.min = 0;
            self.sec = 0;
        }

        if (self.sec < 10 || self.sec == 0) {
            self.sec = '0' + self.sec;
        }
        if (self.min < 10 || self.min == 0) {
            self.min = '0' + self.min;
        }
        self.updateTimer(`${self.min}:${self.sec}`);
    }

    private updateTimer(t:string)
    {
        this.timer = t;
    }
}