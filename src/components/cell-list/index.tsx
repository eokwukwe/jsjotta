import { Fragment } from 'react';

import AddCell from '../add-cell';
import CellListItem from '../cell-list-item';

import { useAppSelector } from '../../hooks/redux-hooks';

const CellList: React.FC = () => {
  const cells = useAppSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;