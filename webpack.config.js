module.exports = {
		entry: {  
			'entry': ['./main/entry.js'],
//			'bootstrap': ['./main/bootstrapEntry.js']
		
		},
		output: {
			path: __dirname +'/static',
			filename: '[name].bundle.js'
		},
		module: {
			rules: [
				{ // css
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{ // babel
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						plugins: ['syntax-dynamic-import'], // babel-plugin-syntax-dynamic-import
						presets:[[
							'env', {
								targets: {
									browsers: ['last 2 versions']
								}
							}
						]]
					}
					
				},
				{ // 기타 파일 로더 추가.
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
