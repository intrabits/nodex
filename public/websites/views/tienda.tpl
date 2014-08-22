<style type="text/css">
.product-holder {
    width:100%;
    height:150px;
    position:relative;
    overflow:hidden;
    }

.product-holder img {
    width: 100%;
    position:absolute; display:block;
    top:0;
    left:0; 
    }
</style>
        <section class="wrap">
            <div class="container">                
            	
            	<div class="row">
            		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">		                
                        <?php if (isset($productos)): ?>
                            <?php foreach ($productos as $p): ?>
                                <div class="col-md-4">
                                    <div class="thumbnail">
                                        <h3 align="center"><?=$p['producto_nombre']?> </h3>                                        
                                        <a href="?p=tienda&id=<?=$p['producto_id']?>">     
                                        <div class="product-holder">
                                            <img alt="" src="<?=$base.'paginas/'.$p['producto_foto']?>">                                        
                                        </div>                                                                               
                                        </a>
                                        <div class="caption">                                            
                                            <hr>
                                            <p class="lead">$ <?=$p['producto_precio']?> </p>
                                            <a href="?p=tienda&id=<?=$p['producto_id']?>" class="btn btn-danger">Detalles</a>
                                            <div class="fb-share-button btn btn-default" style="color:#fff" data-href="<?=$url?> "></div>
                                        </div>
                                    </div>    
                                </div>  
                            <?php endforeach ?>    
                        <?php endif ?>
                    <?php if (count($productos)<1): ?>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="well blog">                                                            
                                <div class="row">
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <div class="image">
                                            <img src="http://freedesignfile.com/upload/2013/04/room-1.jpg" alt="">
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                        <div class="blog-details">
                                            <h2>Ops! aún no hay productos/servicios</h2>
                                            <p>
                                                Quédate al pendiente de las actualizaciones enviandonos un mensaje
                                            </p>
                                            <a href="?p=contacto" class="btn btn-success">Contacto</a>
                                        </div>
                                    </div>
                                </div>                            
                        </div>
                    </div>     
                    <?php endif ?>
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