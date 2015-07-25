import {Rx} from '@cycle/core';

/**
 * Helpers to catch errors
 */

export function returnAsObservable(error) {
  return Rx.Observable.just({error});
}

/**
 * Helpers to easily map over errors
 */

function isError(data) {
  return !!(data && data.error);
}

function identity(x) {
  return x;
}

export function ifOk(mapper) {
  return (data) => isError(data) ? identity(data) : mapper(data);
}

export function ifError(mapper) {
  return (data) => isError(data) ? mapper(data) : identity(data);
}
