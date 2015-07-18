import Cycle from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';

function main() {
  return {
    DOM: Cycle.Rx.Observable.interval(1000)
      .map(i => <h1>{`${i} seconds elapsed`}</h1>)
  };
}

let drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);
