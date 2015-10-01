<style type="text/css">
@media only screen and (max-device-width: 480px) {
    /* Put your iPhone 3g styles in here */
    #bienvenida img{
        width: 200px;
    }
}
  #myCarousel .nav a small {
    display:block;
  }
  #myCarousel .nav {
    background:#eee;
  }
  .publicacion-holder{
    width: 100%;
    height: 250px;
    background-image: url(http://nodex.mx/img/holder.png)
  }
</style>

        <section class="wrap">
            <div class="container">
                <div class="row">

                  <h1></h1>
                  <?php if (count($banners)>0): ?>

                  <div id="myCarousel" class="carousel slide" data-ride="carousel">

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                    <?php foreach ($banners as $key => $banner): ?>
                      <div class="item <?php if($i==0) echo 'active'?>">
                        <img src="<?=$base.'paginas/'.$banner['banner_img']?>" witdh="100%" style="width:100%">
                         <div class="carousel-caption">
                          <?php if ($banner['banner_texto']): ?>
                            <h2 style=" background:rgba(0,0,0,.6);color:#fff">
                              <a href="<?=$banner['banner_url']?>"><?=$banner['banner_texto']?></a>
                            </h2>
                          <?php endif ?>
                        </div>
                      </div>
                    <?php $i=1;endforeach ?>

                    </div><!-- End Carousel Inner -->
                    <?php if (count($banners)>1&&count($banners)<4): ?>
                      <ul class="nav nav-pills nav-justified">
                      <?php $j=0;foreach ($banners as $key => $banner): ?>
                        <li style="width:25%" data-target="#myCarousel" data-slide-to="<?=$j?>" <?php if($j==0) echo 'class="active"'?>>
                          <a href="#" style="color:#333"><?php
                        echo $BannerTitulo = $banner['banner_texto']!='' ? $banner['banner_texto'] : 'Banner';
                        ?></a></li>
                      <?php $j+=1;endforeach ?>
                      </ul>
                    <?php endif ?>
                  </div><!-- End Carousel -->

                  <?php endif ?>

                  <?php /*
                  <?php if ($pagina['pagina_portada']): ?>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div class="well img-holder" style="height:auto;min-height:250px;width:100%">
                          <?php if (strpos($pagina['pagina_portada'],'http') !== false) { ?>
                          <img src="<?=$pagina['pagina_portada']?> " width="100%">
                          <?php }else{ ?>
                          <img src="<?=$base.'paginas/'.$pagina['pagina_portada']?> " width="100%">
                          <?php } ?>

                          <br>
                      </div>
                  </div>
                  <?php endif ?>
                  */ ?>



                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="bienvenida">
                        <?php if ($pagina['pagina_descripcion_larga']): ?>
                        <div class="well">
                             <?=$pagina['pagina_descripcion_larga']?>
                        </div>
                        <?php endif ?>


                        <div class="well no-padding hidden">
                            <div id="cal"></div>
                        </div>
                        <?php if ($pagina['pagina_facebook']): ?>
                        <div class="well">
                            <div class="fb-like-box" data-href="<?=$pagina['pagina_facebook']?>" data-width="100%" data-colorscheme="light" data-show-faces="true" data-header="true" data-stream="true" data-show-border="false"></div>
                        </div>

                        <?php endif ?>
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

                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <?php if (count($publicaciones)>0): ?>
                        <div class="">
                            <h3 align="center">Últimas publicaciones</h3>
                            <hr>
                            <div class="row">
                            <?php foreach ($publicaciones as $p): ?>

                              <div class="col-md-4">
                                <div class="well well-sm" style="min-height:400px">

                                  <p class="text-muted">
                                    <a
                                      style="font-size:21px"
                                      href="?p=publicacion&id=<?=$p['publicacion_id']?>">
                                        <div class="publicacion-holder">
                                          <img class="img-responsive" src="http://nodex.mx/paginas/<?=$p['publicacion_imagen']?>">
                                        </div>
                                        <br>
                                        <?=$p['publicacion_titulo']?>
                                    </a>
                                  </p>
                                  <!-- <p class="text-muted text-right"><small>- <i class="fa fa-clock-o"></i>  <?=$p['publicacion_fecha']?> </small></p> -->
                                </div>
                              </div>

                            <?php endforeach ?>
                            </div>
                            <?php if (count($publicaciones)>3): ?>
                              <p align="center">
                                <a href="?p=publicacion" class="btn btn-info" align="right">Ver todas las publicaciones</a>
                              </p>
                            <?php endif ?>
                        </div>
                        <?php endif ?>


                        <?php if (isset($productos)): ?>
                        <div class="well hidden">
                            <h3>Últimas publicaciones</h3>
                            <hr>
                            <?php foreach ($publicaciones as $p): ?>
                            <div class="row">

                                <div class="col-xs-4 col-sm-3 col-md-3 col-lg-3">
                                    <a href="?p=publicacion&id=<?=$p['publicacion_id']?>">
                                        <img class="img-responsive" src="http://placehold.it/150/<?=$colores[array_rand($colores)]; ?>&text= <?=$p['publicacion_id']?> ">
                                    </a>
                                </div>
                                <div class="col-xs-8 col-sm-9 col-md-9 col-lg-9">
                                    <p class="text-muted"> <?=strip_tags($p['publicacion_resumen'])?>  </p>
                                    <p class="text-muted text-right"><small>- Admin | <i class="fa fa-clock-o"></i>  <?=$p['publicacion_fecha']?> </small></p>
                                </div>
                            </div>
                            <hr>
                            <?php endforeach ?>
                        </div>
                        <?php endif ?>

                    </div>
                </div>

                <footer class="text-center" style="margin-bottom:0px">
                    <div class="row">
                        <?php if ($pagina['pagina_direccion']): ?>
                        <div class="col-md-4">
                        <h4>Dirección
                            <i class="fa fa-map-marker pull-right fa-2x"></i>
                        </h4>

                        <?=$pagina['pagina_direccion']?>
                        <hr>
                        </div>
                        <?php endif ?>

                        <?php if ($pagina['pagina_telefono']): ?>
                        <div class="col-md-4">
                        <h4>Teléono
                            <i class="fa fa-phone pull-right fa-2x"></i>
                        </h4>
                        <?=$pagina['pagina_telefono']?>
                        <hr>
                        </div>
                        <?php endif ?>

                        <?php if ($pagina['pagina_email']): ?>
                        <div class="col-md-4">
                        <h4>Correo electrónico
                            <i class="fa fa-envelope-o pull-right fa-2x"></i>
                        </h4>
                        <?php
                        $correo = explode('@', $pagina['pagina_email'])
                        ?>
                        <script type="text/javascript">
                          document.write('<?=$correo[0]?>' + '@' +'<?=$correo[1]?>')
                        </script>
                        <hr>
                        </div>
                        <?php endif ?>
                    </div>
                </footer>
            </div>
        </section>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
        <script type="text/javascript">$(document).bind("mobileinit", function(){$.extend(  $.mobile , {autoInitializePage: false})});</script>
        <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        <script src="<?=$base?>static/js/leftmenu.js"></script>
        <script src="<?=$base?>static/js/theme.js"></script>

        <script>index();</script>
        <script charset="utf-8">
          $(document).ready( function() {
              $('#myCarousel').carousel({
              interval:   4000
            });
            //Set the carousel options
            $('#quote-carousel').carousel({
              pause: true,
              interval: 4000,
            });

            var clickEvent = false;
            $('#myCarousel').on('click', '.nav a', function() {
                clickEvent = true;
                $('.nav li').removeClass('active');
                $(this).parent().addClass('active');
            }).on('slid.bs.carousel', function(e) {
              if(!clickEvent) {
                var count = $('.nav').children().length -1;
                var current = $('.nav li.active');
                current.removeClass('active').next().addClass('active');
                var id = parseInt(current.data('slide-to'));
                if(count == id) {
                  $('.nav li').first().addClass('active');
                }
              }
              clickEvent = false;
            });
          });
        </script>
    </body>
</html>
