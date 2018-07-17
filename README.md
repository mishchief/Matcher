# Matcher

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
__.rule__

```
matcher.rule = function(a,b) {
    // compare, algorithm, other logic
    // if it works
       // return 100
    // else
    // return 0
}
```

__.conf__

```
matcher.conf.checkinterval = 500;
matcher.conf.maxIterations = 1;
```
__queueInterval__ is the time the function waits to check the queue again. 500 Default.

__maxIterations__ is the number of matches the app can give between iterations. 1 Default.

__.playerQueue__

Player queue that needs to be set, encompassed by the player objects that are going to be matched.
```
testMatcher.playerQueue = playerQueue;
```

# Methods

__.addToQueue__

Lets you push players into the queue.

__.start__

Starts the service.

__.stop__

Stops the service.

# Author
Mijail N. Montero
