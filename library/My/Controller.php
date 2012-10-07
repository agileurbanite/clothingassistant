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
        
        $model = Jien::model('Product')->select('distinct(brand)')->where("style ='$style'");
        
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
        
        $model = Jien::model('Product')->select('distinct(type)')->where("style='$style'");
        
        if( !empty($_SESSION['user']['gender']) ){
            $gender = $_SESSION['user']['gender'];
            $model->andWhere("gender='$gender'");
        }
        $types = $model->get()->rows();
        if($types){
            $types_arr = array();
            foreach($types as $type){
                $types_arr[] = $type['type'];
            }
            $this->setUserAvailableTypes($types_arr);
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
