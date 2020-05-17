import React, { Component, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, LinearProgress, withStyles, makeStyles, Button, Chip} from '@material-ui/core';
import Sketch from "react-p5";
import '../App.css';

const Canvas = ({

    postXP, 
    getBoba, 
    bobaParams,
    setUserXP,
    userXP,
    getRarity,
    getName

    }) => {

    const [color, setColor] = useState(null)
    const [titleColor, setTitleColor] = useState(null)
    const [boba, setBoba ] = useState(null)
    
    let sizeMultiplier
    let angleMultiplier = .2
    let x, y = 250, w, h;
    let yc, yr, wc, hc;
    let empty, full;
    let tl, tr, bl, br;
    var offset = []
    let sip = false
    let xLine = 253
    let clickCount = 0
    let myTimeout
    let speed = .5
    let timeStamps = []
    let newy = 40
    let targetY = 250

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(250, 500).parent(canvasParentRef);
        
         // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    };

    const reset = () => {
        y = 250
        xLine = 253
        sip = false
        targetY = 253
    }

    const consume = () => {
        //speed = getSpeed(new Date())
        //if(sip) sip=false
        //else sip=true
        //y = y + 20
        targetY = targetY + getSpeed(new Date())
        if(y > empty){
            let points = bobaParams.flavor.points * bobaParams.size.pointsMultiplier

            postXP(points)
            setUserXP(userXP + points)
            getBoba()
            
        }
        //myTimeout = setTimeout(()=>stopConsume(),2000)
    }

    const getSpeed = (date) => {
        if(timeStamps.length == 2){
            timeStamps.pop()
            timeStamps.unshift(date.getTime())
            return 3500/(timeStamps[0]-timeStamps[timeStamps.length-1])
        } else {
            timeStamps.push(date.getTime())
            return 3
        }      
        
    }
    

    
    const draw = (p5) => {
    if(bobaParams){
        setColor(bobaParams.flavor.backgroundHex)
        setTitleColor(bobaParams.flavor.baseHex)
        sizeMultiplier = bobaParams.size.sizeReal
        p5.background(bobaParams.flavor.backgroundHex);
        
        let yCon = p5.constrain(y,0,1000)
        
        x = p5.width / 2;
        let dy = targetY - y;
        y += dy * .05;
        
        xLine = xLine + speed/10

        w = 100; //width of the drink
        //h = w / 3;
        h = w / 4 //camera angle of the drink
        full = 220; //y position of the top of liquid
        empty = full * sizeMultiplier; //y position of the bottom of liquid

        yc = p5.constrain(yCon, full, empty);
        yr = angleMultiplier*((empty - yc)/100); // times .4375 to cap at .35
        wc = w + w*yr; //width of top of liquid
        hc = h + h*yr; //angle of top of liquid


        p5.noStroke();
        //liquid fill
        
        
        p5.beginShape();
        p5.vertex(x - wc/2, yc);
        p5.vertex(x + wc/2, yc);
        p5.vertex(x + w/2, empty);
        p5.vertex(x - w/2, empty);
        
        p5.endShape(p5.CLOSE);

        p5.fill(bobaParams.flavor.topHex)
        p5.ellipse(x, yc, wc, hc); //changing 
        
        p5.fill('black');
        
        p5.fill(1,1,1,99);
       
        
        p5.stroke(126);
        p5.strokeWeight(8)
        //xLine = p5.constrain(y, full, empty);
        //p5.line(x, full, xLine, y); //TODO Y
        p5.strokeCap(p5.SQUARE);

        p5.noStroke();
        p5.ellipse(x, full, w + w * (angleMultiplier * ((empty-full)/100)), h + h * ((angleMultiplier)  * ((empty-full)/100)))

        p5.stroke(126);
        p5.strokeWeight(8)
        p5.line(120, 130, x, full);
        //p5.fill('#666666')
        
        

        p5.noStroke();
        p5.fill(bobaParams.flavor.baseHex);
        p5.ellipse(x, empty, w, h); //bottom
    }
    };

    

    return (
    <div>
        <Card>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                <span style={{color:titleColor}}>{getName()}</span>
            </Typography>
                {getRarity()}
            </CardContent>
        </Card>
        <div className="Canvas" style={{backgroundColor:color}} onClick={consume}>
            <a href='/' onClick={(e)=>{e.preventDefault()}}>
                <Sketch setup={setup} draw={draw} />
            </a>
            
        </div>
    </div>
    
    
    );
}

export default Canvas;