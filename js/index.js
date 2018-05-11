window.onload = function () {
    let timer = null;
    let div = document.getElementById('toTop');
    let pageHeight = document.documentElement.clientHeight;
        window.onscroll = function () {
            let oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop >= pageHeight) {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
        };
        div.onclick = function () {
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                let oTop = document.body.scrollTop || document.documentElement.scrollTop;
                let speed = oTop / 10;
                if (oTop > 0) {
                    document.body.scrollTop = document.documentElement.scrollTop = oTop - speed;
                    timer = requestAnimationFrame(fn);
                } else {
                    cancelAnimationFrame(timer);
                }
            });
        };

    let banner = document.getElementById('banner');
    let list = document.getElementById('list');
    let buttons = document.getElementById('buttons').getElementsByTagName('span');
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');
    let index=1;
    let animated = false;
    let timer2;

    function showButton() {
        for(let i=0;i<buttons.length;i++){
            if(buttons[i].className === 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }
    function animate(offset) {
        animated = true;
        let newLeft = parseInt(list.style.left) +offset;
        let time=300;    //位移总时间
        let interval=10;  //位移间隔时间
        let speed= offset/(time/interval);  //每次位移量

        function go() {
            if((speed<0 && parseInt(list.style.left) > newLeft )|| (speed >0 &&  parseInt(list.style.left) < newLeft)){
                list.style.left = parseInt(list.style.left) + speed +'px';
                setTimeout(go,interval);
            }
            else{
                animated = false;
                list.style.left = newLeft + "px";
                if( newLeft > -1520){
                    list.style.left= -3040 + "px";
                }
                if(newLeft < -3040){
                    list.style.left = -1520 + "px";
                }
            }
        }
        go();
    }
    function play() {
        timer2 = setInterval(function () {
            next.onclick();
        },2000);
    }
    function stop() {
        clearInterval(timer2);
    }
    next.onclick = function () {
        if(index===2){
            index = 1;
        }else{
            index +=1;
        }
        showButton();
        if(!animated){
            animate(-1520);
        }
    };

    prev.onclick = function () {
        if(index===1){
            index = 2;
        }else{
            index -=1;
        }
        showButton();
        if(!animated){
            animate(1520);
        }
    };
    for(let i=0;i<buttons.length;i++){
        buttons[i].onclick = function () {
            if(this.className === 'on'){
                return;
            }
            let myIndex = parseInt(this.getAttribute('index'));
            let offset = -1520*(myIndex - index);
            animate(offset);
            index = myIndex;
            showButton();
            if(!animated){
                animate(offset);
            }
        }
    }
    banner.onmouseover = stop;
    banner.onmouseout = play;
    play();
};