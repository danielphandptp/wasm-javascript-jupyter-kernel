import React, { Fragment } from 'react';
import { CellsState } from '../state/reducers/cellsReducer';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FunctionComponent = () => {
  const cells = useTypedSelector((state) => {
    const { order, data } = state.cells as CellsState;
    return order.map((id: any) => {
      return data[id];
    });
  });
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell}></CellListItem>
    </Fragment>
  ));
  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
