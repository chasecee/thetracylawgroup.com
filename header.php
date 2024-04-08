<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package _tk
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><?php wp_title( '|', true, 'right' ); ?></title>

    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <?php wp_head(); ?>
    <meta name="google-site-verification" content="JuMDLGmPt1enWiXaB3YdKIKBpYKR9zBYuuKtVM40lFU" />

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-0LXSN82X21"></script>
    <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-0LXSN82X21');
    </script>
    <?php 
	// echo wp_kses_post( get_field('custom_scripts_styles','option') );
	// echo wp_kses_post( get_field('scripts_in_head','option') ); ?>
    <?php // the_field('custom_scripts_styles','option'); the_field('scripts_in_head','option'); ?>
</head>

<body <?php body_class(); ?>>
    <?php the_field('body_scripts','option'); ?>
    <?php do_action( 'before' ); ?>
    <div class="top_brand">
        <div class="container">
            <div class="navbar-header">


                <!-- Your site title as branding in the menu -->
                <a class="navbar-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"
                    title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">

                    <?php $logo = get_field('logo','option');
                        if ($logo){ ?>
                    <img src="<?php echo $logo['url']; ?>" alt="<?php bloginfo( 'name' ); ?>" />
                    <?php } else { bloginfo( 'name' ); } ?>

                </a>

            </div>
            <div class="pull-right text-right contact_top ">
                <a href="tel:+18019789292" class="btn btn-primary navbar-icon visible-xs-inline-block"><span
                        class="font">CALL 801-978-9292</span></a>
                <!--
--><a style="margin-left:5px;" href="sms:+18012091516"
                    class="btn btn-primary  navbar-icon visible-xs-inline-block"><span class="font">TEXT US</span></a>
                <?php the_field('contact_information_html','option'); ?>
            </div>
        </div>
    </div>

    <header id="masthead" class="site-header" role="banner">
        <nav class="site-navigation">
            <div class="container">
                <div class="row">
                    <div class="navbar navbar-default">
                        <button type="button" class="navbar-toggle visible-xs-block" data-toggle="collapse"
                            data-target=".navbar-collapse">
                            NAVIGATION MENU
                        </button>
                        <!-- The WordPress Menu goes here -->
                        <?php wp_nav_menu(
                            array(
                                'theme_location' 	=> 'primary',
                                'depth'             => 2,
                                'container'         => 'div',
                                'container_class'   => 'collapse navbar-collapse navbar-left',
                                'menu_class' 		=> 'nav navbar-nav',
                                'fallback_cb' 		=> 'wp_bootstrap_navwalker::fallback',
                                'menu_id'			=> 'main-menu',
                                'walker' 			=> new wp_bootstrap_navwalker()
                            )
                        ); ?>

                    </div><!-- .navbar -->
                </div>
            </div><!-- .container -->
        </nav><!-- .site-navigation -->
    </header><!-- #masthead -->



    <div class="main-content">
        <div class='container'>
            <div class='row'>
                <div class="col-sm-12 visible-xs-block breadcrumbs">
                    <?php if ( function_exists('yoast_breadcrumb') ) {
      yoast_breadcrumb('<div id="breadcrumbs">','</div>');
    } ?>
                </div>
                <?php get_sidebar(); ?>
                <div class="col-sm-9 side-content">