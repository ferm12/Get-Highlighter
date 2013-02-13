/*
* +--------------------------------------------------------------------------+
* | Copyright (c) 2006 RoohIt                   (email : support@roohit.com) |
* +--------------------------------------------------------------------------+
* | commonJS                                                                 |
* +--------------------------------------------------------------------------+
*/

/* vim: set expandtab tabstop=4 shiftwidth=4: */

if (window['domain_name'] == undefined)
    //var domain_name = 'roohit.com' ;
    var domain_name = 'roohit.net' ;
    
if (window['domain'] == undefined)
    var domain = '.' + domain_name ;


function sendBugReport(browserVer)
{
   if (browserVer == '') { browserVer = BrowserDetect.browser ; }
   var subj = ' Bug Report' ;
   var body = 'While using ' + browserVer + ', I ran into a problem on the page at ' + location.href + ' %0A%0ADetails of the problem are: %0A%0A' ;
   var to = 'support@roohit.com' ;

   location.href='mailto:' + to + '?subject=' + subj + '&body=' + body ;
}

function mailpage()
{
    mail_str = "mailto:?subject=Check this out " ;
    mail_str += "&body=I think this will interest you " + location.href;
    location.href = mail_str;
}

function printPage()
{
  if (window.print)
    window.print()
  else
    alert("Sorry, your browser doesn't support this feature.");
}





