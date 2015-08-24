<?php
namespace Index\Controller;
use Think\Controller;
class CommonController extends Controller {
	public function _initialize() {
		define('TMPL_PATH', C('TMPL_PATH'));
		
	}
}