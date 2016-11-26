class Box {
  constructor(id){
    this.box=$('#'+id);
    this.canvas=document.getElementById(id+'-canvas').getContext('2d');
    this.canvas.fillStyle="white";

    this.color={red:255,green:255,blue:0}
    this.extreamTime=0;
    this.textSize=0;


    this.box.click(this.check.bind(this));

    this.state="REST"

  }

  edit(){
    this.box.css({'height':this.box.css('width')})
    this.canvas.font=this.textSize*2.5+"px serif";
    this.canvas.textAlign="center";
    this.canvas.clearRect(0, 0, 300, 300);
    this.canvas.fillText("YWC",150,100);

    switch (this.state) {
      case "GROW":this.grow();break;
      case "SCORE":
      case "BADSCORE":
      case "EXTREAM":this.extream();break;
      case "REST": this.rest();break;
      case "VALID": this.valid();break;
      case "INVALID": this.invalid();break;
    }
  }
  check(){
    this.extreamTime=0;
    click++;
    if(this.state=='EXTREAM'){
      this.state='VALID'
    } else {
      this.state='INVALID'
    }

  }

  valid(){
    this.box.css({'background-color':'rgb(222,222,222)'});
    this.canvas.fillStyle="yellow";
    score++;
    this.state="SCORE"
  }

  invalid(){
    this.box.css({'background-color':'rgb(255,0,0)'});
    this.canvas.clearRect(0, 0, 300, 300);
    this.textSize=0;
    this.state="BADSCORE"
  }

  grow(){
  //  console.log(this.box.css('background-color'));

    if(this.color.red>=15){
      this.color.red-=15;
      this.textSize+=2;
    }else{
        this.state="EXTREAM"
        spawn++;
    }

    let color='rgb('+this.color.red+','+this.color.green+','+this.color.blue+')'
    this.box.css({'background-color':color});
  }

  extream(){
    //this.box.css({'background-color':'violet'});
    if(this.state=='BADSCORE'){
      this.canvas.font=48+"px serif";
      this.canvas.fillStyle="black";
      this.canvas.fillText("INVALID",150,100);
    }
    if((this.extreamTime>300  && this.state=='EXTREAM')||(this.extreamTime>1200  && this.state!='EXTREAM')){
      this.extreamTime=0;
      this.color={red:255,green:255,blue:0}


      let color='rgb('+this.color.red+','+this.color.green+','+this.color.blue+')'
      this.box.css({'background-color':color});
      this.canvas.fillStyle="white";
      this.textSize=0;
      this.state="REST";
    }else{
      this.extreamTime+=50;
      if(this.extreamTime%150==0&&this.extreamTime<1200&&this.state=='SCORE'){
        console.log(this.extreamTime);
        this.canvas.fillStyle=(this.canvas.fillStyle=='#ffff00'?'blue':'yellow');
        console.log(this.canvas.fillStyle);
      }
    }
  }

  rest(){
    if(Math.floor((Math.random() * 40) + 1 )== 19){
      this.state='GROW';
    }
    this.textSize = 0;

  }

}

var score = 0;
var click = 0;
var spawn = 0;
var boxs = [new Box('vv'),new Box('ww'),new Box('xx')];

document.body.onkeydown = function(e){
  alert(String.fromCharCode(e.keyCode)+" --> "+e.keyCode);
  switch(e.keyCode){
    case 81: boxs[0].check; break;
    case 87: boxs[1].check; break;
    case 69: boxs[2].check; break;

  }
};

setInterval(function(){
  for (let box of boxs) {
    box.edit();
  }
  $('#score').html('<span class="label label-default">Score: '+score+'</span><span class="label label-default">Click: '+click+'</span><span class="label label-default">Spawn: '+spawn+'</span>')

},50);
