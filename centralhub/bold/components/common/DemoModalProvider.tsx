import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import DemoModal from './DemoModal';

interface DemoModalContextValue {
  openDemoModal: () => void;
  closeDemoModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openDemoModal = useCallback(() => setOpen(true), []);
  const closeDemoModal = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openDemoModal, closeDemoModal }), [openDemoModal, closeDemoModal]);

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoModal open={open} onClose={closeDemoModal} />
    </DemoModalContext.Provider>
  );
}

export function useDemoModal(): DemoModalContextValue {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    throw new Error('useDemoModal must be used within a DemoModalProvider');
  }
  return ctx;
}
