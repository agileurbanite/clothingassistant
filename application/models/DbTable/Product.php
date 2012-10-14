<?php

class Application_Model_DbTable_Product extends My_Model
{
    protected $_name = 'Product';
    protected $_alias = 'product';
    protected $_soft_delete = true;
    
    public function gender($gender){
        $this->andWhere("gender = '$gender'");
        return $this;
    }
    
    public function approved(){
        $this->andWhere("status = 'approved'");
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
        if($style != 'all'){
            $this->andWhere("style like '%$style%'");
        }
        return $this;
    }
    
    public function type($type){
        $this->andWhere("type='$type'");
        return $this;
    }
    
    public function addLike($product_id){
        Jien::db()->fetchAll("UPDATE Product SET like_count=like_count+1 WHERE product_id = $product_id");
    }
}