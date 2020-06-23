import {NormalText, HorizontalText, VerticalText} from "./Text.js"
import {NormalPicture, ZoomPicture} from "./Picture.js"
let app = null



const layer0 = {
  type: "NormalText",
  text: ["Hello World!", "Good Morning", "London"],
  style: {fontSize: 12 , fontFamily: "Arial", fill:'white'},
  position: {x: 0.3, y:0.6},
  speed: 0.2,
}

const layer1 = {
  type: "NormalText",
  text: ["日本", "America", "Canada"],
  style:{fontSize:16 , fontFamily: "Arial", fill:'white'},
  position: {x: 0.6, y:0.6},
  speed: 0.4,
}

const layer2 = {
  type: "NormalText",
  text: ["panda", "dog", "cat"],
  style: {fontSize:24 , fontFamily: "Arial", fill:'gray'},
  position: {x: 0.8, y:0.9},
  speed: 0.6,
}

const layer3 = {
  type: "NormalText",
  text: ["pc", "cup", "speaker","tokyo","osaka","chiba","hyogo","hukuoka"],
  style: {fontSize:32 , fontFamily: "Arial", fill:'white'},
  position: {x: 0.2, y:0.9},
  speed: 0.8, 
}

const layer4 = {
  type: "NormalPicture",
  imageURL: "./scripts/gui/view/images/icon.png",
  position: {x: 0.2, y:0.9},
  anchor: 0.5,
  scale: 0.4,
  speed: 0.5,
  showTime: 1000,
  hideTime: 1000,
}


const layer5 = {
  type: "HorizontalText",
  text: ["PYTHAGORAS"],
  style: {
    fill: ['#FF0000', '#660000', '#330000' ],
    fillGradientStops: [0.1, 0.7, 0.8],
    fontSize: 61,
    fillGradientType: 1,
    //stroke: ['#EEEEEE', '#555555', '#EEEEEE', '#555555'],
    //stroke: ['#FFFFFF', '#555555', '#EEEEEE', '#555555'],
    //strokeGradientStops: [0.1, 0.3, 0.7, 0.9],
    stroke: 0xffffff,
    strokeThickness: 6,
    lineJoin: 'round'
  },
  position: {x: 0.8, y:0.6},
  speed: 1.5, 
}

const layer6 = {
  type: "ZoomPicture",
  imageURL: "./scripts/gui/view/images/forest.jpg",
  position: {x: 0.5, y:0.5},
  anchor: 0.5,
  scale: 0.2,
  speed: 0.1,
  showTime: 2000,
  hideTime: 1000,
}

const layer9 = {
  type: "VerticalText",
  text: ["NGINX PREMIUM"],
  style: {
    fill: ['#FF0000', '#00FF00', '#0000FF' ],
    fillGradientStops: [0.1, 0.7, 0.8],
    fontSize: 48,
    fillGradientType: 1,
    //stroke: ['#EEEEEE', '#555555', '#EEEEEE', '#555555'],
    //stroke: ['#FFFFFF', '#555555', '#EEEEEE', '#555555'],
    //strokeGradientStops: [0.1, 0.3, 0.7, 0.9],
    stroke: 0xffffff,
    strokeThickness: 6,
    lineJoin: 'round'
  },
  position: {x: 0.8, y:0.6},
  speed: 1.0, 
}

const layersMap = new Map([ 
  ["layer0", layer0],
  ["layer1", layer1],
  ["layer2", layer2],
  ["layer3", layer3],
  ["layer4", layer4],
  ["layer5", layer5],
  ["layer6", layer6],
  ["layer9", layer9],
] )

const pixiObjMap = new Map() 

const makePixiObj = (layerSetting) => { 
  const type = layerSetting.type
  switch(type){
    case "NormalText" :{
      const {text, style, position, speed} = layerSetting
      const pixiObj = new NormalText(app, text, style, position, speed)
      return pixiObj
      break
    }
    case "HorizontalText" :{
      const {text, style, position, speed} = layerSetting
      const pixiObj = new HorizontalText(app, text, style, position, speed)
      return pixiObj
      break
    }
    case "VerticalText" :{
      const {text, style, position, speed} = layerSetting
      const pixiObj = new VerticalText(app, text, style, position, speed)
      return pixiObj
      break
    } 
    case "NormalPicture" :{
      const {imageURL, anchor, position, scale, speed, showTime, hideTime} = layerSetting
      const pixiObj = new NormalPicture(app, imageURL, anchor, position, scale, speed, showTime, hideTime)
      return pixiObj
    }
    case "ZoomPicture" :{
      const {imageURL, anchor, position, scale, speed, showTime, hideTime} = layerSetting
      const pixiObj = new ZoomPicture(app, imageURL, anchor, position, scale, speed, showTime, hideTime)
      return pixiObj
    }

  }
}

const drawInitialize = () =>{

  app = new PIXI.Application({width:800, height:600, backgroundColor:"0x111111"})
  document.getElementById("draw").appendChild(app.view)

  layersMap.forEach((v,k)=>{
    const obj = makePixiObj(v)
    app.stage.addChild(obj.pixiObj)
    pixiObjMap.set(k, obj)
  }) 
}

let start = null
let count = 0
const startTime = performance.now()

export const change = (newLayersMap) => {
  newLayersMap.forEach((v,k)=>{
    const pixiObj = pixiObjMap.get(k) 
    pixiObj.change(v) 
  })
}

const draw = () =>{
  pixiObjMap.forEach(v=>v.move())
  count++
}

export const initialize = () =>{

  drawInitialize()
  app.ticker.add(()=>{
    draw()
  })
}
