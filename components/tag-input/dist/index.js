(()=>{var ft=Object.defineProperty;var J=(e,t)=>()=>(e&&(t=e(e=0)),t);var pt=(e,t)=>{for(var n in t)ft(e,n,{get:t[n],enumerable:!0})};function P(e,t){for(var n in t)e[n]=t[n];return e}function me(e){var t=e.parentNode;t&&t.removeChild(e)}function k(e,t,n){var _,o,r,l=arguments,c={};for(r in t)r=="key"?_=t[r]:r=="ref"?o=t[r]:c[r]=t[r];if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(l[r]);if(n!=null&&(c.children=n),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)c[r]===void 0&&(c[r]=e.defaultProps[r]);return D(e,c,_,o,null)}function D(e,t,n,_,o){var r={type:e,props:t,key:n,ref:_,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o??++u.__v};return u.vnode!=null&&u.vnode(r),r}function V(){return{current:null}}function C(e){return e.children}function g(e,t){this.props=e,this.context=t}function O(e,t){if(t==null)return e.__?O(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?O(e):null}function ye(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return ye(e)}}function X(e){(!e.__d&&(e.__d=!0)&&R.push(e)&&!B.__r++||he!==u.debounceRendering)&&((he=u.debounceRendering)||de)(B)}function B(){for(var e;B.__r=R.length;)e=R.sort(function(t,n){return t.__v.__b-n.__v.__b}),R=[],e.some(function(t){var n,_,o,r,l,c;t.__d&&(l=(r=(n=t).__v).__e,(c=n.__P)&&(_=[],(o=P({},r)).__v=r.__v+1,ee(c,r,o,n.__n,c.ownerSVGElement!==void 0,r.__h!=null?[l]:null,_,l??O(r),r.__h),be(_,r),r.__e!=l&&ye(r)))})}function xe(e,t,n,_,o,r,l,c,p,f){var i,m,s,a,h,d,v,y=_&&_.__k||Q,E=y.length;for(n.__k=[],i=0;i<t.length;i++)if((a=n.__k[i]=(a=t[i])==null||typeof a=="boolean"?null:typeof a=="string"||typeof a=="number"||typeof a=="bigint"?D(null,a,null,null,a):Array.isArray(a)?D(C,{children:a},null,null,null):a.__b>0?D(a.type,a.props,a.key,null,a.__v):a)!=null){if(a.__=n,a.__b=n.__b+1,(s=y[i])===null||s&&a.key==s.key&&a.type===s.type)y[i]=void 0;else for(m=0;m<E;m++){if((s=y[m])&&a.key==s.key&&a.type===s.type){y[m]=void 0;break}s=null}ee(e,a,s=s||I,o,r,l,c,p,f),h=a.__e,(m=a.ref)&&s.ref!=m&&(v||(v=[]),s.ref&&v.push(s.ref,null,a),v.push(m,a.__c||h,a)),h!=null?(d==null&&(d=h),typeof a.type=="function"&&a.__k!=null&&a.__k===s.__k?a.__d=p=ge(a,p,e):p=ke(e,a,s,y,h,p),f||n.type!=="option"?typeof n.type=="function"&&(n.__d=p):e.value=""):p&&s.__e==p&&p.parentNode!=e&&(p=O(s))}for(n.__e=d,i=E;i--;)y[i]!=null&&(typeof n.type=="function"&&y[i].__e!=null&&y[i].__e==n.__d&&(n.__d=O(_,i+1)),Ee(y[i],y[i]));if(v)for(i=0;i<v.length;i++)Ce(v[i],v[++i],v[++i])}function ge(e,t,n){var _,o;for(_=0;_<e.__k.length;_++)(o=e.__k[_])&&(o.__=e,t=typeof o.type=="function"?ge(o,t,n):ke(n,o,o,e.__k,o.__e,t));return t}function S(e,t){return t=t||[],e==null||typeof e=="boolean"||(Array.isArray(e)?e.some(function(n){S(n,t)}):t.push(e)),t}function ke(e,t,n,_,o,r){var l,c,p;if(t.__d!==void 0)l=t.__d,t.__d=void 0;else if(n==null||o!=r||o.parentNode==null)e:if(r==null||r.parentNode!==e)e.appendChild(o),l=null;else{for(c=r,p=0;(c=c.nextSibling)&&p<_.length;p+=2)if(c==o)break e;e.insertBefore(o,r),l=r}return l!==void 0?l:o.nextSibling}function vt(e,t,n,_,o){var r;for(r in n)r==="children"||r==="key"||r in t||$(e,r,null,n[r],_);for(r in t)o&&typeof t[r]!="function"||r==="children"||r==="key"||r==="value"||r==="checked"||n[r]===t[r]||$(e,r,t[r],n[r],_)}function Se(e,t,n){t[0]==="-"?e.setProperty(t,n):e[t]=n==null?"":typeof n!="number"||ht.test(t)?n:n+"px"}function $(e,t,n,_,o){var r;e:if(t==="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof _=="string"&&(e.style.cssText=_=""),_)for(t in _)n&&t in n||Se(e.style,t,"");if(n)for(t in n)_&&n[t]===_[t]||Se(e.style,t,n[t])}else if(t[0]==="o"&&t[1]==="n")r=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+r]=n,n?_||e.addEventListener(t,r?we:Pe,r):e.removeEventListener(t,r?we:Pe,r);else if(t!=="dangerouslySetInnerHTML"){if(o)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if(t!=="href"&&t!=="list"&&t!=="form"&&t!=="tabIndex"&&t!=="download"&&t in e)try{e[t]=n??"";break e}catch(l){}typeof n=="function"||(n!=null&&(n!==!1||t[0]==="a"&&t[1]==="r")?e.setAttribute(t,n):e.removeAttribute(t))}}function Pe(e){this.l[e.type+!1](u.event?u.event(e):e)}function we(e){this.l[e.type+!0](u.event?u.event(e):e)}function ee(e,t,n,_,o,r,l,c,p){var f,i,m,s,a,h,d,v,y,E,M,x=t.type;if(t.constructor!==void 0)return null;n.__h!=null&&(p=n.__h,c=t.__e=n.__e,t.__h=null,r=[c]),(f=u.__b)&&f(t);try{e:if(typeof x=="function"){if(v=t.props,y=(f=x.contextType)&&_[f.__c],E=f?y?y.props.value:f.__:_,n.__c?d=(i=t.__c=n.__c).__=i.__E:("prototype"in x&&x.prototype.render?t.__c=i=new x(v,E):(t.__c=i=new g(v,E),i.constructor=x,i.render=yt),y&&y.sub(i),i.props=v,i.state||(i.state={}),i.context=E,i.__n=_,m=i.__d=!0,i.__h=[]),i.__s==null&&(i.__s=i.state),x.getDerivedStateFromProps!=null&&(i.__s==i.state&&(i.__s=P({},i.__s)),P(i.__s,x.getDerivedStateFromProps(v,i.__s))),s=i.props,a=i.state,m)x.getDerivedStateFromProps==null&&i.componentWillMount!=null&&i.componentWillMount(),i.componentDidMount!=null&&i.__h.push(i.componentDidMount);else{if(x.getDerivedStateFromProps==null&&v!==s&&i.componentWillReceiveProps!=null&&i.componentWillReceiveProps(v,E),!i.__e&&i.shouldComponentUpdate!=null&&i.shouldComponentUpdate(v,i.__s,E)===!1||t.__v===n.__v){i.props=v,i.state=i.__s,t.__v!==n.__v&&(i.__d=!1),i.__v=t,t.__e=n.__e,t.__k=n.__k,t.__k.forEach(function(W){W&&(W.__=t)}),i.__h.length&&l.push(i);break e}i.componentWillUpdate!=null&&i.componentWillUpdate(v,i.__s,E),i.componentDidUpdate!=null&&i.__h.push(function(){i.componentDidUpdate(s,a,h)})}i.context=E,i.props=v,i.state=i.__s,(f=u.__r)&&f(t),i.__d=!1,i.__v=t,i.__P=e,f=i.render(i.props,i.state,i.context),i.state=i.__s,i.getChildContext!=null&&(_=P(P({},_),i.getChildContext())),m||i.getSnapshotBeforeUpdate==null||(h=i.getSnapshotBeforeUpdate(s,a)),M=f!=null&&f.type===C&&f.key==null?f.props.children:f,xe(e,Array.isArray(M)?M:[M],t,n,_,o,r,l,c,p),i.base=t.__e,t.__h=null,i.__h.length&&l.push(i),d&&(i.__E=i.__=null),i.__e=!1}else r==null&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=mt(n.__e,t,n,_,o,r,l,p);(f=u.diffed)&&f(t)}catch(W){t.__v=null,(p||r!=null)&&(t.__e=c,t.__h=!!p,r[r.indexOf(c)]=null),u.__e(W,t,n)}}function be(e,t){u.__c&&u.__c(t,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(_){_.call(n)})}catch(_){u.__e(_,n.__v)}})}function mt(e,t,n,_,o,r,l,c){var p,f,i,m,s=n.props,a=t.props,h=t.type,d=0;if(h==="svg"&&(o=!0),r!=null){for(;d<r.length;d++)if((p=r[d])&&(p===e||(h?p.localName==h:p.nodeType==3))){e=p,r[d]=null;break}}if(e==null){if(h===null)return document.createTextNode(a);e=o?document.createElementNS("http://www.w3.org/2000/svg",h):document.createElement(h,a.is&&a),r=null,c=!1}if(h===null)s===a||c&&e.data===a||(e.data=a);else{if(r=r&&Q.slice.call(e.childNodes),f=(s=n.props||I).dangerouslySetInnerHTML,i=a.dangerouslySetInnerHTML,!c){if(r!=null)for(s={},m=0;m<e.attributes.length;m++)s[e.attributes[m].name]=e.attributes[m].value;(i||f)&&(i&&(f&&i.__html==f.__html||i.__html===e.innerHTML)||(e.innerHTML=i&&i.__html||""))}if(vt(e,a,s,o,c),i)t.__k=[];else if(d=t.props.children,xe(e,Array.isArray(d)?d:[d],t,n,_,o&&h!=="foreignObject",r,l,e.firstChild,c),r!=null)for(d=r.length;d--;)r[d]!=null&&me(r[d]);c||("value"in a&&(d=a.value)!==void 0&&(d!==e.value||h==="progress"&&!d)&&$(e,"value",d,s.value,!1),"checked"in a&&(d=a.checked)!==void 0&&d!==e.checked&&$(e,"checked",d,s.checked,!1))}return e}function Ce(e,t,n){try{typeof e=="function"?e(t):e.current=t}catch(_){u.__e(_,n)}}function Ee(e,t,n){var _,o,r;if(u.unmount&&u.unmount(e),(_=e.ref)&&(_.current&&_.current!==e.__e||Ce(_,null,t)),n||typeof e.type=="function"||(n=(o=e.__e)!=null),e.__e=e.__d=void 0,(_=e.__c)!=null){if(_.componentWillUnmount)try{_.componentWillUnmount()}catch(l){u.__e(l,t)}_.base=_.__P=null}if(_=e.__k)for(r=0;r<_.length;r++)_[r]&&Ee(_[r],t,n);o!=null&&me(o)}function yt(e,t,n){return this.constructor(e,n)}function T(e,t,n){var _,o,r;u.__&&u.__(e,t),o=(_=typeof n=="function")?null:n&&n.__k||t.__k,r=[],ee(t,e=(!_&&n||t).__k=k(C,null,[e]),o||I,I,t.ownerSVGElement!==void 0,!_&&n?[n]:o?null:t.firstChild?Q.slice.call(t.childNodes):null,r,!_&&n?n:o?o.__e:t.firstChild,_),be(r,e)}function te(e,t){T(e,t,te)}function Ne(e,t,n){var _,o,r,l=arguments,c=P({},e.props);for(r in t)r=="key"?_=t[r]:r=="ref"?o=t[r]:c[r]=t[r];if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(l[r]);return n!=null&&(c.children=n),D(e.type,c,_||e.key,o||e.ref,null)}function z(e,t){var n={__c:t="__cC"+ve++,__:e,Consumer:function(_,o){return _.children(o)},Provider:function(_){var o,r;return this.getChildContext||(o=[],(r={})[t]=this,this.getChildContext=function(){return r},this.shouldComponentUpdate=function(l){this.props.value!==l.value&&o.some(X)},this.sub=function(l){o.push(l);var c=l.componentWillUnmount;l.componentWillUnmount=function(){o.splice(o.indexOf(l),1),c&&c.call(l)}}),_.children}};return n.Provider.__=n.Consumer.contextType=n}var u,dt,R,de,he,ve,I,Q,ht,j=J(()=>{I={},Q=[],ht=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;u={__e:function(e,t){for(var n,_,o;t=t.__;)if((n=t.__c)&&!n.__)try{if((_=n.constructor)&&_.getDerivedStateFromError!=null&&(n.setState(_.getDerivedStateFromError(e)),o=n.__d),n.componentDidCatch!=null&&(n.componentDidCatch(e),o=n.__d),o)return n.__E=n}catch(r){e=r}throw e},__v:0},dt=function(e){return e!=null&&e.constructor===void 0},g.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=P({},this.state),typeof e=="function"&&(e=e(P({},n),this.props)),e&&P(n,e),e!=null&&this.__v&&(t&&this.__h.push(t),X(this))},g.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),X(this))},g.prototype.render=C,R=[],de=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,B.__r=0,ve=0});function U(e,t){u.__h&&u.__h(b,e,H||t),H=0;var n=b.__H||(b.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function G(e){return H=1,q(Oe,e)}function q(e,t,n){var _=U(N++,2);return _.t=e,_.__c||(_.__=[n?n(t):Oe(void 0,t),function(o){var r=_.t(_.__[0],o);_.__[0]!==r&&(_.__=[r,_.__[1]],_.__c.setState({}))}],_.__c=b),_.__}function re(e,t){var n=U(N++,3);!u.__s&&_e(n.__H,t)&&(n.__=e,n.__H=t,b.__H.__h.push(n))}function Y(e,t){var n=U(N++,4);!u.__s&&_e(n.__H,t)&&(n.__=e,n.__H=t,b.__h.push(n))}function oe(e){return H=5,L(function(){return{current:e}},[])}function ie(e,t,n){H=6,Y(function(){typeof e=="function"?e(t()):e&&(e.current=t())},n==null?n:n.concat(e))}function L(e,t){var n=U(N++,7);return _e(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function le(e,t){return H=8,L(function(){return e},t)}function ue(e){var t=b.context[e.__c],n=U(N++,9);return n.__c=e,t?(n.__==null&&(n.__=!0,t.sub(b)),t.props.value):e.__}function ae(e,t){u.useDebugValue&&u.useDebugValue(t?t(e):e)}function bt(e){var t=U(N++,10),n=G();return t.__=e,b.componentDidCatch||(b.componentDidCatch=function(_){t.__&&t.__(_),n[1](_)}),[n[0],function(){n[1](void 0)}]}function gt(){ne.forEach(function(e){if(e.__P)try{e.__H.__h.forEach(Z),e.__H.__h.forEach(ce),e.__H.__h=[]}catch(t){e.__H.__h=[],u.__e(t,e.__v)}}),ne=[]}function Z(e){var t=b;typeof e.__c=="function"&&e.__c(),b=t}function ce(e){var t=b;e.__c=e.__(),b=t}function _e(e,t){return!e||e.length!==t.length||t.some(function(n,_){return n!==e[_]})}function Oe(e,t){return typeof t=="function"?t(e):t}var N,b,Te,H,ne,He,Ue,Ae,Re,De,Le,se=J(()=>{j();H=0,ne=[],He=u.__b,Ue=u.__r,Ae=u.diffed,Re=u.__c,De=u.unmount;u.__b=function(e){b=null,He&&He(e)},u.__r=function(e){Ue&&Ue(e),N=0;var t=(b=e.__c).__H;t&&(t.__h.forEach(Z),t.__h.forEach(ce),t.__h=[])},u.diffed=function(e){Ae&&Ae(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(ne.push(t)!==1&&Te===u.requestAnimationFrame||((Te=u.requestAnimationFrame)||function(n){var _,o=function(){clearTimeout(r),Le&&cancelAnimationFrame(_),setTimeout(n)},r=setTimeout(o,100);Le&&(_=requestAnimationFrame(o))})(gt)),b=void 0},u.__c=function(e,t){t.some(function(n){try{n.__h.forEach(Z),n.__h=n.__h.filter(function(_){return!_.__||ce(_)})}catch(_){t.some(function(o){o.__h&&(o.__h=[])}),t=[],u.__e(_,n.__v)}}),Re&&Re(e,t)},u.unmount=function(e){De&&De(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(Z)}catch(n){u.__e(n,t.__v)}};Le=typeof requestAnimationFrame=="function"});var Fe={};pt(Fe,{Children:()=>$e,Component:()=>g,Fragment:()=>C,PureComponent:()=>K,StrictMode:()=>Mt,Suspense:()=>F,SuspenseList:()=>A,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:()=>_t,cloneElement:()=>ot,createContext:()=>z,createElement:()=>k,createFactory:()=>rt,createPortal:()=>Ye,createRef:()=>V,default:()=>Wt,findDOMNode:()=>lt,forwardRef:()=>Ve,hydrate:()=>Je,isValidElement:()=>pe,lazy:()=>qe,memo:()=>We,render:()=>Ke,unmountComponentAtNode:()=>it,unstable_IdlePriority:()=>Dt,unstable_ImmediatePriority:()=>Ht,unstable_LowPriority:()=>Rt,unstable_NormalPriority:()=>At,unstable_UserBlockingPriority:()=>Ut,unstable_batchedUpdates:()=>ut,unstable_now:()=>Lt,unstable_runWithPriority:()=>Ot,useCallback:()=>le,useContext:()=>ue,useDebugValue:()=>ae,useEffect:()=>re,useErrorBoundary:()=>bt,useImperativeHandle:()=>ie,useLayoutEffect:()=>Y,useMemo:()=>L,useReducer:()=>q,useRef:()=>oe,useState:()=>G,version:()=>Ft});function Me(e,t){for(var n in t)e[n]=t[n];return e}function fe(e,t){for(var n in e)if(n!=="__source"&&!(n in t))return!0;for(var _ in t)if(_!=="__source"&&e[_]!==t[_])return!0;return!1}function K(e){this.props=e}function We(e,t){function n(o){var r=this.props.ref,l=r==o.ref;return!l&&r&&(r.call?r(null):r.current=null),t?!t(this.props,o)||!l:fe(this.props,o)}function _(o){return this.shouldComponentUpdate=n,k(e,o)}return _.displayName="Memo("+(e.displayName||e.name)+")",_.prototype.isReactComponent=!0,_.__f=!0,_}function Ve(e){function t(n,_){var o=Me({},n);return delete o.ref,e(o,(_=n.ref||_)&&(typeof _!="object"||"current"in _)?_:null)}return t.$$typeof=kt,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(e.displayName||e.name)+")",t}function F(){this.__u=0,this.t=null,this.__b=null}function je(e){var t=e.__.__c;return t&&t.__e&&t.__e(e)}function qe(e){var t,n,_;function o(r){if(t||(t=e()).then(function(l){n=l.default||l},function(l){_=l}),_)throw _;if(!n)throw t;return k(n,r)}return o.displayName="Lazy",o.__f=!0,o}function A(){this.u=null,this.o=null}function Et(e){return this.getChildContext=function(){return e.context},e.children}function xt(e){var t=this,n=e.i;t.componentWillUnmount=function(){T(null,t.l),t.l=null,t.i=null},t.i&&t.i!==n&&t.componentWillUnmount(),e.__v?(t.l||(t.i=n,t.l={nodeType:1,parentNode:n,childNodes:[],appendChild:function(_){this.childNodes.push(_),t.i.appendChild(_)},insertBefore:function(_,o){this.childNodes.push(_),t.i.appendChild(_)},removeChild:function(_){this.childNodes.splice(this.childNodes.indexOf(_)>>>1,1),t.i.removeChild(_)}}),T(k(Et,{context:t.context},e.__v),t.l)):t.l&&t.componentWillUnmount()}function Ye(e,t){return k(xt,{__v:e,i:t})}function Ke(e,t,n){return t.__k==null&&(t.textContent=""),T(e,t),typeof n=="function"&&n(),e?e.__c:null}function Je(e,t,n){return te(e,t),typeof n=="function"&&n(),e?e.__c:null}function wt(){}function Nt(){return this.cancelBubble}function Tt(){return this.defaultPrevented}function Ot(e,t){return t()}function rt(e){return k.bind(null,e)}function pe(e){return!!e&&e.$$typeof===Ze}function ot(e){return pe(e)?Ne.apply(null,arguments):e}function it(e){return!!e.__k&&(T(null,e),!0)}function lt(e){return e&&(e.base||e.nodeType===1&&e)||null}var Ie,kt,Be,$e,Ct,ze,Ge,Ze,St,Pt,Qe,Xe,et,tt,nt,_t,Ht,Ut,At,Rt,Dt,Lt,Ft,ut,Mt,Wt,at=J(()=>{se();se();j();j();(K.prototype=new g).isPureReactComponent=!0,K.prototype.shouldComponentUpdate=function(e,t){return fe(this.props,e)||fe(this.state,t)};Ie=u.__b;u.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),Ie&&Ie(e)};kt=typeof Symbol!="undefined"&&Symbol.for&&Symbol.for("react.forward_ref")||3911;Be=function(e,t){return e==null?null:S(S(e).map(t))},$e={map:Be,forEach:Be,count:function(e){return e?S(e).length:0},only:function(e){var t=S(e);if(t.length!==1)throw"Children.only";return t[0]},toArray:S},Ct=u.__e;u.__e=function(e,t,n){if(e.then){for(var _,o=t;o=o.__;)if((_=o.__c)&&_.__c)return t.__e==null&&(t.__e=n.__e,t.__k=n.__k),_.__c(e,t)}Ct(e,t,n)};ze=u.unmount;u.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&e.__h===!0&&(e.type=null),ze&&ze(e)},(F.prototype=new g).__c=function(e,t){var n=t.__c,_=this;_.t==null&&(_.t=[]),_.t.push(n);var o=je(_.__v),r=!1,l=function(){r||(r=!0,n.__R=null,o?o(c):c())};n.__R=l;var c=function(){if(!--_.__u){if(_.state.__e){var f=_.state.__e;_.__v.__k[0]=function m(s,a,h){return s&&(s.__v=null,s.__k=s.__k&&s.__k.map(function(d){return m(d,a,h)}),s.__c&&s.__c.__P===a&&(s.__e&&h.insertBefore(s.__e,s.__d),s.__c.__e=!0,s.__c.__P=h)),s}(f,f.__c.__P,f.__c.__O)}var i;for(_.setState({__e:_.__b=null});i=_.t.pop();)i.forceUpdate()}},p=t.__h===!0;_.__u++||p||_.setState({__e:_.__b=_.__v.__k[0]}),e.then(l,l)},F.prototype.componentWillUnmount=function(){this.t=[]},F.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),_=this.__v.__k[0].__c;this.__v.__k[0]=function r(l,c,p){return l&&(l.__c&&l.__c.__H&&(l.__c.__H.__.forEach(function(f){typeof f.__c=="function"&&f.__c()}),l.__c.__H=null),(l=Me({},l)).__c!=null&&(l.__c.__P===p&&(l.__c.__P=c),l.__c=null),l.__k=l.__k&&l.__k.map(function(f){return r(f,c,p)})),l}(this.__b,n,_.__O=_.__P)}this.__b=null}var o=t.__e&&k(C,null,e.fallback);return o&&(o.__h=null),[k(C,null,t.__e?null:e.children),o]};Ge=function(e,t,n){if(++n[1]===n[0]&&e.o.delete(t),e.props.revealOrder&&(e.props.revealOrder[0]!=="t"||!e.o.size))for(n=e.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.u=n=n[2]}};(A.prototype=new g).__e=function(e){var t=this,n=je(t.__v),_=t.o.get(e);return _[0]++,function(o){var r=function(){t.props.revealOrder?(_.push(o),Ge(t,e,_)):o()};n?n(r):r()}},A.prototype.render=function(e){this.u=null,this.o=new Map;var t=S(e.children);e.revealOrder&&e.revealOrder[0]==="b"&&t.reverse();for(var n=t.length;n--;)this.o.set(t[n],this.u=[1,0,this.u]);return e.children},A.prototype.componentDidUpdate=A.prototype.componentDidMount=function(){var e=this;this.o.forEach(function(t,n){Ge(e,n,t)})};Ze=typeof Symbol!="undefined"&&Symbol.for&&Symbol.for("react.element")||60103,St=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Pt=function(e){return(typeof Symbol!="undefined"&&typeof Symbol()=="symbol"?/fil|che|rad/i:/fil|che|ra/i).test(e)};g.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(e){Object.defineProperty(g.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})});Qe=u.event;u.event=function(e){return Qe&&(e=Qe(e)),e.persist=wt,e.isPropagationStopped=Nt,e.isDefaultPrevented=Tt,e.nativeEvent=e};et={configurable:!0,get:function(){return this.class}},tt=u.vnode;u.vnode=function(e){var t=e.type,n=e.props,_=n;if(typeof t=="string"){for(var o in _={},n){var r=n[o];o==="value"&&"defaultValue"in n&&r==null||(o==="defaultValue"&&"value"in n&&n.value==null?o="value":o==="download"&&r===!0?r="":/ondoubleclick/i.test(o)?o="ondblclick":/^onchange(textarea|input)/i.test(o+t)&&!Pt(n.type)?o="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(o)?o=o.toLowerCase():St.test(o)?o=o.replace(/[A-Z0-9]/,"-$&").toLowerCase():r===null&&(r=void 0),_[o]=r)}t=="select"&&_.multiple&&Array.isArray(_.value)&&(_.value=S(n.children).forEach(function(l){l.props.selected=_.value.indexOf(l.props.value)!=-1})),t=="select"&&_.defaultValue!=null&&(_.value=S(n.children).forEach(function(l){l.props.selected=_.multiple?_.defaultValue.indexOf(l.props.value)!=-1:_.defaultValue==l.props.value})),e.props=_}t&&n.class!=n.className&&(et.enumerable="className"in n,n.className!=null&&(_.class=n.className),Object.defineProperty(_,"className",et)),e.$$typeof=Ze,tt&&tt(e)};nt=u.__r;u.__r=function(e){nt&&nt(e),Xe=e.__c};_t={ReactCurrentDispatcher:{current:{readContext:function(e){return Xe.__n[e.__c].props.value}}}},Ht=1,Ut=2,At=3,Rt=4,Dt=5;Lt=typeof performance=="object"&&typeof performance.now=="function"?performance.now.bind(performance):function(){return Date.now()},Ft="16.8.0";ut=function(e,t){return e(t)},Mt=C,Wt={useState:G,useReducer:q,useEffect:re,useLayoutEffect:Y,useRef:oe,useImperativeHandle:ie,useMemo:L,useCallback:le,useContext:ue,useDebugValue:ae,version:"16.8.0",Children:$e,render:Ke,hydrate:Je,unmountComponentAtNode:it,createPortal:Ye,createElement:k,createContext:z,createFactory:rt,cloneElement:ot,createRef:V,Fragment:C,isValidElement:pe,findDOMNode:lt,Component:g,PureComponent:K,memo:We,forwardRef:Ve,unstable_batchedUpdates:ut,StrictMode:C,Suspense:F,SuspenseList:A,lazy:qe,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:_t}});var w=(at(),Fe),{render:It,useState:ct}=w,Vt=({onComplete:e})=>{let[t,n]=ct([]),[_,o]=ct("");function r(){let l=[...t,_];n(l),o(""),e(l)}return w.createElement(w.Fragment,null,w.createElement("span",{style:{border:"1px solid #000",display:"inline-block",fontSize:14}},t.map((l,c)=>w.createElement(w.Fragment,null,w.createElement("span",{style:{backgroundColor:"#f0f0f0",borderRadius:4,border:"1px solid #888"},key:c},l),",")),w.createElement("input",{style:{border:"none",height:"100%",outline:"none",fontSize:14},value:_,onKeyPress:l=>l.key==="Enter"&&r(),onChange:l=>o(l.target.value)})))},st=class extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}onComplete(t){let n=new CustomEvent("completeTag",{bubbles:!0,composed:!0,detail:{tags:t}});this.dispatchEvent(n)}connectedCallback(){It(w.createElement(Vt,{onComplete:this.onComplete.bind(this)}),this.shadowRoot)}};customElements.define("tag-input",st);})();
//# sourceMappingURL=index.js.map
