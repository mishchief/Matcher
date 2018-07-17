import EventEmitter from 'events';
import { performance } from 'perf_hooks';

class Matcher extends EventEmitter {
    // Check if the function is an instance of the function, if not set it.
    constructor(conf, playerQueue, addToQueue, rule, time, start, stop) {
        super();
        if (!(this instanceof Matcher))
            return new Matcher;

        /*
        Configuration setup:
            queueInterval = time the function waits to check the queue again. 500 Default.
            maxIterations = number of matches the app can give between iterations. 1 Default.
        */
        this.conf = {
            queueInterval: 500,
            maxIterations: 1,
        };
        this.playerQueue = [];
        // Ability to push players into the queue when necessary
        this.addToQueue = (player) => {
            this.playerQueue.push(player);
        };
        this.rule = undefined; // Matchmaking comparison algorithm. Set by the user.
        this.time = undefined;
        // Time benchmarking
        var qStart = performance.now()
        var qFinish, qTime = undefined;
        // Service start
        this.start = () => {
            if (this.rule === undefined) {
                console.log("You forgot to setup a matching rule!");
                return
            }
            // Function that does the matching given the queue and the set matching rule.
            var matcherFunc = () => {
                let mmStart = performance.now();
                let mmFinish, mmTime = undefined;
                let iterations = 0;
                let prevPlayerQueue = this.playerQueue.length;
                while (((iterations < this.conf.maxIterations) && this.playerQueue.length >= 2)) {
                    let len = this.playerQueue.length;
                    let match = { match: false, index: undefined }; // Match object
                    for (let i = 0; i < len; i++) {
                        for (let j = i + 1; j < len; j++) {
                            let ruleValue = this.rule(this.playerQueue[i], this.playerQueue[j]);
                            // Rule value needs to be greater or equal to 100 to be considered a match
                            if (ruleValue >= 100) {
                                match.match = true; match.index = [i, j];
                                break;
                            }
                        }
                        // Match found, go forth.
                        if (match.match)
                            break;
                    }
                    // Get both objects off the queue, record time, send the event.
                    if (match.match) {
                        let a = this.playerQueue.splice(match.index[0], 1).pop();
                        let b = this.playerQueue.splice(match.index[1] - 1, 1).pop();
                        mmFinish = performance.now();
                        mmTime = ((mmFinish - mmStart) / 1000).toFixed(5);
                        this.emit('match', { a, b, mmTime });
                    }
                    iterations++;
                }
                if (this.playerQueue.length === 0 || prevPlayerQueue == this.playerQueue.length) {
                    this.stop();
                };
                prevPlayerQueue = this.playerQueue.length;
            };
            this.time = setInterval(matcherFunc.bind(this), this.conf.queueInterval);
        };
        // Record time, log stopping message, clear interval to stop the function.
        this.stop = () => {
            qFinish = performance.now();
            qTime = qFinish - qStart;
            console.log('No more players in queue');
            console.log('Finished running in: ', (qTime / 1000).toFixed(2), ' seconds.');
            clearInterval(this.time);
        };
    }
};
export default Matcher;