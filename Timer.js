export default class Timer{
    time = 0;
    static runtime;
    updater;
    /**
     * 
     * @param {Function} updater 
     */
    constructor(updater){
        this.updater = updater;
        this.runtime = setInterval(() =>{ 
            this.time ++;
            updater(this.time)
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.runtime);
        return this.time;
    }
    resetTimer(){
        this.stopTimer();
        this.time = 0;
    };
    startTimer() {
        this.runtime = setInterval(() =>{ 
            this.time ++;
            this.updater(this.time);
        }, 1000)
    }
}