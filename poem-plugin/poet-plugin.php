<?php
/*
 * Plugin Name:       افزونه شعر گویی
 * Plugin URI:        https://farzanenazmabadi.liara.run
 * Description:       این افزونه هر موقع که وارد داشبورد میشوید یک شعر زیبا برای شما نمایش می دهد.😍💜
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            فرزانه نظم آبادی
 * Author URI:        https://farzanenazmabadi.liara.run
 * Text Domain:       poet-plugin
 * Domain Path:       /languages
 */

function myPluginEnqueueStyles() {
   wp_enqueue_style('footer-thankyou', plugin_dir_url(__FILE__) . '/style.css');
}
add_action('admin_enqueue_scripts', 'myPluginEnqueueStyles');

 global $poems;
 $poems=array (
    "آن شب خوش را به سادگی نپذیر!",
    " پیری را نابود و در انتهای روز طغیان کن!",
    "طغیان کن... طغیان کن علیه مرگِ روشنایی ",
    "اگر چه خردمندان در نهایت تاریکی را حقیقت می دانند",
    "زیرا که کلامشان به نبود روشنایی  انجامیده",
    " اما آنها آن شب خوش را به سادگی نپذیرفتند",
    "طغیان کن علیه مرگ روشنایی ..."
 );
 function getRandomPoem(){
   global $poems;
    $randomIndex=random_int(0, count($poems)-1);
    return  "<span class='custom-text' ><a href='https://farzanenazmabadi.liara.run' >".$poems[$randomIndex]."</a></span>" ;
 };
 function writePoemAfterInit(){
    return add_filter( "admin_footer_text", "getRandomPoem" );
 };
 
 add_action( "init", "writePoemAfterInit" );