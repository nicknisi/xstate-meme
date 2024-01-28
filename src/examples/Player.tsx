export const Game = () => (
	<div className="game">
		<Player name="nick" />
		{/* ... */}
	</div>
);

export const Player = ({ name }: Props) => {
	return (
		<div>
			<img src={`${name}.bmp`} />
			<marquee>{name}</marquee>
		</div>
	);
};
