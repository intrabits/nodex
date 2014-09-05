
<div class="modal fade" id="modal-id">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Comprar <?=$producto['producto_nombre']?></h4>
            </div>
            <form method="POST" action="">
            <div class="modal-body">                    
                        <div class="form-group">
                          <label for="inputEmail3" class="col-sm-4 control-label">Nombre</label>
                          <div class="col-sm-8">
                            <input type="text" class="form-control" id="nombre" name="autor" required>   
                            <p class="help-block"></p>
                          </div>
                        </div>
                        <input type="hidden" name="asunto" value="Solicitud de compra: <?=$producto['producto_nombre']?>">
                        <input type="hidden" name="producto_id" value="<?=$producto['producto_id']?>">  
                        <div class="form-group">
                          <label for="inputEmail3" class="col-sm-4 control-label">Correo</label>
                          <div class="col-sm-8">
                            <input type="email" class="form-control" name="correo" required>   
                            <p class="help-block"></p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label for="inputEmail3" class="col-sm-4 control-label">Teléfono</label>
                          <div class="col-sm-8">
                            <input type="text" class="form-control" name="telefono" required>   
                            <p class="help-block"></p>
                          </div>
                        </div>
                        <div class="form-group">
                          <label  class="col-sm-4 control-label">Mensaje adicional al vendedor</label>
                          <div class="col-sm-8">
                            <textarea style="width:100%;height:100px" name="mensaje"></textarea>
                          </div>
                        </div>
                        <div class="info">
                            <p>Nos pondremos en contacto contigo utilizando la información que estas proporcionando para acordar la venta del producto, por favo revisa la exactitud de tus datos</p>
                        </div>
                        <hr>                        
                        
            </div>
            <div class="modal-footer">                
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                <input type="submit" value="Comprar" class="btn btn-primary pull-right" name="submit_form"> 
            </div>
            </form>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

        <section class="wrap">
            <div class="container">                
                <ol class="breadcrumb">
                    <li><a href="?p=tienda">Tienda</a></li>                 
                    <li><a href="#"><?=$producto['producto_nombre']?></a></li>
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
                            <div class="row">
                                <div class="col-md-6">
                                    <a class="btn btn-success btn-lg" data-toggle="modal" href='#modal-id'>Comprar</a>
                                    <div class="fb-share-button btn btn-default btn-lg" style="color:#fff" data-href="<?=$url?> "></div>
                                </div>
                                <div class="col-md-6">
                                    <?php if ($pagina['pagina_paypal']): ?>
                                    <form name="_xclick" action="https://www.paypal.com/es/cgi-bin/webscr" method="post" target="_blank">
                                    <input type="hidden" name="cmd" value="_xclick">
                                    <input type="hidden" name="business" value="<?=$pagina['pagina_paypal']?>">
                                    <input type="hidden" name="currency_code" value="MXN">
                                    <input type="hidden" name="item_name" value="<?=$producto['producto_nombre']?>">
                                    <input type="hidden" name="amount" value="<?=$producto['producto_precio']?>">   
                                    <img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1">
                                    <input type="image" src="https://www.paypalobjects.com/es_XC/MX/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, la forma más segura y rápida de pagar en línea.">
                                    </form>                
                                    <?php endif ?>  
                                </div>
                            </div>
                                                                
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