const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: ['./index.js'],
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].[contenthash].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.ts(x)?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new MiniCssExtractPlugin()
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[/\\]node_modules[/\\]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	devServer: {
		open: true,
		compress: true,
		static: [path.resolve(__dirname, './build')],
		port: 8080
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
