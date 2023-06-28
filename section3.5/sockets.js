function* bearScore(){
    yield 'CHI Field Goal CHI 3 - MIN 0';
    yield 'CHI Field Goal CHI 6 - MIN 0';
    yield 'CHI Touchdown CHI 13 - MIN 3';
    yield 'MIN Touchdown CHI 20 - MIN 3';
    yield 'MIN Touchdown CHI 20 - MIN 10';
    yield 'CHI Wins'
}

var bearsNamespace=(socket)=>{
    socket.emit('score','Welcome to the Bears score update !');
    var score=bearScore();
    var id =setInterval(()=>{
        var next=score.next();
        if(next.done) clearInterval(id);
        else socket.emit('score',next.value);
    },2000);
}

function* cubsScore(){
    yield 'CHC scores CHC 1 - CLE 0';
    yield 'CLE scores CHC 1 - CLE 1';
    yield 'CHC scores CHC 2 - CLE 1';
    yield 'CHC scores CHC 3 - CLE 1';
    yield 'CHC scores CHC 4 - CLE 1';
    yield 'CHC scores CHC 5 - CLE 1';
    yield 'CHC scores CHC 5 - CLE 3';
    yield 'CHC scores CHC 6 - CLE 3';
    yield 'CHC scores CHC 6 - CLE 4';

}

var cubsNamespace=(socket)=>{
    socket.emit('score','Welcome to the Cubs score update!');
    var score=cubsScore();
    var id=setInterval(()=>{
        var next=score.next();
        if(next.done) clearInterval(id);
        else socket.emit('score',next.value);
    },1000);
}

export {bearsNamespace,cubsNamespace};