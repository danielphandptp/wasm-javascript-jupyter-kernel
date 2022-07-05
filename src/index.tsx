import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state';
import TextEditor from './components/text-editor';
import CellList from './components/cell-list';

const App = () => {
  return (
    <Provider {...{ store: store }}>
      <div>
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList />
      </div>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(<App />);
