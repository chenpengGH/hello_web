/**
 * Created by Zong on 2017/5/6.
 * 图片预加载插件
 */
(function ($) {

    /**
     * 定义构造函数
     * imgs: 要加载的图片数组
     * opts: 加载完成的回调方法
      */
    function Preload (imgs, opts) {
        this.imgs = (typeof imgs === 'string')? [imgs]: imgs;
        this.opts = $.extend({}, Preload.DEFAULTS, opts);

        if(this.opts.ordered === 'ordered') {
            this._ordered();  //  有序预加载方法
        } else {
            this._unoredered(); //  执行无序加载方法
        }
    }
    Preload.DEFAULTS = {
        ordered: 'unoredered',  //  无序预加载
        each: null, //  数组中每张图片加载完成执行的函数
        all: null   //  数组中所有图片加载完成执行的函数
    };
    Preload.prototype._unoredered = function () {  //  无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {
            if (typeof src != 'string') return;  //  src若不是字符串，就直接返回

            var imgObj = new Image();

            $(imgObj).on('load error', function (event) {
                count++;

                opts.each && opts.each(event, count, i, src);

                if (count >= len) {
                    opts.all && opts.all();
                }

            });

            imgObj.src = src;
        })
    },
    Preload.prototype._ordered = function () {  //  有序预加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        load();

        function load() {
            var imgObj = new Image();

            $(imgObj).on('load error', function (event) {
                count++;

                opts.each && opts.each(event, count, imgObj.src);

                if(count >= len) {
                    //  全部加载完毕
                    opts.all && opts.all();
                } else {
                    load();
                }
            })

            imgObj.src = imgs[count];
        }
    };

    //  变成jquery的插件
    // $.fn.extend -> $('img').preload();
    // $.extend -> $.preload();
    // 调用方式  $.preload(imgs, opts);
    $.extend({
        preload: function (imgs, opts) {
            new Preload(imgs, opts);
        }
    })
})(jQuery);
