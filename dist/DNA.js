var DNA=function(){"use strict";class t{constructor(t,s=0,e=0,i=0){this._absoluteDirty=!1,this._absoluteX=0,this._absoluteY=0,this._absoluteRotation=0,this._gameObject=t,this._x=s,this._y=e,this._rotation=i,this._cacheAbsolutePosition()}get gameObject(){return this._gameObject}get transform(){return this}get x(){return this._x}set x(t){this._x=t,this.markAbsoluteDirty()}get y(){return this._y}set y(t){this._y=t,this.markAbsoluteDirty()}get rotation(){return this._rotation}set rotation(t){this._rotation=t,this.markAbsoluteDirty()}get absoluteX(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteX}set absoluteX(t){this._setAbsolutePosition(t,this.absoluteY)}get absoluteY(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteY}set absoluteY(t){this._setAbsolutePosition(this.absoluteX,t)}get absoluteRotation(){return this._absoluteDirty&&this._cacheAbsolutePosition(),this._absoluteRotation}set absoluteRotation(t){this._setAbsoluteRotation(t)}_cacheAbsolutePosition(){const t=this.gameObject.parent?this.gameObject.parent.transform.absoluteX:0,s=this.gameObject.parent?this.gameObject.parent.transform.absoluteY:0,e=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0,i=Math.sin(-e),r=Math.cos(-e);this._absoluteX=this.x*r-this.y*i+t,this._absoluteY=this.x*i+this.y*r+s,this._absoluteRotation=e+this._rotation,this._absoluteDirty=!1}_setAbsolutePosition(t,s){const e=this.gameObject.parent?this.gameObject.parent.transform.absoluteX:0,i=this.gameObject.parent?this.gameObject.parent.transform.absoluteY:0,r=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0,a=t-e,o=s-i,n=Math.sin(r),h=Math.cos(r);this.x=a*h-o*n,this.y=a*n+o*h}_setAbsoluteRotation(t){const s=this.gameObject.parent?this.gameObject.parent.transform.absoluteRotation:0;this.rotation=t-s}markAbsoluteDirty(){this._absoluteDirty=!0,this.gameObject.gameObjects.forEach((t=>{t.transform.markAbsoluteDirty()}))}}class s{constructor(){}get gameObject(){return this._gameObject||null}get transform(){return this.gameObject?this.gameObject.transform:null}update(t){}render(t){}}function e(t){t._x=Math.sin(t._angle)*t._magnitude,t._y=-Math.cos(t._angle)*t._magnitude,t._dirtyCartesian=!1}function i(t){t._magnitude=Math.sqrt(Math.pow(t._x,2)+Math.pow(t._y,2)),t._angle=Math.atan2(t._y,t._x)+Math.PI/2,t._dirtyPolar=!1}class r{constructor(){this._x=0,this._y=0,this._magnitude=0,this._angle=0,this._dirtyCartesian=!1,this._dirtyPolar=!1}get x(){return this._dirtyCartesian&&e(this),this._x}set x(t){this._dirtyCartesian&&e(this),this._x=t,this._dirtyPolar=!0}get y(){return this._dirtyCartesian&&e(this),this._y}set y(t){this._dirtyCartesian&&e(this),this._y=t,this._dirtyPolar=!0}get magnitude(){return this._dirtyPolar&&i(this),this._magnitude}set magnitude(t){this._dirtyPolar&&i(this),this._magnitude=t,this._dirtyCartesian=!0}get angle(){return this._dirtyPolar&&i(this),this._angle}set angle(t){this._dirtyPolar&&i(this),this._angle=t,this._dirtyCartesian=!0}}class a extends r{constructor(t,s){super(),this._x=t,this._y=s,this._dirtyPolar=!0}}class o{constructor(t,s,e){this._pressables={},document.addEventListener(t,(t=>{const s=t[e],i=this._pressables[s];i&&(i._pressed=!0);for(const s in this._pressables){const e=this._pressables[s];for(const s of e._onPressDown)s(t)}})),document.addEventListener(s,(t=>{const s=t[e],i=this._pressables[s];i&&(i._pressed=!1);for(const s in this._pressables){const e=this._pressables[s];for(const s of e._onPressUp)s(t)}}))}}class n{constructor(){this._pressed=!1,this._onPressDown=[],this._onPressUp=[]}get pressed(){return this._pressed}}class h extends n{constructor(){super()}addMouseDown(t){this._onPressDown.push(t)}addMouseUp(t){this._onPressUp.push(t)}}class c extends n{constructor(){super()}addKeyDown(t){this._onPressDown.push(t)}addKeyUp(t){this._onPressUp.push(t)}}class u extends o{constructor(){super("keydown","keyup","keyCode")}getKey(t){let s=this._pressables[t];return s||(s=new c,this._pressables[t]=s,s)}}return DNA={GameObject:class{constructor(s=0,e=0,i=0){this._dead=!1,this._transform=new t(this,s,e,i),this.gameObjects=[],this.components=[]}get gameObject(){return this}get transform(){return this._transform||null}addGameObject(t,s=!1,e=!1){let i=0,r=0,a=0;t.parent&&(s&&(i=t.transform.absoluteX,r=t.transform.absoluteY),e&&(a=t.transform.absoluteRotation),t.parent.removeGameObject(t)),t.parent=this,this.gameObjects.push(t),t.parent&&s&&(t.transform.absoluteX=i,t.transform.absoluteY=r),t.parent&&e&&(t.transform.absoluteRotation=a),t.transform._cacheAbsolutePosition()}removeGameObject(t){let s=this.gameObjects.indexOf(t);s>=0&&this.gameObjects.splice(s,1),t.transform._cacheAbsolutePosition()}addComponent(t){t._gameObject=this,this.components.push(t)}removeComponent(t){let s=this.components.indexOf(t);s>=0&&this.components.splice(s,1)}update(t){this.components.forEach((s=>{s.update(t)})),this.gameObjects.forEach((s=>{s.update(t)})),this.gameObjects.forEach((t=>{t._dead&&t._destroyNow()}))}render(t){this.components.forEach((s=>{s.render(t)})),this.gameObjects.forEach((s=>{t.save(),t.translate(s.transform.x,-s.transform.y),t.rotate(s.transform.rotation),s.render(t),t.restore()}))}destroy(){this._dead=!0}_destroyNow(){var t;null===(t=this.parent)||void 0===t||t.removeGameObject(this)}},GameLoop:class{constructor(t){this.gameObject=t,this._currAnimationFrame=window.requestAnimationFrame((t=>{this.gameLoop(t)}))}gameLoop(t){this.prevTime||(this.prevTime=t);let s=(t-this.prevTime)/1e3;return this.prevTime=t,this.gameObject.update(s),window.requestAnimationFrame((t=>{this._currAnimationFrame=this.gameLoop(t)}))}},Component:s,Components:{Acceleration:class extends s{constructor(t,s=-1,e=0){super(),this.velocity=new a(0,0),this.acceleration=t,this.maxSpeed=s,this.drag=e}update(t){if(null==this.gameObject)return;this.velocity.x+=this.acceleration.x,this.velocity.y+=this.acceleration.y;const s=this.maxSpeed>0,e=this.velocity.magnitude>this.maxSpeed;s&&e&&(this.velocity.magnitude=this.maxSpeed);this.acceleration.magnitude>0||(this.velocity.magnitude-=this.velocity.magnitude*this.drag),this.gameObject.transform.x+=this.velocity.x*t,this.gameObject.transform.y+=this.velocity.y*t}},Camera:class extends s{constructor(t,s){super(),this._canvas=t;const e=t.getContext("2d");if(null==e)throw new Error("Canvas does not have CanvasRenderingContext2D");this.ctx=e,this.root=s,this._width=t.width,this._height=t.height,this._x=this._width/2,this._y=this._height/2,this.ctx.translate(this._x,this._y)}update(t){if(null==this.transform)return;this.ctx.clearRect(-this._x,-this._y,this._width,this._height),this.ctx.save();const s=this.root.transform.absoluteX-this.transform.absoluteX,e=this.root.transform.absoluteY-this.transform.absoluteY,i=this.root.transform.absoluteRotation-this.transform.absoluteRotation;this.ctx.rotate(i),this.ctx.translate(s,-e),this.root.render(this.ctx),this.ctx.restore()}},Text:class extends s{constructor(t){super(),this.text=t}render(t){t.font="12px serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,0,0)}},Renderer:class extends s{constructor(t){super(),this.shape=t}render(t){t.strokeStyle="black",this.shape.render(t)}},Hitbox:class extends s{constructor(t,s=[]){super(),this.shape=t,this._hurtboxes=s,this._onHit=[],this._isHitting=new Set}update(t){for(const t of this._hurtboxes){if(this.shape.isHitting(this,t)){this._isHitting.add(t),t._isHitting.add(this);for(const s of this._onHit)s(this,t)}else this._isHitting.delete(t),t._isHitting.delete(this)}}addOnHit(t){this._onHit.push(t)}isHitting(t){return this._isHitting.has(t)}},Physics:class extends s{constructor(t,s){super(),this.x=t,this.y=s}update(t){null!=this.gameObject&&(this.gameObject.transform.x+=this.x*t,this.gameObject.transform.y+=this.y*t)}}},Input:{Mouse:class extends o{constructor(t,s=!1){super("mousedown","mouseup","button"),this._x=0,this._y=0,this.camera=t,document.addEventListener("mousemove",(t=>{this._onMouseMove(t)})),s&&document.addEventListener("contextmenu",(t=>{t.preventDefault()}))}getButton(t){let s=this._pressables[t];return s||(s=new h,this._pressables[t]=s,s)}get x(){return this._x}get y(){return this._y}_onMouseMove(t){const s=this.camera._canvas.getBoundingClientRect();this._x=t.clientX-Math.round(s.left-.5)-this.camera._x,this._y=-(t.clientY-Math.round(s.top-.5)-this.camera._y)}}},Shapes:{Circle:class{constructor(t){this.radius=t}render(t){t.beginPath(),t.arc(0,0,this.radius,0,2*Math.PI),t.stroke()}isHitting(t,s){return s.shape._isHittingCircle(s,t)}_isHittingCircle(t,s){if(null==t.transform||null==s.transform)return!1;let e=Math.sqrt(Math.pow(t.transform.absoluteX-s.transform.absoluteX,2)+Math.pow(t.transform.absoluteY-s.transform.absoluteY,2));const i=s.shape;return e<=this.radius+i.radius}}},Coordinate:{Cartesian:a,Polar:class extends r{constructor(t,s){super(),this._magnitude=t,this._angle=s,this._dirtyCartesian=!0}}},get Keyboard(){return this._keyboard||(this._keyboard=new u),this._keyboard}}}();
