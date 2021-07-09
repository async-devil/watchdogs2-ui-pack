import * as React from "react";

import styled from "styled-components";

const SwitchBlock = styled.div<{ fontName: string }>`
	font-family: "${(props) => props.fontName}", monospace;
	font-size: 2rem;

	.switch__main-container {
		display: flex;
	}
`;

const SwitchOption = styled.p<{ color: string }>`
	color: ${(props) => props.color};
`;

const SwitchArrow = styled.button`
	background: none;
	color: ${(props) => (props.disabled ? "#f5f5f5" : "#00fe1e")};
	border: none;

	cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const SwitchIndicatorsContainer = styled.div<{ selectedIndex: number }>`
	height: 0.8rem;

	button {
		width: 0.6rem;
		height: 0.5rem;

		margin: 0.2rem 0.3rem 0.2rem 0.3rem;

		background-color: #000;
		border: none;

		cursor: pointer;

		&:nth-child(${(props) => props.selectedIndex + 1}) {
			background-color: #00fe1e;
		}
	}
`;

const Switch = (props: {
	options: { text: string; hexColor?: string }[];
	selectEvent: (
		clickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		option: { text: string; hexColor?: string; index: number }
	) => void;
	fontName?: string;
	defaultIndex?: number;
}): JSX.Element => {
	const { defaultIndex, options, selectEvent, fontName } = props;

	// ? index assigning for active property selection
	const optionsList: { text: string; hexColor?: string; index: number }[] = [...options].map(
		(option, index) => Object.assign(option, { index })
	);

	const [currentOption, setOption] = React.useState(
		optionsList[
			defaultIndex ? (defaultIndex >= 0 && defaultIndex < optionsList.length ? defaultIndex : 0) : 0
			// ? selects valid index
		]
	);

	const indicators = [...optionsList].map((option) => {
		return (
			<button
				className="switch__indicator"
				key={`indicator_${option.index}`}
				onClick={(clickEvent) => {
					const selectedOption = optionsList[option.index];

					selectEvent(clickEvent, selectedOption);
					setOption(selectedOption);
				}}
			/>
		);
	});

	return (
		<SwitchBlock fontName={fontName || "PixelUnicode"} className="switch">
			<div className="switch__main-container">
				<SwitchArrow
					className="switch__arrow_left"
					disabled={currentOption.index === 0}
					onClick={(clickEvent) => {
						if (currentOption.index === 0) return;

						const nextOption = optionsList[currentOption.index - 1];

						selectEvent(clickEvent, nextOption);
						setOption(nextOption);
					}}
				>
					{"<<"}
				</SwitchArrow>
				<SwitchOption className="switch__option" color={currentOption.hexColor || "#00fe1e"}>
					{currentOption.text}
				</SwitchOption>
				<SwitchArrow
					className="switch__arrow_right"
					disabled={currentOption.index === optionsList.length - 1}
					onClick={(clickEvent) => {
						if (currentOption.index === optionsList.length - 1) return;

						const nextOption = optionsList[currentOption.index + 1];

						selectEvent(clickEvent, nextOption);
						setOption(nextOption);
					}}
				>
					{">>"}
				</SwitchArrow>
			</div>
			<SwitchIndicatorsContainer
				selectedIndex={currentOption.index}
				className="switch__indicators-container"
			>
				{indicators}
			</SwitchIndicatorsContainer>
		</SwitchBlock>
	);
};

export default Switch;
