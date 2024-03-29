import { assert } from 'chai';
import Matcher from '../';
var twoMatch = new Matcher;
var multiMatch = new Matcher;

var twoPlayerQueue = [
    { mmr: 3242, username: "secured-line" },
    { mmr: 3291, username: "logistical" },
];

var multiPlayerQueue = [
    { mmr: 3242, username: "secured-line" },
    { mmr: 3291, username: "logistical" },
    { mmr: 3342, username: "festive" },
    { mmr: 3591, username: "aggressive" },
    { mmr: 3342, username: "congratulatory" },
    { mmr: 3591, username: "great-job" },
    { mmr: 2751, username: "maximized" },
    { mmr: 2784, username: "value-added" },
];

var rule = (a, b) => {
    let diff = Math.abs(a.mmr - b.mmr);
    if (diff < 100)
        return 100;
    else return 0;
};
twoMatch.rule = multiMatch.rule = rule;
twoMatch.conf.checkinterval = multiMatch.conf.checkinterval = 500;
twoMatch.playerQueue = twoPlayerQueue;
multiMatch.playerQueue = multiPlayerQueue;

describe('Matchmaking', () => {
    describe('Two Player Matchmaking', () => {
        it('Should emit a match event', function (done) {
            twoMatch.start();
            this.timeout(3000);
            twoMatch.on('match', done());
        });
        it('Match event should return 3 objects (Player 1, player 2, timestamp)', function (done) {
            this.timeout(3000);
            twoMatch.on('match', (obj) => {
                assert.typeOf(obj.a, 'object', 'Sends object `a` correctly');
                assert.typeOf(obj.b, 'object', 'Sends object `b` correctly');
                if (Object.keys(obj).length === 3) {
                    done();
                }
            });
        })
    })
    describe('Multiple players (more than 2)', () => {
        it('8 players should find matches', function (done) {
            multiMatch.start();
            this.timeout(10000);
            let matches = [];
            multiMatch.on('match', (obj) => {
                assert.typeOf(obj.a, 'object', 'Sends object `a` correctly');
                assert.typeOf(obj.b, 'object', 'Sends object `b` correctly');
                matches.push(obj.a, obj.b);
                if (matches.length === 8){
                    done();
                }
            });
        })
    })
});
