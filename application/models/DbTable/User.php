<?php

class Application_Model_DbTable_User extends My_Model
{
    protected $_name = 'User';
    protected $_alias = 'u';
 	protected $_soft_delete = true;

 	public function save($data, $where = ''){
 		// hash password with bcrypt
 		if(!empty($data['password'])){
 			$hash = new Jien_Auth_Hash(8, false);
			$data['password'] = $hash->hashPassword($data['password']);
 		}

 		// if username is empty, use email as the username
 		if(empty($data['email']) && !empty($data['username'])){
 			$data['email'] = $data['username'];
 		}

 		$id = parent::save($data, $where);
 		return $id;
 	}

 	public function joinRole(){
 		$this->leftJoin("Role role", "u.role_id = role.role_id", "role.role");
 		return $this;
 	}

 	public function joinProvider(){
 		$this->leftJoin("Provider provider", "u.provider_id = provider.provider_id", "provider.provider");
 		return $this;
 	}

}