<?php

function limpiar($tags){  
	$tags = strip_tags($tags);  
	$tags = stripslashes($tags);  
	$valor = str_ireplace("SELECT","",$tags);
	$valor = str_ireplace("COPY","",$valor);
	$valor = str_ireplace("DELETE","",$valor);
	$valor = str_ireplace("DROP","",$valor);
	$valor = str_ireplace("DUMP","",$valor);
	$valor = str_ireplace(" OR ","",$valor);
	
	$valor = str_ireplace("LIKE","",$valor);
	$valor = str_ireplace("--","",$valor);
	$valor = str_ireplace("^","",$valor);
	$valor = str_ireplace("[","",$valor);
	$valor = str_ireplace("]","",$valor);
	$valor = str_ireplace("\\","",$valor);
	$valor = str_ireplace("&","",$valor);
	/*
	$valor = str_ireplace("%","",$valor);
	$valor = str_ireplace("!","",$valor);
	$valor = str_ireplace("¡","",$valor);
	$valor = str_ireplace("?","",$valor);
	$valor = str_ireplace("=","",$valor);	
	*/
	// $tags = htmlentities($tags, ENT_QUOTES | ENT_HTML401, 'UTF-8');  
	setlocale(LC_CTYPE, 'es');
            

return $tags;  
}  

function limpiar_sql($tags){
    /*$tags = strip_tags($tags);  
    $tags = stripslashes($tags);*/  
    $valor = str_ireplace("SELECT","",$tags);
    $valor = str_ireplace("COPY","",$valor);
    $valor = str_ireplace("DELETE","",$valor);
    $valor = str_ireplace("DROP","",$valor);
    $valor = str_ireplace("DUMP","",$valor);
    $valor = str_ireplace(" OR ","",$valor);
    
    $valor = str_ireplace("LIKE","",$valor);
    $valor = str_ireplace("--","",$valor);
    $valor = str_ireplace("^","",$valor);
    $valor = str_ireplace("[","",$valor);
    $valor = str_ireplace("]","",$valor);
    $valor = str_ireplace("\\","",$valor);
    $valor = str_ireplace("&","",$valor);
    return $valor;
}

function get($var){
    if (isset($_GET[$var])) {
        $temporal=limpiar($_GET[$var]);
        return $temporal;
    }else{
        return null;
    }
}

function post($var){
    if (isset($_POST[$var])) {
        $temporal=limpiar($_POST[$var]);    
        return $temporal;
    }
    
}

function blowfish($password, $digito = 7) {
	$set_salt = './1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	$salt = sprintf('$2a$%02d$', $digito);
	for($i = 0; $i < 22; $i++)
	{
	    $salt .= $set_salt[mt_rand(0, 63)];
	}
	return crypt($password, $salt);
}

function subir($path='uploads/',$nombre=''){
    global $url;
    global $db;
    global $config;
    global $session;
    /*$pagina_id=get('pagina_id');*/
    /*$path="$config[base]/uploads/";*/
    $date = date('Y-m-d');
    $time = date('H-i-s');
    $usuario_id = $session->getID();
    $file_name = $date.'_'.$time.'_'.$usuario_id;
    if ($nombre) {
        $file_name=$nombre;
    }
    $err = array();
    $suc = array();    
    if ($_FILES["file"]["error"] > 0) {
        //Si es un URL y no un archivo
        if ($_POST['externa']!='') {
            # code...
        }else{
            $err[] = 'Hubo un error al subir el documento.';
        }        
    }    
    if(count($err)) {
        /*echo '<div class="alert alert-danger">';
        echo implode('<br />', $err);
        echo '</div>';*/
    }       
    if(!count($err)) {  
        if ($_POST['externa']=='') {
            $file_ext = file_extension($_FILES["file"]["name"]);
            $file_name = $file_name.'.'.$file_ext;
            $real_file_name = $_FILES["file"]["name"];
            move_uploaded_file($_FILES["file"]["tmp_name"],"$path" . $file_name);            
            $path = $path . $file_name;
        }else{
            $path= post('externa');
        }
        $datos = array('archivo' => $real_file_name, 'path'=>$path,'url'=>$url,'usuario_id'=>$usuario_id,'descripcion'=>post('descripcion'),'externa'=>post('externa'),'titulo'=>post('titulo'));
        $db->insert('archivos',$datos);        
    }
    return $path;
}
function file_extension($filename)
    {
     return end(explode(".", $filename));
    }



