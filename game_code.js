
//var arrayCode = [71, 69, 79]; //geo
var already_have = true,
numb_of_geog = 1,
score = 0,
life=3,
//arrayCode = [71, 69, 79, 82, 71, 69, 32, 66, 65, 78, 65, 78, 65], // george banana
comboTest = 0,
tranisiton_george=5,
count_george=3;

var start_screen='<div id="start_screen" style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; display: flex; align-items: center; place-content: center; flex-wrap: wrap; font: 28px &quot;Open Sans&quot;, sans-serif; z-index: 9999; transition: all 0.2s ease 0s; z-index:99999;"><div id="life_input" style="position: relative;z-index: 2;width: 100%;display: block;text-align: center;"><label for="life_inp">Количество жизней:</label><input type="number" id="life_inp" style="width: 120px;border-radius: 5px;border-color: #000;border: 1px solid;text-align: center;margin-left: 25px;" value="3"></div><div id="start_game" style="position: relative;z-index: 2;cursor: pointer;background: saddlebrown;border-radius: 5px;padding: 10px;width: 210px;text-align: center;color: #fff;font-weight: bold;margin-top: 20px;">Начать</div><span class="back_start" style="width: 100%; height: 100%; position: absolute; display: block; border: 743px solid rgb(255, 225, 53); top: 0px; transition: all 0.2s ease 0s; left: 0px;"></span></div>';
var dead_screen='<span id="gameend" style="z-index:1;position: absolute;top: 50%;left: 50%;width: 0;height: 0;background: url(&quot;https://static9.depositphotos.com/1605259/1091/i/600/depositphotos_10917011-stock-photo-depression-teen-depression-tunnel-young.jpg&quot;) center center / cover; opacity:0;transition: all 0.4s ease 0s;transform: translate(-50%, -50%);color: red;display: flex;align-items: center;justify-content: center;font-size: 45px;font-family: cursive;align-content: center;text-transform: uppercase;">You died</span>';
var score_text='<span class="score_num" style="display: block; text-align: center; font-size: 25px; margin-top: 10px;">Счет: ' + score + '</span>';
var banana='<span style=" position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90px; height: 90px; background: url(https://cdn.dribbble.com/users/3454861/screenshots/6338351/castillo_villena_enrique-rdavila.gif); background-size: contain; background-repeat: no-repeat; background-position: center; "></span>';
var hp_bar='<span id="healt_bar" style=" width: 90px; height: 10px;  display: block; position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); border-radius: 10px; overflow: hidden; "><span style=" width: 100%; height: 100%; display: block; background: #f00; transition: .4s; "></span><span style=" width: 100%; height: 100%; display: block; background: linear-gradient(180deg, #ffffffad 28%, #00000047); transition: .4s; position: absolute;top: 0;left: 0;"></span></span>';
var george_n='<span style="cursor:pointer;position: absolute;width: 80px;height: 80px;background: url(https://media.giphy.com/media/XgLmG1gaSbX6ksWfGi/giphy.gif);transform: scale(-1);background-size: contain;background-position: center;background-repeat: no-repeat;bottom: -24px;right: -40px;"></span>';
var gan='<div id="gan_geo" style="position: absolute;top: calc(50% - 26px);left: calc(50% - 154px);width: 150px;height: 70px;transform-origin: right;transform: rotate(0deg) scaleX(-1);transition: .2s;"><span style="background: url(Gun-In-Hand-PNG-Clipart.png); background-size: contain;width: 100%;height: 100%;display: block;background-repeat: no-repeat;"><span style="position: absolute; left: -130px; top: -92%; width: 190px; height: 130px; background: url(not_a_flame.png) 0% 0% / contain;transform: rotate(180deg); display:none;"></span></span></div>'

var inside_game_field=start_screen+dead_screen+score_text+banana+hp_bar+gan;
var game_field='<div id="back_game" style="overflow:hidden; background: #fff; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 700px; height: 700px; border-radius: 5px; border: 7px solid #ffe135; box-sizing: border-box; ">'+inside_game_field+'</div>';

            $("body").append('<div id="minigame" style="user-select: none;position:fixed;top:0;left:0;width:100%;height:100%;z-index: 999999;background: #00000054;">'+game_field+'</div>');
            $("div#start_game").on("click", function () {
              if($("div#start_screen input").val()>0){
                life=$("div#start_screen input").val();
                $(".back_start").css("border-width", "0");  $("div#start_screen").css({"opacity": "0", "pointer-events": "none"});
                spawn_george();
                pos_check();
              }
            });
