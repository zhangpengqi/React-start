
        var sement = document.getElementById('sement');
        var img = sement.getElementsByTagName('img');
        console.log(img);
        var left = sement.getElementsByClassName('left')[0];
        var right = sement.getElementsByClassName('right')[0];
        var li = sement.getElementsByClassName('round')[0].getElementsByTagName('li');

 
        // var num = 0; // 图片索引, 第几张图片

        // run();
        // timer = setInterval(run, 2000);

        // // 定时切换图片
        // function run(){
        //     // 超出图片个数, 重置为0, 重新从第一张开始计数
        //     if( num >= img.length ){
        //         num = 0;
        //     }

        //     showImg(num);
        //     num++;
        // }

        // // 显示第n张图片
        // function showImg(n){
        //     // 隐藏所有图片
        //     for(var i = 0; i < img.length; i++){
        //         img[i].style.opacity = 0; 

        //         li[i].style.borderColor = 'hsla(0,0%,100%,.3)';
        //         li[i].style.background = 'rgba(0,0,0,0.4)';
        //     }

        //     // 单独显示第n张
        //     img[n].style.opacity = 1;
        //     li[n].style.borderColor = 'rgba(0,0,0,.4)';
        //     li[n].style.background = 'hsla(0,0%,100%,.4)';
        // }

        // // 点第几个小圆圈, 就出现第几张图片
        // for(var i = 0; i < li.length; i++){
        //     (function(m){
        //         li[m].onclick = function(){
        //             clearInterval(timer);
        //             showImg(m);
        //             num = m; // 改变当前图片索引
        //             timer = setInterval(run, 2000);
        //         }
        //     })( i );
        // }

        // // 向右, 显示下一张图片
        // right.onclick = function(){
        //     clearInterval(timer);

        //     // 确保num 不会超出最大图片个数
        //     num = num >= img.length ? 0 : num;

        //     showImg(num);
        //     run();
        //     timer = setInterval(run, 2000)
        // }

        // // 向左, 显示上一张图片
        // left.onclick = function(){
        //     clearInterval(timer);

        //     // if(num == 1){
        //     //     num = img.length - 1;
        //     // }else{
        //     //     num -= 2;
        //     // }
        //     console.log(num);
        //     num = num == 1? img.length - 1 : num - 2;

        //     showImg(num);
        //     run();
        //     timer = setInterval(run, 2000)
        // }

