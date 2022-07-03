import { useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import { initialCode } from './initial-code';
import Resizable from './resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const parsed_code = await bundle(input);
    setCode(parsed_code);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={initialCode}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
