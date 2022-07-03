import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(<App />);
