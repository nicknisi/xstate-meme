import { Centered } from './Centered.js';

export const LoadingIndicator = ({ state }: { state?: string }) => {
  return (
    <Centered>
      <div className="text-center">
        <div className="bg-beef w-32 h-32 bg-contain bg-no-repeat animate-spin-slow" />
        {state && <div className="pt-4 text-3xl text-white font-theramin">{state}</div>}
      </div>
    </Centered>
  );
};
