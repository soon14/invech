<?php

return [

    //'driver' => \think\Env::get('queue.driver', 'database'),
    //'driver' => \think\Env::get('queue.driver', 'sync'),
    'driver' => \think\Env::get('queue.driver', 'redis'),

    'run' =>  [
        'max_tries' => 5,
        'retry_delay' => 10, //工作处理失败,10秒后再执行;
    ],

    'configs' => [

        'sync' => [
        ],

        'database' => [
            'table' => 'jobs',
            'queue_name' => 'default',
            'retry_after' => 90,
        ],

        'beanstalkd' => [
            'host' => 'localhost',
            'queue_name' => 'default',
            'retry_after' => 90,
        ],

        'sqs' => [
            'key' => 'your-public-key',
            'secret' => 'your-secret-key',
            'prefix' => 'https://sqs.us-east-1.amazonaws.com/your-account-id',
            'queue_name' => 'default',
            'region' => 'us-east-1',
        ],

        'redis' => [
            'driver' => 'redis',
            'queue_name' => 'default',//默认操作的redis队列名
            'host'       => '127.0.0.1',
            'port'       => 6379,
            'password'   => '',
            'select'     => 0,
            'timeout'    => 0,
            'expire'     => 0,
            'persistent' => false,
            'prefix'     => '',
        ],
    ],

];
