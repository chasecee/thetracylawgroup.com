<?php
/**
 * @package _tk
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<?php

// check if the repeater field has rows of data
if( have_rows('item') ):

 	// loop through the rows of data
    while ( have_rows('item') ) : the_row(); ?>

<div class="item">
    <div class="row">
        <div class="col-sm-8">
            <h2><?php the_sub_field('item_name'); ?></h2>
        </div>
        <div class="col-sm-4 text-right">
            <span class="item_price">Daily $<?php the_sub_field('daily_price'); ?></span>
        </div>
    </div><!-- .row -->
    <hr/>
    <div class="row">
        <div class="col-sm-4"> 
        <?php $item_image_url = get_sub_field('item_image'); if(is_array($item_image_url)): ?>
    <img src="<?php echo $item_image_url['url']; ?>" alt="<?php the_sub_field('item_name'); ?>" />
<?php endif; ?>
        </div>
        <div class="col-sm-8">
            <div class="item_content"><?php echo wp_kses_post( get_sub_field('item_description') ); ?></div>
        </div>
    </div><!-- .row -->
</div><!-- .item -->





    <?php endwhile;

else :

    // no rows found

endif;

?>
</article><!-- #post-## -->
