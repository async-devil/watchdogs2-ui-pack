import * as React from "react";

import styled from "styled-components";

const ButtonBlock = styled.button<{ fontName: string }>`
	width: auto;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #000;
	color: #f5f5f5;

	font-family: "${(props) => props.fontName}", monospace;
	line-height: 1.5rem;
	font-size: 1.3rem;

	border: none;

	padding: 0.3rem 3rem 0.5rem 0.4rem;
	margin-bottom: 1rem;

	transition: padding 0.15s cubic-bezier(0.79, 0.14, 0.15, 0.86),
		margin 0.15s cubic-bezier(0.79, 0.14, 0.15, 0.86);

	&:hover {
		background-color: #0f0ce3;

		padding: 0.7rem 3rem 0.9rem 0.4rem;
		margin-bottom: 0.2rem;

		&:before {
			content: "//";
			padding-right: 0.5rem;
		}
	}
`;

const Button = (props: {
	event: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	fontName?: string;
	children: JSX.Element | string;
}): JSX.Element => {
	const { event, fontName, children } = props;
	return (
		<ButtonBlock
			fontName={fontName || "Pexico-Micro"}
			className="button"
			onClick={(ev) => event(ev)}
		>
			{children}
		</ButtonBlock>
	);
};

export default Button;
