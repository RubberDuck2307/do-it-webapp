export interface Task {
    isImportant: boolean;
    description: string;
    date: Date;
    list?: { name: string; color: string; id: number } | undefined;
    name: string;
    id: number| undefined;
    isFinished: boolean;
  }