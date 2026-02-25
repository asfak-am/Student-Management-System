<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // React dev server
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
