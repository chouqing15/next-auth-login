import { create } from "zustand";

const useLoginStore = create<{ open: boolean; setOpen: (o: boolean) => void }>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export default useLoginStore;
