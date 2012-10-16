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
    
    /*
     * Adds filter for approved products
     */
    public function approved(){
        $this->andWhere("status = 'approved'");
        return $this;
    }
    
    /*
     * Adds filter for rejected products
     */
    public function rejected(){
        $this->andWhere("status = 'rejected'");
        return $this;
    }

    /*
     * Adds filter for pending products
     */
    public function pending(){
        $this->andWhere("status = 'pending'");
        return $this;
    }
    
    /*
     * Adds filter for new products
     */
    public function newP(){
        $this->andWhere("status = 'new'");
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
        if($style != 'All'){
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
    
    // enables filtering
    public function filter($filters = array()){
            if(!empty($filters)){

                    foreach($filters AS $filter=>$value){
                            switch($filter){
                                    case "order_by":
                                            $sort_by = 'desc';
                                            if(!empty($filters['sort_by'])){
                                                    $sort_by = $filters['sort_by'];
                                            }
                                            $order_clause = $value . ' ' . $sort_by;
                                            $this->orderBy($order_clause);
                                    break;
                                    case "gender":
                                        if(!empty($value)){
                                            $this->gender($value);
                                        }
                                    break;
                            }
                    }
            }
            return $this;
    }
    
    /*
     * set product status to rejected
     */
    public function reject($id){
        $data = array('product_id'=>$id, 'status'=>'rejected');
        $update = Jien::model('Product')->save($data);
        return $update;
    }
    
}