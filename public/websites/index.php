<?php include 'header.php'; ?>
	<body data-spy="scroll" data-offset="0" data-target=".navbar">

		<!-- Fixed navbar -->
		<div class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="/"><b >Nodex</b></a>
				</div>

				<div class="navbar-collapse collapse pull-right">
					<ul class="nav navbar-nav cl-effect-13">
						<li><a href="#home" class="smoothScroll">Inicio</a></li>
						<li><a href="#features" class="smoothScroll">Características</a></li>
						<li><a href="#pricing" class="smoothScroll">Precios</a></li>
						<li><a href="#contact" class="smoothScroll">Contáctanos</a></li>
					</ul>
					
				</div><!--/nav-collapse -->
			</div><!-- /container -->
		</div><!-- /fixed-navbar -->





		<!-- Header Wrap -->
		<section id="home" name="home"></section>
		<div class="headerwrap">
			<div class="container">
				<div class="row text-center">
					<div class="col-lg-12">
						<h1>Mucho más que un sitio web</h1>
						
						<br>
					</div>

					<div class="col-lg-2 hidden-xs hidden-sm hidden-md">
						<h5>Personaliza tu sitio</h5>
						<p>Sube textos, imágenes y videos.</p>
						<img src="assets/img/arrow-left.png" alt="">
					</div>
					<div class="col-lg-8">
						<img class="img-responsive" src="assets/img/app-bg.png" alt="">
						<!--<h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
						<a href="#features" type="submit" class="btn btn-lg btn-theme smoothScroll">LEARN MORE</a>-->
					</div>
					<div class="col-lg-2 hidden-xs hidden-sm hidden-md">
						<br>
						<img class="pad-top" src="assets/img/arrow-right.png" alt="">
						<h5>Revisa las visitas que has tenido</h5>
						<h5>Vende productos a través de tu página</h5>
					</div>
				</div>
			</div> <!-- /container -->
		</div><!-- /headerwrap -->


		<!-- Intro Wrap -->
		<div class="intro">
			<div class="container">
				<div class="row text-center">
					<h2>¡Lleva a tu negocio a un Nuevo Nivel!</h2>
					<hr>
					<br>
					<br>
					<div class="col-lg-3">
						<i class="fa fa-cog fa-spin fa-5x" style="color:#ea3a3a"></i>
						<h3>Panel de control</h3>
						<p>Administra todo el contenido de tu página de manera muy sencilla</p>
					</div>
					<div class="col-lg-3">
						<licon class="li_banknote faa-float animated"></licon>
						<h3>Accesible</h3>
						<p>No importa si tu negocio es grande o pequeño, tenemos precios que se ajustan a tu proyecto.</p>
					</div>
					<div class="col-lg-3">
						<i class="fa fa-shopping-cart fa-5x   faa-passing animated" style="color:#ea3a3a"></i>
						<h3>Tienda en linea</h3>
						<p>Tu página debe generar ingresos, tenemos las herramientas necesarias para ello.</p>
					</div>
					<div class="col-lg-3">
						<i class="fa fa-thumbs-o-up fa-5x faa-bounce animated" style="color:#ea3a3a"></i>
						<h3>Fácil de usar</h3>
						<p>Tan fácil como administrar una página de Facebook... pero mucho más potente.</p>
					</div>
				</div>
				<br>
				<hr>
				<div class="text-center">
					<h2>¡Inicia con una prueba gratuita!</h2>
					<br>
					<a href="http://panel.nodex.mx/auth/facebook" class="btn btn-lg btn-primary" style="padding:20px;"> Regístrate GRATIS con Facebook</a><br>
					<h3>Crear tu página te tomará tan solo unos minutos</h3>
					<div class="fb-share-button btn btn-default btn-lg" data-href="http://nodex.mx" data-width="100%"></div>
				</div>
				
			</div> <!-- /container -->
		</div><!-- /introwrap -->












		<!-- Features Wrap -->
		<section id="features" name="features"></section>
		<div class="featureswrap">
			<div class="container">
				<div class="row">
					<h2 class="text-center">Características</h2>
					<hr>
					<br>
					<br>
					<div class="col-lg-6">
						<img class="img-responsive left" src="assets/img/mobile.png" alt="">
					</div>

					<div class="col-lg-6">
						<br>
						<!-- Accordion -->
						<div class="accordion ac" id="accordion2">

							<div class="accordion-group active">
								<div class="accordion-heading">
									<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
									<i class="fa fa-flash"></i> Crea tu página en minutos
									</a>
								</div>
								<div id="collapseTwo" class="accordion-body collapse in">
									<div class="accordion-inner">
									<p>Es muy fácil empezar a usar NODEX, nos esmeramos mucho en crear una herramienta que sea fácil de usar para todo el mundo: tanto para empresarios como para diseñadores.</p>
									</div><!-- /accordion-inner -->
								</div><!-- /collapse -->
							</div><!-- /accordion-group -->
							<br>

							<div class="accordion-group active">
								<div class="accordion-heading">
									<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
									<i class="fa fa-phone"></i> Compatible con celulares
									</a>
								</div><!-- /accordion-heading -->
								<div id="collapseOne" class="accordion-body collapse in">
									<div class="accordion-inner">
									<p>Cada vez más personas acceden a las páginas web a través de su celular, por ello nos preocupamos porque tu página sea compatible con todo tipo de smartphones.</p>
									</div><!-- /accordion-inner -->
								</div><!-- /collapse -->
							</div><!-- /accordion-group -->
							<div class="accordion-group active">
								<div class="accordion-heading">
									<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
									<i class="fa fa-clock-o"></i> Cambios en tiempo real
									</a>
								</div><!-- /accordion-heading -->
								<div id="collapseOne" class="accordion-body collapse in">
									<div class="accordion-inner">
									<p>Modifica o agrega información a tu página; todo se hace al instante.</p>
									</div><!-- /accordion-inner -->
								</div><!-- /collapse -->
							</div><!-- /accordion-group -->
							<br>


							<div class="accordion-group active">
								<div class="accordion-heading">
									<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
									<i class="fa fa-bar-chart-o"></i> Reportes de tu página
									</a>
								</div>
								<div id="collapseThree" class="accordion-body collapse in">
									<div class="accordion-inner">
									<p>Es indispensable saber si tu página está cumpliendo con su objetivo, por ello te facilitamos los reportes necesarios para que sepas cuánta gente visita tu sitio, desde dónde lo hacen y otros datos importantes.</p>
									</div><!-- /accordion-inner -->
								</div><!-- /collapse -->
							</div><!-- /accordion-group -->
							<br>

						</div><!-- /accordion -->
						<a href="faqs.php" class="btn btn-lg btn-danger" align="center">Preguntas frecuentes</a>
					</div>
				</div><!-- /row -->

				
				<br><br><br>
				<div class="row">
					<h2 class="text-center">Genera ingresos</h2>
					<hr><br><br>
					<div class="col-lg-6">
						<br><br>
						<h4><i class="fa fa-shopping-cart"></i> Tienda en linea</h4>
						<p>Muestra al mundo los <strong>productos o servicios</strong> de tu negocio, Nodex te permite poner un catálogo en tu página web sin ningún costo adicional.</p>
						<h4><i class="fa fa-share"></i> Difusión</h4>
						<p>A veces las páginas necesitan un empujón para generar más visitas: <strong>Nosotros te damos ese empujón</strong> promoviendo tu página web en nuestra página oficial y otras redes.</p>						
						<h4><i class="fa fa-bullhorn"></i> Publicidad</h4>
						<p>¿Quieres generar ingresos adicionales? Podemos poner anuncios en tu página que te generen una remuneración.</p>
						<br><br>
					</div>

					<div class="col-lg-6">
						<img class="img-responsive right" src="assets/img/tablet.png" alt="">
					</div>
				</div>
				<br>
				<br>
				<br>
			</div><!-- /container -->
		</div><!-- /featureswrap -->


		






		<!-- Pricing Section -->
		<section id="pricing" name="pricing"></section>
		<div class="pricingwrap">
			<div class="container text-center">
				<br>
				<h2>Selecciona tu plan y comienza ¡Hoy mismo!</h2>
				<hr><br><br>
				<div class="row">


					<div class="col-xs-12 col-md-4">
						<div class="panel panel-custom">
							<div class="panel-heading">
								<h3 class="panel-title">Gratuito</h3>
							</div>
							<div class="panel-body">
								<div class="the-price">
									<h2>$0 <span class="subscript"> MXN /anuales</span></h2>
									<small>Cambia de plan cuando lo desees</small>
									
								</div>
								<table class="table">
									<tr>
										<td><h4>20</h4> Imágenes <i class="fa fa-picture-o fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><h4>0</h4> Cuentas de correo <i class="fa fa-envelope-o fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><h4>5</h4> Productos <i class="fa fa-briefcase fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Soporte técnico</td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Redes sociales</td>
									</tr>
									<tr>
										<td><fa class="fa fa-times red fa-2x pull-left"></fa> Dominio .com</td>
									</tr>
									<tr>
										<td><fa class="fa fa-times red fa-2x pull-left"></fa> Reportes mensuales</td>
									</tr>
									<tr>
										<td><fa class="fa fa-times red fa-2x pull-left"></fa> Asesoría presencial</td>
									</tr>																		
								</table>
							</div>
							<div class="panel-footer">
								<!-- <a href="#" class="btn btn-theme" role="button">Iniciar ahora!</a> -->
							</div>
						</div>
					</div>

					<div class="col-xs-12 col-md-4">
						<div class="panel panel-custom">
							<div class="panel-heading">
								<h3 class="panel-title">Estándar</h3>
							</div>
							<div class="panel-body">
								<div class="the-price">
									<h2>$650 <span class="subscript"> MXN /anuales</span></h2>
									<small>Puedes pagar semestralmente $380</small>
								</div>
								<table class="table">
									<tr>
										<td><h4>100</h4> Imágenes <i class="fa fa-picture-o fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><h4>5</h4> Cuentas de correo <i class="fa fa-envelope-o fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><h4>20</h4> Productos <i class="fa fa-briefcase fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Soporte técnico</td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Redes sociales</td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Dominio .com</td>
									</tr>		
									<tr>
										<td><fa class="fa fa-times red fa-2x pull-left"></fa> Reportes mensuales</td>
									</tr>
									<tr>
										<td><fa class="fa fa-times red fa-2x pull-left"></fa> Asesoría presencial</td>
									</tr>																		
								</table>
							</div>
							<div class="panel-footer">
								<!-- <a href="#" class="btn btn-theme" role="button">Iniciar ahora!</a> -->
							</div>
						</div>
					</div>

					<div class="col-xs-12 col-md-4">
						<div class="panel panel-custom">
							<div class="panel-heading">
								<h3 class="panel-title">Premium</h3>
							</div>
							<div class="panel-body">
								<div class="the-price">
									<h2>$185 <span class="subscript">MXN /mes</span></h2>
									<small>Puedes pagar semestralmente $950</small>
								</div>
								<table class="table">
									<tr>
										<td><h4>Ilimitadas</h4> Imágenes <i class="fa fa-picture-o fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><h4>Ilimitadas</h4> Cuentas de correo <i class="fa fa-envelope-o fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><h4>Ilimitados</h4> Productos <i class="fa fa-briefcase fa-2x pull-left"></i></td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Soporte técnico </td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Redes sociales</td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Dominio .com </td>
									</tr>		
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Reportes mensuales</td>
									</tr>
									<tr>
										<td><fa class="fa fa-check-square green fa-2x pull-left"></fa> Asesoría presencial</td>
									</tr>																		
								</table>
							</div>
							<div class="panel-footer">
								<!-- <a href="#" class="btn btn-theme" role="button">Iniciar ahora!</a> -->
							</div>
						</div>
					</div>


				
				</div><!-- /row -->
				<hr>
				<div class="text-center">
					<h2>¡Inicia con una prueba gratuita!</h2>
					<br>
					<a href="http://panel.nodex.mx/auth/facebook" class="btn btn-lg btn-success faa-pulse animated" style="padding:20px;">Empezar ahora</a><br>
					<h3>Si necesitas un plan más grande o más pequeño envíanos un mensaje, con gusto crearemos un paquete que se ajuste a tus necesidades</h3>
					<p class="lead">
						¿Conoces a alguien a quien le pueda interesar?
						<div class="fb-share-button btn btn-default btn-lg" data-href="http://nodex.mx" data-width="100%"></div>
					</p>
				</div>
			</div><!-- /container -->
		</div><!-- /pricingwrap -->



<?php include 'footer.php'; ?>