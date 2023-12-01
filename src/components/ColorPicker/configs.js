export const defaultConfigs = [
	{
		title: 'Climate',
		colors: [
			{ color: 'r', value: 255 },
			{ color: 'g', value: 0 },
			{ color: 'b', value: 0 },
		],
		formula: [
			{ color: 'r', formula: -1 },
			{ color: 'g', formula: 1 },
			{ color: 'b', formula: 1 },
		],
		gradientEnd: [
			{ color: 'r', value: 0 },
			{ color: 'g', value: 255 },
			{ color: 'b', value: 255 },
		],
	},

	{
		title: 'Toxic',
		colors: [
			{ color: 'r', value: 0 },
			{ color: 'g', value: 255 },
			{ color: 'b', value: 120 },
		],
		formula: [
			{ color: 'r', formula: 1 },
			{ color: 'g', formula: -1 },
			{ color: 'b', formula: 0 },
		],
		gradientEnd: [
			{ color: 'r', value: 255 },
			{ color: 'g', value: 0 },
			{ color: 'b', value: 120 },
		],
	},

	{
		title: 'Halloween',
		colors: [
			{ color: 'r', value: 140 },
			{ color: 'g', value: 255 },
			{ color: 'b', value: 0 },
		],
		formula: [
			{ color: 'r', formula: 0 },
			{ color: 'g', formula: -1 },
			{ color: 'b', formula: 1 },
		],
		gradientEnd: [
			{ color: 'r', value: 140 },
			{ color: 'g', value: 0 },
			{ color: 'b', value: 255 },
		],
	},
];