function likes($source_url){    
    $ch = curl_init($source_url);    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    @$raw = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($raw);
    return $data->likes;
}

function ip() { 
    $ip = ""; if(isset($_SERVER)) { 
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) { 
            $ip=$_SERVER['HTTP_CLIENT_IP']; 
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
         $ip=$_SERVER['HTTP_X_FORWARDED_FOR']; } else { $ip=$_SERVER['REMOTE_ADDR']; 
        } 
    } else { if ( getenv( 'HTTP_CLIENT_IP' ) ) { $ip = getenv( 'HTTP_CLIENT_IP' ); 
        } elseif ( getenv( 'HTTP_X_FORWARDED_FOR' ) ) { 
        $ip = getenv( 'HTTP_X_FORWARDED_FOR' ); } else { $ip = getenv( 'REMOTE_ADDR' ); 
        } 
    } // En algunos casos muy raros la ip es devuelta repetida dos veces separada por coma 
    if(strstr($ip,',')) { $ip = array_shift(explode(',',$ip)); } return $ip;
} 

function dias_restantes($fecha_final) {  
    $fecha_actual = date("Y-m-d");  
    $s = strtotime($fecha_final)-strtotime($fecha_actual);  
    $d = intval($s/86400);  
    $diferencia = $d;  
    return $diferencia;  
}

function options($options, $selected = null)
    {
        $html = "";
        foreach ($options as $idx => $value)
        {
            $select = $selected == $idx ? ' selected="selected"' : '';
            $html .= '<option value="' . $idx . '"' . $select . '>' . $value . '</option>';            
        }
        return $html;
    }


function combo($options, $selected = null)
    {
        $html = "";
        foreach ($options as $o)
        {
            $select = $selected == $o[0] ? ' selected="selected"' : '';
            $html .= '<option value="' . $o[0] . '"' . $select . '>' . $o[1] . '</option>';            
        }
        return $html;
    }



function quitar_acentos($string){
    $string = str_replace('&aacute;','a',$string);
    $string = str_replace('&eacute;','e',$string);
    $string = str_replace('&iacute;','i',$string);
    $string = str_replace('&oacute;','o',$string);
    $string = str_replace('&uacute;','u',$string);
    $string = str_replace('&ntilde;','ñ',$string);    
    return $string;    
}


function correo($pagina_contacto,$correo,$nombre,$asunto,$mensaje){        
            //Create a new PHPMailer instance
            $mail = new PHPMailer();
            //Set who the message is to be sent from
            $mail->charSet = "UTF-8";
            $mail->SetFrom($correo, "Formulario Web $nombre");
            //Set an alternative reply-to address
            $mail->AddReplyTo($correo,$nombre);
            //Set who the message is to be sent to
            $mail->AddAddress($pagina_contacto, $nombre);
            //Set the subject line
            $mail->Subject = $asunto;
            $mail->Body = $mensaje;
            /*$mail->AddBCC('seminarios@change-m.com');*/
            //Read an HTML message body from an external file, convert referenced images to embedded, convert HTML into a basic plain-text alternative body
            //$mail->MsgHTML(file_get_contents('../examples/contents.html'), dirname(__FILE__));
            //Replace the plain text body with one created manually
            $mail->AltBody = $mensaje;
            //Attach an image file
            /*$mail->AddAttachment('../img/logos/logo.png', 'logo.png');            */

            //Send the message, check for errors
            if(!$mail->Send()) {
              $msj= "Mailer Error: " . $mail->ErrorInfo;
            } else {
              /*$msj= "Mensaje enviado correctamente a $correo <br>";              */
            }            

            return $msj;
}
?>