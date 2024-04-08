<div class="vidbox-wrapper pl-animation-group">
			<script>
				/*jQuery(window).load(function(){
					jQuery(".vidbox_video_cont").each(function(){
						//jQuery(this).children(".vidbox-media").find("#vidbox_video")[0].currentTime = 0;
						//jQuery(this).children(".vidbox-media").find("#vidbox_video")[0].pause();

						jQuery(this).children(".vidbox-text").find("#vidbox_btn_title").hover(function(){
							jQuery(this).parent(".vidbox-text").prev().find("#vidbox_video")[0].play();
						}, function(){
							jQuery(this).parent(".vidbox-text").prev().find("#vidbox_video")[0].currentTime = 0;
							jQuery(this).parent(".vidbox-text").prev().find("#vidbox_video")[0].pause();
						});

						jQuery(this).find(".vidbox-media").hover(function(){
							jQuery(this).find("#vidbox_video")[0].play();
						}, function(){
							jQuery(this).find("#vidbox_video")[0].currentTime = 0;
							jQuery(this).find("#vidbox_video")[0].pause();
						});

					});
				});*/

				function in_func( i ){
					pvid = document.getElementById( 'vidbox_video_'+i );
					pvid.play();
				}

				function out_func( i ){
					svid = document.getElementById( 'vidbox_video_'+i );
					svid.currentTime = 0.2;
					svid.pause();
				}
			</script>
			<style>
				.cls_vidbox_btn_vds:hover{
					opacity: 1 !important;
				}
                .cls_vidbox_btn_vds{}
                .poster {
                    position: relative;
                    height: 0;
                    padding-top: 56.5%;
                    background-size: cover;
                }
			</style>

			<div class="row mainfix">
                <div class="col-sm-4 vidbox fix vidbox_video_cont">
					<div class="vidbox-media">
						<a onmouseover="in_func(1)" onmouseout="out_func(1)" class=" cls_vidbox_btn_vds" id="vidbox_btn_vds" href="/rentals/camera-department/">
                            <div class="poster visible-xs-block" style="background-image:url(https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020147/cameras.png);"></div>
							<video   class="hidden-xs"  id="vidbox_video_1" style="width: 100%; height: 100%;" poster="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020147/cameras.png" autobuffer="true">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020152/cameras.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020153/cameras.webm" type="video/webm">
							</video>

						<h4 class="vidbox_array_item_title">Cameras</h4></a>
					</div>
				</div>
				<div class="col-sm-4 vidbox fix vidbox_video_cont">
					<div class="vidbox-media">
						<a onmouseover="in_func(2)" onmouseout="out_func(2)" class=" cls_vidbox_btn_vds" id="vidbox_btn_vds" href="/rentals/grip/">
                            <div class="poster visible-xs-block" style="background-image:url(https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020148/grip1.png);"></div>
							<video  class="hidden-xs" id="vidbox_video_2" style="width: 100%; height: 100%;" poster="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020148/grip1.png" autobuffer="true">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020155/grip_converted.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020200/grip.webm" type="video/webm">
							</video>
						<h4 class="vidbox_array_item_title">Grip</h4></a>
					</div>
				</div>
				<div class="col-sm-4 vidbox fix vidbox_video_cont">
					<div class="vidbox-media">
						<a onmouseover="in_func(3)" onmouseout="out_func(3)" class=" cls_vidbox_btn_vds" id="vidbox_btn_vds" href="/rentals/support/dolly/">
                            <div class="poster visible-xs-block" style="background-image:url(https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020150/rigs.png);"></div>
							<video   class="hidden-xs"  id="vidbox_video_3" style="width: 100%; height: 100%;" poster="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020150/rigs.png" autobuffer="true">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020202/rigs_converted.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020203/rigs.webm" type="video/webm">
							</video>
						<h4 class="vidbox_array_item_title">Dolly &amp; Jibs</h4></a>
					</div>
				</div>
				</div>

                <div class="row mainfix">
                    <div class="col-sm-4 vidbox fix vidbox_video_cont">
					<div class="vidbox-media">
						<a onmouseover="in_func(4)" onmouseout="out_func(4)" class=" cls_vidbox_btn_vds" id="vidbox_btn_vds" href="/expendables/">
                            <div class="poster visible-xs-block" style="background-image:url(https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020145/expendibles.png);"></div>
							<video   class="hidden-xs"  id="vidbox_video_4" style="width: 100%; height: 100%;" poster="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020145/expendibles.png" autobuffer="true">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020157/expendibles_converted.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020159/expendibles.webm" type="video/webm">
							</video>
						</a>
					</div>
					<div class="vidbox-text bd">
						<a onmouseover="in_func(4)" onmouseout="out_func(4)" id="vidbox_btn_title" href="/product-category/expendables/"><h4 class="vidbox_array_item_title">Expendables &amp; Sales</h4></a>
					</div>
				</div>
				<div class="col-sm-4 vidbox fix vidbox_video_cont">
					<div class="vidbox-media">
						<a onmouseover="in_func(5)" onmouseout="out_func(5)" class=" cls_vidbox_btn_vds" id="vidbox_btn_vds" href="/rentals/stillphoto/">
                            <div class="poster visible-xs-block" style="background-image:url(https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020143/stillphoto.png);"></div>
							<video   class="hidden-xs"  id="vidbox_video_5" style="width: 100%; height: 100%;" poster="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020143/stillphoto.png" autobuffer="true">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020205/stillphoto_converted.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">
								<source src="https://assets.redmanmovies.com/wp-content/uploads/2016/11/21020206/stillphoto.webm" type="video/webm">
							</video>
						<h4 class="vidbox_array_item_title">Still Photo</h4></a>
					</div>
				</div>
				</div></div>
