<?php

class CronController extends My_Controller {

    public function init(){
        parent::init();
    }

    public function indexAction(){
        $client = new Zend_Http_Client('http://www.calvinklein.com/family/index.jsp?categoryId=3249851', array(
            'maxredirects' => 0,
            'timeout'      => 30)
        );
        
        $response = $client->request('GET');
        echo $response->getBody();exit;
    }
    
    public function testAction(){
        $html = "<html><body><div id=test>asdfasdf</div></body></html>";
        phpQuery::newDocument($html);
        
        $test = pq('#test');
        
        Jien::debug($test->text());exit;
    }
}
