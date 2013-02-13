(function ($) {
	var highlighter = new function () {
		this.options = {
			'toolbar' : {				
				'checkenabled' : function () { return ($('input[name="autoload"]:checked').val() == 1) ? true : false; }
			},
			'vertical' : {
				'checkenabled' : function () {
					return highlighter.options.toolbar.checkenabled() ? false : (($('input[name="showVertical"]:checked').val() == 1) ? true : false);
				},				
				'options' : {
					'btnImgV': {						
						'selectedValue' : function () { return $('input[name="btnImgV"]:checked').val(); }
					},
					'distFromTop': {						
						'selectedValue' : function () { return (parseInt($('input[name="distFromTop"]').val(), 10) > 0) ? parseInt($('input[name="distFromTop"]').val(), 10) : 0; }
					},
					'leftOrRight': {						
						'selectedValue' : function () { return $('input[name="leftOrRight"]:checked').val(); }
					},
					'showcountV': {						
						'selectedValue' : function () { return $('select[name="showcountV"] option:selected').val(); }
					}
				}
			},
			'horizontal' : {
				'checkenabled' : function () {
					return highlighter.options.toolbar.checkenabled() ? false : (($('input[name="showHorizontal"]:checked').val() == 1) ? true : false);
				},				
				'options' : {
					'btnImg': {					
						'selectedValue' : function () { return $('input[name="btnImg"]:checked').val(); }
					},
					'showcount': {						
						'selectedValue' : function () { return $('select[name="showcount"] option:selected').val(); }
					}
				}
			}
		};
		//Function for changing state of all options
		this.changeState = function () {
			var op, r, enabled = false;
			for (op in this.options) {
				enabled = this.options[op].checkenabled();
				if (this.options[op].options) {
					for (r in this.options[op].options) {						
						if (enabled !== true) {
							$('input[name="' + r + '"], select[name="' + r + '"]').attr('disabled', 1).parents('.rooh-vtab-content-row').fadeTo('fast', 0.3);
						} else {
							$('input[name="' + r + '"], select[name="' + r + '"]').removeAttr('disabled').parents('.rooh-vtab-content-row').fadeTo('fast', 1);
						}
					}
				}
			}			
			this.updatePreview();
		};
		this.updatePreview = function () {
			var _this = this, c, ctx, baseimg = new Image(), imgtoshow, scalew, scaleh, dx, dy;
			c = $('#preview canvas').get(0);			
			ctx = c.getContext("2d");
			// We need to draw this option onto canvas. Load the base image on canvas first.
			if (this.options.toolbar.checkenabled()) {				
				$(c).hide();
				$('#preview img').show();				
			} else {
				baseimg.onload = function () {
					$('#preview img').hide();
					$(c).show();
					c.width = baseimg.width;
					c.height = baseimg.height;
					ctx.drawImage(baseimg, 0, 0, baseimg.width, baseimg.height, 0, 0, c.width, c.height);
					if (_this.options.vertical.checkenabled()) {
						var buttonimgv = new Image();
						buttonimgv.onload = function () {
							imgtoshow = _this.options.vertical.options.btnImgV.selectedValue();
							scalew = window.previewOptions.vertical.buttonCoords[imgtoshow].w / 800;
							scaleh = window.previewOptions.vertical.buttonCoords[imgtoshow].h / 600;
							var LorR = _this.options.vertical.options.leftOrRight.selectedValue();
							var dtop = _this.options.vertical.options.distFromTop.selectedValue();
							dx = (LorR === '0') ? 0 : c.width - c.width * scalew;
							dy = (dtop / 7 < c.height - c.height * scaleh) ? dtop / 7 : c.height - c.height * scaleh;
							ctx.drawImage(this, window.previewOptions.vertical.buttonCoords[imgtoshow].x, window.previewOptions.vertical.buttonCoords[imgtoshow].y, window.previewOptions.vertical.buttonCoords[imgtoshow].w, window.previewOptions.vertical.buttonCoords[imgtoshow].h, dx, dy, c.width * scalew, c.height * scaleh);
						};
						buttonimgv.src = window.rooh_domain_path + window.previewOptions.vertical.image;
					}
					if (_this.options.horizontal.checkenabled()) {
						var buttonimgh = new Image();
						buttonimgh.onload = function () {
							imgtoshow = _this.options.horizontal.options.btnImg.selectedValue();
							scalew = window.previewOptions.horizontal.buttonCoords[imgtoshow].w / 800;
							scaleh = window.previewOptions.horizontal.buttonCoords[imgtoshow].h / 600;
							dx = 75;
							dy = 153;
							ctx.drawImage(this, window.previewOptions.horizontal.buttonCoords[imgtoshow].x, window.previewOptions.horizontal.buttonCoords[imgtoshow].y, window.previewOptions.horizontal.buttonCoords[imgtoshow].w, window.previewOptions.horizontal.buttonCoords[imgtoshow].h, dx, dy, c.width * scalew, c.height * scaleh);
						};
						buttonimgh.src = window.rooh_domain_path + window.previewOptions.horizontal.image;
					}
				};
				baseimg.src = window.rooh_domain_path + window.previewOptions.baseimage;
			}
		};
		//Function to loop over each option, and include it to be sent to server
		this.getCurrentOptions = function () {
			var op, r, buttonOptions, data = {}, a = document.createElement('a'), url, name;
			//Add domain to the post data
			url = $('input[name="url"]').val();			
			a.href = /http:\/\//.test(url) ? url : 'http://' + url;
			if (a.hostname.length > 3) {
				$('input[name="url"]').val(a.href);
				data.url = url;
				data.domain = a.hostname;
				data.serviceLevel = $('input[name="serviceLevel"]').val();
				//Add typeOfSite to post data
				data.typeOfSite = $('input[name=typeOfSite]:checked').val();
				//Check if button or toolbar
				if (this.options.toolbar.checkenabled() == true) {
					data.autoload = 1;					
				} else {					
					buttonOptions = ['horizontal', 'vertical'];
					for (op in buttonOptions) {
						name = 'show' + buttonOptions[op].replace(/^([a-z])|\s+([a-z])/g, function ($1) {
								return $1.toUpperCase();
						});						
						if (this.options[buttonOptions[op]].checkenabled()) {
							data[name] = 1;						
							for (r in this.options[buttonOptions[op]].options) {																
								data[r] = this.options[buttonOptions[op]].options[r].selectedValue();								
							}
						}
						else {							
							data[name] = 0;							
						}
					}
				}
				return data;
			} else {				
				return false;
			}
		};
		this.showComparisionBox = function () {
			var data = this.getCurrentOptions();
			if(data) {
				$.fancybox({
					href: "#inner_table",
					'onComplete': function () {
						$('#inner_table .serviceLevel').filter('#service_' + data.serviceLevel).css('background-color', '#0ea');
						$('#inner_table .serviceLevel').click( function () {
							data.serviceLevel = this.id.replace('service_','');
							highlighter.showCodeBox(data);
						});
					}				
				});
			} else {
				$('#rooh-vtab ul li[rel="rooh-settings-panel"]').trigger('click');
				$('input[name="url"]').parent().addClass('required');
				$('input[name="url"]').focus();
				$('#url').show();
				$('#domain_sel').hide();
				setTimeout(function () { $('input[name=url]').parent().removeClass('required'); }, 3000);
				dhtmlx.alert({'title':'URL Missing', 'text':'Please input correct URL'});
			}			
		};
		this.showCodeBox = function (data) {
			$.fancybox({
				href: '#grab-code-vbtn',				
				'titlePosition'		: 'inside',
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'width'				: '600px',
				'onComplete' 		: function () {
					$.fancybox.showActivity();
					highlighter.getCodeFromServer(data);						
				},
				'onCleanup' :  function () {
					if(window.clip)
						window.clip.destroy();
					if(window.clip2)
					window.clip2.destroy();
				}
			});
		};
		this.getCodeFromServer = function (data) {			
			$.ajax({
				url: "getCode.php",
				type: 'POST',
				cache: false,
				data : data,
				dataType : 'json',
				async: false
				
			}).done(function( result ) {
				if(result && result.error == 0) {
					$('#code').val(result.code);
					if(result.paymentLink) {
						$('#paymentmsg').html('<a href="' + result.paymentLink + '" target="_blank">Pay Now</a>').show();
					}
					window.clip = new ZeroClipboard.Client();
					window.clip.setHandCursor(true);
					window.clip.setText();
					window.clip.addEventListener('mouseDown', function () {
						$('#code').select();
						window.clip.setText($('#code').val());
					});
					window.clip.addEventListener('complete', function () {
						$('#copy_complete').fadeIn('fast', function () {
							$('#copy_complete').fadeOut(2000);
						});
					});
					window.clip.glue('code');
					
					window.clip2 = new ZeroClipboard.Client();
					window.clip2.setHandCursor(true);
					window.clip2.setText();
					window.clip2.addEventListener('mouseDown', function () {
						$('#code').select();
						window.clip2.setText($('#code').val());
					});
					window.clip2.addEventListener('complete', function () {
						$.fancybox.close();
						dhtmlx.message('Code Copied!', 'wrapper');
					});
					window.clip2.glue('grabcode');

					$(window).bind('resize, scroll', function () {
						window.clip.reposition();
						window.clip2.reposition();
					});
					highlighterOptions.user[data.domain] = result.highlighter;
					$('a#sel').trigger('click');
					createdomainselector(data.domain);						
					$.fancybox.hideActivity();
				} else {
					//Error generating code
					dhtmlx.alert(result.error); 
				}
			}).fail(function() {
				$.fancybox.hideActivity();
				//Display Error for not logged in
				$.fancybox({
					'href' : '#loginBox',
					'modal' : true,
					'titlePosition'		: 'inside',
					'transitionIn'		: 'none',
					'transitionOut'		: 'none',
					'width'				: '600px'
				});				
			});
		};
		function createdomainselector(op) {
			var domain_selector = '';				
			for (var domain in highlighterOptions.user) {
				domain_selector += '<option value="' + domain + '"';
				if(op == domain) {
					domain_selector += ' selected ';
				}
				domain_selector += '>' + domain + '</option>';
			}
			$('select[name=domain_sel]').html(domain_selector).trigger('change');
		}
		function changeValues(option) {
			for (var r in option) {							
				if(option[r] != null) {
					var input = $('input[name="' + r + '"], select[name="' + r + '"]');
					type = (input.prop('tagName') == 'INPUT') ? input.attr('type').toUpperCase() : input.prop('tagName');
					if(type == 'CHECKBOX' || type == 'RADIO') {
						input.removeAttr('checked').filter('[value=' + option[r] + ']').attr('checked', 1);						
					}
					else if(type == 'SELECT') {
						input.val(option[r]);
						input.trigger('change');
					}	
					else {
						input.val(option[r]);					
					}					
				}				
			}	
			highlighter.changeState();			
		}
		$(document).ready(function () {
			//Create Canvas Element and prepend to div#preview
			var canvas = document.createElement("canvas");
			$("#preview").prepend(canvas);			
			if (typeof FlashCanvas != "undefined") {
				FlashCanvas.initElement(canvas);
			}
			$('a#sel').click(function () {
				$('select[name=domain_sel] option:first').attr('selected',1);
				$('select[name=domain_sel]').trigger('change');
				$('#url').hide();
				$('#domain_sel').show();
			});
			$('a#add').click(function () {
				$('#grab-code-btn').trigger('click');
			});
			$('a#addnewdomain').click(function () {
				$('#domain_sel').hide();				
				$('div#url').show();
				changeValues(highlighterOptions.defaults);
			});			
			$('select[name=domain_sel]').bind('change', function () {				
				changeValues(highlighterOptions.user[$(this).val()]);				
			});
			//Tabbed Panels
			var $tabs = $('#rooh-vtab>ul>li');
			var items = $tabs.map(function() {
				return $('#' + $(this).attr('rel')).get(0);
			});
			$(items).css('display','none');
			$('#' + $tabs.filter('.selc').attr('rel')).css('display', 'none').fadeIn('slow');	
			$tabs.bind('click', function(e) {
				var $this = $(this);
				e.preventDefault();
				if($this.hasClass('disabled') == false) {			
					$tabs.removeClass('selc');	
					$(items).css('display', 'none');			
					$('#' + $this.attr('rel')).css('display', 'none').fadeIn('slow');
					$this.addClass('selc');
				}
			});
			//Disable Horizontal, Vertical Panels when Toolbar option is selected
			$('input[name="autoload"]').change(function(e) {
				if($('input[name="autoload"]:checked').val() == 1) {
					$('#rooh-vtab ul li[rel^="rooh-btn"]').addClass('disabled');					
				} else {
					$('#rooh-vtab ul li[rel^="rooh-btn"]').removeClass('disabled');					
				}		
			});			
			//Attach change event to showcount select box
			$('select.showcount').change(function () {
				var name = $(this).attr('name');
				var btns = ['.' + name + '_0', '.' + name + '_1', '.' + name + '_2'];				
				$(btns.join(', ')).css('visibility','hidden');
				$(btns[$(this).val()]).css('visibility','visible');
			}).trigger('change');
			//Attach click event to grab code button		
			$('.red-btn-big, #upgradeLevel').click(function(e) { e.preventDefault(); highlighter.showComparisionBox(); });
			//Update Preview on any change to options
			$('#rooh-vtab').on('change', 'input, select', function () { highlighter.changeState($(this).attr('name')); });
			highlighter.changeState();
			$('#url, #domain_sel').hide();				
			//Trigger a custom function when typeOfSite changes
			$('input[name=typeOfSite]').on('change', function() {
				var val = $(this).val();
				if(val == 'custom') {
					$('.customplatform').fadeIn(1000);
				} else if(val == 'anywebsite') {
					$('.customplatform').fadeOut(1000);
				}
				$(document).trigger('SiteTypeChange', val); 
			});
			$(window).load(function() {
				$('input[name=typeOfSite]:checked').trigger('change');
				if(jQuery.isEmptyObject(highlighterOptions) == false) {					
					if(jQuery.isEmptyObject(highlighterOptions.saved) == false) {
						changeValues(highlighterOptions.saved);
						$('#url').show();
						$('#domain_sel').hide();
						dhtmlx.message('Restored your last selected options.', 'wrapper');
					}
					else {
						if(jQuery.isEmptyObject(highlighterOptions.user) == false) {							
							$('#url').hide();
							$('#domain_sel').show();
							createdomainselector();
						}
						else {
							changeValues(highlighterOptions.defaults);
							$('#url').show();							
							$('#domain_sel, a#sel, a#add').hide();
						}
					}					
				}				
			});
		});
	}();	
}(jQuery));