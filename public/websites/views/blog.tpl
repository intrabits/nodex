<section class="wrap">
            <div class="container">
            	<!-- <ol class="breadcrumb">
					<li><a href="#">Example Pages</a></li>
					<li><a href="#">Blog</a></li>
					<li><a href="#">Blog</a></li>
					<li class="pull-right"><a href="" class="text-muted"><i class="fa fa-refresh"></i></a></li>
				</ol> -->
                <div class="row">
                    <?php if (isset($publicaciones)): ?>
                    <?php foreach ($publicaciones as $p): ?>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="well blog">
                            <a href="?p=publicacion&id=<?=$p['publicacion_id']?> ">
                                <div class="date <?php echo $bootstrap_class[array_rand($bootstrap_class)]; ?>">
                                    <span class="blog-date"><?=date("M",strtotime($p['publicacion_fecha']));?> </span>
                                    <span class="blog-number"><?php echo date("d",strtotime($p['publicacion_fecha'])); ?></span>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <div class="image">
                                            <?php if (isset($p['publicacion_banner'])){ ?>
                                            <img src="<?=$base.'paginas/'.$p['publicacion_banner']?>" alt="<?=$p['publicacion_titulo']?>">
                                            <?php }else{ ?>
                                            <img src="http://placehold.it/1000x300" alt="">
                                            <?php } ?>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                        <div class="blog-details">
                                            <br>
                                            <h2><?=$p['publicacion_titulo']?></h2>
                                            <p>
                                                <?=strip_tags($p['publicacion_resumen'])?>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <?php endforeach ?>
                    <?php endif ?>
                    <?php if (count($publicaciones)<1): ?>
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
                                            <h2>Ops! aún no hay publicaciones</h2>
                                            <p>
                                                ¿Qué te gustaría leer sobre este negocio? Envíales un mensaje para que ellos se enteren
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
        </section>
        <script type="text/javascript">$(document).bind("mobileinit", function(){$.extend(  $.mobile , {autoInitializePage: false})});</script>
        <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        <script src="<?=$base?>static/js/bootstrap.min.js"></script>
        <script src="<?=$base?>static/js/jquery.colorbox.js"></script>
        <script src="<?=$base?>static/js/jquery.photoset-grid.min.js"></script>
        <script src="<?=$base?>static/js/leftmenu.js"></script>
        <script src="<?=$base?>static/js/rightmenu.js"></script>
        <script src="<?=$base?>static/js/topmenu.js"></script>
        <script src="<?=$base?>static/js/theme.js"></script>
        <script>blogpost();</script>
    </body>
</html>