function removeHTMLTags(strInputCode)
{
    /*
            This line is optional, it replaces escaped brackets with real ones,
            i.e. < is replaced with < and > is replaced with >
    */
    strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
            return (p1 == "lt")? "<" : ">";
       });

    var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");

    // Use the alert below if you want to show the input and the output text
    //      alert("Input code:\n" + strInputCode + "\n\nOutput text:\n" + strTagStrippedText);

    return strTagStrippedText ;
}
// Got this from http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
function stripHTMLfromText(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function validateEmail(email)
{
   var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   email = email.replace(/;/, ",") ;
   to_arr = email.split(",");
   for(i = 0; i < to_arr.length; i ++ )
   {
      var addy = to_arr[i] ;
      // alert(addy) ;
      var strt = addy.indexOf("<") ;
      var endof = addy.indexOf(">") ;
      // alert (strt) ;
      // alert(endof) ;
      if (strt > - 1 && endof > - 1)
      {
         addy = addy.substring(strt + 1, endof) ;
      }
      addy = trim(addy) ;
      // alert (addy) ;
      if(addy != "")
      {
         if( ! emailPattern.test(addy))
         {
            return false ;
         }
      }
   }
   return true ;
}

function glob_replace(hay, needle, replacement)
{
   if(needle == '' || needle == null)
   {
      return hay;
      // if old id is not found then we shud replace the entire shinyurl link; as implemented is not right
   }
   else
   {
      var re = new RegExp(needle, "g");
      var str = hay.replace(re, replacement);
      return str;
   }
}




function getWdgtSnippet(enc4ticker)
{
    var html = "<object type='application/x-shockwave-flash' allowNetworking='all' data='" + base_url + "site/s_widget.swf?kR7s7Gj8uTzx07=" + enc4ticker + "' width='220' height='400' wmode='transparent'><param name='wmode' value='transparent' /><param name='movie' value='" + base_url + "site/s_widget.swf?kR7s7Gj8uTzx07="+ enc4ticker + "' /></object>" ;
    return html ;
}



function trim(stringToTrim) {
   return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
   return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
   return stringToTrim.replace(/\s+$/,"");
}
/*
function trim(str)
{
   str = str.toString();
   while (1)
   {
      if (str.substring(0, 1) != " ")
      {
         break;
      }
      str = str.substring(1, str.length);
   }
   while (1)
   {
      if (str.substring(str.length - 1, str.length) != " ")
      {
         break;
      }
      str = str.substring(0, str.length - 1);
   }
   return str;
}
*/

function GetWidth()
{
   var x = 0;
   if (document.documentElement && document.documentElement.clientHeight)
   {
      x = document.documentElement.clientWidth;
   }
   else if (document.body)
   {
      x = document.body.clientWidth;
   }
   else if (self.innerHeight)
   {
      x = self.innerWidth;
   }
   return x;
}

function GetHeight()
{
   var y = 0;
   if (document.documentElement && document.documentElement.clientHeight)
   {
      y = document.documentElement.clientHeight;
   }
   else if (document.body)
   {
      y = document.body.clientHeight;
   }
   else if (self.innerHeight)
   {
      y = self.innerHeight;
   }
   return y;
}

function stripCRLFnTabs(str)
{
   str = str.replace(/[\r\n\t]+/g," ") ;
   return str.replace(/[ ]+/g," ") ;
}
function stripEncodedCRLF(str)
{
   return str.replace(/(%0[dD]%0[aA])+/g," ") ;
}





/* login functions
 * used to control login forms
 * 9/8/11
 * Matt Drake
 */
base_url = window.base_url || '/';
var oldemail = '';
var workingImage = '<img src="' + base_url + '/images/1-1.gif"/>';
var verifyHTML = workingImage+' Verifying...';
var signinURL = base_url + 'site/signin.php';
function validate_login(type) {
   var user = $('form#frm_'+type+' input[name=username]').val();
   var pass = $('form#frm_'+type+' input[name=password]').val();
   var term = $('form#frm_'+type+' input[name=terms]').attr('checked');
   if (user.length == 0 || pass.length == 0) {
      $('#'+type+'_error').text('Please fill out the form completely');
      return false;
   } else if (!term) {
      $('#'+type+'_error').text('Please accept the terms');
      return false;
   }
   return true;
}
function submit_merge(e, merge) {
   evt = e || window.event;
   evt.preventDefault();
   var newusername = $('form#frm_login input[name=username]').val();
   var newpassword = $('form#frm_login input[name=password]').val();
   var newprovider = $('form#frm_login select[name=provider]').val();
   var oldpassword = $('form#frm_merge input[name=password]').val();
   if (merge) {
      if (oldpassword.length > 0) {
         $('#merge_error').html(verifyHTML);
      } else {
         alert('Please enter a pasword.');
         return;
      }
   }

   $.post('/site/mrgAcct.php',
      { newusername: newusername, newpassword: newpassword, newprovider: newprovider, oldemail: oldemail, oldpassword: oldpassword, merge: merge },
      function(resp) {
         resp = $.parseJSON(resp);
         if (resp.success) {
            location.reload();
         } else {
            $('#merge_error').text(resp.message);
         }
      }
   );
}
function submit_login(e) {
   evt = e || window.event;
   evt.preventDefault();
   $('#login_error').html(verifyHTML);
   if (validate_login('login')) {
      $.post(signinURL, $('#frm_login').serialize(), function(resp) {
         console.log(resp);
         resp = $.parseJSON(resp);
         if (resp.merge != null) {
            oldemail = resp.merge.email;
            $('.merge_email').text(resp.merge.email);
            $('div#loginNew').hide();
            $('div#loginMerge').show();
         } else if (resp.success) {
            location.reload();
         } else {
            $('#login_error').text(resp.message);
         }
      });
   }
}
function submit_contacts(e, getHL) {
   evt = e || window.event;
   evt.preventDefault();
   $('#contacts_error').html(verifyHTML);
   if (validate_login('contacts')) {
      $.post(signinURL, $('#frm_contacts').serialize(), function(resp) {
         resp = $.parseJSON(resp);
         if (resp.success) {
             if (getHL) {
                 $.get(location.href, function(data) {
                     var body = document.createElement('body');
                     body.innerHTML = data.match(/<body id="mainbody">([\s\S]+)<\/body>/)[1];
                     $('#content_main_menu').replaceWith($('#content_main_menu', body));
           $('#topnav').replaceWith($('#topnav', body));
           $('#topnav a').click(function(e) {
              $(this).addClass('menu-open');
              $('#signout_menu').show();
           });
           $('#signin_menu').replaceWith($('#signout_menu', body));
                     $('#login_lightbox').hide();
                 });
             }
             else {
                do_post(base_url+'populate_emails.php', '', async_email);
                $('#contacts_error').text('');
                $('#login_lightbox').hide();
                $('#eml_pop').show();
             }
         } else {
            $('#contacts_error').text(resp.message);
         }
      });
   }
}


var fbauth = null;
function facebook_login(auth, login) {
   var chk_perm = false;
   if (window['FB'] != undefined)
   {
      FB.api("/me/permissions", function (perm_resp) {
         if (perm_resp.data)
         {
            for (fb_perms in perm_resp.data[0])
            {
               if (fb_perms == "publish_actions")
               {
                  chk_perm = true;
                  fbauth = auth;
                  if (!login) {
                     $('div.fb-login-button > a').attr('onclick','').click(function() { facebook_login(null, true); });
                  }
               }
            }
         }
      });
   }
   if (auth != null && chk_perm == true) {
      fbauth = auth;
      if (!login) {
         $('div.fb-login-button > a').attr('onclick','').click(function() { facebook_login(null, true); });
      }
   }
   if (login) {
      $('#login_error').html(workingImage);
      $.post(signinURL, { fb_token: fbauth.accessToken }, function(resp) {
         //console.log(resp);
         location.reload();
      });
   }
}

/* login functions
 * END
 */
 
 
/*
    Seems like a useful function that we can use
    Got this from http://www.switchonthecode.com/tutorials/javascript-tutorial-simple-fade-animation
    Also see http://www.switchonthecode.com/tutorials/guide-to-simple-animations-in-jquery
*/
var TimeToFade = 1000.0;
function fade(eid)
{
  var element = document.getElementById(eid);
  if(element == null)
    return;

  if(element.FadeState == null)
  {
    if(element.style.opacity == null
        || element.style.opacity == ''
        || element.style.opacity == '1')
    {
      element.FadeState = 2;
    }
    else
    {
      element.FadeState = -2;
    }
  }

  if(element.FadeState == 1 || element.FadeState == -1)
  {
    element.FadeState = element.FadeState == 1 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;
  }
  else
  {
    element.FadeState = element.FadeState == 2 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade;
    setTimeout("animateFade(" + new Date().getTime() + ",'" + eid + "')", 33);
  }
}







function strpos (haystack, needle, offset) {
    // http://kevin.vanzonneveld.net
    // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
    // *     returns 1: 14
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}

function substr_replace (str, replace, start, length) {
    // http://kevin.vanzonneveld.net
    // *     example 1: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
    // *     returns 1: 'bob'
    // *     example 2: $var = 'ABCDEFGH:/MNRPQR/';
    // *     example 2: substr_replace($var, 'bob', 0, $var.length);
    // *     returns 2: 'bob'
    // *     example 3: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
    // *     returns 3: 'bobABCDEFGH:/MNRPQR/'
    // *     example 4: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
    // *     returns 4: 'ABCDEFGH:/bob/'
    // *     example 5: substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
    // *     returns 5: 'ABCDEFGH:/bob/'
    // *     example 6: 'substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)'
    // *     returns 6: 'ABCDEFGH://'
    if (start < 0) { // start position in str
        start = start + str.length;
    }
    length = length !== undefined ? length : str.length;
    if (length < 0) {
        length = length + str.length - start;
    }
    return str.slice(0, start) + replace.substr(0, length) + replace.slice(length) + str.slice(start + length);
}

function setDisplayById(theId, dispStyle)
{
    if (document.getElementById(theId) != null)
    {
        document.getElementById(theId).style.display = dispStyle ;
    }
}

function showElement(elemid) {
    var elem = document.getElementById(elemid);
    if (elem != null) {
        elem.style.display = '';
        elem.style.visibility = 'visible';
    }
}
function hideElement(elemid) {
    var elem = document.getElementById(elemid);
    if (elem != null) {
        elem.style.display = 'none';
        elem.style.visibility = 'hidden';
    }
}

function RTrimChar(inStr, theChar) {
    for (var cnt = inStr.length - 1;
        ((inStr.charAt(cnt) == theChar) && (inStr.charAt(cnt) != "")); // Why are we testing for AND with "" makes no sense to me
        cnt--);
    inStr = inStr.substring(0, cnt + 1);
    return inStr;
}




// Steven 12/13/2011 MyCookie Codes
///////////////////// COOKIE CODE BEGIN

function GetCookie(check_name)
{
    if (window.rooh_cookies)
        return rooh_cookies[check_name] || 0;

   // Done by SL on 12/15/2011
   var a_all_cookies = document.cookie.split( ';' );
   var a_temp_cookie = '';
   var cookie_name = '';
   var cookie_value = '';
   var b_cookie_found = false; // set boolean t/f default f

   for ( i = 0; i < a_all_cookies.length; i++ )
   {
      // now we'll split apart each name=value pair
      a_temp_cookie = a_all_cookies[i].split( '=' );
      // and trim left/right whitespace while we're at it
      cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
      // if the extracted name matches passed check_name
      if ( cookie_name == check_name )
      {
         b_cookie_found = true;
         // we need to handle case where cookie has no value but exists (no = sign, that is):
         if ( a_temp_cookie.length > 1 )
         {
            cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
         }
         // note that in cases where cookie is initialized but no value, null is returned
         return cookie_value;
         break;
      }
      a_temp_cookie = null;
      cookie_name = '';
   }
   if ( !b_cookie_found )
   {
      return 0;
   }
}

function SetCookie(name, value, expires, path, domain, secure)
{

   if (domain == undefined)
      domain = "." + domain_name ;

   if (path == undefined)
      path = "/" ;

   // set time, it's in milliseconds
   var today = new Date();
   today.setTime( today.getTime() );

   /*
   if the expires variable is set, make the correct expires time,
   the current script below will set it for x number of seconds,
   */
   if ( expires )    { expires = expires * 1000; }
   var expires_date = new Date( today.getTime() + (expires) );
   var expires_date = expires_date.toUTCString();

    if (window.rooh_cookies)
        return setAjaxCookie(name, value, expires_date, path, domain, secure);

   document.cookie = name + "=" +escape( value ) +
   ( ( expires ) ? ";expires=" + expires_date : "" ) +
   ( ( path ) ? ";path=" + path : "" ) +
   ( ( domain ) ? ";domain=" + domain : "" ) +
   ( ( secure ) ? ";secure" : "" );

   /* Old function: took an expireDate variable
   if (domain == undefined)
      domain = "." + domain_name ;
   document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toUTCString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
   */

}

function DeleteCookie(name, path, domain)
{
   if(GetCookie(name))
   {
      document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
   }
}

function getCookieVal(offset)
{
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == - 1)    endstr = document.cookie.length;
   return unescape(document.cookie.substring(offset, endstr));
}

