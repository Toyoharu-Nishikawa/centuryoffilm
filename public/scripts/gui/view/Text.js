
export const NormalText = class {
  constructor(app, textList, style, position, speed){
    const text = this.join(textList)
    const textStyle = new PIXI.TextStyle(style)
    const pixiObj = new PIXI.Text(text, textStyle) 
    pixiObj.position.x = app.screen.width * position.x
    pixiObj.position.y = app.screen.height* position.y

    this.app = app
    this.pixiObj = pixiObj
    this.speed = speed
  }
  join(textList){
    const text = textList.join("\n")
    return text
  }
  move(){
    this.pixiObj.position.y -= this.speed 
    if(this.pixiObj.position.y+this.pixiObj.height<0){
      this.pixiObj.position.y = this.app.screen.height
    }
  }
  change(param){
    const {text, style, position, speed} = param
    const pixiObj = this.pixiObj  
    if(text !==undefined){
      pixiObj.text = this.join(text)
    }
    if(style !==undefined){
      pixiObj.style = new PIXI.TextStyle(style) 
    }
    if(position !==undefined){
      if(position.hasOwnPropwerty("x") && position.hasOwnProperty("y")){
        pixiObj.position.x= position.x
        pixiObj.position.y= position.y
      }
    }
    if(speed !==undefined){
      this.speed = speed
    }
  }
}

export const HorizontalText = class extends NormalText{
  join(textList){
    const text = textList.join("  ")
    return text
  }
  move(){
    this.pixiObj.position.x -= this.speed 
    if(this.pixiObj.position.x+this.pixiObj.width<0){
      this.pixiObj.position.x = this.app.screen.width
    }
  }
}

export const VerticalText = class extends NormalText{
  constructor(app, textList, style, position, speed){
    super(app, textList, style, position, speed)
    this.pixiObj.rotation = 90/180*Math.PI
  }
  join(textList){
    const text = textList.join("  ")
    return text
  }
  move(){
    this.pixiObj.position.y -= this.speed 
    if(this.pixiObj.position.y+this.pixiObj.width<0){
      this.pixiObj.position.y = this.app.screen.height
    }
  }

}

