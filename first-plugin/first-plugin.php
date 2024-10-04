<?php
/*
 * Plugin Name:       اولین افزونه
 * Plugin URI:        https://farzanenazmabadi.liara.run/
 * Description:       با این افزونه میتوانید یک فایلی از تغییراتی که روی پست های خود دارید ایجاد کنید و پست های خود را مدیریت کنید.😀
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            فرزانه نظم آبادی
 * Author URI:        https://farzanenazmabadi.liara.run/
 * License:           GPL v2 or later
 * License URI:       https://farzanenazmabadi.liara.run/
 * Update URI:        https://farzanenazmabadi.liara.run/
 * Text Domain:       farzane-plugin
 */
 
 global $update_data;

 function saveData( $post_id, $post, $update){
    if($update){
        $update_data="update";
    }else{
        $update_data="create";
    };
    $log_file=fopen(plugin_dir_path(__FILE__)."data.txt","a");
    $data="at ".$post->post_date." post with ID ".$post_id." was ".$update_data."ed. title post is ".$post->post_title."\n";
    fwrite($log_file,$data);
 };
 
 add_action( "save_post", "saveData", 10, 3 );