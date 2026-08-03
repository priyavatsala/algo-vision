import { describe, it, expect } from 'vitest';
import { createStepRunner } from '../../engine/createStepRunner';

// A fake generator standing in for a real algorithm — this is the point:
// the runner should work identically regardless of what it's driving.
function* fakeSteps() {
  yield { type: 'compare', indices: [0, 1] };
  yield { type: 'swap', indices: [0, 1] };
  yield { type: 'sorted', index: 0 };
}

describe('createStepRunner', () => {
  it('advances through steps in emitted order', () => {
    const runner = createStepRunner(fakeSteps);

    const first = runner.next();
    expect(first.step).toEqual({ type: 'compare', indices: [0, 1] });

    const second = runner.next();
    expect(second.step.type).toBe('swap');
  });

  it('reports done after the generator finishes', () => {
    const runner = createStepRunner(fakeSteps);
    runner.next();
    runner.next();
    runner.next();

    const fourth = runner.next();
    expect(fourth.done).toBe(true);
    expect(fourth.step).toBeNull();
  });

  it('replays history correctly after stepping back then forward', () => {
    const runner = createStepRunner(fakeSteps);
    runner.next(); // compare
    runner.next(); // swap

    const backStep = runner.back();
    expect(backStep.type).toBe('compare');

    const forwardAgain = runner.next();
    expect(forwardAgain.step.type).toBe('swap');
  });

  it('back() at the very start returns null and stays put', () => {
    const runner = createStepRunner(fakeSteps);
    const result = runner.back();
    expect(result).toBeNull();
  });

  it('reset() restarts the generator from the beginning', () => {
    const runner = createStepRunner(fakeSteps);
    runner.next();
    runner.next();

    runner.reset();
    const afterReset = runner.next();
    expect(afterReset.step.type).toBe('compare');
  });
});