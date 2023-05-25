let points = [[0,10],[2,10],[3,12],[4,10],[4,4],[6,4],[6,2],[8,2],[8,0],[10,0],[10,-2],[12,-2],[12,-10],[10,-12],[-5,-12],[-11,-7],[-11,-5],[-9,-5],[-5,-10],[-2,-10],[-2,-8],[0,-8],[0,-2],[-2,-2],[-2,4],[-4,4],[-4,10],[-3,12],[-2,10],[0,10],[2,10],[3,12]];

var fill_colors = "660708-a4161a-ba181b-e5383b".split("-").map(a=>"#"+a)
var line_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)

//設定points所有點的物件變數
var ball //把目前要處理的物件，暫存到ball變數內
var balls =[] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定飛彈的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到bullet變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//分數
var score = 0 //設定一個值初始為0
//設定砲台位移
var shipP

function preload(){ //準備執行之前，比setup()更早執行
  elephant_sound = loadSound("sound/elephant.wav");
  bullet_sound = loadSound("sound/Launching wire.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)
  for(var i=0;i<30;i=i+1){
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內
  }
}

function draw() {
  background(0);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }

  if(keyIsPressed){
    if(key=="ArrowRight" || key=="d"){ //下往右鍵或d往右移動
      shipP.x = shipP.x+5
    }
  
    if(key=="ArrowLeft" || key=="a"){ //按往左鍵或a往左移動0
      shipP.x = shipP.x-5
    }
  
    if(key=="ArrowUp" || key=="w"){ //按往上鍵或w往上移動
      shipP.y = shipP.y-5
    }
  
    if(key=="ArrowDown" || key=="s"){ //按往下鍵或s往下移動
      shipP.y = shipP.y+5
    }

  }

  //圖形的顯示(points)
  for(let ball of balls){ //只要是陣列的方式，都可以利用此方式處理
    ball.draw()
    ball.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
        balls.splice(balls.indexOf(ball),1) //從倉庫balls裡取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)         
        score = score + 1 //每按到一個，加一分
        elephant_sound.play()
      }
    }
  }
  //飛彈的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.timenum>5 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
        // monsters.splice(monsters.indexOf(monster),1) //從倉庫monsters裡取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)         
        score = score - 1 //每按到一個，扣一分
        monster.dead = true
      }
    }
   }

  push()
    fill(255)
    textSize(50)
    text(score,50,50) //在座標為(50,50)，顯示score內容
  pop()

  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    noStroke()
    rotate(angle)
    fill("#cdb4db")
    ellipse(0,0,50)
    fill("#ffafcc")
    triangle(-25,25,-25,-25,50,0) //設定三個點，畫成三角形
  pop() //設定恢復原樣
}

// function mousePressed(){ //按下消失
//   for(let ball of balls){ //檢查每一個物件
//     if(ball.isBallInRanger(mouseX,mouseY)){
//       balls.splice(balls.indexOf(ball),1) //從倉庫balls裡取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
//       score = score + 1 //每按到一個，加一分
//       // score = score - 1 //每按到一個，扣一分
//     }
//   }
// }

function mousePressed(){ //按一下產生一個飛彈
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
    bullets.push(bullet)
    bullet_sound.play()
  }
}