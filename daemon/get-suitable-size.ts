export function getSuitableSize(param: {
	screenWidth: number;
	screenHeight: number;
	imageWidth: number;
	imageHeight: number;
}): {
		x: number;
		y: number;
		width: number;
		height: number;
	} {
	const result = {
		x: 0,
		y: 0,
		width: param.imageWidth,
		height: param.imageHeight,
	};

	let scale = 1;
	const padding = 100;
	if (
		param.imageWidth + padding > param.screenWidth
    && param.screenWidth > padding * 2
	) {
		const wScale = (param.screenWidth - padding) / param.imageWidth;
		scale = Math.min(scale, wScale);
	}

	if (
		param.imageHeight + padding > param.screenHeight
    && param.screenHeight > padding * 2
	) {
		const hScale = (param.screenHeight - padding) / param.imageHeight;
		scale = Math.min(scale, hScale);
	}

	result.width = Math.ceil(param.imageWidth * scale);
	result.height = Math.ceil(param.imageHeight * scale);

	result.x = Math.round((param.screenWidth - result.width) / 2);
	result.y = Math.round((param.screenHeight - result.height) / 2);

	// console.log(result);

	return result;
}
