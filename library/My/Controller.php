<?php

class My_Controller extends Jien_Controller {

    public function init(){
    	parent::init();

    	// if it doesn't exist, it will use the default
    	$theme = THEME;
    	$this->view->addScriptPath(APPLICATION_PATH.'/views/'.$theme.'/');
    	$this->layout('site');

    	// set title
    	$this->view->title = TITLE;
        
        $user = $this->getUser();
        if($user){
            if( !empty($user['style']) ){
                if( !isset($user['brands']) ){
                    $this->setUserStyle($user['style']);
                }
            }
        }
    }

    public function getUser(){
        if( empty($_SESSION['user']) ){
            return false;
        }else{
            return $_SESSION['user'];
        }
    }
    
    public function setGender($gender){
        $_SESSION['user']['gender'] = $gender;
        $_SESSION['user']['style'] = 'All';
        $_SESSION['user']['availableStyles'] = array_map( function($n){ return $n['style']; }, Jien::model('Product')->select("distinct(style)")->where("style!=''")->andWhere("gender = '{$_SESSION['user']['gender']}'")->get()->rows() );
    }
    
    public function setUserBrands($brands){
        if( is_array($brands) ){
            $_SESSION['user']['brands'] = $brands;
        }else{
            $_SESSION['user']['brands'][] = $brands;
        }
    }
    
    public function setUserStyle($style){
        $_SESSION['user']['style'] = $style;
        
        $_SESSION['user']['availableStyles'] = array_map( function($n){ return $n['style']; }, Jien::model('Product')->select("distinct(style)")->where("style!=''")->andWhere("gender = '{$_SESSION['user']['gender']}'")->get()->rows() );
        
        $model = Jien::model('Product')->select('distinct(brand)');
        if($style != 'All'){
            $model->where("style ='$style'");
        }
        
        if( !empty($_SESSION['user']['gender']) ){
            $gender = $_SESSION['user']['gender'];
            $model->andWhere("gender='$gender'");
        }
        
        $brands = $model->get()->rows();
        if($brands){
            $brands_arr = array();
            foreach($brands as $brand){
                $brands_arr[] = $brand['brand'];
            }
            $this->setUserBrands($brands_arr);
        }
        
        $model = Jien::model('Product')->select('distinct(type)');
        
        if($style != 'All'){
            //$model->where("style='$style'");
        }
        
        if( !empty($_SESSION['user']['gender']) ){
            $gender = $_SESSION['user']['gender'];
            $model->andWhere("gender='$gender'");
        }
        $types = $model->andWhere("type!=''")->get()->rows();
        
        if($types){
            $types = array_map( function($n){ return $n['type']; }, $types );
            $this->setUserAvailableTypes($types);
        }
    }
    
    public function addUserBrand($brand){
        if( !in_array($brand) ){
            $_SESSION['user']['brands'][] = $brand;
            return false;
        }else{
            return false;
        }
    }
    
    public function removeUserBrand($remove_brand){
        $res = false;
        if( !empty($_SESSION['user']['brands']) ){
            foreach( $_SESSION['user']['brands'] as $key=>$brand ){
                if($brand == $remove_brand){
                    unset($_SESSION['user']['brands'][$key]);
                    $res = true;
                }
            }
        }
        return $res;
    }
    
    public function setUserAvailableTypes($types){
        $_SESSION['user']['availableTypes'] = $types;
    }
    
    public function setUserType($type){
        if($type == "All"){
            unset($_SESSION['user']['type']);
        }else{
            $_SESSION['user']['type'] = $type;
        }
    }
}
