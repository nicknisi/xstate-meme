import { ReactNode } from 'react';

export const Centered = ({ children }: { children: ReactNode }) => (
	<div className="grid h-screen place-items-center">{children}</div>
);
