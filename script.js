class Box {
  constructor(id){
    this.box=$('#'+id);

    this.color={red:255,green:255,blue:0}
    this.extreamTime=0;

    this.box.click(this.check.bind(this));

    this.state="REST"

  }

  edit(){
    console.log(this.box.css('width'));
    this.box.css({'height':this.box.css('width')})
    switch (this.state) {
      case "GROW":this.grow();break;
      case "SCORE":
      case "EXTREAM":this.extream();break;
      case "REST": this.rest();break;
      case "VALID": this.valid();break;
      case "INVALID": this.invalid();break;
    }
  }
  check(){
    this.extreamTime=0;

    if(this.state=='EXTREAM'){
      this.state='VALID'
    } else {
      this.state='INVALID'
    }

  }

  valid(){
    this.box.css({'background-color':'rgb(222,222,222)'});
    this.state="SCORE"
  }

  invalid(){
    this.box.css({'background-color':'rgb(255,0,0)'});
    this.state="SCORE"
  }

  grow(){
  //  console.log(this.box.css('background-color'));

    if(this.color.red>=20){
      this.color.red-=10;
    }else{
        this.state="EXTREAM"
    }

    let color='rgb('+this.color.red+','+this.color.green+','+this.color.blue+')'
    this.box.css({'background-color':color});
  }

  extream(){
    //this.box.css({'background-color':'violet'});
    if(this.extreamTime>2000){
      this.extreamTime=0;
      this.color={red:255,green:255,blue:0}

      let color='rgb('+this.color.red+','+this.color.green+','+this.color.blue+')'
      this.box.css({'background-color':color});

      this.state="REST";
    }else{
      this.extreamTime+=100;
    }
  }

  rest(){
    if(Math.floor((Math.random() * 40) + 1 )== 19){
      this.state='GROW';
    }


  }

}

var boxs = [new Box('vv'),new Box('ww'),new Box('xx')];

setInterval(function(){
  for (let box of boxs) {
    box.edit();
  }

},100);
