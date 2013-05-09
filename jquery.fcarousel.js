(function($){
   $.fn.myCarousel = function(options) {
      var settings = {
         visible: 3,
         autoPlay: true,
         showControls: true,
         circle: true,
         next: 'arrow-right',
         prev: 'arrow-left'
      };

      var css = {
         arrow : {
            all : { 'width': '50', 'height': '50', background: 'green', display: 'block', 'cursor': 'pointer', 'position': 'absolute', 'bottom' : 0 },
            right : { 'background': 'red', 'right': 0 }
         }
      }
      return this.each(function() {
         if (options) {
            $.extend(settings, options);
         }

         function LongestChild(el){
            var b = 0;
            var li = el.children();
            li.each(function(){
               var e = $(this).css({
                  'display': 'inline-block'
               });
               b = (e.width() > b) ? e.width() : b ;
            });
            return b;
         }

         function m0ve(el){
            var dir = (el.attr('id') == settings.prev) ? 'prev' : 'next';
            (dir == 'prev') ? cur=cur-1 : cur=cur+1;
            (Math.abs(cur) >= itemsTotal - settings.visible+1 || cur > 0) ? cur = 0 : false;
            $ul.animate({
               'left' : longest_child * cur
            }, 500);
         }

         var $this = $(this);
         var $ul = $this.children(':first');
         var itemsTotal = $ul.children().length;
         var longest_child = settings.elWidth || LongestChild($ul);  // определяю самый длинный li элемент
         var cur = 0; // текущий шаг

         $this.css({
            'position': 'relative',
            'overflow': 'hidden',
            'width': settings.visible * longest_child + 'px'
         });
         $ul.css({
            'position': 'relative',
            'width': 9999 + 'px',
            'left': 0
         });
         $ul.children().each(function(){
            // оборачиваю li элементы в боксы
            $(this).wrap('<div class="el-wrap">')
         });
         $('.el-wrap').css({
            'width' : longest_child + 'px',
            'float' : 'left'
         });

         // Создаю кнопки навигации.
         $('<a>', {
            'id' : settings.prev,
            'class': 'nav-arrow'
         }).appendTo($this);
         $('<a>', {
            'id' : settings.next,
            'class': 'nav-arrow'
         }).appendTo($this);

         $('#arrow-left, #arrow-right').css(css.arrow.all);
         $('#arrow-right').css(css.arrow.right);

         $('.nav-arrow').click(function(){
            m0ve($(this));
         });
         //console.log(settings, itemWidth, itemsTotal);
      });
   };
})(jQuery);

/*
Мой тестовый плагин для создания карусели (пока не цикличной).

$('.test-carousel').myCarousel({
   visible: 3,
   elWidth: 240
});

*/