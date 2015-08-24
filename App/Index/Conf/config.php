<?php
return array(
	//'配置项'=>'配置值'
	'USER_AUTH_KEY' => 'admin_uid',
	'LOAD_EXT_CONFIG' => array(
		'USER' => 'config.user'
	),
	'TMPL_PARSE_STRING' => array(
		'__CSS__' => __ROOT__.'/Template/Static/Index/Css',
		'__IMG__' => __ROOT__.'/Template/Static/Index/Images',
		'__JS__' => __ROOT__.'/Template/Static/Index/Js',
	),
);