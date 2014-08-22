        <section class="wrap">
            <div class="container">                
                <ol class="breadcrumb">
                    <li><a href="?p=tienda">Tienda</a></li>                 
                    <li><a href="#"><?=$producto['producto_nombre']?> </a></li>
                    <li class="pull-right"><a href="" class="text-muted"><i class="fa fa-refresh"></i></a></li>
                </ol>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div>
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">                        
                        <img src="<?=$base.'paginas/'.$fotos[0]['imagen_url']?>" width="100%">
                    </div>
                    <div class="col-md-8">
                        <div class="well">
                            <h2><?=$producto['producto_nombre']?> </h2>
                            <hr>
                            <h3>Descripción del producto</h3>
                            <?=$producto['producto_descripcion']?> 
                            <hr>
                            <button class="btn btn-success btn-lg">Comprar</button>
                            <div class="fb-share-button btn btn-default btn-lg" style="color:#fff" data-href="<?=$url?> "></div>
                        </div>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="well">
                            <h3>Fotos</h3>
                            <hr>
                            <div class="photoset-grid-lightbox" data-layout="32323" >                            
                                <?php foreach ($fotos as $i): ?>
                                <img rel="gallery" src="<?=$base."/paginas/".$i['imagen_url']?>" data-highres="<?=$base."/paginas/".$i['imagen_url']?>" alt="<?=$i['imagen_titulo']?> " />
                                <?php endforeach ?>                                    
                            </div>
                        </div>                          
                    </div>
                    <div class="col-md-6">
                        <div class="well">
                            <h3>Opiniones</h3>
                            <div class="fb-comments" data-href="<?=$url?> " data-numposts="5" data-colorscheme="light" data-width="100%"></div>
                        </div>
                    </div>
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
        <script>photogrid();</script>   
    </body>
</html>