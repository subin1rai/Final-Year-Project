// projectStore.ts
import {create} from "zustand";
export interface Worker {
  id: number;
  projectId: number;
  workerId: number;
  attendance: boolean | null;
  createdAt: string;
  worker: {
    id: number;
    name: string;
    contact: string;
    profile: string | null;
    designation: string;
  };
}

export interface Project {
  id: number;
  projectName: string;
  ownerName: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  status: string;
  builderId: number;
  createdAt: string;
  updatedAt: string;
  projectWorkers: Worker[];
}
interface ProjectStore {
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
  clearSelectedProject: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  clearSelectedProject: () => set({ selectedProject: null }),
}));
