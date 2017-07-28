var webpack = require('webpack');
var path = require('path');
module.exports = {
		plugins: [
		    new webpack.ProvidePlugin({
		        $: "jquery",
		        jQuery: "jquery"
		    })
		],
		entry: {  
		'main': ['./src/fe/app/entry/main.js']
	//	'login': ['./src/fe/app/entry/login.js']
	//	'join' : ['./src/fe/app/entry/join.js']
		},
		output: {
			path: __dirname +'/src/main/webapp/static/bundle',
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
	            { 
					test: /\.scss$/, 
					use: ['style-loader', 'css-loader', 'sass-loader'] 
				},
				{ 
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						plugins: ['syntax-dynamic-import'], 
						presets:[[
							'env', {
								targets: {
									browsers: ['last 2 versions']
								}
							}
						]]
					}
					
				},
				{ 
				      test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				      loader: 'url-loader',
				      options: {
		                path: __dirname +'/src/main/webapp/static/bundle',
				        name: '[name].[ext]',
				        limit: 10000,
				      }
				},				
				 {
	                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[\s\S]r+)?$/,
	                
	                loader: 'file-loader',
	                options: {
	                	path: __dirname +'/src/main/webapp/static/bundle',
	                	name: '[name].[ext]',
	                }
	                
	            }
			]
		},

};