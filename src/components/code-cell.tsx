import { useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';


const CodeCell = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');

	const onClick = async () => {
		const parsed_code = await bundle(input);
		setCode(parsed_code);
	};

	return (
		<div>
			<CodeEditor 
				initialValue=""
				onChange={(value) => setInput(value)} 
			/>
		
			<div>
				<button
					onClick={onClick}>
						Run Code
				</button>
			</div>
			
			<Preview code={code}/>
		</div>
	)
};

export default CodeCell;