/*

 Мой тестовый плагин для создания карусели v 1.4.

 ---------------------------------

 Рабочие (на данный момент) опции:

 visible:       3,
 autoPlay:      false,
 showControls:  true
 stepTime :     500,
 delay :        5000,
 placeholders:  true
 elWidth :      нет дефолтного значения (устанавливает длину внутренних эелментов карусели)

 ----------------------------------

 Пример использования

 <div class="your_div">
    <div class="your_div_inner">
       <img src="images/bright.png">
       <div>Text</div>
       <a>new link</a>
       <span>Text</span>
    </div>
 </div>

 Подключение

 $('.your_div').myCarousel({
    visible : 3,
    stepTime : 2000,
    autoPlay : true
 });

 ----------------------------------

*/

(function($){
   $.fn.myCarousel = function(options) {

      // Стандартные опции (доп опция: elWidth : ...).
      var settings = {
         visible: 3,
         autoPlay: false,
         showControls: true,
         next: 'arrow-right',
         prev: 'arrow-left',
         stepTime : 500,
         delay : 5000,
         placeholders: true
      };

      return this.each(function() {

         // Обновляю стандартные опции.
         if (options) {
            $.extend(settings, options);
         }

         // Пакую стили карусели.
         var css = {
            arrow : {
               all : {
                  display : (settings.showControls === false) ? 'none' : 'block',
                  width : '50',
                  height : '50',
                  background: 'green',
                  cursor : 'pointer',
                  position : 'absolute',
                  bottom : 0
               },
               right : {
                  background : 'red',
                  right : 0
               }
            },
            ul : {
               position : 'relative',
               width : 9999 + 'px',
               left : 0
            },
            plh : {
               float : 'left',
               cursor : 'pointer',
               display : (settings.placeholders === true) ? 'block' : 'none'
            }
         }

         // Пакую функции.
         var functions = {

            // Функция стилей.
            styles : function () {
               $this.css({
                  'position': 'relative',
                  'overflow': 'hidden',
                  'width': settings.visible * longest_child + 'px'
               });
               $ul.css(css.ul);

               // Добавляю плейсхолдеры.
               var counter = 1;
               $('<div>', { 
                  'class' : 'placeholders'
               }).appendTo($this);

               $ul.children().each(function() {
                  // оборачиваю li элементы в боксы.
                  $(this).wrap('<div class="el-wrap">')

                  // Добавляю плейсхолдер каждому элементу карусели.
                  $('<a>', {
                     'goto' : counter,
                     'class' : 'plh',
                     'html' : counter
                  }).appendTo('.placeholders');
                  counter +=1;         
               });
               $('.plh').css(css.plh);

               $('.el-wrap').css({
                  'width' : longest_child + 'px',
                  'float' : 'left'
               });

               // Создаю кнопки навигации.
               $('<a>', {
                  'id' : settings.prev.replace('#', ''),
                  'class': 'nav-arrow'
               }).appendTo($this);
               $('<a>', {
                  'id' : settings.next,
                  'class': 'nav-arrow'
               }).appendTo($this);
               $('#arrow-left, #arrow-right').css(css.arrow.all);
               $('#arrow-right').css(css.arrow.right);
            },

            // Функция движения.
            m0ve : function(el) {
               var dir = (el.attr('id') === settings.prev) ? 'prev' : 'next';
               (dir === 'next') ? cur-=1 : cur+=1;
               (Math.abs(cur) >= itemsTotal - settings.visible+1 || cur > 0) ? cur = 0 : false;
               $ul.stop().animate({
                  'left' : longest_child * cur
               }, settings.stepTime);
            },

            // Функция опеределяет самый длинный элемент карусели.
            longestChild : function(el) {
               var b = 0;
               var li = el.children();
               li.each(function(){
                  var e = $(this).css({
                     'display': 'inline-block'
                  });
                  b = (e.width() > b) ? e.width() : b ;
               });
               return b;
            },

            // Функция задает автоматическую прокрутку карусели.
            isAutoplay : function() {
               (settings.autoPlay === true) ? setInterval(function(){ functions.m0ve($this); }, settings.delay) : false ;
            },

            // Определяю лимит прокрутки  для крайних элементов карусели.
            toPlaceLimit : function(){
               $('.plh').each(function(){
                  ( (itemsTotal - $(this).attr('goto') + 1) === settings.visible ) ?
                     limit = $(this).attr('goto') 
                     :
                     false ;
               });
               return limit;
            },

            // Реализую анимацию плейсхолдеров
            toPlace : function(el){
               var goto = ( (itemsTotal - el.attr('goto') + 1) < settings.visible ) ?
                               goto = functions.toPlaceLimit()
                               :
                               goto = el.attr('goto') ;
               $ul.stop().animate({
                  'left' : - longest_child * (goto - 1)
               }, settings.stepTime);
            }

         }

         // Задаю "глобальные" переменные.
         var $this = $(this);
         var $ul = $this.children(':first');
         var itemsTotal = $ul.children().length;
         var longest_child = settings.elWidth || functions.longestChild($ul);  // определяю самый длинный li элемент
         var cur = 0; // текущий шаг.
         var limit

         // Применяю css стили.
         functions.styles();

         // Функция движения при клике на кнопки навигации.
         $('.nav-arrow').click(function(){
            functions.m0ve($(this));
         });
         $('.plh').click(function(){
            functions.toPlace($(this));
         });
       
         // Если выбрана опция autoplay.
         functions.isAutoplay();

      });
   };
})(jQuery);

