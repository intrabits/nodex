        <section class="wrap">
        	<div id="map" class="backmap"></div>
            <div class="container">            	
            	<div class="row">
            		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		                <div class="">
                            <?php if (isset($pagina['pagina_mapa'])): ?>
                            <div class="row">
                                <div class="col-md-12">                                    
                                        <?=$pagina['pagina_mapa']?>                                                                     
                                </div>
                            </div>
                            <?php endif ?>
                            <div class="row">
                                <div class="col-md-4 well">
                                    <h3>Contacto</h3>
                                    <hr>
                                    <?php if ($pagina['pagina_direccion']): ?>
                                    <h4>Dirección
                                        <i class="fa fa-map-marker pull-right"></i>
                                    </h4>
                                    <?=$pagina['pagina_direccion']?>     
                                    <hr>
                                    <?php endif ?>

                                    <?php if ($pagina['pagina_telefono']): ?>
                                    <h4>Teléono
                                        <i class="fa fa-phone pull-right"></i>
                                    </h4>
                                    <?=$pagina['pagina_telefono']?>
                                    <hr> 
                                    <?php endif ?>

                                    <?php if ($pagina['pagina_email']): ?>
                                    <h4>Correo electrónico
                                        <i class="fa fa-envelope-o pull-right"></i>
                                    </h4>
                                    <?php
                                    $correo = explode('@', $pagina['pagina_email'])
                                    ?>    
                                    <script type="text/javascript">
                                      document.write('<?=$correo[0]?>' + '@' +'<?=$correo[1]?>')
                                    </script> 
                                    <hr>
                                    <?php endif ?>
                                    
                                </div>
                                <div class="col-md-1"></div>
                                <div class="col-md-7 well">
                                    <div class="">
                                        <div class="social-icon">
                                            <?php if (isset($pagina['pagina_facebook'] )): ?>
                                            <?php if ($pagina['pagina_facebook']): ?>
                                            <a href="<?=$pagina['pagina_facebook']?>" class="btn"><i class="fa fa-facebook"></i> Facebook</a>
                                            <?php endif ?>
                                            <?php endif ?>

                                            <?php if (isset($pagina['pagina_twitter'] )): ?>
                                            <?php if ($pagina['pagina_twitter']): ?>
                                            <a href="<?=$pagina['pagina_twitter']?>" class="btn"><i class="fa fa-twitter"></i> Twitter</a>    
                                            <?php endif ?>
                                            <?php endif ?>

                                            <?php if (isset($pagina['pagina_google'] )): ?>
                                            <?php if ($pagina['pagina_google']): ?>
                                            <a href="<?=$pagina['pagina_google']?>" class="btn"><i class="fa fa-google-plus"></i> Google</a>    
                                            <?php endif ?>                                            
                                            <?php endif ?>

                                            <?php if (isset($pagina['pagina_instagram'] )): ?>
                                            <?php if ($pagina['pagina_instagram']): ?>
                                            <a href="<?=$pagina['pagina_twitter']?>" class="btn"><i class="fa fa-instagram"></i> Instagram</a>
                                            <?php endif ?>                                        
                                            <?php endif ?>
                                            
                                            <?php if (isset($pagina['pagina_youtube'] )): ?>
                                            <?php if ($pagina['pagina_youtube']): ?>
                                            <a href="<?=$pagina['pagina_youtube']?>" class="btn"><i class="fa fa-youtube"></i> Youtube</a>    
                                            <?php endif ?>                                            
                                            <?php endif ?>               
                                        </div>
                                    </div>
                                    <hr>
                                    <?php if (isset($mensaje)): ?>
                                        <p class="lead"><?=$mensaje?> </p>
                                    <?php endif ?>
                                    <div class="">
                                        <form method="POST" action="">
                                        <div class="form-group">
                                          <label for="inputEmail3" class="col-sm-4 control-label">Nombre</label>
                                          <div class="col-sm-8">
                                            <input type="text" class="form-control" id="nombre" name="autor">   
                                            <p class="help-block"></p>
                                          </div>
                                        </div>
                                        <div class="form-group">
                                          <label for="inputEmail3" class="col-sm-4 control-label">Asunto</label>
                                          <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="" name="asunto">   
                                            <p class="help-block"></p>
                                          </div>
                                        </div>  
                                        <div class="form-group">
                                          <label for="inputEmail3" class="col-sm-4 control-label">Correo</label>
                                          <div class="col-sm-8">
                                            <input type="text" class="form-control" name="correo">   
                                            <p class="help-block"></p>
                                          </div>
                                        </div>
                                        <div class="form-group">
                                          <label  class="col-sm-4 control-label">Mensaje</label>
                                          <div class="col-sm-8">
                                            <textarea style="width:100%;height:100px" name="mensaje"></textarea>
                                          </div>
                                        </div>
                                        <hr>
                                        <input type="submit" value="Enviar" class="btn btn-primary pull-right" name="submit_form"> 
                                        </form>
                                    </div>
                                </div>
                            </div>                           
						    
		                </div>
		            </div>
            	</div>
            </div>
        </section>
        <script type="text/javascript">
        $('#nombre').focus();
        </script>
        <script type="text/javascript">$(document).bind("mobileinit", function(){$.extend(  $.mobile , {autoInitializePage: false})});</script>
        <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        <script src="<?=$base?>static/js/bootstrap.min.js"></script>
        <script src="<?=$base?>static/js/jquery.colorbox.js"></script>
        <script src="<?=$base?>static/js/jquery.photoset-grid.min.js"></script>
        <script src="<?=$base?>static/js/leftmenu.js"></script>
        <script src="<?=$base?>static/js/rightmenu.js"></script>
        <script src="<?=$base?>static/js/topmenu.js"></script>
        <script src="<?=$base?>static/js/topmenufixed.js"></script>
        <script src="<?=$base?>static/js/theme.js"></script>
        <script src="<?=$base?>static/js/script.js"></script>
        <script>blogpost();</script>
    </body>
</html>