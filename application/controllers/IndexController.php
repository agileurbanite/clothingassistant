<?php

class IndexController extends My_Controller {

    public function init(){
        parent::init();
    }

    public function indexAction(){
        $gender = $this->params('gender');
        if($gender){
            switch($gender){
                case 'female': $gender = 'f';break;
                case 'male': $gender = 'm';break;
                default: $gender = 'f';break;
            }

            $this->setGender($gender);
            $this->view->skip_wizard = true;
        }
        
        $this->view->users = $user = $this->getUser();

        $products = Jien::model('Product');
        
        if( !empty($user['gender'])){
            $products->gender($user['gender']);
        }
        
        if( !empty($user['brands']) ){
            //$model->brands($user['brands']);
        }
        
        if( !empty($user['style']) ){
            $products->style($user['style']);
        }
        
        if( !empty($user['type']) ){
            $products->type($user['type']);
        }
        
        $products = $products->approved()->orderBy('like_count DESC')->withPager($this->params('page',1), 30)->get();
        
        $this->view->products = $products;
    }
    
    public function productAction(){
        $id = $this->params('id');
        
        if($id){
            $this->view->product = $product = Jien::model('Product')->get($id)->row();
        }else{
            echo "test";
        }
        
    }
    
    public function testAction(){
        $html = "<html><body><div id=test>asdfasdf</div></body></html>";
        phpQuery::newDocument($html);
        
        $test = pq('#test');
        
        Jien::debug($test->text());exit;
    }
}