function isCookieSet(name)
{
    if (window.rooh_cookies)
        return name in rooh_cookies;

   /* old code using indexOf a String
   var arg = name + "=";
   var ret = document.cookie.indexOf(arg);
   if(ret < 0)return false;
   else return true;
   */
   var all_cookies = document.cookie.split(';');
   var temp_cookie = '';
   var cookie_name = '';
   for (i = 0; i < all_cookies.length; i++)
   {
      temp_cookie = all_cookies[i].split('=');
      cookie_name = temp_cookie[0].replace(/^\s+|\s+$/g, '');
      if ( cookie_name == name ) return true;
   }
   return false;

}

function FixCookieDate(date)
{
   var base = new Date(0);
   var skew = base.getTime();
   if(skew > 0)    date.setTime(date.getTime() - skew);
}

// expiration is in miliseconds from now e.g. to expire cookie in 100 hours, expiration = 60 sec * 60 min * 100 hr * 1000 = 360000000
// Changed to seconds.
function incrementCookie(cookieName, expiration)
{
   var cookieVal = parseInt(GetCookie(cookieName));
   cookieVal ++ ;
   SetCookie(cookieName, cookieVal, expiration, "/");
}

function getAjaxCookie(cb) {
  var d = document;
  var s = d.createElement('script');
  s.src = base_url + 'xd/getAjaxCookie.php?cb=' + cb; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  d.getElementById('rooh_content').appendChild(s);
}

