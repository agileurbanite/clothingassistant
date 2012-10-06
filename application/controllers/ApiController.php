<?php

class ApiController extends My_Controller {

    public function init(){

    	parent::init();

        $this->layout('blank');
        
    }
    
    /**
     * Get All Brands
     * return @param array $brands
     */
    public function getBrandsAction(){
        $brands = Jien::model('Product')->select("distinct(brand)")->get()->rows();
        
        if($brands){
            $this->json($brands, 200, 'brands returend');
        }else{
            $this->json(false, 400, 'no brands available, contact jamesL');
        }
    }
    
    
    /**
     * 
     * returns @param array $products
     */
    public function productsAction(){
        $user = $this->getUser();
        $code = 200;
        $model = Jien::model('Product');
        if( !empty($user['gender'])){
            $model->gender($user['gender']);
        }
        
        if( !empty($user['brands']) ){
            $model->brands($user['brands']);
        }
        
        $products = $model->get()->rows();

        $res = array(
            'products'=>$products,
            'count'=> count($products)
        );
        
        $this->json( $res, $code, $msg  );
    }
    
    /**
     * @param array 
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
            $this->json(false, 400, 'brands param empty');
        }
    }
    
    public function addUserBrandAction(){
        $brand = $this->params('brand');
        
        if( $brand ){
            $this->addUserBrand($brand);
            $this->json('', 200, 'brand added');
        }else{
            $this->json(false, 400, 'brand param empty');
        }
    }
    
    public function removeUserBrandAction(){
        $brand = $this->params('brand');
        if( $brand ){
            $res = $this->removeUserBrand($brand);
            if($res){
                $this->json(true, 200, 'brand removed');
            }else{
                $this->json(false, 400, 'brand not found in user');
            }
        }else{
            $this->json( false, 400, 'brand param empty');
        }
    }
    
    public function setUserStyleAction(){
        $style = $this->params('style');
        
        if($style){
            $this->setUserStyle($style);
            $this->json(true, 200, 'style added');
        }else{
            $this->json(true, 400, 'style param not sent');
        }
    }
}