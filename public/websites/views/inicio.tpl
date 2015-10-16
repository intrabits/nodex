
<link href="http://nodex.mx/styles/hover.css" rel="stylesheet">
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
  .air{
    height: 100px
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
                      <ul class="nav nav-pills nav-justified" style="background-color:rgba(255,255,255,0)">
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




                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="bienvenida">
                        <?php if ($pagina['pagina_descripcion_larga']): ?>
                        <div class="well">
                             <?=$pagina['pagina_descripcion_larga']?>
                        </div>
                        <div class="air"></div>
                        <?php endif ?>
                    </div>




                    <?php if (count($publicaciones)>0): ?>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 well">
                        <h3 align="center">Últimas publicaciones</h3>
                        <hr>
                        <div class="row">
                        <?php foreach ($publicaciones as $p): ?>

                          <div class="col-md-4">
                            <div class="view view-tenth">
                                <img src="http://nodex.mx/paginas/<?=$p['publicacion_imagen']?>" />
                                <div class="mask" onclick="window.location='?p=publicacion&id=<?=$p['publicacion_id']?>'">
                                    <h2><?=$p['publicacion_titulo']?><br></h2>


                                    <a href="/?p=publicacion&id=<?=$p['publicacion_id']?>"  class="info">Leer más</a>
                                    <!-- <a href="/?p=publicacion&id=<?=$p['publicacion_id']?>"  class="btn btn-default">Leer más</a> -->
                                </div>
                            </div>
                          </div>

                        <?php endforeach ?>
                        </div>
                        <?php if (count($publicaciones)>3): ?>
                          <p align="center">
                            <a href="/?p=blog" class="btn btn-info" align="right">Ver todas las publicaciones</a>
                          </p>
                        <?php endif ?>
                    </div>
                    <div class="air"></div>
                    <?php endif ?>







                </div>




                    <div class="social-icon">
                        <?php if (isset($pagina['pagina_facebook'] )): ?>
                          <?php if ($pagina['pagina_facebook']): ?>
                          <a href="<?=$pagina['pagina_facebook']?>" class="btn"><i class="fa fa-facebook"></i> Facebook</a>
                          <?php endif ?>
                          <?php endif ?>

                          <?php if (isset($pagina['pagina_twitter'] )): ?>
                          <a href="<?=$pagina['pagina_twitter']?>" class="btn"><i class="fa fa-twitter"></i> Twitter</a>

                          <?php endif ?>

                          <?php if (isset($pagina['pagina_google'] )): ?>

                          <a href="<?=$pagina['pagina_google']?>" class="btn"><i class="fa fa-google-plus"></i> Google</a>

                          <?php endif ?>

                          <?php if (isset($pagina['pagina_instagram'] )): ?>

                          <a href="<?=$pagina['pagina_twitter']?>" class="btn"><i class="fa fa-instagram"></i> Instagram</a>

                          <?php endif ?>

                          <?php if (isset($pagina['pagina_youtube'] )): ?>

                          <a href="<?=$pagina['pagina_youtube']?>" class="btn"><i class="fa fa-youtube"></i> Youtube</a>

                          <?php endif ?>
                    </div>


            </div>

            <!-- <?php if ($pagina['pagina_facebook']): ?>
            <div class="well">
                <div class="fb-like-box" data-href="<?=$pagina['pagina_facebook']?>" data-width="300px" data-colorscheme="light" data-show-faces="true" data-header="true" data-stream="true" data-show-border="false"></div>
            </div>
            <?php endif ?> -->

            <div class="air"></div>

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

        <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        <script src="<?=$base?>static/js/leftmenu.js"></script>
        <script src="<?=$base?>static/js/theme.js"></script>
        <script type="text/javascript">$(document).bind("mobileinit", function(){$.extend(  $.mobile , {autoInitializePage: false})});</script>

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