function setAjaxCookie(name, value, /*expires, path, domain, secure, */ cb) {
    rooh_cookies[name] = value;
    var cookieImg = document.createElement('img');
    var src = base_url + 'roohImg.php?';
    src += 'name=' + encodeURIComponent(name);
    if (value)   src += '&value='   + encodeURIComponent(value);
    /*
    if (expires) src += '&expires=' + encodeURIComponent(expires;
    if (path)    src += '&path='    + encodeURIComponent(path);
    if (domain)  src += '&domain='  + encodeURIComponent(domain);
    if (secure)  src += '&secure='  + encodeURIComponent(secure);
    */
    cookieImg.src = src;
    cookieImg.style.display = 'none';
    var root = document.getElementById('rooh_content') || document.body;
    root.appendChild(cookieImg);
    if(cb) cookieImg.onerror = cookieImg.onload = cb;
}



/* Cookie Standardization Functions BEGIN
 * used to eliminate .roohit.com and roohit.com cookies having the same name
 * 11/04/11
 * Rohit with StevenL
 */
function standardizeDomainForAllMyCookies()
{
   // This function will convert ALL cookies to be set to ".roohit.com" rather than window.location.host
   // If there are multiple cookies set under different domains, they will be re-set as one cookie under 
   // ".roohit.com" domain name with the most recently set value.
   // (for example: if I have 3 id cookies with values 1,2,3 set in that order under three different domain names:
   //   roohit.com, foo.roohit.com, this.roohit.com, this function will delete them all and re-set an id cookie
   //  with value of 3 under .roohit.com as the domain name.
   var all_cookies = document.cookie.split( ';' );
   // name=value pairs are split on ';'
   var a_temp_cookie = '';
   var cookie_name = '';
   var cookie_value = '';
   var expiredate = new Date();
   expiredate.setDate(expiredate.getDate() + 90);
   // Setting cookies again with 90 days expiration time.
   //alert ('Num of cookies found = ' + all_cookies.length ) ;
   for ( i = 0; i < all_cookies.length; i++)
   {
      a_temp_cookie = all_cookies[i].split( '=' );
      cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
      if(cookie_name == "PHPSESSID"|| cookie_name == "testcookie") continue;
      if (a_temp_cookie.length > 1 )
      {
         cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
      }
      standardizeDomainForACookie(cookie_name, cookie_value, expiredate);
      a_temp_cookie = null;
      cookie_name = '';
   }
}
function standardizeDomainForACookie(c_name, c_value, expire)
{
   /*
   alert(c_name + '=' + c_value) ;
   */
   // This helper function deletes the cookie and set a new cookie with ".roohit.com" as domain.
   document.cookie=c_name+"=0; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/;domain=;";
   // Deletes cookies with '/' as path.
   document.cookie=c_name+"="+c_value+"; expires="+expire.toUTCString()+"; path=/; domain="+domain+";";
   // Sets a brand new cookie with domain .roohit.com with 90 days expiration time with the same value and name as before.
}
function standardizeDomainForName(check_name)
{
   // Does the same thing as standardizeAllDomain() but only Re-sets the cookies with a given check_name
   var all_cookies = document.cookie.split( ';' );
   // name=value pairs are split on ';'
   var a_temp_cookie = '';
   var cookie_name = '';
   var cookie_value = '';
   var expiredate = new Date();
   expiredate.setDate(expiredate.getDate() + 90);
   // Setting cookies again with 90 days expiration time.
   for ( i = 0; i < all_cookies.length; i++)
   {
      a_temp_cookie = all_cookies[i].split( '=' );
      cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
      if(cookie_name == "PHPSESSID" || cookie_name == "testcookie") continue;
      if (a_temp_cookie.length > 1 )
      {
         cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
      }
      else
      {
         cookie_value = '';
      }
      if(check_name == cookie_name) standardizeDomainForACookie(cookie_name, cookie_value, expiredate);
      a_temp_cookie = null;
      cookie_name = '';
   }
}
function standardizeForDuplicateCookies()
{
   // Iterates through the document.cookie name=value pairs and checks to see if there is duplicate cookie
   // using indexOf cookie's name of an array that stores all the names that have been seen.
   // If a cookie name has been seen at least twice in document.cookie, its value is passed to
   // standardizeDomainForName to have its domain standardized to a .roohit domain.
   var all_cookies = document.cookie.split( ';' );
   // name=value pairs are split on ';'
   var a_temp_cookie = '';
   var cookie_name = '';
   var cookie_value = '';
   var expiredate = new Date();
   expiredate.setDate(expiredate.getDate() + 90);
   // Setting cookies again with 90 days expiration time.
   var temp_hold_arr = [];
   var numOfCks = all_cookies.length;
   for ( j = 0; j < numOfCks; j++)
   {
      a_temp_cookie = all_cookies[j].split( '=' );
      cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
      if(cookie_name == "PHPSESSID"|| cookie_name == "testcookie") continue;
      if (temp_hold_arr.indexOf(cookie_name) == -1) 
      {
         temp_hold_arr = temp_hold_arr.concat(cookie_name);
         continue;
      }
      if (a_temp_cookie.length > 1 )
      {
         cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
      }
      else
      {
         cookie_value = '';
      }
      standardizeDomainForACookie(cookie_name, cookie_value, expiredate);
      a_temp_cookie = null;
      cookie_name = '';
   }
}

