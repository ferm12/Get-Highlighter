(function($){
   $.fn.mousetip = function(options, successCallBack) {
      //set defaults var
      var defaults = {
         bookmarkletId: "dragbkmk-roohitdragbtn",
         idleTime: 2000,
         tipIE: "<strong>Right Click</strong> the gray button, choose <strong>Add To Favorites</strong>, create in <strong>Favorites Bar</strong>",
         tipIdle: [ "Go ahead and <strong>mouse over </strong>the gray button", "Just <strong>click down and drag</strong> it to your Bookmarks Bar.", "It's <strong>very easy!</strong> I know you can do it.", "Go ahead and <strong>mouse over </strong>the gray button" ],
         tipHover: "That's it, now <strong>Click down</strong> to drag",
         tipHoverOut: "Oops, you moved away from it..",
         tipDown: "Excellent, now <strong>Drag</strong> it up (to your Bookmark Bar)",
         tipDrag: "That's right, keep dragging it up (to Bookmark Bar)",
         tipDragAway: "No, no, drag it to the top please",
         tipDragMore: "Keep going, just a little bit more :)",
         tipOverBar: "Now <strong>drop</strong> it",
         tipOutBar: "Oops, you moved away from the bookmark bar",
         tipDrop: "Oh no, you dropped it in wrong place.. No problem, let's try it again :)",
         tipSuccess: "Wonderful! I knew you could do it<br/>now that you see <span style='color:#333333;'>Rooh.it</span> in your Bookmarks bar, <a onClick='closeSlider();'>close this</a>"
      };
      //overide defaults var with given options param
      var opt = $.extend(defaults, options);

      var bookmarklet = $("."+opt.bookmarkletId);





      var that = $(this);


      //state
      var DROP=1, HOVER=2,DOWN=10,DRAG=11,DRAGAWAY=12,DRAGMORE=13,OVERBAR=20,OUTBAR=21;
      var state;

      var tip1 = $("<div style='position:absolute;bottom:0px;width:100%;'>"+opt.tipIdle[0]+"</div>").appendTo(that);
      var tip2 = $("<div style='position:absolute;bottom:0px;width:100%;display:none'></div>").appendTo(that);

      //store the current tip
      var tip = "" ;

      //store for idle function id
      var idleFunc;

      //location y of last pointer
      var lastY;


      //change the current tip with given param tip
      function changeTip(tipWillBeShow) {
         if (tipWillBeShow != tip && (tip != opt.tipSuccess || tipWillBeShow == opt.tipHover)) {
            tip = tipWillBeShow;
            tip2.html(tip);
            tip1.fadeOut('fast');
            tip2.fadeIn('fast', function() {
               var temp = tip1; tip1 = tip2; tip2 = temp;
            });

         }
      }

      function setIdle(i) {
         if (i >= opt.tipIdle.length) i = 0;
         if (i < opt.tipIdle.length)
            idleFunc = setTimeout(function(){
                  changeTip(opt.tipIdle[i]);
                  setIdle(i+1);
               }, opt.idleTime);
      }

      // Returns IE version or -1 if not IE
      function getIEVersion() {
         var ver = -1;
         if (navigator.appName == 'Microsoft Internet Explorer') {
           var ua = navigator.userAgent;
           var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
           if (re.exec(ua) != null)
             ver = parseFloat( RegExp.$1 );
         }
         return ver;
      }

      return this.each(function() {
         //detect IE version, if IE 8- then show tipIE
         var ieVer = getIEVersion();
         if (ieVer > -1 && ieVer < 9) {
            changeTip(opt.tipIE);
            bookmarklet.click(function(e) {
               e.preventDefault();
            });
            return;
         }
         setIdle(1);

         //bind event of mouseover, mouseout, and mousedown to bookmarklet
         bookmarklet.mouseover(function(e) {
            changeTip(opt.tipHover);
            state = HOVER;
            clearTimeout(idleFunc);
         }).mouseout(function(e) {
            if(state == HOVER) {
               changeTip(opt.tipHoverOut);
               setIdle(0);
            }
         }).mousedown(function(e) {
            state = DOWN;
            changeTip(opt.tipDown);
            clearTimeout(idleFunc);
         }).click(function(e) {
            e.preventDefault();
            state = HOVER;
            changeTip(opt.tipHover);
         });

         //bind event of drag in entire document
         document.ondragover = function(e) {
            // dragbar_edge is the distance from top where we set a boundry to show tip that they are dragging away
            // from the bookmarks bar.
            // It is around the bottom edge of the drag-to-bookmarkbar.
            
            // dist_dragmore is the distance from top where tip changes to "just a little more".
            
            var dragbar_edge = 180;
            var dist_dragmore = 30;
            if (opt.edgeoffset != undefined)
            {
               dragbar_edge = opt.edgeoffset;
               dist_dragmore = 120;
            }
            if (state >= DOWN) {
               // Added a scrollTop check
               
               if (e.pageY - $(document).scrollTop() <= 2) {      //to detect if mouse in toolbar. But it has a problem due to speed drag because javascript just can detect pageY when in document page not entire document.
                  changeTip(opt.tipOverBar);
                  state = OVERBAR;
               } else if (state == OVERBAR) {
                  changeTip(opt.tipOutBar);
                  state = OUTBAR;
               } else if (state != OUTBAR && e.pageY - $(document).scrollTop() <= dist_dragmore) {
                  changeTip(opt.tipDragMore);
                  state = DRAGMORE;
               } else if (state != OUTBAR && e.pageY - $(document).scrollTop() < dragbar_edge) {
                  changeTip(opt.tipDrag);
                  state = DRAG;
               } else if (e.pageY - $(document).scrollTop() > dragbar_edge ) {
                  changeTip(opt.tipDragAway);
                  state = DRAGAWAY;
               }
            }
         };
         document.ondragend = function(e){
            if (state == OVERBAR) {
               changeTip(opt.tipSuccess);
               $.confirm({
                           'title'      : 'Done',
                           'message'   : '<p>Can you see the &#9733;Rooh.it button in your Internet browser? <br><br>If not, press <strong>Ctrl+Shift+B</strong> to make your Bookmarks Bar visible & then try it.</p>',
                           'buttons'   : {
                              'Yes'   : {
                                 'class'   : 'blue',
                                 'action': function()
                                 {
                                    var roohComponents = GetCookie('components') ;
                                    roohComponents |= 1024 ;
                                    roohComponents &= ~512 ;//blank previous components

                                    SetCookie('components', roohComponents, 259200) ; // 259200 = 30 days
                                    if ($.isFunction(successCallBack))
                                       successCallBack.call();
                                 }
                              },
                              'No'   : {
                                 'class'   : 'gray',
                                 'action': function()
                                 {
                                    $('div.bar-instruction').show();
                                    $('div.bar-instruction').css("color", "red");
                                 }
                              }
                           }
                        });


               /*
               exdate = new Date(2030,0,1);
               document.cookie = "bookmarklet=on; expires="+ exdate.toUTCString() + "; path=/";
               */


            } else {
               changeTip(opt.tipDrop);
               setIdle(0);
            }
            state = DROP;
         };
      });
   };
})(jQuery);
