const path = require('path');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: {
		popup: path.join(__dirname, "src/popup.tsx"),
		background: path.join(__dirname, "src/background.ts"),
	},
	output: { path: path.join(__dirname, "distribution"), filename: "[name].js" },
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /(node_modules|tmp)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets:
							[
								"@babel/preset-react",
								"@babel/preset-typescript",
							]
					}
				}
			},
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts"],
	},
	plugins: [
		new SizePlugin(),
		new CopyWebpackPlugin({
			patterns: [{ from: "public", to: "." }],
		})
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: false,
					compress: false,
					output: {
						beautify: true,
						indent_level: 2 // eslint-disable-line camelcase
					}
				}
			})
		]
	}
};
