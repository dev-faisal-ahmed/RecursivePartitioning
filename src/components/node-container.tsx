import { useEffect, useRef } from 'react';
import { useAppContext } from '../hooks/use-app-context';
import { AlignmentType, NodeType } from '../utils/types';

export function NodeContainer({ children, color, id, alignment }: NodeType) {
  const { state, dispatch } = useAppContext();
  const nodeRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const buttonClassName = `bg-gray-300 py-1 px-3 rounded text-gray-700 font-semibold w-8 h-8 flex items-center justify-center`;

  function handleAddNode(alignment: AlignmentType) {
    dispatch({ type: 'ADD_NODE', payload: { id, alignment } });
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_NODE', payload: { id } });
  }

  useEffect(() => {
    if (!nodeRef.current) return;
    const nodeDiv = nodeRef.current;
    const nodeStyles = window.getComputedStyle(nodeDiv);
    let width = parseInt(nodeStyles.width, 10);
    let height = parseInt(nodeStyles.height, 10);

    let xCoordinate = 0;
    let yCoordinate = 0;

    // top resizing
    function onMouseDownTopResize(event: MouseEvent) {
      yCoordinate = event.clientY;
      const styles = window.getComputedStyle(nodeDiv);
      nodeDiv.style.bottom = styles.bottom;
      nodeDiv.style.cursor = 'n-resize';
      document.addEventListener('mousemove', onMouseMoveTop);
      document.addEventListener('mouseup', onMouseUpTop);
    }

    function onMouseMoveTop(event: MouseEvent) {
      const dy = event.clientY - yCoordinate;
      height = height - dy;
      nodeDiv.style.height = height + 'px';
    }

    function onMouseUpTop() {
      nodeDiv.style.cursor = 'auto';
      document.removeEventListener('mousemove', onMouseMoveTop);
    }

    // bottom resizing
    function onMouseDownBottomResize(event: MouseEvent) {
      yCoordinate = event.clientY;
      const styles = window.getComputedStyle(nodeDiv);
      nodeDiv.style.top = styles.top;
      nodeDiv.style.cursor = 'n-resize';
      document.addEventListener('mousemove', onMouseMoveBottom);
      document.addEventListener('mouseup', onMouseUpBottom);
    }

    function onMouseMoveBottom(event: MouseEvent) {
      const dy = event.clientY - yCoordinate;
      height = height + dy;
      nodeDiv.style.height = height + 'px';
    }

    function onMouseUpBottom() {
      nodeDiv.style.cursor = 'auto';
      document.removeEventListener('mousemove', onMouseMoveBottom);
    }

    // left resizing
    function onMouseDownLeftResize(event: MouseEvent) {
      xCoordinate = event.clientX;
      const styles = window.getComputedStyle(nodeDiv);
      nodeDiv.style.right = styles.right;
      nodeDiv.style.cursor = 'e-resize';
      document.addEventListener('mousemove', onMouseMoveLeft);
      document.addEventListener('mouseup', onMouseUpLeft);
    }

    function onMouseMoveLeft(event: MouseEvent) {
      const dx = event.clientX - xCoordinate;
      width = width - dx;
      nodeDiv.style.width = width + 'px';
    }

    function onMouseUpLeft() {
      nodeDiv.style.cursor = 'auto';
      document.removeEventListener('mousemove', onMouseMoveLeft);
    }

    // right resizing
    function onMouseDownRightResize(event: MouseEvent) {
      xCoordinate = event.clientX;
      const styles = window.getComputedStyle(nodeDiv);
      nodeDiv.style.left = styles.left;
      nodeDiv.style.cursor = 'e-resize';
      document.addEventListener('mousemove', onMouseMoveRight);
      document.addEventListener('mouseup', onMouseUpRight);
    }

    function onMouseMoveRight(event: MouseEvent) {
      const dx = event.clientX - xCoordinate;
      width = width + dx;
      nodeDiv.style.width = width + 'px';
    }

    function onMouseUpRight() {
      nodeDiv.style.cursor = 'auto';
      document.removeEventListener('mousemove', onMouseMoveLeft);
    }

    // calling these event listener
    if (!topRef.current) return;
    const topResizer = topRef.current;
    topResizer.addEventListener('mousedown', onMouseDownTopResize);

    if (!bottomRef.current) return;
    const bottomResizer = bottomRef.current;
    bottomResizer.addEventListener('mousedown', onMouseDownBottomResize);

    if (!leftRef.current) return;
    const leftResizer = leftRef.current;
    leftResizer.addEventListener('mousedown', onMouseDownLeftResize);

    if (!rightRef.current) return;
    const rightResizer = rightRef.current;
    rightResizer.addEventListener('mousedown', onMouseDownRightResize);

    // removing all listeners when the node is clicked

    function removeAllEventListener() {
      topResizer.removeEventListener('mousedown', onMouseDownTopResize);
      bottomResizer.removeEventListener('mousedown', onMouseDownBottomResize);
      leftResizer.removeEventListener('mousedown', onMouseDownLeftResize);
      rightResizer.removeEventListener('mousedown', onMouseDownRightResize);
    }

    nodeDiv.addEventListener('click', removeAllEventListener);

    return () => {
      removeAllEventListener();
      nodeDiv.removeEventListener('click', removeAllEventListener);
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      key={id}
      style={{
        backgroundColor: color,
        flexDirection: alignment === 'vertical' ? 'row' : 'column',
      }}
      className='relative flex h-full w-full items-center justify-center gap-3 transition-all'
    >
      {/* for resizing purpose */}
      {!children ||
        (children.length === 0 && (
          <>
            {/* top */}
            <div
              ref={topRef}
              className='absolute top-0 h-2 w-full cursor-n-resize bg-white'
            />
            {/* bottom */}
            <div
              ref={bottomRef}
              className='absolute bottom-0 h-2 w-full cursor-n-resize bg-white'
            />
            {/* left */}
            <div
              ref={leftRef}
              className='absolute left-0 h-full w-2 cursor-e-resize bg-white'
            />
            {/* right */}
            <div
              ref={rightRef}
              className='absolute right-0 h-full w-2 cursor-e-resize bg-white'
            />
          </>
        ))}

      {!children || children.length === 0 ? (
        <div className='flex items-center gap-1 p-1'>
          <button
            onClick={() => handleAddNode('vertical')}
            className={buttonClassName}
          >
            V
          </button>
          <button
            onClick={() => handleAddNode('horizontal')}
            className={buttonClassName}
          >
            H
          </button>
          {state.totalNodes !== 1 && (
            <button onClick={handleDelete} className={buttonClassName}>
              -
            </button>
          )}
        </div>
      ) : (
        <>
          {children.map((el) => (
            <NodeContainer key={el.id} {...el} />
          ))}
        </>
      )}
    </div>
  );
}
