class AssetLibrary {

    constructor(_data, _onProgressUpdate, _onLoadAll) {
        this.data = {};
        this.onProgressUpdate = _onProgressUpdate;
        this.onLoadAll = _onLoadAll;
        for (const assetKey in _data) {
            let assetData = _data[assetKey];
            let asset = {};
            if (assetData.image) {
                asset.isAssetReady = false;
                asset.image = new Image();
                asset.image.src = assetData.image;
                asset.image.onload = () => {
                    if (asset.isAssetReady) return;
                    asset.width = asset.image.naturalWidth;
                    asset.height = asset.image.naturalHeight;
                    asset.isAssetReady = true;
                    this.CheckLoadingStatus();
                };
            }
            if (assetData.audio) {
                asset.isAssetReady = false;
                asset.audio = new Audio();
                asset.audio.src = assetData.audio;
                asset.audio.oncanplay = () => {
                    if (asset.isAssetReady) return;
                    asset.isAssetReady = true;
                    this.CheckLoadingStatus();
                };
                asset.audio.load();
            }
            this.data[assetKey] = asset;
        }
    }

    CheckLoadingStatus() {
        let isLoadAll = true;
        let assetCount = 0.0, loadedAssetCount = 0.0;
        for (const assetKey in this.data) {
            let asset = this.data[assetKey];
            if (asset.isAssetReady) {
                loadedAssetCount += 1.0;
            } else {
                isLoadAll = false;
            }
            assetCount += 1.0;
        }
        if (assetCount <= 0.1) assetCount = 1.0;
        if (this.onProgressUpdate != null) {
            this.onProgressUpdate(loadedAssetCount*100.0/assetCount);
        }
        if (isLoadAll) {
            this.onLoadAll();
        }
    }

}

class GameObjectLibrary {

    constructor(_data) {
        this.data = {};
        this.AddGameObjects(_data);
    }

    AddGameObjects(_data) {
        for (const gameObjectName in _data) {
            let gameObjectData = _data[gameObjectName];
            this.AddGameObject(gameObjectName, gameObjectData);
        }
    }

    AddGameObject(_gameObjectName, _gameObjectData) {
        let gameObject = new GameObject(_gameObjectData.transform);
        if (_gameObjectData.bitmap) {
            gameObject.Bitmap(_gameObjectData.bitmap);
        } else if (_gameObjectData.sprite) {
            gameObject.Sprite(_gameObjectData.sprite.spriteSheet, _gameObjectData.sprite.spriteIndices);
        } else if (_gameObjectData.clock) {
            gameObject.Clock(_gameObjectData.clock);
        }
        this.data[_gameObjectName] = gameObject;
        return this.data[_gameObjectName];
    }

}

class GameObject {

    constructor(_transform) {
        this.transform = _transform;
        if (!this.transform.anchorX) this.transform.anchorX = 0;
        if (!this.transform.anchorY) this.transform.anchorY = 0;
        if (!this.transform.posX) this.transform.posX = 0;
        if (!this.transform.posY) this.transform.posY = 0;
        if (!this.transform.sizeX) this.transform.sizeX = 0;
        if (!this.transform.sizeY) this.transform.sizeY = 0;
        if (!this.transform.flip) this.transform.flip = false;
        if (!this.transform.rotation) this.transform.rotation = 0;
        return this;
    }

    UpdatePosition() {
        let scaleX = this.transform.sizeX / this.transform.width;
        let scaleY = this.transform.sizeY / this.transform.height;
        this.renderer.x = this.transform.posX;
        this.renderer.y = this.transform.posY;
        this.renderer.regX = this.transform.anchorX * this.transform.width;
        this.renderer.regY = this.transform.anchorY * this.transform.height;
        this.renderer.scaleX = scaleX * (this.transform.flip ? -1 : 1);
        this.renderer.scaleY = scaleY;
        this.renderer.rotation = this.transform.rotation;
        return this;
    }

    Bitmap(_imageData) {
        this.imageData = _imageData;
        this.transform.width = this.imageData.width;
        this.transform.height = this.imageData.height;
        this.renderer = new createjs.Shape();
        this.renderer.graphics.beginBitmapFill(this.imageData.image, "no-repeat").drawRect(0, 0, this.transform.width, this.transform.height);
        this.renderer.graphics.endFill();
        this.UpdatePosition();
        gameStage.addChild(this.renderer);
        return this;
    }

