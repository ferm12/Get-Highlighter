var root_url = 'http://roohit.net';
var rooh_path = '/2012a/html/';
var rooh_path_len = rooh_path.length;

window.fbAsyncInit = function() {
   FB.init({
      appId: '357001727658035', 
      cookie: true, 
      xfbml: false, //Changed XFBML parsed on window onLoad line 89
      oauth: true
   });
   
   FB.Event.subscribe('auth.logout', function(response) {
      window.location.href = root_url + rooh_path + 'logged-out.php';
   });
   
   FB.Event.subscribe('auth.login', function(response) {
      $.post(root_url + "/xd/fb_connect.php", {fb_token: response.authResponse.accessToken}, function(resp){
         var data = $.parseJSON(resp);
         SetCookie('id', data.id, 31536000);
         SetCookie('fb_userId', data.fb_userId, 31536000);
         SetCookie('enc4ticker', data.enc4ticker, 31536000);
         SetCookie('nick', data.nick, 31536000);
         //SetCookie('c6346359c72f0d28e27a', '29b77ff80658375b3bbe', 31536000);
      });
      if (window.location.pathname.substr(rooh_path_len) == '' 
          || window.location.pathname.substr(rooh_path_len) == 'index.php' 
          || window.location.pathname.substr(rooh_path_len) == 'logged-out.php' 
          || window.location.pathname.substr(rooh_path_len) == 'please-login-now.php'
         )
      {
         setTimeout("window.location.href = root_url + rooh_path + 'collection.php';", 1000);
      }
      else
      {
         setTimeout("window.location.reload();", 1000);
      }
   });
   
   FB.getLoginStatus(function(resp){
      if (resp.status === "connected") {
         $.post(root_url + "/xd/fb_connect.php", {fb_token: resp.authResponse.accessToken}, function(resp){
            var data = $.parseJSON(resp);
            SetCookie('id', data.id, 31536000);
            SetCookie('fb_userId', data.fb_userId, 31536000);
            SetCookie('enc4ticker', data.enc4ticker, 31536000);
            SetCookie('nick', data.nick, 31536000);
            //SetCookie('c6346359c72f0d28e27a', '29b77ff80658375b3bbe', 31536000);
         });
      } else if (resp.status === 'not_authorized') {
         // not connected to our app. Destroy Cookies
         SetCookie('fb_userId', '', -1);
         //SetCookie('id', '', -1);
         //SetCookie('enc4ticker', '', -1);
         //SetCookie('nick', '', -1);
         //SetCookie('c6346359c72f0d28e27a', '', -1);
      } else {
         // not logged into facebook.
         SetCookie('fb_userId', '', -1);
         //SetCookie('id', '', -1);
         //SetCookie('enc4ticker', '', -1);
         //SetCookie('nick', '', -1);
         //SetCookie('c6346359c72f0d28e27a', '', -1);
      }
   }); 
   
   $('#roohfb-logout').click(function(){
      FB.logout();
      //Clean out ALL session cookies VERY IMPORTANT for logout! or else base_facebook.php
      //will give OAuthExceptions
      //SetCookie('fbsr_' + '357001727658035', '', -1);
      //SetCookie('fbm_' + '357001727658035', '', -1);
      //SetCookie('PHPSESSID', '', -1);
      //SetCookie('fb_userId', '', -1);
      //SetCookie('id', '', -1);
      //SetCookie('enc4ticker', '', -1);
      //SetCookie('nick', '', -1);
      //SetCookie('c6346359c72f0d28e27a', 'bdb44ca97b9a1cd18a29', 31536000);
      //window.setTimeout("window.location.href = 'root_url + rooh_path + 'logged-out.php'", 500);
   });
   
   
};

/* 
 * Added to improve page render time. 
 * Parse Facebook XFBML including Login button and Like buttons on window onLoad 
 */
$(window).load(function () {
	FB.XFBML.parse();
});

(function(d){
   var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   d.getElementsByTagName('head')[0].appendChild(js);
}(document));