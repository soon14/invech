<?php

namespace app\listeners;

use bong\service\queue\Contracts\ShouldQueue;

class TestListener //implements ShouldQueue
{

    public $queue = 'admin_action';

    public function onAction($event){
        \think\Log::write('test.event','notice');
        return 'abc';
    }

}

