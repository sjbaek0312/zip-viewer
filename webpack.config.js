var path = require("path");
module.exports = {
		entry: {  
			'main': ['./src/fe/app/entry/main.js']
		},
		output: {
			path: __dirname +'/src/main/webapp/static/bundle',
			filename: '[name].js'
		},
		resolve: {
			alias : {
				'view': __dirname + '/src/fe/app/view',
				'tpl': __dirname + '/src/fe/app/tpl',
				'model': __dirname + '/src/fe/app/model',
				'controller': __dirname + '/src/fe/app/controller',
				'lib': __dirname + '/src/fe/app/lib',
				'css': __dirname + '/src/fe/css'
			}
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
				{ test: /\.html$/, loader: "handlebars-loader" },
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
				        name: '[hash].[ext]',
				        limit: 10000,
				      }
				}
			]
		}
};
