<?php

class ApiController extends My_Controller {

    public function init(){

    	parent::init();

        $this->layout('blank');
        
    }
    
    /**
     * 
     * @param array $brands
     * returns @param array $products
     */
    public function productsAction(){
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
        
        $this->json( $res, $code, $msg  );
    }
    
    
    /**
     * @param 
     */
    public function setGenderAction(){
        $gender = $this->params('gender');
        if($gender){
            $this->setGender($gender);
            $this->json( '', 200, 'gender set');
        }else{
            $this->json( '', 400, 'gender param empty');
        }
    }
    
    public function getUserAction(){
        $user = $this->getUser();
        if($user){
            $this->json( $user, 200, 'user returned' );
        }else{
            $this->json(false, 400, 'no user attributes have been set');
        }
    }
    
    public function setUserBrandsAction(){
        $brands = $this->params('brands');
        
        if($brands){
            $this->setUserBrands($brands);
            $this->json('', 200, 'brands set');
        }else{
            $this->json('', 400, 'brands param empty');
        }
    }
    
    public function getUserBrandsAction(){
        $brands = $this->getUserBrands();
        if($brands){
            $this->json( $brands, 200, 'user brands retured');
        }else{
            $this->json ( false, 400, 'no user brands set');
        }
    }
}