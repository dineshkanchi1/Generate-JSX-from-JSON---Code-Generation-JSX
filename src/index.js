import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
function toTitleCase(str){

    let s=str.split(" ");
    let res="";
    for(let i in s){
        res+=i[0].toUpperCase()+i.substr(1).toLowerCase();
    }
    return res;

}
function toCamelCase(str){
    return str.replace("-"," ").replace(/\s(.)/g, function($1){return $1.toUpperCase();}).replace(/\s/g,'').replace(/^(.)/,function($1){return $1.toLowerCase();});
}
function generateComponent(obj){
    let tag = "<"
    tag += toTitleCase(obj.name)+" "
    if(obj.style!==undefined && Object.keys(obj.style).length>0){
        let styles = Object.keys(obj.style)
        tag += "style={{"
        for(let i=0;i<styles.length;i++){
            tag+=toCamelCase(styles[i])+':"'+obj.style[styles[i]]+'",'
        }
        tag=tag.substr(0,tag.length-1)+"}}"
    }
    if(obj.children !== undefined && obj.children.length>0){
        tag+=">";
        for(let i=0;i<obj.children.length;i++){
            tag+=generateComponent(obj.children[i])
        }
        tag+="</"+toTitleCase(obj.name)+">"
    }else{
        tag+="/>"
    }
    return tag
}
function generateCodeFromObject(obj){
        return generateComponent(obj)
   }
   
module.exports=generateCodeFromObject;


// ReactDOM.render(<App />, document.getElementById("root"));