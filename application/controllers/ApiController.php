<?php

class ApiController extends My_Controller {

    public function init(){

    	parent::init();

        $this->layout('blank');
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    /**
     * Get All Brands
     * return @param array $brands
     */
    public function getBrandsAction(){
        $brands = Jien::model('Product')->select("distinct(brand)")->get()->rows();
        $brands_arr = array();

        foreach($brands as $brand){
            $brands_arr[] = $brand['brand'];
        }

        if($brands){
            //$this->json($brands_arr);
            $this->json(false, 400, 'no brands available, contact jamesL');
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
        $products_per_page = 30;
        $page = $this->params('page');
        $offset = $products_per_page * $page;
        if(!$offset){
            $offset = 0;
        }
        
        $type = $this->params('type');
        
        if( !empty($user['gender'])){
            $model->gender($user['gender']);
        }
        
        if( !empty($user['brands']) ){
            //$model->brands($user['brands']);
        }
        
        if( !empty($user['style']) ){
            $model->style($user['style']);
        }
        
        if( !empty($user['type']) ){
            $model->type($user['type']);
        }
        
        $this->view->products = $products = $model->orderBy('like_count DESC')->approved()->limit($products_per_page,$offset)->get()->rows();
        
        $html = $this->view->render('api/products.phtml');
        
        $res = array(
            'html' => $html,
            'products'=>$products,
            'count'=> count($products),
            'wtf' => array(
                'offset' => $offset,
                'products_per_page' => $products_per_page
            )
        );
        
        $this->json( $res, $code, 'products returned'  );
    }
    
    /**
     * get product
     * @param int id
     */
    public function productAction(){
        $id = $this->params('id');
        
        if($id){
            $this->view->$product = Jien::model('Product')->get($id)->row();
            $html = $this->view->render('api/product.phtml');
            $res = array(
                'html' => $html,
                'product' => $product
            );
            
            $this->json( $res, 200, 'product returned');
        }else{
            $this->json( '', 400, 'id not sent' );
        }
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
            unset($user['brands']);
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
            $res = $this->addUserBrand($brand);
            if($res){
                $this->json(true, 200, 'brand added');
            }else{
                $this->json(false, 400, 'brand already added');
            }
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
            $this->json(false, 400, 'style param not sent');
        }
    }
    
    public function getStylesAction(){
        $styles = Jien::model('Product')->select('distinct(style)')->get()->rows();
        
        if($styles){
            $this->json($styles, 200, 'styles returned');
        }else{
            $this->json(false, 400, 'the styles db is blank, talk to james');
        }
    }
    
    public function setUserTypeAction(){
        $type = $this->params('type');
        
        if($type){
            $this->setUserType($type);
            $this->json(true, 200, 'user type set');
        }else{
            $this->json(false, 400, 'type param not sent');
        }
    } 
    
    public function addLikeAction(){
        $prod_id = $this->params('prod_id');
        
        if($prod_id){
            Jien::model('Product')->addLike($prod_id);
        }
    }
    
    public function sessionTestAction(){
        Jien::debug($_SESSION);
    }
}