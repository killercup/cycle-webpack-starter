import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

export default function labeledSlider(responses) {
  let initialValue$ = responses.props.get('initial').first();
  let newValue$ = responses.DOM.get('.slider', 'input')
    .map((ev) => ev.target.value);

  let value$ = initialValue$.concat(newValue$);
  let props$ = responses.props.get('*');

  let vtree$ = Rx.Observable
    .combineLatest(props$, value$, (props, value) =>
      <div className="labeled-slider">
        <div className="label">
          {props.children.concat(value + props.unit)}
        </div>
        <input className="slider" type="range"
          min={props.min}
          max={props.max}
          value={value}
          />
      </div>
    );

  return {
    DOM: vtree$,
    events: {
      newValue: newValue$,
    },
  };
}