function spawn_george() {
    var random_angel = -90 - (getRandomInt(0, 359)); // Случайный угол
    var angel_fixed_pos = -(random_angel + 90); // Угол отображения
    var get_round_part = Math.floor(angel_fixed_pos / 45); // Получение в какой части находится линия
    var get_real_angel = (((angel_fixed_pos / 90) - Math.floor(angel_fixed_pos / 90)) * 90); 
    var width_katet = 350 - 7; // Длина катета
    var width_line;
    get_round_part % 2 == 0 ? get_real_angel=get_real_angel : get_real_angel = 90 - get_real_angel; 
    width_line = Math.cos(get_real_angel * Math.PI / 180); // Вычисление длины линии

    var id_george = 'id="line_george_'+numb_of_geog+'"';
    var transform_george='transform: rotate('+random_angel+'deg);';
    var width_george ='width:'+ Math.abs((width_katet) / width_line)+'px;';
    var transition_time_george='transition:'+ tranisiton_george +'s;';


    $("#minigame div#back_game").append(
      '<span '+id_george+' style="z-index: 10;position: absolute;top: 342px;left: 343px;height: 2px;background: transparent;transform-origin: left;'+transform_george+width_george+transition_time_george+'">'+george_n+'</span>');


    $("#line_george_" + numb_of_geog).delay(200).width(0);
    click_george();
    $("#line_george_" + numb_of_geog).resize(function() {
        if ($(this).width() == 0) $(this).remove();
    });
    numb_of_geog++;
}
var invert_theme=false;
function hud_paint() {
  $(".score_num").text("Счет: " + score);
  if((score%50==0)&&score>0){ invert_theme=!invert_theme; tranisiton_george=tranisiton_george-0.1; if(count_george<5){count_george=count_george++; spawn_george();}}
  if(invert_theme) $("div#back_game").css("filter","invert(1)");
  else $("div#back_game").css("filter","invert(0)");
}
function minus_life(){
  $("span#healt_bar span").width($("span#healt_bar span").width()-($("span#healt_bar span").width()/(life+1)));
}
function bang_george()
{
  var position_bang_top=(event.pageY-$("#back_game").offset().top)-25;
  var position_bang_left=(event.pageX-$("#back_game").offset().left)-25;
  $("#minigame div#back_game").append("<span id='bang_george_" + numb_of_geog + "' style='position:absolute; top:"+position_bang_top+"px;left:"+position_bang_left+"px; width:50px; height:50px; background:url(https://i.gifer.com/origin/74/742cb2b3fd202479b92151a40a02baa8_w200.gif); background-size:contain;'>");
  $("#bang_george_" + numb_of_geog).delay(500).fadeOut(200).delay(700).queue(function() {$(this).remove();});
}
function change_gan_pos(george){
  $("#gan_geo").css("transform", "rotate("+getRotationDegrees(george.parent())+"deg) scaleX(-1)");
  if(getRotationDegrees(george.parent())<-90||getRotationDegrees(george.parent())>90) $("#gan_geo>span").css("transform","scaleY(-1)");
  else $("#gan_geo>span").css("transform","scaleY(1)");
  $("#gan_geo>span span").fadeIn(150).fadeOut(200);
}
function click_george() {
  $("span#line_george_" + numb_of_geog + " span").on("click", function() {
        change_gan_pos($(this));
        bang_george();
        score++;
        $(this).parent().remove();
        spawn_george();
        if ($("span[id*='line_george']").length < count_george) spawn_george();
        hud_paint();
    });
}
function pos_check() {
  setInterval(function(){ 
  if($("span[id*='line_george_']").length>0 && life>0)
    $("span[id*='line_george_']").each(function () {
      if($(this).width()<20){$(this).remove(); life--; spawn_george();  hud_paint(); minus_life();}
    });
  if(life==0) $("#gameend").css({"width":"100%","height":"100%", "opacity":"1", "z-index":"999"});
}, 10);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRotationDegrees(obj) {
    var matrix = obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    //return (angle < 0) ? angle + 360 : angle;
    return angle;
}

