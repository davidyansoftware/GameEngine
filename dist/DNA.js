!function(t){var e={};function s(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(o,n,function(e){return t[e]}.bind(null,n));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e){t.exports=class{constructor(){}update(t){}render(t){}}},function(t,e,s){const o={GameObject:s(2),GameLoop:s(4),Components:{Camera:s(5),Text:s(6)}};window.DNA=o},function(t,e,s){const o=s(3);t.exports=class{constructor(t=0,e=0,s=0){this.transform=new o(this,t,e,s),this.gameObjects=[],this.components=[]}addGameObject(t){t.parent&&t.parent.removeGameObject(t),t.parent=this,this.gameObjects.push(t),t.transform._cacheAbsolutePosition()}removeGameObject(t){let e=this.gameObjects.indexOf(t);e>=0&&this.gameObjects.splice(e,1),t.transform._cacheAbsolutePosition()}addComponent(t){t.gameObject=this,this.components.push(t)}removeComponent(t){let e=this.components.indexOf(t);e>=0&&this.components.splice(e,1)}update(t){this.components.forEach(e=>{e.update(t)}),this.gameObjects.forEach(e=>{e.update(t)})}render(t){this.components.forEach(e=>{e.render(t)}),this.gameObjects.forEach(e=>{e.render(t)})}}},function(t,e){t.exports=class{constructor(t,e=0,s=0,o=0){this.gameObject=t,this._x=e,this._y=s,this._rotation=o,this._cacheAbsolutePosition()}get absoluteX(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteX}set absoluteX(t){this._setAbsolutePosition(t,this.absoluteY)}get absoluteY(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteY}set absoluteY(t){this._setAbsolutePosition(this.absoluteX,t)}get absoluteRotation(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteRotation}set absoluteRotation(t){this.rotation=t-this.gameObject.parent.transform.absoluteRotation}get x(){return this._x}set x(t){this._x=t,this._absoluteDirty=!0}get y(){return this._y}set y(t){this._y=t,this._absoluteDirty=!0}get rotation(){return this._rotation}set rotation(t){this._rotation=t,this._absoluteDirty=!0}_cacheAbsolutePosition(){const t=this.gameObject.parent?this.gameObject.parent.transform.absoluteX:0,e=this.gameObject.parent?this.gameObject.parent.transform.absoluteY:0,s=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0,o=Math.sin(-s),n=Math.cos(-s);this._absoluteX=this.x*n-this.y*o+t,this._absoluteY=this.x*o+this.y*n+e,this._absoluteRotation=s+this._rotation,this._absoluteDirty=!1}_setAbsolutePosition(t,e){const s=this.gameObject.parent?this.gameObject.parent.transform.absoluteX:0,o=this.gameObject.parent?this.gameObject.parent.transform.absoluteY:0,n=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0,i=t-s,r=e-o,a=Math.sin(n),c=Math.cos(n);this.x=i*c-r*a,this.y=i*a+r*c}}},function(t,e){t.exports=class{constructor(t){this.gameObject=t,this._currAnimationFrame=this.gameLoop()}get currAnimationFrame(){return this._currAnimationFrame}gameLoop(){return this.gameObject.update(),window.requestAnimationFrame(()=>{this._currAnimationFrame=this.gameLoop()})}}},function(t,e,s){const o=s(0);t.exports=class extends o{constructor(t,e){super(),this.ctx=t,this.root=e}update(){this.root.render(this.ctx)}}},function(t,e,s){const o=s(0);t.exports=class extends o{constructor(t){super(),this.text=t}render(t){t.fillText(this.text,0,0)}}}]);