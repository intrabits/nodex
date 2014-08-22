<section class="wrap">
            <div class="container">
            	<ol class="breadcrumb">
					<li><a href="?p=publicacion">Publicaciones</a></li>					
					<li><a href="#"><?=$publicacion['publicacion_titulo']?> </a></li>
					<li class="pull-right"><a href="" class="text-muted"><i class="fa fa-refresh"></i></a></li>
				</ol>
                <div class="row">
                    <?php if (isset($publicacion)): ?>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="well blog-post">
                            <?php if (isset($publicacion['publicacion_imagen'])): ?>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="image">
                                        <img src="<?=$base.'paginas/'.$publicacion['publicacion_imagen']?> " alt="">
                                    </div>
                                </div>
                            </div>    
                            <?php endif ?>
                            
                            <div class="row">
                                <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                                    <div style="padding:20px">
                                        <h2>
                                            <?=$publicacion['publicacion_titulo']?> 
                                            <span class="btn-group pull-right">
                                                <a class="btn btn-default" href="#"><i class="fa fa-heart text-danger"></i> 103</a>
                                                <a class="btn btn-default" href="#"><i class="fa fa-comments"></i> 3</a>
                                            </span>
                                        </h2>
                                        <hr />
                                        <?=$publicacion['publicacion_contenido']?> 
                                        <div class="media">
                                            <?php if ($publicacion['publicacion_video']): ?>
                                                <iframe width="560" height="315" src="//www.youtube.com/embed/<?=$publicacion['publicacion_video']?>" frameborder="0" allowfullscreen></iframe>
                                            <?php endif ?>
                                        </div>                                        
                                        <form method="POST" action="" class="comment">
                                        <div class="form-group">
                                          <label for="inputEmail3" class="col-sm-4 control-label">Nombre</label>
                                          <div class="col-sm-8">
                                            <input type="text" class="form-control" id="nombre" name="autor">   
                                            <p class="help-block"></p>
                                          </div>
                                        </div>
                                        <div class="form-group hidden">
                                          <label for="inputEmail3" class="col-sm-4 control-label">Aunto</label>
                                          <div class="col-sm-8">
                                            <input type="" class="form-control" placeholder="" name="asunto" value="Comentario: <?=$publicacion['publicacion_titulo']?> ">   
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
                                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                    <div class="blog-sidebar">
                                        <?php if (isset($publicaciones)): ?>
                                        <h5 class="text-muted">Otras publicaciones</h5>

                                        <?php foreach ($publicaciones as $p): ?>
                                        <a href="?p=publicacion&id=<?=$p['publicacion_id']?> " class="related-blog">
                                            <img src="http://placehold.it/250/<?=$colores[array_rand($colores)]; ?>&text=<?=$p['publicacion_id']?> ">" alt="">
                                            <div class="details">
                                                <?=$p['publicacion_titulo']?>
                                            </div>
                                        </a>     
                                        <?php endforeach ?>
                                           
                                        <?php endif ?>
                                        
                                       
                                        <hr />
                                        <!-- <h5 class="text-muted">Tags</h5>
                                        <div class="tags">
                                            <span class="label label-default">Trending</span>
                                            <span class="label label-primary">Games</span>
                                            <span class="label label-success">Film</span>
                                            <span class="label label-info">Jamie Foxx</span>
                                            <span class="label label-warning">Arrested Development</span>
                                            <span class="label label-success">Bronson</span>
                                            <span class="label label-success">Film</span>
                                            <span class="label label-danger">Starbucks</span>
                                            <span class="label label-primary">Rockstar</span>
                                            <span class="label label-primary">COD</span>
                                            <span class="label label-info">AH Themes</span>
                                            <span class="label label-warning">New Season</span>
                                            <span class="label label-danger">Coca Cola</span>
                                            <span class="label label-success">Celebrity</span>
                                            <span class="label label-info">Sky</span>
                                        </div> -->
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