import React from 'react';
import { CellsState } from '../state/reducers/cellsReducer';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';

const CellList: React.FunctionComponent = () => {
  const cells = useTypedSelector((state) => {
    const { order, data } = state.cells as CellsState;
    return order.map((id: any) => {
      return data[id];
    });
  });
  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell}></CellListItem>
  ));
  return <div>{renderedCells}</div>;
};

export default CellList;
