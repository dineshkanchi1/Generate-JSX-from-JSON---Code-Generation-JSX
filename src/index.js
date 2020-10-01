import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// function toTitleCase(str){
//     return str.replace(
//         /\w\S+/g,
//         function(txt){
//             return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();
//         }
//     ).replace(" ","");
// }
// function toCamelCase(str){
//     str=str.replace("-"," ")
//     return str.replace(/\s(.)/g, function($1){return $1.toUpperCase();}).replace(/\s/g,'').replace(/^(.)/,function($1){return $1.toLowerCase();});
// }
function recur(obj){
    let tag = "<"
    tag += obj.name+" "
    if(obj.style!==undefined && Object.keys(obj.style).length>0){
        let styleKeys = Object.keys(obj.style)
        tag += "style={{"
        for(let i=0;i<styleKeys.length;i++){
            tag+=styleKeys[i]+':"'+obj.style[styleKeys[i]]+'",'
        }
        tag=tag+"}}"
    }
    if(obj.children !== undefined && obj.children.length>0){
        tag+=">\n";
        for(let i=0;i<obj.children.length;i++){
            tag+=recur(obj.children[i])
        }
        tag+="</"+obj.name+">"
    }else{
        tag+="/>"
    }
    return tag
}
function generateCodeFromObject(obj){
    return recur(obj)
}
   
module.exports=generateCodeFromObject;


// ReactDOM.render(<App />, document.getElementById("root"));