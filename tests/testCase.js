import Matcher from '../';
import { data } from './testData';
var testMatcher = new Matcher;

testMatcher.on('match', (e) => {
    console.log("It's a match! It took: ", e.mmTime, ' seconds.' );
    console.log(e.a); console.log(e.b);
});
testMatcher.on('stop', (e) => {
    console.log('No more players in queue, or no more suitable matches');
    console.log('Finished running in: ', e.qTime, ' seconds.');
})

var playerQueue = [
{mmr: 3242, username: "secured line"},
{mmr: 3391, username: "logistical"},
{mmr: 2541, username: "archive"},
{mmr: 3083, username: "Extended"},
{mmr: 3772, username: "moratorium"},
{mmr: 3486, username: "Public-key"},
{mmr: 3867, username: "User-friendly"},
{mmr: 3255, username: "system-worthy"},
{mmr: 3178, username: "scalable"},
{mmr: 3877, username: "context-sensitive"},];

var rule = (a, b) => {
    let diff = Math.abs(a.mmr - b.mmr);
    if (diff < 100)
        return 100;
    else return 0;
};
testMatcher.rule = rule;
testMatcher.playerQueue = playerQueue;
// testMatcher.playerQueue = data; // Uncomment this to scale to big dataset (500 records to match)
testMatcher.conf.checkinterval = 500; // default
console.log(testMatcher.playerQueue);
testMatcher.start();