 function validation() {
     $().acknowledgeinput();
     $('#awesomeForm').isHappy({
         fields: {
             // reference the field you're talking about, probably by `id`
             // but you could certainly do $('[name=name]') as well.
             '#yourName': {
                 required: true,
                 message: 'Might we inquire your name'
             },
             '#email': {
                 required: true,
                 message: 'How are we to reach you sans email??',
                 test: happy.email // this can be *any* function that returns true or false
             }
         }
     });
 }

 function maintenance() {
     $(".maintenance").backstretch("assets/img/big/5.jpg");
     $(".maintenance").fadeIn();
 }

 function bootstrapselect() {
     $('.selectpicker').selectpicker();
 }

 function browserreject() {
     $('#reject').click(function () {
         $.reject({
             reject: {
                 safari: true, // Apple Safari
                 chrome: true, // Google Chrome
                 firefox: true, // Mozilla Firefox
                 msie: true, // Microsoft Internet Explorer
                 opera: true, // Opera
                 konqueror: true, // Konqueror (Linux)
                 unknown: true // Everything else
             },
             imagePath: 'assets/jreject/images/'
         }); // Customized Browsers

         return false;
     });
 }

 function flotcharts() {


     // We use an inline data source in the example, usually data would
     // be fetched from a server



     // Set up the control widget



 }

 function xcharts() {


 }

 function othercharts() {

 }

 function chosen() {

 }

 function bootstrapmultiselect() {

 }

 function blogpost() {

 }

 function biccal() {

 }

 function gallery() {
     'use strict';

     // Load demo images from flickr:
     $.ajax({
         url: (window.location.protocol === 'https:' ?
             'https://secure' : 'http://api') +
             '.flickr.com/services/rest/',
         data: {
             format: 'json',
             method: 'flickr.interestingness.getList',
             api_key: '7617adae70159d09ba78cfec73c13be3'
         },
         dataType: 'jsonp',
         jsonp: 'jsoncallback'
     }).done(function (result) {
         var linksContainer = $('#links'),
             baseUrl;
         // Add the demo images as links with thumbnails to the page:
         $.each(result.photos.photo, function (index, photo) {
             baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                 photo.server + '/' + photo.id + '_' + photo.secret;
             $('<a/>')
                 .append($('<img>').prop('src', baseUrl + '_s.jpg'))
                 .prop('href', baseUrl + '_b.jpg')
                 .prop('title', photo.title)
                 .attr('data-gallery', '')
                 .appendTo(linksContainer);
         });
     });

     $('#borderless-checkbox').on('change', function () {
         var borderless = $(this).is(':checked');
         $('#blueimp-gallery').data('useBootstrapModal', !borderless);
         $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', borderless);
     });

     $('#fullscreen-checkbox').on('change', function () {
         $('#blueimp-gallery').data('fullScreen', $(this).is(':checked'));
     });

     $('#image-gallery-button').on('click', function (event) {
         event.preventDefault();
         blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
     });

     $('#video-gallery-button').on('click', function (event) {
         event.preventDefault();
         blueimp.Gallery([{
             title: 'Sintel',
             href: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
             type: 'video/mp4',
             poster: 'http://media.w3.org/2010/05/sintel/poster.png'
         }, {
             title: 'Big Buck Bunny',
             href: 'http://upload.wikimedia.org/wikipedia/commons/7/75/' +
                 'Big_Buck_Bunny_Trailer_400p.ogg',
             type: 'video/ogg',
             poster: 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/70/' +
                 'Big.Buck.Bunny.-.Opening.Screen.png/' +
                 '800px-Big.Buck.Bunny.-.Opening.Screen.png'
         }, {
             title: 'Elephants Dream',
             href: 'http://upload.wikimedia.org/wikipedia/commons/transcoded/8/83/' +
                 'Elephants_Dream_%28high_quality%29.ogv/' +
                 'Elephants_Dream_%28high_quality%29.ogv.360p.webm',
             type: 'video/webm',
             poster: 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
                 'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
         }, {
             title: 'LES TWINS - An Industry Ahead',
             href: 'http://www.youtube.com/watch?v=zi4CIXpx7Bg',
             type: 'text/html',
             youtube: 'zi4CIXpx7Bg',
             poster: 'http://img.youtube.com/vi/zi4CIXpx7Bg/0.jpg'
         }, {
             title: 'KN1GHT - Last Moon',
             href: 'http://vimeo.com/73686146',
             type: 'text/html',
             vimeo: '73686146',
             poster: 'http://b.vimeocdn.com/ts/448/835/448835699_960.jpg'
         }], $('#blueimp-gallery').data());
     });
 }

 function formcomponents() {
     $("#mxlenght").maxlength({
         alwaysShow: true
     });
     $("#mxlenght2").maxlength({
         alwaysShow: true,
         threshold: 10,
         warningClass: "label label-success",
         limitReachedClass: "label label-danger",
         separator: ' of ',
         preText: 'You have ',
         postText: ' chars remaining.',
         validate: true
     });
     $('textarea').autosize();
     $(".selectpicker").select2();
     $(".dial").knob();
     $(".textarea").fseditor();
     $(".dial2").knob();
 }

 function bootstrapalerts() {

 }

 function datatables() {

 }

 function comingsoon() {
     $(".coming-soon").backstretch([
         "assets/img/big/1.jpg", "assets/img/big/2.jpg", "assets/img/big/3.jpg"
     ], {
         duration: 3000,
         fade: 750
     });
     $('.countdown').downCount({
         date: '09/09/2014 12:00:00',
         offset: +10
     });
 }

 function colorpicker() {

 }

 function components() {

 }

 function contact() {

 }

 function creativebuttons() {

 }

 function daterangepicker() {

 }

 function dragwidgets() {

 }

 function fueluxwizard() {


 }

 function fullcalendar() {


 }

 function googlemaps() {

 }

 function humanealerts() {

 }

 function icheck() {

 }

 function inbox() {

 }

 function ionsounds() {

 }

 function jqrangesliders() {

 }

 function jqueryui() {

 }

 function jqueryuislider() {

 }

 function jwizard() {
     $("#wizard").jWizard();
 }

 function laddabootstrap() {

 }

 function lightbox() {
     $(".boxer").boxer();
     $(".swipebox").swipebox();
     $('.colorbox').colorbox({
         rel: 'gal'
     });
 }

 function lockscreen() {

 }

 function login() {
     $(".login").backstretch("assets/img/big/1.jpg");
     $(".login-panel").fadeIn();
 }

 function markdown() {

 }

 function medium() {

 }

 function messengeralerts() {
     $('#messengerice').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
             theme: 'ice'
         }
         Messenger().post({
             message: 'There was an cat snooping around your request.',
             showCloseButton: true
         });
     });
     $('#messengerfuture').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
             theme: 'future'
         }
         Messenger().post({
             message: 'This is the future',
             showCloseButton: true
         });
     });
     $('#messengerflat').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
             theme: 'flat'
         }
         Messenger().post({
             message: 'Flat alert',
             showCloseButton: true
         });
     });
     $('#messengerblock').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
             theme: 'block'
         }
         Messenger().post({
             message: 'Block alert',
             showCloseButton: true
         });
     });
     $('#messengerair').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
             theme: 'air'
         }
         Messenger().post({
             message: 'nsjkandkjanskjdnijbf ... a cat walked on my keyboard',
             theme: 'air',
             showCloseButton: true
         });
     });
     $('#messengertopleft').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-top messenger-on-left',
             theme: 'flat'
         }
         Messenger().post({
             message: 'This is an ALERT',
             showCloseButton: true
         });
     });
     $('#messengertop').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-top',
             theme: 'flat'
         }
         Messenger().post({
             message: 'This is an ALERT',
             showCloseButton: true
         });
     });
     $('#messengertopright').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
             theme: 'flat'
         }
         Messenger().post({
             message: 'This is an ALERT',
             showCloseButton: true
         });
     });
     $('#messengerbottomright').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
             theme: 'flat'
         }
         Messenger().post({
             message: 'This is an ALERT',
             showCloseButton: true
         });
     });
     $('#messengerbottom').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom',
             theme: 'flat'
         }
         Messenger().post({
             message: 'This is an ALERT',
             showCloseButton: true
         });
     });
     $('#messengerbottomleft').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left',
             theme: 'flat'
         }
         Messenger().post({
             message: 'This is an ALERT',
             showCloseButton: true
         });
     });
     $('#messengerlaunch').click(function () {
         Messenger.options = {
             extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left'
         }
         var i;

         i = 0;

         Messenger().run({
             errorMessage: 'Destroying the planet',
             successMessage: 'Planet destroyed!',
             action: function (opts) {
                 if (++i < 3) {
                     return opts.error({
                         status: 500,
                         readyState: 0,
                         responseText: 0
                     });
                 } else {
                     return opts.success();
                 }
             }
         });

     });
 }

 function newsarticle() {
     $("textarea").fseditor();
 }

 function nouislider() {
     var slider3 = $('#slider7');

     slider3.noUiSlider({
         range: [0, 100],
         start: 80,
         handles: 1,
         connect: true
     });

     $("#slider7_set").click(function () {

         // Set the slider value to 20
         slider3.val(20);
     });
     var slider2 = $('#slider6'),
         inp1 = slider2.parent().find('[name="val1"]'),
         inp2 = slider2.parent().find('[name="val2"]')

         slider2.noUiSlider({
             range: [20, 60],
             start: [30, 50],
             connect: true,
             serialization: {
                 // provide 2 jQuery objects
                 to: [inp1, inp2],
                 // round to 1 decimal
                 resolution: 0.1
             }

             // listen to the form change event
         });
     var slider1 = $('#slider5'),
         inp2 = slider1.parent().find('[name="val3"]')

         slider1.noUiSlider({
             range: [20, 60],
             start: [30, 50],
             connect: true,
             serialization: {
                 // define a name for a new input field,
                 // and pass a jQuery object with another.
                 to: ["val1", inp2],
                 // round to 0 decimals
                 resolution: 1
             }

         });
     $("#slider1").noUiSlider({
         start: [20, 80],
         range: [0, 100],
         connect: true,
         handles: 2
     });
     $("#slider2").noUiSlider({
         range: [20, 100],
         start: [40, 80],
         step: 1,
         connect: true,
         slide: function () {
             var values = $(this).val();

             $(this).next('span').text(
                 values[0] + " - " + values[1]
             );
         }
     });
     $('#slider3').noUiSlider({
         range: [0, 100],
         start: [40, 80],
         step: 1,
         connect: true
     });

     $("#slider3-checkbox")
         .click(function () {
             if (this.checked) {
                 // Disable the slider
                 $("#slider3").attr("disabled", "disabled");
             } else {
                 // Enabled the slider
                 $("#slider3").removeAttr("disabled");
             }
         });
 }

 function photogrid() {
     $('.photoset-grid-lightbox').photosetGrid({
         highresLinks: true,
         rel: 'gallery',
         gutter: '20px',

         onComplete: function () {
             $('.photoset-grid-lightbox').attr('style', '');
             $('.photoset-grid-lightbox a').colorbox({
                 photo: true,
                 scalePhotos: true,
                 maxHeight: '90%',
                 maxWidth: '90%'
             });
         }
     });
 }

 function pinesalerts() {
     $('#changeing_notice').click(function () {
         $.pnotify({
             title: 'Notice',
             text: 'Right now I\'m a notice.',
             before_close: function (pnotify) {
                 pnotify.pnotify({
                     title: 'Error',
                     text: 'Uh oh. Now I\'ve become an error.',
                     type: 'error',
                     before_close: function (pnotify) {
                         pnotify.pnotify({
                             title: 'Success',
                             text: 'I fixed the error!',
                             type: 'success',
                             before_close: function (pnotify) {
                                 pnotify.pnotify({
                                     title: 'Info',
                                     text: 'Everything\'s cool now.',
                                     type: 'info',
                                     before_close: null
                                 });
                                 pnotify.pnotify_queue_remove();
                                 pnotify.effect('bounce');
                                 return false;
                             }
                         });
                         pnotify.pnotify_queue_remove();
                         pnotify.effect('bounce');
                         return false;
                     }
                 });
                 pnotify.pnotify_queue_remove();
                 pnotify.effect('bounce');
                 return false;
             }
         });
     });
     $('#dyn_notice').click(function () {
         var percent = 0;
         var notice = $.pnotify({
             title: "Please Wait",
             type: 'info',
             icon: 'picon picon-throbber',
             hide: false,
             closer: false,
             sticker: false,
             opacity: .75,
             shadow: false,
             width: "150px"
         });

         setTimeout(function () {
             notice.pnotify({
                 title: false
             });
             var interval = setInterval(function () {
                 percent += 2;
                 var options = {
                     text: percent + "% complete."
                 };
                 if (percent == 80) options.title = "Almost There";
                 if (percent >= 100) {
                     window.clearInterval(interval);
                     options.title = "Done!";
                     options.type = "success";
                     options.hide = true;
                     options.closer = true;
                     options.sticker = true;
                     options.icon = 'picon picon-task-complete';
                     options.opacity = 1;
                     options.shadow = true;
                     options.width = $.pnotify.defaults.width;
                     //options.min_height = "300px";
                 }
                 notice.pnotify(options);
             }, 120);
         }, 2000);
     });
     $('#show_stack_info').click(function () {
         var modal_overlay;
         if (typeof info_box != "undefined") {
             info_box.pnotify_display();
             return;
         }
         info_box = $.pnotify({
             title: "Pines Notify Stacks",
             text: "Stacks are used to position notices and determine where new notices will go when they're created. Each notice that's placed into a stack will be positioned related to the other notices in that stack. There is no limit to the number of stacks, and no limit to the number of notices in each stack.",
             type: "info",
             icon: "picon picon-object-order-raise",
             delay: 20000,
             history: false,
             stack: false,
             before_open: function (pnotify) {
                 // Position this notice in the center of the screen.
                 pnotify.css({
                     "top": ($(window).height() / 2) - (pnotify.height() / 2),
                     "left": ($(window).width() / 2) - (pnotify.width() / 2)
                 });
                 // Make a modal screen overlay.
                 if (modal_overlay) modal_overlay.fadeIn("fast");
                 else modal_overlay = $("<div />", {
                     "class": "ui-widget-overlay",
                     "css": {
                         "display": "none",
                         "position": "fixed",
                         "top": "0",
                         "bottom": "0",
                         "right": "0",
                         "left": "0"
                     }
                 }).appendTo("body").fadeIn("fast");
             },
             before_close: function () {
                 modal_overlay.fadeOut("fast");
             }
         });
     });
 }

 function profile() {
     $('#textarea').wysihtml5();
     $(".selectpicker").select2();
     $("#sparkline").sparkline([5, 9, 4, 8, 4, 6, 8, 11, 6, 5, 8, 10], {
         type: 'line',
         width: '100%',
         height: '100px',
         lineColor: '#cccccc',
         fillColor: '#ffffff',
         lineWidth: 5,
         spotColor: '#cccccc',
         highlightSpotColor: '#cccccc',
         highlightLineColor: '#777777',
         minSpotColor: '#cccccc',
         maxSpotColor: '#cccccc'
     });
     $("#sparkline2").sparkline([5, 6, 7, 2, 0, -4, -2, 4, 7, 6, 2, 1, 5, 9, 6, 3, 1, -1, -2], {
         type: 'bar',
         width: '100%',
         height: '200px',
         barWidth: 10,
         tooltip: 'false',
         barSpacing: 5,
         barColor: '#cccccc',
         negBarColor: '#7f7f7f',
         zeroColor: '#cccccc'
     });
 }

 function register() {
     $(".register").backstretch("assets/img/big/1.jpg");
     $(".register-panel").fadeIn();
 }

 function select2() {
     $("#e1").select2();
     $("#e2").select2();
     $("#e4").select2({
         placeholder: "Select a State",
         allowClear: true
     });
     $("#e3").select2({
         placeholder: "Select a State"
     });
     $("#e5").select2({
         minimumInputLength: 2
     });
     $("#e6").select2({
         maximumSelectionSize: 3
     });
     $("#e7").select2();
     $("#e8").val(["AL", "AZ"]).select2();
     $("#e8_init").click(function () {
         $("#e8").select2();
     });
     $("#e8_destroy").click(function () {
         $("#e8").select2("destroy");
     });
     $("#e9").select2();
     $("#e9_2").select2();
     $("#e9_enable").click(function () {
         $("#e9,#e9_2").select2("enable", true);
     });
     $("#e9_disable").click(function () {
         $("#e9,#e9_2").select2("enable", false);
     });
     $("#e10").select2();
     $("#e10_set").click(function () {
         $("#e10").select2("data", [{
             id: "CA",
             text: "California"
         }, {
             id: "MA",
             text: "Massachusetts"
         }]);
     });
     $("#e11").select2()
     $("#e11_open").click(function () {
         $("#e11").select2("open");
     });
     $("#e11_close").click(function () {
         $("#e11").select2("close");
     });
 }

 function selectboxit() {
     $("#select").selectBoxIt();
     $("#select2").selectBoxIt({
         theme: "jqueryui"
     });
     $("#select3").selectBoxIt({
         showEffect: "fadeIn",
         showEffectSpeed: 400,
         hideEffect: "fadeOut",
         hideEffectSpeed: 400
     });

     $("#select4").selectBoxIt({
         showEffect: "shake",
         showEffectSpeed: 'slow',
         showEffectOptions: {
             times: 1
         },
         hideEffect: "explode"
     });
     $("#select5").selectBoxIt({
         native: true
     });
     $("#select6").selectBoxIt({
         defaultText: "Sample text here"
     });
     $("#select7").selectBoxIt({
         downArrowIcon: "icon-hand-down"
     });
     $("#select8").selectBoxIt();
     $("#select9").selectBoxIt();
     $("#select10").selectBoxIt();
     $("#select11").selectBoxIt();
     $("#select12").selectBoxIt();
     $("#select13").selectBoxIt();
     $("#select13").data("selectBox-selectBoxIt").remove(0);
     $("#select14").selectBoxIt();
     $("#select14").data("selectBox-selectBoxIt").remove([0, 1]);
     $("#select15").selectBoxIt();
 }

 function stepswizard() {
     $("#wizard3").steps({
         headerTag: "h2",
         bodyTag: "section",
         transitionEffect: "none",
         enableFinishButton: false,
         enablePagination: false,
         enableAllSteps: true,
         titleTemplate: "#title#",
         cssClass: "tabcontrol"
     });
     $("#wizard2").steps({
         headerTag: "h2",
         bodyTag: "section",
         transitionEffect: "slideLeft",
         stepsOrientation: "vertical"
     });
     $("#wizard").steps({
         headerTag: "h2",
         bodyTag: "section",
         transitionEffect: "slideLeft"
     });
 }

 function summernote() {
     $('#summernote').summernote({
         height: 300
     });
 }

 function tables() {
     $("#darktable").tablecloth({
         theme: "dark"
     });
     $("#statstable").tablecloth({
         theme: "stats"
     });
     $("#papertable").tablecloth({
         theme: "paper"
     });
 }

 function tagmanager() {
     var tag3 = jQuery("#tag-manager3").tagsManager({
         prefilled: ["Angola", "Laos", "Nepal"]
     });

     jQuery("#tag-manager3").typeahead({
         local: ['red', 'blue', 'green', 'yellow', 'violet', 'brown', 'purple', 'black', 'white']
     });
     jQuery("#tag-manager2").tagsManager({
         prefilled: ["Pisa", "Rome"]
     });
     jQuery("#tag-manager").tagsManager();
     jQuery("#tag-manager4").tagsManager();
     jQuery("#tag-manager5").tagsManager();
     jQuery("#tag-manager6").tagsManager();
     jQuery("#tag-manager7").tagsManager();
     jQuery("#tag-manager8").tagsManager();
 }

 function toastralerts() {
     var
     i = -1,
         toastCount = 0,
         $toastlast,
         getMessage = function () {
             var msgs = ['My name is Inigo Montoya. You killed my father. Prepare to die!',
                 '<div><input class="form-control" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>',
                 'Are you the six fingered man?',
                 'Inconceivable!',
                 'I do not think that means what you think it means.',
                 'Have fun storming the castle!'
             ];
             i++;
             if (i === msgs.length) {
                 i = 0;
             }

             return msgs[i];
         };
     $('#showtoast').click(function () {
         var shortCutFunction = $("#toastTypeGroup input:radio:checked").val();
         var msg = $('#message').val();
         var title = $('#title').val() || '';
         var $showDuration = $('#showDuration');
         var $hideDuration = $('#hideDuration');
         var $timeOut = $('#timeOut');
         var $extendedTimeOut = $('#extendedTimeOut');
         var $showEasing = $('#showEasing');
         var $hideEasing = $('#hideEasing');
         var $showMethod = $('#showMethod');
         var $hideMethod = $('#hideMethod');
         var toastIndex = toastCount++;

         toastr.options = {
             closeButton: $('#closeButton').prop('checked'),
             debug: $('#debugInfo').prop('checked'),
             positionClass: $('#positionGroup input:radio:checked').val() || 'toast-top-right',
             onclick: null
         };

         if ($('#addBehaviorOnToastClick').prop('checked')) {
             toastr.options.onclick = function () {
                 alert('You can perform some custom action after a toast goes away');
             };
         }

         if ($showDuration.val().length) {
             toastr.options.showDuration = $showDuration.val();
         }

         if ($hideDuration.val().length) {
             toastr.options.hideDuration = $hideDuration.val();
         }

         if ($timeOut.val().length) {
             toastr.options.timeOut = $timeOut.val();
         }

         if ($extendedTimeOut.val().length) {
             toastr.options.extendedTimeOut = $extendedTimeOut.val();
         }

         if ($showEasing.val().length) {
             toastr.options.showEasing = $showEasing.val();
         }

         if ($hideEasing.val().length) {
             toastr.options.hideEasing = $hideEasing.val();
         }

         if ($showMethod.val().length) {
             toastr.options.showMethod = $showMethod.val();
         }

         if ($hideMethod.val().length) {
             toastr.options.hideMethod = $hideMethod.val();
         }

         if (!msg) {
             msg = getMessage();
         }

         $("#toastrOptions").text("Command: toastr[" + shortCutFunction + "](\"" + msg + (title ? "\", \"" + title : '') + "\")\n\ntoastr.options = " + JSON.stringify(toastr.options, null, 2));

         var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
         $toastlast = $toast;
         if ($toast.find('#okBtn').length) {
             $toast.delegate('#okBtn', 'click', function () {
                 alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                 $toast.remove();
             });
         }
         if ($toast.find('#surpriseBtn').length) {
             $toast.delegate('#surpriseBtn', 'click', function () {
                 alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
             });
         }

         $('#clearlasttoast').click(function () {
             toastr.clear($toastlast);
         });
     });
     $('#cleartoasts').click(function () {
         toastr.clear();
     });
 }

 function treeview() {
     $('.tree-toggle').click(function () {
         $(this).parent().children('ul.tree').toggle(200);
     });
     var DataSource = function (options) {
         this._formatter = options.formatter;
         this._columns = options.columns;
         this._data = options.data;
     };

     DataSource.prototype = {

         columns: function () {
             return this._columns;
         },

         data: function (options, callback) {

             var self = this;
             if (options.search) {
                 callback({
                     data: self._data,
                     start: start,
                     end: end,
                     count: count,
                     pages: pages,
                     page: page
                 });
             } else if (options.data) {
                 callback({
                     data: options.data,
                     start: 0,
                     end: 0,
                     count: 0,
                     pages: 0,
                     page: 0
                 });
             } else {
                 callback({
                     data: self._data,
                     start: 0,
                     end: 0,
                     count: 0,
                     pages: 0,
                     page: 0
                 });
             }
         }
     };

     var treeDataSource = new DataSource({
         data: [{
             name: 'Folder 1',
             type: 'folder',
             additionalParameters: {
                 id: 'F1'
             },
             data: [{
                 name: 'Sub Folder 1',
                 type: 'folder',
                 additionalParameters: {
                     id: 'FF1'
                 }
             }, {
                 name: 'Sub Folder 2',
                 data: [{
                     name: 'sub sub folder 1',
                     type: 'folder',
                     additionalParameters: {
                         id: 'FF21'
                     }
                 }, {
                     name: 'sub sub item',
                     type: 'item',
                     additionalParameters: {
                         id: 'FI2'
                     }
                 }],
                 type: 'folder',
                 additionalParameters: {
                     id: 'FF2'
                 }
             }, {
                 name: 'Item 2 in Folder 1',
                 type: 'item',
                 additionalParameters: {
                     id: 'FI2'
                 }
             }]
         }, {
             name: 'Folder 2',
             type: 'folder',
             additionalParameters: {
                 id: 'F2'
             }
         }, {
             name: 'Item 1',
             type: 'item',
             additionalParameters: {
                 id: 'I1'
             }
         }, {
             name: 'Item 2',
             type: 'item',
             additionalParameters: {
                 id: 'I2'
             }
         }],
         delay: 400
     });

     $('#MyTree').tree({
         dataSource: treeDataSource
     });

     $('#tree-selected-items').on('click', function () {
         console.log("selected items: ", $('#MyTree').tree('selectedItems'));
     });

     $('#MyTree').on('loaded', function (evt, data) {
         console.log('tree content loaded');
     });

     $('#MyTree').on('opened', function (evt, data) {
         console.log('sub-folder opened: ', data);
     });

     $('#MyTree').on('closed', function (evt, data) {
         console.log('sub-folder closed: ', data);
     });

     $('#MyTree').on('selected', function (evt, data) {
         console.log('item selected: ', data);
     });
 }

 function vectormaps() {
     jQuery('#vmap').vectorMap({
         map: 'world_en',
         backgroundColor: '#ffffff',
         color: '#777777',
         hoverOpacity: 0.7,
         selectedColor: '#666666',
         enableZoom: true,
         showTooltip: true,
         values: sample_data,
         scaleColors: ['#C8EEFF', '#006491'],
         normalizeFunction: 'polynomial'
     });
     jQuery('#vmap-asia').vectorMap({
         map: 'asia_en',
         backgroundColor: '#ffffff',
         color: '#777777',
         hoverOpacity: 0.7,
         selectedColor: '#666666',
         enableZoom: true,
         showTooltip: true,
         values: sample_data,
         scaleColors: ['#C8EEFF', '#006491'],
         normalizeFunction: 'polynomial'
     });
     jQuery('#vmap-europe').vectorMap({
         map: 'europe_en',
         backgroundColor: '#ffffff',
         color: '#777777',
         hoverOpacity: 0.7,
         selectedColor: '#666666',
         enableZoom: true,
         showTooltip: true,
         values: sample_data,
         scaleColors: ['#C8EEFF', '#006491'],
         normalizeFunction: 'polynomial'
     });
     jQuery('#vmap-australia').vectorMap({
         map: 'australia_en',
         backgroundColor: '#ffffff',
         color: '#777777',
         hoverOpacity: 0.7,
         selectedColor: '#666666',
         enableZoom: true,
         showTooltip: true,
         values: sample_data,
         scaleColors: ['#C8EEFF', '#006491'],
         normalizeFunction: 'polynomial'
     });
     jQuery('#vmap-africa').vectorMap({
         map: 'africa_en',
         backgroundColor: '#ffffff',
         color: '#777777',
         hoverOpacity: 0.7,
         selectedColor: '#666666',
         enableZoom: true,
         showTooltip: true,
         values: sample_data,
         scaleColors: ['#C8EEFF', '#006491'],
         normalizeFunction: 'polynomial'
     });
     jQuery('#vmap-northamerica').vectorMap({
         map: 'north-america_en',
         backgroundColor: '#ffffff',
         color: '#777777',
         hoverOpacity: 0.7,
         selectedColor: '#666666',
         enableZoom: true,
         showTooltip: true,
         values: sample_data,
         scaleColors: ['#C8EEFF', '#006491'],
         normalizeFunction: 'polynomial'
     });
     jQuery('#vmap-southamerica').vectorMap({
         map: 'south-america_en',
         backgroundColor: '#ffffff',
         color: '#777777',
         hoverOpacity: 0.7,
         selectedColor: '#666666',
         enableZoom: true,
         showTooltip: true,
         values: sample_data,
         scaleColors: ['#C8EEFF', '#006491'],
         normalizeFunction: 'polynomial'
     });
 }

 function vexalerts() {
     $('.demo-login').click(function () {
         vex.defaultOptions.className = 'vex-theme-wireframe';
         vex.dialog.open({
             message: 'Enter your username and password:',
             input: '' +
                 '<input name="username" type="text" placeholder="Username" required />' +
                 '<input name="password" type="password" placeholder="Password" required />' +
                 '',
             buttons: [
                 $.extend({}, vex.dialog.buttons.YES, {
                     text: 'Login'
                 }),
                 $.extend({}, vex.dialog.buttons.NO, {
                     text: 'Back'
                 })
             ]
         });
     });
     $('.demo-setting').click(function () {
         vex.defaultOptions.className = 'vex-theme-top';
         vex.dialog.open({
             message: 'Change Setting:',
             input: '' +
                 '<input name="username" type="text" placeholder="Username" required />' +
                 '<input name="password" type="password" placeholder="Password" required />' +
                 '<input name="email" type="text" placeholder="Email" required />' +
                 '<input name="email again" type="password" placeholder="Email Again" required />' +
                 '',
             buttons: [
                 $.extend({}, vex.dialog.buttons.YES, {
                     text: 'Yes'
                 }),
                 $.extend({}, vex.dialog.buttons.NO, {
                     text: 'No'
                 })
             ]
         });
     });
     $('.demo-input').click(function () {
         vex.defaultOptions.className = 'vex-theme-default';
         vex.dialog.open({
             message: 'Change Name:',
             input: '' +
                 '<input name="input" type="text" placeholder="Input" required />' +
                 '',
             buttons: [
                 $.extend({}, vex.dialog.buttons.YES, {
                     text: 'Save'
                 }),
                 $.extend({}, vex.dialog.buttons.NO, {
                     text: 'Cancel'
                 })
             ]
         });
     });
     $('.demo-prompt').click(function () {
         vex.defaultOptions.className = 'vex-theme-default';
         vex.dialog.open({
             message: 'Integer mattis ipsum sed odio molestie euismod. Vestibulum nec nulla id enim pharetra elementum vitae sit amet lorem.',
             buttons: [
                 $.extend({}, vex.dialog.buttons.YES, {
                     text: 'OK'
                 }),
                 $.extend({}, vex.dialog.buttons.NO, {
                     text: 'Cancel'
                 })
             ]
         });
     });
     $('.demo-prompt2').click(function () {
         vex.defaultOptions.className = 'vex-theme-default';
         vex.dialog.open({
             message: 'Running out of ideas',
             buttons: [
                 $.extend({}, vex.dialog.buttons.YES, {
                     text: 'OK'
                 }),
                 $.extend({}, vex.dialog.buttons.NO, {
                     text: 'Cancel'
                 })
             ]
         });
     });
     $('.demo-buttons').click(function () {
         vex.defaultOptions.className = 'vex-theme-os';
         vex.dialog.open({
             message: 'Lots of buttons',
             buttons: [
                 $.extend({}, vex.dialog.buttons.YES, {
                     text: 'Button1'
                 }),
                 $.extend({}, vex.dialog.buttons.NO, {
                     text: 'Button2'
                 }),
                 $.extend({}, vex.dialog.buttons.YES, {
                     text: 'Button3'
                 }),
             ]
         });
     });
     $('.demo-message').click(function () {
         vex.defaultOptions.className = 'vex-theme-plain';
         vex.dialog.open({
             message: 'Nam sit amet ultricies mi, at scelerisque massa. Donec felis leo, accumsan vestibulum libero a, molestie eleifend dolor. Nunc aliquet nisl massa.'
         });
     });
     $('.demo-alert').click(function () {
         vex.defaultOptions.className = 'vex-theme-plain';
         vex.dialog.open({
             message: 'This is alot of alerts.'
         });
     });

     vex.defaultOptions.className = 'vex-theme-os';

     $('[data-theme]').each(function () {
         $(this).click(function (e) {
             e.preventDefault();
             vex.dialog.alert({
                 message: 'Testing the <code>' + $(this).data('theme') + '</code> theme.',
                 className: $(this).data('theme')
             });
             return false;
         });
     });
 }

 function widgets() {
     $("#sparkline").sparkline([5, 9, 4, 8, 4, 6, 8, 11, 6, 5, 8, 10], {
         type: 'line',
         width: '100%',
         height: '100px',
         lineColor: '#cccccc',
         fillColor: '#ffffff',
         lineWidth: 5,
         spotColor: '#cccccc',
         highlightSpotColor: '#cccccc',
         highlightLineColor: '#777777',
         minSpotColor: '#cccccc',
         maxSpotColor: '#cccccc'
     });
     $("#sparkline2").sparkline([5, 6, 7, 2, 0, -4, -2, 4, 7, 6, 2, 1, 5, 9, 6, 3, 1, -1, -2], {
         type: 'bar',
         width: '100%',
         height: '200px',
         barWidth: 18,
         barSpacing: 5,
         barColor: '#cccccc',
         negBarColor: '#7f7f7f',
         zeroColor: '#cccccc'
     });
     $("#sparkline3").sparkline([9, 6, 5, 2, 7], {
         type: 'pie',
         width: '200',
         height: '200',
         sliceColors: ['#aaa', '#bbb', '#ccc', '#ddd', '#777', '#666', '#0099c6', '#990099 ']
     });
     $(".todo li").mouseover(function () {
         $(this).find('i.todo-remove').fadeIn(100);
     });
     $(".todo li").mouseleave(function () {
         $(this).find('i.todo-remove').fadeOut(100);
     });
     $(".todo li a i.todo-remove").click(function () {
         $(this).parent().parent().slideUp();
     });
     $('.todo li a').click(function () {
         $(this).toggleClass('checked');
         $(this).find('i.check').toggleClass('fa-circle-o');
         $(this).find('i.check').toggleClass('fa-check-circle-o');
     });
     var skycons = new Skycons({
         "color": "#aaa"
     });

     // you can add a canvas by it's ID...
     skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

     skycons.add("icon3", Skycons.WIND);

     // ...or by the canvas DOM element itself.
     skycons.add(document.getElementById("icon2"), Skycons.RAIN);

     // start animation!
     skycons.play();
     $.fn.spin = function (opts) {
         this.each(function () {
             var $this = $(this),
                 data = $this.data();

             if (data.spinner) {
                 data.spinner.stop();
                 delete data.spinner;
             }
             if (opts !== false) {
                 data.spinner = new Spinner($.extend({
                     color: $this.css('color')
                 }, opts)).spin(this);
             }
         });
         return this;
     };

     function update() {
         var opts = {};
         $('input[min], select').each(function () {
             opts[this.name] = parseFloat(this.value);
         });
         $('input:checkbox').each(function () {
             opts[this.name] = this.checked;
         });
         $('.preview').spin(opts);
     }
     $('input[min], select').change(update);
     $('input:checkbox').click(update);
     update();
     $("select").selectBoxIt();
 }

 function writemessage() {
     $('#textarea').wysihtml5();
 }

 function wysihtml5editor() {
     $('#textarea').wysihtml5();
 }

 function xeditable() {
     //defaults
     $.fn.editable.defaults.url = '/post';

     //enable / disable
     $('#enable').click(function () {
         $('#user .editable').editable('toggleDisabled');
     });

     //editables
     $('#username').editable({
         url: '/post',
         type: 'text',
         pk: 1,
         name: 'username',
         title: 'Enter username'
     });

     $('#firstname').editable({
         validate: function (value) {
             if ($.trim(value) == '') return 'This field is required';
         }
     });

     $('#sex').editable({
         prepend: "not selected",
         source: [{
             value: 1,
             text: 'Male'
         }, {
             value: 2,
             text: 'Female'
         }],
         display: function (value, sourceData) {
             var colors = {
                 "": "gray",
                 1: "green",
                 2: "blue"
             },
                 elem = $.grep(sourceData, function (o) {
                     return o.value == value;
                 });

             if (elem.length) {
                 $(this).text(elem[0].text).css("color", colors[value]);
             } else {
                 $(this).empty();
             }
         }
     });

     $('#status').editable();

     $('#group').editable({
         showbuttons: false
     });

     $('#vacation').editable({
         datepicker: {
             todayBtn: 'linked'
         }
     });

     $('#dob').editable();

     $('#event').editable({
         placement: 'right',
         combodate: {
             firstItem: 'name'
         }
     });

     $('#meeting_start').editable({
         format: 'yyyy-mm-dd hh:ii',
         viewformat: 'dd/mm/yyyy hh:ii',
         validate: function (v) {
             if (v && v.getDate() == 10) return 'Day cant be 10!';
         },
         datetimepicker: {
             todayBtn: 'linked',
             weekStart: 1
         }
     });

     $('#comments').editable({
         showbuttons: 'bottom'
     });

     $('#note').editable();
     $('#pencil').click(function (e) {
         e.stopPropagation();
         e.preventDefault();
         $('#note').editable('toggle');
     });

     $('#state').editable({
         source: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
     });


     $('#fruits').editable({
         pk: 1,
         limit: 3,
         source: [{
             value: 1,
             text: 'banana'
         }, {
             value: 2,
             text: 'peach'
         }, {
             value: 3,
             text: 'apple'
         }, {
             value: 4,
             text: 'watermelon'
         }, {
             value: 5,
             text: 'orange'
         }]
     });

     $('#tags').editable({
         inputclass: 'input-large',
         select2: {
             tags: ['html', 'javascript', 'css', 'ajax'],
             tokenSeparators: [",", " "]
         }
     });

     var countries = [];
     $.each({
         "BD": "Bangladesh",
         "BE": "Belgium",
         "BF": "Burkina Faso",
         "BG": "Bulgaria",
         "BA": "Bosnia and Herzegovina",
         "BB": "Barbados",
         "WF": "Wallis and Futuna",
         "BL": "Saint Bartelemey",
         "BM": "Bermuda",
         "BN": "Brunei Darussalam",
         "BO": "Bolivia",
         "BH": "Bahrain",
         "BI": "Burundi",
         "BJ": "Benin",
         "BT": "Bhutan",
         "JM": "Jamaica",
         "BV": "Bouvet Island",
         "BW": "Botswana",
         "WS": "Samoa",
         "BR": "Brazil",
         "BS": "Bahamas",
         "JE": "Jersey",
         "BY": "Belarus",
         "O1": "Other Country",
         "LV": "Latvia",
         "RW": "Rwanda",
         "RS": "Serbia",
         "TL": "Timor-Leste",
         "RE": "Reunion",
         "LU": "Luxembourg",
         "TJ": "Tajikistan",
         "RO": "Romania",
         "PG": "Papua New Guinea",
         "GW": "Guinea-Bissau",
         "GU": "Guam",
         "GT": "Guatemala",
         "GS": "South Georgia and the South Sandwich Islands",
         "GR": "Greece",
         "GQ": "Equatorial Guinea",
         "GP": "Guadeloupe",
         "JP": "Japan",
         "GY": "Guyana",
         "GG": "Guernsey",
         "GF": "French Guiana",
         "GE": "Georgia",
         "GD": "Grenada",
         "GB": "United Kingdom",
         "GA": "Gabon",
         "SV": "El Salvador",
         "GN": "Guinea",
         "GM": "Gambia",
         "GL": "Greenland",
         "GI": "Gibraltar",
         "GH": "Ghana",
         "OM": "Oman",
         "TN": "Tunisia",
         "JO": "Jordan",
         "HR": "Croatia",
         "HT": "Haiti",
         "HU": "Hungary",
         "HK": "Hong Kong",
         "HN": "Honduras",
         "HM": "Heard Island and McDonald Islands",
         "VE": "Venezuela",
         "PR": "Puerto Rico",
         "PS": "Palestinian Territory",
         "PW": "Palau",
         "PT": "Portugal",
         "SJ": "Svalbard and Jan Mayen",
         "PY": "Paraguay",
         "IQ": "Iraq",
         "PA": "Panama",
         "PF": "French Polynesia",
         "BZ": "Belize",
         "PE": "Peru",
         "PK": "Pakistan",
         "PH": "Philippines",
         "PN": "Pitcairn",
         "TM": "Turkmenistan",
         "PL": "Poland",
         "PM": "Saint Pierre and Miquelon",
         "ZM": "Zambia",
         "EH": "Western Sahara",
         "RU": "Russian Federation",
         "EE": "Estonia",
         "EG": "Egypt",
         "TK": "Tokelau",
         "ZA": "South Africa",
         "EC": "Ecuador",
         "IT": "Italy",
         "VN": "Vietnam",
         "SB": "Solomon Islands",
         "EU": "Europe",
         "ET": "Ethiopia",
         "SO": "Somalia",
         "ZW": "Zimbabwe",
         "SA": "Saudi Arabia",
         "ES": "Spain",
         "ER": "Eritrea",
         "ME": "Montenegro",
         "MD": "Moldova, Republic of",
         "MG": "Madagascar",
         "MF": "Saint Martin",
         "MA": "Morocco",
         "MC": "Monaco",
         "UZ": "Uzbekistan",
         "MM": "Myanmar",
         "ML": "Mali",
         "MO": "Macao",
         "MN": "Mongolia",
         "MH": "Marshall Islands",
         "MK": "Macedonia",
         "MU": "Mauritius",
         "MT": "Malta",
         "MW": "Malawi",
         "MV": "Maldives",
         "MQ": "Martinique",
         "MP": "Northern Mariana Islands",
         "MS": "Montserrat",
         "MR": "Mauritania",
         "IM": "Isle of Man",
         "UG": "Uganda",
         "TZ": "Tanzania, United Republic of",
         "MY": "Malaysia",
         "MX": "Mexico",
         "IL": "Israel",
         "FR": "France",
         "IO": "British Indian Ocean Territory",
         "FX": "France, Metropolitan",
         "SH": "Saint Helena",
         "FI": "Finland",
         "FJ": "Fiji",
         "FK": "Falkland Islands (Malvinas)",
         "FM": "Micronesia, Federated States of",
         "FO": "Faroe Islands",
         "NI": "Nicaragua",
         "NL": "Netherlands",
         "NO": "Norway",
         "NA": "Namibia",
         "VU": "Vanuatu",
         "NC": "New Caledonia",
         "NE": "Niger",
         "NF": "Norfolk Island",
         "NG": "Nigeria",
         "NZ": "New Zealand",
         "NP": "Nepal",
         "NR": "Nauru",
         "NU": "Niue",
         "CK": "Cook Islands",
         "CI": "Cote d'Ivoire",
         "CH": "Switzerland",
         "CO": "Colombia",
         "CN": "China",
         "CM": "Cameroon",
         "CL": "Chile",
         "CC": "Cocos (Keeling) Islands",
         "CA": "Canada",
         "CG": "Congo",
         "CF": "Central African Republic",
         "CD": "Congo, The Democratic Republic of the",
         "CZ": "Czech Republic",
         "CY": "Cyprus",
         "CX": "Christmas Island",
         "CR": "Costa Rica",
         "CV": "Cape Verde",
         "CU": "Cuba",
         "SZ": "Swaziland",
         "SY": "Syrian Arab Republic",
         "KG": "Kyrgyzstan",
         "KE": "Kenya",
         "SR": "Suriname",
         "KI": "Kiribati",
         "KH": "Cambodia",
         "KN": "Saint Kitts and Nevis",
         "KM": "Comoros",
         "ST": "Sao Tome and Principe",
         "SK": "Slovakia",
         "KR": "Korea, Republic of",
         "SI": "Slovenia",
         "KP": "Korea, Democratic People's Republic of",
         "KW": "Kuwait",
         "SN": "Senegal",
         "SM": "San Marino",
         "SL": "Sierra Leone",
         "SC": "Seychelles",
         "KZ": "Kazakhstan",
         "KY": "Cayman Islands",
         "SG": "Singapore",
         "SE": "Sweden",
         "SD": "Sudan",
         "DO": "Dominican Republic",
         "DM": "Dominica",
         "DJ": "Djibouti",
         "DK": "Denmark",
         "VG": "Virgin Islands, British",
         "DE": "Germany",
         "YE": "Yemen",
         "DZ": "Algeria",
         "US": "United States",
         "UY": "Uruguay",
         "YT": "Mayotte",
         "UM": "United States Minor Outlying Islands",
         "LB": "Lebanon",
         "LC": "Saint Lucia",
         "LA": "Lao People's Democratic Republic",
         "TV": "Tuvalu",
         "TW": "Taiwan",
         "TT": "Trinidad and Tobago",
         "TR": "Turkey",
         "LK": "Sri Lanka",
         "LI": "Liechtenstein",
         "A1": "Anonymous Proxy",
         "TO": "Tonga",
         "LT": "Lithuania",
         "A2": "Satellite Provider",
         "LR": "Liberia",
         "LS": "Lesotho",
         "TH": "Thailand",
         "TF": "French Southern Territories",
         "TG": "Togo",
         "TD": "Chad",
         "TC": "Turks and Caicos Islands",
         "LY": "Libyan Arab Jamahiriya",
         "VA": "Holy See (Vatican City State)",
         "VC": "Saint Vincent and the Grenadines",
         "AE": "United Arab Emirates",
         "AD": "Andorra",
         "AG": "Antigua and Barbuda",
         "AF": "Afghanistan",
         "AI": "Anguilla",
         "VI": "Virgin Islands, U.S.",
         "IS": "Iceland",
         "IR": "Iran, Islamic Republic of",
         "AM": "Armenia",
         "AL": "Albania",
         "AO": "Angola",
         "AN": "Netherlands Antilles",
         "AQ": "Antarctica",
         "AP": "Asia/Pacific Region",
         "AS": "American Samoa",
         "AR": "Argentina",
         "AU": "Australia",
         "AT": "Austria",
         "AW": "Aruba",
         "IN": "India",
         "AX": "Aland Islands",
         "AZ": "Azerbaijan",
         "IE": "Ireland",
         "ID": "Indonesia",
         "UA": "Ukraine",
         "QA": "Qatar",
         "MZ": "Mozambique"
     }, function (k, v) {
         countries.push({
             id: k,
             text: v
         });
     });
     $('#country').editable({
         source: countries,
         select2: {
             width: 200
         }
     });

     $('#user .editable').on('hidden', function (e, reason) {
         if (reason === 'save' || reason === 'nochange') {
             var $next = $(this).closest('tr').next().find('.editable');
             if ($('#autoopen').is(':checked')) {
                 setTimeout(function () {
                     $next.editable('show');
                 }, 300);
             } else {
                 $next.focus();
             }
         }
     });

 }

 function index() {


     function clock() {
         var now = new Date();
         var outStr = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
         document.getElementById('clock').innerHTML = outStr;
         setTimeout('clock()', 1000);
     }
     clock();
     mesos = ["January", "February", "March", "April", "May", "June", "Julio", "August", "September", "October", "November", "December"];

     dias = ["L", "M", "Mi", "J", "V", "S", "D"];

     $('#cal').bic_calendar({
         nombresMes: mesos,
         dias: dias,
         req_ajax: {
             type: 'get',
             url: 'http://bic.cat/bic_calendar/index.php'
         }
     });
     $(".todo li").mouseover(function () {
         $(this).find('i.todo-remove').fadeIn(100);
     });
     $(".todo li").mouseleave(function () {
         $(this).find('i.todo-remove').fadeOut(100);
     });
     $(".todo li a i.todo-remove").click(function () {
         $(this).parent().parent().slideUp();
     });
     $('.todo li a').click(function () {
         $(this).toggleClass('checked');
         $(this).find('i.check').toggleClass('fa-circle-o');
         $(this).find('i.check').toggleClass('fa-check-circle-o');
     });
 }
