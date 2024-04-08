<?php
/**
 * These are custom admin UI/UX functions written by Chase Cee.
 */


remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

function add_admin_menu_separator($position) { global $menu; $index = 0; foreach($menu as $offset => $section) { if (substr($section[2],0,9)=='separator') $index++; if ($offset>=$position) { $menu[$position] = array('','read',"separator{$index}",'','wp-menu-separator'); break; } } ksort( $menu ); }

function my_admin_menu(){
    remove_menu_page( 'link-manager.php' );
    add_admin_menu_separator(55);
}

add_action( 'admin_menu', 'my_admin_menu' );

function custom_menu_order($menu_ord) {
    if (!$menu_ord) return true;

    return array(
        'index.php', // Dashboard
        'separator1', // First separator
        'edit.php', // Posts
        'edit.php?post_type=page', // Pages
        'gf_edit_forms', // Gravity Forms
        'upload.php', // Media
        'separator2', // Second separator
        'theme-general-options', // ACF theme options
        'nav-menus.php', // Menus
        'themes.php', // Appearance
        'separator-last', // Last separator
        'plugins.php', // Plugins
        'users.php', // Users
        'tools.php', // Tools
        'options-general.php', // Settings
    );
}
add_filter('custom_menu_order', 'custom_menu_order'); // Activate custom_menu_order
add_filter('menu_order', 'custom_menu_order');

function annointed_admin_bar_remove() { global $wp_admin_bar; $wp_admin_bar->remove_menu('wp-logo'); }
add_action('wp_before_admin_bar_render', 'annointed_admin_bar_remove', 0);

////////////////// DISPLAY MEDIA URL IN MEDIA LIBRARY

function muc_column( $cols ) {
        $cols["media_url"] = "URL";
        return $cols;
}
function muc_value( $column_name, $id ) {
    $parsed = parse_url( wp_get_attachment_url( $attachment->ID ) );
    $url    = dirname( $parsed [ 'path' ] ) . '/' . rawurlencode( basename( $parsed[ 'path' ] ) );

        if ( $column_name == "media_url" ) echo '<input type="text" style="width:100%;" onclick="jQuery(this).select();" value="'. $url . '" />';
}
add_filter( 'manage_media_columns', 'muc_column' );
add_action( 'manage_media_custom_column', 'muc_value', 10, 2 );

function performance( $visible = false ) {
    $stat = sprintf(  '%d queries in %.3f seconds, using %.2fMB memory',
        get_num_queries(),
        timer_stop( 0, 3 ),
        memory_get_peak_usage() / 1024 / 1024
        );
    echo $visible ? $stat : "<!-- {$stat} -->" ;
}
add_action( 'wp_footer', 'performance', 20 );

function mytheme_admin_bar_render() {
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu('wpseo-menu');
}
// and we hook our function via
add_action( 'wp_before_admin_bar_render', 'mytheme_admin_bar_render' );

function revcon_change_post_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'Rentals';
    $submenu['edit.php'][5][0] = 'Rental';
    $submenu['edit.php'][10][0] = 'Add Rental';
    $submenu['edit.php'][16][0] = 'Rentals Tags';
    echo '';
}
function revcon_change_post_object() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Rentals';
    $labels->singular_name = 'Rental';
    $labels->add_new = 'Add Rental';
    $labels->add_new_item = 'Add Rental';
    $labels->edit_item = 'Edit Rental';
    $labels->new_item = 'New Rental';
    $labels->view_item = 'View Rental';
    $labels->search_items = 'Search Rentals';
    $labels->not_found = 'No Rentals found';
    $labels->not_found_in_trash = 'No Rentals found in Trash';
    $labels->all_items = 'All Rentals';
    $labels->menu_name = 'Rental';
    $labels->name_admin_bar = 'Rental';
}

add_action( 'admin_menu', 'revcon_change_post_label' );
add_action( 'init', 'revcon_change_post_object' );







?>
