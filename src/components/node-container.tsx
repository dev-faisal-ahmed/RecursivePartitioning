import { useAppContext } from '../hooks/use-app-context';
import { AlignmentType, NodeType } from '../utils/types';

export function NodeContainer({ children, color, id, alignment }: NodeType) {
  const { state, dispatch } = useAppContext();

  const buttonClassName = `bg-gray-300 py-1 px-3 rounded text-gray-700 font-semibold w-8 h-8 flex items-center justify-center`;

  function handleAddNode(alignment: AlignmentType) {
    dispatch({ type: 'ADD_NODE', payload: { id, alignment } });
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_NODE', payload: { id } });
  }

  return (
    <div
      key={id}
      style={{
        backgroundColor: color,
        flexDirection: alignment === 'vertical' ? 'row' : 'column',
      }}
      className='flex h-full w-full items-center justify-center gap-2'
    >
      {!children || children.length === 0 ? (
        <div className='w-fit p-3'>
          <div className='flex items-center gap-1'>
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
          <p
            className={
              'mx-auto mt-2 w-full rounded bg-green-600 py-1 text-center font-semibold text-white '
            }
          >
            {id}
          </p>
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
