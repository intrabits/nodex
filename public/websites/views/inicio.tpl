<style type="text/css">
@media only screen and (max-device-width: 480px) {    
    /* Put your iPhone 3g styles in here */ 
    #bienvenida img{
        width: 200px;
    }
}
</style>
    
        <section class="wrap">
            <div class="container">                
                <div class="row">
                    <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
                        <a href="?p=publicacion">
                        <div class="well text-center">
                            <p align="center"><i class="fa fa-suitcase fa-2x text-muted"></i></p>
                            <span class="text-muted">Ver publicaciones</span>
                        </div>
                        </a>
                    </div>
                    <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
                        <a href="?p=galeria">
                        <div class="well text-center">
                            <p><i class="fa fa-picture-o fa-2x text-muted"></i></p>
                            <span class="text-muted">Ver imágenes</span>                           
                        </div>
                        </a>
                    </div>
                    <div class="hidden-xs col-sm-4 col-md-3 col-lg-3">
                        <a href="?p=contacto">
                        <div class="well text-center">
                            <p><i class="fa fa-envelope fa-2x text-muted"></i></p>
                            <span class="text-muted">Contacto </span>
                        </div>
                        </a>
                    </div>
                    <div class="hidden-xs col-sm-4 col-md-3 col-lg-3">
                        <a href="?p=contacto">
                        <div class="well text-center">
                            <p><i class="fa fa-facebook fa-2x text-muted"></i></p>
                            <?php if (isset($pagina['pagina_facebook'])){ ?>
                                <div class="fb-like" data-href="<?=$pagina['pagina_facebook']?>" data-layout="button_count" data-action="like" data-show-faces="true" data-share="false"></div>
                            <?php }else{ ?>                            
                                <div class="fb-like" data-href="http://facebook.com/intrabits.net" data-layout="button_count" data-action="like" data-show-faces="true" data-share="false"></div>
                            <?php } ?>                            
                        </div>
                        </a>
                    </div>
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
                    
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" id="bienvenida">
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
                        <div class="well hidden">
                            <div class="header">Chat <span class="pull-right muted"><small><i class="fa fa-user"></i> Chatting with user Stan Smith</small></span></div>
                            <div class="chat">
                                <div class="chat-right">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget viverra tortor.</p>
                                    <p class="pull-right muted"><small><i class="fa fa-time"></i> 2 days ago</small></p>
                                </div>
                                <div class="chat-left">
                                    <p>Ut interdum varius arcu at ultrices. Duis in dui sem.</p>
                                    <p class="pull-right muted"><small><i class="fa fa-time"></i> 2 days ago</small></p>
                                </div>
                                <div class="chat-right">
                                    <p>Vestibulum suscipit rutrum nunc. Donec est lacus, tempor id rutrum id, semper ac purus.</p>
                                    <p class="pull-right muted"><small><i class="fa fa-time"></i> 1 days ago</small></p>
                                </div>
                                <div class="chat-left">
                                    <p>Curabitur dictum, mi sed tempor facilisis, enim turpis varius tortor.</p>
                                    <p class="pull-right muted"><small><i class="fa fa-time"></i> 1 days ago</small></p>
                                </div>
                                <div class="chat-right">
                                    <p>Donec bibendum tristique ullamcorper. In hac habitasse platea dictumst.</p>
                                    <p class="pull-right muted"><small><i class="fa fa-time"></i> 2 hours ago</small></p>
                                </div>
                                <div class="chat-left">
                                    <p>Phasellus quis erat adipiscing libero congue vulputate auctor non dui.</p>
                                    <p class="pull-right muted"><small><i class="fa fa-time"></i> 1 hour ago</small></p>
                                </div>
                                <div class="chat-left">
                                    <p>Sed fringilla elit risus, a tempor tortor cursus ac. Aliquam erat volutpat.</p>
                                    <p class="pull-right muted"><small><i class="fa fa-time"></i> 35 minutes ago</small></p>
                                </div>
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
                            <?php if (count($publicaciones)>3): ?>
                                <a href="?p=publicacion" class="btn btn-info" align="right">Ver todas las publicaciones</a>
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
                        
                        <div class="well hidden">
                            <span class="text-warning" id="clock"></span>
                            <div class="header">To Do <a class="headerrefresh"><i class="fa fa-refresh pull-right"></i></a></div>
                            <ul class="list todo">
                                <li><a class="dark"><i class="fa fa-circle-o check"></i> Make a huge admin theme <i class="todo-remove fa fa-times pull-right"></i></a></li>
                                <li><a class="dark"><i class="fa fa-circle-o check"></i> Stroke my cat <i class="todo-remove fa fa-times pull-right"></i></a></li>
                                <li><a class="dark"><i class="fa fa-circle-o check"></i> Make something amazing <i class="todo-remove fa fa-times pull-right"></i></a></li>
                                <li><a class="dark"><i class="fa fa-circle-o check"></i> Make email templates<i class="todo-remove fa fa-times pull-right"></i></a></li>
                                <li><a class="dark"><i class="fa fa-circle-o check"></i> Work hard <i class="todo-remove fa fa-times pull-right"></i></a></li>
                                <li><a class="dark"><i class="fa fa-circle-o check"></i> Play harder <i class="todo-remove fa fa-times pull-right"></i></a></li>
                            </ul>
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
            </div>
        </section>
        
        <script type="text/javascript">$(document).bind("mobileinit", function(){$.extend(  $.mobile , {autoInitializePage: false})});</script>
        <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>    
        <script src="<?=$base?>static/js/leftmenu.js"></script>                        
        <script src="<?=$base?>static/js/theme.js"></script>
        
        <script>index();</script>
        <style type="text/css">
        </style>
    </body>
</html>