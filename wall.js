class Wall{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.body=Bodies.rectangle(x,y,w,h,{isStatic:true});
        World.add(world,this.body);
    }

    show(){
        var pos=this.body.position;
        rectMode(CENTER);
        rect(pos.x,pos.y,this.w,this.h);
    }
}