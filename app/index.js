import Cycle, {Rx} from '@cycle/core';
import {hJSX, makeDOMDriver} from '@cycle/dom';

function calculateBMI(weight: number, height: number) {
  const heightMeters = height * 0.01;
  return Math.round(weight / (heightMeters * heightMeters));
}

function intent(DOM) {
  return {
    changeWeight: DOM.get('#weight', 'newValue').map((ev) => ev.detail),
    changeHeight: DOM.get('#height', 'newValue').map((ev) => ev.detail),
  };
}

function model(actions) {
  return Rx.Observable
    .combineLatest(
      actions.changeWeight.startWith(70),
      actions.changeHeight.startWith(170),
      (weight, height) => ({
        weight,
        height,
        bmi: calculateBMI(weight, height),
      })
    );
}

function view(state) {
  return state.map(({weight, height, bmi}) =>
    <div>
      <labeled-slider id="weight" key={1}
        unit="kg" min={40} initial={weight} max={140}>
        <h2>Weight</h2>
      </labeled-slider>
      <labeled-slider id="height" key={2}
        unit="cm" min={140} initial={height} max={210}>
        <h4>Height</h4>
      </labeled-slider>
      <h2>{`BMI is ${bmi}`}</h2>
    </div>
  );
}

function main({DOM}) {
  return {
    DOM: view(model(intent(DOM))),
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app', {
    'labeled-slider': require('./components/labeled-slider'),
  }),
});
