import { create } from "zustand";
import { type NavigationProvider, type Wrapper } from "../../types";
import { useState } from "react";

const navigatorManager = create<NavigationProvider>((set, get) => ({
  wrappers: [],
  selectedId: null,
  previousId: null,
  setWrappers: (wrappers: Wrapper[]) => set({ wrappers }),
  setSelectedId: (id: string | null) => set({ selectedId: id }),
  setImperativeSelection: (id: string | null) => {
    const prevId = get().selectedId;
    set({ selectedId: id, previousId: prevId });
  },
  keyListener: (e: KeyboardEvent) => {
    console.log("KEY LISTENER PROVA: ", e.key);
  },
}));

const useNavigatorManager = () => {
  const [store, _] = useState<NavigationProvider>({
    wrappers: navigatorManager.getState().wrappers,
    selectedId: navigatorManager.getState().selectedId,
    previousId: navigatorManager.getState().previousId,
    setWrappers: navigatorManager.getState().setWrappers,
    setSelectedId: navigatorManager.getState().setSelectedId,
    setImperativeSelection: navigatorManager.getState().setImperativeSelection,
    keyListener: navigatorManager.getState().keyListener,
  });
  return store;
};

export default useNavigatorManager;
