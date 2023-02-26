module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'plugin:vue/vue3-strongly-recommended',
		'xo',
	],
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
			parserOptions: {
				project: ['./tsconfig.json', './tsconfig.node.json'],
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'vue',
	],
	rules: {
	},
};
