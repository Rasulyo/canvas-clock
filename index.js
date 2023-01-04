let sel;
function myFunction(chosen) {
    sel = chosen;
  }

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

function displayCanva() {
    let canvas = document.getElementById('canva');
    let ctx = canvas.getContext('2d');

    let radiusClock = canvas.width/2 - 10;
    let xCenter = canvas.width/2;
    let yCenter = canvas.width/2;
// 
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();

    ctx.arc(xCenter, yCenter, radiusClock, 0, 2*Math.PI, true);
    ctx.moveTo(xCenter, yCenter);

    ctx.stroke();
    ctx.closePath();

    //

    let radiusNum = radiusClock - 10;
    let radiusPoint;

    for(let tn = 0 ; tn < 60; tn++){
        ctx.beginPath();
        if(tn % 5 == 0) {
            radiusPoint = 5
        }else{
            radiusPoint = 2;
        }

        let xPointM = xCenter + radiusNum * Math.cos( -6*tn*(Math.PI/180) + Math.PI/2);
        let yPointM = yCenter - radiusNum * Math.sin(-6*tn*(Math.PI/180) + Math.PI/2);
        ctx.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true)

        ctx.stroke();
        ctx.closePath();
    }


    //


    for(let th = 1; th <= 12; th++){
        ctx.beginPath();
        ctx.font = 'bold 25px sans-serif';
        let xText  = xCenter + (radiusNum - 30) * Math.cos(-30 * th * (Math.PI/180) + Math.PI/2); 
        let yText  = yCenter - (radiusNum - 30) * Math.sin(-30 * th * (Math.PI/180) + Math.PI/2); 
        if(th <= 90){
            ctx.strokeText(th, xText-5, yText+10);
        }else{
            ctx.strokeText(th, xText-15, yText+10);
        }

        ctx.stroke();
        ctx.closePath();
    }


    // 

    let secondLine = radiusNum - 10;
    let minLine = radiusNum - 15;
    let hourLine = minLine/ 1.5;
    
    let newDay = new Date();
    let dateNew;
    if(sel === 'Moskva'){
        dateNew =  convertTZ(newDay, 'Europe/Moscow');
    }else{
        dateNew = convertTZ(newDay, 'Asia/Bishkek');
    }

    let t_sec = 6*dateNew.getSeconds();
    let t_min = 6*(dateNew.getMinutes() + (1/60) * dateNew.getSeconds());
    let t_hour = 30 * (dateNew.getHours() + (1/60)* dateNew.getMinutes());

    // sec

    ctx.beginPath();
    ctx.strokeStyle = '#000da2';
    ctx.lineWidth = 2;

    ctx.moveTo(xCenter, yCenter);
    ctx.lineTo(xCenter + secondLine*Math.cos(Math.PI/2 - t_sec* (Math.PI/180)), 
                yCenter - secondLine*Math.sin(Math.PI/2 - t_sec* (Math.PI/180)))

    ctx.stroke();
    ctx.closePath();
    // min

    ctx.beginPath();
    ctx.strokeStyle = '#000d6e';
    ctx.lineWidth = 4;

    ctx.moveTo(xCenter, yCenter);
    ctx.lineTo(xCenter + minLine*Math.cos(Math.PI/2 - t_min* (Math.PI/180)), 
                yCenter - minLine*Math.sin(Math.PI/2 - t_min* (Math.PI/180)))

    ctx.stroke();
    ctx.closePath();

    // hour
    ctx.beginPath();
    ctx.strokeStyle = '#000da6';
    ctx.lineWidth = 6;

    ctx.moveTo(xCenter, yCenter);
    ctx.lineTo(xCenter + hourLine*Math.cos(Math.PI/2 - t_hour* (Math.PI/180)), 
                yCenter - hourLine*Math.sin(Math.PI/2 - t_hour* (Math.PI/180)))

    ctx.stroke();
    ctx.closePath();

    
}

window.onload = function () {
    window.setInterval(
        function () {
            // let newDate = new Date();
            // document.getElementById('clock').innerHTML = newDate.toLocaleTimeString();

            displayCanva();
        }, 1000
    )
    myFunction();
}