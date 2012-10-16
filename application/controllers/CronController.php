<?php

class CronController extends My_Controller {

    public function init(){
        parent::init();
    }

    public function indexAction(){
        $client = new Zend_Http_Client('http://www.amazon.com/Sexy-Wild-West-Sheriff-Costume/dp/B006ZAV73I%3FSubscriptionId%3DAKIAIVI63PJFFKN255NQ%26tag%3D99styles0d-20%26linkCode%3Dsp1%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB006ZAV73I', array(
            'maxredirects' => 0,
            'timeout'      => 30)
        );
        $response = $client->request('GET');
        $html = $response->getBody();
        
        phpQuery::newDocument($html);
        $test = pq('#main-image');
        echo $test->attr('src');
        exit;
    }
    
    public function amazonAction(){
        defined('AWS_API_KEY') or define('AWS_API_KEY', 'AKIAIVI63PJFFKN255NQ');
        defined('AWS_API_SECRET_KEY') or define('AWS_API_SECRET_KEY', '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');
        defined('AWS_ASSOCIATE_TAG') or define('AWS_ASSOCIATE_TAG', '99styles0d-20');
        ini_set('output_buffer', 0);
        
        //initialize amz object
        $amz = new AmazonECS(AWS_API_KEY, AWS_API_SECRET_KEY, 'com', AWS_ASSOCIATE_TAG);
        
        //return array
        $amz->returnType(AmazonECS::RETURN_TYPE_ARRAY);
        
        /*node               
1036592:
Keywords
Rubie's Costume Co, Fun World Costumes, Disguise adult
*/
        
        $searches = array(
            array(
                'sort' => '-launch-date',
                'keyword' => "halloween",
                727629011 //men costumes
            ),
            array(
                'sort' => 'salesrank',
                'keyword' => "halloween",
                727629011 //men costumes
            ),
            array(
                'sort' => '-launch-date',
                'keyword' => 'halloween sexy costumes'
            ),
            array(
                'sort' => 'salesrank',
                'keyword' => 'halloween sexy costumes'
            ),
            array(
                'sort' => 'salesrank',
                'keyword' => "Rubie's Costume Co",
                1036592
            ),
            array(
                'sort' => '-launch-date',
                'keyword' => "Rubie's Costume Co",
                1036592
            ),
            array(
                'sort' => 'salesrank',
                'keyword' => "Fun World Costumes",
                1036592
            ),
            array(
                'sort' => '-launch-date',
                'keyword' => "Fun World Costumes",
                1036592
            ),
            array(
                'sort' => 'salesrank',
                'keyword' => "Disguise adult",
                1036592
            ),
            array(
                'sort' => '-launch-date',
                'keyword' => "Disguise adult",
                1036592
            )
        );
        try{
        foreach($searches as $search){
            //set query and get response
            $response = $amz->category('Apparel')->optionalParameters( array('Sort'=>$search['sort']))->responseGroup('Small,Images');
            if( !empty($search['node']) ){
                $response = $response->search($search['keyword'], $search['node']);
            }else{
                $response = $response->search($search['keyword']);
            }

            $page = 1;
            $items = $response['Items'];
            $dupe = 0;
            for($page = 1; $page <= 10; $page++){
                try{
                    $response = $amz->category('Apparel')->optionalParameters( array('Sort'=>$search['sort']))->responseGroup('ItemAttributes,Images')->page($page)->search("halloween sexy costumes");
                }catch(Exception $e){
                    echo $e->getMessage();
                    exit;
                }
                $items = $response['Items'];
                
                if( empty($items['Item']) ){
                    //Jien::debug($items);exit;
                }
                
                if( count($items > 0 ) ){
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
                                'brand' => ( !empty($item['ItemAttributes']['Manufacturer'])? $item['ItemAttributes']['Manufacturer']: '') ,
                                'status' => 'new',
                                'source' => 'amazon',
                                'color' => ( !empty($item['ItemAttributes']['Color'])? $item['ItemAttributes']['Color']:''),
                                'gender' => $gender,
                                'title' => $item['ItemAttributes']['Title'],
                                'price' => ( !empty($item['ItemAttributes']['ListPrice']['FormattedPrice'])? ltrim($item['ItemAttributes']['ListPrice']['FormattedPrice'],'$'): '')
                            );

                            try{
                                $id = Jien::model('Product')->save($data);
                                echo $id;
                            }catch(Exception $e){
                                $dupe++;
                                echo $e->getMessage();
                            }

                            echo "\r\n";
                        }else{
                            $prod_url = $item['DetailPageURL'];
                            
                            $client = new Zend_Http_Client($prod_url, array(
                                'maxredirects' => 0,
                                'timeout'      => 30)
                            );
                            $response = $client->request('GET');
                            $html = $response->getBody();

                            phpQuery::newDocument($html);
                            $img = pq('#main-image');
                            $img_url = $img->attr('src');
                            
                            $data = array(
                                'product_url' => $item['DetailPageURL'],
                                'image_url' => $img_url,
                                'brand' => ( !empty($item['ItemAttributes']['Manufacturer'])? $item['ItemAttributes']['Manufacturer']: '') ,
                                'status' => 'new',
                                'source' => 'amazon',
                                'color' => ( !empty($item['ItemAttributes']['Color'])? $item['ItemAttributes']['Color']:''),
                                'gender' => $gender,
                                'title' => $item['ItemAttributes']['Title'],
                                'price' => ( !empty($item['ItemAttributes']['ListPrice']['FormattedPrice'])? ltrim($item['ItemAttributes']['ListPrice']['FormattedPrice'],'$'): '')
                            );
                            
                            try{
                                $id = Jien::model('Product')->save($data);
                                echo $id;
                            }catch(Exception $e){
                                $dupe++;
                                echo $e->getMessage();
                            }
                        }
                    }
                }
                echo 'key: ' . $search['keyword'] . ' Page: ' . $page . " - " . $dupe . "\n\r\n\r";
                ob_flush();
                sleep(1);
                
                if($dupe >= 40){
                    $dupe = 0;
                    break;
                }
            }
        }}catch(Exception $e){echo $e->getMessage(); }
        
        
        exit;
    }
    
    public function testAction(){
        $html = "<html><body><div id=test>asdfasdf</div></body></html>";
        phpQuery::newDocument($html);
        
        $test = pq('#test');
        
        Jien::debug($test->text());exit;
    }
}
