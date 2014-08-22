<?php
define('TEMPLATES_DIR', './../../views/');
class TemplateEngine extends stdClass {
      public function fetch($__tpl) {
            foreach (get_object_vars($this) as $__name=>$__value) {
                  $$__name = $__value;
            }
            require(TEMPLATES_DIR.'menu.tpl');
            require(TEMPLATES_DIR . $__tpl);
      }
} 

?>