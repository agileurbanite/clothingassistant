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
    
    public function amazonAction(){
        defined('AWS_API_KEY') or define('AWS_API_KEY', 'AKIAIVI63PJFFKN255NQ');
        defined('AWS_API_SECRET_KEY') or define('AWS_API_SECRET_KEY', '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');
        defined('AWS_ASSOCIATE_TAG') or define('AWS_ASSOCIATE_TAG', '99styles0d-20');
        $amz = new AmazonECS(AWS_API_KEY, AWS_API_SECRET_KEY, 'com', AWS_ASSOCIATE_TAG);
        $amz->returnType(AmazonECS::RETURN_TYPE_ARRAY);
        $response = $amz->category('Apparel')->responseGroup('Images')->page(1)->search("halloween costumes", 1040660);
        
        Jien::debug($response);
        
        
        
        exit;
        
    }
    
    public function testAction(){
        $html = "<html><body><div id=test>asdfasdf</div></body></html>";
        phpQuery::newDocument($html);
        
        $test = pq('#test');
        
        Jien::debug($test->text());exit;
    }
}
