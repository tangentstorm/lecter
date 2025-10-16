const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const cp = require('node:child_process')

// mainWorld is the "page"
const emw = (apiKey, api)=>contextBridge.exposeInMainWorld(apiKey, api)
emw('ipcDir', path=>fs.readdirSync(path));
emw('ipcRdTxt', path=>fs.readFileSync(path,{encoding:'utf8'}).replace(/\uFEFF/g, ''))
emw('ipcWrTxt', (path,text)=>fs.writeFileSync(path,text,{encoding:'utf-8'}));
emw('ipcShell', cmd=>{
  let o='',e=0;
  console.log('running cmd:', cmd)
  try{o=cp.execSync(cmd)}catch(err){o=err.stdout.toString(),e=err.status}
  console.log('result:', {e,o})
  // TODO: the decoding should be on the other side, because we might actually want binary output (ex: cat x.gif)
  const utf8=new TextDecoder('utf-8');
  o=utf8.decode(o)
  return {e,o}})

