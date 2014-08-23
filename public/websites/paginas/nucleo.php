<?php
define('INCLUDE_CHECK',true);
header('Content-Type: text/html; charset=UTF-8'); 
require './../../core/database.class.php';
require './../../core/funciones.php';
require './../../core/config.php';
require './../../core/engine.class.php';
require './../../core/class.phpmailer.php';

//	Variables importantes
// $base = 'http://localhost/nodex/public/websites/';
$base_pagina = $base."paginas/".$pagina_id.'/';
$colores = ['eee','333','088A68'];
$bootstrap_class = ['info','primary','danger','warning','success'];

//	Infomación General de la página

$pagina = $db ->fields("pagina","pagina_id = $pagina_id",'pagina_nombre,pagina_dominio,pagina_descripcion,pagina_descripcion_larga,pagina_descripcion_larga,pagina_nosotros,pagina_tipo_id,pagina_logo,pagina_portada,pagina_fondo,pagina_video_fondo,pagina_telefono,pagina_direccion,pagina_email,pagina_facebook,pagina_twitter,pagina_instagram,pagina_google,pagina_youtube,pagina_mapa,pagina_conversion');

//	Sumar una visita :)
$db->query("UPDATE pagina set pagina_visitas = pagina_visitas+1 WHERE pagina_id = $pagina_id");


//	Mandar correo
require './../../core/send.php';

// $tpl->pagina=$pagina;

$tpl = new TemplateEngine();

$tpl->url 		= $url="http://".$_SERVER['HTTP_HOST'].":".$_SERVER['SERVER_PORT'].$_SERVER['REQUEST_URI'];
$tpl->base 		= $base;
$tpl->pagina_id = $pagina_id;
$tpl->base_pagina = $base_pagina;
$tpl->colores 	= $colores;
$tpl->bootstrap_class = $bootstrap_class;

$tpl->pagina 	= $pagina;

//	Productos de la página
$productos 	= $db->select_sql("SELECT *,(SELECT imagen_url from pagina_producto_imagen WHERE imagen_producto_id = producto_id LIMIT 1) as producto_foto FROM pagina_producto WHERE producto_pagina_id = $pagina_id ");
$tpl->productos = $productos;
//	Publicaciones del blog
$publicaciones 	= $db->select_sql("SELECT publicacion_id, publicacion_titulo,LEFT(publicacion_contenido, 140) AS publicacion_resumen, publicacion_fecha FROM pagina_publicacion WHERE publicacion_pagina_id = $pagina_id ORDER BY publicacion_fecha DESC LIMIT 4");
$tpl->publicaciones = $publicaciones;

if (isset($_GET['p'])) {	
	$p = $_GET['p'];
	switch ($p) {
		case 'galeria':
			// $galerias = $db->select('pagina_galeria',"galeria_pagina_id=$pagina_id",'galeria_id,galeria_nombre,galeria_descripcion');
		$galerias = $db->select_sql("SELECT galeria_id,galeria_nombre,galeria_descripcion,(SELECT imagen_url from pagina_galeria_imagen where imagen_galeria_id = galeria_id LIMIT 1) as foto FROM pagina_galeria WHERE galeria_pagina_id = $pagina_id ");
			$tpl->galerias 	= $galerias;

			$id = get('id');

			//	Si solo hay una galería... los mandamos a esa!

			//	Dejamos esto pendiente
			if (count($galerias)==1&&$id=='') {
				$unica_galeria = $db->field("SELECT galeria_id from galeria WHERE galeria_pagina_id = $pagina_id");
				// header('Location:'.$base_pagina."?p=galeria&id=".$unica_galeria);
			}
			
				
			if ($id!='') {				
				$imagenes = $db->select('pagina_galeria_imagen',"imagen_galeria_id = $id",'imagen_url,imagen_titulo');
				$tpl->imagenes = $imagenes;
			}
			$tpl->fetch('galeria.tpl');
			break;
		case 'publicacion':
			$publicaciones 	= $db->select_sql("SELECT publicacion_id, publicacion_titulo,LEFT(publicacion_contenido, 140) AS publicacion_resumen, publicacion_fecha,publicacion_imagen FROM pagina_publicacion WHERE publicacion_pagina_id = $pagina_id ORDER BY publicacion_fecha DESC");
			$tpl->publicaciones = $publicaciones;

			$id = get('id');
			if ($id!='') {
				$publicacion = $db->select('pagina_publicacion',"publicacion_id=$id",'publicacion_id,publicacion_titulo,publicacion_contenido,publicacion_fecha,publicacion_video,publicacion_imagen');
				$tpl->publicacion = $publicacion[0];
				$tpl->fetch('post.tpl');
			} else {
				$tpl->fetch('blog.tpl');
			}
						
			break;

		case 'nosotros':
			$tpl->fetch('nosotros.tpl');
			break;

		case 'tienda':
			$id = get('id');
			if ($id!='') {
				$producto 	= $db->select_sql("SELECT * from pagina_producto WHERE producto_id = $id  and producto_pagina_id = $pagina_id");
				$fotos 	= $db->select('pagina_producto_imagen',"imagen_producto_id = $id",'imagen_url');
				$tpl->producto 	= $producto[0];
				$tpl->fotos 	= $fotos;
				$tpl->fetch('producto.tpl');
			} else {
				$productos 	= $db->select_sql("SELECT *,(SELECT imagen_url from pagina_producto_imagen WHERE imagen_producto_id = producto_id LIMIT 1) as producto_foto FROM pagina_producto WHERE producto_pagina_id = $pagina_id ");
				$tpl->productos = $productos;
				$tpl->fetch('tienda.tpl');
			}
				
			break;

		case 'contacto':
			$tpl->fetch('contacto.tpl');
			break;
		
		default:						
			$publicaciones 	= $db->select_sql("SELECT publicacion_id, publicacion_titulo,LEFT(publicacion_contenido, 140) AS publicacion_resumen, publicacion_fecha FROM pagina_publicacion WHERE publicacion_pagina_id = $pagina_id ORDER BY publicacion_fecha DESC LIMIT 4");
			$tpl->publicaciones = $publicaciones;
			

			if ($pagina['pagina_video_fondo']!='') {
				if (isMobile()) {$tpl->fetch('inicio.tpl');}
				else{$tpl->fetch('inicio_alternativo.tpl');}	
			}else{
				$tpl->fetch('inicio.tpl'); 	
			}
			break;
	}
}else{
	

	if ($pagina['pagina_video_fondo']!='') {
		if (isMobile()) {$tpl->fetch('inicio.tpl');}
		else{$tpl->fetch('inicio_alternativo.tpl'); 	}		
	}else{
		$tpl->fetch('inicio.tpl'); 	
	}
}

 

?>
