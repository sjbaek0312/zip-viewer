<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Compress File Viewer</title>
<meta charset="utf-8">
<script src="static/bundle/main.js"></script>

</head>

<body>
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">Compress File Viewer</a>
			</div>
			<ul class="nav navbar-nav">
				<li><a href="#">UserName</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<button class="btn btn-danger navbar-btn dropdown-toggle"
						type="button" data-toggle="dropdown">
						Upload Progress <span class="caret"></span>
					</button>
					<ul class="dropdown-menu dropDownView">

						<li>subTasj2.zip upload Done</li>
						<li>subTasj2.zip upload
								<div class="progress">
									<div class="progress-bar" role="progressbar" aria-valuenow="70"
										aria-valuemin="0" aria-valuemax="100" style="width: 70%">
										<span class="sr-only">70% Complete</span>
									</div>
								</div>
						</li>
						<li>subTasj2.zip upload </li>
					</ul>
				</li>
				<li><a href="#"><span class="glyphicon glyphicon-log-out"></span>
						Logout</a></li>
			</ul>
		</div>
	</nav>

	<div class="container">
		<div class="jumbotron dropZone">
			<h1 style="color: 'gray'">Drop Here</h1>
		</div>
	</div>

	<div class="container">

		<div class="row">
			<div class="col-xs-2">
				<img src="../static/img/file-zip.png" class="media-object"
					style="width: 100px" />
				<h3>subTask.zip</h3>
			</div>
			<div class="col-xs-2">
				<div style="margin: 2px">
					<img src="../static/img/file-zip.png" class="media-object"
						style="width: 100px" />
					<h3>subTask2.zip</h3>
				</div>
			</div>

			<div class="col-xs-2">
				<img src="../static/img/file-png.png" class="media-object"
					style="width: 100px" />
				<h3>image.png</h3>
			</div>
		</div>

		<div class="row"></div>
	</div>

	<div class="container ZipViewerBackground">
		<nav class="navbar navbar-default ">
			<!-- phantom markup.. -->
		</nav>
		<div class="row">
			<div class="col-xs-2 ">file Tree Zone</div>
			<div class="col-xs-10">file List Zone</div>
		</div>
	</div>
	<div class="container"></div>
</body>
</html>