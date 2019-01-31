<template>
  <div>
    	<!-- Preloder -->
    	<!-- <div id="preloder">
    		<div class="loader"></div>
    	</div> -->


    	<!-- Header section start -->
    	<header class="header-section">
    		<div class="container">
    			<div class="header-warp">
    				<!-- Site Logo -->
    				<a href="#" class="site-logo">
    					<img src="../../../static/view/img/logo.png" alt="">
    				</a>
    				<!-- Site Menu -->
    				<div class="responsive-switch"><i class="fa fa-bars"></i></div>
    				<nav class="site-menu">
    					<div class="sm-close"><i class="ti-close"></i></div>
    					<ul class="menu-list">
    						<li><a href="#home">Home</a></li>
    						<li><a href="#about">About</a></li>
    						<li><a href="#resume">Resume</a></li>
    						<li><a href="#works">Works</a></li>
    						<li><a href="#contact">Contact</a></li>
    					</ul>
    				</nav>
    			</div>
    		</div>
    	</header>
    	<!-- Header section end -->


    	<!-- Hero section start -->
    	<section class="hero-section set-bg" id="home" data-setbg="../../../static/view/img/bg.jpg">
    		<div class="hero-content">
    			<h2>Hello, I'm @<br>Creative Designer.</h2>
    			<i class="fa fa-angle-down"></i>
    		</div>
    	</section>
    	<!-- Hero section end -->



    	<!-- Contact section start -->
    	<section class="contact-section spad" id="contact">
    		<div class="container">
    			<div class="section-title">
    				<p>Contact</p>
    				<h2>Get in touch</h2>
    			</div>
    			<div class="row">
    				<div class="col-lg-8 offset-lg-2">
    					<div class="row">
    						<!-- contact info -->
    						<div class="col-sm-4 cont-info wow fadeInUp" data-wow-delay="0.2s">
    							<i class="ti-email"></i>
    							<a href="mailto:office@domain.com">office@domain.com</a>
    							<p>email</p>
    						</div>
    						<!-- contact info -->
    						<div class="col-sm-4 cont-info wow fadeInUp" data-wow-delay="0.4s">
    							<i class="ti-location-pin"></i>
    							<span>35 M St, Sydney, 560, AU </span>
    							<p>Address</p>
    						</div>
    						<!-- contact info -->
    						<div class="col-sm-4 cont-info wow fadeInUp" data-wow-delay="0.6s">
    							<i class="ti-mobile"></i>
    							<span>+00 123 456 7890</span>
    							<p>Phone</p>
    						</div>
    					</div>
    					<!-- contact form -->
    					<form action="mail.php" method="POST" class="contact-form" id="contact-form">
    						<div class="row">
    							<div class="col-sm-6">
    								<input type="text" name="name" id="name" required placeholder="Your Name">
    							</div>
    							<div class="col-sm-6">
    								<input type="email" name="email" id="email" required placeholder="Email address">
    							</div>
    							<div class="col-sm-12">
    								<textarea id="massage" name="massage" required placeholder="Your Massage"></textarea>
    								<div class="text-center">
    									<button type="submit" class="site-btn" id="send-form">Send Massege</button>
    								</div>
    							</div>
    						</div>
    					</form>
    				</div>
    			</div>
    		</div>
    	</section>
    	<!-- Contact section end -->


    	<!-- Footer section start -->
    	<footer class="footer-section spad set-bg" data-setbg="../../../static/view/img/footer-bg.svg">
    		<div class="container">
    			<div class="social-links">
    				<a href="#" class="facebook wow fadeInDown" data-wow-delay="0.2s"><i class="fa fa-facebook"></i></a>
    				<a href="#" class="twitter wow fadeInDown" data-wow-delay="0.4s"><i class="fa fa-twitter"></i></a>
    				<a href="#" class="dribbble wow fadeInDown" data-wow-delay="0.6s"><i class="fa fa-dribbble"></i></a>
    				<a href="#" class="behance wow fadeInDown" data-wow-delay="0.8s"><i class="fa fa-behance"></i></a>
    			</div>
    			<!-- copyright -->
    			<p class="copyright">Copyright &copy; 2018 KNIT, More Templates <a href="http://www.cssmoban.com/" target="_blank" title="模板之家">模板之家</a> - Collect from <a href="http://www.cssmoban.com/" title="网页模板" target="_blank">网页模板</a></p>
    		</div>
    	</footer>

  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created() {

  }
}
</script>
<style scoped>

</style>
