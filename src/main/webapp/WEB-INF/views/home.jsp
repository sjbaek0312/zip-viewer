<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<html>
<head>
<title>Compress File Viewer</title>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css"  href="/static/dist/css/bootstrap.css">
<link rel="stylesheet" href="/static/dist/themes/proton/style.min.css" />

<script src="/static/bundle/jquery-3.2.1.js"></script>

<script src="/static/bundle/main.js?v=sdfsd959"></script>
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
	</div>

	<div id="ZipViewerBackground" class="displayBlock">
		<div class="row ">
			<div class="col-xs-12" id="zipFileTab"><button type="button" class="floatRight btn btn-primary" id="zipFileClose"><span class="glyphicon glyphicon-remove"></span></button></div>
		</div>
		<div class="row height">
			<div class="col-xs-3" id="zipFileTree">
				
			</div>
			<div class="col-xs-9" id="zipFileList">
				<table class="table table-hover">
					<thead>
						<tr>
						<th></th><th>Name</th><th>Size</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						<tr>
							<td class="col-xs-2"><img src="/static/img/file-txt.png"
								width="20" /></td>
							<td class="col-xs-7">fileName</td>
							<td class="col-xs-3">fileSize</td>
						</tr>
						
					</tbody>
				</table>
				
			</div>
		</div>
	</div>


</body>
</html>
