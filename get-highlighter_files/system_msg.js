function setSystemMsgCoord(div_id) {
   var sys_msg = document.createElement('div');
   var msg_div = document.createElement('div');
   var msg_text = document.createElement('p');
   msg_text.setAttribute("id", "msgtxt");
   msg_div.appendChild(msg_text);
   msg_div.setAttribute("id", "msg_div");
   msg_div.setAttribute("class", "msg_div");
   sys_msg.setAttribute("id", "system_msg");
   sys_msg.setAttribute("style", "display:none; top:0px;");
   sys_msg.appendChild(msg_div);
   $('#' + div_id).append(sys_msg);
}

function setSystemMsg(msg, color, toShow, effect, speed, duration, img) {
try {

   //if (color == '')  ; // do nothing
   // else $('#msg_div').css('background-color', color) ; Commented out to test using default color
   if (effect == '') effect = 'slide' ;
   if (speed == '') speed = 'slow' ;
   if (duration == '') duration = 4000 ;
   /*
   if (img == '') // do nothing
   else  ; //toShow the image
   */
   // toShow it
   // right now show fade in time 2 seconds.
   // Hide fade out time 3 seconds.

   if (color == 'pink') $('#msg_div').css('background-color', color) ;
   if (msg == '') return ;

   if (toShow == 1) {
      // if toShow, then keep the message up and hide it after duration
      $('#msg_div').html("<p>" + msg + "</p>") ;
      //else $('#msg_div').html(msg) ;
      $('#system_msg').show() ;
      if (duration > 0)
         setTimeout( "$('#system_msg').hide()", duration) ;
   }
   else if (toShow == 2) {
      // if toShow == 2, then keep the message up and do not hide it
      $('#msg_div').html("<p>" + msg + "</p>") ;
      $('#system_msg').show() ;
   }
   else {
      // Hide it.
      //setTimeout("$('#system_msg').toggle(speed)", duration) ;     // this does not work. We shud use speed as passed in by calling function
      // if hide, hide existing message first, then toShow new message and then fade it away in 4 seconds.
      if (msg == '') return ;
      else $('#msg_div').html(msg) ;
      $('#system_msg').hide(3000) ;
   }
 } catch(err) { trace('Error while showing message.') ; }

}