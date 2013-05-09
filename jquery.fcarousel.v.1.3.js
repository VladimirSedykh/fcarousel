/*

 Мой тестовый плагин для создания карусели v 1.3.

 ---------------------------------

 Рабочие (на данный момент) опции:

 visible:       3,
 autoPlay:      false,
 showControls:  true
 stepTime :     500,
 delay :        5000,
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
         delay : 5000
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
               $ul.children().each(function() {
                  // оборачиваю li элементы в боксы.
                  $(this).wrap('<div class="el-wrap">')
               });
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
            }

         }

         // Задаю "глобальные" переменные.
         var $this = $(this);
         var $ul = $this.children(':first');
         var itemsTotal = $ul.children().length;
         var longest_child = settings.elWidth || functions.longestChild($ul);  // определяю самый длинный li элемент
         var cur = 0; // текущий шаг.

         // Применяю css стили.
         functions.styles();

         // Функция движения при клике на кнопки навигации.
         $('.nav-arrow').click(function(){
            functions.m0ve($(this));
         });
         // Если выбрана опция autoplay.
         functions.isAutoplay();

      });
   };
})(jQuery);

