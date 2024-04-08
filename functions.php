<?php
/**
 * _tk functions and definitions
 *
 * @package _tk
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) )
	$content_width = 750; /* pixels */

if ( ! function_exists( '_tk_setup' ) ) :

function _tk_setup() {
	global $cap, $content_width;
	add_editor_style();
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link' ) );
	add_theme_support( 'custom-background', apply_filters( '_tk_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
	load_theme_textdomain( '_tk', get_template_directory() . '/languages' );
	register_nav_menus( array(
		'primary'  => __( 'Main Menu', '_tk' ),
	) );

}
endif; // _tk_setup
add_action( 'after_setup_theme', '_tk_setup' );

function _tk_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', '_tk' ),
		'id'            => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', '_tk_widgets_init' );

/**
 * Enqueue scripts and styles
 */
 function _tk_scripts() {

 	// register styles
 	wp_register_style( '_tk-bootstrap', get_template_directory_uri() . '/includes/resources/bootstrap/css/bootstrap.min.css' );
	wp_register_style( '_tk-font-awesome', get_template_directory_uri() . '/includes/css/font-awesome.min.css', false, '4.6.3' );
 	wp_register_style( '_tk-style', get_stylesheet_uri() );

 	// enqueue styles
 	wp_enqueue_style( '_tk-bootstrap' );
	wp_enqueue_style( '_tk-style' );
	wp_enqueue_style( '_tk-font-awesome' );


 	// register js
 	wp_register_script('_tk-bootstrapjs', get_template_directory_uri().'/includes/resources/bootstrap/js/bootstrap.min.js', array('jquery') , '3.3.6', true );
	wp_register_script( 'viewport', get_template_directory_uri() . '/includes/js/jquery.viewportchecker.min.js', array(), '1.8.7', true );
 	wp_register_script( 'mainjs', get_template_directory_uri() . '/includes/js/main.js', array(), '1.0', true );


   // enqueue js
  wp_enqueue_script( '_tk-bootstrapjs' );
	wp_enqueue_script( 'viewport' );
 	wp_enqueue_script( 'mainjs' );


 }
 add_action( 'wp_enqueue_scripts', '_tk_scripts' );


require get_template_directory() . '/includes/custom-header.php';
require get_template_directory() . '/includes/template-tags.php';
require get_template_directory() . '/includes/extras.php';
require get_template_directory() . '/includes/customizer.php';
require get_template_directory() . '/includes/jetpack.php';
require get_template_directory() . '/includes/bootstrap-wp-navwalker.php';
/**
 * Load custom functions written by Chase.
 */
require get_template_directory() . '/includes/admin/admin-functions.php';

 ////////////////// Typekit Embed

 function theme_typekit() {
		 wp_register_script( 'theme_typekit', '//use.typekit.net/rlq1dlg.js', array(), '', false );
		 wp_enqueue_script( 'theme_typekit');
 }
 add_action( 'wp_enqueue_scripts', 'theme_typekit' );
 function theme_typekit_inline() {
   if ( wp_script_is( 'theme_typekit', 'done' ) ) { ?>
<script type="text/javascript">
try {
    Typekit.load();
} catch (e) {}
</script>
<?php } }
 add_action( 'wp_head', 'theme_typekit_inline' );

 if( function_exists('acf_add_options_page') ) {

	 acf_add_options_page(array(
 		'page_title' 	=> 'Theme General Options',
 		'menu_title'	=> 'Theme Options',
 		'menu_slug' 	=> 'theme-general-options',
 		'capability'	=> 'edit_posts',
 		'redirect'		=> false
 	));
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Custom Code/Scripts',
		'menu_title'	=> 'Custom Code',
		'parent_slug'	=> 'theme-general-options',
	));
}
add_filter( 'gform_submit_button', 'form_submit_button', 10, 2 );
function form_submit_button( $button, $form ) {
    return "<button class='btn btn-primary' id='gform_submit_button_{$form['id']}'><span>Submit</span></button>";
}
/**
 * Trying to deal with full width elements. Specify pages you want if full width. These actions are at the end of header.php and at the beginning of footer.php
 */



////////////////// LOGIN ITEMS
add_action("login_head", "my_login_head");
function my_login_head() {
    $logo = get_field('logo','option');
    if ($logo){$logo_url=$logo['url'];} // Corrected line
    else{$logo_url= get_bloginfo('template_url')."/includes/images/arena-logo.png";}
    echo "
    <style>
    body.login #login h1 a {
        background: url(".$logo_url.") no-repeat scroll center top transparent;
        height: 90px;
        width: 100%;
        background-size: contain;
    }
    </style>
    ";
}
function my_password_protected_login_head() {
	$logo = get_field('logo','option');
	if ($logo){$logo_url=$logo[url];}
	else{$logo_url= get_bloginfo('template_url')."/includes/images/arena-logo.png";}
   ?>
<style>
.login h1 a {
    background-size: contain;
    width: auto;
    background-image: url('<?php echo $logo_url; ?>');
}
</style>
<?php
}
add_action( 'password_protected_login_head', 'my_password_protected_login_head' );

function remove_upgrade_nag() {
   echo '<style type="text/css">
           .update-plugins, .update-nag, .plugin-update-tr .update-message.notice-warning  {display: none!important;}
         </style>';
}
add_action('admin_head', 'remove_upgrade_nag');

function replace_core_jquery_version() {
    wp_deregister_script( 'jquery' );
    // Change the URL if you want to load a local copy of jQuery from your own server.
    wp_register_script( 'jquery', "https://code.jquery.com/jquery-2.2.4.min.js", array(), '2.2.4' );
}
add_action( 'wp_enqueue_scripts', 'replace_core_jquery_version' );

add_action('wp_enqueue_scripts', function() {
    global $wp_scripts;
    foreach ($wp_scripts->queue as $handle) {
        error_log($handle);
    }
}, 100);
add_filter( 'acf/admin/prevent_escaped_html_notice', '__return_true' );