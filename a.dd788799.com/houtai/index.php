<?php
// +----------------------------------------------------------------------
// | FileName: index.php
// +----------------------------------------------------------------------
// | CreateDate: 2017年10月2日
// +----------------------------------------------------------------------
// | Author: xiaoluo
// +----------------------------------------------------------------------


//绑定后台模块
define('BIND_MODULE','admin');


// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');
// 加载框架引导文件
require __DIR__ . '/../thinkphp/start.php';