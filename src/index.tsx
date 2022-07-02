import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
	const ref = useRef<any>();
	const iframe = useRef<any>();
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	};

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
		if (event) {
			// console.log(event.target.value);
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
			plugins: [
				unpkgPathPlugin(),
				fetchPlugin(input)
			],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});
		
		// setCode(result.outputFiles[0].text);
		iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
	};

	const html = (`
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					window.addEventListener('message', (window_event) => {
						try {
							eval(event.data);
						} catch (err) {
							const root = document.querySelector('#root');
							root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
						}
					}, false);
				</script>
			</body>
		</html>
	`);

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
			<pre>{code}</pre>
			<iframe ref={iframe} sandbox="allow-scripts" srcDoc={html}/>
		</div>
	)
};


const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(<App />)