/* Cookie Standardization Functions END 
 *
 */


/*
// this fixes an issue with the old method, ambiguous values
// with this test document.cookie.indexOf( name + "=" );
function Get_Cookie( check_name )
{
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split( ';' );
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for ( i = 0; i < a_all_cookies.length; i++ )
    {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split( '=' );


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if ( cookie_name == check_name )
        {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if ( a_temp_cookie.length > 1 )
            {
                cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if ( !b_cookie_found )
    {
        return null;
    }
}

function Set_Cookie( name, value, expires, path, domain, secure )
{
    if (domain == undefined)
      domain = "." + domain_name ;

    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );

    /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    * /
    if ( expires )    { expires = expires * 1000 * 60 * 60 * 24 ; }
    var expires_date = new Date( today.getTime() + (expires) );

    document.cookie = name + "=" +escape( value ) +
    ( ( expires ) ? ";expires=" + expires_date.toUTCString() : "" ) +
    ( ( path ) ? ";path=" + path : "" ) +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length

            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

// 11/4/11 
// Seems like no-one is calling this function -- Rohit Chandra
function setCookie(c_name,value,expiredays)
{
    path = '/' ;
    if (typeof domain_name === 'undefined') {
        domain_name = 'roohit.net' ;
        //domain_name = 'roohit.com' ;
    }
    domain = '.' + domain_name ;

    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );

    /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x seconds. To make it for
      minutes: multiply by 60
      hours:   multiply by 60 * 60
      days:    multiply by 60 * 60 * 24
    * /
    if ( expires )    { expires = expires * 1000 ; }
    var expires_date = new Date( today.getTime() + expires );

    document.cookie = c_name + "=" +escape( value )
      + ( ( expires ) ? ";expires=" + expires_date.toUTCString() : "" )
      + ( ( path ) ? ";path=" + path : "" )
      + ( ( domain ) ? ";domain=" + domain : "" )
      //+ ( ( secure ) ? ";secure" : "" )
      ;
}
*/

///////////////////// COOKIE CODE END




function rooh_dialog(text) {
  var dialog = $('#rooh_dialog');
  if (dialog.length == 0)
    dialog = $('<div id=rooh_dialog></div>').appendTo($('#rooh_content'));
  dialog.text(text);
  dialog.show();
}
