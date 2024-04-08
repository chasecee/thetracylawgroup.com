<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package _tk
 */
?>
            </div><!-- close .col-sm-8 -->
        </div><!-- close .row -->
    </div><!-- close .container -->
</div><!-- close .main-content -->

<footer id="colophon" class="site-footer" role="contentinfo">


<?php // substitute the class "container-fluid" below if you want a wider content area ?>
	<div class="container">
		<div class="row">
			<div class="site-footer-inner col-sm-12">

				<div class="site-info text-center padder">
					<div class="float_logo"></div>
					<div class="copyright">
						<?php the_field('footer_text', 'option'); ?>
					</div>
				</div><!-- close .site-info -->

			</div>
		</div>
	</div><!-- close .container -->
	<?php  the_field('footer_scripts','option');  ?>
</footer><!-- close #colophon -->

<?php wp_footer(); ?>

</body>
</html>
