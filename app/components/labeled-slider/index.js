import {Rx} from '@cycle/core';
import {hJSX} from '@cycle/dom';

export default function labeledSlider(responses) {
  const initialValue$ = responses.props.get('initial').first();
  const newValue$ = responses.DOM.get('.slider', 'input')
    .map((ev) => parseInt(ev.target.value), 10);

  const value$ = initialValue$.concat(newValue$);
  const props$ = responses.props.get('*');

  const vtree$ = Rx.Observable
    .combineLatest(props$, value$, (props, value) =>
      <div className="labeled-slider">
        <div className="label">
          {props.children.concat(value + props.unit)}
        </div>
        <input className="slider" type="range"
          min={props.min}
          max={props.max}
          value={value} />
      </div>
    );

  return {
    DOM: vtree$,
    events: {
      newValue: newValue$,
    },
  };
}
