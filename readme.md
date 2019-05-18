# Highland-Rx
TOMARE: WIP 
[Highland](https://highlandjs.org/) in the words of the developer is a javascript utility to manage synchronous and asynchronous code, using nothing more than standard JavaScript and Node-like streams. [Rxjs](https://www.learnrxjs.io/) is one of the hottest libraries in web development today, offering a powerful, functional approach for dealing with events and with integration points into a growing number of frameworks, libraries, and utilities. Both libraries have their own high points. This repository provides RxJs like wrappers over Highland streams. The audience for this repo are those who are familiar with Rxjs but would to like to understand or try Highland, without a major transition requirement.

There are some major differences between Highland and Rxjs in the way they treat streams, hence the intention here is to only provide a way to write Rxjs like code with Highland. A majority of the operators in Rxjs will be defined for Highland too in this repo.

# Prerequisite
It goes without saying that we need Highland to work.

```bash
npm install highland
```

# Content

Highland-Rx is divided into two modules - Streamers and Operators. Streamers are anything that sources a stream eg from, of, range etc... Operators are anything that utilizes a stream, manipulates a stream or consumes it eg map, delay etc...

## Streamers
Here are the list of available streamers.

[create](/highland-rx-examples/streamers/create.md)

[empty](/highland-rx-examples/streamers/empty.md) 

[from](/highland-rx-examples/streamers/from.md) 

[interval](/highland-rx-examples/streamers/interval.md) 

[of/just](/highland-rx-examples/streamers/of.md) 

[range](/highland-rx-examples/streamers/range.md) 

[timer](/highland-rx-examples/streamers/timer.md) 


## Operators
Here are the list of available operators.

[defaultIfEmpty](/highland-rx-examples/operators/defaultIfEmpty.md)

[delay](/highland-rx-examples/operators/delay.md)

[delayWhen](/highland-rx-examples/operators/delayWhen.md)

[distinctUntilChanged](/highland-rx-examples/operators/distinctUntilChanged.md)
