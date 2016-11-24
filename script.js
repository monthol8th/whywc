class Box {
  constructor(id){
    this.box=$('#'+id);

    this.box.click(function(){
      this.box.css({'background-color':'black'});
    }.bind(this));

    this.state="GROW"

    setInterval(this.edit.bind(this),500);
  }

  edit(){
    switch (this.state) {
      case "GROW":this.grow();break;

    }
  }

  grow(){
    console.log(this.box.css('background-color'));

  }

}

var box = new Box('vv');
