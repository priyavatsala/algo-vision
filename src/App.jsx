import Navbar from './components/Navbar/Navbar';
import Visualizer from './components/Visualizer/Visualizer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Visualizer />
      </main>
    </div>
  );
}

export default App;