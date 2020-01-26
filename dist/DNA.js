!function(t){var e={};function s(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(o,r,function(e){return t[e]}.bind(null,r));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e){t.exports=class{constructor(){}get gameObject(){return this._gameObject||null}get transform(){return this.gameObject?this.gameObject.transform:null}update(t){}render(t){}}},function(t,e,s){const o={GameObject:s(2),GameLoop:s(4),Component:s(0),Components:{Camera:s(5),Text:s(6),Shape:s(7),Hitbox:s(8)},Input:{Mouse:s(9)},ShapeTypes:{Circle:s(10)}};window.DNA=o},function(t,e,s){const o=s(3);t.exports=class{constructor(t=0,e=0,s=0){this._transform=new o(this,t,e,s),this.gameObjects=[],this.components=[]}get gameObject(){return this}get transform(){return this._transform||null}addGameObject(t,e=!1,s=!1){let o,r,i;t.parent&&(e&&(o=t.transform.absoluteX,r=t.transform.absoluteY),s&&(i=t.transform.absoluteRotation),t.parent.removeGameObject(t)),t.parent=this,this.gameObjects.push(t),t.parent&&e&&(t.transform.absoluteX=o,t.transform.absoluteY=r),t.parent&&s&&(t.transform.absoluteRotation=i),t.transform._cacheAbsolutePosition()}removeGameObject(t){let e=this.gameObjects.indexOf(t);e>=0&&this.gameObjects.splice(e,1),t.transform._cacheAbsolutePosition()}addComponent(t){t._gameObject=this,this.components.push(t)}removeComponent(t){let e=this.components.indexOf(t);e>=0&&this.components.splice(e,1)}update(t){this.components.forEach(e=>{e.update(t)}),this.gameObjects.forEach(e=>{e.update(t)})}render(t){this.components.forEach(e=>{e.render(t)}),this.gameObjects.forEach(e=>{t.save(),t.translate(e.transform.x,-e.transform.y),t.rotate(e.transform.rotation),e.render(t),t.restore()})}}},function(t,e){t.exports=class{constructor(t,e=0,s=0,o=0){this._gameObject=t,this._x=e,this._y=s,this._rotation=o,this._cacheAbsolutePosition()}get gameObject(){return this._gameObject}get transform(){return this}get x(){return this._x}set x(t){this._x=t,this._absoluteDirty=!0}get y(){return this._y}set y(t){this._y=t,this._absoluteDirty=!0}get rotation(){return this._rotation}set rotation(t){this._rotation=t,this._absoluteDirty=!0}get absoluteX(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteX}set absoluteX(t){this._setAbsolutePosition(t,this.absoluteY)}get absoluteY(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteY}set absoluteY(t){this._setAbsolutePosition(this.absoluteX,t)}get absoluteRotation(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteRotation}set absoluteRotation(t){this.rotation=t-this.gameObject.parent.transform.absoluteRotation}_cacheAbsolutePosition(){const t=this.gameObject.parent?this.gameObject.parent.transform.absoluteX:0,e=this.gameObject.parent?this.gameObject.parent.transform.absoluteY:0,s=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0,o=Math.sin(-s),r=Math.cos(-s);this._absoluteX=this.x*r-this.y*o+t,this._absoluteY=this.x*o+this.y*r+e,this._absoluteRotation=s+this._rotation,this._absoluteDirty=!1}_setAbsolutePosition(t,e){const s=this.gameObject.parent?this.gameObject.parent.transform.absoluteX:0,o=this.gameObject.parent?this.gameObject.parent.transform.absoluteY:0,r=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0,i=t-s,n=e-o,a=Math.sin(r),h=Math.cos(r);this.x=i*h-n*a,this.y=i*a+n*h}}},function(t,e){t.exports=class{constructor(t){this.gameObject=t,this._currAnimationFrame=window.requestAnimationFrame(t=>{this.gameLoop(t)})}gameLoop(t){this.prevTime||(this.prevTime=t);let e=(t-this.prevTime)/1e3;return this.prevTime=t,this.gameObject.update(e),window.requestAnimationFrame(t=>{this._currAnimationFrame=this.gameLoop(t)})}}},function(t,e,s){const o=s(0);t.exports=class extends o{constructor(t,e){super(),this._canvas=t,this.ctx=t.getContext("2d"),this.root=e,this._width=t.width,this._height=t.height,this._x=this._width/2,this._y=this._height/2,this.ctx.translate(this._x,this._y)}update(){this.ctx.clearRect(-this._x,-this._y,this._width,this._height),this.ctx.save();const t=this.root.transform.absoluteX-this.transform.absoluteX,e=this.root.transform.absoluteY-this.transform.absoluteY,s=this.root.transform.absoluteRotation-this.transform.absoluteRotation;this.ctx.rotate(s),this.ctx.translate(t,-e),this.root.render(this.ctx),this.ctx.restore()}}},function(t,e,s){const o=s(0);t.exports=class extends o{constructor(t){super(),this.text=t}render(t){t.font="12px serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,0,0)}}},function(t,e,s){const o=s(0);t.exports=class extends o{constructor(t){super(),this.shapeType=t}render(t){t.strokeStyle="black",this.shapeType.render(t)}}},function(t,e,s){const o=s(0);t.exports=class extends o{constructor(t){super(),this.shapeType=t}}},function(t,e){t.exports=class{constructor(t){this._x=0,this._y=0,this.camera=t,document.addEventListener("mousemove",t=>{this._onMouseMove(t)})}get x(){return this._x}get y(){return this._y}_onMouseMove(t){const e=this.camera._canvas.getBoundingClientRect();this._x=t.clientX-Math.round(e.left-.5)-this.camera._x,this._y=-(t.clientY-Math.round(e.top-.5)-this.camera._y)}}},function(t,e){t.exports=class{constructor(t){this.radius=t}render(t){t.beginPath(),t.arc(0,0,this.radius,0,2*Math.PI),t.stroke()}isCollidingWith(t,e){return e.shapeType._isCollidingWithCircle(e,t)}_isCollidingWithCircle(t,e){return Math.sqrt(Math.pow(t.transform.absoluteX-e.transform.absoluteX,2)+Math.pow(t.transform.absoluteY-e.transform.absoluteY,2))<=t.shapeType.radius+e.shapeType.radius}}}]);