<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html ng-app="app">
<head>
<meta charset="UTF-8">
<title>Ponto Dos Games</title>

<link href='https://fonts.googleapis.com/css?family=Arimo:700'
	rel='stylesheet' type='text/css'>
<script src="js/libs/angular.js"></script>
<script src="js/libs/angular-route.js"></script>
<script src="js/libs/angular-ui-router.js"></script>
<script src="js/libs/angular-animate.min.js"></script>
<script src="js/libs/ui-bootstrap-tpls-0.14.3.min.js"></script>

<script src="js/app.js"></script>

<script src="js/services/maquinaService.js"></script>
<script src="js/services/produtoService.js"></script>
<script src="js/services/valorHoraService.js"></script>
<script src="js/services/tempoService.js"></script>

<script src="js/controllers/controller.js"></script>


<script src="js/config/config.js"></script>

<script src="js/libs/jquery-2.2.0.min.js"></script>
<script src="js/libs/dirPagination.js"></script>

<script src="js/libs/bootstrap.js"></script>

<link rel="stylesheet" type="text/css" href="css/styleReset.css" />

<link rel="stylesheet" type="text/css"
	href="css/bootstrap/bootstrap.css" />
<link rel="stylesheet" type="text/css"
	href="css/bootstrap/bootstrap-theme.css" />

<link rel="stylesheet" type="text/css" href="css/style.css" />


 <base href="/SCF/"> 

</head>
<body>
	<ui-view ng-class="{carregar:loadingObj}"></ui-view>
</body>
</html>