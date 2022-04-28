import { File } from 'renderer/contracts/file';

export interface ContextInterface {
  files: File[];
  activeIndex: number;
  setActiveFile: (i: number) => void;
}
