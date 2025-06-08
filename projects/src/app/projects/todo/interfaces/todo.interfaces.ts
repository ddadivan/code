import {Status} from '../enums/enums.todo';

export interface ITodoItem {
  id: number;
  title: string;
  status: Status;
  complete: boolean;
  checked: boolean;
  date: Date;
}

export interface IPriority {
  id: Status,
  text: string;
  value: number;
}

export interface IConfirm {
  confirm: boolean;
}

export const priorityButtons: IPriority[] = [
  {
    id: Status.HIGH,
    text: 'HIGH',
    value: 0,
  },
  {
    id: Status.MIDDLE,
    text: 'MIDDLE',
    value: 1,
  },
  {
    id: Status.LOW,
    text: 'LOW',
    value: 2,
  },
];


export const priorityButtonsSecond: IPriority[] = [
  {
    id: Status.HIGH,
    text: 'Edit',
    value: 0,
  },
  {
    id: Status.MIDDLE,
    text: 'Update',
    value: 1,
  },
  {
    id: Status.LOW,
    text: 'Change',
    value: 2,
  },
];
