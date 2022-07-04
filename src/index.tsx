import 'bulmaswatch/solar/bulmaswatch.min.css';
import * as ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(<App />);
