import { ReactNode } from 'react';

export const Centered = ({ children }: { children: ReactNode }) => (
  <div className="grid place-items-center h-screen">{children}</div>
);
