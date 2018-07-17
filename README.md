# Matchmaker

The matchmaker service solution for your gaming needs!

The only thing you need to make this work is a rule function that compares that should return 100 when an appropriate match is found.

Let's use a test case for looking for an appropriate match using mmr (Matchmaking Rating).

```
import Matcher from 'Matcher';
var matcher = new Matcher;

matcher.on('match', (obj) => {
    console.log("It's a match!");
    console.log(obj.a); console.log(obj.b);
});

matcher.rule = (a, b) => {
    let diff = Math.abs(a.mmr - b.mmr);
    if (diff < 100)
        return 100;
    else return 0;
};

matcher.playerQueue = [
{mmr: 3242, username: "secured line"},
{mmr: 3291, username: "logistical"},
];

matcher.start();
```

# Technologies / Libraries

- Node js
- Mocha (Chai)
- Babel (for ES6)

# Components
.rule

```
matcher.rule = function(a,b) {
    // compare, algorithm, other logic
    // if it works
       // return 100
    // else
    // return 0
}
```

.conf

```
matcher.conf.checkinterval = 500;
matcher.conf.maxIterations = 1;
```
*queueInterval* is the time the function waits to check the queue again. 500 Default.

*maxIterations* is the number of matches the app can give between iterations. 1 Default.

.playerQueue

Player queue that needs to be set, encompassed by the player objects that are going to be matched.
```
testMatcher.playerQueue = playerQueue;
```

# Methods

.addToQueue

Lets you push players into the queue.

.start

Starts the service.

.stop

Stops the service.
