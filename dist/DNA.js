var DNA=function(){"use strict";class t{constructor(t,s=0,e=0,r=0,a){this._absoluteDirty=!1,this._absoluteX=0,this._absoluteY=0,this._absoluteRotation=0,this._gameObject=t,this._x=s,this._y=e,this._rotation=r,this.shape=a,this._cacheAbsolutePosition()}get gameObject(){return this._gameObject}get transform(){return this}get x(){return this._x}set x(t){this._x=t,this.markAbsoluteDirty()}get y(){return this._y}set y(t){this._y=t,this.markAbsoluteDirty()}get rotation(){return this._rotation}set rotation(t){this._rotation=t,this.markAbsoluteDirty()}get absoluteX(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteX}set absoluteX(t){this._setAbsolutePosition(t,this.absoluteY)}get absoluteY(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteY}set absoluteY(t){this._setAbsolutePosition(this.absoluteX,t)}get absoluteRotation(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteRotation}set absoluteRotation(t){this._setAbsoluteRotation(t)}_cacheAbsolutePosition(){const t=this.gameObject.parent?this.gameObject.parent.transform.absoluteX:0,s=this.gameObject.parent?this.gameObject.parent.transform.absoluteY:0,e=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0,r=Math.sin(-e),a=Math.cos(-e);this._absoluteX=this.x*a-this.y*r+t,this._absoluteY=this.x*r+this.y*a+s,this._absoluteRotation=e+this._rotation,this._absoluteDirty=!1}_setAbsolutePosition(t,s){const e=this.gameObject.parent?this.gameObject.parent.transform.absoluteX:0,r=this.gameObject.parent?this.gameObject.parent.transform.absoluteY:0,a=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0,o=t-e,i=s-r,n=Math.sin(a),h=Math.cos(a);this.x=o*h-i*n,this.y=o*n+i*h}_setAbsoluteRotation(t){const s=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0;this.rotation=t-s}markAbsoluteDirty(){this._absoluteDirty=!0,this.gameObject.gameObjects.forEach((t=>{t.transform.markAbsoluteDirty()}))}}function s(t){t._x=Math.sin(t._angle)*t._magnitude,t._y=Math.cos(t._angle)*t._magnitude,t._dirtyCartesian=!1}function e(t){t._magnitude=Math.sqrt(Math.pow(t._x,2)+Math.pow(t._y,2)),t._angle=-Math.atan2(t._y,t._x)+Math.PI/2,t._dirtyPolar=!1}class r{constructor(){this._x=0,this._y=0,this._magnitude=0,this._angle=0,this._dirtyCartesian=!1,this._dirtyPolar=!1}get x(){return this._dirtyCartesian&&s(this),this._x}set x(t){this._dirtyCartesian&&s(this),this._x=t,this._dirtyPolar=!0}get y(){return this._dirtyCartesian&&s(this),this._y}set y(t){this._dirtyCartesian&&s(this),this._y=t,this._dirtyPolar=!0}get magnitude(){return this._dirtyPolar&&e(this),this._magnitude}set magnitude(t){this._dirtyPolar&&e(this),this._magnitude=t,this._dirtyCartesian=!0}get angle(){return this._dirtyPolar&&e(this),this._angle}set angle(t){this._dirtyPolar&&e(this),this._angle=t,this._dirtyCartesian=!0}}class a extends r{constructor(t,s){super(),this._x=t,this._y=s,this._dirtyPolar=!0}}class o{constructor(t){this.radius=t}render(t){t.beginPath(),t.arc(0,0,this.radius,0,2*Math.PI),t.stroke()}isHitting(t,s){return!!s.transform&&s.transform.shape._isHittingCircle(s,t)}isEnclosing(t,s){return!(!t||!s)&&s.transform.shape._isEnclosedByCircle(s,t)}isExcluding(t,s){return!!s&&s.transform.shape._isExcludedByCircle(s,t)}_enclose(t,s){s&&s.transform.shape._becomeEnclosedByCircle(s,t)}_exclude(t,s){s&&s.transform.shape._becomeExcludedByCircle(s,t)}_isHittingCircle(t,s){if(null==t.transform||null==s.transform)return!1;let e=Math.sqrt(Math.pow(t.transform.absoluteX-s.transform.absoluteX,2)+Math.pow(t.transform.absoluteY-s.transform.absoluteY,2));const r=s.transform.shape;return e<=this.radius+r.radius}_isEnclosedByCircle(t,s){if(null==t.transform||null==s.transform)return!1;return Math.sqrt(Math.pow(t.transform.absoluteX-s.transform.absoluteX,2)+Math.pow(t.transform.absoluteY-s.transform.absoluteY,2))<s.transform.shape.radius-this.radius}_isExcludedByCircle(t,s){if(null==t.transform||null==s.transform)return!1;return Math.sqrt(Math.pow(t.transform.absoluteX-s.transform.absoluteX,2)+Math.pow(t.transform.absoluteY-s.transform.absoluteY,2))>s.transform.shape.radius+this.radius}_becomeEnclosedByCircle(t,s){var e;if(!(null===(e=s.transform)||void 0===e?void 0:e.shape.isEnclosing(s.gameObject,t.gameObject))){o.coordinate.x=t.transform.absoluteX-s.transform.absoluteX,o.coordinate.y=t.transform.absoluteY-s.transform.absoluteY;const e=s.transform.shape,r=t.transform.shape;o.coordinate.magnitude=e.radius-r.radius-1,t.transform.absoluteX=s.transform.absoluteX+o.coordinate.x,t.transform.absoluteY=s.transform.absoluteY+o.coordinate.y}}_becomeExcludedByCircle(t,s){var e;if(!(null===(e=s.transform)||void 0===e?void 0:e.shape.isExcluding(s.gameObject,t.gameObject))){o.coordinate.x=t.transform.absoluteX-s.transform.absoluteX,o.coordinate.y=t.transform.absoluteY-s.transform.absoluteY;const e=s.transform.shape,r=t.transform.shape;o.coordinate.magnitude=e.radius+r.radius+1,t.transform.absoluteX=s.transform.absoluteX+o.coordinate.x,t.transform.absoluteY=s.transform.absoluteY+o.coordinate.y}}}o.coordinate=new a(0,0);class i{constructor(){}get gameObject(){return this._gameObject||null}get transform(){return this.gameObject?this.gameObject.transform:null}update(t){}render(t){}}class n{constructor(t,s,e){this._pressables={},document.addEventListener(t,(t=>{const s=t[e],r=this._pressables[s];if(r){r._pressed=!0;for(const s of r._onPressDown)s(t)}})),document.addEventListener(s,(t=>{const s=t[e],r=this._pressables[s];if(r){r._pressed=!1;for(const s of r._onPressUp)s(t)}}))}}class h{constructor(){this._pressed=!1,this._onPressDown=[],this._onPressUp=[]}get pressed(){return this._pressed}}class u extends h{constructor(){super()}addMouseDown(t){this._onPressDown.push(t)}addMouseUp(t){this._onPressUp.push(t)}}class c extends h{constructor(){super()}addKeyDown(t){this._onPressDown.push(t)}addKeyUp(t){this._onPressUp.push(t)}}class l extends n{constructor(){super("keydown","keyup","keyCode")}getKey(t){let s=this._pressables[t];return s||(s=new c,this._pressables[t]=s,s)}}return DNA={GameObject:class{constructor(s=0,e=0,r=0,a=new o(0)){this._dead=!1,this._transform=new t(this,s,e,r,a),this.gameObjects=[],this.components=[]}get gameObject(){return this}get transform(){return this._transform||null}addGameObject(t,s=!1,e=!1){let r=0,a=0,o=0;t.parent&&(s&&(r=t.transform.absoluteX,a=t.transform.absoluteY),e&&(o=t.transform.absoluteRotation),t.parent.removeGameObject(t)),t.parent=this,this.gameObjects.push(t),t.parent&&s&&(t.transform.absoluteX=r,t.transform.absoluteY=a),t.parent&&e&&(t.transform.absoluteRotation=o),t.transform._cacheAbsolutePosition()}removeGameObject(t){let s=this.gameObjects.indexOf(t);s>=0&&this.gameObjects.splice(s,1),t.transform._cacheAbsolutePosition()}addComponent(t){t._gameObject=this,this.components.push(t)}removeComponent(t){let s=this.components.indexOf(t);s>=0&&this.components.splice(s,1)}update(t){this.components.forEach((s=>{s.update(t)})),this.gameObjects.forEach((s=>{s.update(t)})),this.gameObjects.forEach((t=>{t._dead&&t._destroyNow()}))}render(t){this.components.forEach((s=>{s.render(t)})),this.gameObjects.forEach((s=>{t.save(),t.translate(s.transform.x,-s.transform.y),t.rotate(s.transform.rotation),s.render(t),t.restore()}))}destroy(){this._dead=!0}_destroyNow(){var t;null===(t=this.parent)||void 0===t||t.removeGameObject(this)}},GameLoop:class{constructor(t){this.gameObject=t,this._currAnimationFrame=window.requestAnimationFrame((t=>{this.gameLoop(t)}))}gameLoop(t){this.prevTime||(this.prevTime=t);let s=(t-this.prevTime)/1e3;return this.prevTime=t,this.gameObject.update(s),window.requestAnimationFrame((t=>{this._currAnimationFrame=this.gameLoop(t)}))}},Component:i,Components:{EnclosingBoundary:class extends i{constructor(t=[]){super(),this.encloses=t}update(t){this.encloses.forEach((t=>{var s;null===(s=this.transform)||void 0===s||s.shape._enclose(this.gameObject,t)}))}},ExcludingBoundary:class extends i{constructor(t=[]){super(),this.excludes=t}update(t){this.excludes.forEach((t=>{var s;null===(s=this.transform)||void 0===s||s.shape._exclude(this.gameObject,t)}))}},Camera:class extends i{constructor(t,s){super(),this._canvas=t;const e=t.getContext("2d");if(null==e)throw new Error("Canvas does not have CanvasRenderingContext2D");this.ctx=e,this.root=s,this._width=t.width,this._height=t.height,this._x=this._width/2,this._y=this._height/2,this.ctx.translate(this._x,this._y)}update(t){if(null==this.transform)return;this.ctx.clearRect(-this._x,-this._y,this._width,this._height),this.ctx.save();const s=this.root.transform.absoluteX-this.transform.absoluteX,e=this.root.transform.absoluteY-this.transform.absoluteY,r=this.root.transform.absoluteRotation-this.transform.absoluteRotation;this.ctx.rotate(r),this.ctx.translate(s,-e),this.root.render(this.ctx),this.ctx.restore()}},Text:class extends i{constructor(t){super(),this.text=t}render(t){t.font="12px serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,0,0)}},Renderer:class extends i{constructor(){super()}render(t){var s;t.strokeStyle="black",null===(s=this.transform)||void 0===s||s.shape.render(t)}},Hitbox:class extends i{constructor(t=[]){super(),this._hurtboxes=t,this._onHit=[],this._isHitting=new Set}update(t){var s;for(const t of this._hurtboxes){if(null===(s=this.transform)||void 0===s?void 0:s.shape.isHitting(this,t)){this._isHitting.add(t),t._isHitting.add(this);for(const s of this._onHit)s(this,t)}else this._isHitting.delete(t),t._isHitting.delete(this)}}addOnHit(t){this._onHit.push(t)}isHitting(t){return this._isHitting.has(t)}},PhysicalBody:class extends i{constructor(t){super(),this.velocity=new a(0,0),this.drag=t}update(t){this.transform&&(this.transform.x+=this.velocity.x*t,this.transform.y+=this.velocity.y*t),this.velocity.magnitude*=1-this.drag}addVelocity(t){this.velocity.x+=t.x,this.velocity.y+=t.y}},Physics:class extends i{constructor(t,s){super(),this.x=t,this.y=s}update(t){null!=this.gameObject&&(this.gameObject.transform.x+=this.x*t,this.gameObject.transform.y+=this.y*t)}}},Input:{Mouse:class extends n{constructor(t,s=!1){super("mousedown","mouseup","button"),this._x=0,this._y=0,this.camera=t,document.addEventListener("mousemove",(t=>{this._onMouseMove(t)})),s&&document.addEventListener("contextmenu",(t=>{t.preventDefault()}))}getButton(t){let s=this._pressables[t];return s||(s=new u,this._pressables[t]=s,s)}get x(){return this._x+this.camera.transform.absoluteX}get y(){return this._y+this.camera.transform.absoluteY}_onMouseMove(t){const s=this.camera._canvas.getBoundingClientRect();this._x=t.clientX-Math.round(s.left-.5)-this.camera._x,this._y=-(t.clientY-Math.round(s.top-.5)-this.camera._y)}}},Shapes:{Circle:o},Coordinate:{Cartesian:a,Polar:class extends r{constructor(t,s){super(),this._magnitude=t,this._angle=s,this._dirtyCartesian=!0}}},get Keyboard(){return this._keyboard||(this._keyboard=new l),this._keyboard}}}();
