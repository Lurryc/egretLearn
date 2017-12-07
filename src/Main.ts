//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
                // TODO:console.log('hello,world')
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        // let sky = this.createBitmapByName("bg_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;

        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // let icon = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;

        // //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        // RES.getResAsync("description_json", this.startAnimation, this)
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRect(0,0,50,50)
        shape.anchorOffsetX = 25;
        shape.anchorOffsetY = 25;
        shape.x = 25;
        shape.y = 25;
        shape.scaleX = 0.8;
        shape.scaleY = 0.8;
        shape.alpha = 0.9;
        shape.rotation = 45;
        shape.skewX =0;
        shape.graphics.endFill();
        this.addChild(shape)

        var textfield:egret.TextField = new egret.TextField();
        let bitmap = new egret.Bitmap();
        let stage = new egret.Stage();
        let sprite = new egret.Sprite();
        let bitmaptext = new egret.BitmapText();

        class MyGrid extends egret.Shape{
            public constructor(){
                super();
                this.draw();
            }
            public draw(){
                this.alpha = 0.4;
                this.graphics.beginFill(0xffff);
                this.graphics.drawRect(0,0,50,50);
                this.graphics.beginFill(0x333);
                this.graphics.drawArc(75,25,25,0,Math.PI);
                this.graphics.beginFill(0xff);
                this.graphics.drawCircle(25,75,25);
                this.graphics.beginFill(0xf);
                this.graphics.drawRoundRect(50,50,50,50,30,30)
                this.graphics.endFill()
            }
        }
        this.addChild(new MyGrid())

        var container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        container.x = 50;
        container.y = 50;
        this.addChild(container);
        var circle:egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0xff0000);
        circle.graphics.drawCircle(25,25,25);
        circle.graphics.endFill();
        container.addChild(circle);
        circle.touchEnabled = true;
        circle.addEventListener(egret.TouchEvent.TOUCH_TAP,onclick,this)
        function onclick(){
            var targetPoint:egret.Point = container.globalToLocal(0,0)
            circle.x = targetPoint.x;
            circle.y = targetPoint.y;
        }

        var offsetX:number;
        var offsetY:number;
        var circle2:egret.Shape = new egret.Shape;
        circle2.graphics.beginFill(0xffafaf);
        circle2.graphics.drawCircle(0,25,25);
        circle2.x = 125;
        circle2.graphics.endFill();
        this.addChild(circle2);
        //手指按到屏幕,触发startmove方法
        circle2.touchEnabled = true;
        circle2.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
        //手指离开屏幕,触发stopMove方法
        circle2.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
        function startMove(e:egret.TouchEvent){
            offsetX = e.stageX - circle2.x;
            offsetY = e.stageY - circle2.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this)
        }
        function stopMove(){
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this)

        }
        function onMove(e:egret.TouchEvent):void{
            circle2.x = e.stageX - offsetX ;
            circle2.y = e.stageY - offsetY;
        }

        let sprcon1 = new egret.Sprite();
        sprcon1.graphics.beginFill(0x00ff00);
        sprcon1.graphics.drawRect(0,0,100,100);
        sprcon1.graphics.endFill();
        this.addChild(sprcon1);
        sprcon1.x = 150;
        let sprcon2 = new egret.Sprite();
        sprcon2.graphics.beginFill(0xff0000);
        sprcon2.graphics.drawRect(0,0,100,100);
        sprcon2.graphics.endFill();
        this.addChild(sprcon2);
        sprcon2.y = 100;
        let spr = new egret.Sprite();
        spr.graphics.beginFill(0x0000ff);
        spr.graphics.drawRect(0,0,50,50);
        spr.graphics.endFill();
        spr.x = 10;
        spr.y = 10;
        sprcon1.addChild(spr);
        sprcon2.addChild(spr);//TODO:同一个显示对象无论被代码加入显示列表多少次，在屏幕上只绘制一次

        //查看子对象的数量
        console.log(this.numChildren)

        let sprcon = new egret.Sprite();
        this.addChild(sprcon);
        sprcon.x = 250;
        for(var i:number = 0; i<4; i++){
            let sp = new egret.Sprite();
            sp.graphics.beginFill(0xffffff*Math.random());
            sp.graphics.drawRect(0,0,100,100);
            sprcon.addChild(sp);
            sp.x = i*20
        }
        let sprnew = new egret.Sprite();
        sprnew.graphics.lineStyle(10,0xfaffaa);
        sprnew.graphics.beginFill(0xff0000);
        sprnew.graphics.drawRect(0,0,200,50);
        sprnew.graphics.endFill();
        sprnew.x = 10;
        sprnew.y = 50;
        sprcon.addChildAt(sprnew,3);
        // sprcon.removeChildAt(2);
        sprcon.swapChildrenAt(1,2);
        sprcon.setChildIndex(sprnew,0);
        var _spr = sprcon.getChildAt(4);
        _spr.alpha = .5;
        console.log(this.numChildren)

        //画弧形
        var shape = new egret.Shape();
        shape.graphics.lineStyle(2,0xffff00);
        shape.graphics.drawArc(500,50,50,0,Math.PI/180*30);
        shape.graphics.drawArc(580,50,50,Math.PI/180*30,0);
        shape.graphics.endFill();
        this.addChild(shape);
        // shape.graphics.clear();

        //绘制进度条
        var shape = new egret.Shape();
        this.addChild(shape);
        var angle:number = 0;
        egret.startTick(function():boolean{
            angle += 1;
            if(angle > 360) return false;
            changeGraphics(angle);
            return true;
        },this)
        function changeGraphics(angle:number){
            shape.graphics.clear();
            shape.graphics.lineStyle(2,0x0000ff);
            shape.graphics.drawArc(150,150,50,0,angle*Math.PI/180)
            shape.graphics.endFill();
        }

        //绘制扇形进度条
        var shapeArc = new egret.Shape();
        shapeArc.x = 200;
        shapeArc.y = 100;
        this.addChild(shapeArc);
        var angle:number = 0;
        egret.startTick(function(){
            angle += 1;
            if(angle > 360) return false;
            changeGraphics2(angle);
            return true;
        },this)
        function changeGraphics2(angle:number){
            shapeArc.graphics.clear();
            shapeArc.graphics.beginFill(0xff0000);
            shapeArc.graphics.moveTo(50,50);
            shapeArc.graphics.lineTo(100,50);
            shapeArc.graphics.drawArc(50,50,50,0,angle*Math.PI/180);
            shapeArc.graphics.lineTo(50,50);
            shapeArc.graphics.endFill();
        }
        
        //遮罩的使用
        shapeArc.mask = new egret.Rectangle(20,20,60,60);

        //矩形碰撞检测
        var hitShp = new egret.Shape();
        hitShp.graphics.beginFill(0xff0000);
        hitShp.graphics.drawCircle(20,20,20);
        hitShp.graphics.endFill();
        hitShp.y=200;
        hitShp.height = 1000;
        hitShp.width = 1000;
        this.addChild(hitShp);
        var text = new egret.TextField();
        text.text="啦啦啦";
        text.x = 100;
        text.y = 200;
        this.addChild(text);
        var isHit = hitShp.hitTestPoint(0,227,true);
        for(var i=0;i<40;i++){
            for(var j=0;j<40;j++){
                if(hitShp.hitTestPoint(i,200+j,true)){
                    var point = new egret.Shape();
                    point.graphics.lineStyle(1,0xff0000);
                    point.graphics.lineTo(i,300+j);
                    point.graphics.endFill();
                    this.addChild(point);
                }
            }
        }
        text.text = "isHit: "+isHit;

        //文本
        var textInput = new egret.TextField();
        textInput.type = egret.TextFieldType.INPUT;
        textInput.inputType = egret.TextFieldInputType.TEL;
        textInput.inputType = egret.TextFieldInputType.PASSWORD;
        // textInput.inputType = egret.TextFieldInputType.TEXT;
        textInput.displayAsPassword = true;
        textInput.text = 'your name:';
        textInput.width = 300;
        textInput.height = 50;
        textInput.y = 400;
        textInput.textColor = 0x000000;
        this.addChild(textInput);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}


