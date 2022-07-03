import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';
import { initialCode } from './initial-code';


const App = () => {
	return (
		<div>
			<CodeCell/>
		</div>
	)
};

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(<App />)