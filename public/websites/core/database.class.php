<?php
/*
Name:          CRUD Database Class
Author:        FireDart
License:       Creative Commons Attribution-ShareAlike 3.0 Unported License
                - http://creativecommons.org/licenses/by-sa/3.0/
*/
/* Database Class */
class database extends pdo{
	/* Set Properties */
	/* Set Private Database info so only this class can connect to it */
	private $hostname;
	private $database;
	private $username;
	private $password;
	/* Other Variables */
	private $pdo;
	/* Auto Load Database */
	function __construct($hostname, $database, $username, $password) {
		/* Set Private Database values */
		$this->hostname = $hostname;
		$this->port     = 3306;
		$this->database = $database;
		$this->username = $username;
		$this->password = $password;
		
		/* Try to connect else catch the failure */
		try {
			$this->pdo = new PDO("mysql:host={$this->hostname};port={$this->port};dbname={$this->database};charset=utf8", $this->username, $this->password, array(PDO::ATTR_PERSISTENT => true,PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
		} catch(PDOException $e) {
			print "<b>Error - Connection Failed: </b>" . $e->getMessage() . "<br/>";
			die();
		}
	}
	
	/* Build Query based on $query variable */
	/* Example of Bind array(":id" => "1", ":soemthing" => "The value") */
	public function query($query, $bind = null) {
		global $pdo;
		/* Prepare Statment */
		$this->statement = $this->pdo->prepare($query);
		/* Execute Query */
		$this->statement->execute($bind);
	}

	public function insert($tabla,$datos,$depurar='') {
		global $pdo;		
		$fields = array_keys($datos);		
		$query="INSERT INTO ".$tabla."
	    (`".implode('`,`', $fields)."`)
	    VALUES('".implode("','", $datos)."')";
	    if ($depurar) {
	        echo $query;
	    }
		$this->statement = $this->pdo->prepare($query);
		/* Execute Query */
		$result=$this->statement->execute();			
		$insertedId = $this->field("SELECT LAST_INSERT_ID() from $tabla") ;
		
		return $insertedId;
	}
	public function update($table_name, $form_data,$where_clause,$depurar='') {
		$whereSQL = '';
		if(!empty($where_clause))
		{
		    // check to see if the 'where' keyword exists
		    if(substr(strtoupper(trim($where_clause)), 0, 5) != 'WHERE')
		    {
		        // not found, add key word
		        $whereSQL = " WHERE ".$where_clause;
		    } else
		    {
		        $whereSQL = " ".trim($where_clause);
		    }
		}
		// start the actual SQL statement
		$sql = "UPDATE ".$table_name." SET ";
		// loop and build the column /
		$sets = array();
		foreach($form_data as $column => $value)
		{
		     $sets[] = "`".$column."` = '".$value."'";
		}
		$sql .= implode(', ', $sets);
		// append the where statement
		$sql .= $whereSQL;
		// run and return the query result
		/*echo $sql.'<br>';*/
		if ($depurar) {
		    echo $sql;
		}
		$this->statement = $this->pdo->prepare($sql);
		/* Execute Query */
		$result=$this->statement->execute();			
		/*$insertedId = $this->statement->lastInsertId() ;
		*/
		return $result;
	}

	public function select($tabla,$condicion,$campos,$depurar=''){
		global $pdo;
	    $sql = "SELECT $campos FROM $tabla WHERE $condicion";
	    $this->statement = $this->pdo->prepare($sql);
	    $this->statement->execute();	
	    if($depurar)echo "$sql<br>";    
	    // here you go:
	    $arreglo=$this->statement->fetchAll();		    

	    return $arreglo;
	}

	public function select_sql($sql,$depurar=''){
		global $pdo;	    
	    $this->statement = $this->pdo->prepare($sql);
	    $this->statement->execute();	
	    if($depurar)echo "$sql<br>";    
	    // here you go:
	    $arreglo=$this->statement->fetchAll();		    

	    return $arreglo;
	}

	public function fields($tabla,$condicion,$campos,$depurar=''){
		global $pdo;
	    $sql = "SELECT $campos FROM $tabla WHERE $condicion LIMIT 1";
	    $this->statement = $this->pdo->prepare($sql);
	    $this->statement->execute();	
	    if($depurar)echo "$sql<br>";    
	    // here you go:	    
	    $arreglo=$this->statement->fetchAll();		



	    return $arreglo[0];
	}

	public function field($query,$depurar=''){
		global $pdo;	    
	    $this->statement = $this->pdo->prepare($query);
	    $this->statement->execute();	
	    if($depurar)echo "$query<br>";    
	    // here you go:	    
	    $arreglo=$this->statement->fetchAll();		



	    return $arreglo[0][0];
	}


	
	/* Return row Count */
	public function count() {
		/* Return Count */
		$result = $this->statement->rowCount();
		return $result;
	}
}
?>