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
        
        $this->view->users = $this->getUser();
        $this->view->products = Jien::model('Product')->approved()->limit(30,0)->get()->rows();
    }
    
    public function testAction(){
        $html = "<html><body><div id=test>asdfasdf</div></body></html>";
        phpQuery::newDocument($html);
        
        $test = pq('#test');
        
        Jien::debug($test->text());exit;
    }
}
