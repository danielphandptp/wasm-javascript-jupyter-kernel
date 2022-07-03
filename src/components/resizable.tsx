import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: any;
}

const Resizable: React.FunctionComponent<ResizableProps> = ({
  direction,
  children,
}) => {
  let resizableProps: ResizableBoxProps;
  if (direction === 'horizontal') {
    resizableProps = {
      width: window.innerWidth * 0.8,
      height: Infinity,
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.8, Infinity],
      resizeHandles: ['e'],
    };
  } else if (direction === 'vertical') {
    resizableProps = {
      width: Infinity,
      height: 300,
      minConstraints: [Infinity, window.innerHeight * 0.2],
      maxConstraints: [Infinity, window.innerHeight * 0.8],
      resizeHandles: ['s'],
    };
  } else {
    // nothing to do
    resizableProps = {
      width: 0,
      height: 0,
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
