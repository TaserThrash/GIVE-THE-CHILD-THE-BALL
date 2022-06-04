
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite;


var walls=[];
var wp=[
  [
    {x:400>>1,y:400-60,w:50,h:20},
    {x:100,y:100+35,w:50,h:20},
    {x:340,y:260,w:40,h:20}
  ],
  [
    {x:400>>1,y:400-60,w:50,h:20},
    {x:390,y:135,w:50,h:20},
    {x:355,y:100,w:20,h:90},
    {x:390,y:65,w:50,h:20},
    {x:10,y:135,w:50,h:20},
    {x:10,y:65,w:50,h:20},
  ],
  [
    {x:80,y:90,w:40,h:10},
    {x:100,y:55,w:20,h:80},
  ]
],bp=[
  {x:200,y:400-80},
  {x:200,y:400-80},
  {x:80,y:80},
],cp=[
  {x:100,y:100},
  {x:375,y:100},
  {x:200,y:200}
];
var shoot=false;
var ball,child;
var level=0;
var child;

function preload(){
  sad=loadImage("sad.png");
  happy=loadImage("happy.png");
}

function setup() {
  createCanvas(400,400);
  //fill("#000000");
  imageMode(CENTER)

  engine = Engine.create();
  world = engine.world;
  

  ball=Bodies.circle(width>>1,height-80,10,{restitution:0.75,inertia:Infinity});
  World.add(world,ball);

  refresh(0);

}


function draw() 
{
  background("#ffffff");
  ball.rotation=0;
  Engine.update(engine);
  
  text(frameCount/getFrameRate(),20,20);

  for(let i of walls){
    i.show();
  }

  if(ball.velocity.x==0){
    shoot=false;
  }

  push();
  fill("#ff0000");
  image(sad,child.x,child.y,child.w,child.h);
  pop();

  wrap();

  ellipse(ball.position.x,ball.position.y,20);

  if(ball.position.y>height+400){
    refresh(level);
  }

  if(col(child)){
    level++;
    if(level<cp.length){
      refresh(level);
    }
    else{
      image(happy,child.x,child.y,child.w,child.h);
      text("YOU WIN!!!",100,200);
      noLoop();
    }
  }

  line(ball.position.x,ball.position.y,ball.position.x+(ball.position.x-mouseX)/5,ball.position.y+(ball.position.y-mouseY)/5)
  
}

function mousePressed(){
  if(!shoot){
    shoot=true;
    Body.applyForce(ball,{x:0,y:0},{x:(ball.position.x-mouseX)/10000,y:(ball.position.y-mouseY)/10000})
  }
}

function keyPressed(){
  level++;
  refresh(level);
}

function wrap(){
  var x=ball.velocity.x;
  var y=ball.velocity.y;
  ball.position.x%=width;
  ball.position.x+=width*(ball.position.x<0)
  ball.velocity.x=x;
  ball.velocity.y=y;
}

function refresh(x){
  for(let i of walls){
    World.remove(world,i.body);
  }
  walls=[];
  for(let i of wp[x]){
    walls.push(new Wall(i.x,i.y,i.w,i.h));
  }

  World.remove(world,ball);
  ball=Bodies.circle(bp[x].x,bp[x].y,10,{restitution:0.75,inertia:Infinity});
  World.add(world,ball);
  child={x:cp[x].x,y:cp[x].y,w:20,h:50};
}

function col(x){
  return abs(x.x-ball.position.x)<x.w && abs(x.y-ball.position.y)<x.h;
}
