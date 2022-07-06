import { ActionType } from "../action-types";
import { UpdateCellAction, DeleteCellAction, MoveCellAction, InsertCellBeforeAction } from "../actions";
import { CellTypes } from "../cell";
import { Direction } from "../actions";


export const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: {
			id: id,
			content: content,
		},
	};
};

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id
	}
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: {
			id: id,
			direction: direction,
		}
	};
};

export const insertCellBefore = (id: string | null, cellType: CellTypes): InsertCellBeforeAction => {
	return {
		type: ActionType.INSERT_CELL_BEFORE,
		payload: {
			id: id,
			type: cellType
		}
	}
};
