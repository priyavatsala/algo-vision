import Bar from '../Bar/Bar';
import './Visualizer.css';


const PLACEHOLDER_ARRAY = [34, 12, 78, 45, 23, 67, 5, 89, 41, 56];

function Visualizer() {
  const maxValue = Math.max(...PLACEHOLDER_ARRAY);

  return (
    <div className="visualizer" role="img" aria-label="Array visualization">
      {PLACEHOLDER_ARRAY.map((value, index) => (
        <Bar key={index} value={value} maxValue={maxValue} />
      ))}
    </div>
  );
}

export default Visualizer;