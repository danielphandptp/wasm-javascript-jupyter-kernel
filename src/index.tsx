import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
	const ref = useRef<any>();
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm',
		});
	};

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
		if (event) {
			console.log(event.target.value);
			setInput(event.target.value);
		}
	}

	useEffect(() => {
		startService();
	}, []);

	const onClick = async (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
		if (!event || !ref.current) {
			return;
		}
		const result = await ref.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin()]
		});
		console.log(result);
		setCode(result.outputFiles[0].text);
	};

	return (
		<div>
			{/* ------------------ */}
			{/* Area to enter code */}
			{/* ------------------ */}
			<textarea
				value={input}
				onChange={onChange}>
			</textarea>
			
			{/* -------------	*/}
			{/* Submit button */}
			{/* ------------- */}
			<div>
				<button
					onClick={onClick}>
					Submit
				</button>
			</div>

			{/* ----------------------------------- */}
			{/* Display area of the transpiled code */}
			{/* ----------------------------------- */}
			<pre>
				{code}
			</pre>
		</div>
	)
};

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(<App />)