    Sprite(_spriteSheetData, _spriteIndices) {
        this.spriteSheetData = _spriteSheetData;
        this.spriteIndices = _spriteIndices;
        this.transform.width = this.spriteSheetData.getFrameBounds(0).width;
        this.transform.height = this.spriteSheetData.getFrameBounds(0).height;
        this.renderer = new createjs.Sprite(this.spriteSheetData);
        this.UpdatePosition();
        gameStage.addChild(this.renderer);
        return this;
    }

    Clock(_clockData) {
        this.clockData = _clockData;
        this.renderer = new createjs.Shape();
        this.SetClockArc();
        this.UpdatePosition();
        gameStage.addChild(this.renderer);
        return this;
    }

    SetClockArc() {
        this.renderer.graphics.clear();
        this.renderer.graphics.setStrokeStyle(this.clockData.thickness)
            .beginStroke(this.clockData.color)
            .arc(this.transform.posX, this.transform.posY, this.clockData.radius, this.clockData.startArc, this.clockData.endArc);
    }

    SetupAnimation(_frameData) {
        this.animationCurve = new AnimationCurve(_frameData);
        return this;
    }

    PlayAnimation(_time) {
        let pos = this.animationCurve.Evaluate(_time);
        this.transform.posX = pos.x;
        this.transform.posY = pos.y;
        this.UpdatePosition();
        return this;
    }

    SetAnimationIndex(_index) {
        this.renderer.gotoAndPlay("a"+this.spriteIndices[_index]);
    }

    SetPosition(_data) {
        if ('posX' in _data) {
            this.transform.posX = _data.posX;
        }
        if ('posY' in _data) {
            this.transform.posY = _data.posY;
        }
        if ('sizeX' in _data) {
            this.transform.sizeX = _data.sizeX;
        }
        if ('sizeY' in _data) {
            this.transform.sizeY = _data.sizeY;
        }
        if ('anchorX' in _data) {
            this.transform.anchorX = _data.anchorX;
        }
        if ('anchorY' in _data) {
            this.transform.anchorY = _data.anchorY;
        }
        if ('flip' in _data) {
            this.transform.flip = _data.flip;
        }
        if ('rotation' in _data) {
            this.transform.rotation = _data.rotation;
        }
        this.UpdatePosition();
        return this;
    }

}

class AnimationCurve {

    constructor(_keyframes) {
        this.keyframes = _keyframes;
    }

    Interpolate(_p0, _p1, _t) {
        return _p0 + _t * (_p1 - _p0);
    }

    SmoothInterpolate(_p0, _p1, _t) {
        return this.Interpolate(_p0, _p1, 3*_t*_t - 2*_t*_t*_t);
    }

    Evaluate(_time) {
        let keyframeIndex = -1;
        for (var i = 0; i < this.keyframes.length; i++) {
            let keyframe = this.keyframes[i];
            if (_time < keyframe.time) {
                keyframeIndex = i;
                break;
            }
        }
        var result = {x:0, y:0};
        if (keyframeIndex == 0) {
            let keyframe = this.keyframes[0];
            result.x = keyframe.x;
            result.y = keyframe.y;
            return result;
        }
        if (keyframeIndex == -1) {
            let keyframe = this.keyframes[this.keyframes.length-1];
            result.x = keyframe.x;
            result.y = keyframe.y;
            return result;
        }
        let keyframe0 = this.keyframes[keyframeIndex-1];
        let keyframe1 = this.keyframes[keyframeIndex];
        let t = (_time - keyframe0.time) / (keyframe1.time - keyframe0.time);
        result.x = this.Interpolate(keyframe0.x, keyframe1.x, t);
        result.y = this.SmoothInterpolate(keyframe0.y, keyframe1.y, t);
        return result;
    }

}

class UILibrary {

    constructor(_data) {
        this.data = {};
        this.AddUIElements(_data);
    }

