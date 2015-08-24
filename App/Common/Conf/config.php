<?php
return array(
		//'配置项'            =>'配置值'
		'SHOW_PAGE_TRACE'     => false, //调试窗口
		'APP_WEBNAME'         => '关键词查询系统',
		
		//配置数据库连接信息
		'DB_TYPE'             => 'mysql',
		'DB_HOST'             => 'localhost',
		'DB_NAME'             => 'sitekeywords',//vkeduo
		'DB_USER'             => 'root',//vkeduo
		'DB_PWD'              => '',//t2wEUANL5Juz
		'DB_PORT'             => 3306,
		'DB_PREFIX'           => 'yh_',
		
		//默认模板主题
		'TMPL_PATH'           => './Template/',
		//多模块
		'MODULE_ALLOW_LIST'   => array('Index'),
		
		'DEFAULT_MODULE'      => 'Index',
		
		'URL_MODEL'           => 2, //URL模式
		
		'DEFAULT_TIMEZONE'    => 'PRC', //默认时区
		
		'TMPL_PARSE_STRING'   => array(
		'__UPLOAD__'          => __ROOT__.'/Uploads',	
		),
		
		'TMPL_ACTION_ERROR'   => 'Public:error',//公共错误页
		
		'TMPL_ACTION_SUCCESS' => 'Public:success',//公共成功页
);