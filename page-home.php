<?php
/*
Template Name: Home Page
Description: No container wrapping this page, so you can have full width elements.
*/

get_header(); ?>


<?php while ( have_posts() ) : the_post(); ?>

<?php echo get_new_royalslider(1); ?>

<hr>
<div class="feat_row" style="display:none;">
    <?php while ( have_rows('featured_section') ) : the_row(); ?>
        <div class="featured_item">
            <div class="featured_item_img" style='background-image:url(<?php the_sub_field("image"); ?>);'></div>
            <h4><?php the_sub_field('title'); ?></h4>
        </div>
    <?php endwhile; ?>
</div>

<?php get_template_part('homevids'); ?>

<hr>

<div class="padder_sm_bot">
    <?php the_content(); ?>
</div>
<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