    AddUIElements(_data) {
        for (const uiName in _data) {
            let uiData = _data[uiName];
            this.AddUIElement(uiName, uiData);
        }
    }

    AddUIElement(_uiName, _uiData) {
        let uiElement = new UIElement(_uiData.transform, this);
        if (_uiData.roundRect) {
            uiElement.UIRoundRect(_uiData.roundRect);
        } else if (_uiData.text) {
            uiElement.UIText(_uiData.text);
        } else if (_uiData.button) {
            uiElement.UIButton(_uiData.button);
        } else if (_uiData.image) {
            uiElement.UIImage(_uiData.image);
        } else if (_uiData.sprite) {
            uiElement.UISprite(_uiData.sprite);
        } else if (_uiData.ballon) {
            uiElement.UIBallon(_uiData.ballon);
        } else if (_uiData.loadingBar) {
            uiElement.UILoadingBar(_uiData.loadingBar);
        } else if (_uiData.clock) {
            uiElement.UIClock(_uiData.clock);
        }
        this.data[_uiName] = uiElement;
    }

    AddUIResizeEvent() {
        window.addEventListener('resize', ()=>this.UIResizeEvent(this));
    }

    RemoveUIResizeEvent() {
        window.removeEventListener('resize', this.UIResizeEvent);
    }

    UIResizeEvent(_uiLibrary) {
        for (const uiName in _uiLibrary.data) {
            _uiLibrary.data[uiName].UpdateUISize();
        }
    }

}

class UIElement {

    constructor(_transform, _library) {
        this.transform = _transform;
        this.library = _library;
        if (!this.transform.parent) this.transform.parent = '';
        if (!this.transform.top) this.transform.top = '0';
        if (!this.transform.left) this.transform.left = '0';
        if (!this.transform.width) this.transform.width = '100%';
        if (!this.transform.height) this.transform.height = '100%';
    }

    UpdateUISize() {
        if (this.isRoundRect) {
            this.dom.style.borderRadius = (gameCanvasScale * this.round) + 'px';
        } else if (this.isText) {
            this.dom.style.fontSize = (gameCanvasScale * this.fontSize) + 'px';
            this.dom.style.letterSpacing = (gameCanvasScale * this.letterSpacing) + 'px';
            this.dom.style.lineHeight = (gameCanvasScale * this.lineHeight) + 'px';
        } else if (this.isButton) {
            this.dom.style.borderRadius = (gameCanvasScale * this.round) + 'px';
            this.dom.style.fontSize = (gameCanvasScale * this.fontSize) + 'px';
            this.dom.style.letterSpacing = (gameCanvasScale * this.letterSpacing) + 'px';
        } else if (this.isImage) {

        } else if (this.isSprite) {

        } else if (this.isBallon) {
            this.dom.style.fontSize = (gameCanvasScale * this.fontSize) + 'px';
            this.dom.style.letterSpacing = (gameCanvasScale * this.letterSpacing) + 'px';
            if (this.dom2) {
                this.dom2.style.fontSize = (gameCanvasScale * this.fontSize) + 'px';
                this.dom2.style.letterSpacing = (gameCanvasScale * this.letterSpacing) + 'px';
            }
        } else if (this.isLoadingBar) {
            this.dom.style.borderRadius = (gameCanvasScale * this.round) + 'px';
            this.dom2.style.borderRadius = (gameCanvasScale * this.round * 2) + 'px';
        } else if (this.isClock) {
            this.dom.style.border = (gameCanvasScale * this.thickness) + 'px solid ' + this.color1;
        }
    }

    SetEnabled(_enabled) {
        this.enabled = _enabled;
        this.dom.style.display = this.enabled ? "block" : "none";
    }

    FadeIn() {
        this.dom.style.opacity = '0%';
        this.SetEnabled(true);
        this.fadeAnimationValue = 0;
        this.fadeInAnimation = () => this.FadeInAnimation(this);
        createjs.Ticker.addEventListener("tick", this.fadeInAnimation);
    }

    FadeInAnimation(_uiElement) {
        _uiElement.fadeAnimationValue += 10;
        if (_uiElement.fadeAnimationValue > 100) {
            _uiElement.dom.style.opacity = '100%';
            createjs.Ticker.removeEventListener("tick", _uiElement.fadeInAnimation);
            return;
        }
        _uiElement.dom.style.opacity = _uiElement.fadeAnimationValue +'%';
    }

