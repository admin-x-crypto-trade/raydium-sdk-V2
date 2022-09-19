var C=Object.defineProperty,E=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var h=(t,e,o)=>e in t?C(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,a=(t,e)=>{for(var o in e||(e={}))P.call(e,o)&&h(t,o,e[o]);if(p)for(var o of p(e))B.call(e,o)&&h(t,o,e[o]);return t},L=(t,e)=>E(t,k(e));import{PublicKey as D}from"@solana/web3.js";function v(t,e=1,o=[]){let r=[...t];if(e<=0)return o;for(;r.length;)o.push(r.splice(0,e));return o}import{get as R,set as _}from"lodash";import y from"dayjs";import W from"dayjs/plugin/utc";y.extend(W);var f=class{constructor(e){this.logLevel=e.logLevel!==void 0?e.logLevel:3,this.name=e.name}set level(e){this.logLevel=e}get time(){return y().utc().format("YYYY/MM/DD HH:mm:ss UTC")}get moduleName(){return this.name}isLogLevel(e){return e<=this.logLevel}error(...e){return this.isLogLevel(0)?(console.error(this.time,this.name,"sdk logger error",...e),this):this}logWithError(...e){let o=e.map(r=>typeof r=="object"?JSON.stringify(r):r).join(", ");throw new Error(o)}warning(...e){return this.isLogLevel(1)?(console.warn(this.time,this.name,"sdk logger warning",...e),this):this}info(...e){return this.isLogLevel(2)?(console.info(this.time,this.name,"sdk logger info",...e),this):this}debug(...e){return this.isLogLevel(3)?(console.debug(this.time,this.name,"sdk logger debug",...e),this):this}},A={},q={};function T(t){let e=R(A,t);if(!e){let o=R(q,t);e=new f({name:t,logLevel:o}),_(A,t,e)}return e}var m=T("Raydium_accountInfo_util");async function j(t,e,o){let{batchRequest:r,commitment:n}=a({batchRequest:!1},o),s=v(e,100),g=new Array(s.length).fill([]);if(r){let i=s.map(l=>{let c=t._buildArgs([l.map(u=>u.toBase58())],n,"base64");return{methodName:"getMultipleAccounts",args:c}});g=(await t._rpcBatchRequest(i)).map(l=>(l.error&&m.logWithError(`failed to get info for multiple accounts, RPC_ERROR, ${l.error.message}`),l.result.value.map(c=>{if(c){let{data:u,executable:x,lamports:w,owner:I,rentEpoch:M}=c;return u.length!==2&&u[1]!=="base64"&&m.logWithError("info must be base64 encoded, RPC_ERROR"),{data:Buffer.from(u[0],"base64"),executable:x,lamports:w,owner:new D(I),rentEpoch:M}}return null})))}else try{g=await Promise.all(s.map(i=>t.getMultipleAccountsInfo(i,n)))}catch(i){i instanceof Error&&m.logWithError(`failed to get info for multiple accounts, RPC_ERROR, ${i.message}`)}return g.flat()}async function X(t,e,o){let r=await j(t,e.map(n=>n.pubkey),o);return e.map((n,s)=>L(a({},n),{accountInfo:r[s]}))}export{j as getMultipleAccountsInfo,X as getMultipleAccountsInfoWithCustomFlags};
//# sourceMappingURL=accountInfo.mjs.map