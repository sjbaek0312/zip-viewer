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
		'main': ['./app/entry/main.js']
	//	'login': ['./app/entry/login.js']
	//	'join' : ['./app/entry/join.js']
		},
		output: {
			path: __dirname +'/../main/webapp/static/bundle',
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
				        name: '[name].[ext]',
				        limit: 10000,
				      }
				},				
				 {
	                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[\s\S]r+)?$/,
	                
	                loader: 'file-loader',
	                options: {
	                	path: __dirname +'/../main/webapp/static/bundle',
	                	name: '[name].[ext]',
	                }
	                
	            },
	           
				{ 
					test: /bootstrap-sass\/assets\/javascripts\//, 
					use: 'imports-loader?jQuery=jquery'
				}
			]
		},

};