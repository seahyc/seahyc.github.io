(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();var ch={exports:{}},Do={};var X_;function oS(){if(X_)return Do;X_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Do.Fragment=t,Do.jsx=n,Do.jsxs=n,Do}var W_;function lS(){return W_||(W_=1,ch.exports=oS()),ch.exports}var DR=lS(),uh={exports:{}},ue={};var q_;function cS(){if(q_)return ue;q_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),y=Symbol.iterator;function S(N){return N===null||typeof N!="object"?null:(N=y&&N[y]||N["@@iterator"],typeof N=="function"?N:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,M={};function v(N,et,Mt){this.props=N,this.context=et,this.refs=M,this.updater=Mt||E}v.prototype.isReactComponent={},v.prototype.setState=function(N,et){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,et,"setState")},v.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function z(){}z.prototype=v.prototype;function U(N,et,Mt){this.props=N,this.context=et,this.refs=M,this.updater=Mt||E}var R=U.prototype=new z;R.constructor=U,b(R,v.prototype),R.isPureReactComponent=!0;var H=Array.isArray;function P(){}var I={H:null,A:null,T:null,S:null},X=Object.prototype.hasOwnProperty;function D(N,et,Mt){var Dt=Mt.ref;return{$$typeof:r,type:N,key:et,ref:Dt!==void 0?Dt:null,props:Mt}}function w(N,et){return D(N.type,et,N.props)}function G(N){return typeof N=="object"&&N!==null&&N.$$typeof===r}function Q(N){var et={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(Mt){return et[Mt]})}var rt=/\/+/g;function lt(N,et){return typeof N=="object"&&N!==null&&N.key!=null?Q(""+N.key):et.toString(36)}function ct(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(P,P):(N.status="pending",N.then(function(et){N.status==="pending"&&(N.status="fulfilled",N.value=et)},function(et){N.status==="pending"&&(N.status="rejected",N.reason=et)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function O(N,et,Mt,Dt,Ft){var it=typeof N;(it==="undefined"||it==="boolean")&&(N=null);var ht=!1;if(N===null)ht=!0;else switch(it){case"bigint":case"string":case"number":ht=!0;break;case"object":switch(N.$$typeof){case r:case t:ht=!0;break;case g:return ht=N._init,O(ht(N._payload),et,Mt,Dt,Ft)}}if(ht)return Ft=Ft(N),ht=Dt===""?"."+lt(N,0):Dt,H(Ft)?(Mt="",ht!=null&&(Mt=ht.replace(rt,"$&/")+"/"),O(Ft,et,Mt,"",function(qt){return qt})):Ft!=null&&(G(Ft)&&(Ft=w(Ft,Mt+(Ft.key==null||N&&N.key===Ft.key?"":(""+Ft.key).replace(rt,"$&/")+"/")+ht)),et.push(Ft)),1;ht=0;var It=Dt===""?".":Dt+":";if(H(N))for(var Bt=0;Bt<N.length;Bt++)Dt=N[Bt],it=It+lt(Dt,Bt),ht+=O(Dt,et,Mt,it,Ft);else if(Bt=S(N),typeof Bt=="function")for(N=Bt.call(N),Bt=0;!(Dt=N.next()).done;)Dt=Dt.value,it=It+lt(Dt,Bt++),ht+=O(Dt,et,Mt,it,Ft);else if(it==="object"){if(typeof N.then=="function")return O(ct(N),et,Mt,Dt,Ft);throw et=String(N),Error("Objects are not valid as a React child (found: "+(et==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":et)+"). If you meant to render a collection of children, use an array instead.")}return ht}function K(N,et,Mt){if(N==null)return N;var Dt=[],Ft=0;return O(N,Dt,"","",function(it){return et.call(Mt,it,Ft++)}),Dt}function Y(N){if(N._status===-1){var et=N._result;et=et(),et.then(function(Mt){(N._status===0||N._status===-1)&&(N._status=1,N._result=Mt)},function(Mt){(N._status===0||N._status===-1)&&(N._status=2,N._result=Mt)}),N._status===-1&&(N._status=0,N._result=et)}if(N._status===1)return N._result.default;throw N._result}var St=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var et=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(et))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},At={map:K,forEach:function(N,et,Mt){K(N,function(){et.apply(this,arguments)},Mt)},count:function(N){var et=0;return K(N,function(){et++}),et},toArray:function(N){return K(N,function(et){return et})||[]},only:function(N){if(!G(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return ue.Activity=_,ue.Children=At,ue.Component=v,ue.Fragment=n,ue.Profiler=l,ue.PureComponent=U,ue.StrictMode=s,ue.Suspense=m,ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I,ue.__COMPILER_RUNTIME={__proto__:null,c:function(N){return I.H.useMemoCache(N)}},ue.cache=function(N){return function(){return N.apply(null,arguments)}},ue.cacheSignal=function(){return null},ue.cloneElement=function(N,et,Mt){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var Dt=b({},N.props),Ft=N.key;if(et!=null)for(it in et.key!==void 0&&(Ft=""+et.key),et)!X.call(et,it)||it==="key"||it==="__self"||it==="__source"||it==="ref"&&et.ref===void 0||(Dt[it]=et[it]);var it=arguments.length-2;if(it===1)Dt.children=Mt;else if(1<it){for(var ht=Array(it),It=0;It<it;It++)ht[It]=arguments[It+2];Dt.children=ht}return D(N.type,Ft,Dt)},ue.createContext=function(N){return N={$$typeof:f,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:c,_context:N},N},ue.createElement=function(N,et,Mt){var Dt,Ft={},it=null;if(et!=null)for(Dt in et.key!==void 0&&(it=""+et.key),et)X.call(et,Dt)&&Dt!=="key"&&Dt!=="__self"&&Dt!=="__source"&&(Ft[Dt]=et[Dt]);var ht=arguments.length-2;if(ht===1)Ft.children=Mt;else if(1<ht){for(var It=Array(ht),Bt=0;Bt<ht;Bt++)It[Bt]=arguments[Bt+2];Ft.children=It}if(N&&N.defaultProps)for(Dt in ht=N.defaultProps,ht)Ft[Dt]===void 0&&(Ft[Dt]=ht[Dt]);return D(N,it,Ft)},ue.createRef=function(){return{current:null}},ue.forwardRef=function(N){return{$$typeof:d,render:N}},ue.isValidElement=G,ue.lazy=function(N){return{$$typeof:g,_payload:{_status:-1,_result:N},_init:Y}},ue.memo=function(N,et){return{$$typeof:p,type:N,compare:et===void 0?null:et}},ue.startTransition=function(N){var et=I.T,Mt={};I.T=Mt;try{var Dt=N(),Ft=I.S;Ft!==null&&Ft(Mt,Dt),typeof Dt=="object"&&Dt!==null&&typeof Dt.then=="function"&&Dt.then(P,St)}catch(it){St(it)}finally{et!==null&&Mt.types!==null&&(et.types=Mt.types),I.T=et}},ue.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()},ue.use=function(N){return I.H.use(N)},ue.useActionState=function(N,et,Mt){return I.H.useActionState(N,et,Mt)},ue.useCallback=function(N,et){return I.H.useCallback(N,et)},ue.useContext=function(N){return I.H.useContext(N)},ue.useDebugValue=function(){},ue.useDeferredValue=function(N,et){return I.H.useDeferredValue(N,et)},ue.useEffect=function(N,et){return I.H.useEffect(N,et)},ue.useEffectEvent=function(N){return I.H.useEffectEvent(N)},ue.useId=function(){return I.H.useId()},ue.useImperativeHandle=function(N,et,Mt){return I.H.useImperativeHandle(N,et,Mt)},ue.useInsertionEffect=function(N,et){return I.H.useInsertionEffect(N,et)},ue.useLayoutEffect=function(N,et){return I.H.useLayoutEffect(N,et)},ue.useMemo=function(N,et){return I.H.useMemo(N,et)},ue.useOptimistic=function(N,et){return I.H.useOptimistic(N,et)},ue.useReducer=function(N,et,Mt){return I.H.useReducer(N,et,Mt)},ue.useRef=function(N){return I.H.useRef(N)},ue.useState=function(N){return I.H.useState(N)},ue.useSyncExternalStore=function(N,et,Mt){return I.H.useSyncExternalStore(N,et,Mt)},ue.useTransition=function(){return I.H.useTransition()},ue.version="19.2.8",ue}var Y_;function Vd(){return Y_||(Y_=1,uh.exports=cS()),uh.exports}var UR=Vd(),fh={exports:{}},Uo={},hh={exports:{}},dh={};var Z_;function uS(){return Z_||(Z_=1,(function(r){function t(O,K){var Y=O.length;O.push(K);t:for(;0<Y;){var St=Y-1>>>1,At=O[St];if(0<l(At,K))O[St]=K,O[Y]=At,Y=St;else break t}}function n(O){return O.length===0?null:O[0]}function s(O){if(O.length===0)return null;var K=O[0],Y=O.pop();if(Y!==K){O[0]=Y;t:for(var St=0,At=O.length,N=At>>>1;St<N;){var et=2*(St+1)-1,Mt=O[et],Dt=et+1,Ft=O[Dt];if(0>l(Mt,Y))Dt<At&&0>l(Ft,Mt)?(O[St]=Ft,O[Dt]=Y,St=Dt):(O[St]=Mt,O[et]=Y,St=et);else if(Dt<At&&0>l(Ft,Y))O[St]=Ft,O[Dt]=Y,St=Dt;else break t}}return K}function l(O,K){var Y=O.sortIndex-K.sortIndex;return Y!==0?Y:O.id-K.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,d=f.now();r.unstable_now=function(){return f.now()-d}}var m=[],p=[],g=1,_=null,y=3,S=!1,E=!1,b=!1,M=!1,v=typeof setTimeout=="function"?setTimeout:null,z=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function R(O){for(var K=n(p);K!==null;){if(K.callback===null)s(p);else if(K.startTime<=O)s(p),K.sortIndex=K.expirationTime,t(m,K);else break;K=n(p)}}function H(O){if(b=!1,R(O),!E)if(n(m)!==null)E=!0,P||(P=!0,Q());else{var K=n(p);K!==null&&ct(H,K.startTime-O)}}var P=!1,I=-1,X=5,D=-1;function w(){return M?!0:!(r.unstable_now()-D<X)}function G(){if(M=!1,P){var O=r.unstable_now();D=O;var K=!0;try{t:{E=!1,b&&(b=!1,z(I),I=-1),S=!0;var Y=y;try{e:{for(R(O),_=n(m);_!==null&&!(_.expirationTime>O&&w());){var St=_.callback;if(typeof St=="function"){_.callback=null,y=_.priorityLevel;var At=St(_.expirationTime<=O);if(O=r.unstable_now(),typeof At=="function"){_.callback=At,R(O),K=!0;break e}_===n(m)&&s(m),R(O)}else s(m);_=n(m)}if(_!==null)K=!0;else{var N=n(p);N!==null&&ct(H,N.startTime-O),K=!1}}break t}finally{_=null,y=Y,S=!1}K=void 0}}finally{K?Q():P=!1}}}var Q;if(typeof U=="function")Q=function(){U(G)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,lt=rt.port2;rt.port1.onmessage=G,Q=function(){lt.postMessage(null)}}else Q=function(){v(G,0)};function ct(O,K){I=v(function(){O(r.unstable_now())},K)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(O){O.callback=null},r.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):X=0<O?Math.floor(1e3/O):5},r.unstable_getCurrentPriorityLevel=function(){return y},r.unstable_next=function(O){switch(y){case 1:case 2:case 3:var K=3;break;default:K=y}var Y=y;y=K;try{return O()}finally{y=Y}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(O,K){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var Y=y;y=O;try{return K()}finally{y=Y}},r.unstable_scheduleCallback=function(O,K,Y){var St=r.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?St+Y:St):Y=St,O){case 1:var At=-1;break;case 2:At=250;break;case 5:At=1073741823;break;case 4:At=1e4;break;default:At=5e3}return At=Y+At,O={id:g++,callback:K,priorityLevel:O,startTime:Y,expirationTime:At,sortIndex:-1},Y>St?(O.sortIndex=Y,t(p,O),n(m)===null&&O===n(p)&&(b?(z(I),I=-1):b=!0,ct(H,Y-St))):(O.sortIndex=At,t(m,O),E||S||(E=!0,P||(P=!0,Q()))),O},r.unstable_shouldYield=w,r.unstable_wrapCallback=function(O){var K=y;return function(){var Y=y;y=K;try{return O.apply(this,arguments)}finally{y=Y}}}})(dh)),dh}var j_;function fS(){return j_||(j_=1,hh.exports=uS()),hh.exports}var ph={exports:{}},Cn={};var K_;function hS(){if(K_)return Cn;K_=1;var r=Vd();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var s={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:g}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Cn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Cn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},Cn.flushSync=function(m){var p=f.T,g=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=g,s.d.f()}},Cn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Cn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Cn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin),y=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:y,fetchPriority:S}):g==="script"&&s.d.X(m,{crossOrigin:_,integrity:y,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Cn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Cn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin);s.d.L(m,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Cn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Cn.requestFormReset=function(m){s.d.r(m)},Cn.unstable_batchedUpdates=function(m,p){return m(p)},Cn.useFormState=function(m,p,g){return f.H.useFormState(m,p,g)},Cn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Cn.version="19.2.8",Cn}var Q_;function dS(){if(Q_)return ph.exports;Q_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),ph.exports=hS(),ph.exports}var J_;function pS(){if(J_)return Uo;J_=1;var r=fS(),t=Vd(),n=dS();function s(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,a=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(a=i.return),e=i.return;while(e)}return i.tag===3?a:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function d(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function p(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(s(188));return i!==e?null:e}for(var a=e,o=i;;){var u=a.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===a)return m(u),e;if(h===o)return m(u),i;h=h.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=h;else{for(var x=!1,A=u.child;A;){if(A===a){x=!0,a=u,o=h;break}if(A===o){x=!0,o=u,a=h;break}A=A.sibling}if(!x){for(A=h.child;A;){if(A===a){x=!0,a=h,o=u;break}if(A===o){x=!0,o=h,a=u;break}A=A.sibling}if(!x)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:i}function g(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=g(e),i!==null)return i;e=e.sibling}return null}var _=Object.assign,y=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),b=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),z=Symbol.for("react.consumer"),U=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),H=Symbol.for("react.suspense"),P=Symbol.for("react.suspense_list"),I=Symbol.for("react.memo"),X=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),w=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=G&&e[G]||e["@@iterator"],typeof e=="function"?e:null)}var rt=Symbol.for("react.client.reference");function lt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===rt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case b:return"Fragment";case v:return"Profiler";case M:return"StrictMode";case H:return"Suspense";case P:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case U:return e.displayName||"Context";case z:return(e._context.displayName||"Context")+".Consumer";case R:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case I:return i=e.displayName||null,i!==null?i:lt(e.type)||"Memo";case X:i=e._payload,e=e._init;try{return lt(e(i))}catch{}}return null}var ct=Array.isArray,O=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y={pending:!1,data:null,method:null,action:null},St=[],At=-1;function N(e){return{current:e}}function et(e){0>At||(e.current=St[At],St[At]=null,At--)}function Mt(e,i){At++,St[At]=e.current,e.current=i}var Dt=N(null),Ft=N(null),it=N(null),ht=N(null);function It(e,i){switch(Mt(it,i),Mt(Ft,e),Mt(Dt,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?d_(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=d_(i),e=p_(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}et(Dt),Mt(Dt,e)}function Bt(){et(Dt),et(Ft),et(it)}function qt(e){e.memoizedState!==null&&Mt(ht,e);var i=Dt.current,a=p_(i,e.type);i!==a&&(Mt(Ft,e),Mt(Dt,a))}function de(e){Ft.current===e&&(et(Dt),et(Ft)),ht.current===e&&(et(ht),Ao._currentValue=Y)}var Ne,B;function Et(e){if(Ne===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);Ne=i&&i[1]||"",B=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ne+e+B}var yt=!1;function mt(e,i){if(!e||yt)return"";yt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(ot){var nt=ot}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(ot){nt=ot}e.call(_t.prototype)}}else{try{throw Error()}catch(ot){nt=ot}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(ot){if(ot&&nt&&typeof ot.stack=="string")return[ot.stack,nt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),x=h[0],A=h[1];if(x&&A){var F=x.split(`
`),tt=A.split(`
`);for(u=o=0;o<F.length&&!F[o].includes("DetermineComponentFrameRoot");)o++;for(;u<tt.length&&!tt[u].includes("DetermineComponentFrameRoot");)u++;if(o===F.length||u===tt.length)for(o=F.length-1,u=tt.length-1;1<=o&&0<=u&&F[o]!==tt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(F[o]!==tt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||F[o]!==tt[u]){var dt=`
`+F[o].replace(" at new "," at ");return e.displayName&&dt.includes("<anonymous>")&&(dt=dt.replace("<anonymous>",e.displayName)),dt}while(1<=o&&0<=u);break}}}finally{yt=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?Et(a):""}function gt(e,i){switch(e.tag){case 26:case 27:case 5:return Et(e.type);case 16:return Et("Lazy");case 13:return e.child!==i&&i!==null?Et("Suspense Fallback"):Et("Suspense");case 19:return Et("SuspenseList");case 0:case 15:return mt(e.type,!1);case 11:return mt(e.type.render,!1);case 1:return mt(e.type,!0);case 31:return Et("Activity");default:return""}}function zt(e){try{var i="",a=null;do i+=gt(e,a),a=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Ct=Object.prototype.hasOwnProperty,Ot=r.unstable_scheduleCallback,oe=r.unstable_cancelCallback,le=r.unstable_shouldYield,L=r.unstable_requestPaint,T=r.unstable_now,J=r.unstable_getCurrentPriorityLevel,ut=r.unstable_ImmediatePriority,Tt=r.unstable_UserBlockingPriority,ft=r.unstable_NormalPriority,$t=r.unstable_LowPriority,Lt=r.unstable_IdlePriority,Qt=r.log,Jt=r.unstable_setDisableYieldValue,Rt=null,Nt=null;function ee(e){if(typeof Qt=="function"&&Jt(e),Nt&&typeof Nt.setStrictMode=="function")try{Nt.setStrictMode(Rt,e)}catch{}}var Xt=Math.clz32?Math.clz32:W,Ht=Math.log,fe=Math.LN2;function W(e){return e>>>=0,e===0?32:31-(Ht(e)/fe|0)|0}var wt=256,Pt=262144,Wt=4194304;function bt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function vt(e,i,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,x=e.pingedLanes;e=e.warmLanes;var A=o&134217727;return A!==0?(o=A&~h,o!==0?u=bt(o):(x&=A,x!==0?u=bt(x):a||(a=A&~e,a!==0&&(u=bt(a))))):(A=o&~h,A!==0?u=bt(A):x!==0?u=bt(x):a||(a=o&~e,a!==0&&(u=bt(a)))),u===0?0:i!==0&&i!==u&&(i&h)===0&&(h=u&-u,a=i&-i,h>=a||h===32&&(a&4194048)!==0)?i:u}function Yt(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function ce(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ze(){var e=Wt;return Wt<<=1,(Wt&62914560)===0&&(Wt=4194304),e}function Re(e){for(var i=[],a=0;31>a;a++)i.push(e);return i}function Un(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ni(e,i,a,o,u,h){var x=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var A=e.entanglements,F=e.expirationTimes,tt=e.hiddenUpdates;for(a=x&~a;0<a;){var dt=31-Xt(a),_t=1<<dt;A[dt]=0,F[dt]=-1;var nt=tt[dt];if(nt!==null)for(tt[dt]=null,dt=0;dt<nt.length;dt++){var ot=nt[dt];ot!==null&&(ot.lane&=-536870913)}a&=~_t}o!==0&&Fr(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(x&~i))}function Fr(e,i,a){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-Xt(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Ti(e,i){var a=e.entangledLanes|=i;for(e=e.entanglements;a;){var o=31-Xt(a),u=1<<o;u&i|e[o]&i&&(e[o]|=i),a&=~u}}function ws(e,i){var a=i&-i;return a=(a&42)!==0?1:Ds(a),(a&(e.suspendedLanes|i))!==0?0:a}function Ds(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Us(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function qa(){var e=K.p;return e!==0?e:(e=window.event,e===void 0?32:I_(e.type))}function Hr(e,i){var a=K.p;try{return K.p=e,i()}finally{K.p=a}}var qn=Math.random().toString(36).slice(2),rn="__reactFiber$"+qn,Sn="__reactProps$"+qn,ua="__reactContainer$"+qn,Gr="__reactEvents$"+qn,nu="__reactListeners$"+qn,iu="__reactHandles$"+qn,nl="__reactResources$"+qn,Ya="__reactMarker$"+qn;function C(e){delete e[rn],delete e[Sn],delete e[Gr],delete e[nu],delete e[iu]}function q(e){var i=e[rn];if(i)return i;for(var a=e.parentNode;a;){if(i=a[ua]||a[rn]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(e=S_(e);e!==null;){if(a=e[rn])return a;e=S_(e)}return i}e=a,a=e.parentNode}return null}function at(e){if(e=e[rn]||e[ua]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function st(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(s(33))}function j(e){var i=e[nl];return i||(i=e[nl]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function xt(e){e[Ya]=!0}var Gt=new Set,jt={};function kt(e,i){ne(e,i),ne(e+"Capture",i)}function ne(e,i){for(jt[e]=i,e=0;e<i.length;e++)Gt.add(i[e])}var re=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ie={},ve={};function Oe(e){return Ct.call(ve,e)?!0:Ct.call(ie,e)?!1:re.test(e)?ve[e]=!0:(ie[e]=!0,!1)}function We(e,i,a){if(Oe(i))if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+a)}}function Pe(e,i,a){if(a===null)e.removeAttribute(i);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+a)}}function ye(e,i,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(i,a,""+o)}}function Kt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ye(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ce(e,i,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(x){a=""+x,h.call(this,x)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(x){a=""+x},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Mn(e){if(!e._valueTracker){var i=Ye(e)?"checked":"value";e._valueTracker=Ce(e,i,""+e[i])}}function Ii(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var a=i.getValue(),o="";return e&&(o=Ye(e)?e.checked?"true":"false":e.value),e=o,e!==a?(i.setValue(e),!0):!1}function vn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Za=/[\n"\\]/g;function Ee(e){return e.replace(Za,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Rn(e,i,a,o,u,h,x,A){e.name="",x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"?e.type=x:e.removeAttribute("type"),i!=null?x==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Kt(i)):e.value!==""+Kt(i)&&(e.value=""+Kt(i)):x!=="submit"&&x!=="reset"||e.removeAttribute("value"),i!=null?hn(e,x,Kt(i)):a!=null?hn(e,x,Kt(a)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?e.name=""+Kt(A):e.removeAttribute("name")}function Ln(e,i,a,o,u,h,x,A){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),i!=null||a!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){Mn(e);return}a=a!=null?""+Kt(a):"",i=i!=null?""+Kt(i):a,A||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=A?e.checked:!!o,e.defaultChecked=!!o,x!=null&&typeof x!="function"&&typeof x!="symbol"&&typeof x!="boolean"&&(e.name=x),Mn(e)}function hn(e,i,a){i==="number"&&vn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function nn(e,i,a,o){if(e=e.options,i){i={};for(var u=0;u<a.length;u++)i["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=i.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Kt(a),i=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function Ls(e,i,a){if(i!=null&&(i=""+Kt(i),i!==e.value&&(e.value=i),a==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=a!=null?""+Kt(a):""}function bi(e,i,a,o){if(i==null){if(o!=null){if(a!=null)throw Error(s(92));if(ct(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),i=a}a=Kt(i),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Mn(e)}function Ns(e,i){if(i){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=i;return}}e.textContent=i}var ny=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function up(e,i,a){var o=i.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,a):typeof a!="number"||a===0||ny.has(i)?i==="float"?e.cssFloat=a:e[i]=(""+a).trim():e[i]=a+"px"}function fp(e,i,a){if(i!=null&&typeof i!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&a[u]!==o&&up(e,u,o)}else for(var h in i)i.hasOwnProperty(h)&&up(e,h,i[h])}function au(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var iy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ay=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function il(e){return ay.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Bi(){}var su=null;function ru(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Os=null,Ps=null;function hp(e){var i=at(e);if(i&&(e=i.stateNode)){var a=e[Sn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Rn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),i=a.name,a.type==="radio"&&i!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Ee(""+i)+'"][type="radio"]'),i=0;i<a.length;i++){var o=a[i];if(o!==e&&o.form===e.form){var u=o[Sn]||null;if(!u)throw Error(s(90));Rn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<a.length;i++)o=a[i],o.form===e.form&&Ii(o)}break t;case"textarea":Ls(e,a.value,a.defaultValue);break t;case"select":i=a.value,i!=null&&nn(e,!!a.multiple,i,!1)}}}var ou=!1;function dp(e,i,a){if(ou)return e(i,a);ou=!0;try{var o=e(i);return o}finally{if(ou=!1,(Os!==null||Ps!==null)&&(Xl(),Os&&(i=Os,e=Ps,Ps=Os=null,hp(i),e)))for(i=0;i<e.length;i++)hp(e[i])}}function Vr(e,i){var a=e.stateNode;if(a===null)return null;var o=a[Sn]||null;if(o===null)return null;a=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,i,typeof a));return a}var Fi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),lu=!1;if(Fi)try{var kr={};Object.defineProperty(kr,"passive",{get:function(){lu=!0}}),window.addEventListener("test",kr,kr),window.removeEventListener("test",kr,kr)}catch{lu=!1}var fa=null,cu=null,al=null;function pp(){if(al)return al;var e,i=cu,a=i.length,o,u="value"in fa?fa.value:fa.textContent,h=u.length;for(e=0;e<a&&i[e]===u[e];e++);var x=a-e;for(o=1;o<=x&&i[a-o]===u[h-o];o++);return al=u.slice(e,1<o?1-o:void 0)}function sl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function rl(){return!0}function mp(){return!1}function In(e){function i(a,o,u,h,x){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=x,this.currentTarget=null;for(var A in e)e.hasOwnProperty(A)&&(a=e[A],this[A]=a?a(h):h[A]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?rl:mp,this.isPropagationStopped=mp,this}return _(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=rl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=rl)},persist:function(){},isPersistent:rl}),i}var ja={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ol=In(ja),Xr=_({},ja,{view:0,detail:0}),sy=In(Xr),uu,fu,Wr,ll=_({},Xr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:du,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Wr&&(Wr&&e.type==="mousemove"?(uu=e.screenX-Wr.screenX,fu=e.screenY-Wr.screenY):fu=uu=0,Wr=e),uu)},movementY:function(e){return"movementY"in e?e.movementY:fu}}),gp=In(ll),ry=_({},ll,{dataTransfer:0}),oy=In(ry),ly=_({},Xr,{relatedTarget:0}),hu=In(ly),cy=_({},ja,{animationName:0,elapsedTime:0,pseudoElement:0}),uy=In(cy),fy=_({},ja,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),hy=In(fy),dy=_({},ja,{data:0}),_p=In(dy),py={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},my={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},gy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _y(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=gy[e])?!!i[e]:!1}function du(){return _y}var vy=_({},Xr,{key:function(e){if(e.key){var i=py[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=sl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?my[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:du,charCode:function(e){return e.type==="keypress"?sl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?sl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),yy=In(vy),xy=_({},ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),vp=In(xy),Sy=_({},Xr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:du}),My=In(Sy),Ey=_({},ja,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ty=In(Ey),by=_({},ll,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ay=In(by),Ry=_({},ja,{newState:0,oldState:0}),Cy=In(Ry),wy=[9,13,27,32],pu=Fi&&"CompositionEvent"in window,qr=null;Fi&&"documentMode"in document&&(qr=document.documentMode);var Dy=Fi&&"TextEvent"in window&&!qr,yp=Fi&&(!pu||qr&&8<qr&&11>=qr),xp=" ",Sp=!1;function Mp(e,i){switch(e){case"keyup":return wy.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ep(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var zs=!1;function Uy(e,i){switch(e){case"compositionend":return Ep(i);case"keypress":return i.which!==32?null:(Sp=!0,xp);case"textInput":return e=i.data,e===xp&&Sp?null:e;default:return null}}function Ly(e,i){if(zs)return e==="compositionend"||!pu&&Mp(e,i)?(e=pp(),al=cu=fa=null,zs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return yp&&i.locale!=="ko"?null:i.data;default:return null}}var Ny={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!Ny[e.type]:i==="textarea"}function bp(e,i,a,o){Os?Ps?Ps.push(o):Ps=[o]:Os=o,i=Ql(i,"onChange"),0<i.length&&(a=new ol("onChange","change",null,a,o),e.push({event:a,listeners:i}))}var Yr=null,Zr=null;function Oy(e){o_(e,0)}function cl(e){var i=st(e);if(Ii(i))return e}function Ap(e,i){if(e==="change")return i}var Rp=!1;if(Fi){var mu;if(Fi){var gu="oninput"in document;if(!gu){var Cp=document.createElement("div");Cp.setAttribute("oninput","return;"),gu=typeof Cp.oninput=="function"}mu=gu}else mu=!1;Rp=mu&&(!document.documentMode||9<document.documentMode)}function wp(){Yr&&(Yr.detachEvent("onpropertychange",Dp),Zr=Yr=null)}function Dp(e){if(e.propertyName==="value"&&cl(Zr)){var i=[];bp(i,Zr,e,ru(e)),dp(Oy,i)}}function Py(e,i,a){e==="focusin"?(wp(),Yr=i,Zr=a,Yr.attachEvent("onpropertychange",Dp)):e==="focusout"&&wp()}function zy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return cl(Zr)}function Iy(e,i){if(e==="click")return cl(i)}function By(e,i){if(e==="input"||e==="change")return cl(i)}function Fy(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var Yn=typeof Object.is=="function"?Object.is:Fy;function jr(e,i){if(Yn(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var a=Object.keys(e),o=Object.keys(i);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Ct.call(i,u)||!Yn(e[u],i[u]))return!1}return!0}function Up(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Lp(e,i){var a=Up(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=i&&o>=i)return{node:a,offset:i-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Up(a)}}function Np(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?Np(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function Op(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=vn(e.document);i instanceof e.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)e=i.contentWindow;else break;i=vn(e.document)}return i}function _u(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var Hy=Fi&&"documentMode"in document&&11>=document.documentMode,Is=null,vu=null,Kr=null,yu=!1;function Pp(e,i,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;yu||Is==null||Is!==vn(o)||(o=Is,"selectionStart"in o&&_u(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Kr&&jr(Kr,o)||(Kr=o,o=Ql(vu,"onSelect"),0<o.length&&(i=new ol("onSelect","select",null,i,a),e.push({event:i,listeners:o}),i.target=Is)))}function Ka(e,i){var a={};return a[e.toLowerCase()]=i.toLowerCase(),a["Webkit"+e]="webkit"+i,a["Moz"+e]="moz"+i,a}var Bs={animationend:Ka("Animation","AnimationEnd"),animationiteration:Ka("Animation","AnimationIteration"),animationstart:Ka("Animation","AnimationStart"),transitionrun:Ka("Transition","TransitionRun"),transitionstart:Ka("Transition","TransitionStart"),transitioncancel:Ka("Transition","TransitionCancel"),transitionend:Ka("Transition","TransitionEnd")},xu={},zp={};Fi&&(zp=document.createElement("div").style,"AnimationEvent"in window||(delete Bs.animationend.animation,delete Bs.animationiteration.animation,delete Bs.animationstart.animation),"TransitionEvent"in window||delete Bs.transitionend.transition);function Qa(e){if(xu[e])return xu[e];if(!Bs[e])return e;var i=Bs[e],a;for(a in i)if(i.hasOwnProperty(a)&&a in zp)return xu[e]=i[a];return e}var Ip=Qa("animationend"),Bp=Qa("animationiteration"),Fp=Qa("animationstart"),Gy=Qa("transitionrun"),Vy=Qa("transitionstart"),ky=Qa("transitioncancel"),Hp=Qa("transitionend"),Gp=new Map,Su="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Su.push("scrollEnd");function pi(e,i){Gp.set(e,i),kt(i,[e])}var ul=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ii=[],Fs=0,Mu=0;function fl(){for(var e=Fs,i=Mu=Fs=0;i<e;){var a=ii[i];ii[i++]=null;var o=ii[i];ii[i++]=null;var u=ii[i];ii[i++]=null;var h=ii[i];if(ii[i++]=null,o!==null&&u!==null){var x=o.pending;x===null?u.next=u:(u.next=x.next,x.next=u),o.pending=u}h!==0&&Vp(a,u,h)}}function hl(e,i,a,o){ii[Fs++]=e,ii[Fs++]=i,ii[Fs++]=a,ii[Fs++]=o,Mu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Eu(e,i,a,o){return hl(e,i,a,o),dl(e)}function Ja(e,i){return hl(e,null,null,i),dl(e)}function Vp(e,i,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,h=e.return;h!==null;)h.childLanes|=a,o=h.alternate,o!==null&&(o.childLanes|=a),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&i!==null&&(u=31-Xt(a),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=a|536870912),h):null}function dl(e){if(50<yo)throw yo=0,Nf=null,Error(s(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var Hs={};function Xy(e,i,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Zn(e,i,a,o){return new Xy(e,i,a,o)}function Tu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hi(e,i){var a=e.alternate;return a===null?(a=Zn(e.tag,i,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=i,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,i=e.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function kp(e,i){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,i=a.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function pl(e,i,a,o,u,h){var x=0;if(o=e,typeof e=="function")Tu(e)&&(x=1);else if(typeof e=="string")x=jx(e,a,Dt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=Zn(31,a,i,u),e.elementType=D,e.lanes=h,e;case b:return $a(a.children,u,h,i);case M:x=8,u|=24;break;case v:return e=Zn(12,a,i,u|2),e.elementType=v,e.lanes=h,e;case H:return e=Zn(13,a,i,u),e.elementType=H,e.lanes=h,e;case P:return e=Zn(19,a,i,u),e.elementType=P,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case U:x=10;break t;case z:x=9;break t;case R:x=11;break t;case I:x=14;break t;case X:x=16,o=null;break t}x=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return i=Zn(x,a,i,u),i.elementType=e,i.type=o,i.lanes=h,i}function $a(e,i,a,o){return e=Zn(7,e,o,i),e.lanes=a,e}function bu(e,i,a){return e=Zn(6,e,null,i),e.lanes=a,e}function Xp(e){var i=Zn(18,null,null,0);return i.stateNode=e,i}function Au(e,i,a){return i=Zn(4,e.children!==null?e.children:[],e.key,i),i.lanes=a,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var Wp=new WeakMap;function ai(e,i){if(typeof e=="object"&&e!==null){var a=Wp.get(e);return a!==void 0?a:(i={value:e,source:i,stack:zt(i)},Wp.set(e,i),i)}return{value:e,source:i,stack:zt(i)}}var Gs=[],Vs=0,ml=null,Qr=0,si=[],ri=0,ha=null,Ai=1,Ri="";function Gi(e,i){Gs[Vs++]=Qr,Gs[Vs++]=ml,ml=e,Qr=i}function qp(e,i,a){si[ri++]=Ai,si[ri++]=Ri,si[ri++]=ha,ha=e;var o=Ai;e=Ri;var u=32-Xt(o)-1;o&=~(1<<u),a+=1;var h=32-Xt(i)+u;if(30<h){var x=u-u%5;h=(o&(1<<x)-1).toString(32),o>>=x,u-=x,Ai=1<<32-Xt(i)+u|a<<u|o,Ri=h+e}else Ai=1<<h|a<<u|o,Ri=e}function Ru(e){e.return!==null&&(Gi(e,1),qp(e,1,0))}function Cu(e){for(;e===ml;)ml=Gs[--Vs],Gs[Vs]=null,Qr=Gs[--Vs],Gs[Vs]=null;for(;e===ha;)ha=si[--ri],si[ri]=null,Ri=si[--ri],si[ri]=null,Ai=si[--ri],si[ri]=null}function Yp(e,i){si[ri++]=Ai,si[ri++]=Ri,si[ri++]=ha,Ai=i.id,Ri=i.overflow,ha=e}var En=null,je=null,Ae=!1,da=null,oi=!1,wu=Error(s(519));function pa(e){var i=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Jr(ai(i,e)),wu}function Zp(e){var i=e.stateNode,a=e.type,o=e.memoizedProps;switch(i[rn]=e,i[Sn]=o,a){case"dialog":Se("cancel",i),Se("close",i);break;case"iframe":case"object":case"embed":Se("load",i);break;case"video":case"audio":for(a=0;a<So.length;a++)Se(So[a],i);break;case"source":Se("error",i);break;case"img":case"image":case"link":Se("error",i),Se("load",i);break;case"details":Se("toggle",i);break;case"input":Se("invalid",i),Ln(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":Se("invalid",i);break;case"textarea":Se("invalid",i),bi(i,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||i.textContent===""+a||o.suppressHydrationWarning===!0||f_(i.textContent,a)?(o.popover!=null&&(Se("beforetoggle",i),Se("toggle",i)),o.onScroll!=null&&Se("scroll",i),o.onScrollEnd!=null&&Se("scrollend",i),o.onClick!=null&&(i.onclick=Bi),i=!0):i=!1,i||pa(e,!0)}function jp(e){for(En=e.return;En;)switch(En.tag){case 5:case 31:case 13:oi=!1;return;case 27:case 3:oi=!0;return;default:En=En.return}}function ks(e){if(e!==En)return!1;if(!Ae)return jp(e),Ae=!0,!1;var i=e.tag,a;if((a=i!==3&&i!==27)&&((a=i===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Zf(e.type,e.memoizedProps)),a=!a),a&&je&&pa(e),jp(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));je=x_(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));je=x_(e)}else i===27?(i=je,Ca(e.type)?(e=$f,$f=null,je=e):je=i):je=En?ci(e.stateNode.nextSibling):null;return!0}function ts(){je=En=null,Ae=!1}function Du(){var e=da;return e!==null&&(Gn===null?Gn=e:Gn.push.apply(Gn,e),da=null),e}function Jr(e){da===null?da=[e]:da.push(e)}var Uu=N(null),es=null,Vi=null;function ma(e,i,a){Mt(Uu,i._currentValue),i._currentValue=a}function ki(e){e._currentValue=Uu.current,et(Uu)}function Lu(e,i,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===a)break;e=e.return}}function Nu(e,i,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var x=u.child;h=h.firstContext;t:for(;h!==null;){var A=h;h=u;for(var F=0;F<i.length;F++)if(A.context===i[F]){h.lanes|=a,A=h.alternate,A!==null&&(A.lanes|=a),Lu(h.return,a,e),o||(x=null);break t}h=A.next}}else if(u.tag===18){if(x=u.return,x===null)throw Error(s(341));x.lanes|=a,h=x.alternate,h!==null&&(h.lanes|=a),Lu(x,a,e),x=null}else x=u.child;if(x!==null)x.return=u;else for(x=u;x!==null;){if(x===e){x=null;break}if(u=x.sibling,u!==null){u.return=x.return,x=u;break}x=x.return}u=x}}function Xs(e,i,a,o){e=null;for(var u=i,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var x=u.alternate;if(x===null)throw Error(s(387));if(x=x.memoizedProps,x!==null){var A=u.type;Yn(u.pendingProps.value,x.value)||(e!==null?e.push(A):e=[A])}}else if(u===ht.current){if(x=u.alternate,x===null)throw Error(s(387));x.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Ao):e=[Ao])}u=u.return}e!==null&&Nu(i,e,a,o),i.flags|=262144}function gl(e){for(e=e.firstContext;e!==null;){if(!Yn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ns(e){es=e,Vi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Tn(e){return Kp(es,e)}function _l(e,i){return es===null&&ns(e),Kp(e,i)}function Kp(e,i){var a=i._currentValue;if(i={context:i,memoizedValue:a,next:null},Vi===null){if(e===null)throw Error(s(308));Vi=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else Vi=Vi.next=i;return a}var Wy=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(a){return a()})}},qy=r.unstable_scheduleCallback,Yy=r.unstable_NormalPriority,on={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ou(){return{controller:new Wy,data:new Map,refCount:0}}function $r(e){e.refCount--,e.refCount===0&&qy(Yy,function(){e.controller.abort()})}var to=null,Pu=0,Ws=0,qs=null;function Zy(e,i){if(to===null){var a=to=[];Pu=0,Ws=Ff(),qs={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Pu++,i.then(Qp,Qp),i}function Qp(){if(--Pu===0&&to!==null){qs!==null&&(qs.status="fulfilled");var e=to;to=null,Ws=0,qs=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function jy(e,i){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<a.length;u++)(0,a[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Jp=O.S;O.S=function(e,i){Pg=T(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&Zy(e,i),Jp!==null&&Jp(e,i)};var is=N(null);function zu(){var e=is.current;return e!==null?e:qe.pooledCache}function vl(e,i){i===null?Mt(is,is.current):Mt(is,i.pool)}function $p(){var e=zu();return e===null?null:{parent:on._currentValue,pool:e}}var Ys=Error(s(460)),Iu=Error(s(474)),yl=Error(s(542)),xl={then:function(){}};function tm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function em(e,i,a){switch(a=e[a],a===void 0?e.push(i):a!==i&&(i.then(Bi,Bi),i=a),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,im(e),e;default:if(typeof i.status=="string")i.then(Bi,Bi);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,im(e),e}throw ss=i,Ys}}function as(e){try{var i=e._init;return i(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ss=a,Ys):a}}var ss=null;function nm(){if(ss===null)throw Error(s(459));var e=ss;return ss=null,e}function im(e){if(e===Ys||e===yl)throw Error(s(483))}var Zs=null,eo=0;function Sl(e){var i=eo;return eo+=1,Zs===null&&(Zs=[]),em(Zs,e,i)}function no(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Ml(e,i){throw i.$$typeof===y?Error(s(525)):(e=Object.prototype.toString.call(i),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function am(e){function i(Z,k){if(e){var $=Z.deletions;$===null?(Z.deletions=[k],Z.flags|=16):$.push(k)}}function a(Z,k){if(!e)return null;for(;k!==null;)i(Z,k),k=k.sibling;return null}function o(Z){for(var k=new Map;Z!==null;)Z.key!==null?k.set(Z.key,Z):k.set(Z.index,Z),Z=Z.sibling;return k}function u(Z,k){return Z=Hi(Z,k),Z.index=0,Z.sibling=null,Z}function h(Z,k,$){return Z.index=$,e?($=Z.alternate,$!==null?($=$.index,$<k?(Z.flags|=67108866,k):$):(Z.flags|=67108866,k)):(Z.flags|=1048576,k)}function x(Z){return e&&Z.alternate===null&&(Z.flags|=67108866),Z}function A(Z,k,$,pt){return k===null||k.tag!==6?(k=bu($,Z.mode,pt),k.return=Z,k):(k=u(k,$),k.return=Z,k)}function F(Z,k,$,pt){var ae=$.type;return ae===b?dt(Z,k,$.props.children,pt,$.key):k!==null&&(k.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===X&&as(ae)===k.type)?(k=u(k,$.props),no(k,$),k.return=Z,k):(k=pl($.type,$.key,$.props,null,Z.mode,pt),no(k,$),k.return=Z,k)}function tt(Z,k,$,pt){return k===null||k.tag!==4||k.stateNode.containerInfo!==$.containerInfo||k.stateNode.implementation!==$.implementation?(k=Au($,Z.mode,pt),k.return=Z,k):(k=u(k,$.children||[]),k.return=Z,k)}function dt(Z,k,$,pt,ae){return k===null||k.tag!==7?(k=$a($,Z.mode,pt,ae),k.return=Z,k):(k=u(k,$),k.return=Z,k)}function _t(Z,k,$){if(typeof k=="string"&&k!==""||typeof k=="number"||typeof k=="bigint")return k=bu(""+k,Z.mode,$),k.return=Z,k;if(typeof k=="object"&&k!==null){switch(k.$$typeof){case S:return $=pl(k.type,k.key,k.props,null,Z.mode,$),no($,k),$.return=Z,$;case E:return k=Au(k,Z.mode,$),k.return=Z,k;case X:return k=as(k),_t(Z,k,$)}if(ct(k)||Q(k))return k=$a(k,Z.mode,$,null),k.return=Z,k;if(typeof k.then=="function")return _t(Z,Sl(k),$);if(k.$$typeof===U)return _t(Z,_l(Z,k),$);Ml(Z,k)}return null}function nt(Z,k,$,pt){var ae=k!==null?k.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return ae!==null?null:A(Z,k,""+$,pt);if(typeof $=="object"&&$!==null){switch($.$$typeof){case S:return $.key===ae?F(Z,k,$,pt):null;case E:return $.key===ae?tt(Z,k,$,pt):null;case X:return $=as($),nt(Z,k,$,pt)}if(ct($)||Q($))return ae!==null?null:dt(Z,k,$,pt,null);if(typeof $.then=="function")return nt(Z,k,Sl($),pt);if($.$$typeof===U)return nt(Z,k,_l(Z,$),pt);Ml(Z,$)}return null}function ot(Z,k,$,pt,ae){if(typeof pt=="string"&&pt!==""||typeof pt=="number"||typeof pt=="bigint")return Z=Z.get($)||null,A(k,Z,""+pt,ae);if(typeof pt=="object"&&pt!==null){switch(pt.$$typeof){case S:return Z=Z.get(pt.key===null?$:pt.key)||null,F(k,Z,pt,ae);case E:return Z=Z.get(pt.key===null?$:pt.key)||null,tt(k,Z,pt,ae);case X:return pt=as(pt),ot(Z,k,$,pt,ae)}if(ct(pt)||Q(pt))return Z=Z.get($)||null,dt(k,Z,pt,ae,null);if(typeof pt.then=="function")return ot(Z,k,$,Sl(pt),ae);if(pt.$$typeof===U)return ot(Z,k,$,_l(k,pt),ae);Ml(k,pt)}return null}function Zt(Z,k,$,pt){for(var ae=null,we=null,te=k,pe=k=0,be=null;te!==null&&pe<$.length;pe++){te.index>pe?(be=te,te=null):be=te.sibling;var De=nt(Z,te,$[pe],pt);if(De===null){te===null&&(te=be);break}e&&te&&De.alternate===null&&i(Z,te),k=h(De,k,pe),we===null?ae=De:we.sibling=De,we=De,te=be}if(pe===$.length)return a(Z,te),Ae&&Gi(Z,pe),ae;if(te===null){for(;pe<$.length;pe++)te=_t(Z,$[pe],pt),te!==null&&(k=h(te,k,pe),we===null?ae=te:we.sibling=te,we=te);return Ae&&Gi(Z,pe),ae}for(te=o(te);pe<$.length;pe++)be=ot(te,Z,pe,$[pe],pt),be!==null&&(e&&be.alternate!==null&&te.delete(be.key===null?pe:be.key),k=h(be,k,pe),we===null?ae=be:we.sibling=be,we=be);return e&&te.forEach(function(Na){return i(Z,Na)}),Ae&&Gi(Z,pe),ae}function se(Z,k,$,pt){if($==null)throw Error(s(151));for(var ae=null,we=null,te=k,pe=k=0,be=null,De=$.next();te!==null&&!De.done;pe++,De=$.next()){te.index>pe?(be=te,te=null):be=te.sibling;var Na=nt(Z,te,De.value,pt);if(Na===null){te===null&&(te=be);break}e&&te&&Na.alternate===null&&i(Z,te),k=h(Na,k,pe),we===null?ae=Na:we.sibling=Na,we=Na,te=be}if(De.done)return a(Z,te),Ae&&Gi(Z,pe),ae;if(te===null){for(;!De.done;pe++,De=$.next())De=_t(Z,De.value,pt),De!==null&&(k=h(De,k,pe),we===null?ae=De:we.sibling=De,we=De);return Ae&&Gi(Z,pe),ae}for(te=o(te);!De.done;pe++,De=$.next())De=ot(te,Z,pe,De.value,pt),De!==null&&(e&&De.alternate!==null&&te.delete(De.key===null?pe:De.key),k=h(De,k,pe),we===null?ae=De:we.sibling=De,we=De);return e&&te.forEach(function(rS){return i(Z,rS)}),Ae&&Gi(Z,pe),ae}function Ge(Z,k,$,pt){if(typeof $=="object"&&$!==null&&$.type===b&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case S:t:{for(var ae=$.key;k!==null;){if(k.key===ae){if(ae=$.type,ae===b){if(k.tag===7){a(Z,k.sibling),pt=u(k,$.props.children),pt.return=Z,Z=pt;break t}}else if(k.elementType===ae||typeof ae=="object"&&ae!==null&&ae.$$typeof===X&&as(ae)===k.type){a(Z,k.sibling),pt=u(k,$.props),no(pt,$),pt.return=Z,Z=pt;break t}a(Z,k);break}else i(Z,k);k=k.sibling}$.type===b?(pt=$a($.props.children,Z.mode,pt,$.key),pt.return=Z,Z=pt):(pt=pl($.type,$.key,$.props,null,Z.mode,pt),no(pt,$),pt.return=Z,Z=pt)}return x(Z);case E:t:{for(ae=$.key;k!==null;){if(k.key===ae)if(k.tag===4&&k.stateNode.containerInfo===$.containerInfo&&k.stateNode.implementation===$.implementation){a(Z,k.sibling),pt=u(k,$.children||[]),pt.return=Z,Z=pt;break t}else{a(Z,k);break}else i(Z,k);k=k.sibling}pt=Au($,Z.mode,pt),pt.return=Z,Z=pt}return x(Z);case X:return $=as($),Ge(Z,k,$,pt)}if(ct($))return Zt(Z,k,$,pt);if(Q($)){if(ae=Q($),typeof ae!="function")throw Error(s(150));return $=ae.call($),se(Z,k,$,pt)}if(typeof $.then=="function")return Ge(Z,k,Sl($),pt);if($.$$typeof===U)return Ge(Z,k,_l(Z,$),pt);Ml(Z,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,k!==null&&k.tag===6?(a(Z,k.sibling),pt=u(k,$),pt.return=Z,Z=pt):(a(Z,k),pt=bu($,Z.mode,pt),pt.return=Z,Z=pt),x(Z)):a(Z,k)}return function(Z,k,$,pt){try{eo=0;var ae=Ge(Z,k,$,pt);return Zs=null,ae}catch(te){if(te===Ys||te===yl)throw te;var we=Zn(29,te,null,Z.mode);return we.lanes=pt,we.return=Z,we}}}var rs=am(!0),sm=am(!1),ga=!1;function Bu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Fu(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function _a(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function va(e,i,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=dl(e),Vp(e,null,a),i}return hl(e,o,i,a),dl(e)}function io(e,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,Ti(e,a)}}function Hu(e,i){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,h=null;if(a=a.firstBaseUpdate,a!==null){do{var x={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};h===null?u=h=x:h=h.next=x,a=a.next}while(a!==null);h===null?u=h=i:h=h.next=i}else u=h=i;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=i:e.next=i,a.lastBaseUpdate=i}var Gu=!1;function ao(){if(Gu){var e=qs;if(e!==null)throw e}}function so(e,i,a,o){Gu=!1;var u=e.updateQueue;ga=!1;var h=u.firstBaseUpdate,x=u.lastBaseUpdate,A=u.shared.pending;if(A!==null){u.shared.pending=null;var F=A,tt=F.next;F.next=null,x===null?h=tt:x.next=tt,x=F;var dt=e.alternate;dt!==null&&(dt=dt.updateQueue,A=dt.lastBaseUpdate,A!==x&&(A===null?dt.firstBaseUpdate=tt:A.next=tt,dt.lastBaseUpdate=F))}if(h!==null){var _t=u.baseState;x=0,dt=tt=F=null,A=h;do{var nt=A.lane&-536870913,ot=nt!==A.lane;if(ot?(Te&nt)===nt:(o&nt)===nt){nt!==0&&nt===Ws&&(Gu=!0),dt!==null&&(dt=dt.next={lane:0,tag:A.tag,payload:A.payload,callback:null,next:null});t:{var Zt=e,se=A;nt=i;var Ge=a;switch(se.tag){case 1:if(Zt=se.payload,typeof Zt=="function"){_t=Zt.call(Ge,_t,nt);break t}_t=Zt;break t;case 3:Zt.flags=Zt.flags&-65537|128;case 0:if(Zt=se.payload,nt=typeof Zt=="function"?Zt.call(Ge,_t,nt):Zt,nt==null)break t;_t=_({},_t,nt);break t;case 2:ga=!0}}nt=A.callback,nt!==null&&(e.flags|=64,ot&&(e.flags|=8192),ot=u.callbacks,ot===null?u.callbacks=[nt]:ot.push(nt))}else ot={lane:nt,tag:A.tag,payload:A.payload,callback:A.callback,next:null},dt===null?(tt=dt=ot,F=_t):dt=dt.next=ot,x|=nt;if(A=A.next,A===null){if(A=u.shared.pending,A===null)break;ot=A,A=ot.next,ot.next=null,u.lastBaseUpdate=ot,u.shared.pending=null}}while(!0);dt===null&&(F=_t),u.baseState=F,u.firstBaseUpdate=tt,u.lastBaseUpdate=dt,h===null&&(u.shared.lanes=0),Ea|=x,e.lanes=x,e.memoizedState=_t}}function rm(e,i){if(typeof e!="function")throw Error(s(191,e));e.call(i)}function om(e,i){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)rm(a[e],i)}var js=N(null),El=N(0);function lm(e,i){e=Ji,Mt(El,e),Mt(js,i),Ji=e|i.baseLanes}function Vu(){Mt(El,Ji),Mt(js,js.current)}function ku(){Ji=El.current,et(js),et(El)}var jn=N(null),li=null;function ya(e){var i=e.alternate;Mt(an,an.current&1),Mt(jn,e),li===null&&(i===null||js.current!==null||i.memoizedState!==null)&&(li=e)}function Xu(e){Mt(an,an.current),Mt(jn,e),li===null&&(li=e)}function cm(e){e.tag===22?(Mt(an,an.current),Mt(jn,e),li===null&&(li=e)):xa()}function xa(){Mt(an,an.current),Mt(jn,jn.current)}function Kn(e){et(jn),li===e&&(li=null),et(an)}var an=N(0);function Tl(e){for(var i=e;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Qf(a)||Jf(a)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Xi=0,he=null,Fe=null,ln=null,bl=!1,Ks=!1,os=!1,Al=0,ro=0,Qs=null,Ky=0;function tn(){throw Error(s(321))}function Wu(e,i){if(i===null)return!1;for(var a=0;a<i.length&&a<e.length;a++)if(!Yn(e[a],i[a]))return!1;return!0}function qu(e,i,a,o,u,h){return Xi=h,he=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,O.H=e===null||e.memoizedState===null?qm:lf,os=!1,h=a(o,u),os=!1,Ks&&(h=fm(i,a,o,u)),um(e),h}function um(e){O.H=co;var i=Fe!==null&&Fe.next!==null;if(Xi=0,ln=Fe=he=null,bl=!1,ro=0,Qs=null,i)throw Error(s(300));e===null||cn||(e=e.dependencies,e!==null&&gl(e)&&(cn=!0))}function fm(e,i,a,o){he=e;var u=0;do{if(Ks&&(Qs=null),ro=0,Ks=!1,25<=u)throw Error(s(301));if(u+=1,ln=Fe=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}O.H=Ym,h=i(a,o)}while(Ks);return h}function Qy(){var e=O.H,i=e.useState()[0];return i=typeof i.then=="function"?oo(i):i,e=e.useState()[0],(Fe!==null?Fe.memoizedState:null)!==e&&(he.flags|=1024),i}function Yu(){var e=Al!==0;return Al=0,e}function Zu(e,i,a){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~a}function ju(e){if(bl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}bl=!1}Xi=0,ln=Fe=he=null,Ks=!1,ro=Al=0,Qs=null}function Nn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ln===null?he.memoizedState=ln=e:ln=ln.next=e,ln}function sn(){if(Fe===null){var e=he.alternate;e=e!==null?e.memoizedState:null}else e=Fe.next;var i=ln===null?he.memoizedState:ln.next;if(i!==null)ln=i,Fe=e;else{if(e===null)throw he.alternate===null?Error(s(467)):Error(s(310));Fe=e,e={memoizedState:Fe.memoizedState,baseState:Fe.baseState,baseQueue:Fe.baseQueue,queue:Fe.queue,next:null},ln===null?he.memoizedState=ln=e:ln=ln.next=e}return ln}function Rl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function oo(e){var i=ro;return ro+=1,Qs===null&&(Qs=[]),e=em(Qs,e,i),i=he,(ln===null?i.memoizedState:ln.next)===null&&(i=i.alternate,O.H=i===null||i.memoizedState===null?qm:lf),e}function Cl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return oo(e);if(e.$$typeof===U)return Tn(e)}throw Error(s(438,String(e)))}function Ku(e){var i=null,a=he.updateQueue;if(a!==null&&(i=a.memoCache),i==null){var o=he.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),a===null&&(a=Rl(),he.updateQueue=a),a.memoCache=i,a=i.data[i.index],a===void 0)for(a=i.data[i.index]=Array(e),o=0;o<e;o++)a[o]=w;return i.index++,a}function Wi(e,i){return typeof i=="function"?i(e):i}function wl(e){var i=sn();return Qu(i,Fe,e)}function Qu(e,i,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var x=u.next;u.next=h.next,h.next=x}i.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{i=u.next;var A=x=null,F=null,tt=i,dt=!1;do{var _t=tt.lane&-536870913;if(_t!==tt.lane?(Te&_t)===_t:(Xi&_t)===_t){var nt=tt.revertLane;if(nt===0)F!==null&&(F=F.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),_t===Ws&&(dt=!0);else if((Xi&nt)===nt){tt=tt.next,nt===Ws&&(dt=!0);continue}else _t={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},F===null?(A=F=_t,x=h):F=F.next=_t,he.lanes|=nt,Ea|=nt;_t=tt.action,os&&a(h,_t),h=tt.hasEagerState?tt.eagerState:a(h,_t)}else nt={lane:_t,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},F===null?(A=F=nt,x=h):F=F.next=nt,he.lanes|=_t,Ea|=_t;tt=tt.next}while(tt!==null&&tt!==i);if(F===null?x=h:F.next=A,!Yn(h,e.memoizedState)&&(cn=!0,dt&&(a=qs,a!==null)))throw a;e.memoizedState=h,e.baseState=x,e.baseQueue=F,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Ju(e){var i=sn(),a=i.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,h=i.memoizedState;if(u!==null){a.pending=null;var x=u=u.next;do h=e(h,x.action),x=x.next;while(x!==u);Yn(h,i.memoizedState)||(cn=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),a.lastRenderedState=h}return[h,o]}function hm(e,i,a){var o=he,u=sn(),h=Ae;if(h){if(a===void 0)throw Error(s(407));a=a()}else a=i();var x=!Yn((Fe||u).memoizedState,a);if(x&&(u.memoizedState=a,cn=!0),u=u.queue,ef(mm.bind(null,o,u,e),[e]),u.getSnapshot!==i||x||ln!==null&&ln.memoizedState.tag&1){if(o.flags|=2048,Js(9,{destroy:void 0},pm.bind(null,o,u,a,i),null),qe===null)throw Error(s(349));h||(Xi&127)!==0||dm(o,i,a)}return a}function dm(e,i,a){e.flags|=16384,e={getSnapshot:i,value:a},i=he.updateQueue,i===null?(i=Rl(),he.updateQueue=i,i.stores=[e]):(a=i.stores,a===null?i.stores=[e]:a.push(e))}function pm(e,i,a,o){i.value=a,i.getSnapshot=o,gm(i)&&_m(e)}function mm(e,i,a){return a(function(){gm(i)&&_m(e)})}function gm(e){var i=e.getSnapshot;e=e.value;try{var a=i();return!Yn(e,a)}catch{return!0}}function _m(e){var i=Ja(e,2);i!==null&&Vn(i,e,2)}function $u(e){var i=Nn();if(typeof e=="function"){var a=e;if(e=a(),os){ee(!0);try{a()}finally{ee(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:e},i}function vm(e,i,a,o){return e.baseState=a,Qu(e,Fe,typeof o=="function"?o:Wi)}function Jy(e,i,a,o,u){if(Ll(e))throw Error(s(485));if(e=i.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(x){h.listeners.push(x)}};O.T!==null?a(!0):h.isTransition=!1,o(h),a=i.pending,a===null?(h.next=i.pending=h,ym(i,h)):(h.next=a.next,i.pending=a.next=h)}}function ym(e,i){var a=i.action,o=i.payload,u=e.state;if(i.isTransition){var h=O.T,x={};O.T=x;try{var A=a(u,o),F=O.S;F!==null&&F(x,A),xm(e,i,A)}catch(tt){tf(e,i,tt)}finally{h!==null&&x.types!==null&&(h.types=x.types),O.T=h}}else try{h=a(u,o),xm(e,i,h)}catch(tt){tf(e,i,tt)}}function xm(e,i,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Sm(e,i,o)},function(o){return tf(e,i,o)}):Sm(e,i,a)}function Sm(e,i,a){i.status="fulfilled",i.value=a,Mm(i),e.state=a,i=e.pending,i!==null&&(a=i.next,a===i?e.pending=null:(a=a.next,i.next=a,ym(e,a)))}function tf(e,i,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=a,Mm(i),i=i.next;while(i!==o)}e.action=null}function Mm(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Em(e,i){return i}function Tm(e,i){if(Ae){var a=qe.formState;if(a!==null){t:{var o=he;if(Ae){if(je){e:{for(var u=je,h=oi;u.nodeType!==8;){if(!h){u=null;break e}if(u=ci(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){je=ci(u.nextSibling),o=u.data==="F!";break t}}pa(o)}o=!1}o&&(i=a[0])}}return a=Nn(),a.memoizedState=a.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Em,lastRenderedState:i},a.queue=o,a=km.bind(null,he,o),o.dispatch=a,o=$u(!1),h=of.bind(null,he,!1,o.queue),o=Nn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,a=Jy.bind(null,he,u,h,a),u.dispatch=a,o.memoizedState=e,[i,a,!1]}function bm(e){var i=sn();return Am(i,Fe,e)}function Am(e,i,a){if(i=Qu(e,i,Em)[0],e=wl(Wi)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=oo(i)}catch(x){throw x===Ys?yl:x}else o=i;i=sn();var u=i.queue,h=u.dispatch;return a!==i.memoizedState&&(he.flags|=2048,Js(9,{destroy:void 0},$y.bind(null,u,a),null)),[o,h,e]}function $y(e,i){e.action=i}function Rm(e){var i=sn(),a=Fe;if(a!==null)return Am(i,a,e);sn(),i=i.memoizedState,a=sn();var o=a.queue.dispatch;return a.memoizedState=e,[i,o,!1]}function Js(e,i,a,o){return e={tag:e,create:a,deps:o,inst:i,next:null},i=he.updateQueue,i===null&&(i=Rl(),he.updateQueue=i),a=i.lastEffect,a===null?i.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,i.lastEffect=e),e}function Cm(){return sn().memoizedState}function Dl(e,i,a,o){var u=Nn();he.flags|=e,u.memoizedState=Js(1|i,{destroy:void 0},a,o===void 0?null:o)}function Ul(e,i,a,o){var u=sn();o=o===void 0?null:o;var h=u.memoizedState.inst;Fe!==null&&o!==null&&Wu(o,Fe.memoizedState.deps)?u.memoizedState=Js(i,h,a,o):(he.flags|=e,u.memoizedState=Js(1|i,h,a,o))}function wm(e,i){Dl(8390656,8,e,i)}function ef(e,i){Ul(2048,8,e,i)}function tx(e){he.flags|=4;var i=he.updateQueue;if(i===null)i=Rl(),he.updateQueue=i,i.events=[e];else{var a=i.events;a===null?i.events=[e]:a.push(e)}}function Dm(e){var i=sn().memoizedState;return tx({ref:i,nextImpl:e}),function(){if((Le&2)!==0)throw Error(s(440));return i.impl.apply(void 0,arguments)}}function Um(e,i){return Ul(4,2,e,i)}function Lm(e,i){return Ul(4,4,e,i)}function Nm(e,i){if(typeof i=="function"){e=e();var a=i(e);return function(){typeof a=="function"?a():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function Om(e,i,a){a=a!=null?a.concat([e]):null,Ul(4,4,Nm.bind(null,i,e),a)}function nf(){}function Pm(e,i){var a=sn();i=i===void 0?null:i;var o=a.memoizedState;return i!==null&&Wu(i,o[1])?o[0]:(a.memoizedState=[e,i],e)}function zm(e,i){var a=sn();i=i===void 0?null:i;var o=a.memoizedState;if(i!==null&&Wu(i,o[1]))return o[0];if(o=e(),os){ee(!0);try{e()}finally{ee(!1)}}return a.memoizedState=[o,i],o}function af(e,i,a){return a===void 0||(Xi&1073741824)!==0&&(Te&261930)===0?e.memoizedState=i:(e.memoizedState=a,e=Ig(),he.lanes|=e,Ea|=e,a)}function Im(e,i,a,o){return Yn(a,i)?a:js.current!==null?(e=af(e,a,o),Yn(e,i)||(cn=!0),e):(Xi&42)===0||(Xi&1073741824)!==0&&(Te&261930)===0?(cn=!0,e.memoizedState=a):(e=Ig(),he.lanes|=e,Ea|=e,i)}function Bm(e,i,a,o,u){var h=K.p;K.p=h!==0&&8>h?h:8;var x=O.T,A={};O.T=A,of(e,!1,i,a);try{var F=u(),tt=O.S;if(tt!==null&&tt(A,F),F!==null&&typeof F=="object"&&typeof F.then=="function"){var dt=jy(F,o);lo(e,i,dt,$n(e))}else lo(e,i,o,$n(e))}catch(_t){lo(e,i,{then:function(){},status:"rejected",reason:_t},$n())}finally{K.p=h,x!==null&&A.types!==null&&(x.types=A.types),O.T=x}}function ex(){}function sf(e,i,a,o){if(e.tag!==5)throw Error(s(476));var u=Fm(e).queue;Bm(e,u,i,Y,a===null?ex:function(){return Hm(e),a(o)})}function Fm(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:Y,baseState:Y,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:Y},next:null};var a={};return i.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:a},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function Hm(e){var i=Fm(e);i.next===null&&(i=e.alternate.memoizedState),lo(e,i.next.queue,{},$n())}function rf(){return Tn(Ao)}function Gm(){return sn().memoizedState}function Vm(){return sn().memoizedState}function nx(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var a=$n();e=_a(a);var o=va(i,e,a);o!==null&&(Vn(o,i,a),io(o,i,a)),i={cache:Ou()},e.payload=i;return}i=i.return}}function ix(e,i,a){var o=$n();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ll(e)?Xm(i,a):(a=Eu(e,i,a,o),a!==null&&(Vn(a,e,o),Wm(a,i,o)))}function km(e,i,a){var o=$n();lo(e,i,a,o)}function lo(e,i,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ll(e))Xm(i,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var x=i.lastRenderedState,A=h(x,a);if(u.hasEagerState=!0,u.eagerState=A,Yn(A,x))return hl(e,i,u,0),qe===null&&fl(),!1}catch{}if(a=Eu(e,i,u,o),a!==null)return Vn(a,e,o),Wm(a,i,o),!0}return!1}function of(e,i,a,o){if(o={lane:2,revertLane:Ff(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Ll(e)){if(i)throw Error(s(479))}else i=Eu(e,a,o,2),i!==null&&Vn(i,e,2)}function Ll(e){var i=e.alternate;return e===he||i!==null&&i===he}function Xm(e,i){Ks=bl=!0;var a=e.pending;a===null?i.next=i:(i.next=a.next,a.next=i),e.pending=i}function Wm(e,i,a){if((a&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,a|=o,i.lanes=a,Ti(e,a)}}var co={readContext:Tn,use:Cl,useCallback:tn,useContext:tn,useEffect:tn,useImperativeHandle:tn,useLayoutEffect:tn,useInsertionEffect:tn,useMemo:tn,useReducer:tn,useRef:tn,useState:tn,useDebugValue:tn,useDeferredValue:tn,useTransition:tn,useSyncExternalStore:tn,useId:tn,useHostTransitionStatus:tn,useFormState:tn,useActionState:tn,useOptimistic:tn,useMemoCache:tn,useCacheRefresh:tn};co.useEffectEvent=tn;var qm={readContext:Tn,use:Cl,useCallback:function(e,i){return Nn().memoizedState=[e,i===void 0?null:i],e},useContext:Tn,useEffect:wm,useImperativeHandle:function(e,i,a){a=a!=null?a.concat([e]):null,Dl(4194308,4,Nm.bind(null,i,e),a)},useLayoutEffect:function(e,i){return Dl(4194308,4,e,i)},useInsertionEffect:function(e,i){Dl(4,2,e,i)},useMemo:function(e,i){var a=Nn();i=i===void 0?null:i;var o=e();if(os){ee(!0);try{e()}finally{ee(!1)}}return a.memoizedState=[o,i],o},useReducer:function(e,i,a){var o=Nn();if(a!==void 0){var u=a(i);if(os){ee(!0);try{a(i)}finally{ee(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=ix.bind(null,he,e),[o.memoizedState,e]},useRef:function(e){var i=Nn();return e={current:e},i.memoizedState=e},useState:function(e){e=$u(e);var i=e.queue,a=km.bind(null,he,i);return i.dispatch=a,[e.memoizedState,a]},useDebugValue:nf,useDeferredValue:function(e,i){var a=Nn();return af(a,e,i)},useTransition:function(){var e=$u(!1);return e=Bm.bind(null,he,e.queue,!0,!1),Nn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,a){var o=he,u=Nn();if(Ae){if(a===void 0)throw Error(s(407));a=a()}else{if(a=i(),qe===null)throw Error(s(349));(Te&127)!==0||dm(o,i,a)}u.memoizedState=a;var h={value:a,getSnapshot:i};return u.queue=h,wm(mm.bind(null,o,h,e),[e]),o.flags|=2048,Js(9,{destroy:void 0},pm.bind(null,o,h,a,i),null),a},useId:function(){var e=Nn(),i=qe.identifierPrefix;if(Ae){var a=Ri,o=Ai;a=(o&~(1<<32-Xt(o)-1)).toString(32)+a,i="_"+i+"R_"+a,a=Al++,0<a&&(i+="H"+a.toString(32)),i+="_"}else a=Ky++,i="_"+i+"r_"+a.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:rf,useFormState:Tm,useActionState:Tm,useOptimistic:function(e){var i=Nn();i.memoizedState=i.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=a,i=of.bind(null,he,!0,a),a.dispatch=i,[e,i]},useMemoCache:Ku,useCacheRefresh:function(){return Nn().memoizedState=nx.bind(null,he)},useEffectEvent:function(e){var i=Nn(),a={impl:e};return i.memoizedState=a,function(){if((Le&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},lf={readContext:Tn,use:Cl,useCallback:Pm,useContext:Tn,useEffect:ef,useImperativeHandle:Om,useInsertionEffect:Um,useLayoutEffect:Lm,useMemo:zm,useReducer:wl,useRef:Cm,useState:function(){return wl(Wi)},useDebugValue:nf,useDeferredValue:function(e,i){var a=sn();return Im(a,Fe.memoizedState,e,i)},useTransition:function(){var e=wl(Wi)[0],i=sn().memoizedState;return[typeof e=="boolean"?e:oo(e),i]},useSyncExternalStore:hm,useId:Gm,useHostTransitionStatus:rf,useFormState:bm,useActionState:bm,useOptimistic:function(e,i){var a=sn();return vm(a,Fe,e,i)},useMemoCache:Ku,useCacheRefresh:Vm};lf.useEffectEvent=Dm;var Ym={readContext:Tn,use:Cl,useCallback:Pm,useContext:Tn,useEffect:ef,useImperativeHandle:Om,useInsertionEffect:Um,useLayoutEffect:Lm,useMemo:zm,useReducer:Ju,useRef:Cm,useState:function(){return Ju(Wi)},useDebugValue:nf,useDeferredValue:function(e,i){var a=sn();return Fe===null?af(a,e,i):Im(a,Fe.memoizedState,e,i)},useTransition:function(){var e=Ju(Wi)[0],i=sn().memoizedState;return[typeof e=="boolean"?e:oo(e),i]},useSyncExternalStore:hm,useId:Gm,useHostTransitionStatus:rf,useFormState:Rm,useActionState:Rm,useOptimistic:function(e,i){var a=sn();return Fe!==null?vm(a,Fe,e,i):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Ku,useCacheRefresh:Vm};Ym.useEffectEvent=Dm;function cf(e,i,a,o){i=e.memoizedState,a=a(o,i),a=a==null?i:_({},i,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var uf={enqueueSetState:function(e,i,a){e=e._reactInternals;var o=$n(),u=_a(o);u.payload=i,a!=null&&(u.callback=a),i=va(e,u,o),i!==null&&(Vn(i,e,o),io(i,e,o))},enqueueReplaceState:function(e,i,a){e=e._reactInternals;var o=$n(),u=_a(o);u.tag=1,u.payload=i,a!=null&&(u.callback=a),i=va(e,u,o),i!==null&&(Vn(i,e,o),io(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var a=$n(),o=_a(a);o.tag=2,i!=null&&(o.callback=i),i=va(e,o,a),i!==null&&(Vn(i,e,a),io(i,e,a))}};function Zm(e,i,a,o,u,h,x){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,x):i.prototype&&i.prototype.isPureReactComponent?!jr(a,o)||!jr(u,h):!0}function jm(e,i,a,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,o),i.state!==e&&uf.enqueueReplaceState(i,i.state,null)}function ls(e,i){var a=i;if("ref"in i){a={};for(var o in i)o!=="ref"&&(a[o]=i[o])}if(e=e.defaultProps){a===i&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function Km(e){ul(e)}function Qm(e){console.error(e)}function Jm(e){ul(e)}function Nl(e,i){try{var a=e.onUncaughtError;a(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function $m(e,i,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function ff(e,i,a){return a=_a(a),a.tag=3,a.payload={element:null},a.callback=function(){Nl(e,i)},a}function tg(e){return e=_a(e),e.tag=3,e}function eg(e,i,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){$m(i,a,o)}}var x=a.stateNode;x!==null&&typeof x.componentDidCatch=="function"&&(e.callback=function(){$m(i,a,o),typeof u!="function"&&(Ta===null?Ta=new Set([this]):Ta.add(this));var A=o.stack;this.componentDidCatch(o.value,{componentStack:A!==null?A:""})})}function ax(e,i,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=a.alternate,i!==null&&Xs(i,a,u,!0),a=jn.current,a!==null){switch(a.tag){case 31:case 13:return li===null?Wl():a.alternate===null&&en===0&&(en=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===xl?a.flags|=16384:(i=a.updateQueue,i===null?a.updateQueue=new Set([o]):i.add(o),zf(e,o,u)),!1;case 22:return a.flags|=65536,o===xl?a.flags|=16384:(i=a.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=i):(a=i.retryQueue,a===null?i.retryQueue=new Set([o]):a.add(o)),zf(e,o,u)),!1}throw Error(s(435,a.tag))}return zf(e,o,u),Wl(),!1}if(Ae)return i=jn.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==wu&&(e=Error(s(422),{cause:o}),Jr(ai(e,a)))):(o!==wu&&(i=Error(s(423),{cause:o}),Jr(ai(i,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=ai(o,a),u=ff(e.stateNode,o,u),Hu(e,u),en!==4&&(en=2)),!1;var h=Error(s(520),{cause:o});if(h=ai(h,a),vo===null?vo=[h]:vo.push(h),en!==4&&(en=2),i===null)return!0;o=ai(o,a),a=i;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=ff(a.stateNode,o,e),Hu(a,e),!1;case 1:if(i=a.type,h=a.stateNode,(a.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Ta===null||!Ta.has(h))))return a.flags|=65536,u&=-u,a.lanes|=u,u=tg(u),eg(u,e,a,o),Hu(a,u),!1}a=a.return}while(a!==null);return!1}var hf=Error(s(461)),cn=!1;function bn(e,i,a,o){i.child=e===null?sm(i,null,a,o):rs(i,e.child,a,o)}function ng(e,i,a,o,u){a=a.render;var h=i.ref;if("ref"in o){var x={};for(var A in o)A!=="ref"&&(x[A]=o[A])}else x=o;return ns(i),o=qu(e,i,a,x,h,u),A=Yu(),e!==null&&!cn?(Zu(e,i,u),qi(e,i,u)):(Ae&&A&&Ru(i),i.flags|=1,bn(e,i,o,u),i.child)}function ig(e,i,a,o,u){if(e===null){var h=a.type;return typeof h=="function"&&!Tu(h)&&h.defaultProps===void 0&&a.compare===null?(i.tag=15,i.type=h,ag(e,i,h,o,u)):(e=pl(a.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(h=e.child,!xf(e,u)){var x=h.memoizedProps;if(a=a.compare,a=a!==null?a:jr,a(x,o)&&e.ref===i.ref)return qi(e,i,u)}return i.flags|=1,e=Hi(h,o),e.ref=i.ref,e.return=i,i.child=e}function ag(e,i,a,o,u){if(e!==null){var h=e.memoizedProps;if(jr(h,o)&&e.ref===i.ref)if(cn=!1,i.pendingProps=o=h,xf(e,u))(e.flags&131072)!==0&&(cn=!0);else return i.lanes=e.lanes,qi(e,i,u)}return df(e,i,a,o,u)}function sg(e,i,a,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|a:a,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,i.child=null;return rg(e,i,h,a,o)}if((a&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&vl(i,h!==null?h.cachePool:null),h!==null?lm(i,h):Vu(),cm(i);else return o=i.lanes=536870912,rg(e,i,h!==null?h.baseLanes|a:a,a,o)}else h!==null?(vl(i,h.cachePool),lm(i,h),xa(),i.memoizedState=null):(e!==null&&vl(i,null),Vu(),xa());return bn(e,i,u,a),i.child}function uo(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function rg(e,i,a,o,u){var h=zu();return h=h===null?null:{parent:on._currentValue,pool:h},i.memoizedState={baseLanes:a,cachePool:h},e!==null&&vl(i,null),Vu(),cm(i),e!==null&&Xs(e,i,o,!0),i.childLanes=u,null}function Ol(e,i){return i=zl({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function og(e,i,a){return rs(i,e.child,null,a),e=Ol(i,i.pendingProps),e.flags|=2,Kn(i),i.memoizedState=null,e}function sx(e,i,a){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ae){if(o.mode==="hidden")return e=Ol(i,o),i.lanes=536870912,uo(null,e);if(Xu(i),(e=je)?(e=y_(e,oi),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:ha!==null?{id:Ai,overflow:Ri}:null,retryLane:536870912,hydrationErrors:null},a=Xp(e),a.return=i,i.child=a,En=i,je=null)):e=null,e===null)throw pa(i);return i.lanes=536870912,null}return Ol(i,o)}var h=e.memoizedState;if(h!==null){var x=h.dehydrated;if(Xu(i),u)if(i.flags&256)i.flags&=-257,i=og(e,i,a);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(s(558));else if(cn||Xs(e,i,a,!1),u=(a&e.childLanes)!==0,cn||u){if(o=qe,o!==null&&(x=ws(o,a),x!==0&&x!==h.retryLane))throw h.retryLane=x,Ja(e,x),Vn(o,e,x),hf;Wl(),i=og(e,i,a)}else e=h.treeContext,je=ci(x.nextSibling),En=i,Ae=!0,da=null,oi=!1,e!==null&&Yp(i,e),i=Ol(i,o),i.flags|=4096;return i}return e=Hi(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Pl(e,i){var a=i.ref;if(a===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(i.flags|=4194816)}}function df(e,i,a,o,u){return ns(i),a=qu(e,i,a,o,void 0,u),o=Yu(),e!==null&&!cn?(Zu(e,i,u),qi(e,i,u)):(Ae&&o&&Ru(i),i.flags|=1,bn(e,i,a,u),i.child)}function lg(e,i,a,o,u,h){return ns(i),i.updateQueue=null,a=fm(i,o,a,u),um(e),o=Yu(),e!==null&&!cn?(Zu(e,i,h),qi(e,i,h)):(Ae&&o&&Ru(i),i.flags|=1,bn(e,i,a,h),i.child)}function cg(e,i,a,o,u){if(ns(i),i.stateNode===null){var h=Hs,x=a.contextType;typeof x=="object"&&x!==null&&(h=Tn(x)),h=new a(o,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=uf,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=o,h.state=i.memoizedState,h.refs={},Bu(i),x=a.contextType,h.context=typeof x=="object"&&x!==null?Tn(x):Hs,h.state=i.memoizedState,x=a.getDerivedStateFromProps,typeof x=="function"&&(cf(i,a,x,o),h.state=i.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(x=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),x!==h.state&&uf.enqueueReplaceState(h,h.state,null),so(i,o,h,u),ao(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){h=i.stateNode;var A=i.memoizedProps,F=ls(a,A);h.props=F;var tt=h.context,dt=a.contextType;x=Hs,typeof dt=="object"&&dt!==null&&(x=Tn(dt));var _t=a.getDerivedStateFromProps;dt=typeof _t=="function"||typeof h.getSnapshotBeforeUpdate=="function",A=i.pendingProps!==A,dt||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(A||tt!==x)&&jm(i,h,o,x),ga=!1;var nt=i.memoizedState;h.state=nt,so(i,o,h,u),ao(),tt=i.memoizedState,A||nt!==tt||ga?(typeof _t=="function"&&(cf(i,a,_t,o),tt=i.memoizedState),(F=ga||Zm(i,a,F,o,nt,tt,x))?(dt||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=tt),h.props=o,h.state=tt,h.context=x,o=F):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{h=i.stateNode,Fu(e,i),x=i.memoizedProps,dt=ls(a,x),h.props=dt,_t=i.pendingProps,nt=h.context,tt=a.contextType,F=Hs,typeof tt=="object"&&tt!==null&&(F=Tn(tt)),A=a.getDerivedStateFromProps,(tt=typeof A=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(x!==_t||nt!==F)&&jm(i,h,o,F),ga=!1,nt=i.memoizedState,h.state=nt,so(i,o,h,u),ao();var ot=i.memoizedState;x!==_t||nt!==ot||ga||e!==null&&e.dependencies!==null&&gl(e.dependencies)?(typeof A=="function"&&(cf(i,a,A,o),ot=i.memoizedState),(dt=ga||Zm(i,a,dt,o,nt,ot,F)||e!==null&&e.dependencies!==null&&gl(e.dependencies))?(tt||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,ot,F),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,ot,F)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||x===e.memoizedProps&&nt===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||x===e.memoizedProps&&nt===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=ot),h.props=o,h.state=ot,h.context=F,o=dt):(typeof h.componentDidUpdate!="function"||x===e.memoizedProps&&nt===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||x===e.memoizedProps&&nt===e.memoizedState||(i.flags|=1024),o=!1)}return h=o,Pl(e,i),o=(i.flags&128)!==0,h||o?(h=i.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,e!==null&&o?(i.child=rs(i,e.child,null,u),i.child=rs(i,null,a,u)):bn(e,i,a,u),i.memoizedState=h.state,e=i.child):e=qi(e,i,u),e}function ug(e,i,a,o){return ts(),i.flags|=256,bn(e,i,a,o),i.child}var pf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function mf(e){return{baseLanes:e,cachePool:$p()}}function gf(e,i,a){return e=e!==null?e.childLanes&~a:0,i&&(e|=Jn),e}function fg(e,i,a){var o=i.pendingProps,u=!1,h=(i.flags&128)!==0,x;if((x=h)||(x=e!==null&&e.memoizedState===null?!1:(an.current&2)!==0),x&&(u=!0,i.flags&=-129),x=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ae){if(u?ya(i):xa(),(e=je)?(e=y_(e,oi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:ha!==null?{id:Ai,overflow:Ri}:null,retryLane:536870912,hydrationErrors:null},a=Xp(e),a.return=i,i.child=a,En=i,je=null)):e=null,e===null)throw pa(i);return Jf(e)?i.lanes=32:i.lanes=536870912,null}var A=o.children;return o=o.fallback,u?(xa(),u=i.mode,A=zl({mode:"hidden",children:A},u),o=$a(o,u,a,null),A.return=i,o.return=i,A.sibling=o,i.child=A,o=i.child,o.memoizedState=mf(a),o.childLanes=gf(e,x,a),i.memoizedState=pf,uo(null,o)):(ya(i),_f(i,A))}var F=e.memoizedState;if(F!==null&&(A=F.dehydrated,A!==null)){if(h)i.flags&256?(ya(i),i.flags&=-257,i=vf(e,i,a)):i.memoizedState!==null?(xa(),i.child=e.child,i.flags|=128,i=null):(xa(),A=o.fallback,u=i.mode,o=zl({mode:"visible",children:o.children},u),A=$a(A,u,a,null),A.flags|=2,o.return=i,A.return=i,o.sibling=A,i.child=o,rs(i,e.child,null,a),o=i.child,o.memoizedState=mf(a),o.childLanes=gf(e,x,a),i.memoizedState=pf,i=uo(null,o));else if(ya(i),Jf(A)){if(x=A.nextSibling&&A.nextSibling.dataset,x)var tt=x.dgst;x=tt,o=Error(s(419)),o.stack="",o.digest=x,Jr({value:o,source:null,stack:null}),i=vf(e,i,a)}else if(cn||Xs(e,i,a,!1),x=(a&e.childLanes)!==0,cn||x){if(x=qe,x!==null&&(o=ws(x,a),o!==0&&o!==F.retryLane))throw F.retryLane=o,Ja(e,o),Vn(x,e,o),hf;Qf(A)||Wl(),i=vf(e,i,a)}else Qf(A)?(i.flags|=192,i.child=e.child,i=null):(e=F.treeContext,je=ci(A.nextSibling),En=i,Ae=!0,da=null,oi=!1,e!==null&&Yp(i,e),i=_f(i,o.children),i.flags|=4096);return i}return u?(xa(),A=o.fallback,u=i.mode,F=e.child,tt=F.sibling,o=Hi(F,{mode:"hidden",children:o.children}),o.subtreeFlags=F.subtreeFlags&65011712,tt!==null?A=Hi(tt,A):(A=$a(A,u,a,null),A.flags|=2),A.return=i,o.return=i,o.sibling=A,i.child=o,uo(null,o),o=i.child,A=e.child.memoizedState,A===null?A=mf(a):(u=A.cachePool,u!==null?(F=on._currentValue,u=u.parent!==F?{parent:F,pool:F}:u):u=$p(),A={baseLanes:A.baseLanes|a,cachePool:u}),o.memoizedState=A,o.childLanes=gf(e,x,a),i.memoizedState=pf,uo(e.child,o)):(ya(i),a=e.child,e=a.sibling,a=Hi(a,{mode:"visible",children:o.children}),a.return=i,a.sibling=null,e!==null&&(x=i.deletions,x===null?(i.deletions=[e],i.flags|=16):x.push(e)),i.child=a,i.memoizedState=null,a)}function _f(e,i){return i=zl({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function zl(e,i){return e=Zn(22,e,null,i),e.lanes=0,e}function vf(e,i,a){return rs(i,e.child,null,a),e=_f(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function hg(e,i,a){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),Lu(e.return,i,a)}function yf(e,i,a,o,u,h){var x=e.memoizedState;x===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:h}:(x.isBackwards=i,x.rendering=null,x.renderingStartTime=0,x.last=o,x.tail=a,x.tailMode=u,x.treeForkCount=h)}function dg(e,i,a){var o=i.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var x=an.current,A=(x&2)!==0;if(A?(x=x&1|2,i.flags|=128):x&=1,Mt(an,x),bn(e,i,o,a),o=Ae?Qr:0,!A&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&hg(e,a,i);else if(e.tag===19)hg(e,a,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=i.child,u=null;a!==null;)e=a.alternate,e!==null&&Tl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=i.child,i.child=null):(u=a.sibling,a.sibling=null),yf(i,!1,u,a,h,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&Tl(e)===null){i.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}yf(i,!0,a,null,h,o);break;case"together":yf(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function qi(e,i,a){if(e!==null&&(i.dependencies=e.dependencies),Ea|=i.lanes,(a&i.childLanes)===0)if(e!==null){if(Xs(e,i,a,!1),(a&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(s(153));if(i.child!==null){for(e=i.child,a=Hi(e,e.pendingProps),i.child=a,a.return=i;e.sibling!==null;)e=e.sibling,a=a.sibling=Hi(e,e.pendingProps),a.return=i;a.sibling=null}return i.child}function xf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&gl(e)))}function rx(e,i,a){switch(i.tag){case 3:It(i,i.stateNode.containerInfo),ma(i,on,e.memoizedState.cache),ts();break;case 27:case 5:qt(i);break;case 4:It(i,i.stateNode.containerInfo);break;case 10:ma(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,Xu(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(ya(i),i.flags|=128,null):(a&i.child.childLanes)!==0?fg(e,i,a):(ya(i),e=qi(e,i,a),e!==null?e.sibling:null);ya(i);break;case 19:var u=(e.flags&128)!==0;if(o=(a&i.childLanes)!==0,o||(Xs(e,i,a,!1),o=(a&i.childLanes)!==0),u){if(o)return dg(e,i,a);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Mt(an,an.current),o)break;return null;case 22:return i.lanes=0,sg(e,i,a,i.pendingProps);case 24:ma(i,on,e.memoizedState.cache)}return qi(e,i,a)}function pg(e,i,a){if(e!==null)if(e.memoizedProps!==i.pendingProps)cn=!0;else{if(!xf(e,a)&&(i.flags&128)===0)return cn=!1,rx(e,i,a);cn=(e.flags&131072)!==0}else cn=!1,Ae&&(i.flags&1048576)!==0&&qp(i,Qr,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=as(i.elementType),i.type=e,typeof e=="function")Tu(e)?(o=ls(e,o),i.tag=1,i=cg(null,i,e,o,a)):(i.tag=0,i=df(null,i,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===R){i.tag=11,i=ng(null,i,e,o,a);break t}else if(u===I){i.tag=14,i=ig(null,i,e,o,a);break t}}throw i=lt(e)||e,Error(s(306,i,""))}}return i;case 0:return df(e,i,i.type,i.pendingProps,a);case 1:return o=i.type,u=ls(o,i.pendingProps),cg(e,i,o,u,a);case 3:t:{if(It(i,i.stateNode.containerInfo),e===null)throw Error(s(387));o=i.pendingProps;var h=i.memoizedState;u=h.element,Fu(e,i),so(i,o,null,a);var x=i.memoizedState;if(o=x.cache,ma(i,on,o),o!==h.cache&&Nu(i,[on],a,!0),ao(),o=x.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:x.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=ug(e,i,o,a);break t}else if(o!==u){u=ai(Error(s(424)),i),Jr(u),i=ug(e,i,o,a);break t}else for(e=i.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,je=ci(e.firstChild),En=i,Ae=!0,da=null,oi=!0,a=sm(i,null,o,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(ts(),o===u){i=qi(e,i,a);break t}bn(e,i,o,a)}i=i.child}return i;case 26:return Pl(e,i),e===null?(a=b_(i.type,null,i.pendingProps,null))?i.memoizedState=a:Ae||(a=i.type,e=i.pendingProps,o=Jl(it.current).createElement(a),o[rn]=i,o[Sn]=e,An(o,a,e),xt(o),i.stateNode=o):i.memoizedState=b_(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return qt(i),e===null&&Ae&&(o=i.stateNode=M_(i.type,i.pendingProps,it.current),En=i,oi=!0,u=je,Ca(i.type)?($f=u,je=ci(o.firstChild)):je=u),bn(e,i,i.pendingProps.children,a),Pl(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ae&&((u=o=je)&&(o=zx(o,i.type,i.pendingProps,oi),o!==null?(i.stateNode=o,En=i,je=ci(o.firstChild),oi=!1,u=!0):u=!1),u||pa(i)),qt(i),u=i.type,h=i.pendingProps,x=e!==null?e.memoizedProps:null,o=h.children,Zf(u,h)?o=null:x!==null&&Zf(u,x)&&(i.flags|=32),i.memoizedState!==null&&(u=qu(e,i,Qy,null,null,a),Ao._currentValue=u),Pl(e,i),bn(e,i,o,a),i.child;case 6:return e===null&&Ae&&((e=a=je)&&(a=Ix(a,i.pendingProps,oi),a!==null?(i.stateNode=a,En=i,je=null,e=!0):e=!1),e||pa(i)),null;case 13:return fg(e,i,a);case 4:return It(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=rs(i,null,o,a):bn(e,i,o,a),i.child;case 11:return ng(e,i,i.type,i.pendingProps,a);case 7:return bn(e,i,i.pendingProps,a),i.child;case 8:return bn(e,i,i.pendingProps.children,a),i.child;case 12:return bn(e,i,i.pendingProps.children,a),i.child;case 10:return o=i.pendingProps,ma(i,i.type,o.value),bn(e,i,o.children,a),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,ns(i),u=Tn(u),o=o(u),i.flags|=1,bn(e,i,o,a),i.child;case 14:return ig(e,i,i.type,i.pendingProps,a);case 15:return ag(e,i,i.type,i.pendingProps,a);case 19:return dg(e,i,a);case 31:return sx(e,i,a);case 22:return sg(e,i,a,i.pendingProps);case 24:return ns(i),o=Tn(on),e===null?(u=zu(),u===null&&(u=qe,h=Ou(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=a),u=h),i.memoizedState={parent:o,cache:u},Bu(i),ma(i,on,u)):((e.lanes&a)!==0&&(Fu(e,i),so(i,null,null,a),ao()),u=e.memoizedState,h=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),ma(i,on,o)):(o=h.cache,ma(i,on,o),o!==u.cache&&Nu(i,[on],a,!0))),bn(e,i,i.pendingProps.children,a),i.child;case 29:throw i.pendingProps}throw Error(s(156,i.tag))}function Yi(e){e.flags|=4}function Sf(e,i,a,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Gg())e.flags|=8192;else throw ss=xl,Iu}else e.flags&=-16777217}function mg(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!D_(i))if(Gg())e.flags|=8192;else throw ss=xl,Iu}function Il(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?ze():536870912,e.lanes|=i,nr|=i)}function fo(e,i){if(!Ae)switch(e.tailMode){case"hidden":i=e.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ke(e){var i=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(i)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,i}function ox(e,i,a){var o=i.pendingProps;switch(Cu(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(i),null;case 1:return Ke(i),null;case 3:return a=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),ki(on),Bt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ks(i)?Yi(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Du())),Ke(i),null;case 26:var u=i.type,h=i.memoizedState;return e===null?(Yi(i),h!==null?(Ke(i),mg(i,h)):(Ke(i),Sf(i,u,null,o,a))):h?h!==e.memoizedState?(Yi(i),Ke(i),mg(i,h)):(Ke(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&Yi(i),Ke(i),Sf(i,u,e,o,a)),null;case 27:if(de(i),a=it.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&Yi(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return Ke(i),null}e=Dt.current,ks(i)?Zp(i):(e=M_(u,o,a),i.stateNode=e,Yi(i))}return Ke(i),null;case 5:if(de(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&Yi(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return Ke(i),null}if(h=Dt.current,ks(i))Zp(i);else{var x=Jl(it.current);switch(h){case 1:h=x.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=x.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=x.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=x.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?x.createElement("select",{is:o.is}):x.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?x.createElement(u,{is:o.is}):x.createElement(u)}}h[rn]=i,h[Sn]=o;t:for(x=i.child;x!==null;){if(x.tag===5||x.tag===6)h.appendChild(x.stateNode);else if(x.tag!==4&&x.tag!==27&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===i)break t;for(;x.sibling===null;){if(x.return===null||x.return===i)break t;x=x.return}x.sibling.return=x.return,x=x.sibling}i.stateNode=h;t:switch(An(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&Yi(i)}}return Ke(i),Sf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,a),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&Yi(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(s(166));if(e=it.current,ks(i)){if(e=i.stateNode,a=i.memoizedProps,o=null,u=En,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[rn]=i,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||f_(e.nodeValue,a)),e||pa(i,!0)}else e=Jl(e).createTextNode(o),e[rn]=i,i.stateNode=e}return Ke(i),null;case 31:if(a=i.memoizedState,e===null||e.memoizedState!==null){if(o=ks(i),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[rn]=i}else ts(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ke(i),e=!1}else a=Du(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return i.flags&256?(Kn(i),i):(Kn(i),null);if((i.flags&128)!==0)throw Error(s(558))}return Ke(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ks(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[rn]=i}else ts(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ke(i),u=!1}else u=Du(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(Kn(i),i):(Kn(i),null)}return Kn(i),(i.flags&128)!==0?(i.lanes=a,i):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),a!==e&&a&&(i.child.flags|=8192),Il(i,i.updateQueue),Ke(i),null);case 4:return Bt(),e===null&&kf(i.stateNode.containerInfo),Ke(i),null;case 10:return ki(i.type),Ke(i),null;case 19:if(et(an),o=i.memoizedState,o===null)return Ke(i),null;if(u=(i.flags&128)!==0,h=o.rendering,h===null)if(u)fo(o,!1);else{if(en!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(h=Tl(e),h!==null){for(i.flags|=128,fo(o,!1),e=h.updateQueue,i.updateQueue=e,Il(i,e),i.subtreeFlags=0,e=a,a=i.child;a!==null;)kp(a,e),a=a.sibling;return Mt(an,an.current&1|2),Ae&&Gi(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&T()>Vl&&(i.flags|=128,u=!0,fo(o,!1),i.lanes=4194304)}else{if(!u)if(e=Tl(h),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,Il(i,e),fo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Ae)return Ke(i),null}else 2*T()-o.renderingStartTime>Vl&&a!==536870912&&(i.flags|=128,u=!0,fo(o,!1),i.lanes=4194304);o.isBackwards?(h.sibling=i.child,i.child=h):(e=o.last,e!==null?e.sibling=h:i.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=T(),e.sibling=null,a=an.current,Mt(an,u?a&1|2:a&1),Ae&&Gi(i,o.treeForkCount),e):(Ke(i),null);case 22:case 23:return Kn(i),ku(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(a&536870912)!==0&&(i.flags&128)===0&&(Ke(i),i.subtreeFlags&6&&(i.flags|=8192)):Ke(i),a=i.updateQueue,a!==null&&Il(i,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==a&&(i.flags|=2048),e!==null&&et(is),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),i.memoizedState.cache!==a&&(i.flags|=2048),ki(on),Ke(i),null;case 25:return null;case 30:return null}throw Error(s(156,i.tag))}function lx(e,i){switch(Cu(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return ki(on),Bt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return de(i),null;case 31:if(i.memoizedState!==null){if(Kn(i),i.alternate===null)throw Error(s(340));ts()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(Kn(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(s(340));ts()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return et(an),null;case 4:return Bt(),null;case 10:return ki(i.type),null;case 22:case 23:return Kn(i),ku(),e!==null&&et(is),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return ki(on),null;case 25:return null;default:return null}}function gg(e,i){switch(Cu(i),i.tag){case 3:ki(on),Bt();break;case 26:case 27:case 5:de(i);break;case 4:Bt();break;case 31:i.memoizedState!==null&&Kn(i);break;case 13:Kn(i);break;case 19:et(an);break;case 10:ki(i.type);break;case 22:case 23:Kn(i),ku(),e!==null&&et(is);break;case 24:ki(on)}}function ho(e,i){try{var a=i.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var h=a.create,x=a.inst;o=h(),x.destroy=o}a=a.next}while(a!==u)}}catch(A){Be(i,i.return,A)}}function Sa(e,i,a){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var x=o.inst,A=x.destroy;if(A!==void 0){x.destroy=void 0,u=i;var F=a,tt=A;try{tt()}catch(dt){Be(u,F,dt)}}}o=o.next}while(o!==h)}}catch(dt){Be(i,i.return,dt)}}function _g(e){var i=e.updateQueue;if(i!==null){var a=e.stateNode;try{om(i,a)}catch(o){Be(e,e.return,o)}}}function vg(e,i,a){a.props=ls(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Be(e,i,o)}}function po(e,i){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Be(e,i,u)}}function Ci(e,i){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Be(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Be(e,i,u)}else a.current=null}function yg(e){var i=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Be(e,e.return,u)}}function Mf(e,i,a){try{var o=e.stateNode;Dx(o,e.type,a,i),o[Sn]=i}catch(u){Be(e,e.return,u)}}function xg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ca(e.type)||e.tag===4}function Ef(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||xg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ca(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Tf(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,i):(i=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,i.appendChild(e),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Bi));else if(o!==4&&(o===27&&Ca(e.type)&&(a=e.stateNode,i=null),e=e.child,e!==null))for(Tf(e,i,a),e=e.sibling;e!==null;)Tf(e,i,a),e=e.sibling}function Bl(e,i,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?a.insertBefore(e,i):a.appendChild(e);else if(o!==4&&(o===27&&Ca(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Bl(e,i,a),e=e.sibling;e!==null;)Bl(e,i,a),e=e.sibling}function Sg(e){var i=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);An(i,o,a),i[rn]=e,i[Sn]=a}catch(h){Be(e,e.return,h)}}var Zi=!1,un=!1,bf=!1,Mg=typeof WeakSet=="function"?WeakSet:Set,yn=null;function cx(e,i){if(e=e.containerInfo,qf=sc,e=Op(e),_u(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{a.nodeType,h.nodeType}catch{a=null;break t}var x=0,A=-1,F=-1,tt=0,dt=0,_t=e,nt=null;e:for(;;){for(var ot;_t!==a||u!==0&&_t.nodeType!==3||(A=x+u),_t!==h||o!==0&&_t.nodeType!==3||(F=x+o),_t.nodeType===3&&(x+=_t.nodeValue.length),(ot=_t.firstChild)!==null;)nt=_t,_t=ot;for(;;){if(_t===e)break e;if(nt===a&&++tt===u&&(A=x),nt===h&&++dt===o&&(F=x),(ot=_t.nextSibling)!==null)break;_t=nt,nt=_t.parentNode}_t=ot}a=A===-1||F===-1?null:{start:A,end:F}}else a=null}a=a||{start:0,end:0}}else a=null;for(Yf={focusedElem:e,selectionRange:a},sc=!1,yn=i;yn!==null;)if(i=yn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,yn=e;else for(;yn!==null;){switch(i=yn,h=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,a=i,u=h.memoizedProps,h=h.memoizedState,o=a.stateNode;try{var Zt=ls(a.type,u);e=o.getSnapshotBeforeUpdate(Zt,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(se){Be(a,a.return,se)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,a=e.nodeType,a===9)Kf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Kf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=i.sibling,e!==null){e.return=i.return,yn=e;break}yn=i.return}}function Eg(e,i,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:Ki(e,a),o&4&&ho(5,a);break;case 1:if(Ki(e,a),o&4)if(e=a.stateNode,i===null)try{e.componentDidMount()}catch(x){Be(a,a.return,x)}else{var u=ls(a.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(x){Be(a,a.return,x)}}o&64&&_g(a),o&512&&po(a,a.return);break;case 3:if(Ki(e,a),o&64&&(e=a.updateQueue,e!==null)){if(i=null,a.child!==null)switch(a.child.tag){case 27:case 5:i=a.child.stateNode;break;case 1:i=a.child.stateNode}try{om(e,i)}catch(x){Be(a,a.return,x)}}break;case 27:i===null&&o&4&&Sg(a);case 26:case 5:Ki(e,a),i===null&&o&4&&yg(a),o&512&&po(a,a.return);break;case 12:Ki(e,a);break;case 31:Ki(e,a),o&4&&Ag(e,a);break;case 13:Ki(e,a),o&4&&Rg(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=vx.bind(null,a),Bx(e,a))));break;case 22:if(o=a.memoizedState!==null||Zi,!o){i=i!==null&&i.memoizedState!==null||un,u=Zi;var h=un;Zi=o,(un=i)&&!h?Qi(e,a,(a.subtreeFlags&8772)!==0):Ki(e,a),Zi=u,un=h}break;case 30:break;default:Ki(e,a)}}function Tg(e){var i=e.alternate;i!==null&&(e.alternate=null,Tg(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&C(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Qe=null,Bn=!1;function ji(e,i,a){for(a=a.child;a!==null;)bg(e,i,a),a=a.sibling}function bg(e,i,a){if(Nt&&typeof Nt.onCommitFiberUnmount=="function")try{Nt.onCommitFiberUnmount(Rt,a)}catch{}switch(a.tag){case 26:un||Ci(a,i),ji(e,i,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:un||Ci(a,i);var o=Qe,u=Bn;Ca(a.type)&&(Qe=a.stateNode,Bn=!1),ji(e,i,a),Eo(a.stateNode),Qe=o,Bn=u;break;case 5:un||Ci(a,i);case 6:if(o=Qe,u=Bn,Qe=null,ji(e,i,a),Qe=o,Bn=u,Qe!==null)if(Bn)try{(Qe.nodeType===9?Qe.body:Qe.nodeName==="HTML"?Qe.ownerDocument.body:Qe).removeChild(a.stateNode)}catch(h){Be(a,i,h)}else try{Qe.removeChild(a.stateNode)}catch(h){Be(a,i,h)}break;case 18:Qe!==null&&(Bn?(e=Qe,__(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),ur(e)):__(Qe,a.stateNode));break;case 4:o=Qe,u=Bn,Qe=a.stateNode.containerInfo,Bn=!0,ji(e,i,a),Qe=o,Bn=u;break;case 0:case 11:case 14:case 15:Sa(2,a,i),un||Sa(4,a,i),ji(e,i,a);break;case 1:un||(Ci(a,i),o=a.stateNode,typeof o.componentWillUnmount=="function"&&vg(a,i,o)),ji(e,i,a);break;case 21:ji(e,i,a);break;case 22:un=(o=un)||a.memoizedState!==null,ji(e,i,a),un=o;break;default:ji(e,i,a)}}function Ag(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ur(e)}catch(a){Be(i,i.return,a)}}}function Rg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ur(e)}catch(a){Be(i,i.return,a)}}function ux(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new Mg),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new Mg),i;default:throw Error(s(435,e.tag))}}function Fl(e,i){var a=ux(e);i.forEach(function(o){if(!a.has(o)){a.add(o);var u=yx.bind(null,e,o);o.then(u,u)}})}function Fn(e,i){var a=i.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],h=e,x=i,A=x;t:for(;A!==null;){switch(A.tag){case 27:if(Ca(A.type)){Qe=A.stateNode,Bn=!1;break t}break;case 5:Qe=A.stateNode,Bn=!1;break t;case 3:case 4:Qe=A.stateNode.containerInfo,Bn=!0;break t}A=A.return}if(Qe===null)throw Error(s(160));bg(h,x,u),Qe=null,Bn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)Cg(i,e),i=i.sibling}var mi=null;function Cg(e,i){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Fn(i,e),Hn(e),o&4&&(Sa(3,e,e.return),ho(3,e),Sa(5,e,e.return));break;case 1:Fn(i,e),Hn(e),o&512&&(un||a===null||Ci(a,a.return)),o&64&&Zi&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=mi;if(Fn(i,e),Hn(e),o&512&&(un||a===null||Ci(a,a.return)),o&4){var h=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[Ya]||h[rn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),An(h,o,a),h[rn]=e,xt(h),o=h;break t;case"link":var x=C_("link","href",u).get(o+(a.href||""));if(x){for(var A=0;A<x.length;A++)if(h=x[A],h.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&h.getAttribute("rel")===(a.rel==null?null:a.rel)&&h.getAttribute("title")===(a.title==null?null:a.title)&&h.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){x.splice(A,1);break e}}h=u.createElement(o),An(h,o,a),u.head.appendChild(h);break;case"meta":if(x=C_("meta","content",u).get(o+(a.content||""))){for(A=0;A<x.length;A++)if(h=x[A],h.getAttribute("content")===(a.content==null?null:""+a.content)&&h.getAttribute("name")===(a.name==null?null:a.name)&&h.getAttribute("property")===(a.property==null?null:a.property)&&h.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&h.getAttribute("charset")===(a.charSet==null?null:a.charSet)){x.splice(A,1);break e}}h=u.createElement(o),An(h,o,a),u.head.appendChild(h);break;default:throw Error(s(468,o))}h[rn]=e,xt(h),o=h}e.stateNode=o}else w_(u,e.type,e.stateNode);else e.stateNode=R_(u,o,e.memoizedProps);else h!==o?(h===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):h.count--,o===null?w_(u,e.type,e.stateNode):R_(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Mf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Fn(i,e),Hn(e),o&512&&(un||a===null||Ci(a,a.return)),a!==null&&o&4&&Mf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Fn(i,e),Hn(e),o&512&&(un||a===null||Ci(a,a.return)),e.flags&32){u=e.stateNode;try{Ns(u,"")}catch(Zt){Be(e,e.return,Zt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Mf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(bf=!0);break;case 6:if(Fn(i,e),Hn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Zt){Be(e,e.return,Zt)}}break;case 3:if(ec=null,u=mi,mi=$l(i.containerInfo),Fn(i,e),mi=u,Hn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{ur(i.containerInfo)}catch(Zt){Be(e,e.return,Zt)}bf&&(bf=!1,wg(e));break;case 4:o=mi,mi=$l(e.stateNode.containerInfo),Fn(i,e),Hn(e),mi=o;break;case 12:Fn(i,e),Hn(e);break;case 31:Fn(i,e),Hn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Fl(e,o)));break;case 13:Fn(i,e),Hn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Gl=T()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Fl(e,o)));break;case 22:u=e.memoizedState!==null;var F=a!==null&&a.memoizedState!==null,tt=Zi,dt=un;if(Zi=tt||u,un=dt||F,Fn(i,e),un=dt,Zi=tt,Hn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(a===null||F||Zi||un||cs(e)),a=null,i=e;;){if(i.tag===5||i.tag===26){if(a===null){F=a=i;try{if(h=F.stateNode,u)x=h.style,typeof x.setProperty=="function"?x.setProperty("display","none","important"):x.display="none";else{A=F.stateNode;var _t=F.memoizedProps.style,nt=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;A.style.display=nt==null||typeof nt=="boolean"?"":(""+nt).trim()}}catch(Zt){Be(F,F.return,Zt)}}}else if(i.tag===6){if(a===null){F=i;try{F.stateNode.nodeValue=u?"":F.memoizedProps}catch(Zt){Be(F,F.return,Zt)}}}else if(i.tag===18){if(a===null){F=i;try{var ot=F.stateNode;u?v_(ot,!0):v_(F.stateNode,!1)}catch(Zt){Be(F,F.return,Zt)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;a===i&&(a=null),i=i.return}a===i&&(a=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Fl(e,a))));break;case 19:Fn(i,e),Hn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Fl(e,o)));break;case 30:break;case 21:break;default:Fn(i,e),Hn(e)}}function Hn(e){var i=e.flags;if(i&2){try{for(var a,o=e.return;o!==null;){if(xg(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,h=Ef(e);Bl(e,h,u);break;case 5:var x=a.stateNode;a.flags&32&&(Ns(x,""),a.flags&=-33);var A=Ef(e);Bl(e,A,x);break;case 3:case 4:var F=a.stateNode.containerInfo,tt=Ef(e);Tf(e,tt,F);break;default:throw Error(s(161))}}catch(dt){Be(e,e.return,dt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function wg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;wg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function Ki(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)Eg(e,i.alternate,i),i=i.sibling}function cs(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:Sa(4,i,i.return),cs(i);break;case 1:Ci(i,i.return);var a=i.stateNode;typeof a.componentWillUnmount=="function"&&vg(i,i.return,a),cs(i);break;case 27:Eo(i.stateNode);case 26:case 5:Ci(i,i.return),cs(i);break;case 22:i.memoizedState===null&&cs(i);break;case 30:cs(i);break;default:cs(i)}e=e.sibling}}function Qi(e,i,a){for(a=a&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,h=i,x=h.flags;switch(h.tag){case 0:case 11:case 15:Qi(u,h,a),ho(4,h);break;case 1:if(Qi(u,h,a),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(tt){Be(o,o.return,tt)}if(o=h,u=o.updateQueue,u!==null){var A=o.stateNode;try{var F=u.shared.hiddenCallbacks;if(F!==null)for(u.shared.hiddenCallbacks=null,u=0;u<F.length;u++)rm(F[u],A)}catch(tt){Be(o,o.return,tt)}}a&&x&64&&_g(h),po(h,h.return);break;case 27:Sg(h);case 26:case 5:Qi(u,h,a),a&&o===null&&x&4&&yg(h),po(h,h.return);break;case 12:Qi(u,h,a);break;case 31:Qi(u,h,a),a&&x&4&&Ag(u,h);break;case 13:Qi(u,h,a),a&&x&4&&Rg(u,h);break;case 22:h.memoizedState===null&&Qi(u,h,a),po(h,h.return);break;case 30:break;default:Qi(u,h,a)}i=i.sibling}}function Af(e,i){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&$r(a))}function Rf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&$r(e))}function gi(e,i,a,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)Dg(e,i,a,o),i=i.sibling}function Dg(e,i,a,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:gi(e,i,a,o),u&2048&&ho(9,i);break;case 1:gi(e,i,a,o);break;case 3:gi(e,i,a,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&$r(e)));break;case 12:if(u&2048){gi(e,i,a,o),e=i.stateNode;try{var h=i.memoizedProps,x=h.id,A=h.onPostCommit;typeof A=="function"&&A(x,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(F){Be(i,i.return,F)}}else gi(e,i,a,o);break;case 31:gi(e,i,a,o);break;case 13:gi(e,i,a,o);break;case 23:break;case 22:h=i.stateNode,x=i.alternate,i.memoizedState!==null?h._visibility&2?gi(e,i,a,o):mo(e,i):h._visibility&2?gi(e,i,a,o):(h._visibility|=2,$s(e,i,a,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&Af(x,i);break;case 24:gi(e,i,a,o),u&2048&&Rf(i.alternate,i);break;default:gi(e,i,a,o)}}function $s(e,i,a,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=e,x=i,A=a,F=o,tt=x.flags;switch(x.tag){case 0:case 11:case 15:$s(h,x,A,F,u),ho(8,x);break;case 23:break;case 22:var dt=x.stateNode;x.memoizedState!==null?dt._visibility&2?$s(h,x,A,F,u):mo(h,x):(dt._visibility|=2,$s(h,x,A,F,u)),u&&tt&2048&&Af(x.alternate,x);break;case 24:$s(h,x,A,F,u),u&&tt&2048&&Rf(x.alternate,x);break;default:$s(h,x,A,F,u)}i=i.sibling}}function mo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var a=e,o=i,u=o.flags;switch(o.tag){case 22:mo(a,o),u&2048&&Af(o.alternate,o);break;case 24:mo(a,o),u&2048&&Rf(o.alternate,o);break;default:mo(a,o)}i=i.sibling}}var go=8192;function tr(e,i,a){if(e.subtreeFlags&go)for(e=e.child;e!==null;)Ug(e,i,a),e=e.sibling}function Ug(e,i,a){switch(e.tag){case 26:tr(e,i,a),e.flags&go&&e.memoizedState!==null&&Kx(a,mi,e.memoizedState,e.memoizedProps);break;case 5:tr(e,i,a);break;case 3:case 4:var o=mi;mi=$l(e.stateNode.containerInfo),tr(e,i,a),mi=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=go,go=16777216,tr(e,i,a),go=o):tr(e,i,a));break;default:tr(e,i,a)}}function Lg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function _o(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];yn=o,Og(o,e)}Lg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ng(e),e=e.sibling}function Ng(e){switch(e.tag){case 0:case 11:case 15:_o(e),e.flags&2048&&Sa(9,e,e.return);break;case 3:_o(e);break;case 12:_o(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,Hl(e)):_o(e);break;default:_o(e)}}function Hl(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var a=0;a<i.length;a++){var o=i[a];yn=o,Og(o,e)}Lg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:Sa(8,i,i.return),Hl(i);break;case 22:a=i.stateNode,a._visibility&2&&(a._visibility&=-3,Hl(i));break;default:Hl(i)}e=e.sibling}}function Og(e,i){for(;yn!==null;){var a=yn;switch(a.tag){case 0:case 11:case 15:Sa(8,a,i);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:$r(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,yn=o;else t:for(a=e;yn!==null;){o=yn;var u=o.sibling,h=o.return;if(Tg(o),o===a){yn=null;break t}if(u!==null){u.return=h,yn=u;break t}yn=h}}}var fx={getCacheForType:function(e){var i=Tn(on),a=i.data.get(e);return a===void 0&&(a=e(),i.data.set(e,a)),a},cacheSignal:function(){return Tn(on).controller.signal}},hx=typeof WeakMap=="function"?WeakMap:Map,Le=0,qe=null,xe=null,Te=0,Ie=0,Qn=null,Ma=!1,er=!1,Cf=!1,Ji=0,en=0,Ea=0,us=0,wf=0,Jn=0,nr=0,vo=null,Gn=null,Df=!1,Gl=0,Pg=0,Vl=1/0,kl=null,Ta=null,dn=0,ba=null,ir=null,$i=0,Uf=0,Lf=null,zg=null,yo=0,Nf=null;function $n(){return(Le&2)!==0&&Te!==0?Te&-Te:O.T!==null?Ff():qa()}function Ig(){if(Jn===0)if((Te&536870912)===0||Ae){var e=Pt;Pt<<=1,(Pt&3932160)===0&&(Pt=262144),Jn=e}else Jn=536870912;return e=jn.current,e!==null&&(e.flags|=32),Jn}function Vn(e,i,a){(e===qe&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)&&(ar(e,0),Aa(e,Te,Jn,!1)),Un(e,a),((Le&2)===0||e!==qe)&&(e===qe&&((Le&2)===0&&(us|=a),en===4&&Aa(e,Te,Jn,!1)),wi(e))}function Bg(e,i,a){if((Le&6)!==0)throw Error(s(327));var o=!a&&(i&127)===0&&(i&e.expiredLanes)===0||Yt(e,i),u=o?mx(e,i):Pf(e,i,!0),h=o;do{if(u===0){er&&!o&&Aa(e,i,0,!1);break}else{if(a=e.current.alternate,h&&!dx(a)){u=Pf(e,i,!1),h=!1;continue}if(u===2){if(h=i,e.errorRecoveryDisabledLanes&h)var x=0;else x=e.pendingLanes&-536870913,x=x!==0?x:x&536870912?536870912:0;if(x!==0){i=x;t:{var A=e;u=vo;var F=A.current.memoizedState.isDehydrated;if(F&&(ar(A,x).flags|=256),x=Pf(A,x,!1),x!==2){if(Cf&&!F){A.errorRecoveryDisabledLanes|=h,us|=h,u=4;break t}h=Gn,Gn=u,h!==null&&(Gn===null?Gn=h:Gn.push.apply(Gn,h))}u=x}if(h=!1,u!==2)continue}}if(u===1){ar(e,0),Aa(e,i,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(s(345));case 4:if((i&4194048)!==i)break;case 6:Aa(o,i,Jn,!Ma);break t;case 2:Gn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((i&62914560)===i&&(u=Gl+300-T(),10<u)){if(Aa(o,i,Jn,!Ma),vt(o,0,!0)!==0)break t;$i=i,o.timeoutHandle=m_(Fg.bind(null,o,a,Gn,kl,Df,i,Jn,us,nr,Ma,h,"Throttled",-0,0),u);break t}Fg(o,a,Gn,kl,Df,i,Jn,us,nr,Ma,h,null,-0,0)}}break}while(!0);wi(e)}function Fg(e,i,a,o,u,h,x,A,F,tt,dt,_t,nt,ot){if(e.timeoutHandle=-1,_t=i.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Bi},Ug(i,h,_t);var Zt=(h&62914560)===h?Gl-T():(h&4194048)===h?Pg-T():0;if(Zt=Qx(_t,Zt),Zt!==null){$i=h,e.cancelPendingCommit=Zt(Yg.bind(null,e,i,h,a,o,u,x,A,F,dt,_t,null,nt,ot)),Aa(e,h,x,!tt);return}}Yg(e,i,h,a,o,u,x,A,F)}function dx(e){for(var i=e;;){var a=i.tag;if((a===0||a===11||a===15)&&i.flags&16384&&(a=i.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],h=u.getSnapshot;u=u.value;try{if(!Yn(h(),u))return!1}catch{return!1}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Aa(e,i,a,o){i&=~wf,i&=~us,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var h=31-Xt(u),x=1<<h;o[h]=-1,u&=~x}a!==0&&Fr(e,a,i)}function Xl(){return(Le&6)===0?(xo(0),!1):!0}function Of(){if(xe!==null){if(Ie===0)var e=xe.return;else e=xe,Vi=es=null,ju(e),Zs=null,eo=0,e=xe;for(;e!==null;)gg(e.alternate,e),e=e.return;xe=null}}function ar(e,i){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Nx(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),$i=0,Of(),qe=e,xe=a=Hi(e.current,null),Te=i,Ie=0,Qn=null,Ma=!1,er=Yt(e,i),Cf=!1,nr=Jn=wf=us=Ea=en=0,Gn=vo=null,Df=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-Xt(o),h=1<<u;i|=e[u],o&=~h}return Ji=i,fl(),a}function Hg(e,i){he=null,O.H=co,i===Ys||i===yl?(i=nm(),Ie=3):i===Iu?(i=nm(),Ie=4):Ie=i===hf?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,Qn=i,xe===null&&(en=1,Nl(e,ai(i,e.current)))}function Gg(){var e=jn.current;return e===null?!0:(Te&4194048)===Te?li===null:(Te&62914560)===Te||(Te&536870912)!==0?e===li:!1}function Vg(){var e=O.H;return O.H=co,e===null?co:e}function kg(){var e=O.A;return O.A=fx,e}function Wl(){en=4,Ma||(Te&4194048)!==Te&&jn.current!==null||(er=!0),(Ea&134217727)===0&&(us&134217727)===0||qe===null||Aa(qe,Te,Jn,!1)}function Pf(e,i,a){var o=Le;Le|=2;var u=Vg(),h=kg();(qe!==e||Te!==i)&&(kl=null,ar(e,i)),i=!1;var x=en;t:do try{if(Ie!==0&&xe!==null){var A=xe,F=Qn;switch(Ie){case 8:Of(),x=6;break t;case 3:case 2:case 9:case 6:jn.current===null&&(i=!0);var tt=Ie;if(Ie=0,Qn=null,sr(e,A,F,tt),a&&er){x=0;break t}break;default:tt=Ie,Ie=0,Qn=null,sr(e,A,F,tt)}}px(),x=en;break}catch(dt){Hg(e,dt)}while(!0);return i&&e.shellSuspendCounter++,Vi=es=null,Le=o,O.H=u,O.A=h,xe===null&&(qe=null,Te=0,fl()),x}function px(){for(;xe!==null;)Xg(xe)}function mx(e,i){var a=Le;Le|=2;var o=Vg(),u=kg();qe!==e||Te!==i?(kl=null,Vl=T()+500,ar(e,i)):er=Yt(e,i);t:do try{if(Ie!==0&&xe!==null){i=xe;var h=Qn;e:switch(Ie){case 1:Ie=0,Qn=null,sr(e,i,h,1);break;case 2:case 9:if(tm(h)){Ie=0,Qn=null,Wg(i);break}i=function(){Ie!==2&&Ie!==9||qe!==e||(Ie=7),wi(e)},h.then(i,i);break t;case 3:Ie=7;break t;case 4:Ie=5;break t;case 7:tm(h)?(Ie=0,Qn=null,Wg(i)):(Ie=0,Qn=null,sr(e,i,h,7));break;case 5:var x=null;switch(xe.tag){case 26:x=xe.memoizedState;case 5:case 27:var A=xe;if(x?D_(x):A.stateNode.complete){Ie=0,Qn=null;var F=A.sibling;if(F!==null)xe=F;else{var tt=A.return;tt!==null?(xe=tt,ql(tt)):xe=null}break e}}Ie=0,Qn=null,sr(e,i,h,5);break;case 6:Ie=0,Qn=null,sr(e,i,h,6);break;case 8:Of(),en=6;break t;default:throw Error(s(462))}}gx();break}catch(dt){Hg(e,dt)}while(!0);return Vi=es=null,O.H=o,O.A=u,Le=a,xe!==null?0:(qe=null,Te=0,fl(),en)}function gx(){for(;xe!==null&&!le();)Xg(xe)}function Xg(e){var i=pg(e.alternate,e,Ji);e.memoizedProps=e.pendingProps,i===null?ql(e):xe=i}function Wg(e){var i=e,a=i.alternate;switch(i.tag){case 15:case 0:i=lg(a,i,i.pendingProps,i.type,void 0,Te);break;case 11:i=lg(a,i,i.pendingProps,i.type.render,i.ref,Te);break;case 5:ju(i);default:gg(a,i),i=xe=kp(i,Ji),i=pg(a,i,Ji)}e.memoizedProps=e.pendingProps,i===null?ql(e):xe=i}function sr(e,i,a,o){Vi=es=null,ju(i),Zs=null,eo=0;var u=i.return;try{if(ax(e,u,i,a,Te)){en=1,Nl(e,ai(a,e.current)),xe=null;return}}catch(h){if(u!==null)throw xe=u,h;en=1,Nl(e,ai(a,e.current)),xe=null;return}i.flags&32768?(Ae||o===1?e=!0:er||(Te&536870912)!==0?e=!1:(Ma=e=!0,(o===2||o===9||o===3||o===6)&&(o=jn.current,o!==null&&o.tag===13&&(o.flags|=16384))),qg(i,e)):ql(i)}function ql(e){var i=e;do{if((i.flags&32768)!==0){qg(i,Ma);return}e=i.return;var a=ox(i.alternate,i,Ji);if(a!==null){xe=a;return}if(i=i.sibling,i!==null){xe=i;return}xe=i=e}while(i!==null);en===0&&(en=5)}function qg(e,i){do{var a=lx(e.alternate,e);if(a!==null){a.flags&=32767,xe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!i&&(e=e.sibling,e!==null)){xe=e;return}xe=e=a}while(e!==null);en=6,xe=null}function Yg(e,i,a,o,u,h,x,A,F){e.cancelPendingCommit=null;do Yl();while(dn!==0);if((Le&6)!==0)throw Error(s(327));if(i!==null){if(i===e.current)throw Error(s(177));if(h=i.lanes|i.childLanes,h|=Mu,ni(e,a,h,x,A,F),e===qe&&(xe=qe=null,Te=0),ir=i,ba=e,$i=a,Uf=h,Lf=u,zg=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,xx(ft,function(){return Jg(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=O.T,O.T=null,u=K.p,K.p=2,x=Le,Le|=4;try{cx(e,i,a)}finally{Le=x,K.p=u,O.T=o}}dn=1,Zg(),jg(),Kg()}}function Zg(){if(dn===1){dn=0;var e=ba,i=ir,a=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||a){a=O.T,O.T=null;var o=K.p;K.p=2;var u=Le;Le|=4;try{Cg(i,e);var h=Yf,x=Op(e.containerInfo),A=h.focusedElem,F=h.selectionRange;if(x!==A&&A&&A.ownerDocument&&Np(A.ownerDocument.documentElement,A)){if(F!==null&&_u(A)){var tt=F.start,dt=F.end;if(dt===void 0&&(dt=tt),"selectionStart"in A)A.selectionStart=tt,A.selectionEnd=Math.min(dt,A.value.length);else{var _t=A.ownerDocument||document,nt=_t&&_t.defaultView||window;if(nt.getSelection){var ot=nt.getSelection(),Zt=A.textContent.length,se=Math.min(F.start,Zt),Ge=F.end===void 0?se:Math.min(F.end,Zt);!ot.extend&&se>Ge&&(x=Ge,Ge=se,se=x);var Z=Lp(A,se),k=Lp(A,Ge);if(Z&&k&&(ot.rangeCount!==1||ot.anchorNode!==Z.node||ot.anchorOffset!==Z.offset||ot.focusNode!==k.node||ot.focusOffset!==k.offset)){var $=_t.createRange();$.setStart(Z.node,Z.offset),ot.removeAllRanges(),se>Ge?(ot.addRange($),ot.extend(k.node,k.offset)):($.setEnd(k.node,k.offset),ot.addRange($))}}}}for(_t=[],ot=A;ot=ot.parentNode;)ot.nodeType===1&&_t.push({element:ot,left:ot.scrollLeft,top:ot.scrollTop});for(typeof A.focus=="function"&&A.focus(),A=0;A<_t.length;A++){var pt=_t[A];pt.element.scrollLeft=pt.left,pt.element.scrollTop=pt.top}}sc=!!qf,Yf=qf=null}finally{Le=u,K.p=o,O.T=a}}e.current=i,dn=2}}function jg(){if(dn===2){dn=0;var e=ba,i=ir,a=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||a){a=O.T,O.T=null;var o=K.p;K.p=2;var u=Le;Le|=4;try{Eg(e,i.alternate,i)}finally{Le=u,K.p=o,O.T=a}}dn=3}}function Kg(){if(dn===4||dn===3){dn=0,L();var e=ba,i=ir,a=$i,o=zg;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?dn=5:(dn=0,ir=ba=null,Qg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ta=null),Us(a),i=i.stateNode,Nt&&typeof Nt.onCommitFiberRoot=="function")try{Nt.onCommitFiberRoot(Rt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=O.T,u=K.p,K.p=2,O.T=null;try{for(var h=e.onRecoverableError,x=0;x<o.length;x++){var A=o[x];h(A.value,{componentStack:A.stack})}}finally{O.T=i,K.p=u}}($i&3)!==0&&Yl(),wi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Nf?yo++:(yo=0,Nf=e):yo=0,xo(0)}}function Qg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,$r(i)))}function Yl(){return Zg(),jg(),Kg(),Jg()}function Jg(){if(dn!==5)return!1;var e=ba,i=Uf;Uf=0;var a=Us($i),o=O.T,u=K.p;try{K.p=32>a?32:a,O.T=null,a=Lf,Lf=null;var h=ba,x=$i;if(dn=0,ir=ba=null,$i=0,(Le&6)!==0)throw Error(s(331));var A=Le;if(Le|=4,Ng(h.current),Dg(h,h.current,x,a),Le=A,xo(0,!1),Nt&&typeof Nt.onPostCommitFiberRoot=="function")try{Nt.onPostCommitFiberRoot(Rt,h)}catch{}return!0}finally{K.p=u,O.T=o,Qg(e,i)}}function $g(e,i,a){i=ai(a,i),i=ff(e.stateNode,i,2),e=va(e,i,2),e!==null&&(Un(e,2),wi(e))}function Be(e,i,a){if(e.tag===3)$g(e,e,a);else for(;i!==null;){if(i.tag===3){$g(i,e,a);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ta===null||!Ta.has(o))){e=ai(a,e),a=tg(2),o=va(i,a,2),o!==null&&(eg(a,o,i,e),Un(o,2),wi(o));break}}i=i.return}}function zf(e,i,a){var o=e.pingCache;if(o===null){o=e.pingCache=new hx;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(a)||(Cf=!0,u.add(a),e=_x.bind(null,e,i,a),i.then(e,e))}function _x(e,i,a){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,qe===e&&(Te&a)===a&&(en===4||en===3&&(Te&62914560)===Te&&300>T()-Gl?(Le&2)===0&&ar(e,0):wf|=a,nr===Te&&(nr=0)),wi(e)}function t_(e,i){i===0&&(i=ze()),e=Ja(e,i),e!==null&&(Un(e,i),wi(e))}function vx(e){var i=e.memoizedState,a=0;i!==null&&(a=i.retryLane),t_(e,a)}function yx(e,i){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(i),t_(e,a)}function xx(e,i){return Ot(e,i)}var Zl=null,rr=null,If=!1,jl=!1,Bf=!1,Ra=0;function wi(e){e!==rr&&e.next===null&&(rr===null?Zl=rr=e:rr=rr.next=e),jl=!0,If||(If=!0,Mx())}function xo(e,i){if(!Bf&&jl){Bf=!0;do for(var a=!1,o=Zl;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var x=o.suspendedLanes,A=o.pingedLanes;h=(1<<31-Xt(42|e)+1)-1,h&=u&~(x&~A),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(a=!0,a_(o,h))}else h=Te,h=vt(o,o===qe?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||Yt(o,h)||(a=!0,a_(o,h));o=o.next}while(a);Bf=!1}}function Sx(){e_()}function e_(){jl=If=!1;var e=0;Ra!==0&&Lx()&&(e=Ra);for(var i=T(),a=null,o=Zl;o!==null;){var u=o.next,h=n_(o,i);h===0?(o.next=null,a===null?Zl=u:a.next=u,u===null&&(rr=a)):(a=o,(e!==0||(h&3)!==0)&&(jl=!0)),o=u}dn!==0&&dn!==5||xo(e),Ra!==0&&(Ra=0)}function n_(e,i){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var x=31-Xt(h),A=1<<x,F=u[x];F===-1?((A&a)===0||(A&o)!==0)&&(u[x]=ce(A,i)):F<=i&&(e.expiredLanes|=A),h&=~A}if(i=qe,a=Te,a=vt(e,e===i?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===i&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&oe(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Yt(e,a)){if(i=a&-a,i===e.callbackPriority)return i;switch(o!==null&&oe(o),Us(a)){case 2:case 8:a=Tt;break;case 32:a=ft;break;case 268435456:a=Lt;break;default:a=ft}return o=i_.bind(null,e),a=Ot(a,o),e.callbackPriority=i,e.callbackNode=a,i}return o!==null&&o!==null&&oe(o),e.callbackPriority=2,e.callbackNode=null,2}function i_(e,i){if(dn!==0&&dn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Yl()&&e.callbackNode!==a)return null;var o=Te;return o=vt(e,e===qe?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(Bg(e,o,i),n_(e,T()),e.callbackNode!=null&&e.callbackNode===a?i_.bind(null,e):null)}function a_(e,i){if(Yl())return null;Bg(e,i,!0)}function Mx(){Ox(function(){(Le&6)!==0?Ot(ut,Sx):e_()})}function Ff(){if(Ra===0){var e=Ws;e===0&&(e=wt,wt<<=1,(wt&261888)===0&&(wt=256)),Ra=e}return Ra}function s_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:il(""+e)}function r_(e,i){var a=i.ownerDocument.createElement("input");return a.name=i.name,a.value=i.value,e.id&&a.setAttribute("form",e.id),i.parentNode.insertBefore(a,i),e=new FormData(e),a.parentNode.removeChild(a),e}function Ex(e,i,a,o,u){if(i==="submit"&&a&&a.stateNode===u){var h=s_((u[Sn]||null).action),x=o.submitter;x&&(i=(i=x[Sn]||null)?s_(i.formAction):x.getAttribute("formAction"),i!==null&&(h=i,x=null));var A=new ol("action","action",null,o,u);e.push({event:A,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ra!==0){var F=x?r_(u,x):new FormData(u);sf(a,{pending:!0,data:F,method:u.method,action:h},null,F)}}else typeof h=="function"&&(A.preventDefault(),F=x?r_(u,x):new FormData(u),sf(a,{pending:!0,data:F,method:u.method,action:h},h,F))},currentTarget:u}]})}}for(var Hf=0;Hf<Su.length;Hf++){var Gf=Su[Hf],Tx=Gf.toLowerCase(),bx=Gf[0].toUpperCase()+Gf.slice(1);pi(Tx,"on"+bx)}pi(Ip,"onAnimationEnd"),pi(Bp,"onAnimationIteration"),pi(Fp,"onAnimationStart"),pi("dblclick","onDoubleClick"),pi("focusin","onFocus"),pi("focusout","onBlur"),pi(Gy,"onTransitionRun"),pi(Vy,"onTransitionStart"),pi(ky,"onTransitionCancel"),pi(Hp,"onTransitionEnd"),ne("onMouseEnter",["mouseout","mouseover"]),ne("onMouseLeave",["mouseout","mouseover"]),ne("onPointerEnter",["pointerout","pointerover"]),ne("onPointerLeave",["pointerout","pointerover"]),kt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),kt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),kt("onBeforeInput",["compositionend","keypress","textInput","paste"]),kt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),kt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),kt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var So="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ax=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(So));function o_(e,i){i=(i&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var h=void 0;if(i)for(var x=o.length-1;0<=x;x--){var A=o[x],F=A.instance,tt=A.currentTarget;if(A=A.listener,F!==h&&u.isPropagationStopped())break t;h=A,u.currentTarget=tt;try{h(u)}catch(dt){ul(dt)}u.currentTarget=null,h=F}else for(x=0;x<o.length;x++){if(A=o[x],F=A.instance,tt=A.currentTarget,A=A.listener,F!==h&&u.isPropagationStopped())break t;h=A,u.currentTarget=tt;try{h(u)}catch(dt){ul(dt)}u.currentTarget=null,h=F}}}}function Se(e,i){var a=i[Gr];a===void 0&&(a=i[Gr]=new Set);var o=e+"__bubble";a.has(o)||(l_(i,e,2,!1),a.add(o))}function Vf(e,i,a){var o=0;i&&(o|=4),l_(a,e,o,i)}var Kl="_reactListening"+Math.random().toString(36).slice(2);function kf(e){if(!e[Kl]){e[Kl]=!0,Gt.forEach(function(a){a!=="selectionchange"&&(Ax.has(a)||Vf(a,!1,e),Vf(a,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[Kl]||(i[Kl]=!0,Vf("selectionchange",!1,i))}}function l_(e,i,a,o){switch(I_(i)){case 2:var u=tS;break;case 8:u=eS;break;default:u=ah}a=u.bind(null,i,a,e),u=void 0,!lu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,a,{capture:!0,passive:u}):e.addEventListener(i,a,!0):u!==void 0?e.addEventListener(i,a,{passive:u}):e.addEventListener(i,a,!1)}function Xf(e,i,a,o,u){var h=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var x=o.tag;if(x===3||x===4){var A=o.stateNode.containerInfo;if(A===u)break;if(x===4)for(x=o.return;x!==null;){var F=x.tag;if((F===3||F===4)&&x.stateNode.containerInfo===u)return;x=x.return}for(;A!==null;){if(x=q(A),x===null)return;if(F=x.tag,F===5||F===6||F===26||F===27){o=h=x;continue t}A=A.parentNode}}o=o.return}dp(function(){var tt=h,dt=ru(a),_t=[];t:{var nt=Gp.get(e);if(nt!==void 0){var ot=ol,Zt=e;switch(e){case"keypress":if(sl(a)===0)break t;case"keydown":case"keyup":ot=yy;break;case"focusin":Zt="focus",ot=hu;break;case"focusout":Zt="blur",ot=hu;break;case"beforeblur":case"afterblur":ot=hu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ot=gp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ot=oy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ot=My;break;case Ip:case Bp:case Fp:ot=uy;break;case Hp:ot=Ty;break;case"scroll":case"scrollend":ot=sy;break;case"wheel":ot=Ay;break;case"copy":case"cut":case"paste":ot=hy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ot=vp;break;case"toggle":case"beforetoggle":ot=Cy}var se=(i&4)!==0,Ge=!se&&(e==="scroll"||e==="scrollend"),Z=se?nt!==null?nt+"Capture":null:nt;se=[];for(var k=tt,$;k!==null;){var pt=k;if($=pt.stateNode,pt=pt.tag,pt!==5&&pt!==26&&pt!==27||$===null||Z===null||(pt=Vr(k,Z),pt!=null&&se.push(Mo(k,pt,$))),Ge)break;k=k.return}0<se.length&&(nt=new ot(nt,Zt,null,a,dt),_t.push({event:nt,listeners:se}))}}if((i&7)===0){t:{if(nt=e==="mouseover"||e==="pointerover",ot=e==="mouseout"||e==="pointerout",nt&&a!==su&&(Zt=a.relatedTarget||a.fromElement)&&(q(Zt)||Zt[ua]))break t;if((ot||nt)&&(nt=dt.window===dt?dt:(nt=dt.ownerDocument)?nt.defaultView||nt.parentWindow:window,ot?(Zt=a.relatedTarget||a.toElement,ot=tt,Zt=Zt?q(Zt):null,Zt!==null&&(Ge=c(Zt),se=Zt.tag,Zt!==Ge||se!==5&&se!==27&&se!==6)&&(Zt=null)):(ot=null,Zt=tt),ot!==Zt)){if(se=gp,pt="onMouseLeave",Z="onMouseEnter",k="mouse",(e==="pointerout"||e==="pointerover")&&(se=vp,pt="onPointerLeave",Z="onPointerEnter",k="pointer"),Ge=ot==null?nt:st(ot),$=Zt==null?nt:st(Zt),nt=new se(pt,k+"leave",ot,a,dt),nt.target=Ge,nt.relatedTarget=$,pt=null,q(dt)===tt&&(se=new se(Z,k+"enter",Zt,a,dt),se.target=$,se.relatedTarget=Ge,pt=se),Ge=pt,ot&&Zt)e:{for(se=Rx,Z=ot,k=Zt,$=0,pt=Z;pt;pt=se(pt))$++;pt=0;for(var ae=k;ae;ae=se(ae))pt++;for(;0<$-pt;)Z=se(Z),$--;for(;0<pt-$;)k=se(k),pt--;for(;$--;){if(Z===k||k!==null&&Z===k.alternate){se=Z;break e}Z=se(Z),k=se(k)}se=null}else se=null;ot!==null&&c_(_t,nt,ot,se,!1),Zt!==null&&Ge!==null&&c_(_t,Ge,Zt,se,!0)}}t:{if(nt=tt?st(tt):window,ot=nt.nodeName&&nt.nodeName.toLowerCase(),ot==="select"||ot==="input"&&nt.type==="file")var we=Ap;else if(Tp(nt))if(Rp)we=By;else{we=zy;var te=Py}else ot=nt.nodeName,!ot||ot.toLowerCase()!=="input"||nt.type!=="checkbox"&&nt.type!=="radio"?tt&&au(tt.elementType)&&(we=Ap):we=Iy;if(we&&(we=we(e,tt))){bp(_t,we,a,dt);break t}te&&te(e,nt,tt),e==="focusout"&&tt&&nt.type==="number"&&tt.memoizedProps.value!=null&&hn(nt,"number",nt.value)}switch(te=tt?st(tt):window,e){case"focusin":(Tp(te)||te.contentEditable==="true")&&(Is=te,vu=tt,Kr=null);break;case"focusout":Kr=vu=Is=null;break;case"mousedown":yu=!0;break;case"contextmenu":case"mouseup":case"dragend":yu=!1,Pp(_t,a,dt);break;case"selectionchange":if(Hy)break;case"keydown":case"keyup":Pp(_t,a,dt)}var pe;if(pu)t:{switch(e){case"compositionstart":var be="onCompositionStart";break t;case"compositionend":be="onCompositionEnd";break t;case"compositionupdate":be="onCompositionUpdate";break t}be=void 0}else zs?Mp(e,a)&&(be="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(be="onCompositionStart");be&&(yp&&a.locale!=="ko"&&(zs||be!=="onCompositionStart"?be==="onCompositionEnd"&&zs&&(pe=pp()):(fa=dt,cu="value"in fa?fa.value:fa.textContent,zs=!0)),te=Ql(tt,be),0<te.length&&(be=new _p(be,e,null,a,dt),_t.push({event:be,listeners:te}),pe?be.data=pe:(pe=Ep(a),pe!==null&&(be.data=pe)))),(pe=Dy?Uy(e,a):Ly(e,a))&&(be=Ql(tt,"onBeforeInput"),0<be.length&&(te=new _p("onBeforeInput","beforeinput",null,a,dt),_t.push({event:te,listeners:be}),te.data=pe)),Ex(_t,e,tt,a,dt)}o_(_t,i)})}function Mo(e,i,a){return{instance:e,listener:i,currentTarget:a}}function Ql(e,i){for(var a=i+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=Vr(e,a),u!=null&&o.unshift(Mo(e,u,h)),u=Vr(e,i),u!=null&&o.push(Mo(e,u,h))),e.tag===3)return o;e=e.return}return[]}function Rx(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function c_(e,i,a,o,u){for(var h=i._reactName,x=[];a!==null&&a!==o;){var A=a,F=A.alternate,tt=A.stateNode;if(A=A.tag,F!==null&&F===o)break;A!==5&&A!==26&&A!==27||tt===null||(F=tt,u?(tt=Vr(a,h),tt!=null&&x.unshift(Mo(a,tt,F))):u||(tt=Vr(a,h),tt!=null&&x.push(Mo(a,tt,F)))),a=a.return}x.length!==0&&e.push({event:i,listeners:x})}var Cx=/\r\n?/g,wx=/\u0000|\uFFFD/g;function u_(e){return(typeof e=="string"?e:""+e).replace(Cx,`
`).replace(wx,"")}function f_(e,i){return i=u_(i),u_(e)===i}function He(e,i,a,o,u,h){switch(a){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||Ns(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&Ns(e,""+o);break;case"className":Pe(e,"class",o);break;case"tabIndex":Pe(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Pe(e,a,o);break;case"style":fp(e,o,h);break;case"data":if(i!=="object"){Pe(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=il(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(a==="formAction"?(i!=="input"&&He(e,i,"name",u.name,u,null),He(e,i,"formEncType",u.formEncType,u,null),He(e,i,"formMethod",u.formMethod,u,null),He(e,i,"formTarget",u.formTarget,u,null)):(He(e,i,"encType",u.encType,u,null),He(e,i,"method",u.method,u,null),He(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=il(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Bi);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=il(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":Se("beforetoggle",e),Se("toggle",e),We(e,"popover",o);break;case"xlinkActuate":ye(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":ye(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":ye(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":ye(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":ye(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":ye(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":ye(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":ye(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":ye(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":We(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=iy.get(a)||a,We(e,a,o))}}function Wf(e,i,a,o,u,h){switch(a){case"style":fp(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Ns(e,o):(typeof o=="number"||typeof o=="bigint")&&Ns(e,""+o);break;case"onScroll":o!=null&&Se("scroll",e);break;case"onScrollEnd":o!=null&&Se("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Bi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!jt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),i=a.slice(2,u?a.length-7:void 0),h=e[Sn]||null,h=h!=null?h[a]:null,typeof h=="function"&&e.removeEventListener(i,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(i,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):We(e,a,o)}}}function An(e,i,a){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Se("error",e),Se("load",e);var o=!1,u=!1,h;for(h in a)if(a.hasOwnProperty(h)){var x=a[h];if(x!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:He(e,i,h,x,a,null)}}u&&He(e,i,"srcSet",a.srcSet,a,null),o&&He(e,i,"src",a.src,a,null);return;case"input":Se("invalid",e);var A=h=x=u=null,F=null,tt=null;for(o in a)if(a.hasOwnProperty(o)){var dt=a[o];if(dt!=null)switch(o){case"name":u=dt;break;case"type":x=dt;break;case"checked":F=dt;break;case"defaultChecked":tt=dt;break;case"value":h=dt;break;case"defaultValue":A=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(s(137,i));break;default:He(e,i,o,dt,a,null)}}Ln(e,h,A,F,tt,x,u,!1);return;case"select":Se("invalid",e),o=x=h=null;for(u in a)if(a.hasOwnProperty(u)&&(A=a[u],A!=null))switch(u){case"value":h=A;break;case"defaultValue":x=A;break;case"multiple":o=A;default:He(e,i,u,A,a,null)}i=h,a=x,e.multiple=!!o,i!=null?nn(e,!!o,i,!1):a!=null&&nn(e,!!o,a,!0);return;case"textarea":Se("invalid",e),h=u=o=null;for(x in a)if(a.hasOwnProperty(x)&&(A=a[x],A!=null))switch(x){case"value":o=A;break;case"defaultValue":u=A;break;case"children":h=A;break;case"dangerouslySetInnerHTML":if(A!=null)throw Error(s(91));break;default:He(e,i,x,A,a,null)}bi(e,o,u,h);return;case"option":for(F in a)a.hasOwnProperty(F)&&(o=a[F],o!=null)&&(F==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":He(e,i,F,o,a,null));return;case"dialog":Se("beforetoggle",e),Se("toggle",e),Se("cancel",e),Se("close",e);break;case"iframe":case"object":Se("load",e);break;case"video":case"audio":for(o=0;o<So.length;o++)Se(So[o],e);break;case"image":Se("error",e),Se("load",e);break;case"details":Se("toggle",e);break;case"embed":case"source":case"link":Se("error",e),Se("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(o=a[tt],o!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:He(e,i,tt,o,a,null)}return;default:if(au(i)){for(dt in a)a.hasOwnProperty(dt)&&(o=a[dt],o!==void 0&&Wf(e,i,dt,o,a,void 0));return}}for(A in a)a.hasOwnProperty(A)&&(o=a[A],o!=null&&He(e,i,A,o,a,null))}function Dx(e,i,a,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,x=null,A=null,F=null,tt=null,dt=null;for(ot in a){var _t=a[ot];if(a.hasOwnProperty(ot)&&_t!=null)switch(ot){case"checked":break;case"value":break;case"defaultValue":F=_t;default:o.hasOwnProperty(ot)||He(e,i,ot,null,o,_t)}}for(var nt in o){var ot=o[nt];if(_t=a[nt],o.hasOwnProperty(nt)&&(ot!=null||_t!=null))switch(nt){case"type":h=ot;break;case"name":u=ot;break;case"checked":tt=ot;break;case"defaultChecked":dt=ot;break;case"value":x=ot;break;case"defaultValue":A=ot;break;case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(s(137,i));break;default:ot!==_t&&He(e,i,nt,ot,o,_t)}}Rn(e,x,A,F,tt,dt,h,u);return;case"select":ot=x=A=nt=null;for(h in a)if(F=a[h],a.hasOwnProperty(h)&&F!=null)switch(h){case"value":break;case"multiple":ot=F;default:o.hasOwnProperty(h)||He(e,i,h,null,o,F)}for(u in o)if(h=o[u],F=a[u],o.hasOwnProperty(u)&&(h!=null||F!=null))switch(u){case"value":nt=h;break;case"defaultValue":A=h;break;case"multiple":x=h;default:h!==F&&He(e,i,u,h,o,F)}i=A,a=x,o=ot,nt!=null?nn(e,!!a,nt,!1):!!o!=!!a&&(i!=null?nn(e,!!a,i,!0):nn(e,!!a,a?[]:"",!1));return;case"textarea":ot=nt=null;for(A in a)if(u=a[A],a.hasOwnProperty(A)&&u!=null&&!o.hasOwnProperty(A))switch(A){case"value":break;case"children":break;default:He(e,i,A,null,o,u)}for(x in o)if(u=o[x],h=a[x],o.hasOwnProperty(x)&&(u!=null||h!=null))switch(x){case"value":nt=u;break;case"defaultValue":ot=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==h&&He(e,i,x,u,o,h)}Ls(e,nt,ot);return;case"option":for(var Zt in a)nt=a[Zt],a.hasOwnProperty(Zt)&&nt!=null&&!o.hasOwnProperty(Zt)&&(Zt==="selected"?e.selected=!1:He(e,i,Zt,null,o,nt));for(F in o)nt=o[F],ot=a[F],o.hasOwnProperty(F)&&nt!==ot&&(nt!=null||ot!=null)&&(F==="selected"?e.selected=nt&&typeof nt!="function"&&typeof nt!="symbol":He(e,i,F,nt,o,ot));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var se in a)nt=a[se],a.hasOwnProperty(se)&&nt!=null&&!o.hasOwnProperty(se)&&He(e,i,se,null,o,nt);for(tt in o)if(nt=o[tt],ot=a[tt],o.hasOwnProperty(tt)&&nt!==ot&&(nt!=null||ot!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(nt!=null)throw Error(s(137,i));break;default:He(e,i,tt,nt,o,ot)}return;default:if(au(i)){for(var Ge in a)nt=a[Ge],a.hasOwnProperty(Ge)&&nt!==void 0&&!o.hasOwnProperty(Ge)&&Wf(e,i,Ge,void 0,o,nt);for(dt in o)nt=o[dt],ot=a[dt],!o.hasOwnProperty(dt)||nt===ot||nt===void 0&&ot===void 0||Wf(e,i,dt,nt,o,ot);return}}for(var Z in a)nt=a[Z],a.hasOwnProperty(Z)&&nt!=null&&!o.hasOwnProperty(Z)&&He(e,i,Z,null,o,nt);for(_t in o)nt=o[_t],ot=a[_t],!o.hasOwnProperty(_t)||nt===ot||nt==null&&ot==null||He(e,i,_t,nt,o,ot)}function h_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Ux(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],h=u.transferSize,x=u.initiatorType,A=u.duration;if(h&&A&&h_(x)){for(x=0,A=u.responseEnd,o+=1;o<a.length;o++){var F=a[o],tt=F.startTime;if(tt>A)break;var dt=F.transferSize,_t=F.initiatorType;dt&&h_(_t)&&(F=F.responseEnd,x+=dt*(F<A?1:(A-tt)/(F-tt)))}if(--o,i+=8*(h+x)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var qf=null,Yf=null;function Jl(e){return e.nodeType===9?e:e.ownerDocument}function d_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function p_(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function Zf(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var jf=null;function Lx(){var e=window.event;return e&&e.type==="popstate"?e===jf?!1:(jf=e,!0):(jf=null,!1)}var m_=typeof setTimeout=="function"?setTimeout:void 0,Nx=typeof clearTimeout=="function"?clearTimeout:void 0,g_=typeof Promise=="function"?Promise:void 0,Ox=typeof queueMicrotask=="function"?queueMicrotask:typeof g_<"u"?function(e){return g_.resolve(null).then(e).catch(Px)}:m_;function Px(e){setTimeout(function(){throw e})}function Ca(e){return e==="head"}function __(e,i){var a=i,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),ur(i);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Eo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Eo(a);for(var h=a.firstChild;h;){var x=h.nextSibling,A=h.nodeName;h[Ya]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=x}}else a==="body"&&Eo(e.ownerDocument.body);a=u}while(a);ur(i)}function v_(e,i){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?i?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(i?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function Kf(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var a=i;switch(i=i.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Kf(a),C(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function zx(e,i,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[Ya])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=ci(e.nextSibling),e===null)break}return null}function Ix(e,i,a){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=ci(e.nextSibling),e===null))return null;return e}function y_(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=ci(e.nextSibling),e===null))return null;return e}function Qf(e){return e.data==="$?"||e.data==="$~"}function Jf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Bx(e,i){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||a.readyState!=="loading")i();else{var o=function(){i(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function ci(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var $f=null;function x_(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(i===0)return ci(e.nextSibling);i--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||i++}e=e.nextSibling}return null}function S_(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(i===0)return e;i--}else a!=="/$"&&a!=="/&"||i++}e=e.previousSibling}return null}function M_(e,i,a){switch(i=Jl(a),e){case"html":if(e=i.documentElement,!e)throw Error(s(452));return e;case"head":if(e=i.head,!e)throw Error(s(453));return e;case"body":if(e=i.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Eo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);C(e)}var ui=new Map,E_=new Set;function $l(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ta=K.d;K.d={f:Fx,r:Hx,D:Gx,C:Vx,L:kx,m:Xx,X:qx,S:Wx,M:Yx};function Fx(){var e=ta.f(),i=Xl();return e||i}function Hx(e){var i=at(e);i!==null&&i.tag===5&&i.type==="form"?Hm(i):ta.r(e)}var or=typeof document>"u"?null:document;function T_(e,i,a){var o=or;if(o&&typeof i=="string"&&i){var u=Ee(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),E_.has(u)||(E_.add(u),e={rel:e,crossOrigin:a,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),An(i,"link",e),xt(i),o.head.appendChild(i)))}}function Gx(e){ta.D(e),T_("dns-prefetch",e,null)}function Vx(e,i){ta.C(e,i),T_("preconnect",e,i)}function kx(e,i,a){ta.L(e,i,a);var o=or;if(o&&e&&i){var u='link[rel="preload"][as="'+Ee(i)+'"]';i==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Ee(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Ee(a.imageSizes)+'"]')):u+='[href="'+Ee(e)+'"]';var h=u;switch(i){case"style":h=lr(e);break;case"script":h=cr(e)}ui.has(h)||(e=_({rel:"preload",href:i==="image"&&a&&a.imageSrcSet?void 0:e,as:i},a),ui.set(h,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(To(h))||i==="script"&&o.querySelector(bo(h))||(i=o.createElement("link"),An(i,"link",e),xt(i),o.head.appendChild(i)))}}function Xx(e,i){ta.m(e,i);var a=or;if(a&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+Ee(o)+'"][href="'+Ee(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=cr(e)}if(!ui.has(h)&&(e=_({rel:"modulepreload",href:e},i),ui.set(h,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(bo(h)))return}o=a.createElement("link"),An(o,"link",e),xt(o),a.head.appendChild(o)}}}function Wx(e,i,a){ta.S(e,i,a);var o=or;if(o&&e){var u=j(o).hoistableStyles,h=lr(e);i=i||"default";var x=u.get(h);if(!x){var A={loading:0,preload:null};if(x=o.querySelector(To(h)))A.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":i},a),(a=ui.get(h))&&th(e,a);var F=x=o.createElement("link");xt(F),An(F,"link",e),F._p=new Promise(function(tt,dt){F.onload=tt,F.onerror=dt}),F.addEventListener("load",function(){A.loading|=1}),F.addEventListener("error",function(){A.loading|=2}),A.loading|=4,tc(x,i,o)}x={type:"stylesheet",instance:x,count:1,state:A},u.set(h,x)}}}function qx(e,i){ta.X(e,i);var a=or;if(a&&e){var o=j(a).hoistableScripts,u=cr(e),h=o.get(u);h||(h=a.querySelector(bo(u)),h||(e=_({src:e,async:!0},i),(i=ui.get(u))&&eh(e,i),h=a.createElement("script"),xt(h),An(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function Yx(e,i){ta.M(e,i);var a=or;if(a&&e){var o=j(a).hoistableScripts,u=cr(e),h=o.get(u);h||(h=a.querySelector(bo(u)),h||(e=_({src:e,async:!0,type:"module"},i),(i=ui.get(u))&&eh(e,i),h=a.createElement("script"),xt(h),An(h,"link",e),a.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function b_(e,i,a,o){var u=(u=it.current)?$l(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(i=lr(a.href),a=j(u).hoistableStyles,o=a.get(i),o||(o={type:"style",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=lr(a.href);var h=j(u).hoistableStyles,x=h.get(e);if(x||(u=u.ownerDocument||u,x={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,x),(h=u.querySelector(To(e)))&&!h._p&&(x.instance=h,x.state.loading=5),ui.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ui.set(e,a),h||Zx(u,e,a,x.state))),i&&o===null)throw Error(s(528,""));return x}if(i&&o!==null)throw Error(s(529,""));return null;case"script":return i=a.async,a=a.src,typeof a=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=cr(a),a=j(u).hoistableScripts,o=a.get(i),o||(o={type:"script",instance:null,count:0,state:null},a.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function lr(e){return'href="'+Ee(e)+'"'}function To(e){return'link[rel="stylesheet"]['+e+"]"}function A_(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function Zx(e,i,a,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),An(i,"link",a),xt(i),e.head.appendChild(i))}function cr(e){return'[src="'+Ee(e)+'"]'}function bo(e){return"script[async]"+e}function R_(e,i,a){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+Ee(a.href)+'"]');if(o)return i.instance=o,xt(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),xt(o),An(o,"style",u),tc(o,a.precedence,e),i.instance=o;case"stylesheet":u=lr(a.href);var h=e.querySelector(To(u));if(h)return i.state.loading|=4,i.instance=h,xt(h),h;o=A_(a),(u=ui.get(u))&&th(o,u),h=(e.ownerDocument||e).createElement("link"),xt(h);var x=h;return x._p=new Promise(function(A,F){x.onload=A,x.onerror=F}),An(h,"link",o),i.state.loading|=4,tc(h,a.precedence,e),i.instance=h;case"script":return h=cr(a.src),(u=e.querySelector(bo(h)))?(i.instance=u,xt(u),u):(o=a,(u=ui.get(h))&&(o=_({},a),eh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),xt(u),An(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(s(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,tc(o,a.precedence,e));return i.instance}function tc(e,i,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,x=0;x<o.length;x++){var A=o[x];if(A.dataset.precedence===i)h=A;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(i=a.nodeType===9?a.head:a,i.insertBefore(e,i.firstChild))}function th(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function eh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var ec=null;function C_(e,i,a){if(ec===null){var o=new Map,u=ec=new Map;u.set(a,o)}else u=ec,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var h=a[u];if(!(h[Ya]||h[rn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var x=h.getAttribute(i)||"";x=e+x;var A=o.get(x);A?A.push(h):o.set(x,[h])}}return o}function w_(e,i,a){e=e.ownerDocument||e,e.head.insertBefore(a,i==="title"?e.querySelector("head > title"):null)}function jx(e,i,a){if(a===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;return i.rel==="stylesheet"?(e=i.disabled,typeof i.precedence=="string"&&e==null):!0;case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function D_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Kx(e,i,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=lr(o.href),h=i.querySelector(To(u));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=nc.bind(e),i.then(e,e)),a.state.loading|=4,a.instance=h,xt(h);return}h=i.ownerDocument||i,o=A_(o),(u=ui.get(u))&&th(o,u),h=h.createElement("link"),xt(h);var x=h;x._p=new Promise(function(A,F){x.onload=A,x.onerror=F}),An(h,"link",o),a.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,i),(i=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=nc.bind(e),i.addEventListener("load",a),i.addEventListener("error",a))}}var nh=0;function Qx(e,i){return e.stylesheets&&e.count===0&&ac(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&ac(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+i);0<e.imgBytes&&nh===0&&(nh=62500*Ux());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ac(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>nh?50:800)+i);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function nc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ac(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ic=null;function ac(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ic=new Map,i.forEach(Jx,e),ic=null,nc.call(e))}function Jx(e,i){if(!(i.state.loading&4)){var a=ic.get(e);if(a)var o=a.get(null);else{a=new Map,ic.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var x=u[h];(x.nodeName==="LINK"||x.getAttribute("media")!=="not all")&&(a.set(x.dataset.precedence,x),o=x)}o&&a.set(null,o)}u=i.instance,x=u.getAttribute("data-precedence"),h=a.get(x)||o,h===o&&a.set(null,u),a.set(x,u),this.count++,o=nc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var Ao={$$typeof:U,Provider:null,Consumer:null,_currentValue:Y,_currentValue2:Y,_threadCount:0};function $x(e,i,a,o,u,h,x,A,F){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Re(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Re(0),this.hiddenUpdates=Re(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=x,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=F,this.incompleteTransitions=new Map}function U_(e,i,a,o,u,h,x,A,F,tt,dt,_t){return e=new $x(e,i,a,x,F,tt,dt,_t,A),i=1,h===!0&&(i|=24),h=Zn(3,null,null,i),e.current=h,h.stateNode=e,i=Ou(),i.refCount++,e.pooledCache=i,i.refCount++,h.memoizedState={element:o,isDehydrated:a,cache:i},Bu(h),e}function L_(e){return e?(e=Hs,e):Hs}function N_(e,i,a,o,u,h){u=L_(u),o.context===null?o.context=u:o.pendingContext=u,o=_a(i),o.payload={element:a},h=h===void 0?null:h,h!==null&&(o.callback=h),a=va(e,o,i),a!==null&&(Vn(a,e,i),io(a,e,i))}function O_(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<i?a:i}}function ih(e,i){O_(e,i),(e=e.alternate)&&O_(e,i)}function P_(e){if(e.tag===13||e.tag===31){var i=Ja(e,67108864);i!==null&&Vn(i,e,67108864),ih(e,67108864)}}function z_(e){if(e.tag===13||e.tag===31){var i=$n();i=Ds(i);var a=Ja(e,i);a!==null&&Vn(a,e,i),ih(e,i)}}var sc=!0;function tS(e,i,a,o){var u=O.T;O.T=null;var h=K.p;try{K.p=2,ah(e,i,a,o)}finally{K.p=h,O.T=u}}function eS(e,i,a,o){var u=O.T;O.T=null;var h=K.p;try{K.p=8,ah(e,i,a,o)}finally{K.p=h,O.T=u}}function ah(e,i,a,o){if(sc){var u=sh(o);if(u===null)Xf(e,i,o,rc,a),B_(e,o);else if(iS(u,e,i,a,o))o.stopPropagation();else if(B_(e,o),i&4&&-1<nS.indexOf(e)){for(;u!==null;){var h=at(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var x=bt(h.pendingLanes);if(x!==0){var A=h;for(A.pendingLanes|=2,A.entangledLanes|=2;x;){var F=1<<31-Xt(x);A.entanglements[1]|=F,x&=~F}wi(h),(Le&6)===0&&(Vl=T()+500,xo(0))}}break;case 31:case 13:A=Ja(h,2),A!==null&&Vn(A,h,2),Xl(),ih(h,2)}if(h=sh(o),h===null&&Xf(e,i,o,rc,a),h===u)break;u=h}u!==null&&o.stopPropagation()}else Xf(e,i,o,null,a)}}function sh(e){return e=ru(e),rh(e)}var rc=null;function rh(e){if(rc=null,e=q(e),e!==null){var i=c(e);if(i===null)e=null;else{var a=i.tag;if(a===13){if(e=f(i),e!==null)return e;e=null}else if(a===31){if(e=d(i),e!==null)return e;e=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return rc=e,null}function I_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(J()){case ut:return 2;case Tt:return 8;case ft:case $t:return 32;case Lt:return 268435456;default:return 32}default:return 32}}var oh=!1,wa=null,Da=null,Ua=null,Ro=new Map,Co=new Map,La=[],nS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function B_(e,i){switch(e){case"focusin":case"focusout":wa=null;break;case"dragenter":case"dragleave":Da=null;break;case"mouseover":case"mouseout":Ua=null;break;case"pointerover":case"pointerout":Ro.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Co.delete(i.pointerId)}}function wo(e,i,a,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:i,domEventName:a,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},i!==null&&(i=at(i),i!==null&&P_(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function iS(e,i,a,o,u){switch(i){case"focusin":return wa=wo(wa,e,i,a,o,u),!0;case"dragenter":return Da=wo(Da,e,i,a,o,u),!0;case"mouseover":return Ua=wo(Ua,e,i,a,o,u),!0;case"pointerover":var h=u.pointerId;return Ro.set(h,wo(Ro.get(h)||null,e,i,a,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Co.set(h,wo(Co.get(h)||null,e,i,a,o,u)),!0}return!1}function F_(e){var i=q(e.target);if(i!==null){var a=c(i);if(a!==null){if(i=a.tag,i===13){if(i=f(a),i!==null){e.blockedOn=i,Hr(e.priority,function(){z_(a)});return}}else if(i===31){if(i=d(a),i!==null){e.blockedOn=i,Hr(e.priority,function(){z_(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function oc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var a=sh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);su=o,a.target.dispatchEvent(o),su=null}else return i=at(a),i!==null&&P_(i),e.blockedOn=a,!1;i.shift()}return!0}function H_(e,i,a){oc(e)&&a.delete(i)}function aS(){oh=!1,wa!==null&&oc(wa)&&(wa=null),Da!==null&&oc(Da)&&(Da=null),Ua!==null&&oc(Ua)&&(Ua=null),Ro.forEach(H_),Co.forEach(H_)}function lc(e,i){e.blockedOn===i&&(e.blockedOn=null,oh||(oh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,aS)))}var cc=null;function G_(e){cc!==e&&(cc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){cc===e&&(cc=null);for(var i=0;i<e.length;i+=3){var a=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(rh(o||a)===null)continue;break}var h=at(a);h!==null&&(e.splice(i,3),i-=3,sf(h,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function ur(e){function i(F){return lc(F,e)}wa!==null&&lc(wa,e),Da!==null&&lc(Da,e),Ua!==null&&lc(Ua,e),Ro.forEach(i),Co.forEach(i);for(var a=0;a<La.length;a++){var o=La[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<La.length&&(a=La[0],a.blockedOn===null);)F_(a),a.blockedOn===null&&La.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],h=a[o+1],x=u[Sn]||null;if(typeof h=="function")x||G_(a);else if(x){var A=null;if(h&&h.hasAttribute("formAction")){if(u=h,x=h[Sn]||null)A=x.formAction;else if(rh(u)!==null)continue}else A=x.action;typeof A=="function"?a[o+1]=A:(a.splice(o,3),o-=3),G_(a)}}}function V_(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(x){return u=x})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function lh(e){this._internalRoot=e}uc.prototype.render=lh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(s(409));var a=i.current,o=$n();N_(a,o,e,i,null,null)},uc.prototype.unmount=lh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;N_(e.current,2,null,e,null,null),Xl(),i[ua]=null}};function uc(e){this._internalRoot=e}uc.prototype.unstable_scheduleHydration=function(e){if(e){var i=qa();e={blockedOn:null,target:e,priority:i};for(var a=0;a<La.length&&i!==0&&i<La[a].priority;a++);La.splice(a,0,e),a===0&&F_(e)}};var k_=t.version;if(k_!=="19.2.8")throw Error(s(527,k_,"19.2.8"));K.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(i),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var sS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var fc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!fc.isDisabled&&fc.supportsFiber)try{Rt=fc.inject(sS),Nt=fc}catch{}}return Uo.createRoot=function(e,i){if(!l(e))throw Error(s(299));var a=!1,o="",u=Km,h=Qm,x=Jm;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(x=i.onRecoverableError)),i=U_(e,1,!1,null,null,a,o,null,u,h,x,V_),e[ua]=i.current,kf(e),new lh(i)},Uo.hydrateRoot=function(e,i,a){if(!l(e))throw Error(s(299));var o=!1,u="",h=Km,x=Qm,A=Jm,F=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(x=a.onCaughtError),a.onRecoverableError!==void 0&&(A=a.onRecoverableError),a.formState!==void 0&&(F=a.formState)),i=U_(e,1,!0,i,a??null,o,u,F,h,x,A,V_),i.context=L_(null),a=i.current,o=$n(),o=Ds(o),u=_a(o),u.callback=null,va(a,u,o),a=o,i.current.lanes=a,Un(i,a),wi(i),e[ua]=i.current,kf(e),new uc(i)},Uo.version="19.2.8",Uo}var $_;function mS(){if($_)return fh.exports;$_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),fh.exports=pS(),fh.exports}var LR=mS();const kd="180",wr={ROTATE:0,DOLLY:1,PAN:2},Ar={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},gS=0,tv=1,_S=2,u0=1,vS=2,ra=3,Xa=0,Xn=1,oa=2,Va=0,Dr=1,ev=2,nv=3,iv=4,yS=5,vs=100,xS=101,SS=102,MS=103,ES=104,TS=200,bS=201,AS=202,RS=203,Jh=204,$h=205,CS=206,wS=207,DS=208,US=209,LS=210,NS=211,OS=212,PS=213,zS=214,td=0,ed=1,nd=2,Lr=3,id=4,ad=5,sd=6,rd=7,Xd=0,IS=1,BS=2,ka=0,FS=1,HS=2,GS=3,VS=4,kS=5,XS=6,WS=7,f0=300,Nr=301,Or=302,od=303,ld=304,Jc=306,cd=1e3,xs=1001,ud=1002,Mi=1003,qS=1004,hc=1005,Ui=1006,mh=1007,Ss=1008,Pi=1009,h0=1010,d0=1011,Xo=1012,Wd=1013,Ms=1014,la=1015,$o=1016,qd=1017,Yd=1018,Wo=1020,p0=35902,m0=35899,g0=1021,_0=1022,Si=1023,qo=1026,Yo=1027,v0=1028,Zd=1029,y0=1030,jd=1031,Kd=1033,Gc=33776,Vc=33777,kc=33778,Xc=33779,fd=35840,hd=35841,dd=35842,pd=35843,md=36196,gd=37492,_d=37496,vd=37808,yd=37809,xd=37810,Sd=37811,Md=37812,Ed=37813,Td=37814,bd=37815,Ad=37816,Rd=37817,Cd=37818,wd=37819,Dd=37820,Ud=37821,Ld=36492,Nd=36494,Od=36495,Pd=36283,zd=36284,Id=36285,Bd=36286,YS=3200,ZS=3201,Qd=0,jS=1,Ga="",hi="srgb",Pr="srgb-linear",qc="linear",Ve="srgb",fr=7680,av=519,KS=512,QS=513,JS=514,x0=515,$S=516,tM=517,eM=518,nM=519,sv=35044,rv="300 es",Li=2e3,Yc=2001;class As{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(n)===-1&&s[t].push(n)}hasEventListener(t,n){const s=this._listeners;return s===void 0?!1:s[t]!==void 0&&s[t].indexOf(n)!==-1}removeEventListener(t,n){const s=this._listeners;if(s===void 0)return;const l=s[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const s=n[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ov=1234567;const Ho=Math.PI/180,Zo=180/Math.PI;function Rs(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(wn[r&255]+wn[r>>8&255]+wn[r>>16&255]+wn[r>>24&255]+"-"+wn[t&255]+wn[t>>8&255]+"-"+wn[t>>16&15|64]+wn[t>>24&255]+"-"+wn[n&63|128]+wn[n>>8&255]+"-"+wn[n>>16&255]+wn[n>>24&255]+wn[s&255]+wn[s>>8&255]+wn[s>>16&255]+wn[s>>24&255]).toLowerCase()}function _e(r,t,n){return Math.max(t,Math.min(n,r))}function Jd(r,t){return(r%t+t)%t}function iM(r,t,n,s,l){return s+(r-t)*(l-s)/(n-t)}function aM(r,t,n){return r!==t?(n-r)/(t-r):0}function Go(r,t,n){return(1-n)*r+n*t}function sM(r,t,n,s){return Go(r,t,1-Math.exp(-n*s))}function rM(r,t=1){return t-Math.abs(Jd(r,t*2)-t)}function oM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function lM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function cM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function uM(r,t){return r+Math.random()*(t-r)}function fM(r){return r*(.5-Math.random())}function hM(r){r!==void 0&&(ov=r);let t=ov+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function dM(r){return r*Ho}function pM(r){return r*Zo}function mM(r){return(r&r-1)===0&&r!==0}function gM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function _M(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function vM(r,t,n,s,l){const c=Math.cos,f=Math.sin,d=c(n/2),m=f(n/2),p=c((t+s)/2),g=f((t+s)/2),_=c((t-s)/2),y=f((t-s)/2),S=c((s-t)/2),E=f((s-t)/2);switch(l){case"XYX":r.set(d*g,m*_,m*y,d*p);break;case"YZY":r.set(m*y,d*g,m*_,d*p);break;case"ZXZ":r.set(m*_,m*y,d*g,d*p);break;case"XZX":r.set(d*g,m*E,m*S,d*p);break;case"YXY":r.set(m*S,d*g,m*E,d*p);break;case"ZYZ":r.set(m*E,m*S,d*g,d*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function br(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function On(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const yM={DEG2RAD:Ho,RAD2DEG:Zo,generateUUID:Rs,clamp:_e,euclideanModulo:Jd,mapLinear:iM,inverseLerp:aM,lerp:Go,damp:sM,pingpong:rM,smoothstep:oM,smootherstep:lM,randInt:cM,randFloat:uM,randFloatSpread:fM,seededRandom:hM,degToRad:dM,radToDeg:pM,isPowerOfTwo:mM,ceilPowerOfTwo:gM,floorPowerOfTwo:_M,setQuaternionFromProperEuler:vM,normalize:On,denormalize:br};class Ut{constructor(t=0,n=0){Ut.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,s=this.y,l=t.elements;return this.x=l[0]*n+l[3]*s+l[6],this.y=l[1]*n+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=_e(this.x,t.x,n.x),this.y=_e(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=_e(this.x,t,n),this.y=_e(this.y,t,n),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(_e(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y;return n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const s=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*s-f*l+t.x,this.y=c*l+f*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Es{constructor(t=0,n=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=s,this._w=l}static slerpFlat(t,n,s,l,c,f,d){let m=s[l+0],p=s[l+1],g=s[l+2],_=s[l+3];const y=c[f+0],S=c[f+1],E=c[f+2],b=c[f+3];if(d===0){t[n+0]=m,t[n+1]=p,t[n+2]=g,t[n+3]=_;return}if(d===1){t[n+0]=y,t[n+1]=S,t[n+2]=E,t[n+3]=b;return}if(_!==b||m!==y||p!==S||g!==E){let M=1-d;const v=m*y+p*S+g*E+_*b,z=v>=0?1:-1,U=1-v*v;if(U>Number.EPSILON){const H=Math.sqrt(U),P=Math.atan2(H,v*z);M=Math.sin(M*P)/H,d=Math.sin(d*P)/H}const R=d*z;if(m=m*M+y*R,p=p*M+S*R,g=g*M+E*R,_=_*M+b*R,M===1-d){const H=1/Math.sqrt(m*m+p*p+g*g+_*_);m*=H,p*=H,g*=H,_*=H}}t[n]=m,t[n+1]=p,t[n+2]=g,t[n+3]=_}static multiplyQuaternionsFlat(t,n,s,l,c,f){const d=s[l],m=s[l+1],p=s[l+2],g=s[l+3],_=c[f],y=c[f+1],S=c[f+2],E=c[f+3];return t[n]=d*E+g*_+m*S-p*y,t[n+1]=m*E+g*y+p*_-d*S,t[n+2]=p*E+g*S+d*y-m*_,t[n+3]=g*E-d*_-m*y-p*S,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,s,l){return this._x=t,this._y=n,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const s=t._x,l=t._y,c=t._z,f=t._order,d=Math.cos,m=Math.sin,p=d(s/2),g=d(l/2),_=d(c/2),y=m(s/2),S=m(l/2),E=m(c/2);switch(f){case"XYZ":this._x=y*g*_+p*S*E,this._y=p*S*_-y*g*E,this._z=p*g*E+y*S*_,this._w=p*g*_-y*S*E;break;case"YXZ":this._x=y*g*_+p*S*E,this._y=p*S*_-y*g*E,this._z=p*g*E-y*S*_,this._w=p*g*_+y*S*E;break;case"ZXY":this._x=y*g*_-p*S*E,this._y=p*S*_+y*g*E,this._z=p*g*E+y*S*_,this._w=p*g*_-y*S*E;break;case"ZYX":this._x=y*g*_-p*S*E,this._y=p*S*_+y*g*E,this._z=p*g*E-y*S*_,this._w=p*g*_+y*S*E;break;case"YZX":this._x=y*g*_+p*S*E,this._y=p*S*_+y*g*E,this._z=p*g*E-y*S*_,this._w=p*g*_-y*S*E;break;case"XZY":this._x=y*g*_-p*S*E,this._y=p*S*_-y*g*E,this._z=p*g*E+y*S*_,this._w=p*g*_+y*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const s=n/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,s=n[0],l=n[4],c=n[8],f=n[1],d=n[5],m=n[9],p=n[2],g=n[6],_=n[10],y=s+d+_;if(y>0){const S=.5/Math.sqrt(y+1);this._w=.25/S,this._x=(g-m)*S,this._y=(c-p)*S,this._z=(f-l)*S}else if(s>d&&s>_){const S=2*Math.sqrt(1+s-d-_);this._w=(g-m)/S,this._x=.25*S,this._y=(l+f)/S,this._z=(c+p)/S}else if(d>_){const S=2*Math.sqrt(1+d-s-_);this._w=(c-p)/S,this._x=(l+f)/S,this._y=.25*S,this._z=(m+g)/S}else{const S=2*Math.sqrt(1+_-s-d);this._w=(f-l)/S,this._x=(c+p)/S,this._y=(m+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let s=t.dot(n)+1;return s<1e-8?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(_e(this.dot(t),-1,1)))}rotateTowards(t,n){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,n/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const s=t._x,l=t._y,c=t._z,f=t._w,d=n._x,m=n._y,p=n._z,g=n._w;return this._x=s*g+f*d+l*p-c*m,this._y=l*g+f*m+c*d-s*p,this._z=c*g+f*p+s*m-l*d,this._w=f*g-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,f=this._w;let d=f*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=f,this._x=s,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const S=1-n;return this._w=S*f+n*this._w,this._x=S*s+n*this._x,this._y=S*l+n*this._y,this._z=S*c+n*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),_=Math.sin((1-n)*g)/p,y=Math.sin(n*g)/p;return this._w=f*_+this._w*y,this._x=s*_+this._x*y,this._y=l*_+this._y*y,this._z=c*_+this._z*y,this._onChangeCallback(),this}slerpQuaternions(t,n,s){return this.copy(t).slerp(n,s)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,n=0,s=0){V.prototype.isVector3=!0,this.x=t,this.y=n,this.z=s}set(t,n,s){return s===void 0&&(s=this.z),this.x=t,this.y=n,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(lv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(lv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*s+c[6]*l,this.y=c[1]*n+c[4]*s+c[7]*l,this.z=c[2]*n+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,s=this.y,l=this.z,c=t.x,f=t.y,d=t.z,m=t.w,p=2*(f*l-d*s),g=2*(d*n-c*l),_=2*(c*s-f*n);return this.x=n+m*p+f*_-d*g,this.y=s+m*g+d*p-c*_,this.z=l+m*_+c*g-f*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*s+c[8]*l,this.y=c[1]*n+c[5]*s+c[9]*l,this.z=c[2]*n+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=_e(this.x,t.x,n.x),this.y=_e(this.y,t.y,n.y),this.z=_e(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=_e(this.x,t,n),this.y=_e(this.y,t,n),this.z=_e(this.z,t,n),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const s=t.x,l=t.y,c=t.z,f=n.x,d=n.y,m=n.z;return this.x=l*m-c*d,this.y=c*f-s*m,this.z=s*d-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const s=t.dot(this)/n;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return gh.copy(this).projectOnVector(t),this.sub(gh)}reflect(t){return this.sub(gh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(t)/n;return Math.acos(_e(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return n*n+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,s){const l=Math.sin(n)*t;return this.x=l*Math.sin(s),this.y=Math.cos(n)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,s){return this.x=t*Math.sin(n),this.y=s,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=s,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,s=Math.sqrt(1-n*n);return this.x=s*Math.cos(t),this.y=n,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gh=new V,lv=new Es;class me{constructor(t,n,s,l,c,f,d,m,p){me.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,d,m,p)}set(t,n,s,l,c,f,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=n,g[4]=c,g[5]=m,g[6]=s,g[7]=f,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],this}extractBasis(t,n,s){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],d=s[3],m=s[6],p=s[1],g=s[4],_=s[7],y=s[2],S=s[5],E=s[8],b=l[0],M=l[3],v=l[6],z=l[1],U=l[4],R=l[7],H=l[2],P=l[5],I=l[8];return c[0]=f*b+d*z+m*H,c[3]=f*M+d*U+m*P,c[6]=f*v+d*R+m*I,c[1]=p*b+g*z+_*H,c[4]=p*M+g*U+_*P,c[7]=p*v+g*R+_*I,c[2]=y*b+S*z+E*H,c[5]=y*M+S*U+E*P,c[8]=y*v+S*R+E*I,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return n*f*g-n*d*p-s*c*g+s*d*m+l*c*p-l*f*m}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=g*f-d*p,y=d*m-g*c,S=p*c-f*m,E=n*_+s*y+l*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/E;return t[0]=_*b,t[1]=(l*p-g*s)*b,t[2]=(d*s-l*f)*b,t[3]=y*b,t[4]=(g*n-l*m)*b,t[5]=(l*c-d*n)*b,t[6]=S*b,t[7]=(s*m-p*n)*b,t[8]=(f*n-s*c)*b,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,s,l,c,f,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*d)+f+t,-l*p,l*m,-l*(-p*f+m*d)+d+n,0,0,1),this}scale(t,n){return this.premultiply(_h.makeScale(t,n)),this}rotate(t){return this.premultiply(_h.makeRotation(-t)),this}translate(t,n){return this.premultiply(_h.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,s,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<9;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<9;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const _h=new me;function S0(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Zc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function xM(){const r=Zc("canvas");return r.style.display="block",r}const cv={};function jo(r){r in cv||(cv[r]=!0,console.warn(r))}function SM(r,t,n){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:s()}}setTimeout(c,n)})}const uv=new me().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fv=new me().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function MM(){const r={enabled:!0,workingColorSpace:Pr,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Ve&&(l.r=ca(l.r),l.g=ca(l.g),l.b=ca(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Ve&&(l.r=Ur(l.r),l.g=Ur(l.g),l.b=Ur(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ga?qc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return jo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return jo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Pr]:{primaries:t,whitePoint:s,transfer:qc,toXYZ:uv,fromXYZ:fv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:hi},outputColorSpaceConfig:{drawingBufferColorSpace:hi}},[hi]:{primaries:t,whitePoint:s,transfer:Ve,toXYZ:uv,fromXYZ:fv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:hi}}}),r}const Ue=MM();function ca(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ur(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let hr;class EM{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let s;if(t instanceof HTMLCanvasElement)s=t;else{hr===void 0&&(hr=Zc("canvas")),hr.width=t.width,hr.height=t.height;const l=hr.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),s=hr}return s.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Zc("canvas");n.width=t.width,n.height=t.height;const s=n.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=ca(c[f]/255)*255;return s.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let s=0;s<n.length;s++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[s]=Math.floor(ca(n[s]/255)*255):n[s]=ca(n[s]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let TM=0;class $d{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:TM++}),this.uuid=Rs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,d=l.length;f<d;f++)l[f].isDataTexture?c.push(vh(l[f].image)):c.push(vh(l[f]))}else c=vh(l);s.url=c}return n||(t.images[this.uuid]=s),s}}function vh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?EM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bM=0;const yh=new V;class Wn extends As{constructor(t=Wn.DEFAULT_IMAGE,n=Wn.DEFAULT_MAPPING,s=xs,l=xs,c=Ui,f=Ss,d=Si,m=Pi,p=Wn.DEFAULT_ANISOTROPY,g=Ga){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bM++}),this.uuid=Rs(),this.name="",this.source=new $d(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new me,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(yh).x}get height(){return this.source.getSize(yh).y}get depth(){return this.source.getSize(yh).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const s=t[n];if(s===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[n]=s}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),n||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==f0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case cd:t.x=t.x-Math.floor(t.x);break;case xs:t.x=t.x<0?0:1;break;case ud:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case cd:t.y=t.y-Math.floor(t.y);break;case xs:t.y=t.y<0?0:1;break;case ud:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Wn.DEFAULT_IMAGE=null;Wn.DEFAULT_MAPPING=f0;Wn.DEFAULT_ANISOTROPY=1;class Xe{constructor(t=0,n=0,s=0,l=1){Xe.prototype.isVector4=!0,this.x=t,this.y=n,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,s,l){return this.x=t,this.y=n,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,s=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*s+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,s,l,c;const m=t.elements,p=m[0],g=m[4],_=m[8],y=m[1],S=m[5],E=m[9],b=m[2],M=m[6],v=m[10];if(Math.abs(g-y)<.01&&Math.abs(_-b)<.01&&Math.abs(E-M)<.01){if(Math.abs(g+y)<.1&&Math.abs(_+b)<.1&&Math.abs(E+M)<.1&&Math.abs(p+S+v-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const U=(p+1)/2,R=(S+1)/2,H=(v+1)/2,P=(g+y)/4,I=(_+b)/4,X=(E+M)/4;return U>R&&U>H?U<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(U),l=P/s,c=I/s):R>H?R<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(R),s=P/l,c=X/l):H<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(H),s=I/c,l=X/c),this.set(s,l,c,n),this}let z=Math.sqrt((M-E)*(M-E)+(_-b)*(_-b)+(y-g)*(y-g));return Math.abs(z)<.001&&(z=1),this.x=(M-E)/z,this.y=(_-b)/z,this.z=(y-g)/z,this.w=Math.acos((p+S+v-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=_e(this.x,t.x,n.x),this.y=_e(this.y,t.y,n.y),this.z=_e(this.z,t.z,n.z),this.w=_e(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=_e(this.x,t,n),this.y=_e(this.y,t,n),this.z=_e(this.z,t,n),this.w=_e(this.w,t,n),this}clampLength(t,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,s){return this.x=t.x+(n.x-t.x)*s,this.y=t.y+(n.y-t.y)*s,this.z=t.z+(n.z-t.z)*s,this.w=t.w+(n.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class AM extends As{constructor(t=1,n=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ui,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=s.depth,this.scissor=new Xe(0,0,t,n),this.scissorTest=!1,this.viewport=new Xe(0,0,t,n);const l={width:t,height:n,depth:s.depth},c=new Wn(l);this.textures=[];const f=s.count;for(let d=0;d<f;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(t={}){const n={minFilter:Ui,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,s=1){if(this.width!==t||this.height!==n||this.depth!==s){this.width=t,this.height=n,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=s,this.textures[l].isArrayTexture=this.textures[l].image.depth>1;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const l=Object.assign({},t.textures[n].image);this.textures[n].source=new $d(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ts extends AM{constructor(t=1,n=1,s={}){super(t,n,s),this.isWebGLRenderTarget=!0}}class M0 extends Wn{constructor(t=null,n=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=Mi,this.minFilter=Mi,this.wrapR=xs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class RM extends Wn{constructor(t=null,n=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:s,depth:l},this.magFilter=Mi,this.minFilter=Mi,this.wrapR=xs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tl{constructor(t=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n+=3)this.expandByPoint(_i.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,s=t.count;n<s;n++)this.expandByPoint(_i.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,s=t.length;n<s;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const s=_i.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,d=c.count;f<d;f++)t.isMesh===!0?t.getVertexPosition(f,_i):_i.fromBufferAttribute(c,f),_i.applyMatrix4(t.matrixWorld),this.expandByPoint(_i);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),dc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),dc.copy(s.boundingBox)),dc.applyMatrix4(t.matrixWorld),this.union(dc)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_i),_i.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,s;return t.normal.x>0?(n=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),n<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Lo),pc.subVectors(this.max,Lo),dr.subVectors(t.a,Lo),pr.subVectors(t.b,Lo),mr.subVectors(t.c,Lo),Oa.subVectors(pr,dr),Pa.subVectors(mr,pr),fs.subVectors(dr,mr);let n=[0,-Oa.z,Oa.y,0,-Pa.z,Pa.y,0,-fs.z,fs.y,Oa.z,0,-Oa.x,Pa.z,0,-Pa.x,fs.z,0,-fs.x,-Oa.y,Oa.x,0,-Pa.y,Pa.x,0,-fs.y,fs.x,0];return!xh(n,dr,pr,mr,pc)||(n=[1,0,0,0,1,0,0,0,1],!xh(n,dr,pr,mr,pc))?!1:(mc.crossVectors(Oa,Pa),n=[mc.x,mc.y,mc.z],xh(n,dr,pr,mr,pc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_i).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_i).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ea[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ea[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ea[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ea[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ea[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ea[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ea[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ea[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ea),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const ea=[new V,new V,new V,new V,new V,new V,new V,new V],_i=new V,dc=new tl,dr=new V,pr=new V,mr=new V,Oa=new V,Pa=new V,fs=new V,Lo=new V,pc=new V,mc=new V,hs=new V;function xh(r,t,n,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){hs.fromArray(r,c);const d=l.x*Math.abs(hs.x)+l.y*Math.abs(hs.y)+l.z*Math.abs(hs.z),m=t.dot(hs),p=n.dot(hs),g=s.dot(hs);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const CM=new tl,No=new V,Sh=new V;class $c{constructor(t=new V,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const s=this.center;n!==void 0?s.copy(n):CM.setFromPoints(t).getCenter(s);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const s=this.center.distanceToSquared(t);return n.copy(t),s>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;No.subVectors(t,this.center);const n=No.lengthSq();if(n>this.radius*this.radius){const s=Math.sqrt(n),l=(s-this.radius)*.5;this.center.addScaledVector(No,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(No.copy(t.center).add(Sh)),this.expandByPoint(No.copy(t.center).sub(Sh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const na=new V,Mh=new V,gc=new V,za=new V,Eh=new V,_c=new V,Th=new V;class tp{constructor(t=new V,n=new V(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,na)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const s=n.dot(this.direction);return s<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=na.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(na.copy(this.origin).addScaledVector(this.direction,n),na.distanceToSquared(t))}distanceSqToSegment(t,n,s,l){Mh.copy(t).add(n).multiplyScalar(.5),gc.copy(n).sub(t).normalize(),za.copy(this.origin).sub(Mh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(gc),d=za.dot(this.direction),m=-za.dot(gc),p=za.lengthSq(),g=Math.abs(1-f*f);let _,y,S,E;if(g>0)if(_=f*m-d,y=f*d-m,E=c*g,_>=0)if(y>=-E)if(y<=E){const b=1/g;_*=b,y*=b,S=_*(_+f*y+2*d)+y*(f*_+y+2*m)+p}else y=c,_=Math.max(0,-(f*y+d)),S=-_*_+y*(y+2*m)+p;else y=-c,_=Math.max(0,-(f*y+d)),S=-_*_+y*(y+2*m)+p;else y<=-E?(_=Math.max(0,-(-f*c+d)),y=_>0?-c:Math.min(Math.max(-c,-m),c),S=-_*_+y*(y+2*m)+p):y<=E?(_=0,y=Math.min(Math.max(-c,-m),c),S=y*(y+2*m)+p):(_=Math.max(0,-(f*c+d)),y=_>0?c:Math.min(Math.max(-c,-m),c),S=-_*_+y*(y+2*m)+p);else y=f>0?-c:c,_=Math.max(0,-(f*y+d)),S=-_*_+y*(y+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Mh).addScaledVector(gc,y),S}intersectSphere(t,n){na.subVectors(t.center,this.origin);const s=na.dot(this.direction),l=na.dot(na)-s*s,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),d=s-f,m=s+f;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/n;return s>=0?s:null}intersectPlane(t,n){const s=this.distanceToPlane(t);return s===null?null:this.at(s,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let s,l,c,f,d,m;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,y=this.origin;return p>=0?(s=(t.min.x-y.x)*p,l=(t.max.x-y.x)*p):(s=(t.max.x-y.x)*p,l=(t.min.x-y.x)*p),g>=0?(c=(t.min.y-y.y)*g,f=(t.max.y-y.y)*g):(c=(t.max.y-y.y)*g,f=(t.min.y-y.y)*g),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(d=(t.min.z-y.z)*_,m=(t.max.z-y.z)*_):(d=(t.max.z-y.z)*_,m=(t.min.z-y.z)*_),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,n)}intersectsBox(t){return this.intersectBox(t,na)!==null}intersectTriangle(t,n,s,l,c){Eh.subVectors(n,t),_c.subVectors(s,t),Th.crossVectors(Eh,_c);let f=this.direction.dot(Th),d;if(f>0){if(l)return null;d=1}else if(f<0)d=-1,f=-f;else return null;za.subVectors(this.origin,t);const m=d*this.direction.dot(_c.crossVectors(za,_c));if(m<0)return null;const p=d*this.direction.dot(Eh.cross(za));if(p<0||m+p>f)return null;const g=-d*za.dot(Th);return g<0?null:this.at(g/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Je{constructor(t,n,s,l,c,f,d,m,p,g,_,y,S,E,b,M){Je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,s,l,c,f,d,m,p,g,_,y,S,E,b,M)}set(t,n,s,l,c,f,d,m,p,g,_,y,S,E,b,M){const v=this.elements;return v[0]=t,v[4]=n,v[8]=s,v[12]=l,v[1]=c,v[5]=f,v[9]=d,v[13]=m,v[2]=p,v[6]=g,v[10]=_,v[14]=y,v[3]=S,v[7]=E,v[11]=b,v[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(t){const n=this.elements,s=t.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],n[9]=s[9],n[10]=s[10],n[11]=s[11],n[12]=s[12],n[13]=s[13],n[14]=s[14],n[15]=s[15],this}copyPosition(t){const n=this.elements,s=t.elements;return n[12]=s[12],n[13]=s[13],n[14]=s[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,s){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,n,s){return this.set(t.x,n.x,s.x,0,t.y,n.y,s.y,0,t.z,n.z,s.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,s=t.elements,l=1/gr.setFromMatrixColumn(t,0).length(),c=1/gr.setFromMatrixColumn(t,1).length(),f=1/gr.setFromMatrixColumn(t,2).length();return n[0]=s[0]*l,n[1]=s[1]*l,n[2]=s[2]*l,n[3]=0,n[4]=s[4]*c,n[5]=s[5]*c,n[6]=s[6]*c,n[7]=0,n[8]=s[8]*f,n[9]=s[9]*f,n[10]=s[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,s=t.x,l=t.y,c=t.z,f=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const y=f*g,S=f*_,E=d*g,b=d*_;n[0]=m*g,n[4]=-m*_,n[8]=p,n[1]=S+E*p,n[5]=y-b*p,n[9]=-d*m,n[2]=b-y*p,n[6]=E+S*p,n[10]=f*m}else if(t.order==="YXZ"){const y=m*g,S=m*_,E=p*g,b=p*_;n[0]=y+b*d,n[4]=E*d-S,n[8]=f*p,n[1]=f*_,n[5]=f*g,n[9]=-d,n[2]=S*d-E,n[6]=b+y*d,n[10]=f*m}else if(t.order==="ZXY"){const y=m*g,S=m*_,E=p*g,b=p*_;n[0]=y-b*d,n[4]=-f*_,n[8]=E+S*d,n[1]=S+E*d,n[5]=f*g,n[9]=b-y*d,n[2]=-f*p,n[6]=d,n[10]=f*m}else if(t.order==="ZYX"){const y=f*g,S=f*_,E=d*g,b=d*_;n[0]=m*g,n[4]=E*p-S,n[8]=y*p+b,n[1]=m*_,n[5]=b*p+y,n[9]=S*p-E,n[2]=-p,n[6]=d*m,n[10]=f*m}else if(t.order==="YZX"){const y=f*m,S=f*p,E=d*m,b=d*p;n[0]=m*g,n[4]=b-y*_,n[8]=E*_+S,n[1]=_,n[5]=f*g,n[9]=-d*g,n[2]=-p*g,n[6]=S*_+E,n[10]=y-b*_}else if(t.order==="XZY"){const y=f*m,S=f*p,E=d*m,b=d*p;n[0]=m*g,n[4]=-_,n[8]=p*g,n[1]=y*_+b,n[5]=f*g,n[9]=S*_-E,n[2]=E*_-S,n[6]=d*g,n[10]=b*_+y}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(wM,t,DM)}lookAt(t,n,s){const l=this.elements;return ti.subVectors(t,n),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),Ia.crossVectors(s,ti),Ia.lengthSq()===0&&(Math.abs(s.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),Ia.crossVectors(s,ti)),Ia.normalize(),vc.crossVectors(ti,Ia),l[0]=Ia.x,l[4]=vc.x,l[8]=ti.x,l[1]=Ia.y,l[5]=vc.y,l[9]=ti.y,l[2]=Ia.z,l[6]=vc.z,l[10]=ti.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const s=t.elements,l=n.elements,c=this.elements,f=s[0],d=s[4],m=s[8],p=s[12],g=s[1],_=s[5],y=s[9],S=s[13],E=s[2],b=s[6],M=s[10],v=s[14],z=s[3],U=s[7],R=s[11],H=s[15],P=l[0],I=l[4],X=l[8],D=l[12],w=l[1],G=l[5],Q=l[9],rt=l[13],lt=l[2],ct=l[6],O=l[10],K=l[14],Y=l[3],St=l[7],At=l[11],N=l[15];return c[0]=f*P+d*w+m*lt+p*Y,c[4]=f*I+d*G+m*ct+p*St,c[8]=f*X+d*Q+m*O+p*At,c[12]=f*D+d*rt+m*K+p*N,c[1]=g*P+_*w+y*lt+S*Y,c[5]=g*I+_*G+y*ct+S*St,c[9]=g*X+_*Q+y*O+S*At,c[13]=g*D+_*rt+y*K+S*N,c[2]=E*P+b*w+M*lt+v*Y,c[6]=E*I+b*G+M*ct+v*St,c[10]=E*X+b*Q+M*O+v*At,c[14]=E*D+b*rt+M*K+v*N,c[3]=z*P+U*w+R*lt+H*Y,c[7]=z*I+U*G+R*ct+H*St,c[11]=z*X+U*Q+R*O+H*At,c[15]=z*D+U*rt+R*K+H*N,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],s=t[4],l=t[8],c=t[12],f=t[1],d=t[5],m=t[9],p=t[13],g=t[2],_=t[6],y=t[10],S=t[14],E=t[3],b=t[7],M=t[11],v=t[15];return E*(+c*m*_-l*p*_-c*d*y+s*p*y+l*d*S-s*m*S)+b*(+n*m*S-n*p*y+c*f*y-l*f*S+l*p*g-c*m*g)+M*(+n*p*_-n*d*S-c*f*_+s*f*S+c*d*g-s*p*g)+v*(-l*d*g-n*m*_+n*d*y+l*f*_-s*f*y+s*m*g)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=s),this}invert(){const t=this.elements,n=t[0],s=t[1],l=t[2],c=t[3],f=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=t[9],y=t[10],S=t[11],E=t[12],b=t[13],M=t[14],v=t[15],z=_*M*p-b*y*p+b*m*S-d*M*S-_*m*v+d*y*v,U=E*y*p-g*M*p-E*m*S+f*M*S+g*m*v-f*y*v,R=g*b*p-E*_*p+E*d*S-f*b*S-g*d*v+f*_*v,H=E*_*m-g*b*m-E*d*y+f*b*y+g*d*M-f*_*M,P=n*z+s*U+l*R+c*H;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/P;return t[0]=z*I,t[1]=(b*y*c-_*M*c-b*l*S+s*M*S+_*l*v-s*y*v)*I,t[2]=(d*M*c-b*m*c+b*l*p-s*M*p-d*l*v+s*m*v)*I,t[3]=(_*m*c-d*y*c-_*l*p+s*y*p+d*l*S-s*m*S)*I,t[4]=U*I,t[5]=(g*M*c-E*y*c+E*l*S-n*M*S-g*l*v+n*y*v)*I,t[6]=(E*m*c-f*M*c-E*l*p+n*M*p+f*l*v-n*m*v)*I,t[7]=(f*y*c-g*m*c+g*l*p-n*y*p-f*l*S+n*m*S)*I,t[8]=R*I,t[9]=(E*_*c-g*b*c-E*s*S+n*b*S+g*s*v-n*_*v)*I,t[10]=(f*b*c-E*d*c+E*s*p-n*b*p-f*s*v+n*d*v)*I,t[11]=(g*d*c-f*_*c-g*s*p+n*_*p+f*s*S-n*d*S)*I,t[12]=H*I,t[13]=(g*b*l-E*_*l+E*s*y-n*b*y-g*s*M+n*_*M)*I,t[14]=(E*d*l-f*b*l-E*s*m+n*b*m+f*s*M-n*d*M)*I,t[15]=(f*_*l-g*d*l+g*s*m-n*_*m-f*s*y+n*d*y)*I,this}scale(t){const n=this.elements,s=t.x,l=t.y,c=t.z;return n[0]*=s,n[4]*=l,n[8]*=c,n[1]*=s,n[5]*=l,n[9]*=c,n[2]*=s,n[6]*=l,n[10]*=c,n[3]*=s,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,s,l))}makeTranslation(t,n,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,s,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,n,-s,0,0,s,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,0,s,0,0,1,0,0,-s,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),s=Math.sin(t);return this.set(n,-s,0,0,s,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const s=Math.cos(n),l=Math.sin(n),c=1-s,f=t.x,d=t.y,m=t.z,p=c*f,g=c*d;return this.set(p*f+s,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+s,g*m-l*f,0,p*m-l*d,g*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(t,n,s){return this.set(t,0,0,0,0,n,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,n,s,l,c,f){return this.set(1,s,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,s){const l=this.elements,c=n._x,f=n._y,d=n._z,m=n._w,p=c+c,g=f+f,_=d+d,y=c*p,S=c*g,E=c*_,b=f*g,M=f*_,v=d*_,z=m*p,U=m*g,R=m*_,H=s.x,P=s.y,I=s.z;return l[0]=(1-(b+v))*H,l[1]=(S+R)*H,l[2]=(E-U)*H,l[3]=0,l[4]=(S-R)*P,l[5]=(1-(y+v))*P,l[6]=(M+z)*P,l[7]=0,l[8]=(E+U)*I,l[9]=(M-z)*I,l[10]=(1-(y+b))*I,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,s){const l=this.elements;let c=gr.set(l[0],l[1],l[2]).length();const f=gr.set(l[4],l[5],l[6]).length(),d=gr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],vi.copy(this);const p=1/c,g=1/f,_=1/d;return vi.elements[0]*=p,vi.elements[1]*=p,vi.elements[2]*=p,vi.elements[4]*=g,vi.elements[5]*=g,vi.elements[6]*=g,vi.elements[8]*=_,vi.elements[9]*=_,vi.elements[10]*=_,n.setFromRotationMatrix(vi),s.x=c,s.y=f,s.z=d,this}makePerspective(t,n,s,l,c,f,d=Li,m=!1){const p=this.elements,g=2*c/(n-t),_=2*c/(s-l),y=(n+t)/(n-t),S=(s+l)/(s-l);let E,b;if(m)E=c/(f-c),b=f*c/(f-c);else if(d===Li)E=-(f+c)/(f-c),b=-2*f*c/(f-c);else if(d===Yc)E=-f/(f-c),b=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=y,p[12]=0,p[1]=0,p[5]=_,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=b,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,s,l,c,f,d=Li,m=!1){const p=this.elements,g=2/(n-t),_=2/(s-l),y=-(n+t)/(n-t),S=-(s+l)/(s-l);let E,b;if(m)E=1/(f-c),b=f/(f-c);else if(d===Li)E=-2/(f-c),b=-(f+c)/(f-c);else if(d===Yc)E=-1/(f-c),b=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=0,p[12]=y,p[1]=0,p[5]=_,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=E,p[14]=b,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,s=t.elements;for(let l=0;l<16;l++)if(n[l]!==s[l])return!1;return!0}fromArray(t,n=0){for(let s=0;s<16;s++)this.elements[s]=t[s+n];return this}toArray(t=[],n=0){const s=this.elements;return t[n]=s[0],t[n+1]=s[1],t[n+2]=s[2],t[n+3]=s[3],t[n+4]=s[4],t[n+5]=s[5],t[n+6]=s[6],t[n+7]=s[7],t[n+8]=s[8],t[n+9]=s[9],t[n+10]=s[10],t[n+11]=s[11],t[n+12]=s[12],t[n+13]=s[13],t[n+14]=s[14],t[n+15]=s[15],t}}const gr=new V,vi=new Je,wM=new V(0,0,0),DM=new V(1,1,1),Ia=new V,vc=new V,ti=new V,hv=new Je,dv=new Es;class Ei{constructor(t=0,n=0,s=0,l=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,s,l=this._order){return this._x=t,this._y=n,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,s=!0){const l=t.elements,c=l[0],f=l[4],d=l[8],m=l[1],p=l[5],g=l[9],_=l[2],y=l[6],S=l[10];switch(n){case"XYZ":this._y=Math.asin(_e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(y,p),this._z=0);break;case"YXZ":this._x=Math.asin(-_e(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(_e(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-_e(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(y,S),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(_e(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-_e(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(y,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,s){return hv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hv,n,s)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return dv.setFromEuler(this),this.setFromQuaternion(dv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class E0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let UM=0;const pv=new V,_r=new Es,ia=new Je,yc=new V,Oo=new V,LM=new V,NM=new Es,mv=new V(1,0,0),gv=new V(0,1,0),_v=new V(0,0,1),vv={type:"added"},OM={type:"removed"},vr={type:"childadded",child:null},bh={type:"childremoved",child:null};class mn extends As{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:UM++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mn.DEFAULT_UP.clone();const t=new V,n=new Ei,s=new Es,l=new V(1,1,1);function c(){s.setFromEuler(n,!1)}function f(){n.setFromQuaternion(s,void 0,!1)}n._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Je},normalMatrix:{value:new me}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new E0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return _r.setFromAxisAngle(t,n),this.quaternion.multiply(_r),this}rotateOnWorldAxis(t,n){return _r.setFromAxisAngle(t,n),this.quaternion.premultiply(_r),this}rotateX(t){return this.rotateOnAxis(mv,t)}rotateY(t){return this.rotateOnAxis(gv,t)}rotateZ(t){return this.rotateOnAxis(_v,t)}translateOnAxis(t,n){return pv.copy(t).applyQuaternion(this.quaternion),this.position.add(pv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(mv,t)}translateY(t){return this.translateOnAxis(gv,t)}translateZ(t){return this.translateOnAxis(_v,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ia.copy(this.matrixWorld).invert())}lookAt(t,n,s){t.isVector3?yc.copy(t):yc.set(t,n,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ia.lookAt(Oo,yc,this.up):ia.lookAt(yc,Oo,this.up),this.quaternion.setFromRotationMatrix(ia),l&&(ia.extractRotation(l.matrixWorld),_r.setFromRotationMatrix(ia),this.quaternion.premultiply(_r.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vv),vr.child=t,this.dispatchEvent(vr),vr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(OM),bh.child=t,this.dispatchEvent(bh),bh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ia.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ia.multiply(t.parent.matrixWorld)),t.applyMatrix4(ia),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vv),vr.child=t,this.dispatchEvent(vr),vr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,s=[]){this[t]===n&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,t,LM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,NM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].updateMatrixWorld(t)}updateWorldMatrix(t,n){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",s={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const _=m[p];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(n){const d=f(t.geometries),m=f(t.materials),p=f(t.textures),g=f(t.images),_=f(t.shapes),y=f(t.skeletons),S=f(t.animations),E=f(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),_.length>0&&(s.shapes=_),y.length>0&&(s.skeletons=y),S.length>0&&(s.animations=S),E.length>0&&(s.nodes=E)}return s.object=l,s;function f(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}mn.DEFAULT_UP=new V(0,1,0);mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yi=new V,aa=new V,Ah=new V,sa=new V,yr=new V,xr=new V,yv=new V,Rh=new V,Ch=new V,wh=new V,Dh=new Xe,Uh=new Xe,Lh=new Xe;class xi{constructor(t=new V,n=new V,s=new V){this.a=t,this.b=n,this.c=s}static getNormal(t,n,s,l){l.subVectors(s,n),yi.subVectors(t,n),l.cross(yi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,s,l,c){yi.subVectors(l,n),aa.subVectors(s,n),Ah.subVectors(t,n);const f=yi.dot(yi),d=yi.dot(aa),m=yi.dot(Ah),p=aa.dot(aa),g=aa.dot(Ah),_=f*p-d*d;if(_===0)return c.set(0,0,0),null;const y=1/_,S=(p*m-d*g)*y,E=(f*g-d*m)*y;return c.set(1-S-E,E,S)}static containsPoint(t,n,s,l){return this.getBarycoord(t,n,s,l,sa)===null?!1:sa.x>=0&&sa.y>=0&&sa.x+sa.y<=1}static getInterpolation(t,n,s,l,c,f,d,m){return this.getBarycoord(t,n,s,l,sa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,sa.x),m.addScaledVector(f,sa.y),m.addScaledVector(d,sa.z),m)}static getInterpolatedAttribute(t,n,s,l,c,f){return Dh.setScalar(0),Uh.setScalar(0),Lh.setScalar(0),Dh.fromBufferAttribute(t,n),Uh.fromBufferAttribute(t,s),Lh.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(Dh,c.x),f.addScaledVector(Uh,c.y),f.addScaledVector(Lh,c.z),f}static isFrontFacing(t,n,s,l){return yi.subVectors(s,n),aa.subVectors(t,n),yi.cross(aa).dot(l)<0}set(t,n,s){return this.a.copy(t),this.b.copy(n),this.c.copy(s),this}setFromPointsAndIndices(t,n,s,l){return this.a.copy(t[n]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,s,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yi.subVectors(this.c,this.b),aa.subVectors(this.a,this.b),yi.cross(aa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return xi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,s,l,c){return xi.getInterpolation(t,this.a,this.b,this.c,n,s,l,c)}containsPoint(t){return xi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const s=this.a,l=this.b,c=this.c;let f,d;yr.subVectors(l,s),xr.subVectors(c,s),Rh.subVectors(t,s);const m=yr.dot(Rh),p=xr.dot(Rh);if(m<=0&&p<=0)return n.copy(s);Ch.subVectors(t,l);const g=yr.dot(Ch),_=xr.dot(Ch);if(g>=0&&_<=g)return n.copy(l);const y=m*_-g*p;if(y<=0&&m>=0&&g<=0)return f=m/(m-g),n.copy(s).addScaledVector(yr,f);wh.subVectors(t,c);const S=yr.dot(wh),E=xr.dot(wh);if(E>=0&&S<=E)return n.copy(c);const b=S*p-m*E;if(b<=0&&p>=0&&E<=0)return d=p/(p-E),n.copy(s).addScaledVector(xr,d);const M=g*E-S*_;if(M<=0&&_-g>=0&&S-E>=0)return yv.subVectors(c,l),d=(_-g)/(_-g+(S-E)),n.copy(l).addScaledVector(yv,d);const v=1/(M+b+y);return f=b*v,d=y*v,n.copy(s).addScaledVector(yr,f).addScaledVector(xr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const T0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ba={h:0,s:0,l:0},xc={h:0,s:0,l:0};function Nh(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class Me{constructor(t,n,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,s)}set(t,n,s){if(n===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=hi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.colorSpaceToWorking(this,n),this}setRGB(t,n,s,l=Ue.workingColorSpace){return this.r=t,this.g=n,this.b=s,Ue.colorSpaceToWorking(this,l),this}setHSL(t,n,s,l=Ue.workingColorSpace){if(t=Jd(t,1),n=_e(n,0,1),s=_e(s,0,1),n===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+n):s+n-s*n,f=2*s-c;this.r=Nh(f,c,t+1/3),this.g=Nh(f,c,t),this.b=Nh(f,c,t-1/3)}return Ue.colorSpaceToWorking(this,l),this}setStyle(t,n=hi){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],d=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=hi){const s=T0[t.toLowerCase()];return s!==void 0?this.setHex(s,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ca(t.r),this.g=ca(t.g),this.b=ca(t.b),this}copyLinearToSRGB(t){return this.r=Ur(t.r),this.g=Ur(t.g),this.b=Ur(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hi){return Ue.workingToColorSpace(Dn.copy(this),t),Math.round(_e(Dn.r*255,0,255))*65536+Math.round(_e(Dn.g*255,0,255))*256+Math.round(_e(Dn.b*255,0,255))}getHexString(t=hi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ue.workingColorSpace){Ue.workingToColorSpace(Dn.copy(this),n);const s=Dn.r,l=Dn.g,c=Dn.b,f=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const g=(d+f)/2;if(d===f)m=0,p=0;else{const _=f-d;switch(p=g<=.5?_/(f+d):_/(2-f-d),f){case s:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-s)/_+2;break;case c:m=(s-l)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,n=Ue.workingColorSpace){return Ue.workingToColorSpace(Dn.copy(this),n),t.r=Dn.r,t.g=Dn.g,t.b=Dn.b,t}getStyle(t=hi){Ue.workingToColorSpace(Dn.copy(this),t);const n=Dn.r,s=Dn.g,l=Dn.b;return t!==hi?`color(${t} ${n.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,n,s){return this.getHSL(Ba),this.setHSL(Ba.h+t,Ba.s+n,Ba.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,s){return this.r=t.r+(n.r-t.r)*s,this.g=t.g+(n.g-t.g)*s,this.b=t.b+(n.b-t.b)*s,this}lerpHSL(t,n){this.getHSL(Ba),t.getHSL(xc);const s=Go(Ba.h,xc.h,n),l=Go(Ba.s,xc.s,n),c=Go(Ba.l,xc.l,n);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*s+c[6]*l,this.g=c[1]*n+c[4]*s+c[7]*l,this.b=c[2]*n+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dn=new Me;Me.NAMES=T0;let PM=0;class Cs extends As{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:PM++}),this.uuid=Rs(),this.name="",this.type="Material",this.blending=Dr,this.side=Xa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jh,this.blendDst=$h,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Me(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=av,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const s=t[n];if(s===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[n]=s}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Dr&&(s.blending=this.blending),this.side!==Xa&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Jh&&(s.blendSrc=this.blendSrc),this.blendDst!==$h&&(s.blendDst=this.blendDst),this.blendEquation!==vs&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Lr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==av&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const d in c){const m=c[d];delete m.metadata,f.push(m)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let s=null;if(n!==null){const l=n.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=n[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ep extends Cs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Xd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fn=new V,Sc=new Ut;let zM=0;class Oi{constructor(t,n,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zM++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=s,this.usage=sv,this.updateRanges=[],this.gpuType=la,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,s){t*=this.itemSize,s*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,s=this.count;n<s;n++)Sc.fromBufferAttribute(this,n),Sc.applyMatrix3(t),this.setXY(n,Sc.x,Sc.y);else if(this.itemSize===3)for(let n=0,s=this.count;n<s;n++)fn.fromBufferAttribute(this,n),fn.applyMatrix3(t),this.setXYZ(n,fn.x,fn.y,fn.z);return this}applyMatrix4(t){for(let n=0,s=this.count;n<s;n++)fn.fromBufferAttribute(this,n),fn.applyMatrix4(t),this.setXYZ(n,fn.x,fn.y,fn.z);return this}applyNormalMatrix(t){for(let n=0,s=this.count;n<s;n++)fn.fromBufferAttribute(this,n),fn.applyNormalMatrix(t),this.setXYZ(n,fn.x,fn.y,fn.z);return this}transformDirection(t){for(let n=0,s=this.count;n<s;n++)fn.fromBufferAttribute(this,n),fn.transformDirection(t),this.setXYZ(n,fn.x,fn.y,fn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let s=this.array[t*this.itemSize+n];return this.normalized&&(s=br(s,this.array)),s}setComponent(t,n,s){return this.normalized&&(s=On(s,this.array)),this.array[t*this.itemSize+n]=s,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=br(n,this.array)),n}setX(t,n){return this.normalized&&(n=On(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=br(n,this.array)),n}setY(t,n){return this.normalized&&(n=On(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=br(n,this.array)),n}setZ(t,n){return this.normalized&&(n=On(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=br(n,this.array)),n}setW(t,n){return this.normalized&&(n=On(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,s){return t*=this.itemSize,this.normalized&&(n=On(n,this.array),s=On(s,this.array)),this.array[t+0]=n,this.array[t+1]=s,this}setXYZ(t,n,s,l){return t*=this.itemSize,this.normalized&&(n=On(n,this.array),s=On(s,this.array),l=On(l,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,n,s,l,c){return t*=this.itemSize,this.normalized&&(n=On(n,this.array),s=On(s,this.array),l=On(l,this.array),c=On(c,this.array)),this.array[t+0]=n,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sv&&(t.usage=this.usage),t}}class b0 extends Oi{constructor(t,n,s){super(new Uint16Array(t),n,s)}}class A0 extends Oi{constructor(t,n,s){super(new Uint32Array(t),n,s)}}class Ze extends Oi{constructor(t,n,s){super(new Float32Array(t),n,s)}}let IM=0;const fi=new Je,Oh=new mn,Sr=new V,ei=new tl,Po=new tl,xn=new V;class zn extends As{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:IM++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(S0(t)?A0:b0)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,s=0){this.groups.push({start:t,count:n,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new me().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fi.makeRotationFromQuaternion(t),this.applyMatrix4(fi),this}rotateX(t){return fi.makeRotationX(t),this.applyMatrix4(fi),this}rotateY(t){return fi.makeRotationY(t),this.applyMatrix4(fi),this}rotateZ(t){return fi.makeRotationZ(t),this.applyMatrix4(fi),this}translate(t,n,s){return fi.makeTranslation(t,n,s),this.applyMatrix4(fi),this}scale(t,n,s){return fi.makeScale(t,n,s),this.applyMatrix4(fi),this}lookAt(t){return Oh.lookAt(t),Oh.updateMatrix(),this.applyMatrix4(Oh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sr).negate(),this.translate(Sr.x,Sr.y,Sr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new Ze(s,3))}else{const s=Math.min(t.length,n.count);for(let l=0;l<s;l++){const c=t[l];n.setXYZ(l,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let s=0,l=n.length;s<l;s++){const c=n[s];ei.setFromBufferAttribute(c),this.morphTargetsRelative?(xn.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(xn),xn.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(xn)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $c);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const s=this.boundingSphere.center;if(ei.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const d=n[c];Po.setFromBufferAttribute(d),this.morphTargetsRelative?(xn.addVectors(ei.min,Po.min),ei.expandByPoint(xn),xn.addVectors(ei.max,Po.max),ei.expandByPoint(xn)):(ei.expandByPoint(Po.min),ei.expandByPoint(Po.max))}ei.getCenter(s);let l=0;for(let c=0,f=t.count;c<f;c++)xn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(xn));if(n)for(let c=0,f=n.length;c<f;c++){const d=n[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)xn.fromBufferAttribute(d,p),m&&(Sr.fromBufferAttribute(t,p),xn.add(Sr)),l=Math.max(l,s.distanceToSquared(xn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oi(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),d=[],m=[];for(let X=0;X<s.count;X++)d[X]=new V,m[X]=new V;const p=new V,g=new V,_=new V,y=new Ut,S=new Ut,E=new Ut,b=new V,M=new V;function v(X,D,w){p.fromBufferAttribute(s,X),g.fromBufferAttribute(s,D),_.fromBufferAttribute(s,w),y.fromBufferAttribute(c,X),S.fromBufferAttribute(c,D),E.fromBufferAttribute(c,w),g.sub(p),_.sub(p),S.sub(y),E.sub(y);const G=1/(S.x*E.y-E.x*S.y);isFinite(G)&&(b.copy(g).multiplyScalar(E.y).addScaledVector(_,-S.y).multiplyScalar(G),M.copy(_).multiplyScalar(S.x).addScaledVector(g,-E.x).multiplyScalar(G),d[X].add(b),d[D].add(b),d[w].add(b),m[X].add(M),m[D].add(M),m[w].add(M))}let z=this.groups;z.length===0&&(z=[{start:0,count:t.count}]);for(let X=0,D=z.length;X<D;++X){const w=z[X],G=w.start,Q=w.count;for(let rt=G,lt=G+Q;rt<lt;rt+=3)v(t.getX(rt+0),t.getX(rt+1),t.getX(rt+2))}const U=new V,R=new V,H=new V,P=new V;function I(X){H.fromBufferAttribute(l,X),P.copy(H);const D=d[X];U.copy(D),U.sub(H.multiplyScalar(H.dot(D))).normalize(),R.crossVectors(P,D);const G=R.dot(m[X])<0?-1:1;f.setXYZW(X,U.x,U.y,U.z,G)}for(let X=0,D=z.length;X<D;++X){const w=z[X],G=w.start,Q=w.count;for(let rt=G,lt=G+Q;rt<lt;rt+=3)I(t.getX(rt+0)),I(t.getX(rt+1)),I(t.getX(rt+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Oi(new Float32Array(n.count*3),3),this.setAttribute("normal",s);else for(let y=0,S=s.count;y<S;y++)s.setXYZ(y,0,0,0);const l=new V,c=new V,f=new V,d=new V,m=new V,p=new V,g=new V,_=new V;if(t)for(let y=0,S=t.count;y<S;y+=3){const E=t.getX(y+0),b=t.getX(y+1),M=t.getX(y+2);l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,b),f.fromBufferAttribute(n,M),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),d.fromBufferAttribute(s,E),m.fromBufferAttribute(s,b),p.fromBufferAttribute(s,M),d.add(g),m.add(g),p.add(g),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(b,m.x,m.y,m.z),s.setXYZ(M,p.x,p.y,p.z)}else for(let y=0,S=n.count;y<S;y+=3)l.fromBufferAttribute(n,y+0),c.fromBufferAttribute(n,y+1),f.fromBufferAttribute(n,y+2),g.subVectors(f,c),_.subVectors(l,c),g.cross(_),s.setXYZ(y+0,g.x,g.y,g.z),s.setXYZ(y+1,g.x,g.y,g.z),s.setXYZ(y+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,s=t.count;n<s;n++)xn.fromBufferAttribute(t,n),xn.normalize(),t.setXYZ(n,xn.x,xn.y,xn.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,_=d.normalized,y=new p.constructor(m.length*g);let S=0,E=0;for(let b=0,M=m.length;b<M;b++){d.isInterleavedBufferAttribute?S=m[b]*d.data.stride+d.offset:S=m[b]*g;for(let v=0;v<g;v++)y[E++]=p[S++]}return new Oi(y,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new zn,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);n.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,_=p.length;g<_;g++){const y=p[g],S=t(y,s);m.push(S)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,m=f.length;d<m;d++){const p=f[d];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let _=0,y=p.length;_<y;_++){const S=p[_];g.push(S.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere=d.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone());const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(n))}const c=t.morphAttributes;for(const p in c){const g=[],_=c[p];for(let y=0,S=_.length;y<S;y++)g.push(_[y].clone(n));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let p=0,g=f.length;p<g;p++){const _=f[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xv=new Je,ds=new tp,Mc=new $c,Sv=new V,Ec=new V,Tc=new V,bc=new V,Ph=new V,Ac=new V,Mv=new V,Rc=new V;class Ni extends mn{constructor(t=new zn,n=new ep){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,n){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;n.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Ac.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],_=c[m];g!==0&&(Ph.fromBufferAttribute(_,t),f?Ac.addScaledVector(Ph,g):Ac.addScaledVector(Ph.sub(n),g))}n.add(Ac)}return n}raycast(t,n){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Mc.copy(s.boundingSphere),Mc.applyMatrix4(c),ds.copy(t.ray).recast(t.near),!(Mc.containsPoint(ds.origin)===!1&&(ds.intersectSphere(Mc,Sv)===null||ds.origin.distanceToSquared(Sv)>(t.far-t.near)**2))&&(xv.copy(c).invert(),ds.copy(t.ray).applyMatrix4(xv),!(s.boundingBox!==null&&ds.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,n,ds)))}_computeIntersections(t,n,s){let l;const c=this.geometry,f=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,y=c.groups,S=c.drawRange;if(d!==null)if(Array.isArray(f))for(let E=0,b=y.length;E<b;E++){const M=y[E],v=f[M.materialIndex],z=Math.max(M.start,S.start),U=Math.min(d.count,Math.min(M.start+M.count,S.start+S.count));for(let R=z,H=U;R<H;R+=3){const P=d.getX(R),I=d.getX(R+1),X=d.getX(R+2);l=Cc(this,v,t,s,p,g,_,P,I,X),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=M.materialIndex,n.push(l))}}else{const E=Math.max(0,S.start),b=Math.min(d.count,S.start+S.count);for(let M=E,v=b;M<v;M+=3){const z=d.getX(M),U=d.getX(M+1),R=d.getX(M+2);l=Cc(this,f,t,s,p,g,_,z,U,R),l&&(l.faceIndex=Math.floor(M/3),n.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let E=0,b=y.length;E<b;E++){const M=y[E],v=f[M.materialIndex],z=Math.max(M.start,S.start),U=Math.min(m.count,Math.min(M.start+M.count,S.start+S.count));for(let R=z,H=U;R<H;R+=3){const P=R,I=R+1,X=R+2;l=Cc(this,v,t,s,p,g,_,P,I,X),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=M.materialIndex,n.push(l))}}else{const E=Math.max(0,S.start),b=Math.min(m.count,S.start+S.count);for(let M=E,v=b;M<v;M+=3){const z=M,U=M+1,R=M+2;l=Cc(this,f,t,s,p,g,_,z,U,R),l&&(l.faceIndex=Math.floor(M/3),n.push(l))}}}}function BM(r,t,n,s,l,c,f,d){let m;if(t.side===Xn?m=s.intersectTriangle(f,c,l,!0,d):m=s.intersectTriangle(l,c,f,t.side===Xa,d),m===null)return null;Rc.copy(d),Rc.applyMatrix4(r.matrixWorld);const p=n.ray.origin.distanceTo(Rc);return p<n.near||p>n.far?null:{distance:p,point:Rc.clone(),object:r}}function Cc(r,t,n,s,l,c,f,d,m,p){r.getVertexPosition(d,Ec),r.getVertexPosition(m,Tc),r.getVertexPosition(p,bc);const g=BM(r,t,n,s,Ec,Tc,bc,Mv);if(g){const _=new V;xi.getBarycoord(Mv,Ec,Tc,bc,_),l&&(g.uv=xi.getInterpolatedAttribute(l,d,m,p,_,new Ut)),c&&(g.uv1=xi.getInterpolatedAttribute(c,d,m,p,_,new Ut)),f&&(g.normal=xi.getInterpolatedAttribute(f,d,m,p,_,new V),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const y={a:d,b:m,c:p,normal:new V,materialIndex:0};xi.getNormal(Ec,Tc,bc,y.normal),g.face=y,g.barycoord=_}return g}class el extends zn{constructor(t=1,n=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const d=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],g=[],_=[];let y=0,S=0;E("z","y","x",-1,-1,s,n,t,f,c,0),E("z","y","x",1,-1,s,n,-t,f,c,1),E("x","z","y",1,1,t,s,n,l,f,2),E("x","z","y",1,-1,t,s,-n,l,f,3),E("x","y","z",1,-1,t,n,s,l,c,4),E("x","y","z",-1,-1,t,n,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Ze(p,3)),this.setAttribute("normal",new Ze(g,3)),this.setAttribute("uv",new Ze(_,2));function E(b,M,v,z,U,R,H,P,I,X,D){const w=R/I,G=H/X,Q=R/2,rt=H/2,lt=P/2,ct=I+1,O=X+1;let K=0,Y=0;const St=new V;for(let At=0;At<O;At++){const N=At*G-rt;for(let et=0;et<ct;et++){const Mt=et*w-Q;St[b]=Mt*z,St[M]=N*U,St[v]=lt,p.push(St.x,St.y,St.z),St[b]=0,St[M]=0,St[v]=P>0?1:-1,g.push(St.x,St.y,St.z),_.push(et/I),_.push(1-At/X),K+=1}}for(let At=0;At<X;At++)for(let N=0;N<I;N++){const et=y+N+ct*At,Mt=y+N+ct*(At+1),Dt=y+(N+1)+ct*(At+1),Ft=y+(N+1)+ct*At;m.push(et,Mt,Ft),m.push(Mt,Dt,Ft),Y+=6}d.addGroup(S,Y,D),S+=Y,y+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new el(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function zr(r){const t={};for(const n in r){t[n]={};for(const s in r[n]){const l=r[n][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][s]=null):t[n][s]=l.clone():Array.isArray(l)?t[n][s]=l.slice():t[n][s]=l}}return t}function Pn(r){const t={};for(let n=0;n<r.length;n++){const s=zr(r[n]);for(const l in s)t[l]=s[l]}return t}function FM(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function R0(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const HM={clone:zr,merge:Pn};var GM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,VM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wa extends Cs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=GM,this.fragmentShader=VM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zr(t.uniforms),this.uniformsGroups=FM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(n.extensions=s),n}}class C0 extends mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=Li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fa=new V,Ev=new Ut,Tv=new Ut;class di extends C0{constructor(t=50,n=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Zo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ho*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zo*2*Math.atan(Math.tan(Ho*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,s){Fa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fa.x,Fa.y).multiplyScalar(-t/Fa.z),Fa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Fa.x,Fa.y).multiplyScalar(-t/Fa.z)}getViewSize(t,n){return this.getViewBounds(t,Ev,Tv),n.subVectors(Tv,Ev)}setViewOffset(t,n,s,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Ho*.5*this.fov)/this.zoom,s=2*n,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,n-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-s,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Mr=-90,Er=1;class kM extends mn{constructor(t,n,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new di(Mr,Er,t,n);l.layers=this.layers,this.add(l);const c=new di(Mr,Er,t,n);c.layers=this.layers,this.add(c);const f=new di(Mr,Er,t,n);f.layers=this.layers,this.add(f);const d=new di(Mr,Er,t,n);d.layers=this.layers,this.add(d);const m=new di(Mr,Er,t,n);m.layers=this.layers,this.add(m);const p=new di(Mr,Er,t,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[s,l,c,f,d,m]=n;for(const p of n)this.remove(p);if(t===Li)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Yc)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of n)this.add(p),p.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,d,m,p,g]=this.children,_=t.getRenderTarget(),y=t.getActiveCubeFace(),S=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const b=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(n,c),t.setRenderTarget(s,1,l),t.render(n,f),t.setRenderTarget(s,2,l),t.render(n,d),t.setRenderTarget(s,3,l),t.render(n,m),t.setRenderTarget(s,4,l),t.render(n,p),s.texture.generateMipmaps=b,t.setRenderTarget(s,5,l),t.render(n,g),t.setRenderTarget(_,y,S),t.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class w0 extends Wn{constructor(t=[],n=Nr,s,l,c,f,d,m,p,g){super(t,n,s,l,c,f,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class XM extends Ts{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new w0(l),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new el(5,5,5),c=new Wa({name:"CubemapFromEquirect",uniforms:zr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Xn,blending:Va});c.uniforms.tEquirect.value=n;const f=new Ni(l,c),d=n.minFilter;return n.minFilter===Ss&&(n.minFilter=Ui),new kM(1,10,this).update(t,f),n.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(t,n=!0,s=!0,l=!0){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,s,l);t.setRenderTarget(c)}}class wc extends mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const WM={type:"move"};class zh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const s of t.hand.values())this._getHandJoint(n,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,s){let l=null,c=null,f=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(p&&t.hand){f=!0;for(const b of t.hand.values()){const M=n.getJointPose(b,s),v=this._getHandJoint(p,b);M!==null&&(v.matrix.fromArray(M.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=M.radius),v.visible=M!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],y=g.position.distanceTo(_.position),S=.02,E=.005;p.inputState.pinching&&y>S+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&y<=S-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=n.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(WM)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const s=new wc;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[n.jointName]=s,t.add(s)}return t.joints[n.jointName]}}class D0{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Me(t),this.density=n}clone(){return new D0(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class NR extends mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Ih=new V,qM=new V,YM=new me;class Ha{constructor(t=new V(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,s,l){return this.normal.set(t,n,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,s){const l=Ih.subVectors(s,n).cross(qM.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const s=t.delta(Ih),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return n<0&&s>0||s<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const s=n||YM.getNormalMatrix(t),l=this.coplanarPoint(Ih).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ps=new $c,ZM=new Ut(.5,.5),Dc=new V;class np{constructor(t=new Ha,n=new Ha,s=new Ha,l=new Ha,c=new Ha,f=new Ha){this.planes=[t,n,s,l,c,f]}set(t,n,s,l,c,f){const d=this.planes;return d[0].copy(t),d[1].copy(n),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(f),this}copy(t){const n=this.planes;for(let s=0;s<6;s++)n[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,n=Li,s=!1){const l=this.planes,c=t.elements,f=c[0],d=c[1],m=c[2],p=c[3],g=c[4],_=c[5],y=c[6],S=c[7],E=c[8],b=c[9],M=c[10],v=c[11],z=c[12],U=c[13],R=c[14],H=c[15];if(l[0].setComponents(p-f,S-g,v-E,H-z).normalize(),l[1].setComponents(p+f,S+g,v+E,H+z).normalize(),l[2].setComponents(p+d,S+_,v+b,H+U).normalize(),l[3].setComponents(p-d,S-_,v-b,H-U).normalize(),s)l[4].setComponents(m,y,M,R).normalize(),l[5].setComponents(p-m,S-y,v-M,H-R).normalize();else if(l[4].setComponents(p-m,S-y,v-M,H-R).normalize(),n===Li)l[5].setComponents(p+m,S+y,v+M,H+R).normalize();else if(n===Yc)l[5].setComponents(m,y,M,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(t){ps.center.set(0,0,0);const n=ZM.distanceTo(t.center);return ps.radius=.7071067811865476+n,ps.applyMatrix4(t.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(t){const n=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let s=0;s<6;s++){const l=n[s];if(Dc.x=l.normal.x>0?t.max.x:t.min.x,Dc.y=l.normal.y>0?t.max.y:t.min.y,Dc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Dc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let s=0;s<6;s++)if(n[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class U0 extends Cs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const jc=new V,Kc=new V,bv=new Je,zo=new tp,Uc=new $c,Bh=new V,Av=new V;class jM extends mn{constructor(t=new zn,n=new U0){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,s=[0];for(let l=1,c=n.count;l<c;l++)jc.fromBufferAttribute(n,l-1),Kc.fromBufferAttribute(n,l),s[l]=s[l-1],s[l]+=jc.distanceTo(Kc);t.setAttribute("lineDistance",new Ze(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Uc.copy(s.boundingSphere),Uc.applyMatrix4(l),Uc.radius+=c,t.ray.intersectsSphere(Uc)===!1)return;bv.copy(l).invert(),zo.copy(t.ray).applyMatrix4(bv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,g=s.index,y=s.attributes.position;if(g!==null){const S=Math.max(0,f.start),E=Math.min(g.count,f.start+f.count);for(let b=S,M=E-1;b<M;b+=p){const v=g.getX(b),z=g.getX(b+1),U=Lc(this,t,zo,m,v,z,b);U&&n.push(U)}if(this.isLineLoop){const b=g.getX(E-1),M=g.getX(S),v=Lc(this,t,zo,m,b,M,E-1);v&&n.push(v)}}else{const S=Math.max(0,f.start),E=Math.min(y.count,f.start+f.count);for(let b=S,M=E-1;b<M;b+=p){const v=Lc(this,t,zo,m,b,b+1,b);v&&n.push(v)}if(this.isLineLoop){const b=Lc(this,t,zo,m,E-1,S,E-1);b&&n.push(b)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Lc(r,t,n,s,l,c,f){const d=r.geometry.attributes.position;if(jc.fromBufferAttribute(d,l),Kc.fromBufferAttribute(d,c),n.distanceSqToSegment(jc,Kc,Bh,Av)>s)return;Bh.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(Bh);if(!(p<t.near||p>t.far))return{distance:p,point:Av.clone().applyMatrix4(r.matrixWorld),index:f,face:null,faceIndex:null,barycoord:null,object:r}}class L0 extends Wn{constructor(t,n,s=Ms,l,c,f,d=Mi,m=Mi,p,g=qo,_=1){if(g!==qo&&g!==Yo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const y={width:t,height:n,depth:_};super(y,l,c,f,d,m,g,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new $d(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class N0 extends Wn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ip extends zn{constructor(t=1,n=1,s=1,l=32,c=1,f=!1,d=0,m=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:s,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:d,thetaLength:m};const p=this;l=Math.floor(l),c=Math.floor(c);const g=[],_=[],y=[],S=[];let E=0;const b=[],M=s/2;let v=0;z(),f===!1&&(t>0&&U(!0),n>0&&U(!1)),this.setIndex(g),this.setAttribute("position",new Ze(_,3)),this.setAttribute("normal",new Ze(y,3)),this.setAttribute("uv",new Ze(S,2));function z(){const R=new V,H=new V;let P=0;const I=(n-t)/s;for(let X=0;X<=c;X++){const D=[],w=X/c,G=w*(n-t)+t;for(let Q=0;Q<=l;Q++){const rt=Q/l,lt=rt*m+d,ct=Math.sin(lt),O=Math.cos(lt);H.x=G*ct,H.y=-w*s+M,H.z=G*O,_.push(H.x,H.y,H.z),R.set(ct,I,O).normalize(),y.push(R.x,R.y,R.z),S.push(rt,1-w),D.push(E++)}b.push(D)}for(let X=0;X<l;X++)for(let D=0;D<c;D++){const w=b[D][X],G=b[D+1][X],Q=b[D+1][X+1],rt=b[D][X+1];(t>0||D!==0)&&(g.push(w,G,rt),P+=3),(n>0||D!==c-1)&&(g.push(G,Q,rt),P+=3)}p.addGroup(v,P,0),v+=P}function U(R){const H=E,P=new Ut,I=new V;let X=0;const D=R===!0?t:n,w=R===!0?1:-1;for(let Q=1;Q<=l;Q++)_.push(0,M*w,0),y.push(0,w,0),S.push(.5,.5),E++;const G=E;for(let Q=0;Q<=l;Q++){const lt=Q/l*m+d,ct=Math.cos(lt),O=Math.sin(lt);I.x=D*O,I.y=M*w,I.z=D*ct,_.push(I.x,I.y,I.z),y.push(0,w,0),P.x=ct*.5+.5,P.y=O*.5*w+.5,S.push(P.x,P.y),E++}for(let Q=0;Q<l;Q++){const rt=H+Q,lt=G+Q;R===!0?g.push(lt,lt+1,rt):g.push(lt+1,lt,rt),X+=3}p.addGroup(v,X,R===!0?1:2),v+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ip(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ap extends ip{constructor(t=1,n=1,s=32,l=1,c=!1,f=0,d=Math.PI*2){super(0,t,n,s,l,c,f,d),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:s,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:d}}static fromJSON(t){return new ap(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class zi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,n){const s=this.getUtoTmapping(t);return this.getPoint(s,n)}getPoints(t=5){const n=[];for(let s=0;s<=t;s++)n.push(this.getPoint(s/t));return n}getSpacedPoints(t=5){const n=[];for(let s=0;s<=t;s++)n.push(this.getPointAt(s/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let s,l=this.getPoint(0),c=0;n.push(0);for(let f=1;f<=t;f++)s=this.getPoint(f/t),c+=s.distanceTo(l),n.push(c),l=s;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const s=this.getLengths();let l=0;const c=s.length;let f;n?f=n:f=t*s[c-1];let d=0,m=c-1,p;for(;d<=m;)if(l=Math.floor(d+(m-d)/2),p=s[l]-f,p<0)d=l+1;else if(p>0)m=l-1;else{m=l;break}if(l=m,s[l]===f)return l/(c-1);const g=s[l],y=s[l+1]-g,S=(f-g)/y;return(l+S)/(c-1)}getTangent(t,n){let l=t-1e-4,c=t+1e-4;l<0&&(l=0),c>1&&(c=1);const f=this.getPoint(l),d=this.getPoint(c),m=n||(f.isVector2?new Ut:new V);return m.copy(d).sub(f).normalize(),m}getTangentAt(t,n){const s=this.getUtoTmapping(t);return this.getTangent(s,n)}computeFrenetFrames(t,n=!1){const s=new V,l=[],c=[],f=[],d=new V,m=new Je;for(let S=0;S<=t;S++){const E=S/t;l[S]=this.getTangentAt(E,new V)}c[0]=new V,f[0]=new V;let p=Number.MAX_VALUE;const g=Math.abs(l[0].x),_=Math.abs(l[0].y),y=Math.abs(l[0].z);g<=p&&(p=g,s.set(1,0,0)),_<=p&&(p=_,s.set(0,1,0)),y<=p&&s.set(0,0,1),d.crossVectors(l[0],s).normalize(),c[0].crossVectors(l[0],d),f[0].crossVectors(l[0],c[0]);for(let S=1;S<=t;S++){if(c[S]=c[S-1].clone(),f[S]=f[S-1].clone(),d.crossVectors(l[S-1],l[S]),d.length()>Number.EPSILON){d.normalize();const E=Math.acos(_e(l[S-1].dot(l[S]),-1,1));c[S].applyMatrix4(m.makeRotationAxis(d,E))}f[S].crossVectors(l[S],c[S])}if(n===!0){let S=Math.acos(_e(c[0].dot(c[t]),-1,1));S/=t,l[0].dot(d.crossVectors(c[0],c[t]))>0&&(S=-S);for(let E=1;E<=t;E++)c[E].applyMatrix4(m.makeRotationAxis(l[E],S*E)),f[E].crossVectors(l[E],c[E])}return{tangents:l,normals:c,binormals:f}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class sp extends zi{constructor(t=0,n=0,s=1,l=1,c=0,f=Math.PI*2,d=!1,m=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=s,this.yRadius=l,this.aStartAngle=c,this.aEndAngle=f,this.aClockwise=d,this.aRotation=m}getPoint(t,n=new Ut){const s=n,l=Math.PI*2;let c=this.aEndAngle-this.aStartAngle;const f=Math.abs(c)<Number.EPSILON;for(;c<0;)c+=l;for(;c>l;)c-=l;c<Number.EPSILON&&(f?c=0:c=l),this.aClockwise===!0&&!f&&(c===l?c=-l:c=c-l);const d=this.aStartAngle+t*c;let m=this.aX+this.xRadius*Math.cos(d),p=this.aY+this.yRadius*Math.sin(d);if(this.aRotation!==0){const g=Math.cos(this.aRotation),_=Math.sin(this.aRotation),y=m-this.aX,S=p-this.aY;m=y*g-S*_+this.aX,p=y*_+S*g+this.aY}return s.set(m,p)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class KM extends sp{constructor(t,n,s,l,c,f){super(t,n,s,s,l,c,f),this.isArcCurve=!0,this.type="ArcCurve"}}function rp(){let r=0,t=0,n=0,s=0;function l(c,f,d,m){r=c,t=d,n=-3*c+3*f-2*d-m,s=2*c-2*f+d+m}return{initCatmullRom:function(c,f,d,m,p){l(f,d,p*(d-c),p*(m-f))},initNonuniformCatmullRom:function(c,f,d,m,p,g,_){let y=(f-c)/p-(d-c)/(p+g)+(d-f)/g,S=(d-f)/g-(m-f)/(g+_)+(m-d)/_;y*=g,S*=g,l(f,d,y,S)},calc:function(c){const f=c*c,d=f*c;return r+t*c+n*f+s*d}}}const Nc=new V,Fh=new rp,Hh=new rp,Gh=new rp;class QM extends zi{constructor(t=[],n=!1,s="centripetal",l=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=s,this.tension=l}getPoint(t,n=new V){const s=n,l=this.points,c=l.length,f=(c-(this.closed?0:1))*t;let d=Math.floor(f),m=f-d;this.closed?d+=d>0?0:(Math.floor(Math.abs(d)/c)+1)*c:m===0&&d===c-1&&(d=c-2,m=1);let p,g;this.closed||d>0?p=l[(d-1)%c]:(Nc.subVectors(l[0],l[1]).add(l[0]),p=Nc);const _=l[d%c],y=l[(d+1)%c];if(this.closed||d+2<c?g=l[(d+2)%c]:(Nc.subVectors(l[c-1],l[c-2]).add(l[c-1]),g=Nc),this.curveType==="centripetal"||this.curveType==="chordal"){const S=this.curveType==="chordal"?.5:.25;let E=Math.pow(p.distanceToSquared(_),S),b=Math.pow(_.distanceToSquared(y),S),M=Math.pow(y.distanceToSquared(g),S);b<1e-4&&(b=1),E<1e-4&&(E=b),M<1e-4&&(M=b),Fh.initNonuniformCatmullRom(p.x,_.x,y.x,g.x,E,b,M),Hh.initNonuniformCatmullRom(p.y,_.y,y.y,g.y,E,b,M),Gh.initNonuniformCatmullRom(p.z,_.z,y.z,g.z,E,b,M)}else this.curveType==="catmullrom"&&(Fh.initCatmullRom(p.x,_.x,y.x,g.x,this.tension),Hh.initCatmullRom(p.y,_.y,y.y,g.y,this.tension),Gh.initCatmullRom(p.z,_.z,y.z,g.z,this.tension));return s.set(Fh.calc(m),Hh.calc(m),Gh.calc(m)),s}copy(t){super.copy(t),this.points=[];for(let n=0,s=t.points.length;n<s;n++){const l=t.points[n];this.points.push(l.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,s=this.points.length;n<s;n++){const l=this.points[n];t.points.push(l.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,s=t.points.length;n<s;n++){const l=t.points[n];this.points.push(new V().fromArray(l))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Rv(r,t,n,s,l){const c=(s-t)*.5,f=(l-n)*.5,d=r*r,m=r*d;return(2*n-2*s+c+f)*m+(-3*n+3*s-2*c-f)*d+c*r+n}function JM(r,t){const n=1-r;return n*n*t}function $M(r,t){return 2*(1-r)*r*t}function tE(r,t){return r*r*t}function Vo(r,t,n,s){return JM(r,t)+$M(r,n)+tE(r,s)}function eE(r,t){const n=1-r;return n*n*n*t}function nE(r,t){const n=1-r;return 3*n*n*r*t}function iE(r,t){return 3*(1-r)*r*r*t}function aE(r,t){return r*r*r*t}function ko(r,t,n,s,l){return eE(r,t)+nE(r,n)+iE(r,s)+aE(r,l)}class O0 extends zi{constructor(t=new Ut,n=new Ut,s=new Ut,l=new Ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=s,this.v3=l}getPoint(t,n=new Ut){const s=n,l=this.v0,c=this.v1,f=this.v2,d=this.v3;return s.set(ko(t,l.x,c.x,f.x,d.x),ko(t,l.y,c.y,f.y,d.y)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class sE extends zi{constructor(t=new V,n=new V,s=new V,l=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=s,this.v3=l}getPoint(t,n=new V){const s=n,l=this.v0,c=this.v1,f=this.v2,d=this.v3;return s.set(ko(t,l.x,c.x,f.x,d.x),ko(t,l.y,c.y,f.y,d.y),ko(t,l.z,c.z,f.z,d.z)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class P0 extends zi{constructor(t=new Ut,n=new Ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Ut){const s=n;return t===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(t).add(this.v1)),s}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Ut){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rE extends zi{constructor(t=new V,n=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new V){const s=n;return t===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(t).add(this.v1)),s}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new V){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class z0 extends zi{constructor(t=new Ut,n=new Ut,s=new Ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=s}getPoint(t,n=new Ut){const s=n,l=this.v0,c=this.v1,f=this.v2;return s.set(Vo(t,l.x,c.x,f.x),Vo(t,l.y,c.y,f.y)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class I0 extends zi{constructor(t=new V,n=new V,s=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=s}getPoint(t,n=new V){const s=n,l=this.v0,c=this.v1,f=this.v2;return s.set(Vo(t,l.x,c.x,f.x),Vo(t,l.y,c.y,f.y),Vo(t,l.z,c.z,f.z)),s}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class B0 extends zi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Ut){const s=n,l=this.points,c=(l.length-1)*t,f=Math.floor(c),d=c-f,m=l[f===0?f:f-1],p=l[f],g=l[f>l.length-2?l.length-1:f+1],_=l[f>l.length-3?l.length-1:f+2];return s.set(Rv(d,m.x,p.x,g.x,_.x),Rv(d,m.y,p.y,g.y,_.y)),s}copy(t){super.copy(t),this.points=[];for(let n=0,s=t.points.length;n<s;n++){const l=t.points[n];this.points.push(l.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,s=this.points.length;n<s;n++){const l=this.points[n];t.points.push(l.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,s=t.points.length;n<s;n++){const l=t.points[n];this.points.push(new Ut().fromArray(l))}return this}}var Qc=Object.freeze({__proto__:null,ArcCurve:KM,CatmullRomCurve3:QM,CubicBezierCurve:O0,CubicBezierCurve3:sE,EllipseCurve:sp,LineCurve:P0,LineCurve3:rE,QuadraticBezierCurve:z0,QuadraticBezierCurve3:I0,SplineCurve:B0});class oE extends zi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const s=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Qc[s](n,t))}return this}getPoint(t,n){const s=t*this.getLength(),l=this.getCurveLengths();let c=0;for(;c<l.length;){if(l[c]>=s){const f=l[c]-s,d=this.curves[c],m=d.getLength(),p=m===0?0:1-f/m;return d.getPointAt(p,n)}c++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let s=0,l=this.curves.length;s<l;s++)n+=this.curves[s].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let s=0;s<=t;s++)n.push(this.getPoint(s/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let s;for(let l=0,c=this.curves;l<c.length;l++){const f=c[l],d=f.isEllipseCurve?t*2:f.isLineCurve||f.isLineCurve3?1:f.isSplineCurve?t*f.points.length:t,m=f.getPoints(d);for(let p=0;p<m.length;p++){const g=m[p];s&&s.equals(g)||(n.push(g),s=g)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,s=t.curves.length;n<s;n++){const l=t.curves[n];this.curves.push(l.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,s=this.curves.length;n<s;n++){const l=this.curves[n];t.curves.push(l.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,s=t.curves.length;n<s;n++){const l=t.curves[n];this.curves.push(new Qc[l.type]().fromJSON(l))}return this}}class Cv extends oE{constructor(t){super(),this.type="Path",this.currentPoint=new Ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,s=t.length;n<s;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const s=new P0(this.currentPoint.clone(),new Ut(t,n));return this.curves.push(s),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,s,l){const c=new z0(this.currentPoint.clone(),new Ut(t,n),new Ut(s,l));return this.curves.push(c),this.currentPoint.set(s,l),this}bezierCurveTo(t,n,s,l,c,f){const d=new O0(this.currentPoint.clone(),new Ut(t,n),new Ut(s,l),new Ut(c,f));return this.curves.push(d),this.currentPoint.set(c,f),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),s=new B0(n);return this.curves.push(s),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,s,l,c,f){const d=this.currentPoint.x,m=this.currentPoint.y;return this.absarc(t+d,n+m,s,l,c,f),this}absarc(t,n,s,l,c,f){return this.absellipse(t,n,s,s,l,c,f),this}ellipse(t,n,s,l,c,f,d,m){const p=this.currentPoint.x,g=this.currentPoint.y;return this.absellipse(t+p,n+g,s,l,c,f,d,m),this}absellipse(t,n,s,l,c,f,d,m){const p=new sp(t,n,s,l,c,f,d,m);if(this.curves.length>0){const _=p.getPoint(0);_.equals(this.currentPoint)||this.lineTo(_.x,_.y)}this.curves.push(p);const g=p.getPoint(1);return this.currentPoint.copy(g),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class lE extends Cv{constructor(t){super(t),this.uuid=Rs(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let s=0,l=this.holes.length;s<l;s++)n[s]=this.holes[s].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,s=t.holes.length;n<s;n++){const l=t.holes[n];this.holes.push(l.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,s=this.holes.length;n<s;n++){const l=this.holes[n];t.holes.push(l.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,s=t.holes.length;n<s;n++){const l=t.holes[n];this.holes.push(new Cv().fromJSON(l))}return this}}function cE(r,t,n=2){const s=t&&t.length,l=s?t[0]*n:r.length;let c=F0(r,0,l,n,!0);const f=[];if(!c||c.next===c.prev)return f;let d,m,p;if(s&&(c=pE(r,t,c,n)),r.length>80*n){d=1/0,m=1/0;let g=-1/0,_=-1/0;for(let y=n;y<l;y+=n){const S=r[y],E=r[y+1];S<d&&(d=S),E<m&&(m=E),S>g&&(g=S),E>_&&(_=E)}p=Math.max(g-d,_-m),p=p!==0?32767/p:0}return Ko(c,f,n,d,m,p,0),f}function F0(r,t,n,s,l){let c;if(l===bE(r,t,n,s)>0)for(let f=t;f<n;f+=s)c=wv(f/s|0,r[f],r[f+1],c);else for(let f=n-s;f>=t;f-=s)c=wv(f/s|0,r[f],r[f+1],c);return c&&Ir(c,c.next)&&(Jo(c),c=c.next),c}function bs(r,t){if(!r)return r;t||(t=r);let n=r,s;do if(s=!1,!n.steiner&&(Ir(n,n.next)||$e(n.prev,n,n.next)===0)){if(Jo(n),n=t=n.prev,n===n.next)break;s=!0}else n=n.next;while(s||n!==t);return t}function Ko(r,t,n,s,l,c,f){if(!r)return;!f&&c&&yE(r,s,l,c);let d=r;for(;r.prev!==r.next;){const m=r.prev,p=r.next;if(c?fE(r,s,l,c):uE(r)){t.push(m.i,r.i,p.i),Jo(r),r=p.next,d=p.next;continue}if(r=p,r===d){f?f===1?(r=hE(bs(r),t),Ko(r,t,n,s,l,c,2)):f===2&&dE(r,t,n,s,l,c):Ko(bs(r),t,n,s,l,c,1);break}}}function uE(r){const t=r.prev,n=r,s=r.next;if($e(t,n,s)>=0)return!1;const l=t.x,c=n.x,f=s.x,d=t.y,m=n.y,p=s.y,g=Math.min(l,c,f),_=Math.min(d,m,p),y=Math.max(l,c,f),S=Math.max(d,m,p);let E=s.next;for(;E!==t;){if(E.x>=g&&E.x<=y&&E.y>=_&&E.y<=S&&Bo(l,d,c,m,f,p,E.x,E.y)&&$e(E.prev,E,E.next)>=0)return!1;E=E.next}return!0}function fE(r,t,n,s){const l=r.prev,c=r,f=r.next;if($e(l,c,f)>=0)return!1;const d=l.x,m=c.x,p=f.x,g=l.y,_=c.y,y=f.y,S=Math.min(d,m,p),E=Math.min(g,_,y),b=Math.max(d,m,p),M=Math.max(g,_,y),v=Fd(S,E,t,n,s),z=Fd(b,M,t,n,s);let U=r.prevZ,R=r.nextZ;for(;U&&U.z>=v&&R&&R.z<=z;){if(U.x>=S&&U.x<=b&&U.y>=E&&U.y<=M&&U!==l&&U!==f&&Bo(d,g,m,_,p,y,U.x,U.y)&&$e(U.prev,U,U.next)>=0||(U=U.prevZ,R.x>=S&&R.x<=b&&R.y>=E&&R.y<=M&&R!==l&&R!==f&&Bo(d,g,m,_,p,y,R.x,R.y)&&$e(R.prev,R,R.next)>=0))return!1;R=R.nextZ}for(;U&&U.z>=v;){if(U.x>=S&&U.x<=b&&U.y>=E&&U.y<=M&&U!==l&&U!==f&&Bo(d,g,m,_,p,y,U.x,U.y)&&$e(U.prev,U,U.next)>=0)return!1;U=U.prevZ}for(;R&&R.z<=z;){if(R.x>=S&&R.x<=b&&R.y>=E&&R.y<=M&&R!==l&&R!==f&&Bo(d,g,m,_,p,y,R.x,R.y)&&$e(R.prev,R,R.next)>=0)return!1;R=R.nextZ}return!0}function hE(r,t){let n=r;do{const s=n.prev,l=n.next.next;!Ir(s,l)&&G0(s,n,n.next,l)&&Qo(s,l)&&Qo(l,s)&&(t.push(s.i,n.i,l.i),Jo(n),Jo(n.next),n=r=l),n=n.next}while(n!==r);return bs(n)}function dE(r,t,n,s,l,c){let f=r;do{let d=f.next.next;for(;d!==f.prev;){if(f.i!==d.i&&ME(f,d)){let m=V0(f,d);f=bs(f,f.next),m=bs(m,m.next),Ko(f,t,n,s,l,c,0),Ko(m,t,n,s,l,c,0);return}d=d.next}f=f.next}while(f!==r)}function pE(r,t,n,s){const l=[];for(let c=0,f=t.length;c<f;c++){const d=t[c]*s,m=c<f-1?t[c+1]*s:r.length,p=F0(r,d,m,s,!1);p===p.next&&(p.steiner=!0),l.push(SE(p))}l.sort(mE);for(let c=0;c<l.length;c++)n=gE(l[c],n);return n}function mE(r,t){let n=r.x-t.x;if(n===0&&(n=r.y-t.y,n===0)){const s=(r.next.y-r.y)/(r.next.x-r.x),l=(t.next.y-t.y)/(t.next.x-t.x);n=s-l}return n}function gE(r,t){const n=_E(r,t);if(!n)return t;const s=V0(n,r);return bs(s,s.next),bs(n,n.next)}function _E(r,t){let n=t;const s=r.x,l=r.y;let c=-1/0,f;if(Ir(r,n))return n;do{if(Ir(r,n.next))return n.next;if(l<=n.y&&l>=n.next.y&&n.next.y!==n.y){const _=n.x+(l-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(_<=s&&_>c&&(c=_,f=n.x<n.next.x?n:n.next,_===s))return f}n=n.next}while(n!==t);if(!f)return null;const d=f,m=f.x,p=f.y;let g=1/0;n=f;do{if(s>=n.x&&n.x>=m&&s!==n.x&&H0(l<p?s:c,l,m,p,l<p?c:s,l,n.x,n.y)){const _=Math.abs(l-n.y)/(s-n.x);Qo(n,r)&&(_<g||_===g&&(n.x>f.x||n.x===f.x&&vE(f,n)))&&(f=n,g=_)}n=n.next}while(n!==d);return f}function vE(r,t){return $e(r.prev,r,t.prev)<0&&$e(t.next,r,r.next)<0}function yE(r,t,n,s){let l=r;do l.z===0&&(l.z=Fd(l.x,l.y,t,n,s)),l.prevZ=l.prev,l.nextZ=l.next,l=l.next;while(l!==r);l.prevZ.nextZ=null,l.prevZ=null,xE(l)}function xE(r){let t,n=1;do{let s=r,l;r=null;let c=null;for(t=0;s;){t++;let f=s,d=0;for(let p=0;p<n&&(d++,f=f.nextZ,!!f);p++);let m=n;for(;d>0||m>0&&f;)d!==0&&(m===0||!f||s.z<=f.z)?(l=s,s=s.nextZ,d--):(l=f,f=f.nextZ,m--),c?c.nextZ=l:r=l,l.prevZ=c,c=l;s=f}c.nextZ=null,n*=2}while(t>1);return r}function Fd(r,t,n,s,l){return r=(r-n)*l|0,t=(t-s)*l|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function SE(r){let t=r,n=r;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==r);return n}function H0(r,t,n,s,l,c,f,d){return(l-f)*(t-d)>=(r-f)*(c-d)&&(r-f)*(s-d)>=(n-f)*(t-d)&&(n-f)*(c-d)>=(l-f)*(s-d)}function Bo(r,t,n,s,l,c,f,d){return!(r===f&&t===d)&&H0(r,t,n,s,l,c,f,d)}function ME(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!EE(r,t)&&(Qo(r,t)&&Qo(t,r)&&TE(r,t)&&($e(r.prev,r,t.prev)||$e(r,t.prev,t))||Ir(r,t)&&$e(r.prev,r,r.next)>0&&$e(t.prev,t,t.next)>0)}function $e(r,t,n){return(t.y-r.y)*(n.x-t.x)-(t.x-r.x)*(n.y-t.y)}function Ir(r,t){return r.x===t.x&&r.y===t.y}function G0(r,t,n,s){const l=Pc($e(r,t,n)),c=Pc($e(r,t,s)),f=Pc($e(n,s,r)),d=Pc($e(n,s,t));return!!(l!==c&&f!==d||l===0&&Oc(r,n,t)||c===0&&Oc(r,s,t)||f===0&&Oc(n,r,s)||d===0&&Oc(n,t,s))}function Oc(r,t,n){return t.x<=Math.max(r.x,n.x)&&t.x>=Math.min(r.x,n.x)&&t.y<=Math.max(r.y,n.y)&&t.y>=Math.min(r.y,n.y)}function Pc(r){return r>0?1:r<0?-1:0}function EE(r,t){let n=r;do{if(n.i!==r.i&&n.next.i!==r.i&&n.i!==t.i&&n.next.i!==t.i&&G0(n,n.next,r,t))return!0;n=n.next}while(n!==r);return!1}function Qo(r,t){return $e(r.prev,r,r.next)<0?$e(r,t,r.next)>=0&&$e(r,r.prev,t)>=0:$e(r,t,r.prev)<0||$e(r,r.next,t)<0}function TE(r,t){let n=r,s=!1;const l=(r.x+t.x)/2,c=(r.y+t.y)/2;do n.y>c!=n.next.y>c&&n.next.y!==n.y&&l<(n.next.x-n.x)*(c-n.y)/(n.next.y-n.y)+n.x&&(s=!s),n=n.next;while(n!==r);return s}function V0(r,t){const n=Hd(r.i,r.x,r.y),s=Hd(t.i,t.x,t.y),l=r.next,c=t.prev;return r.next=t,t.prev=r,n.next=l,l.prev=n,s.next=n,n.prev=s,c.next=s,s.prev=c,s}function wv(r,t,n,s){const l=Hd(r,t,n);return s?(l.next=s.next,l.prev=s,s.next.prev=l,s.next=l):(l.prev=l,l.next=l),l}function Jo(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Hd(r,t,n){return{i:r,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function bE(r,t,n,s){let l=0;for(let c=t,f=n-s;c<n;c+=s)l+=(r[f]-r[c])*(r[c+1]+r[f+1]),f=c;return l}class AE{static triangulate(t,n,s=2){return cE(t,n,s)}}class Rr{static area(t){const n=t.length;let s=0;for(let l=n-1,c=0;c<n;l=c++)s+=t[l].x*t[c].y-t[c].x*t[l].y;return s*.5}static isClockWise(t){return Rr.area(t)<0}static triangulateShape(t,n){const s=[],l=[],c=[];Dv(t),Uv(s,t);let f=t.length;n.forEach(Dv);for(let m=0;m<n.length;m++)l.push(f),f+=n[m].length,Uv(s,n[m]);const d=AE.triangulate(s,l);for(let m=0;m<d.length;m+=3)c.push(d.slice(m,m+3));return c}}function Dv(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Uv(r,t){for(let n=0;n<t.length;n++)r.push(t[n].x),r.push(t[n].y)}class k0 extends zn{constructor(t=new lE([new Ut(.5,.5),new Ut(-.5,.5),new Ut(-.5,-.5),new Ut(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];const s=this,l=[],c=[];for(let d=0,m=t.length;d<m;d++){const p=t[d];f(p)}this.setAttribute("position",new Ze(l,3)),this.setAttribute("uv",new Ze(c,2)),this.computeVertexNormals();function f(d){const m=[],p=n.curveSegments!==void 0?n.curveSegments:12,g=n.steps!==void 0?n.steps:1,_=n.depth!==void 0?n.depth:1;let y=n.bevelEnabled!==void 0?n.bevelEnabled:!0,S=n.bevelThickness!==void 0?n.bevelThickness:.2,E=n.bevelSize!==void 0?n.bevelSize:S-.1,b=n.bevelOffset!==void 0?n.bevelOffset:0,M=n.bevelSegments!==void 0?n.bevelSegments:3;const v=n.extrudePath,z=n.UVGenerator!==void 0?n.UVGenerator:RE;let U,R=!1,H,P,I,X;v&&(U=v.getSpacedPoints(g),R=!0,y=!1,H=v.computeFrenetFrames(g,!1),P=new V,I=new V,X=new V),y||(M=0,S=0,E=0,b=0);const D=d.extractPoints(p);let w=D.shape;const G=D.holes;if(!Rr.isClockWise(w)){w=w.reverse();for(let Et=0,yt=G.length;Et<yt;Et++){const mt=G[Et];Rr.isClockWise(mt)&&(G[Et]=mt.reverse())}}function rt(Et){const mt=10000000000000001e-36;let gt=Et[0];for(let zt=1;zt<=Et.length;zt++){const Ct=zt%Et.length,Ot=Et[Ct],oe=Ot.x-gt.x,le=Ot.y-gt.y,L=oe*oe+le*le,T=Math.max(Math.abs(Ot.x),Math.abs(Ot.y),Math.abs(gt.x),Math.abs(gt.y)),J=mt*T*T;if(L<=J){Et.splice(Ct,1),zt--;continue}gt=Ot}}rt(w),G.forEach(rt);const lt=G.length,ct=w;for(let Et=0;Et<lt;Et++){const yt=G[Et];w=w.concat(yt)}function O(Et,yt,mt){return yt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Et.clone().addScaledVector(yt,mt)}const K=w.length;function Y(Et,yt,mt){let gt,zt,Ct;const Ot=Et.x-yt.x,oe=Et.y-yt.y,le=mt.x-Et.x,L=mt.y-Et.y,T=Ot*Ot+oe*oe,J=Ot*L-oe*le;if(Math.abs(J)>Number.EPSILON){const ut=Math.sqrt(T),Tt=Math.sqrt(le*le+L*L),ft=yt.x-oe/ut,$t=yt.y+Ot/ut,Lt=mt.x-L/Tt,Qt=mt.y+le/Tt,Jt=((Lt-ft)*L-(Qt-$t)*le)/(Ot*L-oe*le);gt=ft+Ot*Jt-Et.x,zt=$t+oe*Jt-Et.y;const Rt=gt*gt+zt*zt;if(Rt<=2)return new Ut(gt,zt);Ct=Math.sqrt(Rt/2)}else{let ut=!1;Ot>Number.EPSILON?le>Number.EPSILON&&(ut=!0):Ot<-Number.EPSILON?le<-Number.EPSILON&&(ut=!0):Math.sign(oe)===Math.sign(L)&&(ut=!0),ut?(gt=-oe,zt=Ot,Ct=Math.sqrt(T)):(gt=Ot,zt=oe,Ct=Math.sqrt(T/2))}return new Ut(gt/Ct,zt/Ct)}const St=[];for(let Et=0,yt=ct.length,mt=yt-1,gt=Et+1;Et<yt;Et++,mt++,gt++)mt===yt&&(mt=0),gt===yt&&(gt=0),St[Et]=Y(ct[Et],ct[mt],ct[gt]);const At=[];let N,et=St.concat();for(let Et=0,yt=lt;Et<yt;Et++){const mt=G[Et];N=[];for(let gt=0,zt=mt.length,Ct=zt-1,Ot=gt+1;gt<zt;gt++,Ct++,Ot++)Ct===zt&&(Ct=0),Ot===zt&&(Ot=0),N[gt]=Y(mt[gt],mt[Ct],mt[Ot]);At.push(N),et=et.concat(N)}let Mt;if(M===0)Mt=Rr.triangulateShape(ct,G);else{const Et=[],yt=[];for(let mt=0;mt<M;mt++){const gt=mt/M,zt=S*Math.cos(gt*Math.PI/2),Ct=E*Math.sin(gt*Math.PI/2)+b;for(let Ot=0,oe=ct.length;Ot<oe;Ot++){const le=O(ct[Ot],St[Ot],Ct);Bt(le.x,le.y,-zt),gt===0&&Et.push(le)}for(let Ot=0,oe=lt;Ot<oe;Ot++){const le=G[Ot];N=At[Ot];const L=[];for(let T=0,J=le.length;T<J;T++){const ut=O(le[T],N[T],Ct);Bt(ut.x,ut.y,-zt),gt===0&&L.push(ut)}gt===0&&yt.push(L)}}Mt=Rr.triangulateShape(Et,yt)}const Dt=Mt.length,Ft=E+b;for(let Et=0;Et<K;Et++){const yt=y?O(w[Et],et[Et],Ft):w[Et];R?(I.copy(H.normals[0]).multiplyScalar(yt.x),P.copy(H.binormals[0]).multiplyScalar(yt.y),X.copy(U[0]).add(I).add(P),Bt(X.x,X.y,X.z)):Bt(yt.x,yt.y,0)}for(let Et=1;Et<=g;Et++)for(let yt=0;yt<K;yt++){const mt=y?O(w[yt],et[yt],Ft):w[yt];R?(I.copy(H.normals[Et]).multiplyScalar(mt.x),P.copy(H.binormals[Et]).multiplyScalar(mt.y),X.copy(U[Et]).add(I).add(P),Bt(X.x,X.y,X.z)):Bt(mt.x,mt.y,_/g*Et)}for(let Et=M-1;Et>=0;Et--){const yt=Et/M,mt=S*Math.cos(yt*Math.PI/2),gt=E*Math.sin(yt*Math.PI/2)+b;for(let zt=0,Ct=ct.length;zt<Ct;zt++){const Ot=O(ct[zt],St[zt],gt);Bt(Ot.x,Ot.y,_+mt)}for(let zt=0,Ct=G.length;zt<Ct;zt++){const Ot=G[zt];N=At[zt];for(let oe=0,le=Ot.length;oe<le;oe++){const L=O(Ot[oe],N[oe],gt);R?Bt(L.x,L.y+U[g-1].y,U[g-1].x+mt):Bt(L.x,L.y,_+mt)}}}it(),ht();function it(){const Et=l.length/3;if(y){let yt=0,mt=K*yt;for(let gt=0;gt<Dt;gt++){const zt=Mt[gt];qt(zt[2]+mt,zt[1]+mt,zt[0]+mt)}yt=g+M*2,mt=K*yt;for(let gt=0;gt<Dt;gt++){const zt=Mt[gt];qt(zt[0]+mt,zt[1]+mt,zt[2]+mt)}}else{for(let yt=0;yt<Dt;yt++){const mt=Mt[yt];qt(mt[2],mt[1],mt[0])}for(let yt=0;yt<Dt;yt++){const mt=Mt[yt];qt(mt[0]+K*g,mt[1]+K*g,mt[2]+K*g)}}s.addGroup(Et,l.length/3-Et,0)}function ht(){const Et=l.length/3;let yt=0;It(ct,yt),yt+=ct.length;for(let mt=0,gt=G.length;mt<gt;mt++){const zt=G[mt];It(zt,yt),yt+=zt.length}s.addGroup(Et,l.length/3-Et,1)}function It(Et,yt){let mt=Et.length;for(;--mt>=0;){const gt=mt;let zt=mt-1;zt<0&&(zt=Et.length-1);for(let Ct=0,Ot=g+M*2;Ct<Ot;Ct++){const oe=K*Ct,le=K*(Ct+1),L=yt+gt+oe,T=yt+zt+oe,J=yt+zt+le,ut=yt+gt+le;de(L,T,J,ut)}}}function Bt(Et,yt,mt){m.push(Et),m.push(yt),m.push(mt)}function qt(Et,yt,mt){Ne(Et),Ne(yt),Ne(mt);const gt=l.length/3,zt=z.generateTopUV(s,l,gt-3,gt-2,gt-1);B(zt[0]),B(zt[1]),B(zt[2])}function de(Et,yt,mt,gt){Ne(Et),Ne(yt),Ne(gt),Ne(yt),Ne(mt),Ne(gt);const zt=l.length/3,Ct=z.generateSideWallUV(s,l,zt-6,zt-3,zt-2,zt-1);B(Ct[0]),B(Ct[1]),B(Ct[3]),B(Ct[1]),B(Ct[2]),B(Ct[3])}function Ne(Et){l.push(m[Et*3+0]),l.push(m[Et*3+1]),l.push(m[Et*3+2])}function B(Et){c.push(Et.x),c.push(Et.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes,s=this.parameters.options;return CE(n,s,t)}static fromJSON(t,n){const s=[];for(let c=0,f=t.shapes.length;c<f;c++){const d=n[t.shapes[c]];s.push(d)}const l=t.options.extrudePath;return l!==void 0&&(t.options.extrudePath=new Qc[l.type]().fromJSON(l)),new k0(s,t.options)}}const RE={generateTopUV:function(r,t,n,s,l){const c=t[n*3],f=t[n*3+1],d=t[s*3],m=t[s*3+1],p=t[l*3],g=t[l*3+1];return[new Ut(c,f),new Ut(d,m),new Ut(p,g)]},generateSideWallUV:function(r,t,n,s,l,c){const f=t[n*3],d=t[n*3+1],m=t[n*3+2],p=t[s*3],g=t[s*3+1],_=t[s*3+2],y=t[l*3],S=t[l*3+1],E=t[l*3+2],b=t[c*3],M=t[c*3+1],v=t[c*3+2];return Math.abs(d-g)<Math.abs(f-p)?[new Ut(f,1-m),new Ut(p,1-_),new Ut(y,1-E),new Ut(b,1-v)]:[new Ut(d,1-m),new Ut(g,1-_),new Ut(S,1-E),new Ut(M,1-v)]}};function CE(r,t,n){if(n.shapes=[],Array.isArray(r))for(let s=0,l=r.length;s<l;s++){const c=r[s];n.shapes.push(c.uuid)}else n.shapes.push(r.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}class tu extends zn{constructor(t=1,n=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:s,heightSegments:l};const c=t/2,f=n/2,d=Math.floor(s),m=Math.floor(l),p=d+1,g=m+1,_=t/d,y=n/m,S=[],E=[],b=[],M=[];for(let v=0;v<g;v++){const z=v*y-f;for(let U=0;U<p;U++){const R=U*_-c;E.push(R,-z,0),b.push(0,0,1),M.push(U/d),M.push(1-v/m)}}for(let v=0;v<m;v++)for(let z=0;z<d;z++){const U=z+p*v,R=z+p*(v+1),H=z+1+p*(v+1),P=z+1+p*v;S.push(U,R,P),S.push(R,H,P)}this.setIndex(S),this.setAttribute("position",new Ze(E,3)),this.setAttribute("normal",new Ze(b,3)),this.setAttribute("uv",new Ze(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tu(t.width,t.height,t.widthSegments,t.heightSegments)}}class X0 extends zn{constructor(t=.5,n=1,s=32,l=1,c=0,f=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:n,thetaSegments:s,phiSegments:l,thetaStart:c,thetaLength:f},s=Math.max(3,s),l=Math.max(1,l);const d=[],m=[],p=[],g=[];let _=t;const y=(n-t)/l,S=new V,E=new Ut;for(let b=0;b<=l;b++){for(let M=0;M<=s;M++){const v=c+M/s*f;S.x=_*Math.cos(v),S.y=_*Math.sin(v),m.push(S.x,S.y,S.z),p.push(0,0,1),E.x=(S.x/n+1)/2,E.y=(S.y/n+1)/2,g.push(E.x,E.y)}_+=y}for(let b=0;b<l;b++){const M=b*(s+1);for(let v=0;v<s;v++){const z=v+M,U=z,R=z+s+1,H=z+s+2,P=z+1;d.push(U,R,P),d.push(R,H,P)}}this.setIndex(d),this.setAttribute("position",new Ze(m,3)),this.setAttribute("normal",new Ze(p,3)),this.setAttribute("uv",new Ze(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new X0(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class W0 extends zn{constructor(t=1,n=32,s=16,l=0,c=Math.PI*2,f=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:d},n=Math.max(3,Math.floor(n)),s=Math.max(2,Math.floor(s));const m=Math.min(f+d,Math.PI);let p=0;const g=[],_=new V,y=new V,S=[],E=[],b=[],M=[];for(let v=0;v<=s;v++){const z=[],U=v/s;let R=0;v===0&&f===0?R=.5/n:v===s&&m===Math.PI&&(R=-.5/n);for(let H=0;H<=n;H++){const P=H/n;_.x=-t*Math.cos(l+P*c)*Math.sin(f+U*d),_.y=t*Math.cos(f+U*d),_.z=t*Math.sin(l+P*c)*Math.sin(f+U*d),E.push(_.x,_.y,_.z),y.copy(_).normalize(),b.push(y.x,y.y,y.z),M.push(P+R,1-U),z.push(p++)}g.push(z)}for(let v=0;v<s;v++)for(let z=0;z<n;z++){const U=g[v][z+1],R=g[v][z],H=g[v+1][z],P=g[v+1][z+1];(v!==0||f>0)&&S.push(U,R,P),(v!==s-1||m<Math.PI)&&S.push(R,H,P)}this.setIndex(S),this.setAttribute("position",new Ze(E,3)),this.setAttribute("normal",new Ze(b,3)),this.setAttribute("uv",new Ze(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new W0(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class q0 extends zn{constructor(t=1,n=.4,s=12,l=48,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:s,tubularSegments:l,arc:c},s=Math.floor(s),l=Math.floor(l);const f=[],d=[],m=[],p=[],g=new V,_=new V,y=new V;for(let S=0;S<=s;S++)for(let E=0;E<=l;E++){const b=E/l*c,M=S/s*Math.PI*2;_.x=(t+n*Math.cos(M))*Math.cos(b),_.y=(t+n*Math.cos(M))*Math.sin(b),_.z=n*Math.sin(M),d.push(_.x,_.y,_.z),g.x=t*Math.cos(b),g.y=t*Math.sin(b),y.subVectors(_,g).normalize(),m.push(y.x,y.y,y.z),p.push(E/l),p.push(S/s)}for(let S=1;S<=s;S++)for(let E=1;E<=l;E++){const b=(l+1)*S+E-1,M=(l+1)*(S-1)+E-1,v=(l+1)*(S-1)+E,z=(l+1)*S+E;f.push(b,M,z),f.push(M,v,z)}this.setIndex(f),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(m,3)),this.setAttribute("uv",new Ze(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new q0(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Y0 extends zn{constructor(t=new I0(new V(-1,-1,0),new V(-1,1,0),new V(1,1,0)),n=64,s=1,l=8,c=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:s,radialSegments:l,closed:c};const f=t.computeFrenetFrames(n,c);this.tangents=f.tangents,this.normals=f.normals,this.binormals=f.binormals;const d=new V,m=new V,p=new Ut;let g=new V;const _=[],y=[],S=[],E=[];b(),this.setIndex(E),this.setAttribute("position",new Ze(_,3)),this.setAttribute("normal",new Ze(y,3)),this.setAttribute("uv",new Ze(S,2));function b(){for(let U=0;U<n;U++)M(U);M(c===!1?n:0),z(),v()}function M(U){g=t.getPointAt(U/n,g);const R=f.normals[U],H=f.binormals[U];for(let P=0;P<=l;P++){const I=P/l*Math.PI*2,X=Math.sin(I),D=-Math.cos(I);m.x=D*R.x+X*H.x,m.y=D*R.y+X*H.y,m.z=D*R.z+X*H.z,m.normalize(),y.push(m.x,m.y,m.z),d.x=g.x+s*m.x,d.y=g.y+s*m.y,d.z=g.z+s*m.z,_.push(d.x,d.y,d.z)}}function v(){for(let U=1;U<=n;U++)for(let R=1;R<=l;R++){const H=(l+1)*(U-1)+(R-1),P=(l+1)*U+(R-1),I=(l+1)*U+R,X=(l+1)*(U-1)+R;E.push(H,P,X),E.push(P,I,X)}}function z(){for(let U=0;U<=n;U++)for(let R=0;R<=l;R++)p.x=U/n,p.y=R/l,S.push(p.x,p.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Y0(new Qc[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class OR extends Cs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qd,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class PR extends Cs{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Me(16777215),this.specular=new Me(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qd,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Xd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class wE extends Cs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=YS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class DE extends Cs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class op extends mn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Me(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class zR extends op{constructor(t,n,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Me(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}}const Vh=new Je,Lv=new V,Nv=new V;class Z0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.mapType=Pi,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new np,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new Xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,s=this.matrix;Lv.setFromMatrixPosition(t.matrixWorld),n.position.copy(Lv),Nv.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(Nv),n.updateMatrixWorld(),Vh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vh,n.coordinateSystem,n.reversedDepth),n.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Vh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ov=new Je,Io=new V,kh=new V;class UE extends Z0{constructor(){super(new di(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ut(4,2),this._viewportCount=6,this._viewports=[new Xe(2,1,1,1),new Xe(0,1,1,1),new Xe(3,1,1,1),new Xe(1,1,1,1),new Xe(3,0,1,1),new Xe(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(t,n=0){const s=this.camera,l=this.matrix,c=t.distance||s.far;c!==s.far&&(s.far=c,s.updateProjectionMatrix()),Io.setFromMatrixPosition(t.matrixWorld),s.position.copy(Io),kh.copy(s.position),kh.add(this._cubeDirections[n]),s.up.copy(this._cubeUps[n]),s.lookAt(kh),s.updateMatrixWorld(),l.makeTranslation(-Io.x,-Io.y,-Io.z),Ov.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ov,s.coordinateSystem,s.reversedDepth)}}class IR extends op{constructor(t,n,s=0,l=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new UE}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class j0 extends C0{constructor(t=-1,n=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,f=s+t,d=l+n,m=l-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class LE extends Z0{constructor(){super(new j0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class BR extends op{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mn.DEFAULT_UP),this.updateMatrix(),this.target=new mn,this.shadow=new LE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class NE extends di{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Pv{constructor(t=1,n=0,s=0){this.radius=t,this.phi=n,this.theta=s}set(t,n,s){return this.radius=t,this.phi=n,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=_e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,s){return this.radius=Math.sqrt(t*t+n*n+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(_e(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const zv=new V;let zc,Xh;class FR extends mn{constructor(t=new V(0,0,1),n=new V(0,0,0),s=1,l=16776960,c=s*.2,f=c*.2){super(),this.type="ArrowHelper",zc===void 0&&(zc=new zn,zc.setAttribute("position",new Ze([0,0,0,0,1,0],3)),Xh=new ap(.5,1,5,1),Xh.translate(0,-.5,0)),this.position.copy(n),this.line=new jM(zc,new U0({color:l,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ni(Xh,new ep({color:l,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(s,c,f)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{zv.set(t.z,0,-t.x).normalize();const n=Math.acos(t.y);this.quaternion.setFromAxisAngle(zv,n)}}setLength(t,n=t*.2,s=n*.2){this.line.scale.set(1,Math.max(1e-4,t-n),1),this.line.updateMatrix(),this.cone.scale.set(s,n,s),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class OE extends As{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Iv(r,t,n,s){const l=PE(s);switch(n){case g0:return r*t;case v0:return r*t/l.components*l.byteLength;case Zd:return r*t/l.components*l.byteLength;case y0:return r*t*2/l.components*l.byteLength;case jd:return r*t*2/l.components*l.byteLength;case _0:return r*t*3/l.components*l.byteLength;case Si:return r*t*4/l.components*l.byteLength;case Kd:return r*t*4/l.components*l.byteLength;case Gc:case Vc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case kc:case Xc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case hd:case pd:return Math.max(r,16)*Math.max(t,8)/4;case fd:case dd:return Math.max(r,8)*Math.max(t,8)/2;case md:case gd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case _d:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case vd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case yd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case xd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Sd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Md:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Ed:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Td:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case bd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Ad:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Rd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Cd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case wd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Dd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Ud:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Ld:case Nd:case Od:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Pd:case zd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Id:case Bd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function PE(r){switch(r){case Pi:case h0:return{byteLength:1,components:1};case Xo:case d0:case $o:return{byteLength:2,components:1};case qd:case Yd:return{byteLength:2,components:4};case Ms:case Wd:case la:return{byteLength:4,components:1};case p0:case m0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kd);function K0(){let r=null,t=!1,n=null,s=null;function l(c,f){n(c,f),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function zE(r){const t=new WeakMap;function n(d,m){const p=d.array,g=d.usage,_=p.byteLength,y=r.createBuffer();r.bindBuffer(m,y),r.bufferData(m,p,g),d.onUploadCallback();let S;if(p instanceof Float32Array)S=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=r.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=r.HALF_FLOAT:S=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=r.SHORT;else if(p instanceof Uint32Array)S=r.UNSIGNED_INT;else if(p instanceof Int32Array)S=r.INT;else if(p instanceof Int8Array)S=r.BYTE;else if(p instanceof Uint8Array)S=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:y,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function s(d,m,p){const g=m.array,_=m.updateRanges;if(r.bindBuffer(p,d),_.length===0)r.bufferSubData(p,0,g);else{_.sort((S,E)=>S.start-E.start);let y=0;for(let S=1;S<_.length;S++){const E=_[y],b=_[S];b.start<=E.start+E.count+1?E.count=Math.max(E.count,b.start+b.count-E.start):(++y,_[y]=b)}_.length=y+1;for(let S=0,E=_.length;S<E;S++){const b=_[S];r.bufferSubData(p,b.start*g.BYTES_PER_ELEMENT,g,b.start,b.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function f(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,n(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:f}}var IE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,BE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,FE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,HE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,VE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,XE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,WE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,qE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,YE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ZE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,KE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,QE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,JE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$E=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,iT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,aT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,sT=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,rT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,oT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,lT=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,cT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dT="gl_FragColor = linearToOutputTexel( gl_FragColor );",pT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_T=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ST=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,MT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ET=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,TT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,AT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,RT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,DT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,UT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,LT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,NT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,OT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,PT=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,IT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,BT=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,FT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,HT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,GT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,XT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,WT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,YT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ZT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,KT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,QT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$T=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,eb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ib=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ab=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ob=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ub=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,hb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,db=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_b=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,yb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Mb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Eb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ab=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Db=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ub=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Lb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ob=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Pb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ib=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,kb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$b=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,eA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,aA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,oA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ge={alphahash_fragment:IE,alphahash_pars_fragment:BE,alphamap_fragment:FE,alphamap_pars_fragment:HE,alphatest_fragment:GE,alphatest_pars_fragment:VE,aomap_fragment:kE,aomap_pars_fragment:XE,batching_pars_vertex:WE,batching_vertex:qE,begin_vertex:YE,beginnormal_vertex:ZE,bsdfs:jE,iridescence_fragment:KE,bumpmap_pars_fragment:QE,clipping_planes_fragment:JE,clipping_planes_pars_fragment:$E,clipping_planes_pars_vertex:tT,clipping_planes_vertex:eT,color_fragment:nT,color_pars_fragment:iT,color_pars_vertex:aT,color_vertex:sT,common:rT,cube_uv_reflection_fragment:oT,defaultnormal_vertex:lT,displacementmap_pars_vertex:cT,displacementmap_vertex:uT,emissivemap_fragment:fT,emissivemap_pars_fragment:hT,colorspace_fragment:dT,colorspace_pars_fragment:pT,envmap_fragment:mT,envmap_common_pars_fragment:gT,envmap_pars_fragment:_T,envmap_pars_vertex:vT,envmap_physical_pars_fragment:wT,envmap_vertex:yT,fog_vertex:xT,fog_pars_vertex:ST,fog_fragment:MT,fog_pars_fragment:ET,gradientmap_pars_fragment:TT,lightmap_pars_fragment:bT,lights_lambert_fragment:AT,lights_lambert_pars_fragment:RT,lights_pars_begin:CT,lights_toon_fragment:DT,lights_toon_pars_fragment:UT,lights_phong_fragment:LT,lights_phong_pars_fragment:NT,lights_physical_fragment:OT,lights_physical_pars_fragment:PT,lights_fragment_begin:zT,lights_fragment_maps:IT,lights_fragment_end:BT,logdepthbuf_fragment:FT,logdepthbuf_pars_fragment:HT,logdepthbuf_pars_vertex:GT,logdepthbuf_vertex:VT,map_fragment:kT,map_pars_fragment:XT,map_particle_fragment:WT,map_particle_pars_fragment:qT,metalnessmap_fragment:YT,metalnessmap_pars_fragment:ZT,morphinstance_vertex:jT,morphcolor_vertex:KT,morphnormal_vertex:QT,morphtarget_pars_vertex:JT,morphtarget_vertex:$T,normal_fragment_begin:tb,normal_fragment_maps:eb,normal_pars_fragment:nb,normal_pars_vertex:ib,normal_vertex:ab,normalmap_pars_fragment:sb,clearcoat_normal_fragment_begin:rb,clearcoat_normal_fragment_maps:ob,clearcoat_pars_fragment:lb,iridescence_pars_fragment:cb,opaque_fragment:ub,packing:fb,premultiplied_alpha_fragment:hb,project_vertex:db,dithering_fragment:pb,dithering_pars_fragment:mb,roughnessmap_fragment:gb,roughnessmap_pars_fragment:_b,shadowmap_pars_fragment:vb,shadowmap_pars_vertex:yb,shadowmap_vertex:xb,shadowmask_pars_fragment:Sb,skinbase_vertex:Mb,skinning_pars_vertex:Eb,skinning_vertex:Tb,skinnormal_vertex:bb,specularmap_fragment:Ab,specularmap_pars_fragment:Rb,tonemapping_fragment:Cb,tonemapping_pars_fragment:wb,transmission_fragment:Db,transmission_pars_fragment:Ub,uv_pars_fragment:Lb,uv_pars_vertex:Nb,uv_vertex:Ob,worldpos_vertex:Pb,background_vert:zb,background_frag:Ib,backgroundCube_vert:Bb,backgroundCube_frag:Fb,cube_vert:Hb,cube_frag:Gb,depth_vert:Vb,depth_frag:kb,distanceRGBA_vert:Xb,distanceRGBA_frag:Wb,equirect_vert:qb,equirect_frag:Yb,linedashed_vert:Zb,linedashed_frag:jb,meshbasic_vert:Kb,meshbasic_frag:Qb,meshlambert_vert:Jb,meshlambert_frag:$b,meshmatcap_vert:tA,meshmatcap_frag:eA,meshnormal_vert:nA,meshnormal_frag:iA,meshphong_vert:aA,meshphong_frag:sA,meshphysical_vert:rA,meshphysical_frag:oA,meshtoon_vert:lA,meshtoon_frag:cA,points_vert:uA,points_frag:fA,shadow_vert:hA,shadow_frag:dA,sprite_vert:pA,sprite_frag:mA},Vt={common:{diffuse:{value:new Me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new me},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new me}},envmap:{envMap:{value:null},envMapRotation:{value:new me},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new me}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new me}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new me},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new me},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new me},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new me}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new me}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new me}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0},uvTransform:{value:new me}},sprite:{diffuse:{value:new Me(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new me},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0}}},Di={basic:{uniforms:Pn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.fog]),vertexShader:ge.meshbasic_vert,fragmentShader:ge.meshbasic_frag},lambert:{uniforms:Pn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,Vt.lights,{emissive:{value:new Me(0)}}]),vertexShader:ge.meshlambert_vert,fragmentShader:ge.meshlambert_frag},phong:{uniforms:Pn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,Vt.lights,{emissive:{value:new Me(0)},specular:{value:new Me(1118481)},shininess:{value:30}}]),vertexShader:ge.meshphong_vert,fragmentShader:ge.meshphong_frag},standard:{uniforms:Pn([Vt.common,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.roughnessmap,Vt.metalnessmap,Vt.fog,Vt.lights,{emissive:{value:new Me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag},toon:{uniforms:Pn([Vt.common,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.gradientmap,Vt.fog,Vt.lights,{emissive:{value:new Me(0)}}]),vertexShader:ge.meshtoon_vert,fragmentShader:ge.meshtoon_frag},matcap:{uniforms:Pn([Vt.common,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,{matcap:{value:null}}]),vertexShader:ge.meshmatcap_vert,fragmentShader:ge.meshmatcap_frag},points:{uniforms:Pn([Vt.points,Vt.fog]),vertexShader:ge.points_vert,fragmentShader:ge.points_frag},dashed:{uniforms:Pn([Vt.common,Vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ge.linedashed_vert,fragmentShader:ge.linedashed_frag},depth:{uniforms:Pn([Vt.common,Vt.displacementmap]),vertexShader:ge.depth_vert,fragmentShader:ge.depth_frag},normal:{uniforms:Pn([Vt.common,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,{opacity:{value:1}}]),vertexShader:ge.meshnormal_vert,fragmentShader:ge.meshnormal_frag},sprite:{uniforms:Pn([Vt.sprite,Vt.fog]),vertexShader:ge.sprite_vert,fragmentShader:ge.sprite_frag},background:{uniforms:{uvTransform:{value:new me},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ge.background_vert,fragmentShader:ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new me}},vertexShader:ge.backgroundCube_vert,fragmentShader:ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ge.cube_vert,fragmentShader:ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ge.equirect_vert,fragmentShader:ge.equirect_frag},distanceRGBA:{uniforms:Pn([Vt.common,Vt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ge.distanceRGBA_vert,fragmentShader:ge.distanceRGBA_frag},shadow:{uniforms:Pn([Vt.lights,Vt.fog,{color:{value:new Me(0)},opacity:{value:1}}]),vertexShader:ge.shadow_vert,fragmentShader:ge.shadow_frag}};Di.physical={uniforms:Pn([Di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new me},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new me},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new me},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new me},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new me},sheen:{value:0},sheenColor:{value:new Me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new me},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new me},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new me},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new me},attenuationDistance:{value:0},attenuationColor:{value:new Me(0)},specularColor:{value:new Me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new me},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new me},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new me}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag};const Ic={r:0,b:0,g:0},ms=new Ei,gA=new Je;function _A(r,t,n,s,l,c,f){const d=new Me(0);let m=c===!0?0:1,p,g,_=null,y=0,S=null;function E(U){let R=U.isScene===!0?U.background:null;return R&&R.isTexture&&(R=(U.backgroundBlurriness>0?n:t).get(R)),R}function b(U){let R=!1;const H=E(U);H===null?v(d,m):H&&H.isColor&&(v(H,1),R=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?s.buffers.color.setClear(0,0,0,1,f):P==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||R)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function M(U,R){const H=E(R);H&&(H.isCubeTexture||H.mapping===Jc)?(g===void 0&&(g=new Ni(new el(1,1,1),new Wa({name:"BackgroundCubeMaterial",uniforms:zr(Di.backgroundCube.uniforms),vertexShader:Di.backgroundCube.vertexShader,fragmentShader:Di.backgroundCube.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(P,I,X){this.matrixWorld.copyPosition(X.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),ms.copy(R.backgroundRotation),ms.x*=-1,ms.y*=-1,ms.z*=-1,H.isCubeTexture&&H.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),g.material.uniforms.envMap.value=H,g.material.uniforms.flipEnvMap.value=H.isCubeTexture&&H.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(gA.makeRotationFromEuler(ms)),g.material.toneMapped=Ue.getTransfer(H.colorSpace)!==Ve,(_!==H||y!==H.version||S!==r.toneMapping)&&(g.material.needsUpdate=!0,_=H,y=H.version,S=r.toneMapping),g.layers.enableAll(),U.unshift(g,g.geometry,g.material,0,0,null)):H&&H.isTexture&&(p===void 0&&(p=new Ni(new tu(2,2),new Wa({name:"BackgroundMaterial",uniforms:zr(Di.background.uniforms),vertexShader:Di.background.vertexShader,fragmentShader:Di.background.fragmentShader,side:Xa,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=H,p.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,p.material.toneMapped=Ue.getTransfer(H.colorSpace)!==Ve,H.matrixAutoUpdate===!0&&H.updateMatrix(),p.material.uniforms.uvTransform.value.copy(H.matrix),(_!==H||y!==H.version||S!==r.toneMapping)&&(p.material.needsUpdate=!0,_=H,y=H.version,S=r.toneMapping),p.layers.enableAll(),U.unshift(p,p.geometry,p.material,0,0,null))}function v(U,R){U.getRGB(Ic,R0(r)),s.buffers.color.setClear(Ic.r,Ic.g,Ic.b,R,f)}function z(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(U,R=1){d.set(U),m=R,v(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(U){m=U,v(d,m)},render:b,addToRenderList:M,dispose:z}}function vA(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=y(null);let c=l,f=!1;function d(w,G,Q,rt,lt){let ct=!1;const O=_(rt,Q,G);c!==O&&(c=O,p(c.object)),ct=S(w,rt,Q,lt),ct&&E(w,rt,Q,lt),lt!==null&&t.update(lt,r.ELEMENT_ARRAY_BUFFER),(ct||f)&&(f=!1,R(w,G,Q,rt),lt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(lt).buffer))}function m(){return r.createVertexArray()}function p(w){return r.bindVertexArray(w)}function g(w){return r.deleteVertexArray(w)}function _(w,G,Q){const rt=Q.wireframe===!0;let lt=s[w.id];lt===void 0&&(lt={},s[w.id]=lt);let ct=lt[G.id];ct===void 0&&(ct={},lt[G.id]=ct);let O=ct[rt];return O===void 0&&(O=y(m()),ct[rt]=O),O}function y(w){const G=[],Q=[],rt=[];for(let lt=0;lt<n;lt++)G[lt]=0,Q[lt]=0,rt[lt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:Q,attributeDivisors:rt,object:w,attributes:{},index:null}}function S(w,G,Q,rt){const lt=c.attributes,ct=G.attributes;let O=0;const K=Q.getAttributes();for(const Y in K)if(K[Y].location>=0){const At=lt[Y];let N=ct[Y];if(N===void 0&&(Y==="instanceMatrix"&&w.instanceMatrix&&(N=w.instanceMatrix),Y==="instanceColor"&&w.instanceColor&&(N=w.instanceColor)),At===void 0||At.attribute!==N||N&&At.data!==N.data)return!0;O++}return c.attributesNum!==O||c.index!==rt}function E(w,G,Q,rt){const lt={},ct=G.attributes;let O=0;const K=Q.getAttributes();for(const Y in K)if(K[Y].location>=0){let At=ct[Y];At===void 0&&(Y==="instanceMatrix"&&w.instanceMatrix&&(At=w.instanceMatrix),Y==="instanceColor"&&w.instanceColor&&(At=w.instanceColor));const N={};N.attribute=At,At&&At.data&&(N.data=At.data),lt[Y]=N,O++}c.attributes=lt,c.attributesNum=O,c.index=rt}function b(){const w=c.newAttributes;for(let G=0,Q=w.length;G<Q;G++)w[G]=0}function M(w){v(w,0)}function v(w,G){const Q=c.newAttributes,rt=c.enabledAttributes,lt=c.attributeDivisors;Q[w]=1,rt[w]===0&&(r.enableVertexAttribArray(w),rt[w]=1),lt[w]!==G&&(r.vertexAttribDivisor(w,G),lt[w]=G)}function z(){const w=c.newAttributes,G=c.enabledAttributes;for(let Q=0,rt=G.length;Q<rt;Q++)G[Q]!==w[Q]&&(r.disableVertexAttribArray(Q),G[Q]=0)}function U(w,G,Q,rt,lt,ct,O){O===!0?r.vertexAttribIPointer(w,G,Q,lt,ct):r.vertexAttribPointer(w,G,Q,rt,lt,ct)}function R(w,G,Q,rt){b();const lt=rt.attributes,ct=Q.getAttributes(),O=G.defaultAttributeValues;for(const K in ct){const Y=ct[K];if(Y.location>=0){let St=lt[K];if(St===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(St=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(St=w.instanceColor)),St!==void 0){const At=St.normalized,N=St.itemSize,et=t.get(St);if(et===void 0)continue;const Mt=et.buffer,Dt=et.type,Ft=et.bytesPerElement,it=Dt===r.INT||Dt===r.UNSIGNED_INT||St.gpuType===Wd;if(St.isInterleavedBufferAttribute){const ht=St.data,It=ht.stride,Bt=St.offset;if(ht.isInstancedInterleavedBuffer){for(let qt=0;qt<Y.locationSize;qt++)v(Y.location+qt,ht.meshPerAttribute);w.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let qt=0;qt<Y.locationSize;qt++)M(Y.location+qt);r.bindBuffer(r.ARRAY_BUFFER,Mt);for(let qt=0;qt<Y.locationSize;qt++)U(Y.location+qt,N/Y.locationSize,Dt,At,It*Ft,(Bt+N/Y.locationSize*qt)*Ft,it)}else{if(St.isInstancedBufferAttribute){for(let ht=0;ht<Y.locationSize;ht++)v(Y.location+ht,St.meshPerAttribute);w.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let ht=0;ht<Y.locationSize;ht++)M(Y.location+ht);r.bindBuffer(r.ARRAY_BUFFER,Mt);for(let ht=0;ht<Y.locationSize;ht++)U(Y.location+ht,N/Y.locationSize,Dt,At,N*Ft,N/Y.locationSize*ht*Ft,it)}}else if(O!==void 0){const At=O[K];if(At!==void 0)switch(At.length){case 2:r.vertexAttrib2fv(Y.location,At);break;case 3:r.vertexAttrib3fv(Y.location,At);break;case 4:r.vertexAttrib4fv(Y.location,At);break;default:r.vertexAttrib1fv(Y.location,At)}}}}z()}function H(){X();for(const w in s){const G=s[w];for(const Q in G){const rt=G[Q];for(const lt in rt)g(rt[lt].object),delete rt[lt];delete G[Q]}delete s[w]}}function P(w){if(s[w.id]===void 0)return;const G=s[w.id];for(const Q in G){const rt=G[Q];for(const lt in rt)g(rt[lt].object),delete rt[lt];delete G[Q]}delete s[w.id]}function I(w){for(const G in s){const Q=s[G];if(Q[w.id]===void 0)continue;const rt=Q[w.id];for(const lt in rt)g(rt[lt].object),delete rt[lt];delete Q[w.id]}}function X(){D(),f=!0,c!==l&&(c=l,p(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:X,resetDefaultState:D,dispose:H,releaseStatesOfGeometry:P,releaseStatesOfProgram:I,initAttributes:b,enableAttribute:M,disableUnusedAttributes:z}}function yA(r,t,n){let s;function l(p){s=p}function c(p,g){r.drawArrays(s,p,g),n.update(g,s,1)}function f(p,g,_){_!==0&&(r.drawArraysInstanced(s,p,g,_),n.update(g,s,_))}function d(p,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,g,0,_);let S=0;for(let E=0;E<_;E++)S+=g[E];n.update(S,s,1)}function m(p,g,_,y){if(_===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<p.length;E++)f(p[E],g[E],y[E]);else{S.multiDrawArraysInstancedWEBGL(s,p,0,g,0,y,0,_);let E=0;for(let b=0;b<_;b++)E+=g[b]*y[b];n.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function xA(r,t,n,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(I){return!(I!==Si&&s.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(I){const X=I===$o&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==Pi&&s.convert(I)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==la&&!X)}function m(I){if(I==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=n.logarithmicDepthBuffer===!0,y=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),S=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),z=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),U=r.getParameter(r.MAX_VARYING_VECTORS),R=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),H=E>0,P=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:y,maxTextures:S,maxVertexTextures:E,maxTextureSize:b,maxCubemapSize:M,maxAttributes:v,maxVertexUniforms:z,maxVaryings:U,maxFragmentUniforms:R,vertexTextures:H,maxSamples:P}}function SA(r){const t=this;let n=null,s=0,l=!1,c=!1;const f=new Ha,d=new me,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,y){const S=_.length!==0||y||s!==0||l;return l=y,s=_.length,S},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,y){n=g(_,y,0)},this.setState=function(_,y,S){const E=_.clippingPlanes,b=_.clipIntersection,M=_.clipShadows,v=r.get(_);if(!l||E===null||E.length===0||c&&!M)c?g(null):p();else{const z=c?0:s,U=z*4;let R=v.clippingState||null;m.value=R,R=g(E,y,U,S);for(let H=0;H!==U;++H)R[H]=n[H];v.clippingState=R,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=z}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(_,y,S,E){const b=_!==null?_.length:0;let M=null;if(b!==0){if(M=m.value,E!==!0||M===null){const v=S+b*4,z=y.matrixWorldInverse;d.getNormalMatrix(z),(M===null||M.length<v)&&(M=new Float32Array(v));for(let U=0,R=S;U!==b;++U,R+=4)f.copy(_[U]).applyMatrix4(z,d),f.normal.toArray(M,R),M[R+3]=f.constant}m.value=M,m.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,M}}function MA(r){let t=new WeakMap;function n(f,d){return d===od?f.mapping=Nr:d===ld&&(f.mapping=Or),f}function s(f){if(f&&f.isTexture){const d=f.mapping;if(d===od||d===ld)if(t.has(f)){const m=t.get(f).texture;return n(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const p=new XM(m.height);return p.fromEquirectangularTexture(r,f),t.set(f,p),f.addEventListener("dispose",l),n(p.texture,f.mapping)}else return null}}return f}function l(f){const d=f.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}const Cr=4,Bv=[.125,.215,.35,.446,.526,.582],ys=20,Wh=new j0,Fv=new Me;let qh=null,Yh=0,Zh=0,jh=!1;const _s=(1+Math.sqrt(5))/2,Tr=1/_s,Hv=[new V(-_s,Tr,0),new V(_s,Tr,0),new V(-Tr,0,_s),new V(Tr,0,_s),new V(0,_s,-Tr),new V(0,_s,Tr),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],EA=new V;class Gv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,s=.1,l=100,c={}){const{size:f=256,position:d=EA}=c;qh=this._renderer.getRenderTarget(),Yh=this._renderer.getActiveCubeFace(),Zh=this._renderer.getActiveMipmapLevel(),jh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,s,l,m,d),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qh,Yh,Zh),this._renderer.xr.enabled=jh,t.scissorTest=!1,Bc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Nr||t.mapping===Or?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qh=this._renderer.getRenderTarget(),Yh=this._renderer.getActiveCubeFace(),Zh=this._renderer.getActiveMipmapLevel(),jh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=n||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,s={magFilter:Ui,minFilter:Ui,generateMipmaps:!1,type:$o,format:Si,colorSpace:Pr,depthBuffer:!1},l=Vv(t,n,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vv(t,n,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=TA(c)),this._blurMaterial=bA(c,t,n)}return l}_compileMaterial(t){const n=new Ni(this._lodPlanes[0],t);this._renderer.compile(n,Wh)}_sceneToCubeUV(t,n,s,l,c){const m=new di(90,1,n,s),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,y=_.autoClear,S=_.toneMapping;_.getClearColor(Fv),_.toneMapping=ka,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null));const b=new ep({name:"PMREM.Background",side:Xn,depthWrite:!1,depthTest:!1}),M=new Ni(new el,b);let v=!1;const z=t.background;z?z.isColor&&(b.color.copy(z),t.background=null,v=!0):(b.color.copy(Fv),v=!0);for(let U=0;U<6;U++){const R=U%3;R===0?(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+g[U],c.y,c.z)):R===1?(m.up.set(0,0,p[U]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+g[U],c.z)):(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+g[U]));const H=this._cubeSize;Bc(l,R*H,U>2?H:0,H,H),_.setRenderTarget(l),v&&_.render(M,m),_.render(t,m)}M.geometry.dispose(),M.material.dispose(),_.toneMapping=S,_.autoClear=y,t.background=z}_textureToCubeUV(t,n){const s=this._renderer,l=t.mapping===Nr||t.mapping===Or;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new Ni(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;Bc(n,0,0,3*m,2*m),s.setRenderTarget(n),s.render(f,Wh)}_applyPMREM(t){const n=this._renderer,s=n.autoClear;n.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=Hv[(l-c-1)%Hv.length];this._blur(t,c-1,c,f,d)}n.autoClear=s}_blur(t,n,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,s,l,"latitudinal",c),this._halfBlur(f,t,s,s,l,"longitudinal",c)}_halfBlur(t,n,s,l,c,f,d){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Ni(this._lodPlanes[l],p),y=p.uniforms,S=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*ys-1),b=c/E,M=isFinite(c)?1+Math.floor(g*b):ys;M>ys&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${ys}`);const v=[];let z=0;for(let I=0;I<ys;++I){const X=I/b,D=Math.exp(-X*X/2);v.push(D),I===0?z+=D:I<M&&(z+=2*D)}for(let I=0;I<v.length;I++)v[I]=v[I]/z;y.envMap.value=t.texture,y.samples.value=M,y.weights.value=v,y.latitudinal.value=f==="latitudinal",d&&(y.poleAxis.value=d);const{_lodMax:U}=this;y.dTheta.value=E,y.mipInt.value=U-s;const R=this._sizeLods[l],H=3*R*(l>U-Cr?l-U+Cr:0),P=4*(this._cubeSize-R);Bc(n,H,P,3*R,2*R),m.setRenderTarget(n),m.render(_,Wh)}}function TA(r){const t=[],n=[],s=[];let l=r;const c=r-Cr+1+Bv.length;for(let f=0;f<c;f++){const d=Math.pow(2,l);n.push(d);let m=1/d;f>r-Cr?m=Bv[f-r+Cr-1]:f===0&&(m=0),s.push(m);const p=1/(d-2),g=-p,_=1+p,y=[g,g,_,g,_,_,g,g,_,_,g,_],S=6,E=6,b=3,M=2,v=1,z=new Float32Array(b*E*S),U=new Float32Array(M*E*S),R=new Float32Array(v*E*S);for(let P=0;P<S;P++){const I=P%3*2/3-1,X=P>2?0:-1,D=[I,X,0,I+2/3,X,0,I+2/3,X+1,0,I,X,0,I+2/3,X+1,0,I,X+1,0];z.set(D,b*E*P),U.set(y,M*E*P);const w=[P,P,P,P,P,P];R.set(w,v*E*P)}const H=new zn;H.setAttribute("position",new Oi(z,b)),H.setAttribute("uv",new Oi(U,M)),H.setAttribute("faceIndex",new Oi(R,v)),t.push(H),l>Cr&&l--}return{lodPlanes:t,sizeLods:n,sigmas:s}}function Vv(r,t,n){const s=new Ts(r,t,n);return s.texture.mapping=Jc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Bc(r,t,n,s,l){r.viewport.set(t,n,s,l),r.scissor.set(t,n,s,l)}function bA(r,t,n){const s=new Float32Array(ys),l=new V(0,1,0);return new Wa({name:"SphericalGaussianBlur",defines:{n:ys,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:lp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Va,depthTest:!1,depthWrite:!1})}function kv(){return new Wa({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Va,depthTest:!1,depthWrite:!1})}function Xv(){return new Wa({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Va,depthTest:!1,depthWrite:!1})}function lp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function AA(r){let t=new WeakMap,n=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===od||m===ld,g=m===Nr||m===Or;if(p||g){let _=t.get(d);const y=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==y)return n===null&&(n=new Gv(r)),_=p?n.fromEquirectangular(d,_):n.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const S=d.image;return p&&S&&S.height>0||g&&S&&l(S)?(n===null&&(n=new Gv(r)),_=p?n.fromEquirectangular(d):n.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function RA(r){const t={};function n(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return n(s)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(s){const l=n(s);return l===null&&jo("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function CA(r,t,n,s){const l={},c=new WeakMap;function f(_){const y=_.target;y.index!==null&&t.remove(y.index);for(const E in y.attributes)t.remove(y.attributes[E]);y.removeEventListener("dispose",f),delete l[y.id];const S=c.get(y);S&&(t.remove(S),c.delete(y)),s.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,n.memory.geometries--}function d(_,y){return l[y.id]===!0||(y.addEventListener("dispose",f),l[y.id]=!0,n.memory.geometries++),y}function m(_){const y=_.attributes;for(const S in y)t.update(y[S],r.ARRAY_BUFFER)}function p(_){const y=[],S=_.index,E=_.attributes.position;let b=0;if(S!==null){const z=S.array;b=S.version;for(let U=0,R=z.length;U<R;U+=3){const H=z[U+0],P=z[U+1],I=z[U+2];y.push(H,P,P,I,I,H)}}else if(E!==void 0){const z=E.array;b=E.version;for(let U=0,R=z.length/3-1;U<R;U+=3){const H=U+0,P=U+1,I=U+2;y.push(H,P,P,I,I,H)}}else return;const M=new(S0(y)?A0:b0)(y,1);M.version=b;const v=c.get(_);v&&t.remove(v),c.set(_,M)}function g(_){const y=c.get(_);if(y){const S=_.index;S!==null&&y.version<S.version&&p(_)}else p(_);return c.get(_)}return{get:d,update:m,getWireframeAttribute:g}}function wA(r,t,n){let s;function l(y){s=y}let c,f;function d(y){c=y.type,f=y.bytesPerElement}function m(y,S){r.drawElements(s,S,c,y*f),n.update(S,s,1)}function p(y,S,E){E!==0&&(r.drawElementsInstanced(s,S,c,y*f,E),n.update(S,s,E))}function g(y,S,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,S,0,c,y,0,E);let M=0;for(let v=0;v<E;v++)M+=S[v];n.update(M,s,1)}function _(y,S,E,b){if(E===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let v=0;v<y.length;v++)p(y[v]/f,S[v],b[v]);else{M.multiDrawElementsInstancedWEBGL(s,S,0,c,y,0,b,0,E);let v=0;for(let z=0;z<E;z++)v+=S[z]*b[z];n.update(v,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function DA(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,d){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=d*(c/3);break;case r.LINES:n.lines+=d*(c/2);break;case r.LINE_STRIP:n.lines+=d*(c-1);break;case r.LINE_LOOP:n.lines+=d*c;break;case r.POINTS:n.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:s}}function UA(r,t,n){const s=new WeakMap,l=new Xe;function c(f,d,m){const p=f.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let y=s.get(d);if(y===void 0||y.count!==_){let D=function(){I.dispose(),s.delete(d),d.removeEventListener("dispose",D)};y!==void 0&&y.texture.dispose();const S=d.morphAttributes.position!==void 0,E=d.morphAttributes.normal!==void 0,b=d.morphAttributes.color!==void 0,M=d.morphAttributes.position||[],v=d.morphAttributes.normal||[],z=d.morphAttributes.color||[];let U=0;S===!0&&(U=1),E===!0&&(U=2),b===!0&&(U=3);let R=d.attributes.position.count*U,H=1;R>t.maxTextureSize&&(H=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const P=new Float32Array(R*H*4*_),I=new M0(P,R,H,_);I.type=la,I.needsUpdate=!0;const X=U*4;for(let w=0;w<_;w++){const G=M[w],Q=v[w],rt=z[w],lt=R*H*4*w;for(let ct=0;ct<G.count;ct++){const O=ct*X;S===!0&&(l.fromBufferAttribute(G,ct),P[lt+O+0]=l.x,P[lt+O+1]=l.y,P[lt+O+2]=l.z,P[lt+O+3]=0),E===!0&&(l.fromBufferAttribute(Q,ct),P[lt+O+4]=l.x,P[lt+O+5]=l.y,P[lt+O+6]=l.z,P[lt+O+7]=0),b===!0&&(l.fromBufferAttribute(rt,ct),P[lt+O+8]=l.x,P[lt+O+9]=l.y,P[lt+O+10]=l.z,P[lt+O+11]=rt.itemSize===4?l.w:1)}}y={count:_,texture:I,size:new Ut(R,H)},s.set(d,y),d.addEventListener("dispose",D)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let S=0;for(let b=0;b<p.length;b++)S+=p[b];const E=d.morphTargetsRelative?1:1-S;m.getUniforms().setValue(r,"morphTargetBaseInfluence",E),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",y.texture,n),m.getUniforms().setValue(r,"morphTargetsTextureSize",y.size)}return{update:c}}function LA(r,t,n,s){let l=new WeakMap;function c(m){const p=s.render.frame,g=m.geometry,_=t.get(m,g);if(l.get(_)!==p&&(t.update(_),l.set(_,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(n.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&n.update(m.instanceColor,r.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const y=m.skeleton;l.get(y)!==p&&(y.update(),l.set(y,p))}return _}function f(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:c,dispose:f}}const Q0=new Wn,Wv=new L0(1,1),J0=new M0,$0=new RM,ty=new w0,qv=[],Yv=[],Zv=new Float32Array(16),jv=new Float32Array(9),Kv=new Float32Array(4);function Br(r,t,n){const s=r[0];if(s<=0||s>0)return r;const l=t*n;let c=qv[l];if(c===void 0&&(c=new Float32Array(l),qv[l]=c),t!==0){s.toArray(c,0);for(let f=1,d=0;f!==t;++f)d+=n,r[f].toArray(c,d)}return c}function gn(r,t){if(r.length!==t.length)return!1;for(let n=0,s=r.length;n<s;n++)if(r[n]!==t[n])return!1;return!0}function _n(r,t){for(let n=0,s=t.length;n<s;n++)r[n]=t[n]}function eu(r,t){let n=Yv[t];n===void 0&&(n=new Int32Array(t),Yv[t]=n);for(let s=0;s!==t;++s)n[s]=r.allocateTextureUnit();return n}function NA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function OA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(gn(n,t))return;r.uniform2fv(this.addr,t),_n(n,t)}}function PA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(gn(n,t))return;r.uniform3fv(this.addr,t),_n(n,t)}}function zA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(gn(n,t))return;r.uniform4fv(this.addr,t),_n(n,t)}}function IA(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(gn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),_n(n,t)}else{if(gn(n,s))return;Kv.set(s),r.uniformMatrix2fv(this.addr,!1,Kv),_n(n,s)}}function BA(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(gn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),_n(n,t)}else{if(gn(n,s))return;jv.set(s),r.uniformMatrix3fv(this.addr,!1,jv),_n(n,s)}}function FA(r,t){const n=this.cache,s=t.elements;if(s===void 0){if(gn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),_n(n,t)}else{if(gn(n,s))return;Zv.set(s),r.uniformMatrix4fv(this.addr,!1,Zv),_n(n,s)}}function HA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function GA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(gn(n,t))return;r.uniform2iv(this.addr,t),_n(n,t)}}function VA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(gn(n,t))return;r.uniform3iv(this.addr,t),_n(n,t)}}function kA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(gn(n,t))return;r.uniform4iv(this.addr,t),_n(n,t)}}function XA(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function WA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(gn(n,t))return;r.uniform2uiv(this.addr,t),_n(n,t)}}function qA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(gn(n,t))return;r.uniform3uiv(this.addr,t),_n(n,t)}}function YA(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(gn(n,t))return;r.uniform4uiv(this.addr,t),_n(n,t)}}function ZA(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Wv.compareFunction=x0,c=Wv):c=Q0,n.setTexture2D(t||c,l)}function jA(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture3D(t||$0,l)}function KA(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTextureCube(t||ty,l)}function QA(r,t,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),n.setTexture2DArray(t||J0,l)}function JA(r){switch(r){case 5126:return NA;case 35664:return OA;case 35665:return PA;case 35666:return zA;case 35674:return IA;case 35675:return BA;case 35676:return FA;case 5124:case 35670:return HA;case 35667:case 35671:return GA;case 35668:case 35672:return VA;case 35669:case 35673:return kA;case 5125:return XA;case 36294:return WA;case 36295:return qA;case 36296:return YA;case 35678:case 36198:case 36298:case 36306:case 35682:return ZA;case 35679:case 36299:case 36307:return jA;case 35680:case 36300:case 36308:case 36293:return KA;case 36289:case 36303:case 36311:case 36292:return QA}}function $A(r,t){r.uniform1fv(this.addr,t)}function t1(r,t){const n=Br(t,this.size,2);r.uniform2fv(this.addr,n)}function e1(r,t){const n=Br(t,this.size,3);r.uniform3fv(this.addr,n)}function n1(r,t){const n=Br(t,this.size,4);r.uniform4fv(this.addr,n)}function i1(r,t){const n=Br(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function a1(r,t){const n=Br(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function s1(r,t){const n=Br(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function r1(r,t){r.uniform1iv(this.addr,t)}function o1(r,t){r.uniform2iv(this.addr,t)}function l1(r,t){r.uniform3iv(this.addr,t)}function c1(r,t){r.uniform4iv(this.addr,t)}function u1(r,t){r.uniform1uiv(this.addr,t)}function f1(r,t){r.uniform2uiv(this.addr,t)}function h1(r,t){r.uniform3uiv(this.addr,t)}function d1(r,t){r.uniform4uiv(this.addr,t)}function p1(r,t,n){const s=this.cache,l=t.length,c=eu(n,l);gn(s,c)||(r.uniform1iv(this.addr,c),_n(s,c));for(let f=0;f!==l;++f)n.setTexture2D(t[f]||Q0,c[f])}function m1(r,t,n){const s=this.cache,l=t.length,c=eu(n,l);gn(s,c)||(r.uniform1iv(this.addr,c),_n(s,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||$0,c[f])}function g1(r,t,n){const s=this.cache,l=t.length,c=eu(n,l);gn(s,c)||(r.uniform1iv(this.addr,c),_n(s,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||ty,c[f])}function _1(r,t,n){const s=this.cache,l=t.length,c=eu(n,l);gn(s,c)||(r.uniform1iv(this.addr,c),_n(s,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||J0,c[f])}function v1(r){switch(r){case 5126:return $A;case 35664:return t1;case 35665:return e1;case 35666:return n1;case 35674:return i1;case 35675:return a1;case 35676:return s1;case 5124:case 35670:return r1;case 35667:case 35671:return o1;case 35668:case 35672:return l1;case 35669:case 35673:return c1;case 5125:return u1;case 36294:return f1;case 36295:return h1;case 36296:return d1;case 35678:case 36198:case 36298:case 36306:case 35682:return p1;case 35679:case 36299:case 36307:return m1;case 35680:case 36300:case 36308:case 36293:return g1;case 36289:case 36303:case 36311:case 36292:return _1}}class y1{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.setValue=JA(n.type)}}class x1{constructor(t,n,s){this.id=t,this.addr=s,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=v1(n.type)}}class S1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const d=l[c];d.setValue(t,n[d.id],s)}}}const Kh=/(\w+)(\])?(\[|\.)?/g;function Qv(r,t){r.seq.push(t),r.map[t.id]=t}function M1(r,t,n){const s=r.name,l=s.length;for(Kh.lastIndex=0;;){const c=Kh.exec(s),f=Kh.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&f+2===l){Qv(n,p===void 0?new y1(d,r,t):new x1(d,r,t));break}else{let _=n.map[d];_===void 0&&(_=new S1(d),Qv(n,_)),n=_}}}class Wc{constructor(t,n){this.seq=[],this.map={};const s=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(n,l),f=t.getUniformLocation(n,c.name);M1(c,f,this)}}setValue(t,n,s,l){const c=this.map[n];c!==void 0&&c.setValue(t,s,l)}setOptional(t,n,s){const l=n[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,n,s,l){for(let c=0,f=n.length;c!==f;++c){const d=n[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,n){const s=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&s.push(f)}return s}}function Jv(r,t,n){const s=r.createShader(t);return r.shaderSource(s,n),r.compileShader(s),s}const E1=37297;let T1=0;function b1(r,t){const n=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const d=f+1;s.push(`${d===t?">":" "} ${d}: ${n[f]}`)}return s.join(`
`)}const $v=new me;function A1(r){Ue._getMatrix($v,Ue.workingColorSpace,r);const t=`mat3( ${$v.elements.map(n=>n.toFixed(4))} )`;switch(Ue.getTransfer(r)){case qc:return[t,"LinearTransferOETF"];case Ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function t0(r,t,n){const s=r.getShaderParameter(t,r.COMPILE_STATUS),c=(r.getShaderInfoLog(t)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const d=parseInt(f[1]);return n.toUpperCase()+`

`+c+`

`+b1(r.getShaderSource(t),d)}else return c}function R1(r,t){const n=A1(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function C1(r,t){let n;switch(t){case FS:n="Linear";break;case HS:n="Reinhard";break;case GS:n="Cineon";break;case VS:n="ACESFilmic";break;case XS:n="AgX";break;case WS:n="Neutral";break;case kS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Fc=new V;function w1(){Ue.getLuminanceCoefficients(Fc);const r=Fc.x.toFixed(4),t=Fc.y.toFixed(4),n=Fc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function D1(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fo).join(`
`)}function U1(r){const t=[];for(const n in r){const s=r[n];s!==!1&&t.push("#define "+n+" "+s)}return t.join(`
`)}function L1(r,t){const n={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),f=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:d}}return n}function Fo(r){return r!==""}function e0(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function n0(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const N1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gd(r){return r.replace(N1,P1)}const O1=new Map;function P1(r,t){let n=ge[t];if(n===void 0){const s=O1.get(t);if(s!==void 0)n=ge[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Gd(n)}const z1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function i0(r){return r.replace(z1,I1)}function I1(r,t,n,s){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function a0(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function B1(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===u0?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===vS?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ra&&(t="SHADOWMAP_TYPE_VSM"),t}function F1(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Nr:case Or:t="ENVMAP_TYPE_CUBE";break;case Jc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function H1(r){let t="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Or&&(t="ENVMAP_MODE_REFRACTION"),t}function G1(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Xd:t="ENVMAP_BLENDING_MULTIPLY";break;case IS:t="ENVMAP_BLENDING_MIX";break;case BS:t="ENVMAP_BLENDING_ADD";break}return t}function V1(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:s,maxMip:n}}function k1(r,t,n,s){const l=r.getContext(),c=n.defines;let f=n.vertexShader,d=n.fragmentShader;const m=B1(n),p=F1(n),g=H1(n),_=G1(n),y=V1(n),S=D1(n),E=U1(c),b=l.createProgram();let M,v,z=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Fo).join(`
`),M.length>0&&(M+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Fo).join(`
`),v.length>0&&(v+=`
`)):(M=[a0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fo).join(`
`),v=[a0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ka?"#define TONE_MAPPING":"",n.toneMapping!==ka?ge.tonemapping_pars_fragment:"",n.toneMapping!==ka?C1("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ge.colorspace_pars_fragment,R1("linearToOutputTexel",n.outputColorSpace),w1(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Fo).join(`
`)),f=Gd(f),f=e0(f,n),f=n0(f,n),d=Gd(d),d=e0(d,n),d=n0(d,n),f=i0(f),d=i0(d),n.isRawShaderMaterial!==!0&&(z=`#version 300 es
`,M=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,v=["#define varying in",n.glslVersion===rv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===rv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const U=z+M+f,R=z+v+d,H=Jv(l,l.VERTEX_SHADER,U),P=Jv(l,l.FRAGMENT_SHADER,R);l.attachShader(b,H),l.attachShader(b,P),n.index0AttributeName!==void 0?l.bindAttribLocation(b,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(b,0,"position"),l.linkProgram(b);function I(G){if(r.debug.checkShaderErrors){const Q=l.getProgramInfoLog(b)||"",rt=l.getShaderInfoLog(H)||"",lt=l.getShaderInfoLog(P)||"",ct=Q.trim(),O=rt.trim(),K=lt.trim();let Y=!0,St=!0;if(l.getProgramParameter(b,l.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,b,H,P);else{const At=t0(l,H,"vertex"),N=t0(l,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(b,l.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+ct+`
`+At+`
`+N)}else ct!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ct):(O===""||K==="")&&(St=!1);St&&(G.diagnostics={runnable:Y,programLog:ct,vertexShader:{log:O,prefix:M},fragmentShader:{log:K,prefix:v}})}l.deleteShader(H),l.deleteShader(P),X=new Wc(l,b),D=L1(l,b)}let X;this.getUniforms=function(){return X===void 0&&I(this),X};let D;this.getAttributes=function(){return D===void 0&&I(this),D};let w=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=l.getProgramParameter(b,E1)),w},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=T1++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=H,this.fragmentShader=P,this}let X1=0;class W1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const s of n)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let s=n.get(t);return s===void 0&&(s=new Set,n.set(t,s)),s}_getShaderStage(t){const n=this.shaderCache;let s=n.get(t);return s===void 0&&(s=new q1(t),n.set(t,s)),s}}class q1{constructor(t){this.id=X1++,this.code=t,this.usedTimes=0}}function Y1(r,t,n,s,l,c,f){const d=new E0,m=new W1,p=new Set,g=[],_=l.logarithmicDepthBuffer,y=l.vertexTextures;let S=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(D){return p.add(D),D===0?"uv":`uv${D}`}function M(D,w,G,Q,rt){const lt=Q.fog,ct=rt.geometry,O=D.isMeshStandardMaterial?Q.environment:null,K=(D.isMeshStandardMaterial?n:t).get(D.envMap||O),Y=K&&K.mapping===Jc?K.image.height:null,St=E[D.type];D.precision!==null&&(S=l.getMaxPrecision(D.precision),S!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",S,"instead."));const At=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,N=At!==void 0?At.length:0;let et=0;ct.morphAttributes.position!==void 0&&(et=1),ct.morphAttributes.normal!==void 0&&(et=2),ct.morphAttributes.color!==void 0&&(et=3);let Mt,Dt,Ft,it;if(St){const Re=Di[St];Mt=Re.vertexShader,Dt=Re.fragmentShader}else Mt=D.vertexShader,Dt=D.fragmentShader,m.update(D),Ft=m.getVertexShaderID(D),it=m.getFragmentShaderID(D);const ht=r.getRenderTarget(),It=r.state.buffers.depth.getReversed(),Bt=rt.isInstancedMesh===!0,qt=rt.isBatchedMesh===!0,de=!!D.map,Ne=!!D.matcap,B=!!K,Et=!!D.aoMap,yt=!!D.lightMap,mt=!!D.bumpMap,gt=!!D.normalMap,zt=!!D.displacementMap,Ct=!!D.emissiveMap,Ot=!!D.metalnessMap,oe=!!D.roughnessMap,le=D.anisotropy>0,L=D.clearcoat>0,T=D.dispersion>0,J=D.iridescence>0,ut=D.sheen>0,Tt=D.transmission>0,ft=le&&!!D.anisotropyMap,$t=L&&!!D.clearcoatMap,Lt=L&&!!D.clearcoatNormalMap,Qt=L&&!!D.clearcoatRoughnessMap,Jt=J&&!!D.iridescenceMap,Rt=J&&!!D.iridescenceThicknessMap,Nt=ut&&!!D.sheenColorMap,ee=ut&&!!D.sheenRoughnessMap,Xt=!!D.specularMap,Ht=!!D.specularColorMap,fe=!!D.specularIntensityMap,W=Tt&&!!D.transmissionMap,wt=Tt&&!!D.thicknessMap,Pt=!!D.gradientMap,Wt=!!D.alphaMap,bt=D.alphaTest>0,vt=!!D.alphaHash,Yt=!!D.extensions;let ce=ka;D.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(ce=r.toneMapping);const ze={shaderID:St,shaderType:D.type,shaderName:D.name,vertexShader:Mt,fragmentShader:Dt,defines:D.defines,customVertexShaderID:Ft,customFragmentShaderID:it,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:S,batching:qt,batchingColor:qt&&rt._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&rt.instanceColor!==null,instancingMorph:Bt&&rt.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:ht===null?r.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Pr,alphaToCoverage:!!D.alphaToCoverage,map:de,matcap:Ne,envMap:B,envMapMode:B&&K.mapping,envMapCubeUVHeight:Y,aoMap:Et,lightMap:yt,bumpMap:mt,normalMap:gt,displacementMap:y&&zt,emissiveMap:Ct,normalMapObjectSpace:gt&&D.normalMapType===jS,normalMapTangentSpace:gt&&D.normalMapType===Qd,metalnessMap:Ot,roughnessMap:oe,anisotropy:le,anisotropyMap:ft,clearcoat:L,clearcoatMap:$t,clearcoatNormalMap:Lt,clearcoatRoughnessMap:Qt,dispersion:T,iridescence:J,iridescenceMap:Jt,iridescenceThicknessMap:Rt,sheen:ut,sheenColorMap:Nt,sheenRoughnessMap:ee,specularMap:Xt,specularColorMap:Ht,specularIntensityMap:fe,transmission:Tt,transmissionMap:W,thicknessMap:wt,gradientMap:Pt,opaque:D.transparent===!1&&D.blending===Dr&&D.alphaToCoverage===!1,alphaMap:Wt,alphaTest:bt,alphaHash:vt,combine:D.combine,mapUv:de&&b(D.map.channel),aoMapUv:Et&&b(D.aoMap.channel),lightMapUv:yt&&b(D.lightMap.channel),bumpMapUv:mt&&b(D.bumpMap.channel),normalMapUv:gt&&b(D.normalMap.channel),displacementMapUv:zt&&b(D.displacementMap.channel),emissiveMapUv:Ct&&b(D.emissiveMap.channel),metalnessMapUv:Ot&&b(D.metalnessMap.channel),roughnessMapUv:oe&&b(D.roughnessMap.channel),anisotropyMapUv:ft&&b(D.anisotropyMap.channel),clearcoatMapUv:$t&&b(D.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&b(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Qt&&b(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Jt&&b(D.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&b(D.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&b(D.sheenColorMap.channel),sheenRoughnessMapUv:ee&&b(D.sheenRoughnessMap.channel),specularMapUv:Xt&&b(D.specularMap.channel),specularColorMapUv:Ht&&b(D.specularColorMap.channel),specularIntensityMapUv:fe&&b(D.specularIntensityMap.channel),transmissionMapUv:W&&b(D.transmissionMap.channel),thicknessMapUv:wt&&b(D.thicknessMap.channel),alphaMapUv:Wt&&b(D.alphaMap.channel),vertexTangents:!!ct.attributes.tangent&&(gt||le),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,pointsUvs:rt.isPoints===!0&&!!ct.attributes.uv&&(de||Wt),fog:!!lt,useFog:D.fog===!0,fogExp2:!!lt&&lt.isFogExp2,flatShading:D.flatShading===!0&&D.wireframe===!1,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:It,skinning:rt.isSkinnedMesh===!0,morphTargets:ct.morphAttributes.position!==void 0,morphNormals:ct.morphAttributes.normal!==void 0,morphColors:ct.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:et,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&G.length>0,shadowMapType:r.shadowMap.type,toneMapping:ce,decodeVideoTexture:de&&D.map.isVideoTexture===!0&&Ue.getTransfer(D.map.colorSpace)===Ve,decodeVideoTextureEmissive:Ct&&D.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(D.emissiveMap.colorSpace)===Ve,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===oa,flipSided:D.side===Xn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:Yt&&D.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&D.extensions.multiDraw===!0||qt)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return ze.vertexUv1s=p.has(1),ze.vertexUv2s=p.has(2),ze.vertexUv3s=p.has(3),p.clear(),ze}function v(D){const w=[];if(D.shaderID?w.push(D.shaderID):(w.push(D.customVertexShaderID),w.push(D.customFragmentShaderID)),D.defines!==void 0)for(const G in D.defines)w.push(G),w.push(D.defines[G]);return D.isRawShaderMaterial===!1&&(z(w,D),U(w,D),w.push(r.outputColorSpace)),w.push(D.customProgramCacheKey),w.join()}function z(D,w){D.push(w.precision),D.push(w.outputColorSpace),D.push(w.envMapMode),D.push(w.envMapCubeUVHeight),D.push(w.mapUv),D.push(w.alphaMapUv),D.push(w.lightMapUv),D.push(w.aoMapUv),D.push(w.bumpMapUv),D.push(w.normalMapUv),D.push(w.displacementMapUv),D.push(w.emissiveMapUv),D.push(w.metalnessMapUv),D.push(w.roughnessMapUv),D.push(w.anisotropyMapUv),D.push(w.clearcoatMapUv),D.push(w.clearcoatNormalMapUv),D.push(w.clearcoatRoughnessMapUv),D.push(w.iridescenceMapUv),D.push(w.iridescenceThicknessMapUv),D.push(w.sheenColorMapUv),D.push(w.sheenRoughnessMapUv),D.push(w.specularMapUv),D.push(w.specularColorMapUv),D.push(w.specularIntensityMapUv),D.push(w.transmissionMapUv),D.push(w.thicknessMapUv),D.push(w.combine),D.push(w.fogExp2),D.push(w.sizeAttenuation),D.push(w.morphTargetsCount),D.push(w.morphAttributeCount),D.push(w.numDirLights),D.push(w.numPointLights),D.push(w.numSpotLights),D.push(w.numSpotLightMaps),D.push(w.numHemiLights),D.push(w.numRectAreaLights),D.push(w.numDirLightShadows),D.push(w.numPointLightShadows),D.push(w.numSpotLightShadows),D.push(w.numSpotLightShadowsWithMaps),D.push(w.numLightProbes),D.push(w.shadowMapType),D.push(w.toneMapping),D.push(w.numClippingPlanes),D.push(w.numClipIntersection),D.push(w.depthPacking)}function U(D,w){d.disableAll(),w.supportsVertexTextures&&d.enable(0),w.instancing&&d.enable(1),w.instancingColor&&d.enable(2),w.instancingMorph&&d.enable(3),w.matcap&&d.enable(4),w.envMap&&d.enable(5),w.normalMapObjectSpace&&d.enable(6),w.normalMapTangentSpace&&d.enable(7),w.clearcoat&&d.enable(8),w.iridescence&&d.enable(9),w.alphaTest&&d.enable(10),w.vertexColors&&d.enable(11),w.vertexAlphas&&d.enable(12),w.vertexUv1s&&d.enable(13),w.vertexUv2s&&d.enable(14),w.vertexUv3s&&d.enable(15),w.vertexTangents&&d.enable(16),w.anisotropy&&d.enable(17),w.alphaHash&&d.enable(18),w.batching&&d.enable(19),w.dispersion&&d.enable(20),w.batchingColor&&d.enable(21),w.gradientMap&&d.enable(22),D.push(d.mask),d.disableAll(),w.fog&&d.enable(0),w.useFog&&d.enable(1),w.flatShading&&d.enable(2),w.logarithmicDepthBuffer&&d.enable(3),w.reversedDepthBuffer&&d.enable(4),w.skinning&&d.enable(5),w.morphTargets&&d.enable(6),w.morphNormals&&d.enable(7),w.morphColors&&d.enable(8),w.premultipliedAlpha&&d.enable(9),w.shadowMapEnabled&&d.enable(10),w.doubleSided&&d.enable(11),w.flipSided&&d.enable(12),w.useDepthPacking&&d.enable(13),w.dithering&&d.enable(14),w.transmission&&d.enable(15),w.sheen&&d.enable(16),w.opaque&&d.enable(17),w.pointsUvs&&d.enable(18),w.decodeVideoTexture&&d.enable(19),w.decodeVideoTextureEmissive&&d.enable(20),w.alphaToCoverage&&d.enable(21),D.push(d.mask)}function R(D){const w=E[D.type];let G;if(w){const Q=Di[w];G=HM.clone(Q.uniforms)}else G=D.uniforms;return G}function H(D,w){let G;for(let Q=0,rt=g.length;Q<rt;Q++){const lt=g[Q];if(lt.cacheKey===w){G=lt,++G.usedTimes;break}}return G===void 0&&(G=new k1(r,w,D,c),g.push(G)),G}function P(D){if(--D.usedTimes===0){const w=g.indexOf(D);g[w]=g[g.length-1],g.pop(),D.destroy()}}function I(D){m.remove(D)}function X(){m.dispose()}return{getParameters:M,getProgramCacheKey:v,getUniforms:R,acquireProgram:H,releaseProgram:P,releaseShaderCache:I,programs:g,dispose:X}}function Z1(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let d=r.get(f);return d===void 0&&(d={},r.set(f,d)),d}function s(f){r.delete(f)}function l(f,d,m){r.get(f)[d]=m}function c(){r=new WeakMap}return{has:t,get:n,remove:s,update:l,dispose:c}}function j1(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function s0(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function r0(){const r=[];let t=0;const n=[],s=[],l=[];function c(){t=0,n.length=0,s.length=0,l.length=0}function f(_,y,S,E,b,M){let v=r[t];return v===void 0?(v={id:_.id,object:_,geometry:y,material:S,groupOrder:E,renderOrder:_.renderOrder,z:b,group:M},r[t]=v):(v.id=_.id,v.object=_,v.geometry=y,v.material=S,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=b,v.group=M),t++,v}function d(_,y,S,E,b,M){const v=f(_,y,S,E,b,M);S.transmission>0?s.push(v):S.transparent===!0?l.push(v):n.push(v)}function m(_,y,S,E,b,M){const v=f(_,y,S,E,b,M);S.transmission>0?s.unshift(v):S.transparent===!0?l.unshift(v):n.unshift(v)}function p(_,y){n.length>1&&n.sort(_||j1),s.length>1&&s.sort(y||s0),l.length>1&&l.sort(y||s0)}function g(){for(let _=t,y=r.length;_<y;_++){const S=r[_];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:g,sort:p}}function K1(){let r=new WeakMap;function t(s,l){const c=r.get(s);let f;return c===void 0?(f=new r0,r.set(s,[f])):l>=c.length?(f=new r0,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function Q1(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new V,color:new Me};break;case"SpotLight":n={position:new V,direction:new V,color:new Me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new Me,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new Me,groundColor:new Me};break;case"RectAreaLight":n={color:new Me,position:new V,halfWidth:new V,halfHeight:new V};break}return r[t.id]=n,n}}}function J1(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let $1=0;function tR(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function eR(r){const t=new Q1,n=J1(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new V);const l=new V,c=new Je,f=new Je;function d(p){let g=0,_=0,y=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let S=0,E=0,b=0,M=0,v=0,z=0,U=0,R=0,H=0,P=0,I=0;p.sort(tR);for(let D=0,w=p.length;D<w;D++){const G=p[D],Q=G.color,rt=G.intensity,lt=G.distance,ct=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)g+=Q.r*rt,_+=Q.g*rt,y+=Q.b*rt;else if(G.isLightProbe){for(let O=0;O<9;O++)s.probe[O].addScaledVector(G.sh.coefficients[O],rt);I++}else if(G.isDirectionalLight){const O=t.get(G);if(O.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const K=G.shadow,Y=n.get(G);Y.shadowIntensity=K.intensity,Y.shadowBias=K.bias,Y.shadowNormalBias=K.normalBias,Y.shadowRadius=K.radius,Y.shadowMapSize=K.mapSize,s.directionalShadow[S]=Y,s.directionalShadowMap[S]=ct,s.directionalShadowMatrix[S]=G.shadow.matrix,z++}s.directional[S]=O,S++}else if(G.isSpotLight){const O=t.get(G);O.position.setFromMatrixPosition(G.matrixWorld),O.color.copy(Q).multiplyScalar(rt),O.distance=lt,O.coneCos=Math.cos(G.angle),O.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),O.decay=G.decay,s.spot[b]=O;const K=G.shadow;if(G.map&&(s.spotLightMap[H]=G.map,H++,K.updateMatrices(G),G.castShadow&&P++),s.spotLightMatrix[b]=K.matrix,G.castShadow){const Y=n.get(G);Y.shadowIntensity=K.intensity,Y.shadowBias=K.bias,Y.shadowNormalBias=K.normalBias,Y.shadowRadius=K.radius,Y.shadowMapSize=K.mapSize,s.spotShadow[b]=Y,s.spotShadowMap[b]=ct,R++}b++}else if(G.isRectAreaLight){const O=t.get(G);O.color.copy(Q).multiplyScalar(rt),O.halfWidth.set(G.width*.5,0,0),O.halfHeight.set(0,G.height*.5,0),s.rectArea[M]=O,M++}else if(G.isPointLight){const O=t.get(G);if(O.color.copy(G.color).multiplyScalar(G.intensity),O.distance=G.distance,O.decay=G.decay,G.castShadow){const K=G.shadow,Y=n.get(G);Y.shadowIntensity=K.intensity,Y.shadowBias=K.bias,Y.shadowNormalBias=K.normalBias,Y.shadowRadius=K.radius,Y.shadowMapSize=K.mapSize,Y.shadowCameraNear=K.camera.near,Y.shadowCameraFar=K.camera.far,s.pointShadow[E]=Y,s.pointShadowMap[E]=ct,s.pointShadowMatrix[E]=G.shadow.matrix,U++}s.point[E]=O,E++}else if(G.isHemisphereLight){const O=t.get(G);O.skyColor.copy(G.color).multiplyScalar(rt),O.groundColor.copy(G.groundColor).multiplyScalar(rt),s.hemi[v]=O,v++}}M>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Vt.LTC_FLOAT_1,s.rectAreaLTC2=Vt.LTC_FLOAT_2):(s.rectAreaLTC1=Vt.LTC_HALF_1,s.rectAreaLTC2=Vt.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=_,s.ambient[2]=y;const X=s.hash;(X.directionalLength!==S||X.pointLength!==E||X.spotLength!==b||X.rectAreaLength!==M||X.hemiLength!==v||X.numDirectionalShadows!==z||X.numPointShadows!==U||X.numSpotShadows!==R||X.numSpotMaps!==H||X.numLightProbes!==I)&&(s.directional.length=S,s.spot.length=b,s.rectArea.length=M,s.point.length=E,s.hemi.length=v,s.directionalShadow.length=z,s.directionalShadowMap.length=z,s.pointShadow.length=U,s.pointShadowMap.length=U,s.spotShadow.length=R,s.spotShadowMap.length=R,s.directionalShadowMatrix.length=z,s.pointShadowMatrix.length=U,s.spotLightMatrix.length=R+H-P,s.spotLightMap.length=H,s.numSpotLightShadowsWithMaps=P,s.numLightProbes=I,X.directionalLength=S,X.pointLength=E,X.spotLength=b,X.rectAreaLength=M,X.hemiLength=v,X.numDirectionalShadows=z,X.numPointShadows=U,X.numSpotShadows=R,X.numSpotMaps=H,X.numLightProbes=I,s.version=$1++)}function m(p,g){let _=0,y=0,S=0,E=0,b=0;const M=g.matrixWorldInverse;for(let v=0,z=p.length;v<z;v++){const U=p[v];if(U.isDirectionalLight){const R=s.directional[_];R.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(M),_++}else if(U.isSpotLight){const R=s.spot[S];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(M),R.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(M),S++}else if(U.isRectAreaLight){const R=s.rectArea[E];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(M),f.identity(),c.copy(U.matrixWorld),c.premultiply(M),f.extractRotation(c),R.halfWidth.set(U.width*.5,0,0),R.halfHeight.set(0,U.height*.5,0),R.halfWidth.applyMatrix4(f),R.halfHeight.applyMatrix4(f),E++}else if(U.isPointLight){const R=s.point[y];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(M),y++}else if(U.isHemisphereLight){const R=s.hemi[b];R.direction.setFromMatrixPosition(U.matrixWorld),R.direction.transformDirection(M),b++}}}return{setup:d,setupView:m,state:s}}function o0(r){const t=new eR(r),n=[],s=[];function l(g){p.camera=g,n.length=0,s.length=0}function c(g){n.push(g)}function f(g){s.push(g)}function d(){t.setup(n)}function m(g){t.setupView(n,g)}const p={lightsArray:n,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:f}}function nR(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let d;return f===void 0?(d=new o0(r),t.set(l,[d])):c>=f.length?(d=new o0(r),f.push(d)):d=f[c],d}function s(){t=new WeakMap}return{get:n,dispose:s}}const iR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,aR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function sR(r,t,n){let s=new np;const l=new Ut,c=new Ut,f=new Xe,d=new wE({depthPacking:ZS}),m=new DE,p={},g=n.maxTextureSize,_={[Xa]:Xn,[Xn]:Xa,[oa]:oa},y=new Wa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:iR,fragmentShader:aR}),S=y.clone();S.defines.HORIZONTAL_PASS=1;const E=new zn;E.setAttribute("position",new Oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Ni(E,y),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=u0;let v=this.type;this.render=function(P,I,X){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||P.length===0)return;const D=r.getRenderTarget(),w=r.getActiveCubeFace(),G=r.getActiveMipmapLevel(),Q=r.state;Q.setBlending(Va),Q.buffers.depth.getReversed()===!0?Q.buffers.color.setClear(0,0,0,0):Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const rt=v!==ra&&this.type===ra,lt=v===ra&&this.type!==ra;for(let ct=0,O=P.length;ct<O;ct++){const K=P[ct],Y=K.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;l.copy(Y.mapSize);const St=Y.getFrameExtents();if(l.multiply(St),c.copy(Y.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/St.x),l.x=c.x*St.x,Y.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/St.y),l.y=c.y*St.y,Y.mapSize.y=c.y)),Y.map===null||rt===!0||lt===!0){const N=this.type!==ra?{minFilter:Mi,magFilter:Mi}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Ts(l.x,l.y,N),Y.map.texture.name=K.name+".shadowMap",Y.camera.updateProjectionMatrix()}r.setRenderTarget(Y.map),r.clear();const At=Y.getViewportCount();for(let N=0;N<At;N++){const et=Y.getViewport(N);f.set(c.x*et.x,c.y*et.y,c.x*et.z,c.y*et.w),Q.viewport(f),Y.updateMatrices(K,N),s=Y.getFrustum(),R(I,X,Y.camera,K,this.type)}Y.isPointLightShadow!==!0&&this.type===ra&&z(Y,X),Y.needsUpdate=!1}v=this.type,M.needsUpdate=!1,r.setRenderTarget(D,w,G)};function z(P,I){const X=t.update(b);y.defines.VSM_SAMPLES!==P.blurSamples&&(y.defines.VSM_SAMPLES=P.blurSamples,S.defines.VSM_SAMPLES=P.blurSamples,y.needsUpdate=!0,S.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Ts(l.x,l.y)),y.uniforms.shadow_pass.value=P.map.texture,y.uniforms.resolution.value=P.mapSize,y.uniforms.radius.value=P.radius,r.setRenderTarget(P.mapPass),r.clear(),r.renderBufferDirect(I,null,X,y,b,null),S.uniforms.shadow_pass.value=P.mapPass.texture,S.uniforms.resolution.value=P.mapSize,S.uniforms.radius.value=P.radius,r.setRenderTarget(P.map),r.clear(),r.renderBufferDirect(I,null,X,S,b,null)}function U(P,I,X,D){let w=null;const G=X.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(G!==void 0)w=G;else if(w=X.isPointLight===!0?m:d,r.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const Q=w.uuid,rt=I.uuid;let lt=p[Q];lt===void 0&&(lt={},p[Q]=lt);let ct=lt[rt];ct===void 0&&(ct=w.clone(),lt[rt]=ct,I.addEventListener("dispose",H)),w=ct}if(w.visible=I.visible,w.wireframe=I.wireframe,D===ra?w.side=I.shadowSide!==null?I.shadowSide:I.side:w.side=I.shadowSide!==null?I.shadowSide:_[I.side],w.alphaMap=I.alphaMap,w.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,w.map=I.map,w.clipShadows=I.clipShadows,w.clippingPlanes=I.clippingPlanes,w.clipIntersection=I.clipIntersection,w.displacementMap=I.displacementMap,w.displacementScale=I.displacementScale,w.displacementBias=I.displacementBias,w.wireframeLinewidth=I.wireframeLinewidth,w.linewidth=I.linewidth,X.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const Q=r.properties.get(w);Q.light=X}return w}function R(P,I,X,D,w){if(P.visible===!1)return;if(P.layers.test(I.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&w===ra)&&(!P.frustumCulled||s.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,P.matrixWorld);const rt=t.update(P),lt=P.material;if(Array.isArray(lt)){const ct=rt.groups;for(let O=0,K=ct.length;O<K;O++){const Y=ct[O],St=lt[Y.materialIndex];if(St&&St.visible){const At=U(P,St,D,w);P.onBeforeShadow(r,P,I,X,rt,At,Y),r.renderBufferDirect(X,null,rt,At,P,Y),P.onAfterShadow(r,P,I,X,rt,At,Y)}}}else if(lt.visible){const ct=U(P,lt,D,w);P.onBeforeShadow(r,P,I,X,rt,ct,null),r.renderBufferDirect(X,null,rt,ct,P,null),P.onAfterShadow(r,P,I,X,rt,ct,null)}}const Q=P.children;for(let rt=0,lt=Q.length;rt<lt;rt++)R(Q[rt],I,X,D,w)}function H(P){P.target.removeEventListener("dispose",H);for(const X in p){const D=p[X],w=P.target.uuid;w in D&&(D[w].dispose(),delete D[w])}}}const rR={[td]:ed,[nd]:sd,[id]:rd,[Lr]:ad,[ed]:td,[sd]:nd,[rd]:id,[ad]:Lr};function oR(r,t){function n(){let W=!1;const wt=new Xe;let Pt=null;const Wt=new Xe(0,0,0,0);return{setMask:function(bt){Pt!==bt&&!W&&(r.colorMask(bt,bt,bt,bt),Pt=bt)},setLocked:function(bt){W=bt},setClear:function(bt,vt,Yt,ce,ze){ze===!0&&(bt*=ce,vt*=ce,Yt*=ce),wt.set(bt,vt,Yt,ce),Wt.equals(wt)===!1&&(r.clearColor(bt,vt,Yt,ce),Wt.copy(wt))},reset:function(){W=!1,Pt=null,Wt.set(-1,0,0,0)}}}function s(){let W=!1,wt=!1,Pt=null,Wt=null,bt=null;return{setReversed:function(vt){if(wt!==vt){const Yt=t.get("EXT_clip_control");vt?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT),wt=vt;const ce=bt;bt=null,this.setClear(ce)}},getReversed:function(){return wt},setTest:function(vt){vt?ht(r.DEPTH_TEST):It(r.DEPTH_TEST)},setMask:function(vt){Pt!==vt&&!W&&(r.depthMask(vt),Pt=vt)},setFunc:function(vt){if(wt&&(vt=rR[vt]),Wt!==vt){switch(vt){case td:r.depthFunc(r.NEVER);break;case ed:r.depthFunc(r.ALWAYS);break;case nd:r.depthFunc(r.LESS);break;case Lr:r.depthFunc(r.LEQUAL);break;case id:r.depthFunc(r.EQUAL);break;case ad:r.depthFunc(r.GEQUAL);break;case sd:r.depthFunc(r.GREATER);break;case rd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Wt=vt}},setLocked:function(vt){W=vt},setClear:function(vt){bt!==vt&&(wt&&(vt=1-vt),r.clearDepth(vt),bt=vt)},reset:function(){W=!1,Pt=null,Wt=null,bt=null,wt=!1}}}function l(){let W=!1,wt=null,Pt=null,Wt=null,bt=null,vt=null,Yt=null,ce=null,ze=null;return{setTest:function(Re){W||(Re?ht(r.STENCIL_TEST):It(r.STENCIL_TEST))},setMask:function(Re){wt!==Re&&!W&&(r.stencilMask(Re),wt=Re)},setFunc:function(Re,Un,ni){(Pt!==Re||Wt!==Un||bt!==ni)&&(r.stencilFunc(Re,Un,ni),Pt=Re,Wt=Un,bt=ni)},setOp:function(Re,Un,ni){(vt!==Re||Yt!==Un||ce!==ni)&&(r.stencilOp(Re,Un,ni),vt=Re,Yt=Un,ce=ni)},setLocked:function(Re){W=Re},setClear:function(Re){ze!==Re&&(r.clearStencil(Re),ze=Re)},reset:function(){W=!1,wt=null,Pt=null,Wt=null,bt=null,vt=null,Yt=null,ce=null,ze=null}}}const c=new n,f=new s,d=new l,m=new WeakMap,p=new WeakMap;let g={},_={},y=new WeakMap,S=[],E=null,b=!1,M=null,v=null,z=null,U=null,R=null,H=null,P=null,I=new Me(0,0,0),X=0,D=!1,w=null,G=null,Q=null,rt=null,lt=null;const ct=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,K=0;const Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Y)[1]),O=K>=1):Y.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),O=K>=2);let St=null,At={};const N=r.getParameter(r.SCISSOR_BOX),et=r.getParameter(r.VIEWPORT),Mt=new Xe().fromArray(N),Dt=new Xe().fromArray(et);function Ft(W,wt,Pt,Wt){const bt=new Uint8Array(4),vt=r.createTexture();r.bindTexture(W,vt),r.texParameteri(W,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(W,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Yt=0;Yt<Pt;Yt++)W===r.TEXTURE_3D||W===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,Wt,0,r.RGBA,r.UNSIGNED_BYTE,bt):r.texImage2D(wt+Yt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,bt);return vt}const it={};it[r.TEXTURE_2D]=Ft(r.TEXTURE_2D,r.TEXTURE_2D,1),it[r.TEXTURE_CUBE_MAP]=Ft(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[r.TEXTURE_2D_ARRAY]=Ft(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),it[r.TEXTURE_3D]=Ft(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),ht(r.DEPTH_TEST),f.setFunc(Lr),mt(!1),gt(tv),ht(r.CULL_FACE),Et(Va);function ht(W){g[W]!==!0&&(r.enable(W),g[W]=!0)}function It(W){g[W]!==!1&&(r.disable(W),g[W]=!1)}function Bt(W,wt){return _[W]!==wt?(r.bindFramebuffer(W,wt),_[W]=wt,W===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=wt),W===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function qt(W,wt){let Pt=S,Wt=!1;if(W){Pt=y.get(wt),Pt===void 0&&(Pt=[],y.set(wt,Pt));const bt=W.textures;if(Pt.length!==bt.length||Pt[0]!==r.COLOR_ATTACHMENT0){for(let vt=0,Yt=bt.length;vt<Yt;vt++)Pt[vt]=r.COLOR_ATTACHMENT0+vt;Pt.length=bt.length,Wt=!0}}else Pt[0]!==r.BACK&&(Pt[0]=r.BACK,Wt=!0);Wt&&r.drawBuffers(Pt)}function de(W){return E!==W?(r.useProgram(W),E=W,!0):!1}const Ne={[vs]:r.FUNC_ADD,[xS]:r.FUNC_SUBTRACT,[SS]:r.FUNC_REVERSE_SUBTRACT};Ne[MS]=r.MIN,Ne[ES]=r.MAX;const B={[TS]:r.ZERO,[bS]:r.ONE,[AS]:r.SRC_COLOR,[Jh]:r.SRC_ALPHA,[LS]:r.SRC_ALPHA_SATURATE,[DS]:r.DST_COLOR,[CS]:r.DST_ALPHA,[RS]:r.ONE_MINUS_SRC_COLOR,[$h]:r.ONE_MINUS_SRC_ALPHA,[US]:r.ONE_MINUS_DST_COLOR,[wS]:r.ONE_MINUS_DST_ALPHA,[NS]:r.CONSTANT_COLOR,[OS]:r.ONE_MINUS_CONSTANT_COLOR,[PS]:r.CONSTANT_ALPHA,[zS]:r.ONE_MINUS_CONSTANT_ALPHA};function Et(W,wt,Pt,Wt,bt,vt,Yt,ce,ze,Re){if(W===Va){b===!0&&(It(r.BLEND),b=!1);return}if(b===!1&&(ht(r.BLEND),b=!0),W!==yS){if(W!==M||Re!==D){if((v!==vs||R!==vs)&&(r.blendEquation(r.FUNC_ADD),v=vs,R=vs),Re)switch(W){case Dr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ev:r.blendFunc(r.ONE,r.ONE);break;case nv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case iv:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Dr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ev:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case nv:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case iv:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}z=null,U=null,H=null,P=null,I.set(0,0,0),X=0,M=W,D=Re}return}bt=bt||wt,vt=vt||Pt,Yt=Yt||Wt,(wt!==v||bt!==R)&&(r.blendEquationSeparate(Ne[wt],Ne[bt]),v=wt,R=bt),(Pt!==z||Wt!==U||vt!==H||Yt!==P)&&(r.blendFuncSeparate(B[Pt],B[Wt],B[vt],B[Yt]),z=Pt,U=Wt,H=vt,P=Yt),(ce.equals(I)===!1||ze!==X)&&(r.blendColor(ce.r,ce.g,ce.b,ze),I.copy(ce),X=ze),M=W,D=!1}function yt(W,wt){W.side===oa?It(r.CULL_FACE):ht(r.CULL_FACE);let Pt=W.side===Xn;wt&&(Pt=!Pt),mt(Pt),W.blending===Dr&&W.transparent===!1?Et(Va):Et(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),f.setFunc(W.depthFunc),f.setTest(W.depthTest),f.setMask(W.depthWrite),c.setMask(W.colorWrite);const Wt=W.stencilWrite;d.setTest(Wt),Wt&&(d.setMask(W.stencilWriteMask),d.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),d.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Ct(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?ht(r.SAMPLE_ALPHA_TO_COVERAGE):It(r.SAMPLE_ALPHA_TO_COVERAGE)}function mt(W){w!==W&&(W?r.frontFace(r.CW):r.frontFace(r.CCW),w=W)}function gt(W){W!==gS?(ht(r.CULL_FACE),W!==G&&(W===tv?r.cullFace(r.BACK):W===_S?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):It(r.CULL_FACE),G=W}function zt(W){W!==Q&&(O&&r.lineWidth(W),Q=W)}function Ct(W,wt,Pt){W?(ht(r.POLYGON_OFFSET_FILL),(rt!==wt||lt!==Pt)&&(r.polygonOffset(wt,Pt),rt=wt,lt=Pt)):It(r.POLYGON_OFFSET_FILL)}function Ot(W){W?ht(r.SCISSOR_TEST):It(r.SCISSOR_TEST)}function oe(W){W===void 0&&(W=r.TEXTURE0+ct-1),St!==W&&(r.activeTexture(W),St=W)}function le(W,wt,Pt){Pt===void 0&&(St===null?Pt=r.TEXTURE0+ct-1:Pt=St);let Wt=At[Pt];Wt===void 0&&(Wt={type:void 0,texture:void 0},At[Pt]=Wt),(Wt.type!==W||Wt.texture!==wt)&&(St!==Pt&&(r.activeTexture(Pt),St=Pt),r.bindTexture(W,wt||it[W]),Wt.type=W,Wt.texture=wt)}function L(){const W=At[St];W!==void 0&&W.type!==void 0&&(r.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function T(){try{r.compressedTexImage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function J(){try{r.compressedTexImage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ut(){try{r.texSubImage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Tt(){try{r.texSubImage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ft(){try{r.compressedTexSubImage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function $t(){try{r.compressedTexSubImage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Lt(){try{r.texStorage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Qt(){try{r.texStorage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Jt(){try{r.texImage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Rt(){try{r.texImage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Nt(W){Mt.equals(W)===!1&&(r.scissor(W.x,W.y,W.z,W.w),Mt.copy(W))}function ee(W){Dt.equals(W)===!1&&(r.viewport(W.x,W.y,W.z,W.w),Dt.copy(W))}function Xt(W,wt){let Pt=p.get(wt);Pt===void 0&&(Pt=new WeakMap,p.set(wt,Pt));let Wt=Pt.get(W);Wt===void 0&&(Wt=r.getUniformBlockIndex(wt,W.name),Pt.set(W,Wt))}function Ht(W,wt){const Wt=p.get(wt).get(W);m.get(wt)!==Wt&&(r.uniformBlockBinding(wt,Wt,W.__bindingPointIndex),m.set(wt,Wt))}function fe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},St=null,At={},_={},y=new WeakMap,S=[],E=null,b=!1,M=null,v=null,z=null,U=null,R=null,H=null,P=null,I=new Me(0,0,0),X=0,D=!1,w=null,G=null,Q=null,rt=null,lt=null,Mt.set(0,0,r.canvas.width,r.canvas.height),Dt.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:ht,disable:It,bindFramebuffer:Bt,drawBuffers:qt,useProgram:de,setBlending:Et,setMaterial:yt,setFlipSided:mt,setCullFace:gt,setLineWidth:zt,setPolygonOffset:Ct,setScissorTest:Ot,activeTexture:oe,bindTexture:le,unbindTexture:L,compressedTexImage2D:T,compressedTexImage3D:J,texImage2D:Jt,texImage3D:Rt,updateUBOMapping:Xt,uniformBlockBinding:Ht,texStorage2D:Lt,texStorage3D:Qt,texSubImage2D:ut,texSubImage3D:Tt,compressedTexSubImage2D:ft,compressedTexSubImage3D:$t,scissor:Nt,viewport:ee,reset:fe}}function lR(r,t,n,s,l,c,f){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ut,g=new WeakMap;let _;const y=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(L,T){return S?new OffscreenCanvas(L,T):Zc("canvas")}function b(L,T,J){let ut=1;const Tt=le(L);if((Tt.width>J||Tt.height>J)&&(ut=J/Math.max(Tt.width,Tt.height)),ut<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const ft=Math.floor(ut*Tt.width),$t=Math.floor(ut*Tt.height);_===void 0&&(_=E(ft,$t));const Lt=T?E(ft,$t):_;return Lt.width=ft,Lt.height=$t,Lt.getContext("2d").drawImage(L,0,0,ft,$t),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Tt.width+"x"+Tt.height+") to ("+ft+"x"+$t+")."),Lt}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Tt.width+"x"+Tt.height+")."),L;return L}function M(L){return L.generateMipmaps}function v(L){r.generateMipmap(L)}function z(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function U(L,T,J,ut,Tt=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ft=T;if(T===r.RED&&(J===r.FLOAT&&(ft=r.R32F),J===r.HALF_FLOAT&&(ft=r.R16F),J===r.UNSIGNED_BYTE&&(ft=r.R8)),T===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(ft=r.R8UI),J===r.UNSIGNED_SHORT&&(ft=r.R16UI),J===r.UNSIGNED_INT&&(ft=r.R32UI),J===r.BYTE&&(ft=r.R8I),J===r.SHORT&&(ft=r.R16I),J===r.INT&&(ft=r.R32I)),T===r.RG&&(J===r.FLOAT&&(ft=r.RG32F),J===r.HALF_FLOAT&&(ft=r.RG16F),J===r.UNSIGNED_BYTE&&(ft=r.RG8)),T===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(ft=r.RG8UI),J===r.UNSIGNED_SHORT&&(ft=r.RG16UI),J===r.UNSIGNED_INT&&(ft=r.RG32UI),J===r.BYTE&&(ft=r.RG8I),J===r.SHORT&&(ft=r.RG16I),J===r.INT&&(ft=r.RG32I)),T===r.RGB_INTEGER&&(J===r.UNSIGNED_BYTE&&(ft=r.RGB8UI),J===r.UNSIGNED_SHORT&&(ft=r.RGB16UI),J===r.UNSIGNED_INT&&(ft=r.RGB32UI),J===r.BYTE&&(ft=r.RGB8I),J===r.SHORT&&(ft=r.RGB16I),J===r.INT&&(ft=r.RGB32I)),T===r.RGBA_INTEGER&&(J===r.UNSIGNED_BYTE&&(ft=r.RGBA8UI),J===r.UNSIGNED_SHORT&&(ft=r.RGBA16UI),J===r.UNSIGNED_INT&&(ft=r.RGBA32UI),J===r.BYTE&&(ft=r.RGBA8I),J===r.SHORT&&(ft=r.RGBA16I),J===r.INT&&(ft=r.RGBA32I)),T===r.RGB&&(J===r.UNSIGNED_INT_5_9_9_9_REV&&(ft=r.RGB9_E5),J===r.UNSIGNED_INT_10F_11F_11F_REV&&(ft=r.R11F_G11F_B10F)),T===r.RGBA){const $t=Tt?qc:Ue.getTransfer(ut);J===r.FLOAT&&(ft=r.RGBA32F),J===r.HALF_FLOAT&&(ft=r.RGBA16F),J===r.UNSIGNED_BYTE&&(ft=$t===Ve?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT_4_4_4_4&&(ft=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(ft=r.RGB5_A1)}return(ft===r.R16F||ft===r.R32F||ft===r.RG16F||ft===r.RG32F||ft===r.RGBA16F||ft===r.RGBA32F)&&t.get("EXT_color_buffer_float"),ft}function R(L,T){let J;return L?T===null||T===Ms||T===Wo?J=r.DEPTH24_STENCIL8:T===la?J=r.DEPTH32F_STENCIL8:T===Xo&&(J=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ms||T===Wo?J=r.DEPTH_COMPONENT24:T===la?J=r.DEPTH_COMPONENT32F:T===Xo&&(J=r.DEPTH_COMPONENT16),J}function H(L,T){return M(L)===!0||L.isFramebufferTexture&&L.minFilter!==Mi&&L.minFilter!==Ui?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function P(L){const T=L.target;T.removeEventListener("dispose",P),X(T),T.isVideoTexture&&g.delete(T)}function I(L){const T=L.target;T.removeEventListener("dispose",I),w(T)}function X(L){const T=s.get(L);if(T.__webglInit===void 0)return;const J=L.source,ut=y.get(J);if(ut){const Tt=ut[T.__cacheKey];Tt.usedTimes--,Tt.usedTimes===0&&D(L),Object.keys(ut).length===0&&y.delete(J)}s.remove(L)}function D(L){const T=s.get(L);r.deleteTexture(T.__webglTexture);const J=L.source,ut=y.get(J);delete ut[T.__cacheKey],f.memory.textures--}function w(L){const T=s.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),s.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ut=0;ut<6;ut++){if(Array.isArray(T.__webglFramebuffer[ut]))for(let Tt=0;Tt<T.__webglFramebuffer[ut].length;Tt++)r.deleteFramebuffer(T.__webglFramebuffer[ut][Tt]);else r.deleteFramebuffer(T.__webglFramebuffer[ut]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ut])}else{if(Array.isArray(T.__webglFramebuffer))for(let ut=0;ut<T.__webglFramebuffer.length;ut++)r.deleteFramebuffer(T.__webglFramebuffer[ut]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ut=0;ut<T.__webglColorRenderbuffer.length;ut++)T.__webglColorRenderbuffer[ut]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ut]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const J=L.textures;for(let ut=0,Tt=J.length;ut<Tt;ut++){const ft=s.get(J[ut]);ft.__webglTexture&&(r.deleteTexture(ft.__webglTexture),f.memory.textures--),s.remove(J[ut])}s.remove(L)}let G=0;function Q(){G=0}function rt(){const L=G;return L>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l.maxTextures),G+=1,L}function lt(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function ct(L,T){const J=s.get(L);if(L.isVideoTexture&&Ot(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&J.__version!==L.version){const ut=L.image;if(ut===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ut.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{it(J,L,T);return}}else L.isExternalTexture&&(J.__webglTexture=L.sourceTexture?L.sourceTexture:null);n.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+T)}function O(L,T){const J=s.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&J.__version!==L.version){it(J,L,T);return}n.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+T)}function K(L,T){const J=s.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&J.__version!==L.version){it(J,L,T);return}n.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+T)}function Y(L,T){const J=s.get(L);if(L.version>0&&J.__version!==L.version){ht(J,L,T);return}n.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+T)}const St={[cd]:r.REPEAT,[xs]:r.CLAMP_TO_EDGE,[ud]:r.MIRRORED_REPEAT},At={[Mi]:r.NEAREST,[qS]:r.NEAREST_MIPMAP_NEAREST,[hc]:r.NEAREST_MIPMAP_LINEAR,[Ui]:r.LINEAR,[mh]:r.LINEAR_MIPMAP_NEAREST,[Ss]:r.LINEAR_MIPMAP_LINEAR},N={[KS]:r.NEVER,[nM]:r.ALWAYS,[QS]:r.LESS,[x0]:r.LEQUAL,[JS]:r.EQUAL,[eM]:r.GEQUAL,[$S]:r.GREATER,[tM]:r.NOTEQUAL};function et(L,T){if(T.type===la&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Ui||T.magFilter===mh||T.magFilter===hc||T.magFilter===Ss||T.minFilter===Ui||T.minFilter===mh||T.minFilter===hc||T.minFilter===Ss)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,St[T.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,St[T.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,St[T.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,At[T.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,At[T.minFilter]),T.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,N[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Mi||T.minFilter!==hc&&T.minFilter!==Ss||T.type===la&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const J=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function Mt(L,T){let J=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",P));const ut=T.source;let Tt=y.get(ut);Tt===void 0&&(Tt={},y.set(ut,Tt));const ft=lt(T);if(ft!==L.__cacheKey){Tt[ft]===void 0&&(Tt[ft]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,J=!0),Tt[ft].usedTimes++;const $t=Tt[L.__cacheKey];$t!==void 0&&(Tt[L.__cacheKey].usedTimes--,$t.usedTimes===0&&D(T)),L.__cacheKey=ft,L.__webglTexture=Tt[ft].texture}return J}function Dt(L,T,J){return Math.floor(Math.floor(L/J)/T)}function Ft(L,T,J,ut){const ft=L.updateRanges;if(ft.length===0)n.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,J,ut,T.data);else{ft.sort((Rt,Nt)=>Rt.start-Nt.start);let $t=0;for(let Rt=1;Rt<ft.length;Rt++){const Nt=ft[$t],ee=ft[Rt],Xt=Nt.start+Nt.count,Ht=Dt(ee.start,T.width,4),fe=Dt(Nt.start,T.width,4);ee.start<=Xt+1&&Ht===fe&&Dt(ee.start+ee.count-1,T.width,4)===Ht?Nt.count=Math.max(Nt.count,ee.start+ee.count-Nt.start):(++$t,ft[$t]=ee)}ft.length=$t+1;const Lt=r.getParameter(r.UNPACK_ROW_LENGTH),Qt=r.getParameter(r.UNPACK_SKIP_PIXELS),Jt=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let Rt=0,Nt=ft.length;Rt<Nt;Rt++){const ee=ft[Rt],Xt=Math.floor(ee.start/4),Ht=Math.ceil(ee.count/4),fe=Xt%T.width,W=Math.floor(Xt/T.width),wt=Ht,Pt=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,fe),r.pixelStorei(r.UNPACK_SKIP_ROWS,W),n.texSubImage2D(r.TEXTURE_2D,0,fe,W,wt,Pt,J,ut,T.data)}L.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,Lt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Qt),r.pixelStorei(r.UNPACK_SKIP_ROWS,Jt)}}function it(L,T,J){let ut=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ut=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ut=r.TEXTURE_3D);const Tt=Mt(L,T),ft=T.source;n.bindTexture(ut,L.__webglTexture,r.TEXTURE0+J);const $t=s.get(ft);if(ft.version!==$t.__version||Tt===!0){n.activeTexture(r.TEXTURE0+J);const Lt=Ue.getPrimaries(Ue.workingColorSpace),Qt=T.colorSpace===Ga?null:Ue.getPrimaries(T.colorSpace),Jt=T.colorSpace===Ga||Lt===Qt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let Rt=b(T.image,!1,l.maxTextureSize);Rt=oe(T,Rt);const Nt=c.convert(T.format,T.colorSpace),ee=c.convert(T.type);let Xt=U(T.internalFormat,Nt,ee,T.colorSpace,T.isVideoTexture);et(ut,T);let Ht;const fe=T.mipmaps,W=T.isVideoTexture!==!0,wt=$t.__version===void 0||Tt===!0,Pt=ft.dataReady,Wt=H(T,Rt);if(T.isDepthTexture)Xt=R(T.format===Yo,T.type),wt&&(W?n.texStorage2D(r.TEXTURE_2D,1,Xt,Rt.width,Rt.height):n.texImage2D(r.TEXTURE_2D,0,Xt,Rt.width,Rt.height,0,Nt,ee,null));else if(T.isDataTexture)if(fe.length>0){W&&wt&&n.texStorage2D(r.TEXTURE_2D,Wt,Xt,fe[0].width,fe[0].height);for(let bt=0,vt=fe.length;bt<vt;bt++)Ht=fe[bt],W?Pt&&n.texSubImage2D(r.TEXTURE_2D,bt,0,0,Ht.width,Ht.height,Nt,ee,Ht.data):n.texImage2D(r.TEXTURE_2D,bt,Xt,Ht.width,Ht.height,0,Nt,ee,Ht.data);T.generateMipmaps=!1}else W?(wt&&n.texStorage2D(r.TEXTURE_2D,Wt,Xt,Rt.width,Rt.height),Pt&&Ft(T,Rt,Nt,ee)):n.texImage2D(r.TEXTURE_2D,0,Xt,Rt.width,Rt.height,0,Nt,ee,Rt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){W&&wt&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Wt,Xt,fe[0].width,fe[0].height,Rt.depth);for(let bt=0,vt=fe.length;bt<vt;bt++)if(Ht=fe[bt],T.format!==Si)if(Nt!==null)if(W){if(Pt)if(T.layerUpdates.size>0){const Yt=Iv(Ht.width,Ht.height,T.format,T.type);for(const ce of T.layerUpdates){const ze=Ht.data.subarray(ce*Yt/Ht.data.BYTES_PER_ELEMENT,(ce+1)*Yt/Ht.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,bt,0,0,ce,Ht.width,Ht.height,1,Nt,ze)}T.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,bt,0,0,0,Ht.width,Ht.height,Rt.depth,Nt,Ht.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,bt,Xt,Ht.width,Ht.height,Rt.depth,0,Ht.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else W?Pt&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,bt,0,0,0,Ht.width,Ht.height,Rt.depth,Nt,ee,Ht.data):n.texImage3D(r.TEXTURE_2D_ARRAY,bt,Xt,Ht.width,Ht.height,Rt.depth,0,Nt,ee,Ht.data)}else{W&&wt&&n.texStorage2D(r.TEXTURE_2D,Wt,Xt,fe[0].width,fe[0].height);for(let bt=0,vt=fe.length;bt<vt;bt++)Ht=fe[bt],T.format!==Si?Nt!==null?W?Pt&&n.compressedTexSubImage2D(r.TEXTURE_2D,bt,0,0,Ht.width,Ht.height,Nt,Ht.data):n.compressedTexImage2D(r.TEXTURE_2D,bt,Xt,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):W?Pt&&n.texSubImage2D(r.TEXTURE_2D,bt,0,0,Ht.width,Ht.height,Nt,ee,Ht.data):n.texImage2D(r.TEXTURE_2D,bt,Xt,Ht.width,Ht.height,0,Nt,ee,Ht.data)}else if(T.isDataArrayTexture)if(W){if(wt&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Wt,Xt,Rt.width,Rt.height,Rt.depth),Pt)if(T.layerUpdates.size>0){const bt=Iv(Rt.width,Rt.height,T.format,T.type);for(const vt of T.layerUpdates){const Yt=Rt.data.subarray(vt*bt/Rt.data.BYTES_PER_ELEMENT,(vt+1)*bt/Rt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,vt,Rt.width,Rt.height,1,Nt,ee,Yt)}T.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Rt.width,Rt.height,Rt.depth,Nt,ee,Rt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,Xt,Rt.width,Rt.height,Rt.depth,0,Nt,ee,Rt.data);else if(T.isData3DTexture)W?(wt&&n.texStorage3D(r.TEXTURE_3D,Wt,Xt,Rt.width,Rt.height,Rt.depth),Pt&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Rt.width,Rt.height,Rt.depth,Nt,ee,Rt.data)):n.texImage3D(r.TEXTURE_3D,0,Xt,Rt.width,Rt.height,Rt.depth,0,Nt,ee,Rt.data);else if(T.isFramebufferTexture){if(wt)if(W)n.texStorage2D(r.TEXTURE_2D,Wt,Xt,Rt.width,Rt.height);else{let bt=Rt.width,vt=Rt.height;for(let Yt=0;Yt<Wt;Yt++)n.texImage2D(r.TEXTURE_2D,Yt,Xt,bt,vt,0,Nt,ee,null),bt>>=1,vt>>=1}}else if(fe.length>0){if(W&&wt){const bt=le(fe[0]);n.texStorage2D(r.TEXTURE_2D,Wt,Xt,bt.width,bt.height)}for(let bt=0,vt=fe.length;bt<vt;bt++)Ht=fe[bt],W?Pt&&n.texSubImage2D(r.TEXTURE_2D,bt,0,0,Nt,ee,Ht):n.texImage2D(r.TEXTURE_2D,bt,Xt,Nt,ee,Ht);T.generateMipmaps=!1}else if(W){if(wt){const bt=le(Rt);n.texStorage2D(r.TEXTURE_2D,Wt,Xt,bt.width,bt.height)}Pt&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Nt,ee,Rt)}else n.texImage2D(r.TEXTURE_2D,0,Xt,Nt,ee,Rt);M(T)&&v(ut),$t.__version=ft.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function ht(L,T,J){if(T.image.length!==6)return;const ut=Mt(L,T),Tt=T.source;n.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+J);const ft=s.get(Tt);if(Tt.version!==ft.__version||ut===!0){n.activeTexture(r.TEXTURE0+J);const $t=Ue.getPrimaries(Ue.workingColorSpace),Lt=T.colorSpace===Ga?null:Ue.getPrimaries(T.colorSpace),Qt=T.colorSpace===Ga||$t===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);const Jt=T.isCompressedTexture||T.image[0].isCompressedTexture,Rt=T.image[0]&&T.image[0].isDataTexture,Nt=[];for(let vt=0;vt<6;vt++)!Jt&&!Rt?Nt[vt]=b(T.image[vt],!0,l.maxCubemapSize):Nt[vt]=Rt?T.image[vt].image:T.image[vt],Nt[vt]=oe(T,Nt[vt]);const ee=Nt[0],Xt=c.convert(T.format,T.colorSpace),Ht=c.convert(T.type),fe=U(T.internalFormat,Xt,Ht,T.colorSpace),W=T.isVideoTexture!==!0,wt=ft.__version===void 0||ut===!0,Pt=Tt.dataReady;let Wt=H(T,ee);et(r.TEXTURE_CUBE_MAP,T);let bt;if(Jt){W&&wt&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Wt,fe,ee.width,ee.height);for(let vt=0;vt<6;vt++){bt=Nt[vt].mipmaps;for(let Yt=0;Yt<bt.length;Yt++){const ce=bt[Yt];T.format!==Si?Xt!==null?W?Pt&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Yt,0,0,ce.width,ce.height,Xt,ce.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Yt,fe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?Pt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Yt,0,0,ce.width,ce.height,Xt,Ht,ce.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Yt,fe,ce.width,ce.height,0,Xt,Ht,ce.data)}}}else{if(bt=T.mipmaps,W&&wt){bt.length>0&&Wt++;const vt=le(Nt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Wt,fe,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(Rt){W?Pt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Nt[vt].width,Nt[vt].height,Xt,Ht,Nt[vt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,fe,Nt[vt].width,Nt[vt].height,0,Xt,Ht,Nt[vt].data);for(let Yt=0;Yt<bt.length;Yt++){const ze=bt[Yt].image[vt].image;W?Pt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Yt+1,0,0,ze.width,ze.height,Xt,Ht,ze.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Yt+1,fe,ze.width,ze.height,0,Xt,Ht,ze.data)}}else{W?Pt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Xt,Ht,Nt[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,fe,Xt,Ht,Nt[vt]);for(let Yt=0;Yt<bt.length;Yt++){const ce=bt[Yt];W?Pt&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Yt+1,0,0,Xt,Ht,ce.image[vt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Yt+1,fe,Xt,Ht,ce.image[vt])}}}M(T)&&v(r.TEXTURE_CUBE_MAP),ft.__version=Tt.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function It(L,T,J,ut,Tt,ft){const $t=c.convert(J.format,J.colorSpace),Lt=c.convert(J.type),Qt=U(J.internalFormat,$t,Lt,J.colorSpace),Jt=s.get(T),Rt=s.get(J);if(Rt.__renderTarget=T,!Jt.__hasExternalTextures){const Nt=Math.max(1,T.width>>ft),ee=Math.max(1,T.height>>ft);Tt===r.TEXTURE_3D||Tt===r.TEXTURE_2D_ARRAY?n.texImage3D(Tt,ft,Qt,Nt,ee,T.depth,0,$t,Lt,null):n.texImage2D(Tt,ft,Qt,Nt,ee,0,$t,Lt,null)}n.bindFramebuffer(r.FRAMEBUFFER,L),Ct(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ut,Tt,Rt.__webglTexture,0,zt(T)):(Tt===r.TEXTURE_2D||Tt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Tt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ut,Tt,Rt.__webglTexture,ft),n.bindFramebuffer(r.FRAMEBUFFER,null)}function Bt(L,T,J){if(r.bindRenderbuffer(r.RENDERBUFFER,L),T.depthBuffer){const ut=T.depthTexture,Tt=ut&&ut.isDepthTexture?ut.type:null,ft=R(T.stencilBuffer,Tt),$t=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=zt(T);Ct(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt,ft,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,ft,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,ft,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,$t,r.RENDERBUFFER,L)}else{const ut=T.textures;for(let Tt=0;Tt<ut.length;Tt++){const ft=ut[Tt],$t=c.convert(ft.format,ft.colorSpace),Lt=c.convert(ft.type),Qt=U(ft.internalFormat,$t,Lt,ft.colorSpace),Jt=zt(T);J&&Ct(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Jt,Qt,T.width,T.height):Ct(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Jt,Qt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Qt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function qt(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ut=s.get(T.depthTexture);ut.__renderTarget=T,(!ut.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),ct(T.depthTexture,0);const Tt=ut.__webglTexture,ft=zt(T);if(T.depthTexture.format===qo)Ct(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Tt,0,ft):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Tt,0);else if(T.depthTexture.format===Yo)Ct(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Tt,0,ft):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Tt,0);else throw new Error("Unknown depthTexture format")}function de(L){const T=s.get(L),J=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){const ut=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ut){const Tt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ut.removeEventListener("dispose",Tt)};ut.addEventListener("dispose",Tt),T.__depthDisposeCallback=Tt}T.__boundDepthTexture=ut}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");const ut=L.texture.mipmaps;ut&&ut.length>0?qt(T.__webglFramebuffer[0],L):qt(T.__webglFramebuffer,L)}else if(J){T.__webglDepthbuffer=[];for(let ut=0;ut<6;ut++)if(n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ut]),T.__webglDepthbuffer[ut]===void 0)T.__webglDepthbuffer[ut]=r.createRenderbuffer(),Bt(T.__webglDepthbuffer[ut],L,!1);else{const Tt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ft=T.__webglDepthbuffer[ut];r.bindRenderbuffer(r.RENDERBUFFER,ft),r.framebufferRenderbuffer(r.FRAMEBUFFER,Tt,r.RENDERBUFFER,ft)}}else{const ut=L.texture.mipmaps;if(ut&&ut.length>0?n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):n.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),Bt(T.__webglDepthbuffer,L,!1);else{const Tt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ft=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ft),r.framebufferRenderbuffer(r.FRAMEBUFFER,Tt,r.RENDERBUFFER,ft)}}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ne(L,T,J){const ut=s.get(L);T!==void 0&&It(ut.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&de(L)}function B(L){const T=L.texture,J=s.get(L),ut=s.get(T);L.addEventListener("dispose",I);const Tt=L.textures,ft=L.isWebGLCubeRenderTarget===!0,$t=Tt.length>1;if($t||(ut.__webglTexture===void 0&&(ut.__webglTexture=r.createTexture()),ut.__version=T.version,f.memory.textures++),ft){J.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer[Lt]=[];for(let Qt=0;Qt<T.mipmaps.length;Qt++)J.__webglFramebuffer[Lt][Qt]=r.createFramebuffer()}else J.__webglFramebuffer[Lt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer=[];for(let Lt=0;Lt<T.mipmaps.length;Lt++)J.__webglFramebuffer[Lt]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if($t)for(let Lt=0,Qt=Tt.length;Lt<Qt;Lt++){const Jt=s.get(Tt[Lt]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=r.createTexture(),f.memory.textures++)}if(L.samples>0&&Ct(L)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Lt=0;Lt<Tt.length;Lt++){const Qt=Tt[Lt];J.__webglColorRenderbuffer[Lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[Lt]);const Jt=c.convert(Qt.format,Qt.colorSpace),Rt=c.convert(Qt.type),Nt=U(Qt.internalFormat,Jt,Rt,Qt.colorSpace,L.isXRRenderTarget===!0),ee=zt(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,ee,Nt,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Lt,r.RENDERBUFFER,J.__webglColorRenderbuffer[Lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),Bt(J.__webglDepthRenderbuffer,L,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ft){n.bindTexture(r.TEXTURE_CUBE_MAP,ut.__webglTexture),et(r.TEXTURE_CUBE_MAP,T);for(let Lt=0;Lt<6;Lt++)if(T.mipmaps&&T.mipmaps.length>0)for(let Qt=0;Qt<T.mipmaps.length;Qt++)It(J.__webglFramebuffer[Lt][Qt],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,Qt);else It(J.__webglFramebuffer[Lt],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);M(T)&&v(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if($t){for(let Lt=0,Qt=Tt.length;Lt<Qt;Lt++){const Jt=Tt[Lt],Rt=s.get(Jt);let Nt=r.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Nt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Nt,Rt.__webglTexture),et(Nt,Jt),It(J.__webglFramebuffer,L,Jt,r.COLOR_ATTACHMENT0+Lt,Nt,0),M(Jt)&&v(Nt)}n.unbindTexture()}else{let Lt=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Lt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Lt,ut.__webglTexture),et(Lt,T),T.mipmaps&&T.mipmaps.length>0)for(let Qt=0;Qt<T.mipmaps.length;Qt++)It(J.__webglFramebuffer[Qt],L,T,r.COLOR_ATTACHMENT0,Lt,Qt);else It(J.__webglFramebuffer,L,T,r.COLOR_ATTACHMENT0,Lt,0);M(T)&&v(Lt),n.unbindTexture()}L.depthBuffer&&de(L)}function Et(L){const T=L.textures;for(let J=0,ut=T.length;J<ut;J++){const Tt=T[J];if(M(Tt)){const ft=z(L),$t=s.get(Tt).__webglTexture;n.bindTexture(ft,$t),v(ft),n.unbindTexture()}}}const yt=[],mt=[];function gt(L){if(L.samples>0){if(Ct(L)===!1){const T=L.textures,J=L.width,ut=L.height;let Tt=r.COLOR_BUFFER_BIT;const ft=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$t=s.get(L),Lt=T.length>1;if(Lt)for(let Jt=0;Jt<T.length;Jt++)n.bindFramebuffer(r.FRAMEBUFFER,$t.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Jt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,$t.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Jt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,$t.__webglMultisampledFramebuffer);const Qt=L.texture.mipmaps;Qt&&Qt.length>0?n.bindFramebuffer(r.DRAW_FRAMEBUFFER,$t.__webglFramebuffer[0]):n.bindFramebuffer(r.DRAW_FRAMEBUFFER,$t.__webglFramebuffer);for(let Jt=0;Jt<T.length;Jt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Tt|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Tt|=r.STENCIL_BUFFER_BIT)),Lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,$t.__webglColorRenderbuffer[Jt]);const Rt=s.get(T[Jt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Rt,0)}r.blitFramebuffer(0,0,J,ut,0,0,J,ut,Tt,r.NEAREST),m===!0&&(yt.length=0,mt.length=0,yt.push(r.COLOR_ATTACHMENT0+Jt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(yt.push(ft),mt.push(ft),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,mt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,yt))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Lt)for(let Jt=0;Jt<T.length;Jt++){n.bindFramebuffer(r.FRAMEBUFFER,$t.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Jt,r.RENDERBUFFER,$t.__webglColorRenderbuffer[Jt]);const Rt=s.get(T[Jt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,$t.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Jt,r.TEXTURE_2D,Rt,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,$t.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&m){const T=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function zt(L){return Math.min(l.maxSamples,L.samples)}function Ct(L){const T=s.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ot(L){const T=f.render.frame;g.get(L)!==T&&(g.set(L,T),L.update())}function oe(L,T){const J=L.colorSpace,ut=L.format,Tt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||J!==Pr&&J!==Ga&&(Ue.getTransfer(J)===Ve?(ut!==Si||Tt!==Pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),T}function le(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(p.width=L.naturalWidth||L.width,p.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(p.width=L.displayWidth,p.height=L.displayHeight):(p.width=L.width,p.height=L.height),p}this.allocateTextureUnit=rt,this.resetTextureUnits=Q,this.setTexture2D=ct,this.setTexture2DArray=O,this.setTexture3D=K,this.setTextureCube=Y,this.rebindTextures=Ne,this.setupRenderTarget=B,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=It,this.useMultisampledRTT=Ct}function cR(r,t){function n(s,l=Ga){let c;const f=Ue.getTransfer(l);if(s===Pi)return r.UNSIGNED_BYTE;if(s===qd)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Yd)return r.UNSIGNED_SHORT_5_5_5_1;if(s===p0)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===m0)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===h0)return r.BYTE;if(s===d0)return r.SHORT;if(s===Xo)return r.UNSIGNED_SHORT;if(s===Wd)return r.INT;if(s===Ms)return r.UNSIGNED_INT;if(s===la)return r.FLOAT;if(s===$o)return r.HALF_FLOAT;if(s===g0)return r.ALPHA;if(s===_0)return r.RGB;if(s===Si)return r.RGBA;if(s===qo)return r.DEPTH_COMPONENT;if(s===Yo)return r.DEPTH_STENCIL;if(s===v0)return r.RED;if(s===Zd)return r.RED_INTEGER;if(s===y0)return r.RG;if(s===jd)return r.RG_INTEGER;if(s===Kd)return r.RGBA_INTEGER;if(s===Gc||s===Vc||s===kc||s===Xc)if(f===Ve)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Gc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Vc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===kc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Xc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Gc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Vc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===kc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Xc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===fd||s===hd||s===dd||s===pd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===fd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===hd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===dd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===pd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===md||s===gd||s===_d)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===md||s===gd)return f===Ve?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===_d)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===vd||s===yd||s===xd||s===Sd||s===Md||s===Ed||s===Td||s===bd||s===Ad||s===Rd||s===Cd||s===wd||s===Dd||s===Ud)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===vd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===yd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===xd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Sd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Md)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ed)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Td)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===bd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ad)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Rd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Cd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===wd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Dd)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ud)return f===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ld||s===Nd||s===Od)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===Ld)return f===Ve?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Nd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Od)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Pd||s===zd||s===Id||s===Bd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Pd)return c.COMPRESSED_RED_RGTC1_EXT;if(s===zd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Id)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Bd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Wo?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:n}}const uR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class hR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const s=new N0(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,s=new Wa({vertexShader:uR,fragmentShader:fR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ni(new tu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dR extends As{constructor(t,n){super();const s=this;let l=null,c=1,f=null,d="local-floor",m=1,p=null,g=null,_=null,y=null,S=null,E=null;const b=typeof XRWebGLBinding<"u",M=new hR,v={},z=n.getContextAttributes();let U=null,R=null;const H=[],P=[],I=new Ut;let X=null;const D=new di;D.viewport=new Xe;const w=new di;w.viewport=new Xe;const G=[D,w],Q=new NE;let rt=null,lt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(it){let ht=H[it];return ht===void 0&&(ht=new zh,H[it]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(it){let ht=H[it];return ht===void 0&&(ht=new zh,H[it]=ht),ht.getGripSpace()},this.getHand=function(it){let ht=H[it];return ht===void 0&&(ht=new zh,H[it]=ht),ht.getHandSpace()};function ct(it){const ht=P.indexOf(it.inputSource);if(ht===-1)return;const It=H[ht];It!==void 0&&(It.update(it.inputSource,it.frame,p||f),It.dispatchEvent({type:it.type,data:it.inputSource}))}function O(){l.removeEventListener("select",ct),l.removeEventListener("selectstart",ct),l.removeEventListener("selectend",ct),l.removeEventListener("squeeze",ct),l.removeEventListener("squeezestart",ct),l.removeEventListener("squeezeend",ct),l.removeEventListener("end",O),l.removeEventListener("inputsourceschange",K);for(let it=0;it<H.length;it++){const ht=P[it];ht!==null&&(P[it]=null,H[it].disconnect(ht))}rt=null,lt=null,M.reset();for(const it in v)delete v[it];t.setRenderTarget(U),S=null,y=null,_=null,l=null,R=null,Ft.stop(),s.isPresenting=!1,t.setPixelRatio(X),t.setSize(I.width,I.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(it){c=it,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(it){d=it,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(it){p=it},this.getBaseLayer=function(){return y!==null?y:S},this.getBinding=function(){return _===null&&b&&(_=new XRWebGLBinding(l,n)),_},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(it){if(l=it,l!==null){if(U=t.getRenderTarget(),l.addEventListener("select",ct),l.addEventListener("selectstart",ct),l.addEventListener("selectend",ct),l.addEventListener("squeeze",ct),l.addEventListener("squeezestart",ct),l.addEventListener("squeezeend",ct),l.addEventListener("end",O),l.addEventListener("inputsourceschange",K),z.xrCompatible!==!0&&await n.makeXRCompatible(),X=t.getPixelRatio(),t.getSize(I),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let It=null,Bt=null,qt=null;z.depth&&(qt=z.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,It=z.stencil?Yo:qo,Bt=z.stencil?Wo:Ms);const de={colorFormat:n.RGBA8,depthFormat:qt,scaleFactor:c};_=this.getBinding(),y=_.createProjectionLayer(de),l.updateRenderState({layers:[y]}),t.setPixelRatio(1),t.setSize(y.textureWidth,y.textureHeight,!1),R=new Ts(y.textureWidth,y.textureHeight,{format:Si,type:Pi,depthTexture:new L0(y.textureWidth,y.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,It),stencilBuffer:z.stencil,colorSpace:t.outputColorSpace,samples:z.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}else{const It={antialias:z.antialias,alpha:!0,depth:z.depth,stencil:z.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,n,It),l.updateRenderState({baseLayer:S}),t.setPixelRatio(1),t.setSize(S.framebufferWidth,S.framebufferHeight,!1),R=new Ts(S.framebufferWidth,S.framebufferHeight,{format:Si,type:Pi,colorSpace:t.outputColorSpace,stencilBuffer:z.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(d),Ft.setContext(l),Ft.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function K(it){for(let ht=0;ht<it.removed.length;ht++){const It=it.removed[ht],Bt=P.indexOf(It);Bt>=0&&(P[Bt]=null,H[Bt].disconnect(It))}for(let ht=0;ht<it.added.length;ht++){const It=it.added[ht];let Bt=P.indexOf(It);if(Bt===-1){for(let de=0;de<H.length;de++)if(de>=P.length){P.push(It),Bt=de;break}else if(P[de]===null){P[de]=It,Bt=de;break}if(Bt===-1)break}const qt=H[Bt];qt&&qt.connect(It)}}const Y=new V,St=new V;function At(it,ht,It){Y.setFromMatrixPosition(ht.matrixWorld),St.setFromMatrixPosition(It.matrixWorld);const Bt=Y.distanceTo(St),qt=ht.projectionMatrix.elements,de=It.projectionMatrix.elements,Ne=qt[14]/(qt[10]-1),B=qt[14]/(qt[10]+1),Et=(qt[9]+1)/qt[5],yt=(qt[9]-1)/qt[5],mt=(qt[8]-1)/qt[0],gt=(de[8]+1)/de[0],zt=Ne*mt,Ct=Ne*gt,Ot=Bt/(-mt+gt),oe=Ot*-mt;if(ht.matrixWorld.decompose(it.position,it.quaternion,it.scale),it.translateX(oe),it.translateZ(Ot),it.matrixWorld.compose(it.position,it.quaternion,it.scale),it.matrixWorldInverse.copy(it.matrixWorld).invert(),qt[10]===-1)it.projectionMatrix.copy(ht.projectionMatrix),it.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const le=Ne+Ot,L=B+Ot,T=zt-oe,J=Ct+(Bt-oe),ut=Et*B/L*le,Tt=yt*B/L*le;it.projectionMatrix.makePerspective(T,J,ut,Tt,le,L),it.projectionMatrixInverse.copy(it.projectionMatrix).invert()}}function N(it,ht){ht===null?it.matrixWorld.copy(it.matrix):it.matrixWorld.multiplyMatrices(ht.matrixWorld,it.matrix),it.matrixWorldInverse.copy(it.matrixWorld).invert()}this.updateCamera=function(it){if(l===null)return;let ht=it.near,It=it.far;M.texture!==null&&(M.depthNear>0&&(ht=M.depthNear),M.depthFar>0&&(It=M.depthFar)),Q.near=w.near=D.near=ht,Q.far=w.far=D.far=It,(rt!==Q.near||lt!==Q.far)&&(l.updateRenderState({depthNear:Q.near,depthFar:Q.far}),rt=Q.near,lt=Q.far),Q.layers.mask=it.layers.mask|6,D.layers.mask=Q.layers.mask&3,w.layers.mask=Q.layers.mask&5;const Bt=it.parent,qt=Q.cameras;N(Q,Bt);for(let de=0;de<qt.length;de++)N(qt[de],Bt);qt.length===2?At(Q,D,w):Q.projectionMatrix.copy(D.projectionMatrix),et(it,Q,Bt)};function et(it,ht,It){It===null?it.matrix.copy(ht.matrixWorld):(it.matrix.copy(It.matrixWorld),it.matrix.invert(),it.matrix.multiply(ht.matrixWorld)),it.matrix.decompose(it.position,it.quaternion,it.scale),it.updateMatrixWorld(!0),it.projectionMatrix.copy(ht.projectionMatrix),it.projectionMatrixInverse.copy(ht.projectionMatrixInverse),it.isPerspectiveCamera&&(it.fov=Zo*2*Math.atan(1/it.projectionMatrix.elements[5]),it.zoom=1)}this.getCamera=function(){return Q},this.getFoveation=function(){if(!(y===null&&S===null))return m},this.setFoveation=function(it){m=it,y!==null&&(y.fixedFoveation=it),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=it)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(Q)},this.getCameraTexture=function(it){return v[it]};let Mt=null;function Dt(it,ht){if(g=ht.getViewerPose(p||f),E=ht,g!==null){const It=g.views;S!==null&&(t.setRenderTargetFramebuffer(R,S.framebuffer),t.setRenderTarget(R));let Bt=!1;It.length!==Q.cameras.length&&(Q.cameras.length=0,Bt=!0);for(let B=0;B<It.length;B++){const Et=It[B];let yt=null;if(S!==null)yt=S.getViewport(Et);else{const gt=_.getViewSubImage(y,Et);yt=gt.viewport,B===0&&(t.setRenderTargetTextures(R,gt.colorTexture,gt.depthStencilTexture),t.setRenderTarget(R))}let mt=G[B];mt===void 0&&(mt=new di,mt.layers.enable(B),mt.viewport=new Xe,G[B]=mt),mt.matrix.fromArray(Et.transform.matrix),mt.matrix.decompose(mt.position,mt.quaternion,mt.scale),mt.projectionMatrix.fromArray(Et.projectionMatrix),mt.projectionMatrixInverse.copy(mt.projectionMatrix).invert(),mt.viewport.set(yt.x,yt.y,yt.width,yt.height),B===0&&(Q.matrix.copy(mt.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale)),Bt===!0&&Q.cameras.push(mt)}const qt=l.enabledFeatures;if(qt&&qt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&b){_=s.getBinding();const B=_.getDepthInformation(It[0]);B&&B.isValid&&B.texture&&M.init(B,l.renderState)}if(qt&&qt.includes("camera-access")&&b){t.state.unbindTexture(),_=s.getBinding();for(let B=0;B<It.length;B++){const Et=It[B].camera;if(Et){let yt=v[Et];yt||(yt=new N0,v[Et]=yt);const mt=_.getCameraImage(Et);yt.sourceTexture=mt}}}}for(let It=0;It<H.length;It++){const Bt=P[It],qt=H[It];Bt!==null&&qt!==void 0&&qt.update(Bt,ht,p||f)}Mt&&Mt(it,ht),ht.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ht}),E=null}const Ft=new K0;Ft.setAnimationLoop(Dt),this.setAnimationLoop=function(it){Mt=it},this.dispose=function(){}}}const gs=new Ei,pR=new Je;function mR(r,t){function n(M,v){M.matrixAutoUpdate===!0&&M.updateMatrix(),v.value.copy(M.matrix)}function s(M,v){v.color.getRGB(M.fogColor.value,R0(r)),v.isFog?(M.fogNear.value=v.near,M.fogFar.value=v.far):v.isFogExp2&&(M.fogDensity.value=v.density)}function l(M,v,z,U,R){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(M,v):v.isMeshToonMaterial?(c(M,v),_(M,v)):v.isMeshPhongMaterial?(c(M,v),g(M,v)):v.isMeshStandardMaterial?(c(M,v),y(M,v),v.isMeshPhysicalMaterial&&S(M,v,R)):v.isMeshMatcapMaterial?(c(M,v),E(M,v)):v.isMeshDepthMaterial?c(M,v):v.isMeshDistanceMaterial?(c(M,v),b(M,v)):v.isMeshNormalMaterial?c(M,v):v.isLineBasicMaterial?(f(M,v),v.isLineDashedMaterial&&d(M,v)):v.isPointsMaterial?m(M,v,z,U):v.isSpriteMaterial?p(M,v):v.isShadowMaterial?(M.color.value.copy(v.color),M.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(M,v){M.opacity.value=v.opacity,v.color&&M.diffuse.value.copy(v.color),v.emissive&&M.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(M.map.value=v.map,n(v.map,M.mapTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,n(v.alphaMap,M.alphaMapTransform)),v.bumpMap&&(M.bumpMap.value=v.bumpMap,n(v.bumpMap,M.bumpMapTransform),M.bumpScale.value=v.bumpScale,v.side===Xn&&(M.bumpScale.value*=-1)),v.normalMap&&(M.normalMap.value=v.normalMap,n(v.normalMap,M.normalMapTransform),M.normalScale.value.copy(v.normalScale),v.side===Xn&&M.normalScale.value.negate()),v.displacementMap&&(M.displacementMap.value=v.displacementMap,n(v.displacementMap,M.displacementMapTransform),M.displacementScale.value=v.displacementScale,M.displacementBias.value=v.displacementBias),v.emissiveMap&&(M.emissiveMap.value=v.emissiveMap,n(v.emissiveMap,M.emissiveMapTransform)),v.specularMap&&(M.specularMap.value=v.specularMap,n(v.specularMap,M.specularMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest);const z=t.get(v),U=z.envMap,R=z.envMapRotation;U&&(M.envMap.value=U,gs.copy(R),gs.x*=-1,gs.y*=-1,gs.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),M.envMapRotation.value.setFromMatrix4(pR.makeRotationFromEuler(gs)),M.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=v.reflectivity,M.ior.value=v.ior,M.refractionRatio.value=v.refractionRatio),v.lightMap&&(M.lightMap.value=v.lightMap,M.lightMapIntensity.value=v.lightMapIntensity,n(v.lightMap,M.lightMapTransform)),v.aoMap&&(M.aoMap.value=v.aoMap,M.aoMapIntensity.value=v.aoMapIntensity,n(v.aoMap,M.aoMapTransform))}function f(M,v){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,v.map&&(M.map.value=v.map,n(v.map,M.mapTransform))}function d(M,v){M.dashSize.value=v.dashSize,M.totalSize.value=v.dashSize+v.gapSize,M.scale.value=v.scale}function m(M,v,z,U){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,M.size.value=v.size*z,M.scale.value=U*.5,v.map&&(M.map.value=v.map,n(v.map,M.uvTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,n(v.alphaMap,M.alphaMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest)}function p(M,v){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,M.rotation.value=v.rotation,v.map&&(M.map.value=v.map,n(v.map,M.mapTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,n(v.alphaMap,M.alphaMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest)}function g(M,v){M.specular.value.copy(v.specular),M.shininess.value=Math.max(v.shininess,1e-4)}function _(M,v){v.gradientMap&&(M.gradientMap.value=v.gradientMap)}function y(M,v){M.metalness.value=v.metalness,v.metalnessMap&&(M.metalnessMap.value=v.metalnessMap,n(v.metalnessMap,M.metalnessMapTransform)),M.roughness.value=v.roughness,v.roughnessMap&&(M.roughnessMap.value=v.roughnessMap,n(v.roughnessMap,M.roughnessMapTransform)),v.envMap&&(M.envMapIntensity.value=v.envMapIntensity)}function S(M,v,z){M.ior.value=v.ior,v.sheen>0&&(M.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),M.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(M.sheenColorMap.value=v.sheenColorMap,n(v.sheenColorMap,M.sheenColorMapTransform)),v.sheenRoughnessMap&&(M.sheenRoughnessMap.value=v.sheenRoughnessMap,n(v.sheenRoughnessMap,M.sheenRoughnessMapTransform))),v.clearcoat>0&&(M.clearcoat.value=v.clearcoat,M.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(M.clearcoatMap.value=v.clearcoatMap,n(v.clearcoatMap,M.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,n(v.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(M.clearcoatNormalMap.value=v.clearcoatNormalMap,n(v.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Xn&&M.clearcoatNormalScale.value.negate())),v.dispersion>0&&(M.dispersion.value=v.dispersion),v.iridescence>0&&(M.iridescence.value=v.iridescence,M.iridescenceIOR.value=v.iridescenceIOR,M.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(M.iridescenceMap.value=v.iridescenceMap,n(v.iridescenceMap,M.iridescenceMapTransform)),v.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=v.iridescenceThicknessMap,n(v.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),v.transmission>0&&(M.transmission.value=v.transmission,M.transmissionSamplerMap.value=z.texture,M.transmissionSamplerSize.value.set(z.width,z.height),v.transmissionMap&&(M.transmissionMap.value=v.transmissionMap,n(v.transmissionMap,M.transmissionMapTransform)),M.thickness.value=v.thickness,v.thicknessMap&&(M.thicknessMap.value=v.thicknessMap,n(v.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=v.attenuationDistance,M.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(M.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(M.anisotropyMap.value=v.anisotropyMap,n(v.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=v.specularIntensity,M.specularColor.value.copy(v.specularColor),v.specularColorMap&&(M.specularColorMap.value=v.specularColorMap,n(v.specularColorMap,M.specularColorMapTransform)),v.specularIntensityMap&&(M.specularIntensityMap.value=v.specularIntensityMap,n(v.specularIntensityMap,M.specularIntensityMapTransform))}function E(M,v){v.matcap&&(M.matcap.value=v.matcap)}function b(M,v){const z=t.get(v).light;M.referencePosition.value.setFromMatrixPosition(z.matrixWorld),M.nearDistance.value=z.shadow.camera.near,M.farDistance.value=z.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function gR(r,t,n,s){let l={},c={},f=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(z,U){const R=U.program;s.uniformBlockBinding(z,R)}function p(z,U){let R=l[z.id];R===void 0&&(E(z),R=g(z),l[z.id]=R,z.addEventListener("dispose",M));const H=U.program;s.updateUBOMapping(z,H);const P=t.render.frame;c[z.id]!==P&&(y(z),c[z.id]=P)}function g(z){const U=_();z.__bindingPointIndex=U;const R=r.createBuffer(),H=z.__size,P=z.usage;return r.bindBuffer(r.UNIFORM_BUFFER,R),r.bufferData(r.UNIFORM_BUFFER,H,P),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,R),R}function _(){for(let z=0;z<d;z++)if(f.indexOf(z)===-1)return f.push(z),z;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(z){const U=l[z.id],R=z.uniforms,H=z.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let P=0,I=R.length;P<I;P++){const X=Array.isArray(R[P])?R[P]:[R[P]];for(let D=0,w=X.length;D<w;D++){const G=X[D];if(S(G,P,D,H)===!0){const Q=G.__offset,rt=Array.isArray(G.value)?G.value:[G.value];let lt=0;for(let ct=0;ct<rt.length;ct++){const O=rt[ct],K=b(O);typeof O=="number"||typeof O=="boolean"?(G.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,Q+lt,G.__data)):O.isMatrix3?(G.__data[0]=O.elements[0],G.__data[1]=O.elements[1],G.__data[2]=O.elements[2],G.__data[3]=0,G.__data[4]=O.elements[3],G.__data[5]=O.elements[4],G.__data[6]=O.elements[5],G.__data[7]=0,G.__data[8]=O.elements[6],G.__data[9]=O.elements[7],G.__data[10]=O.elements[8],G.__data[11]=0):(O.toArray(G.__data,lt),lt+=K.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,Q,G.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(z,U,R,H){const P=z.value,I=U+"_"+R;if(H[I]===void 0)return typeof P=="number"||typeof P=="boolean"?H[I]=P:H[I]=P.clone(),!0;{const X=H[I];if(typeof P=="number"||typeof P=="boolean"){if(X!==P)return H[I]=P,!0}else if(X.equals(P)===!1)return X.copy(P),!0}return!1}function E(z){const U=z.uniforms;let R=0;const H=16;for(let I=0,X=U.length;I<X;I++){const D=Array.isArray(U[I])?U[I]:[U[I]];for(let w=0,G=D.length;w<G;w++){const Q=D[w],rt=Array.isArray(Q.value)?Q.value:[Q.value];for(let lt=0,ct=rt.length;lt<ct;lt++){const O=rt[lt],K=b(O),Y=R%H,St=Y%K.boundary,At=Y+St;R+=St,At!==0&&H-At<K.storage&&(R+=H-At),Q.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=R,R+=K.storage}}}const P=R%H;return P>0&&(R+=H-P),z.__size=R,z.__cache={},this}function b(z){const U={boundary:0,storage:0};return typeof z=="number"||typeof z=="boolean"?(U.boundary=4,U.storage=4):z.isVector2?(U.boundary=8,U.storage=8):z.isVector3||z.isColor?(U.boundary=16,U.storage=12):z.isVector4?(U.boundary=16,U.storage=16):z.isMatrix3?(U.boundary=48,U.storage=48):z.isMatrix4?(U.boundary=64,U.storage=64):z.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",z),U}function M(z){const U=z.target;U.removeEventListener("dispose",M);const R=f.indexOf(U.__bindingPointIndex);f.splice(R,1),r.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function v(){for(const z in l)r.deleteBuffer(l[z]);f=[],l={},c={}}return{bind:m,update:p,dispose:v}}class HR{constructor(t={}){const{canvas:n=xM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:y=!1}=t;this.isWebGLRenderer=!0;let S;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=s.getContextAttributes().alpha}else S=f;const E=new Uint32Array(4),b=new Int32Array(4);let M=null,v=null;const z=[],U=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ka,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let H=!1;this._outputColorSpace=hi;let P=0,I=0,X=null,D=-1,w=null;const G=new Xe,Q=new Xe;let rt=null;const lt=new Me(0);let ct=0,O=n.width,K=n.height,Y=1,St=null,At=null;const N=new Xe(0,0,O,K),et=new Xe(0,0,O,K);let Mt=!1;const Dt=new np;let Ft=!1,it=!1;const ht=new Je,It=new V,Bt=new Xe,qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Ne(){return X===null?Y:1}let B=s;function Et(C,q){return n.getContext(C,q)}try{const C={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${kd}`),n.addEventListener("webglcontextlost",Pt,!1),n.addEventListener("webglcontextrestored",Wt,!1),n.addEventListener("webglcontextcreationerror",bt,!1),B===null){const q="webgl2";if(B=Et(q,C),B===null)throw Et(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let yt,mt,gt,zt,Ct,Ot,oe,le,L,T,J,ut,Tt,ft,$t,Lt,Qt,Jt,Rt,Nt,ee,Xt,Ht,fe;function W(){yt=new RA(B),yt.init(),Xt=new cR(B,yt),mt=new xA(B,yt,t,Xt),gt=new oR(B,yt),mt.reversedDepthBuffer&&y&&gt.buffers.depth.setReversed(!0),zt=new DA(B),Ct=new Z1,Ot=new lR(B,yt,gt,Ct,mt,Xt,zt),oe=new MA(R),le=new AA(R),L=new zE(B),Ht=new vA(B,L),T=new CA(B,L,zt,Ht),J=new LA(B,T,L,zt),Rt=new UA(B,mt,Ot),Lt=new SA(Ct),ut=new Y1(R,oe,le,yt,mt,Ht,Lt),Tt=new mR(R,Ct),ft=new K1,$t=new nR(yt),Jt=new _A(R,oe,le,gt,J,S,m),Qt=new sR(R,J,mt),fe=new gR(B,zt,mt,gt),Nt=new yA(B,yt,zt),ee=new wA(B,yt,zt),zt.programs=ut.programs,R.capabilities=mt,R.extensions=yt,R.properties=Ct,R.renderLists=ft,R.shadowMap=Qt,R.state=gt,R.info=zt}W();const wt=new dR(R,B);this.xr=wt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const C=yt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=yt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(C){C!==void 0&&(Y=C,this.setSize(O,K,!1))},this.getSize=function(C){return C.set(O,K)},this.setSize=function(C,q,at=!0){if(wt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,K=q,n.width=Math.floor(C*Y),n.height=Math.floor(q*Y),at===!0&&(n.style.width=C+"px",n.style.height=q+"px"),this.setViewport(0,0,C,q)},this.getDrawingBufferSize=function(C){return C.set(O*Y,K*Y).floor()},this.setDrawingBufferSize=function(C,q,at){O=C,K=q,Y=at,n.width=Math.floor(C*at),n.height=Math.floor(q*at),this.setViewport(0,0,C,q)},this.getCurrentViewport=function(C){return C.copy(G)},this.getViewport=function(C){return C.copy(N)},this.setViewport=function(C,q,at,st){C.isVector4?N.set(C.x,C.y,C.z,C.w):N.set(C,q,at,st),gt.viewport(G.copy(N).multiplyScalar(Y).round())},this.getScissor=function(C){return C.copy(et)},this.setScissor=function(C,q,at,st){C.isVector4?et.set(C.x,C.y,C.z,C.w):et.set(C,q,at,st),gt.scissor(Q.copy(et).multiplyScalar(Y).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(C){gt.setScissorTest(Mt=C)},this.setOpaqueSort=function(C){St=C},this.setTransparentSort=function(C){At=C},this.getClearColor=function(C){return C.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor(...arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha(...arguments)},this.clear=function(C=!0,q=!0,at=!0){let st=0;if(C){let j=!1;if(X!==null){const xt=X.texture.format;j=xt===Kd||xt===jd||xt===Zd}if(j){const xt=X.texture.type,Gt=xt===Pi||xt===Ms||xt===Xo||xt===Wo||xt===qd||xt===Yd,jt=Jt.getClearColor(),kt=Jt.getClearAlpha(),ne=jt.r,re=jt.g,ie=jt.b;Gt?(E[0]=ne,E[1]=re,E[2]=ie,E[3]=kt,B.clearBufferuiv(B.COLOR,0,E)):(b[0]=ne,b[1]=re,b[2]=ie,b[3]=kt,B.clearBufferiv(B.COLOR,0,b))}else st|=B.COLOR_BUFFER_BIT}q&&(st|=B.DEPTH_BUFFER_BIT),at&&(st|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(st)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Pt,!1),n.removeEventListener("webglcontextrestored",Wt,!1),n.removeEventListener("webglcontextcreationerror",bt,!1),Jt.dispose(),ft.dispose(),$t.dispose(),Ct.dispose(),oe.dispose(),le.dispose(),J.dispose(),Ht.dispose(),fe.dispose(),ut.dispose(),wt.dispose(),wt.removeEventListener("sessionstart",ni),wt.removeEventListener("sessionend",Fr),Ti.stop()};function Pt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),H=!0}function Wt(){console.log("THREE.WebGLRenderer: Context Restored."),H=!1;const C=zt.autoReset,q=Qt.enabled,at=Qt.autoUpdate,st=Qt.needsUpdate,j=Qt.type;W(),zt.autoReset=C,Qt.enabled=q,Qt.autoUpdate=at,Qt.needsUpdate=st,Qt.type=j}function bt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function vt(C){const q=C.target;q.removeEventListener("dispose",vt),Yt(q)}function Yt(C){ce(C),Ct.remove(C)}function ce(C){const q=Ct.get(C).programs;q!==void 0&&(q.forEach(function(at){ut.releaseProgram(at)}),C.isShaderMaterial&&ut.releaseShaderCache(C))}this.renderBufferDirect=function(C,q,at,st,j,xt){q===null&&(q=qt);const Gt=j.isMesh&&j.matrixWorld.determinant()<0,jt=ua(C,q,at,st,j);gt.setMaterial(st,Gt);let kt=at.index,ne=1;if(st.wireframe===!0){if(kt=T.getWireframeAttribute(at),kt===void 0)return;ne=2}const re=at.drawRange,ie=at.attributes.position;let ve=re.start*ne,Oe=(re.start+re.count)*ne;xt!==null&&(ve=Math.max(ve,xt.start*ne),Oe=Math.min(Oe,(xt.start+xt.count)*ne)),kt!==null?(ve=Math.max(ve,0),Oe=Math.min(Oe,kt.count)):ie!=null&&(ve=Math.max(ve,0),Oe=Math.min(Oe,ie.count));const We=Oe-ve;if(We<0||We===1/0)return;Ht.setup(j,st,jt,at,kt);let Pe,ye=Nt;if(kt!==null&&(Pe=L.get(kt),ye=ee,ye.setIndex(Pe)),j.isMesh)st.wireframe===!0?(gt.setLineWidth(st.wireframeLinewidth*Ne()),ye.setMode(B.LINES)):ye.setMode(B.TRIANGLES);else if(j.isLine){let Kt=st.linewidth;Kt===void 0&&(Kt=1),gt.setLineWidth(Kt*Ne()),j.isLineSegments?ye.setMode(B.LINES):j.isLineLoop?ye.setMode(B.LINE_LOOP):ye.setMode(B.LINE_STRIP)}else j.isPoints?ye.setMode(B.POINTS):j.isSprite&&ye.setMode(B.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)jo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ye.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(yt.get("WEBGL_multi_draw"))ye.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Kt=j._multiDrawStarts,Ye=j._multiDrawCounts,Ce=j._multiDrawCount,Mn=kt?L.get(kt).bytesPerElement:1,Ii=Ct.get(st).currentProgram.getUniforms();for(let vn=0;vn<Ce;vn++)Ii.setValue(B,"_gl_DrawID",vn),ye.render(Kt[vn]/Mn,Ye[vn])}else if(j.isInstancedMesh)ye.renderInstances(ve,We,j.count);else if(at.isInstancedBufferGeometry){const Kt=at._maxInstanceCount!==void 0?at._maxInstanceCount:1/0,Ye=Math.min(at.instanceCount,Kt);ye.renderInstances(ve,We,Ye)}else ye.render(ve,We)};function ze(C,q,at){C.transparent===!0&&C.side===oa&&C.forceSinglePass===!1?(C.side=Xn,C.needsUpdate=!0,qn(C,q,at),C.side=Xa,C.needsUpdate=!0,qn(C,q,at),C.side=oa):qn(C,q,at)}this.compile=function(C,q,at=null){at===null&&(at=C),v=$t.get(at),v.init(q),U.push(v),at.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(v.pushLight(j),j.castShadow&&v.pushShadow(j))}),C!==at&&C.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(v.pushLight(j),j.castShadow&&v.pushShadow(j))}),v.setupLights();const st=new Set;return C.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const xt=j.material;if(xt)if(Array.isArray(xt))for(let Gt=0;Gt<xt.length;Gt++){const jt=xt[Gt];ze(jt,at,j),st.add(jt)}else ze(xt,at,j),st.add(xt)}),v=U.pop(),st},this.compileAsync=function(C,q,at=null){const st=this.compile(C,q,at);return new Promise(j=>{function xt(){if(st.forEach(function(Gt){Ct.get(Gt).currentProgram.isReady()&&st.delete(Gt)}),st.size===0){j(C);return}setTimeout(xt,10)}yt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let Re=null;function Un(C){Re&&Re(C)}function ni(){Ti.stop()}function Fr(){Ti.start()}const Ti=new K0;Ti.setAnimationLoop(Un),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(C){Re=C,wt.setAnimationLoop(C),C===null?Ti.stop():Ti.start()},wt.addEventListener("sessionstart",ni),wt.addEventListener("sessionend",Fr),this.render=function(C,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),wt.enabled===!0&&wt.isPresenting===!0&&(wt.cameraAutoUpdate===!0&&wt.updateCamera(q),q=wt.getCamera()),C.isScene===!0&&C.onBeforeRender(R,C,q,X),v=$t.get(C,U.length),v.init(q),U.push(v),ht.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),Dt.setFromProjectionMatrix(ht,Li,q.reversedDepth),it=this.localClippingEnabled,Ft=Lt.init(this.clippingPlanes,it),M=ft.get(C,z.length),M.init(),z.push(M),wt.enabled===!0&&wt.isPresenting===!0){const xt=R.xr.getDepthSensingMesh();xt!==null&&ws(xt,q,-1/0,R.sortObjects)}ws(C,q,0,R.sortObjects),M.finish(),R.sortObjects===!0&&M.sort(St,At),de=wt.enabled===!1||wt.isPresenting===!1||wt.hasDepthSensing()===!1,de&&Jt.addToRenderList(M,C),this.info.render.frame++,Ft===!0&&Lt.beginShadows();const at=v.state.shadowsArray;Qt.render(at,C,q),Ft===!0&&Lt.endShadows(),this.info.autoReset===!0&&this.info.reset();const st=M.opaque,j=M.transmissive;if(v.setupLights(),q.isArrayCamera){const xt=q.cameras;if(j.length>0)for(let Gt=0,jt=xt.length;Gt<jt;Gt++){const kt=xt[Gt];Us(st,j,C,kt)}de&&Jt.render(C);for(let Gt=0,jt=xt.length;Gt<jt;Gt++){const kt=xt[Gt];Ds(M,C,kt,kt.viewport)}}else j.length>0&&Us(st,j,C,q),de&&Jt.render(C),Ds(M,C,q);X!==null&&I===0&&(Ot.updateMultisampleRenderTarget(X),Ot.updateRenderTargetMipmap(X)),C.isScene===!0&&C.onAfterRender(R,C,q),Ht.resetDefaultState(),D=-1,w=null,U.pop(),U.length>0?(v=U[U.length-1],Ft===!0&&Lt.setGlobalState(R.clippingPlanes,v.state.camera)):v=null,z.pop(),z.length>0?M=z[z.length-1]:M=null};function ws(C,q,at,st){if(C.visible===!1)return;if(C.layers.test(q.layers)){if(C.isGroup)at=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(q);else if(C.isLight)v.pushLight(C),C.castShadow&&v.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Dt.intersectsSprite(C)){st&&Bt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ht);const Gt=J.update(C),jt=C.material;jt.visible&&M.push(C,Gt,jt,at,Bt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Dt.intersectsObject(C))){const Gt=J.update(C),jt=C.material;if(st&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Bt.copy(C.boundingSphere.center)):(Gt.boundingSphere===null&&Gt.computeBoundingSphere(),Bt.copy(Gt.boundingSphere.center)),Bt.applyMatrix4(C.matrixWorld).applyMatrix4(ht)),Array.isArray(jt)){const kt=Gt.groups;for(let ne=0,re=kt.length;ne<re;ne++){const ie=kt[ne],ve=jt[ie.materialIndex];ve&&ve.visible&&M.push(C,Gt,ve,at,Bt.z,ie)}}else jt.visible&&M.push(C,Gt,jt,at,Bt.z,null)}}const xt=C.children;for(let Gt=0,jt=xt.length;Gt<jt;Gt++)ws(xt[Gt],q,at,st)}function Ds(C,q,at,st){const j=C.opaque,xt=C.transmissive,Gt=C.transparent;v.setupLightsView(at),Ft===!0&&Lt.setGlobalState(R.clippingPlanes,at),st&&gt.viewport(G.copy(st)),j.length>0&&qa(j,q,at),xt.length>0&&qa(xt,q,at),Gt.length>0&&qa(Gt,q,at),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function Us(C,q,at,st){if((at.isScene===!0?at.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[st.id]===void 0&&(v.state.transmissionRenderTarget[st.id]=new Ts(1,1,{generateMipmaps:!0,type:yt.has("EXT_color_buffer_half_float")||yt.has("EXT_color_buffer_float")?$o:Pi,minFilter:Ss,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace}));const xt=v.state.transmissionRenderTarget[st.id],Gt=st.viewport||G;xt.setSize(Gt.z*R.transmissionResolutionScale,Gt.w*R.transmissionResolutionScale);const jt=R.getRenderTarget(),kt=R.getActiveCubeFace(),ne=R.getActiveMipmapLevel();R.setRenderTarget(xt),R.getClearColor(lt),ct=R.getClearAlpha(),ct<1&&R.setClearColor(16777215,.5),R.clear(),de&&Jt.render(at);const re=R.toneMapping;R.toneMapping=ka;const ie=st.viewport;if(st.viewport!==void 0&&(st.viewport=void 0),v.setupLightsView(st),Ft===!0&&Lt.setGlobalState(R.clippingPlanes,st),qa(C,at,st),Ot.updateMultisampleRenderTarget(xt),Ot.updateRenderTargetMipmap(xt),yt.has("WEBGL_multisampled_render_to_texture")===!1){let ve=!1;for(let Oe=0,We=q.length;Oe<We;Oe++){const Pe=q[Oe],ye=Pe.object,Kt=Pe.geometry,Ye=Pe.material,Ce=Pe.group;if(Ye.side===oa&&ye.layers.test(st.layers)){const Mn=Ye.side;Ye.side=Xn,Ye.needsUpdate=!0,Hr(ye,at,st,Kt,Ye,Ce),Ye.side=Mn,Ye.needsUpdate=!0,ve=!0}}ve===!0&&(Ot.updateMultisampleRenderTarget(xt),Ot.updateRenderTargetMipmap(xt))}R.setRenderTarget(jt,kt,ne),R.setClearColor(lt,ct),ie!==void 0&&(st.viewport=ie),R.toneMapping=re}function qa(C,q,at){const st=q.isScene===!0?q.overrideMaterial:null;for(let j=0,xt=C.length;j<xt;j++){const Gt=C[j],jt=Gt.object,kt=Gt.geometry,ne=Gt.group;let re=Gt.material;re.allowOverride===!0&&st!==null&&(re=st),jt.layers.test(at.layers)&&Hr(jt,q,at,kt,re,ne)}}function Hr(C,q,at,st,j,xt){C.onBeforeRender(R,q,at,st,j,xt),C.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),j.onBeforeRender(R,q,at,st,C,xt),j.transparent===!0&&j.side===oa&&j.forceSinglePass===!1?(j.side=Xn,j.needsUpdate=!0,R.renderBufferDirect(at,q,st,j,C,xt),j.side=Xa,j.needsUpdate=!0,R.renderBufferDirect(at,q,st,j,C,xt),j.side=oa):R.renderBufferDirect(at,q,st,j,C,xt),C.onAfterRender(R,q,at,st,j,xt)}function qn(C,q,at){q.isScene!==!0&&(q=qt);const st=Ct.get(C),j=v.state.lights,xt=v.state.shadowsArray,Gt=j.state.version,jt=ut.getParameters(C,j.state,xt,q,at),kt=ut.getProgramCacheKey(jt);let ne=st.programs;st.environment=C.isMeshStandardMaterial?q.environment:null,st.fog=q.fog,st.envMap=(C.isMeshStandardMaterial?le:oe).get(C.envMap||st.environment),st.envMapRotation=st.environment!==null&&C.envMap===null?q.environmentRotation:C.envMapRotation,ne===void 0&&(C.addEventListener("dispose",vt),ne=new Map,st.programs=ne);let re=ne.get(kt);if(re!==void 0){if(st.currentProgram===re&&st.lightsStateVersion===Gt)return Sn(C,jt),re}else jt.uniforms=ut.getUniforms(C),C.onBeforeCompile(jt,R),re=ut.acquireProgram(jt,kt),ne.set(kt,re),st.uniforms=jt.uniforms;const ie=st.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(ie.clippingPlanes=Lt.uniform),Sn(C,jt),st.needsLights=nu(C),st.lightsStateVersion=Gt,st.needsLights&&(ie.ambientLightColor.value=j.state.ambient,ie.lightProbe.value=j.state.probe,ie.directionalLights.value=j.state.directional,ie.directionalLightShadows.value=j.state.directionalShadow,ie.spotLights.value=j.state.spot,ie.spotLightShadows.value=j.state.spotShadow,ie.rectAreaLights.value=j.state.rectArea,ie.ltc_1.value=j.state.rectAreaLTC1,ie.ltc_2.value=j.state.rectAreaLTC2,ie.pointLights.value=j.state.point,ie.pointLightShadows.value=j.state.pointShadow,ie.hemisphereLights.value=j.state.hemi,ie.directionalShadowMap.value=j.state.directionalShadowMap,ie.directionalShadowMatrix.value=j.state.directionalShadowMatrix,ie.spotShadowMap.value=j.state.spotShadowMap,ie.spotLightMatrix.value=j.state.spotLightMatrix,ie.spotLightMap.value=j.state.spotLightMap,ie.pointShadowMap.value=j.state.pointShadowMap,ie.pointShadowMatrix.value=j.state.pointShadowMatrix),st.currentProgram=re,st.uniformsList=null,re}function rn(C){if(C.uniformsList===null){const q=C.currentProgram.getUniforms();C.uniformsList=Wc.seqWithValue(q.seq,C.uniforms)}return C.uniformsList}function Sn(C,q){const at=Ct.get(C);at.outputColorSpace=q.outputColorSpace,at.batching=q.batching,at.batchingColor=q.batchingColor,at.instancing=q.instancing,at.instancingColor=q.instancingColor,at.instancingMorph=q.instancingMorph,at.skinning=q.skinning,at.morphTargets=q.morphTargets,at.morphNormals=q.morphNormals,at.morphColors=q.morphColors,at.morphTargetsCount=q.morphTargetsCount,at.numClippingPlanes=q.numClippingPlanes,at.numIntersection=q.numClipIntersection,at.vertexAlphas=q.vertexAlphas,at.vertexTangents=q.vertexTangents,at.toneMapping=q.toneMapping}function ua(C,q,at,st,j){q.isScene!==!0&&(q=qt),Ot.resetTextureUnits();const xt=q.fog,Gt=st.isMeshStandardMaterial?q.environment:null,jt=X===null?R.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Pr,kt=(st.isMeshStandardMaterial?le:oe).get(st.envMap||Gt),ne=st.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,re=!!at.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),ie=!!at.morphAttributes.position,ve=!!at.morphAttributes.normal,Oe=!!at.morphAttributes.color;let We=ka;st.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(We=R.toneMapping);const Pe=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,ye=Pe!==void 0?Pe.length:0,Kt=Ct.get(st),Ye=v.state.lights;if(Ft===!0&&(it===!0||C!==w)){const hn=C===w&&st.id===D;Lt.setState(st,C,hn)}let Ce=!1;st.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==Ye.state.version||Kt.outputColorSpace!==jt||j.isBatchedMesh&&Kt.batching===!1||!j.isBatchedMesh&&Kt.batching===!0||j.isBatchedMesh&&Kt.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Kt.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Kt.instancing===!1||!j.isInstancedMesh&&Kt.instancing===!0||j.isSkinnedMesh&&Kt.skinning===!1||!j.isSkinnedMesh&&Kt.skinning===!0||j.isInstancedMesh&&Kt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Kt.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Kt.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Kt.instancingMorph===!1&&j.morphTexture!==null||Kt.envMap!==kt||st.fog===!0&&Kt.fog!==xt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==Lt.numPlanes||Kt.numIntersection!==Lt.numIntersection)||Kt.vertexAlphas!==ne||Kt.vertexTangents!==re||Kt.morphTargets!==ie||Kt.morphNormals!==ve||Kt.morphColors!==Oe||Kt.toneMapping!==We||Kt.morphTargetsCount!==ye)&&(Ce=!0):(Ce=!0,Kt.__version=st.version);let Mn=Kt.currentProgram;Ce===!0&&(Mn=qn(st,q,j));let Ii=!1,vn=!1,Za=!1;const Ee=Mn.getUniforms(),Rn=Kt.uniforms;if(gt.useProgram(Mn.program)&&(Ii=!0,vn=!0,Za=!0),st.id!==D&&(D=st.id,vn=!0),Ii||w!==C){gt.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Ee.setValue(B,"projectionMatrix",C.projectionMatrix),Ee.setValue(B,"viewMatrix",C.matrixWorldInverse);const nn=Ee.map.cameraPosition;nn!==void 0&&nn.setValue(B,It.setFromMatrixPosition(C.matrixWorld)),mt.logarithmicDepthBuffer&&Ee.setValue(B,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&Ee.setValue(B,"isOrthographic",C.isOrthographicCamera===!0),w!==C&&(w=C,vn=!0,Za=!0)}if(j.isSkinnedMesh){Ee.setOptional(B,j,"bindMatrix"),Ee.setOptional(B,j,"bindMatrixInverse");const hn=j.skeleton;hn&&(hn.boneTexture===null&&hn.computeBoneTexture(),Ee.setValue(B,"boneTexture",hn.boneTexture,Ot))}j.isBatchedMesh&&(Ee.setOptional(B,j,"batchingTexture"),Ee.setValue(B,"batchingTexture",j._matricesTexture,Ot),Ee.setOptional(B,j,"batchingIdTexture"),Ee.setValue(B,"batchingIdTexture",j._indirectTexture,Ot),Ee.setOptional(B,j,"batchingColorTexture"),j._colorsTexture!==null&&Ee.setValue(B,"batchingColorTexture",j._colorsTexture,Ot));const Ln=at.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&Rt.update(j,at,Mn),(vn||Kt.receiveShadow!==j.receiveShadow)&&(Kt.receiveShadow=j.receiveShadow,Ee.setValue(B,"receiveShadow",j.receiveShadow)),st.isMeshGouraudMaterial&&st.envMap!==null&&(Rn.envMap.value=kt,Rn.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),st.isMeshStandardMaterial&&st.envMap===null&&q.environment!==null&&(Rn.envMapIntensity.value=q.environmentIntensity),vn&&(Ee.setValue(B,"toneMappingExposure",R.toneMappingExposure),Kt.needsLights&&Gr(Rn,Za),xt&&st.fog===!0&&Tt.refreshFogUniforms(Rn,xt),Tt.refreshMaterialUniforms(Rn,st,Y,K,v.state.transmissionRenderTarget[C.id]),Wc.upload(B,rn(Kt),Rn,Ot)),st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(Wc.upload(B,rn(Kt),Rn,Ot),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&Ee.setValue(B,"center",j.center),Ee.setValue(B,"modelViewMatrix",j.modelViewMatrix),Ee.setValue(B,"normalMatrix",j.normalMatrix),Ee.setValue(B,"modelMatrix",j.matrixWorld),st.isShaderMaterial||st.isRawShaderMaterial){const hn=st.uniformsGroups;for(let nn=0,Ls=hn.length;nn<Ls;nn++){const bi=hn[nn];fe.update(bi,Mn),fe.bind(bi,Mn)}}return Mn}function Gr(C,q){C.ambientLightColor.needsUpdate=q,C.lightProbe.needsUpdate=q,C.directionalLights.needsUpdate=q,C.directionalLightShadows.needsUpdate=q,C.pointLights.needsUpdate=q,C.pointLightShadows.needsUpdate=q,C.spotLights.needsUpdate=q,C.spotLightShadows.needsUpdate=q,C.rectAreaLights.needsUpdate=q,C.hemisphereLights.needsUpdate=q}function nu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(C,q,at){const st=Ct.get(C);st.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,st.__autoAllocateDepthBuffer===!1&&(st.__useRenderToTexture=!1),Ct.get(C.texture).__webglTexture=q,Ct.get(C.depthTexture).__webglTexture=st.__autoAllocateDepthBuffer?void 0:at,st.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,q){const at=Ct.get(C);at.__webglFramebuffer=q,at.__useDefaultFramebuffer=q===void 0};const iu=B.createFramebuffer();this.setRenderTarget=function(C,q=0,at=0){X=C,P=q,I=at;let st=!0,j=null,xt=!1,Gt=!1;if(C){const kt=Ct.get(C);if(kt.__useDefaultFramebuffer!==void 0)gt.bindFramebuffer(B.FRAMEBUFFER,null),st=!1;else if(kt.__webglFramebuffer===void 0)Ot.setupRenderTarget(C);else if(kt.__hasExternalTextures)Ot.rebindTextures(C,Ct.get(C.texture).__webglTexture,Ct.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ie=C.depthTexture;if(kt.__boundDepthTexture!==ie){if(ie!==null&&Ct.has(ie)&&(C.width!==ie.image.width||C.height!==ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ot.setupDepthRenderbuffer(C)}}const ne=C.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Gt=!0);const re=Ct.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(re[q])?j=re[q][at]:j=re[q],xt=!0):C.samples>0&&Ot.useMultisampledRTT(C)===!1?j=Ct.get(C).__webglMultisampledFramebuffer:Array.isArray(re)?j=re[at]:j=re,G.copy(C.viewport),Q.copy(C.scissor),rt=C.scissorTest}else G.copy(N).multiplyScalar(Y).floor(),Q.copy(et).multiplyScalar(Y).floor(),rt=Mt;if(at!==0&&(j=iu),gt.bindFramebuffer(B.FRAMEBUFFER,j)&&st&&gt.drawBuffers(C,j),gt.viewport(G),gt.scissor(Q),gt.setScissorTest(rt),xt){const kt=Ct.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+q,kt.__webglTexture,at)}else if(Gt){const kt=q;for(let ne=0;ne<C.textures.length;ne++){const re=Ct.get(C.textures[ne]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+ne,re.__webglTexture,at,kt)}}else if(C!==null&&at!==0){const kt=Ct.get(C.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,kt.__webglTexture,at)}D=-1},this.readRenderTargetPixels=function(C,q,at,st,j,xt,Gt,jt=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=Ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Gt!==void 0&&(kt=kt[Gt]),kt){gt.bindFramebuffer(B.FRAMEBUFFER,kt);try{const ne=C.textures[jt],re=ne.format,ie=ne.type;if(!mt.textureFormatReadable(re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!mt.textureTypeReadable(ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=C.width-st&&at>=0&&at<=C.height-j&&(C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+jt),B.readPixels(q,at,st,j,Xt.convert(re),Xt.convert(ie),xt))}finally{const ne=X!==null?Ct.get(X).__webglFramebuffer:null;gt.bindFramebuffer(B.FRAMEBUFFER,ne)}}},this.readRenderTargetPixelsAsync=async function(C,q,at,st,j,xt,Gt,jt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=Ct.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Gt!==void 0&&(kt=kt[Gt]),kt)if(q>=0&&q<=C.width-st&&at>=0&&at<=C.height-j){gt.bindFramebuffer(B.FRAMEBUFFER,kt);const ne=C.textures[jt],re=ne.format,ie=ne.type;if(!mt.textureFormatReadable(re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!mt.textureTypeReadable(ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ve=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ve),B.bufferData(B.PIXEL_PACK_BUFFER,xt.byteLength,B.STREAM_READ),C.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+jt),B.readPixels(q,at,st,j,Xt.convert(re),Xt.convert(ie),0);const Oe=X!==null?Ct.get(X).__webglFramebuffer:null;gt.bindFramebuffer(B.FRAMEBUFFER,Oe);const We=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await SM(B,We,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ve),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,xt),B.deleteBuffer(ve),B.deleteSync(We),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,q=null,at=0){const st=Math.pow(2,-at),j=Math.floor(C.image.width*st),xt=Math.floor(C.image.height*st),Gt=q!==null?q.x:0,jt=q!==null?q.y:0;Ot.setTexture2D(C,0),B.copyTexSubImage2D(B.TEXTURE_2D,at,0,0,Gt,jt,j,xt),gt.unbindTexture()};const nl=B.createFramebuffer(),Ya=B.createFramebuffer();this.copyTextureToTexture=function(C,q,at=null,st=null,j=0,xt=null){xt===null&&(j!==0?(jo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xt=j,j=0):xt=0);let Gt,jt,kt,ne,re,ie,ve,Oe,We;const Pe=C.isCompressedTexture?C.mipmaps[xt]:C.image;if(at!==null)Gt=at.max.x-at.min.x,jt=at.max.y-at.min.y,kt=at.isBox3?at.max.z-at.min.z:1,ne=at.min.x,re=at.min.y,ie=at.isBox3?at.min.z:0;else{const Ln=Math.pow(2,-j);Gt=Math.floor(Pe.width*Ln),jt=Math.floor(Pe.height*Ln),C.isDataArrayTexture?kt=Pe.depth:C.isData3DTexture?kt=Math.floor(Pe.depth*Ln):kt=1,ne=0,re=0,ie=0}st!==null?(ve=st.x,Oe=st.y,We=st.z):(ve=0,Oe=0,We=0);const ye=Xt.convert(q.format),Kt=Xt.convert(q.type);let Ye;q.isData3DTexture?(Ot.setTexture3D(q,0),Ye=B.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(Ot.setTexture2DArray(q,0),Ye=B.TEXTURE_2D_ARRAY):(Ot.setTexture2D(q,0),Ye=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,q.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,q.unpackAlignment);const Ce=B.getParameter(B.UNPACK_ROW_LENGTH),Mn=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Ii=B.getParameter(B.UNPACK_SKIP_PIXELS),vn=B.getParameter(B.UNPACK_SKIP_ROWS),Za=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Pe.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Pe.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,ne),B.pixelStorei(B.UNPACK_SKIP_ROWS,re),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ie);const Ee=C.isDataArrayTexture||C.isData3DTexture,Rn=q.isDataArrayTexture||q.isData3DTexture;if(C.isDepthTexture){const Ln=Ct.get(C),hn=Ct.get(q),nn=Ct.get(Ln.__renderTarget),Ls=Ct.get(hn.__renderTarget);gt.bindFramebuffer(B.READ_FRAMEBUFFER,nn.__webglFramebuffer),gt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ls.__webglFramebuffer);for(let bi=0;bi<kt;bi++)Ee&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ct.get(C).__webglTexture,j,ie+bi),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ct.get(q).__webglTexture,xt,We+bi)),B.blitFramebuffer(ne,re,Gt,jt,ve,Oe,Gt,jt,B.DEPTH_BUFFER_BIT,B.NEAREST);gt.bindFramebuffer(B.READ_FRAMEBUFFER,null),gt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(j!==0||C.isRenderTargetTexture||Ct.has(C)){const Ln=Ct.get(C),hn=Ct.get(q);gt.bindFramebuffer(B.READ_FRAMEBUFFER,nl),gt.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ya);for(let nn=0;nn<kt;nn++)Ee?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ln.__webglTexture,j,ie+nn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ln.__webglTexture,j),Rn?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,hn.__webglTexture,xt,We+nn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,hn.__webglTexture,xt),j!==0?B.blitFramebuffer(ne,re,Gt,jt,ve,Oe,Gt,jt,B.COLOR_BUFFER_BIT,B.NEAREST):Rn?B.copyTexSubImage3D(Ye,xt,ve,Oe,We+nn,ne,re,Gt,jt):B.copyTexSubImage2D(Ye,xt,ve,Oe,ne,re,Gt,jt);gt.bindFramebuffer(B.READ_FRAMEBUFFER,null),gt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Rn?C.isDataTexture||C.isData3DTexture?B.texSubImage3D(Ye,xt,ve,Oe,We,Gt,jt,kt,ye,Kt,Pe.data):q.isCompressedArrayTexture?B.compressedTexSubImage3D(Ye,xt,ve,Oe,We,Gt,jt,kt,ye,Pe.data):B.texSubImage3D(Ye,xt,ve,Oe,We,Gt,jt,kt,ye,Kt,Pe):C.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,xt,ve,Oe,Gt,jt,ye,Kt,Pe.data):C.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,xt,ve,Oe,Pe.width,Pe.height,ye,Pe.data):B.texSubImage2D(B.TEXTURE_2D,xt,ve,Oe,Gt,jt,ye,Kt,Pe);B.pixelStorei(B.UNPACK_ROW_LENGTH,Ce),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Mn),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ii),B.pixelStorei(B.UNPACK_SKIP_ROWS,vn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Za),xt===0&&q.generateMipmaps&&B.generateMipmap(Ye),gt.unbindTexture()},this.initRenderTarget=function(C){Ct.get(C).__webglFramebuffer===void 0&&Ot.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Ot.setTextureCube(C,0):C.isData3DTexture?Ot.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Ot.setTexture2DArray(C,0):Ot.setTexture2D(C,0),gt.unbindTexture()},this.resetState=function(){P=0,I=0,X=null,gt.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ue._getUnpackColorSpace()}}const l0={type:"change"},cp={type:"start"},ey={type:"end"},Hc=new tp,c0=new Ha,_R=Math.cos(70*yM.DEG2RAD),pn=new V,kn=2*Math.PI,ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Qh=1e-6;class GR extends OE{constructor(t,n=null){super(t,n),this.state=ke.NONE,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:wr.ROTATE,MIDDLE:wr.DOLLY,RIGHT:wr.PAN},this.touches={ONE:Ar.ROTATE,TWO:Ar.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new Es,this._lastTargetPosition=new V,this._quat=new Es().setFromUnitVectors(t.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Pv,this._sphericalDelta=new Pv,this._scale=1,this._panOffset=new V,this._rotateStart=new Ut,this._rotateEnd=new Ut,this._rotateDelta=new Ut,this._panStart=new Ut,this._panEnd=new Ut,this._panDelta=new Ut,this._dollyStart=new Ut,this._dollyEnd=new Ut,this._dollyDelta=new Ut,this._dollyDirection=new V,this._mouse=new Ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yR.bind(this),this._onPointerDown=vR.bind(this),this._onPointerUp=xR.bind(this),this._onContextMenu=RR.bind(this),this._onMouseWheel=ER.bind(this),this._onKeyDown=TR.bind(this),this._onTouchStart=bR.bind(this),this._onTouchMove=AR.bind(this),this._onMouseDown=SR.bind(this),this._onMouseMove=MR.bind(this),this._interceptControlDown=CR.bind(this),this._interceptControlUp=wR.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(l0),this.update(),this.state=ke.NONE}update(t=null){const n=this.object.position;pn.copy(n).sub(this.target),pn.applyQuaternion(this._quat),this._spherical.setFromVector3(pn),this.autoRotate&&this.state===ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=kn:s>Math.PI&&(s-=kn),l<-Math.PI?l+=kn:l>Math.PI&&(l-=kn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(pn.setFromSpherical(this._spherical),pn.applyQuaternion(this._quatInverse),n.copy(this.target).add(pn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const d=pn.length();f=this._clampDistance(d*this._scale);const m=d-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const d=new V(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new V(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),f=pn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Hc.origin.copy(this.object.position),Hc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hc.direction))<_R?this.object.lookAt(this.target):(c0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hc.intersectPlane(c0,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Qh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Qh||this._lastTargetPosition.distanceToSquared(this.target)>Qh?(this.dispatchEvent(l0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?kn/60*this.autoRotateSpeed*t:kn/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){pn.setFromMatrixColumn(n,0),pn.multiplyScalar(-t),this._panOffset.add(pn)}_panUp(t,n){this.screenSpacePanning===!0?pn.setFromMatrixColumn(n,1):(pn.setFromMatrixColumn(n,0),pn.crossVectors(this.object.up,pn)),pn.multiplyScalar(t),this._panOffset.add(pn)}_pan(t,n){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;pn.copy(l).sub(this.target);let c=pn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*n*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=n-s.top,f=s.width,d=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(kn*this._rotateDelta.x/n.clientHeight),this._rotateUp(kn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(kn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-kn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(kn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-kn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),s=t.pageX-n.x,l=t.pageY-n.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(kn*this._rotateDelta.x/n.clientHeight),this._rotateUp(kn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),s=t.pageX-n.x,l=t.pageY-n.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(t.pageX+n.x)*.5,d=(t.pageY+n.y)*.5;this._updateZoomParameters(f,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new Ut,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function vR(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function yR(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function xR(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ey),this.state=ke.NONE;break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function SR(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case wr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=ke.DOLLY;break;case wr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ke.ROTATE}break;case wr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ke.PAN}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(cp)}function MR(r){switch(this.state){case ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function ER(r){this.enabled===!1||this.enableZoom===!1||this.state!==ke.NONE||(r.preventDefault(),this.dispatchEvent(cp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(ey))}function TR(r){this.enabled!==!1&&this._handleKeyDown(r)}function bR(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Ar.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=ke.TOUCH_ROTATE;break;case Ar.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=ke.TOUCH_PAN;break;default:this.state=ke.NONE}break;case 2:switch(this.touches.TWO){case Ar.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=ke.TOUCH_DOLLY_PAN;break;case Ar.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=ke.TOUCH_DOLLY_ROTATE;break;default:this.state=ke.NONE}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(cp)}function AR(r){switch(this._trackPointer(r),this.state){case ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=ke.NONE}}function RR(r){this.enabled!==!1&&r.preventDefault()}function CR(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wR(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}export{VS as A,el as B,ip as C,BR as D,k0 as E,D0 as F,wc as G,zR as H,OR as M,GR as O,di as P,X0 as R,NR as S,q0 as T,V,HR as W,hi as a,IR as b,PR as c,oa as d,Ni as e,W0 as f,ap as g,FR as h,Y0 as i,DR as j,lE as k,Cv as l,zi as m,LR as n,Me as o,vS as p,QM as q,UR as r,yM as s};
