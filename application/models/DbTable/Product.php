<?php

class Application_Model_DbTable_Product extends My_Model
{
    protected $_name = 'Product';
    protected $_alias = 'product';
    protected $_soft_delete = false;
    
    public function gender($gender){
        $this->andWhere("gender = '$gender'");
        return $this;
    }
    
    public function brands($brands){
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
    
    public function style($style){
        $this->andWhere("style like '%$style%'");
    }
}