    FadeOut() {
        this.dom.style.opacity = '100%';
        this.SetEnabled(true);
        this.fadeAnimationValue = 100;
        this.fadeOutAnimation = () => this.FadeOutAnimation(this);
        createjs.Ticker.addEventListener("tick", this.fadeOutAnimation);
    }

    FadeOutAnimation(_uiElement) {
        _uiElement.fadeAnimationValue -= 10;
        if (_uiElement.fadeAnimationValue < 0) {
            this.SetEnabled(false);
            _uiElement.dom.style.opacity = '100%';
            createjs.Ticker.removeEventListener("tick", _uiElement.fadeOutAnimation);
            return;
        }
        _uiElement.dom.style.opacity = _uiElement.fadeAnimationValue +'%';
    }

    Update(_data) {
        if ('text' in _data) {
            this.text = _data.text;
            this.dom.innerHTML = this.text;
            if (this.isBallon && this.dom2) {
                this.dom2.innerHTML = this.text;
                this.dom2.style.display = this.text == '0' ? 'none' : 'block';
            }
        }
        if ('fontSize' in _data) {
            this.fontSize = _data.fontSize;
            this.UpdateUISize();
        }
        if ('letterSpacing' in _data) {
            this.letterSpacing = _data.letterSpacing;
            this.UpdateUISize();
        }
        if ('lineHeight' in _data) {
            this.lineHeight = _data.lineHeight;
            this.UpdateUISize();
        }
        if ('left' in _data) {
            this.transform.left = _data.left;
            this.dom.style.left = this.transform.left;
        }
        if ('top' in _data) {
            this.transform.top = _data.top;
            this.dom.style.top = this.transform.top;
        }
        if ('width' in _data) {
            this.transform.width = _data.width;
            this.dom.style.width = this.transform.width;
        }
        if ('height' in _data) {
            this.transform.height = _data.height;
            this.dom.style.height = this.transform.height;
        }
    }

