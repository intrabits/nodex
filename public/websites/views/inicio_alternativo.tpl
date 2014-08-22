<style type="text/css">
#portada{
    z-index: -1000;
}
#action{
    z-index: 90;
    margin-left: 35%;    
    padding-left: 20px;
    padding-right: 20px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}
#action a{
    color: #fff;    
}
.TextoEntrada{
    margin-top: 20%;
    z-index: 90;
    position: absolute;
    padding: 100px;    
    text-align: center;
    color: #fff;    
    text-shadow: 2px 2px #333;

}
.wrap{
    z-index: 99;
}
</style>


<script src="http://ajax.googleapis.com/ajax/libs/swfobject/2.1/swfobject.js"></script>
<script type="text/javascript" charset="utf-8" src="//cdn.jsdelivr.net/jquery.tubular/1.0.1/jquery.tubular.1.0.js"></script> 

<script type="text/javascript">
$().ready(function() {
        $('body').tubular({
        videoId: '<?=$pagina['pagina_video_fondo']?>',        
        start: 30
        }); // where idOfYourVideo is the YouTube ID.

});

$("#action").click(function() {
    alert('noo');
    $('html, body').animate({
        scrollTop: $("#bienvenida").offset().top
    }, 100);
});
</script>
        <?php if ($pagina['pagina_portada']): ?>                    
            <div style="height:600px;min-height:250px;width:100%" id="portada">
                <!-- 
                <?php if (strpos($pagina['pagina_portada'],'http') !== false) { ?>
                <img src="<?=$pagina['pagina_portada']?> " width="100%">
                <?php }else{ ?>
                <img src="<?=$base.'paginas/'.$pagina['pagina_portada']?> " width="100%">
                <?php } ?>
                
                <br> -->
                <div class="TextoEntrada">
                    <h2><?=$pagina['pagina_descripcion']?> </h2>
                    <?php if ($pagina['pagina_conversion']): ?>
                    <a class="btn btn-success btn-lg scroll" id="action" href="<?=$pagina['pagina_conversion']?> "> Leer más <i class="fa fa-play" style="color:#fff"></i></a>
                    <?php endif ?>                
                </div>
                
                
            <!-- <iframe frameborder="0" height="100%" width="100%" src="https://www.youtube.com/embed/DSLgAsrcpGQ?autoplay=1&controls=0&loop=1&rel=0&showinfo=0&autohide=1&wmode=transparent&hd=1"></iframe> -->
            </div>                    
        <?php endif ?>  
        <section class="wrap">            
            <div class="container">    

                <div class="row">

                         
                    
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"  id="bienvenida">
                        <?php if ($pagina['pagina_descripcion_larga']): ?>
                        <div class="well">
                             <?=$pagina['pagina_descripcion_larga']?> 
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
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <?php if (count($publicaciones)>0): ?>
                        <div class="well">
                            <h3>Últimas publicaciones</h3>
                            <hr>
                            <?php foreach ($publicaciones as $p): ?>
                            <div class="row">

                                <div class="col-xs-4 col-sm-3 col-md-3 col-lg-3">
                                    <a href="?p=publicacion&id=<?=$p['publicacion_id']?>">
                                        <img class="img-responsive" src="http://placehold.it/150/<?=$colores[array_rand($colores)]; ?>&text=Leer más">
                                    </a>                                    
                                </div>
                                <div class="col-xs-8 col-sm-9 col-md-9 col-lg-9">
                                    <p class="text-muted"> <?=$p['publicacion_titulo']?>  </p>
                                    <p class="text-muted text-right"><small>- <i class="fa fa-clock-o"></i>  <?=$p['publicacion_fecha']?> </small></p>
                                </div>
                            </div>
                            <hr>    
                            <?php endforeach ?>                     
                        </div>    
                        <?php endif ?>
                        <?php if (count($publicaciones)>5): ?>
                            <a href="?p=publicaciones" class="btn btn-default">Ver todas las publicacioes</a>
                        <?php endif ?>
<!-- 
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
                         -->
                                            
                    </div>
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
        </section>

        
        <script type="text/javascript">$(document).bind("mobileinit", function(){$.extend(  $.mobile , {autoInitializePage: false})});</script>
        <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        <script src="<?=$base?>static/js/humane.min.js"></script>        
        <script src="<?=$base?>static/js/bic_calendar.min.js"></script>
        <script src="<?=$base?>static/js/skycons.js"></script>
        <script src="<?=$base?>static/js/jquery.sparkline.js"></script>
        <script src="<?=$base?>static/js/leftmenu.js"></script>                        
        <script src="<?=$base?>static/js/theme.js"></script>
        <script src="<?=$base?>static/js/script.js"></script>
        <script>index();</script>
        <style type="text/css">
        </style>
    </body>
</html>