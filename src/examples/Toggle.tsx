import { useEffect, useState } from 'react';

export default function Toggle({ isToggled, onToggle }) {
	const [toggleCount, setToggleCount] = useState(0);

	useEffect(() => {
		setToggleCount(prevCount => prevCount + 1);
	}, [isToggled]);

	return (
		<div>
			<button onClick={() => onToggle?.()}>{isToggled ? 'Turn Off' : 'Turn On'}</button>
			<p>Status: {isToggled ? 'On' : 'Off'}</p>
			<p>Toggle Count: {toggleCount}</p>
		</div>
	);
}
