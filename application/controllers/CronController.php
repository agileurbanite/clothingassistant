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
        
        //initialize amz object
        $amz = new AmazonECS(AWS_API_KEY, AWS_API_SECRET_KEY, 'com', AWS_ASSOCIATE_TAG);
        
        //return array
        $amz->returnType(AmazonECS::RETURN_TYPE_ARRAY);
        
        //set query and get response
        $response = $amz->category('Apparel')->optionalParameters( array('Sort'=>'-launch-date'))->responseGroup('Small,Images')->search("halloween sexy costumes");
        
        $page = 1;
        $items = $response['Items'];
        
        $total_results = $items['TotalResults'];
        $total_pages = $items['TotalPages'];
        
        echo $total_pages . "\r\n\r\n";
        
        for($page = 1; $page <= $total_pages; $page++){
            $response = $amz->category('Apparel')->optionalParameters( array('Sort'=>'-launch-date'))->responseGroup('ItemAttributes,Images')->page($page)->search("halloween sexy costumes");
            $items = $response['Items'];
            foreach($items['Item'] as $item){
                if( !empty($item['SmallImage']) ){
                    
                    if( !empty($item['ItemAttributes']['Department']) ){
                        if( $item['ItemAttributes']['Department'] == 'womens' ){
                            $gender = 'f';
                        }else if( $item['ItemAttributes']['Department'] == "mens" ){
                            $gender = 'm';
                        }
                    }else{
                        $gender = '';
                    }
                    
                    $data = array(
                        'product_url' => $item['DetailPageURL'],
                        'image_url' => $item['LargeImage']['URL'],
                        'brand' => $item['ItemAttributes']['Manufacturer'],
                        'status' => 'new',
                        'source' => 'amazon',
                        'color' => $item['ItemAttributes']['Color'],
                        'gender' => $gender,
                        'title' => $item['ItemAttributes']['Title'],
                        'price' => ltrim($item['ItemAttributes']['ListPrice']['FormattedPrice'],'$')
                    );
                    
                    try{
                        $id = Jien::model('Product')->save($data);
                        echo $id;
                    }catch(Exception $e){
                        echo $e->getMessage();
                    }
                    
                    echo "\r\n";
                }
            }
            echo 'Page: ' . $page . "\n\r\n\r";
        }
        exit;
    }
    
    public function testAction(){
        $html = "<html><body><div id=test>asdfasdf</div></body></html>";
        phpQuery::newDocument($html);
        
        $test = pq('#test');
        
        Jien::debug($test->text());exit;
    }
}
