import './Bar.css';

/**
 * Bar renders a single array element as a vertical bar.
 * It is intentionally "dumb" — it has no idea what algorithm is running.
 * It only knows: how tall to be, and what state it's currently in.
 * This is what lets the same component serve Bubble Sort, Merge Sort,
 * or any future sorting algorithm without changes.
 */
function Bar({ value, maxValue, state = 'default' }) {
  const heightPercent = (value / maxValue) * 100;

  return (
    <div
      className={`bar bar--${state}`}
      style={{ height: `${heightPercent}%` }}
      data-testid="bar"
      data-value={value}
      data-state={state}
    >
      <span className="bar__label">{value}</span>
    </div>
  );
}

export default Bar;