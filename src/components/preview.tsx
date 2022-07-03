import { useRef, useEffect } from 'react';

interface PreviewProps {
	code: string;
}


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


const Preview: React.FunctionComponent<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();
	useEffect(() => {
		iframe.current.srcdoc = html;
		iframe.current.contentWindow.postMessage(code, '*');
	}, [code])
	return (
		<iframe
			title="preview"
			ref={iframe}
			sandbox="allow-scripts"
			srcDoc={html}
		/>
	);
};


export default Preview;