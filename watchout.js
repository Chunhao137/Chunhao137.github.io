
var enemy = d3.range(20); // creates an array from 1 to x
var height = window.innerHeight;
var width = window.innerWidth;
var score = 0;
var highScore = 0;
var counter  = function(){
  var count =0;
  setInterval(function(){
    score++;
    d3.select('.current').select('span').text(score);
    if(collision()===true){
      count++;
      d3.select('.collisions').select('span').text(count);
      if(score>highScore){
        highScore = score;
      }
    score = 0;
    d3.select('.high').select('span').text(highScore);
    }
  }, 10);
}();


var canvas = d3.select('body')
                .append('svg')
                .attr('height', height)
                .attr('width', width);

var loop =  function(){

                d3.select(this)
                .transition().duration(1000)
                .attr('cx', function(value){
                  return Math.random() * width;
                })
                .attr('cy', function(value){
                  return Math.random() * height;
                })

                .each("end",loop);

  }

  var enemyCircle = canvas.selectAll('circle')
                  .data(enemy)
                  .enter()
                  .append('circle')
                  .attr('class','enemy')
                  .attr('cx', function(value){
                    return Math.random() * width;
                  })
                  .attr('cy', function(value){
                    return Math.random() * height;
                  })
                  .attr('r', function(value){return Math.random()*25})
                  .attr('fill', 'blue')

                  .transition()
                  .duration(1000)
                  .attr('cx', function(value){
                    return Math.random() * width;
                  })
                  .attr('cy', function(value){
                    return Math.random() * height;
                  }).each("end",loop);



var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove(d) {
    var x = d3.event.x;
    //console.log(x);
    var y = d3.event.y;
    d3.select(this).attr("cx", x);
    d3.select(this).attr("cy", y);
}



var playerCircle =  d3.select('svg')
                    .data([10])
                    .append('circle')
                    .attr('class','player')
                    .attr('cx', 200)
                    .attr('cy', 500)
                    .attr('r', 20)
                    .attr('fill', 'red')
                    .attr("stroke", "orange")
                    .attr("stroke-width", 10)
                    .call(drag)


var collision = function(){


  var playerX =  d3.select('.player').attr('cx');
  var playerY =  d3.select('.player').attr('cy');


  var enemies = canvas.selectAll('circle').data(enemy)[0];

  for(var i=0; i<enemies.length; i++){

    var enemyX = enemies[i].cx.animVal.value;
    var enemyY = enemies[i].cy.animVal.value;
    var distance = Math.sqrt(Math.pow(playerX-enemyX,2)+ Math.pow(playerY-enemyY,2));
    if(distance < 50 ){

      return true;
    }else{

    }
  }
};