    UIRoundRect(_data) {
        this.isRoundRect = true;
        this.color = _data.color;
        this.round = _data.round;
        this.dom = document.createElement('div');
        this.dom.style.position = 'absolute';
        this.dom.style.display = 'block';
        this.dom.style.backgroundColor = this.color;
        this.dom.style.borderRadius = (gameCanvasScale * this.round) + 'px';
        this.dom.style.left = this.transform.left;
        this.dom.style.top = this.transform.top;
        this.dom.style.width = this.transform.width;
        this.dom.style.height = this.transform.height;
        // this.dom.style.opacity = '50%';
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom);
        }
        this.SetEnabled(false);
    }

    UIText(_data) {
        this.isText = true;
        this.fontFamily = _data.fontFamily;
        this.fontSize = _data.fontSize;
        this.letterSpacing = _data.letterSpacing;
        this.color = _data.color;
        this.text = _data.text;
        this.lineHeight = _data.lineHeight;
        this.dom = document.createElement('label');
        this.dom.style.position = 'absolute';
        this.dom.style.display = 'block';
        this.dom.style.textAlign = "center"; 
        this.dom.style.left = this.transform.left;
        this.dom.style.top = this.transform.top;
        this.dom.style.width = this.transform.width;
        this.dom.style.height = this.transform.height;
        this.dom.style.fontFamily = this.fontFamily;
        this.dom.style.fontWeight = 100;
        this.dom.style.color = this.color;
        this.dom.innerHTML = this.text;
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom);
        }
        this.UpdateUISize();
        this.SetEnabled(false);
    }

    UIButton(_data) {
        this.isButton = true;
        this.imgSrc = _data.imgSrc;
        this.round = _data.round;
        this.fontFamily = _data.fontFamily;
        this.fontSize = _data.fontSize;
        this.letterSpacing = _data.letterSpacing;
        this.color = _data.color;
        this.text = _data.text;
        this.onclick = _data.onclick;
        this.dom = document.createElement('button');
        this.dom.style.position = 'absolute';
        this.dom.style.display = 'block';
        this.dom.style.border = 'none';
        this.dom.style.cursor = 'pointer';
        this.dom.style.left = this.transform.left;
        this.dom.style.top = this.transform.top;
        this.dom.style.width = this.transform.width;
        this.dom.style.height = this.transform.height;
        this.dom.style.backgroundSize = 'cover';
        this.dom.style.backgroundPosition = 'center';
        this.dom.style.backgroundRepeat = 'no-repeat';
        this.dom.style.backgroundImage = "url("+this.imgSrc+")";
        this.dom.style.borderRadius = (gameCanvasScale * this.round) + 'px';
        this.dom.style.textAlign = "center"; 
        this.dom.style.fontFamily = this.fontFamily;
        this.dom.style.fontSize = (gameCanvasScale * this.fontSize) + 'px';
        this.dom.style.fontWeight = 100;
        this.dom.style.color = this.color;
        this.dom.style.letterSpacing = (gameCanvasScale * this.letterSpacing) + 'px';
        this.dom.innerHTML = this.text;
        this.dom.addEventListener('click', this.onclick);
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom);
        }
        this.SetEnabled(false);
    }

    UIImage(_data) {
        this.isImage = true;
        this.imgSrc = _data.imgSrc;
        this.dom = document.createElement('div');
        this.dom.style.position = 'absolute';
        this.dom.style.display = 'block';
        this.dom.style.border = 'none';
        this.dom.style.left = this.transform.left;
        this.dom.style.top = this.transform.top;
        this.dom.style.width = this.transform.width;
        this.dom.style.height = this.transform.height;
        this.dom.style.backgroundSize = 'cover';
        this.dom.style.backgroundPosition = 'center';
        this.dom.style.backgroundRepeat = 'no-repeat';
        this.dom.style.backgroundImage = "url("+this.imgSrc+")";
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom);
        }
        this.SetEnabled(false);
    }

    UISprite(_data) {
        this.isSprite = true;
        this.imgSrc = _data.imgSrc;
        this.dom = document.createElement('div');
        this.dom.style.position = 'absolute';
        this.dom.style.display = 'block';
        this.dom.style.border = 'none';
        this.dom.style.left = this.transform.left;
        this.dom.style.top = this.transform.top;
        this.dom.style.width = this.transform.width;
        this.dom.style.height = this.transform.height;
        this.dom.style.backgroundSize = 'cover';
        this.dom.style.backgroundPosition = 'center';
        this.dom.style.backgroundRepeat = 'no-repeat';
        this.dom.style.backgroundImage = "url("+this.imgSrc+")";
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom);
        }
        this.SetEnabled(false);
    }

    UIBallon(_data) {
        this.isBallon = true;
        this.imgSrc = _data.imgSrc;
        this.fontFamily = _data.fontFamily;
        this.fontSize = _data.fontSize;
        this.letterSpacing = _data.letterSpacing;
        this.color = _data.color;
        this.text = _data.text;
        this.dom = document.createElement('div');
        this.dom.style.position = 'absolute';
        this.dom.style.display = 'block';
        this.dom.style.border = 'none';
        this.dom.style.left = this.transform.left;
        this.dom.style.top = this.transform.top;
        this.dom.style.width = this.transform.width;
        this.dom.style.height = this.transform.height;
        this.dom.style.backgroundSize = 'cover';
        this.dom.style.backgroundPosition = 'center';
        this.dom.style.backgroundRepeat = 'no-repeat';
        this.dom.style.backgroundImage = "url("+this.imgSrc+")";
        this.dom.style.alignContent = 'center';
        this.dom.style.textAlign = "center"; 
        this.dom.style.borderRadius = (gameCanvasScale * this.round) + 'px';
        this.dom.style.fontFamily = this.fontFamily;
        this.dom.style.fontSize = (gameCanvasScale * this.fontSize) + 'px';
        this.dom.style.color = this.color;
        this.dom.style.letterSpacing = (gameCanvasScale * this.letterSpacing) + 'px';
        this.dom.innerHTML = this.text;
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom);
        }
        this.SetEnabled(false);
    }

    AddCoveredBallon(_data) {
        this.imgSrc2 = _data.imgSrc2;
        this.dom2 = document.createElement('div');
        this.dom2.style.position = 'absolute';
        this.dom2.style.display = 'none';
        this.dom2.style.border = 'none';
        this.dom2.style.left = this.transform.left;
        this.dom2.style.top = this.transform.top;
        this.dom2.style.width = this.transform.width;
        this.dom2.style.height = this.transform.height;
        this.dom2.style.backgroundSize = 'cover';
        this.dom2.style.backgroundPosition = 'center';
        this.dom2.style.backgroundRepeat = 'no-repeat';
        this.dom2.style.backgroundImage = "url("+this.imgSrc2+")";
        this.dom2.style.alignContent = 'center';
        this.dom2.style.textAlign = "center";
        this.dom2.style.borderRadius = (gameCanvasScale * this.round) + 'px';
        this.dom2.style.fontFamily = this.fontFamily;
        this.dom2.style.fontSize = (gameCanvasScale * this.fontSize) + 'px';
        this.dom2.style.color = this.color;
        this.dom2.style.letterSpacing = (gameCanvasScale * this.letterSpacing) + 'px';
        this.dom2.innerHTML = this.text;
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom2);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom2);
        }
    }

    UILoadingBar(_data) {
        this.isLoadingBar = true;
        this.color1 = _data.color1;
        this.color2 = _data.color2;
        this.round = _data.round;
        this.dom = document.createElement('div');
        this.dom.style.position = 'absolute';
        this.dom.style.display = 'block';
        this.dom.style.border = 'none';
        this.dom.style.left = this.transform.left;
        this.dom.style.top = this.transform.top;
        this.dom.style.width = this.transform.width;
        this.dom.style.height = this.transform.height;
        this.dom.style.background = this.color1;
        this.dom.style.borderRadius = (gameCanvasScale * this.round) + 'px';
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom);
        }
        this.dom2 = document.createElement('div');
        this.dom2.style.width = '0%';
        this.dom2.style.height = '100%';
        this.dom2.style.background = this.color2;
        this.dom2.style.borderRadius = (gameCanvasScale * this.round * 2) + 'px';
        // this.dom2.style.transition = "width 0.3s ease-in-out";
        this.dom.appendChild(this.dom2);
        this.SetEnabled(false);
    }

    UpdateLoadingBar(_progress) {
        this.dom2.style.width = Math.max(0, Math.min(100, _progress)) +'%';
    }

    UIClock(_data) {
        this.isClock = true;
        this.color1 = _data.color1;
        this.color2 = _data.color2;
        this.thickness = _data.thickness;
        this.dom = document.createElement('div');
        this.dom.style.position = 'absolute';
        this.dom.style.display = 'block';
        this.dom.style.boxSizing = 'border-box';
        this.dom.style.border = (gameCanvasScale * this.thickness) + 'px solid ' + this.color1;
        this.dom.style.borderRadius = '50%';
        this.dom.style.left = this.transform.left;
        this.dom.style.top = this.transform.top;
        this.dom.style.width = this.transform.width;
        this.dom.style.height = this.transform.height;
        if (this.transform.parent == '') {
            gameUI.appendChild(this.dom);
        } else {
            this.library.data[this.transform.parent].dom.appendChild(this.dom);
        }
        this.SetEnabled(false);
    }

}

class Game2QuestionLibrary {
    constructor(_data) {
        this.data = {};
        for (const questionId in _data) {
            let questionData = _data[questionId];
            this.data[questionId] = new Game2Question(questionData);
        }
    }
}

class Game2Question {
    constructor(_data) {
        this.question = _data.question;
        this.ans1 = _data.ans1;
        this.ans2 = _data.ans2;
        this.ans3 = _data.ans3;
        this.ans4 = _data.ans4;
        this.ansCount = _data.ans4 == "" ? (_data.ans3 == "" ? 2 : 3) : 4;
        this.correct = _data.correct;
        this.isEmotional = _data.isEmotional;
        this.layout = _data.layout;
    }
    IsCorrect(_answerId) {
        for (let i = 0; i < this.correct.length; i++) {
            if (this.correct[i] == _answerId) {
                return true;
            }
        }
        return false;
    }
}
