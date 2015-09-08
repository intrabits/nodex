<?php  ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="description" content="<?=$meta_description?>">
        <meta name="author" content="<?=$pagina['pagina_nombre']?>">
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?=$base?>/static/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?=$base?>/static/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?=$base?>/static/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="<?=$base?>/static/ico/apple-touch-icon-57-precomposed.png">

        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">

        <link rel="shortcut icon" href="static/ico/favicon.png">
        <title> <?=$pagina['pagina_nombre']?> </title>
        <link href="<?=$base?>static/css/bootstrap.css" type="text/css" rel="stylesheet">
        <link href="<?=$base?>static/css/bigbox.css" rel="stylesheet">
        <link href="<?=$base?>static/css/styles.css" rel="stylesheet">
        <link href="<?=$base?>static/css/nodex.css" rel="stylesheet">
        <link class="nav" href="<?=$base?>static/css/leftmenu.css" rel="stylesheet">
        <!--[if lt IE 9]>
        <script src="<?=$base?>static/js/html5shiv.js"></script>
        <script src="<?=$base?>static/js/respond.min.js"></script>
        <![endif]-->

        <style>
        .fa{
            color: #777;
            color:#<?=$base.$pagina['pagina_color']?>;
        }
        body{
            <?php if (!isMobile()): ?>
            background-image: url( <?=$base.'paginas/'.$pagina['pagina_fondo']?> );
            <?php endif ?>
            /*background-color: #<?=$base.$pagina['pagina_color']?>;*/
        }

        .sidenav.hd { display: none; }
        #menu{
            z-index: 9999;
            background-color: #fff;
        }
        #changer {
            bottom: -100px;
            transition: bottom 0.5s ease;
            -o-transition: bottom 0.5s ease;
            -ms-transition: bottom 0.5s ease;
            -moz-transition: bottom 0.5s ease;
            -webkit-transition: bottom 0.5s ease;
            position: fixed;
            text-align: center;
            background: #fff;
            right: 200px;
            border: 1px solid #777;
            padding: 10px;
            color: #777;
            border-radius: 4px 4px 0 0;
            z-index: 99999999999;
        }
        #changer i {
            font-size: 24px;
        }
         #changer a {
            cursor: pointer;
        }
        #changer:hover {
            bottom: 0;
        }
        </style>
            <div id="fb-root"></div>
        <script>(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/es_LA/all.js#xfbml=1&appId=536982003005656";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
        <meta name="google-translate-customization" content="a0ff6a15b4ab7d5d-c8f9f9c94c707408-ge69522e7e7831ebe-8"></meta>
    </head>
    <body class="left" id="app" data-ng-app="app">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="<?=$base?>static/js/jquery.cookie.js"></script>
        <script>
                if($.cookie("css")) {
                    $("link.nav").attr("href",$.cookie("css"));
                    $("body").attr("class",$.cookie("id"));
                }
            $(document).ready(function() {
                $("#navorin li a").click(function() {
                    $("link.nav").attr("href",$(this).attr('rel'));
                    $.cookie("css",$(this).attr('rel'), {expires: 365, path: '/'});
                    $("body").attr("class",$(this).attr('id'));
                    $.cookie("id",$(this).attr('id'), {expires: 365, path: '/'});
                });
                if($("body").hasClass("left")) {
                      $(".sidenav.left").removeClass('hd');
                }
                if($("body").hasClass("right")) {
                    $(".sidenav.left").addClass('hd');
                      $(".sidenav.right").removeClass('hd');
                }
                if($("body").hasClass("top")) {
                    $(".sidenav.left").addClass('hd');
                      $(".sidenav.top").removeClass('hd');
                }
                if($("body").hasClass("topf")) {
                    $(".sidenav.left").addClass('hd');
                      $(".sidenav.topf").removeClass('hd');
                }
                $("#left").click(function () {
                  $(".sidenav").addClass('hd');
                  $(".sidenav.left").removeClass('hd');
              });

            });
        </script>
        <nav class="sidenav left" role="navigation">
            <ul class="menu">
                <li class="user" >
                    <!-- <div class="search-block">
                        <input type="text" class="search">
                        <span>Search <i class="fa fa-search"></i></span>
                    </div> -->
                    <div class="content logo" >
                        <?php if ($pagina['pagina_logo']){
                            if (strpos($pagina['pagina_logo'],'http') !== false) {
                                $logo = $pagina['pagina_logo'];
                            }else{
                                $logo = $base.'paginas/'.$pagina['pagina_logo'];
                            }
                            ?>
                            <?php if (isset($logo)): ?>

                            <?php endif ?>
                        <img src="<?=$logo?>" alt="Logo" width="170px">
                        <h1 class="hidden"><?=$pagina['pagina_nombre']?></h1>
                        <?php }else{ ?>

                        <h1><?=$pagina['pagina_nombre']?></h1>
                        <?php } ?>
                    </div>
                </li>
                <li>
                    <a href="?p=inicio">
                        Inicio
                        <div>
                            <i class="fa fa-home fa-2x"></i>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="?p=galeria">
                        Galería
                        <div>
                            <i class="fa fa-camera-retro fa-2x"></i>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="?p=blog">
                        Publicaciones
                        <div>
                            <i class="fa fa-suitcase fa-2x"></i>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="?p=nosotros">
                        Acerca de
                        <div>
                            <i class="fa fa-group fa-2x"></i>
                        </div>
                    </a>
                </li>
                <!-- <li>
                    <a href="index.html">
                        Testimonios
                        <div>
                            <i class="fa fa-quote-right fa-2x"></i>
                        </div>
                    </a>
                </li> -->
                <?php if (count($productos)>0): ?>
                <li>
                    <a href="?p=tienda">
                        Tienda
                        <div>
                            <i class="fa fa-shopping-cart fa-2x"></i>
                        </div>
                    </a>
                    <!-- <ul class="dropdown-menu" role="menu">
                        <li><a class="back"><i class="fa fa-angle-left"></i> Back</a></li>
                        <li><a href="blank.html">Blank Page</a></li>
                        <li><a href="leftmenu.html">Left Menu</a></li>
                        <li><a href="rightmenu.html">Right Menu</a></li>
                        <li><a href="topmenu.html">Top Menu</a></li>
                        <li><a href="topmenufixed.html">Top Menu Fixed</a></li>
                    </ul> -->
                </li>
                <?php endif ?>
                <li>
                    <a href="?p=contacto">
                        Contacto
                        <div>
                            <i class="fa fa-envelope-o fa-2x"></i>
                        </div>
                    </a>
                </li>

                </li>

                <li class="logout">
                    <a href="http://nodex.mx?ref=<?php echo $pagina_id ?>">
                        Crea un perfil NODEX
                        <div>
                            <i class="fa fa-globe fa-2x"></i>
                        </div>

                    </a>
                </li>
            </ul>
        </nav>

<?php if (count($menu)>0||1): ?>
<nav class="navbar navbar-default navbar-fixed-top" role="navigation" id="menu">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <div class="container">
        <?php if (isset($logo)): ?>
          <ul class="nav navbar-nav navbar-left">
            <li><a href="/">
              <img src="<?=$logo?>" width="70px">
            </a></li>
          </ul>
        <?php endif; ?>

        <ul class="nav navbar-nav navbar-right">
        <?php foreach ($menu as $m): ?>
        <li><a href="?p=publicacion&id=<?=$m['publicacion_id']?>"><?=$m['publicacion_titulo']?></a></li>
        <?php endforeach ?>
        <li><a href="?p=contacto">Contacto</a></li>
        </ul>
      </div>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<br>
<?php endif ?>


        <!-- <div id="changer">
            <i class="fa fa-cog"></i>
            <ul id="navorin" class="list-unstyled">
                <li><a id="left" class="left" rel="static/css/leftmenu.css">Left Menu</a></li>
                <li><a id="right" rel="static/css/rightmenu.css">Right Menu</a></li>
                <li><a id="top" rel="static/css/topmenu.css">Top Menu</a></li>
                <li><a id="topf" rel="static/css/topmenufixed.css">Top Menu Fixed</a></li>
            </ul>
        </div> -->
        <div class="overlay"></div>
        <div class="controlshint"><img src="<?=$base?>static/img/swipe.png" alt="Menu Help"></div>
        <iframe src="http://nodex.mx/pixel.html?p=<?=$pagina_id?>" width="1px" height="1px"></iframe>
