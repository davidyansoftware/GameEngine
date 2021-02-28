var DNA=function(){"use strict";class t{constructor(){this._x=0,this._y=0,this._magnitude=0,this._angle=0,this._dirtyCartesian=!1,this._dirtyPolar=!1}get x(){return this._dirtyCartesian&&this.recalculateCartesian(),this._x}set x(t){this._dirtyCartesian&&this.recalculateCartesian(),this._x=t,this._dirtyPolar=!0}get y(){return this._dirtyCartesian&&this.recalculateCartesian(),this._y}set y(t){this._dirtyCartesian&&this.recalculateCartesian(),this._y=t,this._dirtyPolar=!0}get magnitude(){return this._dirtyPolar&&this.recalculatePolar(),this._magnitude}set magnitude(t){this._dirtyPolar&&this.recalculatePolar(),this._magnitude=t,this._dirtyCartesian=!0}get angle(){return this._dirtyPolar&&this.recalculatePolar(),this._angle}set angle(t){this._dirtyPolar&&this.recalculatePolar(),this._angle=t,this._dirtyCartesian=!0}recalculateCartesian(){this._x=Math.sin(this._angle)*this._magnitude,this._y=Math.cos(this._angle)*this._magnitude,this._dirtyCartesian=!1}recalculatePolar(){this._magnitude=Math.sqrt(Math.pow(this._x,2)+Math.pow(this._y,2)),this._angle=-Math.atan2(this._y,this._x)+Math.PI/2,this._dirtyPolar=!1}}class s extends t{constructor(t,s){super(),this._x=t,this._y=s,this._dirtyPolar=!0}}class o{constructor(t,s=0,o=0,e=0){this._absoluteDirty=!1,this._absoluteX=0,this._absoluteY=0,this._absoluteRotation=0,this.transform=t,this._x=s,this._y=o,this._rotation=e,this._cacheAbsolutePosition()}get x(){return this._x}set x(t){this._x=t,this.markAbsoluteDirty(),this.transform._positionChanged()}get y(){return this._y}set y(t){this._y=t,this.markAbsoluteDirty(),this.transform._positionChanged()}get rotation(){return this._rotation}set rotation(t){this._rotation=t,this.markAbsoluteDirty(),this.transform._positionChanged()}get absoluteX(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteX}set absoluteX(t){this._setAbsolutePosition(t,this.absoluteY),this.transform._positionChanged()}get absoluteY(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteY}set absoluteY(t){this._setAbsolutePosition(this.absoluteX,t),this.transform._positionChanged()}get absoluteRotation(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteRotation}set absoluteRotation(t){this._setAbsoluteRotation(t),this.transform._positionChanged()}getAbsoluteX(t=0,s=0,o=0){const e=this.absoluteRotation+o;return this.absoluteX+t*Math.cos(e)+s*Math.sin(e)}getAbsoluteY(t=0,s=0,o=0){const e=this.absoluteRotation+o;return this.absoluteY-t*Math.sin(e)+s*Math.cos(e)}_cacheAbsolutePosition(){const t=this.transform.gameObject.parent?this.transform.gameObject.parent.transform.position.absoluteX:0,s=this.transform.gameObject.parent?this.transform.gameObject.parent.transform.position.absoluteY:0,o=this.transform.gameObject.parent?this.transform.gameObject.parent.transform.position.absoluteRotation:0,e=Math.sin(-o),i=Math.cos(-o);this._absoluteX=this.x*i-this.y*e+t,this._absoluteY=this.x*e+this.y*i+s,this._absoluteRotation=o+this._rotation,this._absoluteDirty=!1}_setAbsolutePosition(t,s){const o=this.transform.gameObject.parent?this.transform.gameObject.parent.transform.position.absoluteX:0,e=this.transform.gameObject.parent?this.transform.gameObject.parent.transform.position.absoluteY:0,i=this.transform.gameObject.parent?this.transform.gameObject.parent.transform.position.absoluteRotation:0,r=t-o,n=s-e,a=Math.sin(i),h=Math.cos(i);this.x=r*h-n*a,this.y=r*a+n*h}_setAbsoluteRotation(t){const s=this.transform.gameObject.parent?this.transform.gameObject.parent.transform.position.absoluteRotation:0;this.rotation=t-s}markAbsoluteDirty(){this._absoluteDirty=!0,this.transform.gameObject.gameObjects.forEach((t=>{t.transform.position.markAbsoluteDirty()}))}}class e{constructor(t,s=0,e=0,i=0,r){this._gameObject=t,this.position=new o(this,s,e,i),this.shape=r}_positionChanged(){this._onPositionChange(),this.gameObject.gameObjects.forEach((t=>{t.transform._positionChanged()}))}get gameObject(){return this._gameObject}get transform(){return this}}const i=new s(0,0);function r(t,s){const o=s.transform.position.absoluteX,e=s.transform.position.absoluteY,r=s.transform.position.absoluteRotation,n=s.transform.shape,a=Math.cos(r)*(t.transform.position.x-o)-Math.sin(r)*(t.transform.position.y-e)+o,h=Math.sin(r)*(t.transform.position.x-o)+Math.cos(r)*(t.transform.position.y-e)+e,c=o-n.width/2,l=c+n.width,u=e-n.height/2,m=u+n.height;let p,d;p=a<c?c:a>l?l:a,d=h<u?u:h>m?m:h,i.x=a-p,i.y=h-d;const f=t.transform.shape;return i.magnitude<=f.radius}function n(t,s){return function(t,s){const o=[t,s];for(let a=0;a<o.length;a++){var e=o[a];for(let o=0;o<e.length;o++){var i=(o+1)%e.length,r=e[o],n=e[i];const a={x:n.y-r.y,y:r.x-n.x};let h=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY;for(let s=0;s<t.length;s++){const o=a.x*t[s].x+a.y*t[s].y;o<h&&(h=o),o>c&&(c=o)}let l=Number.POSITIVE_INFINITY,u=Number.NEGATIVE_INFINITY;for(let t=0;t<s.length;t++){const o=a.x*s[t].x+a.y*s[t].y;o<l&&(l=o),o>u&&(u=o)}if(c<l||u<h)return!1}}return!0}(t._getCorners(),s._getCorners())}class a extends e{constructor(t,s=0,o=0,e=0,i){super(t,s,o,e,i),this.circle=i}_onPositionChange(){}isHitting(t){return t.transform._isHittingCircle(this)}_isHittingCircle(t){return function(t,s){let o=Math.sqrt(Math.pow(t.transform.position.absoluteX-s.transform.position.absoluteX,2)+Math.pow(t.transform.position.absoluteY-s.transform.position.absoluteY,2));const e=t.transform.shape,i=s.transform.shape;return o<=e.radius+i.radius}(this,t)}_isHittingRectangle(t){return r(this,t)}}class h{constructor(t){this.radius=t}createTransform(t,s,o,e){return new a(t,s,o,e,this)}render(t,s){t.beginPath(),t.arc(0,0,this.radius,0,2*Math.PI),t.stroke(),s&&t.fill()}isEnclosing(t,s){return s.transform.shape._isEnclosedByCircle(s,t)}isExcluding(t,s){return s.transform.shape._isExcludedByCircle(s,t)}_enclose(t,s){s.transform.shape._becomeEnclosedByCircle(s,t)}_exclude(t,s){s.transform.shape._becomeExcludedByCircle(s,t)}_isEnclosedByCircle(t,s){return Math.sqrt(Math.pow(t.transform.position.absoluteX-s.transform.position.absoluteX,2)+Math.pow(t.transform.position.absoluteY-s.transform.position.absoluteY,2))<s.transform.shape.radius-this.radius}_isExcludedByCircle(t,s){return Math.sqrt(Math.pow(t.transform.position.absoluteX-s.transform.position.absoluteX,2)+Math.pow(t.transform.position.absoluteY-s.transform.position.absoluteY,2))>s.transform.shape.radius+this.radius}_becomeEnclosedByCircle(t,s){var o;if(!(null===(o=s.transform)||void 0===o?void 0:o.shape.isEnclosing(s,t))){h.coordinate.x=t.transform.position.absoluteX-s.transform.position.absoluteX,h.coordinate.y=t.transform.position.absoluteY-s.transform.position.absoluteY;const o=s.transform.shape,e=t.transform.shape;h.coordinate.magnitude=o.radius-e.radius-1,t.transform.position.absoluteX=s.transform.position.absoluteX+h.coordinate.x,t.transform.position.absoluteY=s.transform.position.absoluteY+h.coordinate.y}}_becomeExcludedByCircle(t,s){var o;if(!(null===(o=s.transform)||void 0===o?void 0:o.shape.isExcluding(s,t))){h.coordinate.x=t.transform.position.absoluteX-s.transform.position.absoluteX,h.coordinate.y=t.transform.position.absoluteY-s.transform.position.absoluteY;const o=s.transform.shape,e=t.transform.shape;h.coordinate.magnitude=o.radius+e.radius+1,t.transform.position.absoluteX=s.transform.position.absoluteX+h.coordinate.x,t.transform.position.absoluteY=s.transform.position.absoluteY+h.coordinate.y}}_isEnclosedByRectangle(t,s){const o=s.transform.position.absoluteX,e=s.transform.position.absoluteY,i=s.transform.position.absoluteRotation,r=s.transform.shape,n=Math.cos(i)*(t.transform.position.x-o)-Math.sin(i)*(t.transform.position.y-e)+o,a=Math.sin(i)*(t.transform.position.x-o)+Math.cos(i)*(t.transform.position.y-e)+e,h=o-r.width/2,c=h+r.width,l=e-r.height/2,u=l+r.height,m=t.transform.shape;return!(h>=n-m.radius)&&(!(c<=n+m.radius)&&(!(l>=a-m.radius)&&!(u<=a+m.radius)))}_isExcludedByRectangle(t,s){const o=s.transform.position.absoluteX,e=s.transform.position.absoluteY,i=s.transform.position.absoluteRotation,r=s.transform.shape,n=Math.cos(i)*(t.transform.position.x-o)-Math.sin(i)*(t.transform.position.y-e)+o,a=Math.sin(i)*(t.transform.position.x-o)+Math.cos(i)*(t.transform.position.y-e)+e,h=o-r.width/2,c=h+r.width,l=e-r.height/2,u=l+r.height,m=t.transform.shape;return h>n+m.radius||(c<n-m.radius||(l>a+m.radius||u<a-m.radius))}}h.coordinate=new s(0,0);var c="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var l,u=(function(t){(function(){var s,o,e,i,r,n;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(t.exports=function(){return(s()-r)/1e6},o=process.hrtime,i=(s=function(){var t;return 1e9*(t=o())[0]+t[1]})(),n=1e9*process.uptime(),r=i-n):Date.now?(t.exports=function(){return Date.now()-e},e=Date.now()):(t.exports=function(){return(new Date).getTime()-e},e=(new Date).getTime())}).call(c)}(l={exports:{}},l.exports),l.exports);class m{constructor(){}get gameObject(){return this._gameObject||null}get transform(){return this.gameObject?this.gameObject.transform:null}update(t){}render(t){}}class p{constructor(t,s,o,e){this._pressables={},t.addEventListener(s,(t=>{const s=t[e],o=this._pressables[s];if(o){o._pressed=!0;for(const s of o._onPressDown)s(t)}})),t.addEventListener(o,(t=>{const s=t[e],o=this._pressables[s];if(o){o._pressed=!1;for(const s of o._onPressUp)s(t)}}))}}class d{constructor(){this._pressed=!1,this._onPressDown=[],this._onPressUp=[]}get pressed(){return this._pressed}}class f extends d{constructor(){super()}addMouseDown(t){this._onPressDown.push(t)}addMouseUp(t){this._onPressUp.push(t)}}class b extends d{constructor(){super()}addKeyDown(t){this._onPressDown.push(t)}addKeyUp(t){this._onPressUp.push(t)}}class g extends e{constructor(t,o=0,e=0,i=0,r){super(t,o,e,i,r),this.rectangle=r,this.topLeft=new s(0,0),this.topRight=new s(0,0),this.bottomLeft=new s(0,0),this.bottomRight=new s(0,0),this.corners=[this.topLeft,this.topRight,this.bottomLeft,this.bottomRight],this.dirtyCorners=!0}cacheCorners(){const t=-this.rectangle.width/2,s=this.rectangle.width/2,o=this.rectangle.height/2,e=-this.rectangle.height/2;this.topLeft.x=this.position.getAbsoluteX(t,o),this.topLeft.y=this.position.getAbsoluteY(t,o),this.topRight.x=this.position.getAbsoluteX(s,o),this.topRight.y=this.position.getAbsoluteY(s,o),this.bottomLeft.x=this.position.getAbsoluteX(t,e),this.bottomLeft.y=this.position.getAbsoluteY(t,e),this.bottomRight.x=this.position.getAbsoluteX(s,e),this.bottomRight.y=this.position.getAbsoluteY(s,e)}_getCorners(){return this.dirtyCorners&&(this.cacheCorners(),this.dirtyCorners=!1),this.corners}_onPositionChange(){this.dirtyCorners=!0}isHitting(t){return t.transform._isHittingRectangle(this)}_isHittingCircle(t){return r(t,this)}_isHittingRectangle(t){return n(t,this)}}return DNA={GameObject:class{constructor({x:t=0,y:s=0,rotation:o=0,shape:e=new h(0)}={}){this.gameObjects=[],this.components=[],this._dead=!1,this._transform=e.createTransform(this,t,s,o)}get gameObject(){return this}get transform(){return this._transform}get parent(){return this._parent}addGameObject(t,s=!1,o=!1){let e=0,i=0,r=0;t._parent&&(s&&(e=t.transform.position.absoluteX,i=t.transform.position.absoluteY),o&&(r=t.transform.position.absoluteRotation),t._parent.removeGameObject(t)),t._parent=this,this.gameObjects.push(t),t._parent&&s&&(t.transform.position.absoluteX=e,t.transform.position.absoluteY=i),t._parent&&o&&(t.transform.position.absoluteRotation=r),t.transform.position._cacheAbsolutePosition()}removeGameObject(t){let s=this.gameObjects.indexOf(t);s>=0&&this.gameObjects.splice(s,1),t.transform.position._cacheAbsolutePosition()}addComponent(t){t._gameObject=this,this.components.push(t)}removeComponent(t){let s=this.components.indexOf(t);s>=0&&this.components.splice(s,1)}update(t){this.components.forEach((s=>{s.update(t)})),this.gameObjects.forEach((s=>{s.update(t)})),this.gameObjects.forEach((t=>{t._dead&&t._destroyNow()}))}render(t){this.components.forEach((s=>{s.render(t)})),this.gameObjects.forEach((s=>{t.save(),t.translate(s.transform.position.x,-s.transform.position.y),t.rotate(s.transform.position.rotation),s.render(t),t.restore()}))}destroy(){this._dead=!0}_destroyNow(){var t;null===(t=this._parent)||void 0===t||t.removeGameObject(this)}},GameLoop:class{constructor(t){this.gameObject=t,this.prevTime=u(),this.currAnimationFrame=requestAnimationFrame((t=>{this.gameLoop(t)}))}gameLoop(t){let s=(t-this.prevTime)/1e3;return this.prevTime=t,this.gameObject.update(s),requestAnimationFrame((t=>{this.currAnimationFrame=this.gameLoop(t)}))}},Component:m,Components:{EnclosingBoundary:class extends m{constructor(t=[]){super(),this.encloses=t}update(t){this.encloses.forEach((t=>{var s;null===(s=this.transform)||void 0===s||s.shape._enclose(this.transform,t)}))}},ExcludingBoundary:class extends m{constructor(t=[]){super(),this.excludes=t}update(t){this.excludes.forEach((t=>{var s;null===(s=this.transform)||void 0===s||s.shape._exclude(this.transform,t)}))}},Camera:class extends m{constructor(t,s,o){super(),this._canvas=t;const e=t.getContext("2d");if(null==e)throw new Error("Canvas does not have CanvasRenderingContext2D");this.ctx=e,this.root=s,this.backgroundColor=o,this._width=t.width,this._height=t.height,this._x=this._width/2,this._y=this._height/2,this.ctx.translate(this._x,this._y)}update(t){if(null==this.transform)return;this.ctx.clearRect(-this._x,-this._y,this._width,this._height),this.backgroundColor&&(this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(-this._x,-this._y,this._width,this._height)),this.ctx.save();const s=this.root.transform.position.absoluteX-this.transform.position.absoluteX,o=this.root.transform.position.absoluteY-this.transform.position.absoluteY,e=this.root.transform.position.absoluteRotation-this.transform.position.absoluteRotation;this.ctx.rotate(e),this.ctx.translate(s,-o),this.root.render(this.ctx),this.ctx.restore()}},Text:class extends m{constructor(t){super(),this.text=t}render(t){t.font="12px serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,0,0)}},Renderer:class extends m{constructor(t){super(),this.fill=!1,this.fillStyle="#000",t&&(this.fill=!0,this.fillStyle=t)}render(t){var s;t.strokeStyle="black",t.fillStyle=this.fillStyle,null===(s=this.transform)||void 0===s||s.shape.render(t,this.fill)}},Hitbox:class extends m{constructor(t=[]){super(),this.hurtboxes=t,this.onHit=[],this.currHitting=new Set}update(t){var s;for(const t of this.hurtboxes){if(null===(s=this.transform)||void 0===s?void 0:s.isHitting(t.transform)){this.currHitting.add(t),t.currHitting.add(this);for(const s of this.onHit)s(this,t)}else this.currHitting.delete(t),t.currHitting.delete(this)}}addOnHit(t){this.onHit.push(t)}isHitting(t){return this.currHitting.has(t)}},PhysicalBody:class extends m{constructor(t){super(),this.velocity=new s(0,0),this.drag=t}update(t){this.transform&&(this.transform.position.x+=this.velocity.x*t,this.transform.position.y+=this.velocity.y*t),this.velocity.magnitude*=1-this.drag}addVelocity(t){this.velocity.x+=t.x,this.velocity.y+=t.y}},Physics:class extends m{constructor(t,s){super(),this.x=t,this.y=s}update(t){null!=this.gameObject&&(this.gameObject.transform.position.x+=this.x*t,this.gameObject.transform.position.y+=this.y*t)}}},Input:{Keyboard:class extends p{constructor(t){super(t,"keydown","keyup","keyCode")}getKey(t){let s=this._pressables[t];return s||(s=new b,this._pressables[t]=s,s)}},Mouse:class extends p{constructor(t,s,o=!1){super(t,"mousedown","mouseup","button"),this._x=0,this._y=0,this.camera=s,t.addEventListener("mousemove",(t=>{this._onMouseMove(t)})),o&&t.addEventListener("contextmenu",(t=>{t.preventDefault()}))}getButton(t){let s=this._pressables[t];return s||(s=new f,this._pressables[t]=s,s)}get x(){return this._x+this.camera.transform.position.absoluteX}get y(){return this._y+this.camera.transform.position.absoluteY}_onMouseMove(t){const s=this.camera._canvas.getBoundingClientRect();this._x=t.clientX-Math.round(s.left-.5)-this.camera._x,this._y=-(t.clientY-Math.round(s.top-.5)-this.camera._y)}}},Shapes:{Circle:h,Rectangle:class{constructor(t,s){this.width=t,this.height=s}createTransform(t,s,o,e){return new g(t,s,o,e,this)}render(t){t.strokeRect(-this.width/2,-this.height/2,this.width,this.height)}isEnclosing(t,s){return s.transform.shape._isEnclosedByRectangle(s,t)}isExcluding(t,s){return s.transform.shape._isExcludedByRectangle(s,t)}}},Coordinate:{Cartesian:s,Polar:class extends t{constructor(t,s){super(),this._magnitude=t,this._angle=s,this._dirtyCartesian=!0}}}}}();
