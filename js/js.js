window.onload=function(){
    if (localStorage.getItem('cats') == null) {
        this.cats = [
          { 'cat' : 'Lion' , 'photo' : 'lion.jpg' , 'num' : 0},
          {'cat': 'Tygra', 'photo': 'tygra.jpg', 'num': 0},
          {'cat': 'Panthro', 'photo': 'panthro.jpg', 'num': 0},
          {'cat': 'Cheetah', 'photo': 'cheetah.jpg', 'num': 0},
          {'cat': 'WKit', 'photo': 'wkit.jpg', 'num': 0},
          {'cat': 'WKat', 'photo': 'wkat.jpg', 'num': 0}
        ];
        localStorage.setItem('cats', JSON.stringify(this.cats));
    }
    var model={
        cat,
        cats:JSON.parse(localStorage.getItem('cats')),
        getAll:function(){
            return this.cats;
        },
        update:function(){
            localStorage.setItem('cats',JSON.stringify(this.cats));
        }
    }
    var oct={
        getCats:function(){
            return model.getAll();
        },
        init:function(){
            view.init();
            view.buildList();
            this.currentCat(this.getCats()[0]);
            view.renderDiv();
        },
        soma:function(cat){
            cat.num++;
            model.update();
            view.render(cat);
        },
        currentCat:function(cat){
            model.cat=cat;
        },
        getCurrentCat:function(){
            return model.cat;
        },
        saveCat:function(){
            model.update();
            view.renderDiv();
            view.buildList();
        }
    }
    var view={
        ul:document.createElement('ul'),
        init:function(){
            
            var btn=document.querySelector('#btnadmin');
            var divadmin=document.querySelector('#divadmin');
            var name=document.querySelector('#name');
            var img=document.querySelector('#img');
            var count=document.querySelector('#count');
            var btncancel=document.querySelector('#cancel');
            var btnsave=document.querySelector('#save');

            btn.addEventListener('click',function(){
                divadmin.style.display='block';
                var cc=oct.getCurrentCat();
                name.value=cc.cat;
                img.value=cc.photo;
                count.value=cc.num;
            });
            btncancel.addEventListener('click',function(){
                divadmin.style.display='none';
            });
            var ul=this.ul;
            btnsave.addEventListener('click',function(){
                while (ul.firstChild) {
                    ul.removeChild(ul.firstChild);
                }
                var cat=oct.getCurrentCat();
                cat.cat=name.value;
                cat.num=count.value;
                oct.saveCat();
                divadmin.style.display='none';
            });            
        },
        buildList:function(){          
            oct.getCats().forEach(cat => {               
                var li=document.createElement('li');
                var a=document.createElement('a');
                a.setAttribute('href','#');
                a.addEventListener('click',function(){
                    document.querySelector('#cat').innerHTML=null;
                    var img=document.createElement('img');
                    img.addEventListener('click',function(){oct.soma(cat)});
                    img.setAttribute('src','img/'+cat.photo );
                    var h2=document.createElement('h2');
                    var txt=document.createTextNode(cat.cat);
                    h2.appendChild(txt);
                    var h1=document.createElement('h1');
                    h1.setAttribute('id','cat'+cat.cat);
                    var txt2=document.createTextNode(cat.num);
                    h1.appendChild(txt2);
                    oct.currentCat(cat);
                    document.querySelector('#cat').appendChild(img);
                    document.querySelector('#cat').appendChild(h2);
                    document.querySelector('#cat').appendChild(h1);
                });
                var t=document.createTextNode(cat.cat);
                a.appendChild(t);
                li.appendChild(a);
                this.ul.appendChild(li);                    
            });
            document.querySelector('#cats').appendChild(this.ul);
        },
        render:function(cat){
            document.querySelector('#cat'+cat.cat).innerHTML=cat.num;
        },
        renderDiv:function(){
            document.querySelector('#cat').innerHTML=null;
            var cc=oct.getCurrentCat();
            var img=document.createElement('img');
            img.addEventListener('click',function(){oct.soma(cc)});
            img.setAttribute('src','img/'+cc.photo );
            var h2=document.createElement('h2');
            var txt=document.createTextNode(cc.cat);
            h2.appendChild(txt);
            var h1=document.createElement('h1');
            h1.setAttribute('id','cat'+cc.cat);
            var txt2=document.createTextNode(cc.num);
            h1.appendChild(txt2);

            document.querySelector('#cat').appendChild(img);
            document.querySelector('#cat').appendChild(h2);
            document.querySelector('#cat').appendChild(h1);
        }      
    }
    oct.init();
}



