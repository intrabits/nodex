<section class="wrap">
            <div class="container">
                <div class="row">                    
                    <?php if (isset($pagina['pagina_nosotros'])): ?>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="well blog-post">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <?php if ($pagina['pagina_portada']==''): ?>
                                    <div class="image">
                                        <img src="http://placehold.it/1200x400" alt="">
                                    </div>    
                                    <?php endif ?>                                    
                                    <?php if ($pagina['pagina_portada']): ?>
                                    <div class="image">
                                        <?php if (strpos($pagina['pagina_portada'],'http') !== false) { ?>
                                        <img src="<?=$pagina['pagina_portada']?> " width="100%">
                                        <?php }else{ ?>
                                        <img src="<?=$base.'paginas/'.$pagina['pagina_portada']?> " fromchangewidth="100%">
                                        <?php } ?>
                                    </div>    
                                    <?php endif ?>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                                    <div class="blog-details">
                                        <h2>
                                            Acerca de                                            
                                        </h2>
                                        <hr />
                                        <?=$pagina['pagina_nosotros']?>
                                        <?php if ($pagina['pagina_nosotros']==''): ?>
                                        <p class="lead">Aún no hay información aquí... pero muy pronto actualizaremos esta sección</p>
                                        <p class="lead">Mantente informado dejando un mensaje en nuestro formulario de contacto:</p>
                                        <p align="center"><a href="?p=contacto" class="btn btn-primary">Contacto</a></p>
                                        <?php endif ?>                                    
                                    </div>
                                </div>
                                
                                  
                            </div>
                        </div>
                    </div>    
                    <?php endif ?>
                    
                </div>
            </div>
        </section>
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