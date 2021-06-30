import * as React from "react";
import { useState } from "react";

import styled from "styled-components";

const TrackBarBlock = styled.div<{ fontName: string }>`
	height: 3rem;
	width: min-content;

	display: flex;

	background-color: #0f0ce3;
	color: #00fe00;

	font-family: "${(props) => props.fontName}", monospace;
	font-size: 2rem;

	& > div {
		height: 2.3rem;

		margin: auto 0 auto 0;
	}

	.track-bar__percent {
		width: 69px;

		text-align: center;
	}

	.track-bar__bar {
		user-select: none;

		.track-bar__bar_container {
			display: flex;

			.track-bar__bar__brackets {
				color: #000;
			}

			.track-bar__bar__active {
				position: relative;
				top: 2px;

				letter-spacing: 0.2rem;
			}

			.track-bar__bar__hyphen {
				cursor: pointer;
			}
		}

		.track-bar__bar__arrow {
			height: 0;
			position: relative;
		}

		.arrow_top {
			bottom: 0.4rem;
		}

		.arrow_bottom {
			top: 0.55rem;
			transform: rotateX(180deg);
		}
	}
`;

type Options = {
	defaultPercent?: number;
	numberOfHyphens?: number;
};

const TrackBar = (props: {
	clickEvent: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, percent: number) => void;
	options?: Options;
	fontName?: string;
}): JSX.Element => {
	const { clickEvent, fontName } = props;
	const config = {
		defaultPercent: 0,
		numberOfHyphens: 21,
	};

	const { options } = props;

	// ? Overrides default config
	if (options) Object.assign(config, options);

	const [percent, setPercent] = useState(
		config.defaultPercent < 100 && config.defaultPercent > 0 ? config.defaultPercent : 0
	);

	const hyphens = [];
	for (let i = 0; i < config.numberOfHyphens; i += 1) {
		hyphens.push(
			<span className="track-bar__bar__hyphen" key={`hyphen_${i}`}>
				-
			</span>
		);
	}
	const getCenterByRect = (rect: DOMRect): number => rect.x + rect.width / 2;
	const getNumberOfHyphenByPercent = (perc: number, length: number): number =>
		Math.floor(perc / (100 / length));

	const [selctedHyphenCenterX, setCenterX] = useState(0);

	const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const rect = event.currentTarget.getBoundingClientRect();

		const { x, width } = rect;
		const { clientX } = event;

		const xDelta = clientX - x;
		const newPercent = Math.floor(
			getNumberOfHyphenByPercent(Math.round(xDelta / (width / 100)), config.numberOfHyphens) *
				(100 / (config.numberOfHyphens - 1))
		);

		clickEvent(event, newPercent);
		setPercent(newPercent);
	};

	React.useEffect(() => {
		const hyphenList = document.getElementsByClassName("track-bar__bar__hyphen");
		const selectedHyphen = hyphenList[getNumberOfHyphenByPercent(percent, hyphenList.length - 1)];

		setCenterX(getCenterByRect(selectedHyphen.getBoundingClientRect()));
	}, [percent]);

	return (
		<TrackBarBlock fontName={fontName || "PixelUnicode"} className="track-bar">
			<div className="track-bar__percent">
				<span>{percent}</span>
				<span style={{ marginLeft: "5px" }}>%</span>
			</div>
			<div className="track-bar__bar">
				<div
					className="track-bar__bar__arrow arrow_top"
					style={{ left: `${selctedHyphenCenterX - 81}px` }}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 300 300">
						<path
							fill="white"
							stroke="white"
							strokeWidth="1"
							d="M 33.00,84.00
           C 33.00,84.00 79.00,84.00 79.00,84.00
             79.00,84.00 79.00,128.00 79.00,128.00
             79.00,128.00 124.00,128.00 124.00,128.00
             124.00,128.00 124.00,173.00 124.00,173.00
             124.00,173.00 168.00,173.00 168.00,173.00
             168.00,173.00 168.00,129.00 168.00,129.00
             168.00,129.00 213.00,129.00 213.00,129.00
             213.00,129.00 213.00,84.00 213.00,84.00
             213.00,84.00 259.00,84.00 259.00,84.00
             259.00,84.00 259.00,130.00 259.00,130.00
             259.00,130.00 214.00,130.00 214.00,130.00
             214.00,130.00 214.00,175.00 214.00,175.00
             214.00,175.00 169.00,175.00 169.00,175.00
             169.00,175.00 169.00,219.00 169.00,219.00
             169.00,219.00 123.00,219.00 123.00,219.00
             123.00,219.00 123.00,174.00 123.00,174.00
             123.00,174.00 79.00,174.00 79.00,174.00
             79.00,174.00 79.00,130.00 79.00,130.00
             79.00,130.00 33.00,130.00 33.00,130.00
             33.00,130.00 33.00,84.00 33.00,84.00 Z"
						/>
					</svg>
				</div>
				<div className="track-bar__bar_container">
					<span className="track-bar__bar__brackets">[</span>
					<div
						className="track-bar__bar__active"
						onClick={(ev) => onClick(ev)}
						role="button"
						tabIndex={0}
					>
						{hyphens}
					</div>
					<span className="track-bar__bar__brackets">]</span>
				</div>
				<div
					className="track-bar__bar__arrow arrow_bottom"
					style={{ left: `${selctedHyphenCenterX - 81}px` }}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 300 300">
						<path
							fill="white"
							stroke="white"
							strokeWidth="1"
							d="M 33.00,84.00
           C 33.00,84.00 79.00,84.00 79.00,84.00
             79.00,84.00 79.00,128.00 79.00,128.00
             79.00,128.00 124.00,128.00 124.00,128.00
             124.00,128.00 124.00,173.00 124.00,173.00
             124.00,173.00 168.00,173.00 168.00,173.00
             168.00,173.00 168.00,129.00 168.00,129.00
             168.00,129.00 213.00,129.00 213.00,129.00
             213.00,129.00 213.00,84.00 213.00,84.00
             213.00,84.00 259.00,84.00 259.00,84.00
             259.00,84.00 259.00,130.00 259.00,130.00
             259.00,130.00 214.00,130.00 214.00,130.00
             214.00,130.00 214.00,175.00 214.00,175.00
             214.00,175.00 169.00,175.00 169.00,175.00
             169.00,175.00 169.00,219.00 169.00,219.00
             169.00,219.00 123.00,219.00 123.00,219.00
             123.00,219.00 123.00,174.00 123.00,174.00
             123.00,174.00 79.00,174.00 79.00,174.00
             79.00,174.00 79.00,130.00 79.00,130.00
             79.00,130.00 33.00,130.00 33.00,130.00
             33.00,130.00 33.00,84.00 33.00,84.00 Z"
						/>
					</svg>
				</div>
			</div>
		</TrackBarBlock>
	);
};

export default TrackBar;
