<style type="text/css">

</style>
        <section class="wrap">
            <div class="container">
            	<ul class="list-inline">
                    <li><a href="?p=galeria" class="btn btn-primary">Ver todas</a></li>
                    <?php foreach ($galerias as $g): ?>
                    <li><a href="?p=galeria&id=<?=$g['galeria_id']?>" class="btn btn-default"> <?=$g['galeria_nombre']?> </a></li>
                    <?php endforeach ?>
					<li class="pull-right"><a href="" class="text-muted"><i class="fa fa-refresh"></i></a></li>
				</ul>
            	<div class="row">
            		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		                <div>
			                <div class="photoset-grid-lightbox" data-layout="32323" style="visibility: hidden;">
                                <?php if (isset($imagenes)): ?>
                                <?php foreach ($imagenes as $i): ?>
                                <img rel="gallery"  data-highres="<?=$base."/paginas/".$i['imagen_url']?>" class="lazy" data-original="<?=$base."/paginas/".$i['imagen_url']?>" alt="<?=$i['imagen_titulo']?> " />
                                <?php endforeach ?>
                                <?php endif ?>
			                </div>
		                </div>
                        <?php if (!isset($imagenes)): ?>
                            <?php foreach ($galerias as $g): ?>
                                <div class="col-md-4">
                                    <div class="thumbnail">
                                        <div class="bw">
                                        <a href="?p=galeria&id=<?=$g['galeria_id']?> ">
                                          <img src="<?=$base.'paginas/'.$g['foto']?>">
                                        </a>
                                        </div>
                                        <div class="caption">
                                          <h3><?=$g['galeria_nombre']?> </h3>
                                          <p><?=$g['galeria_descripcion']?> </p>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach ?>
                        <?php endif ?>
                    <?php if (count($galerias)<1): ?>
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
                                            <h2>Ops! aún no hay galerías</h2>
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
        <script src="<?=$base?>static/js/theme.js"></script>
        <script src="<?=$base?>static/js/script.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min.js"></script>
        <script>photogrid();</script>
        <script type="text/javascript">
        $("img.lazy").lazyload({
            effect : "fadeIn"
        });
        </script>
    </body>
</html>
