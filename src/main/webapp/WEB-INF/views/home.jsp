<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<html>
<head>
<title>Compress File Viewer</title>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css"  href="/static/dist/css/bootstrap.css">
<link rel="stylesheet" href="/static/dist/themes/proton/style.min.css" />

<script src="/static/bundle/jquery-3.2.1.js"></script>

<script src="/static/bundle/main.js?v=sdasdddf59"></script>
<script src="/static/dist/js/bootstrap.js"></script>
<script src="/static/dist/jstree.min.js"></script>
<style>

</style>
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
		<div class="jumbotron" id="dropZone">
			<h1 style="color: 'gray'">Drop Here</h1>
		</div>
	</div>

	<div class="container" id="fileList">
	<!-- tpl/FileList.html -->

	</div>

	<div id="ZipViewerBackground" class="displayBlock">
		<div class="row ">
			<div class="col-xs-12" id="zipFileTab"><div id="zipFilePath"></div><button type="button" class="floatRight btn btn-primary" id="zipFileClose"><span class="glyphicon glyphicon-remove"></span></button></div>
		</div>
		<div class="row height">
			<div class="col-xs-3" id="zipFileTree">
				
			</div>
			<div class="col-xs-9" id="zipFileList">
			<!-- template engine 적용해야 하는 부분. -->
				
			</div>
		</div>
	</div>

	<div class="container">
		<div class="modal fade" id="zipFileModal" role="dialog">
			<!-- Modal content-->
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Zip File Viewer</h4>
					</div>
					<div class="modal-body">
						<p></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>

			</div>
		</div>
		<div class="modal fade" id="ErrorModal" role="dialog">
			<!-- Modal content-->
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Zip File Viewer</h4>
					</div>
					<div class="modal-body">
						<p></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>

			</div>
		</div>
	</div>
		
</body>
</html>
