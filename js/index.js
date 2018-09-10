var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"


var morseList = morseCode.split("|");
for(var i=0; i<morseList.length; i++){
   morseList[i] = morseList[i].split(";")
   $("ul.translist").append("<li>"+morseList[i][0]+" "+morseList[i][1]+"</li>")
}



// 翻譯文章
function findCode(letter){
   for(var i=0 ; i < morseList.length ; i++){
      if(morseList[i][0] == letter){
         return morseList[i][1]
      }
   }
   return letter
}


// 翻譯密碼
function findLetter(code){
   for(var i=0 ; i < morseList.length ; i++){
      if(morseList[i][1] == code){
         return morseList[i][0]
      }
   }
   return code
}


//翻譯整段文字
function translateToMorse(text){
   text = text.toUpperCase();
   var result = ""
   for(var i=0;i<text.length;i++){
      result += findCode(text[i])+" "
   } 
   return result
}


function translateToEng(text){
   text = text.split(" ");
   var result = ""
   for(var i=0;i<text.length;i++){
      result += findLetter(text[i])
   } 
   return result
}


$("#btnMorse").click(function(){
   var input = $("#input").val();
   var result = translateToMorse(input)
   $("#output").val(result)
   $("#output").css({
      backgroundColor: "#292B73"
   }).animate({
      backgroundColor: "transparent"
   },500)
   
   $(".symbol").velocity({
    rotateZ: ["0deg","360deg"]
  })
})

$("#btnEng").click(function(){
   var input = $("#output").val();
   var result = translateToEng(input)
   $("#input").val(result)
   $("#input").css({
      backgroundColor: "#292B73"
   }).animate({
      backgroundColor: "transparent"
   },500)
   
   $(".symbol").velocity({
    rotateZ: ["0deg","360deg"]
   })
})


// 讓使用者輸入符合規則
$("#input").keyup(function(){
   var original = $("#input").val();
   var newtext = original.toUpperCase().split(" ").join("")
   $("#input").val(newtext)
})


//播放聲音
function play(texts,nowindex){
   var word = texts[nowindex]
   var lasttime = 300
   if(word == "."){
      $("audio.short")[0].play()
      lasttime = 300
   }else if(word == "-"){
      $("audio.long")[0].play()
      lasttime = 500
   }else{
      lasttime = 1000
   }
   
   $(".playlist span").removeClass("playing")
   $(".playlist span").eq(nowindex).addClass("playing")
   
   if(texts.length > nowindex){
      setTimeout(function(){
         play(texts,nowindex+1)
      },lasttime)
   }else{
      $(".playlist").html("")
   }
}

$("audio.short")[0].volumn=0.3
$("audio.long")[0].volumn=0.3


$("#btnPlay").click(function(){
   var texts = $("#output").val()
   $(".playlist").html("")
   for(var i=0;i<texts.length;i++){
      $(".playlist").append("<span>"+texts[i]+"</span>")
   }
   play(texts,0)
})
// play(".-..",1)


// var otext = 'hellow/world'
// var ttext = translateToMorse(otext)
// var btext = translateToEng(ttext)