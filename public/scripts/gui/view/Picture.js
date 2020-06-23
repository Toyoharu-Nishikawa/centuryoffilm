export const NormalPicture = class {
  constructor(app, imageURL, anchor,  position, scale, speed, showTime, hideTime){
    this.showTime = showTime 
    this.hideTime = hideTime 
    this.count = this.showTime
    this.wait = this.hideTime
    this.show = true

    const pixiObj= new PIXI.Sprite.from(imageURL)
    pixiObj.anchor.set(anchor)
    pixiObj.scale.set(scale, scale)

    pixiObj.x = app.screen.width * position.x
    pixiObj.y = app.screen.height* position.y

    this.app = app
    this.pixiObj = pixiObj
    this.speed = speed
 
  }

  change(param){
    const {imageURL, anchor,  position, scale, speed} = param
    const pixiObj = this.pixiObj  
    if(imageURL !==undefined){
      const texture = new PIXI.Texture.fromImage(imageURL)
      pixiObj.texture = texture 
    }
    if(position !==undefined){
      if(position.hasOwnPropwerty("x") && position.hasOwnProperty("y")){
        pixiObj.position.x= position.x
        pixiObj.position.y= position.y
      }
    }
    if(anchor !==undefined){
      pixiObj.anchor.set(anchor) 
    }
    if(scale !==undefined){
      pixiObj.scale.set(scale, scale) 
    }
    if(speed !==undefined){
      this.speed = speed
    }
  }

  move(){
    const flag = this.showHide()
    if(flag){
      this.pixiObj.x += this.speed
      if(this.pixiObj.x > this.app.screen.width){
        this.pixiObj.x = 0
      }
    }
  }
  showHide(){
    if(this.count>0){
      this.count --
      return true
    }
    else{
      if(this.show){
        this.pixiObj.removeChild()
        this.app.stage.removeChild(this.pixiObj)
        this.show = false
      }
      else{
        this.wait--
        if(this.wait<0){
            this.count = this.showTime
            this.wait=this.hideTime
            this.app.stage.addChild(this.pixiObj)
            this.show=true
        }
      }
      return false
    }
  }
}

export const ZoomPicture = class extends NormalPicture {
  move(){
    const flag = this.showHide()
    if(flag){
      this.pixiObj.scale.x += this.speed /100
      this.pixiObj.scale.y += this.speed /100
      if(this.pixiObj.width > this.app.screen.width /2 ||this.pixiObj.height > this.app.screen.height /2){
        this.pixiObj.scale.x = 0.01
        this.pixiObj.scale.y = 0.01
      }
    }
  }
} 
