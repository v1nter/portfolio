export const defaultConfigs = [
	{
		title: 'climate',
		config: [
			{ color: 'r', value: 255 },
			{ color: 'g', value: 0 },
			{ color: 'b', value: 0 },
		],
		formula: [
			{ color: 'r', formula: -1 },
			{ color: 'g', formula: 1 },
			{ color: 'b', formula: 1 },
		],
	},

	{
		title: 'toxic',
		config: [
			{ color: 'r', value: 0 },
			{ color: 'g', value: 255 },
			{ color: 'b', value: 120 },
		],
		formula: [
			{ color: 'r', formula: 1 },
			{ color: 'g', formula: -1 },
			{ color: 'b', formula: 0 },
		],
	},
];
