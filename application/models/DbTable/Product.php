<?php

class Application_Model_DbTable_Product extends My_Model
{
    protected $_name = 'Product';
    protected $_alias = 'product';
    protected $_soft_delete = false;
    
    
    public function whereBrands($brands){
        if( is_array($brands) ){
            $csv = '';
            foreach($brands as $key=>$brand){
                $csv .= "'$brand',";
            }
            $csv = rtrim($csv, ',');
            $this->andWhere("brand in ($csv)");
        }else{
            $this->orWhere("brand = '$brand'");
        }
        
        return $this;
    }
}