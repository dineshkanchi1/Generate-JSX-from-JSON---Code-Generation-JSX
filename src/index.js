import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
function toTitleCase(str){
    return str.replace(
        /\w\S+/g,
        function(txt){
            return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();
        }
    ).replace(" ","");
}
function toCamelCase(str){
    str=str.replace("-"," ")
    return str.replace(/\s(.)/g, function($1){return $1.toUpperCase();}).replace(/\s/g,'').replace(/^(.)/,function($1){return $1.toLowerCase();});
}
function recur(obj){
    let retStr = "<"
    retStr += toTitleCase(obj.name)+" "
    if(obj.style!==undefined && Object.keys(obj.style).length>0){
        let stypeKeys = Object.keys(obj.style)
        retStr += "style={{"
        for(let i=0;i<stypeKeys.length;i++){
            retStr+=toCamelCase(stypeKeys[i])+':"'+obj.style[stypeKeys[i]]+'",'
        }
        retStr=retStr.substr(0,retStr.length-1)+"}}"
    }
    if(obj.children !== undefined && obj.children.length>0){
        retStr+=">\n";
        for(let i=0;i<obj.children.length;i++){
            retStr+=recur(obj.children[i])
        }
        retStr+="</"+toTitleCase(obj.name)+">"
    }else{
        retStr+="/>"
    }
    return retStr
}
function generateCodeFromObject(obj){
        return recur(obj)
   }
   
module.exports=generateCodeFromObject;


// ReactDOM.render(<App />, document.getElementById("root"));