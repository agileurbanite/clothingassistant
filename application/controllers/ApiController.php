<?php

class ApiController extends My_Controller {

    public function init(){

    	parent::init();

        $this->layout('blank');
        
    }
    
    /***
     * /api/product end point for product
     */
    public function productAction(){
        $brands = $this->params('brands');
        $code = 200;
        
        $model = Jien::model('Product');
        
        if($brands){
            $model->whereBrands($brands);
        }
        
        $products = $model->get()->rows();

        $res = array(
            'products'=>$products,
            'count'=> count($products)
        );
        
        $this->json( array($res, $code, $msg)  );
    }
    
}
