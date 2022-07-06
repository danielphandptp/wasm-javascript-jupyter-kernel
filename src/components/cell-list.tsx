import React, { Fragment } from 'react';
import { CellsState } from '../state/reducers/cellsReducer';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import './cell-list.css';

const CellList: React.FunctionComponent = () => {
  const cells = useTypedSelector((state) => {
    const { order, data } = state.cells as CellsState;
    return order.map((id: any) => {
      return data[id];
    });
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell}></CellListItem>
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
