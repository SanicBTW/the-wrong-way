class FramerateLoop
{
    #isRunning = false;
    #prevTime = Date.now();
    #frames = 0;
    elapsed = 0;
    currentFramerate = 0;
    customUpdate = undefined;

    constructor()
    {
        if (this.#isRunning) return;
        var self = this;
        this.#isRunning = true;

        function loop()
        {
            if (!self.#isRunning) return;

            self.#update();
            if (self.customUpdate != undefined)
                self.customUpdate();

            requestAnimationFrame(loop);
        }

        loop();
    }

    #update()
    {
        this.#frames++;

        var prevTime = this.#prevTime, time = Date.now();

        if (time > prevTime + 1000)
        {
            this.elapsed = (time - prevTime) / 1000;
            this.currentFramerate = (this.#frames * 1000) / (time - prevTime);
            this.#prevTime = time;
            this.#frames = 0;
        }
    }
}

class TimedEvents
{
    #handler = undefined;
    #timedEvents = [];
    endTime = 0;
    finishCallback = undefined;
    #objects = [];
    #currentTime = 0;
    #firstFrame = false;

    constructor(fps)
    {
        this.#handler = fps;
        this.#handler.customUpdate = this.customUpdate;
    }

    customUpdate = () =>
    {
        if (!this.#firstFrame)
        {
            this.#firstFrame = true;
            return;
        }

        this.#currentTime += (this.#handler.elapsed / 10);
        if (this.endTime <= this.#currentTime)
        {
            if (this.finishCallback != undefined)
                this.finishCallback();

            this.#handler.customUpdate = undefined;
        }

        while (this.#timedEvents.length > 0 && this.#timedEvents[0][0] <= this.#currentTime)
        {
            this.#timedEvents[0][1]();
            this.#timedEvents.splice(0, 1);
        }
    }

    timer = (time, func) => 
    {
        this.#timedEvents.push([time, func]);
        this.#timedEvents.sort((a, b) => {a[0] < b[0]});
    }

    createObject = (alias, type, text, aditional) =>
    {
        this.#objects[alias] = document.createElement(type);
        this.#objects[alias].classList.add(aditional);
        this.#objects[alias].innerText = text;

        return this.#objects[alias];
    }
}