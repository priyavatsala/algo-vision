/**
 * Wraps any step-emitting generator function and gives it:
 *  - forward playback (next)
 *  - backward playback (back) — via replaying stored history,
 *    since a JS generator itself cannot be rewound
 *  - reset (restart the generator from scratch)
 *
 * This function has zero knowledge of sorting, arrays, or graphs.
 * It only knows "call this generator, remember what it yielded."
 */
export function createStepRunner(generatorFn, ...args) {
  let generator;
  let history = [];   // every step object we've seen, in order
  let cursor = -1;    // index into history representing "current step"

  function init() {
    generator = generatorFn(...args);
    history = [];
    cursor = -1;
  }

  function next() {
    // If we previously stepped back, "forward" first replays
    // steps we already have in history — no need to touch the generator.
    if (cursor < history.length - 1) {
      cursor += 1;
      return { done: false, step: history[cursor] };
    }

    const result = generator.next();
    if (result.done) {
      return { done: true, step: null };
    }

    history.push(result.value);
    cursor += 1;
    return { done: false, step: result.value };
  }

  function back() {
    if (cursor <= 0) {
      cursor = -1;
      return null;
    }
    cursor -= 1;
    return history[cursor];
  }

  function reset() {
    init();
  }

  function getHistory() {
    return history;
  }

  init();

  return { next, back, reset, getHistory };
}