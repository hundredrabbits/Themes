fs = require('fs');
var normalizedPath = require("path").join(__dirname, "themes");

var html = "# Themes\nThis collection of themes are meant to be used with [Marabu](https://github.com/hundredrabbits/Marabu), [Ronin](https://github.com/hundredrabbits/Ronin), [Left](https://github.com/hundredrabbits/Left), [Donsol](https://github.com/hundredrabbits/Donsol) and [Dotgrid](https://github.com/hundredrabbits/Dotgrid).\n\n<img src='https://raw.githubusercontent.com/hundredrabbits/Themes/master/PREVIEW.jpg' width='600'/>\n\n## Install\nTo install a theme, simply drag the `thm` file onto the application window.\nYou are welcome to submit your own themes to this collection!\n\n"

function build_svg(n,theme)
{
  var name = n.split(".")[0];
  var size = 16

  var html = `
  <svg class="vector" width="${(size * 5)}px" height="${size * 3}px" xmlns="http://www.w3.org/2000/svg" baseProfile="full" version="1.1">
    <rect width='${(size * 5)}' height='${(size * 3)}' fill='${theme.background}' rx='5' ry='5'></rect>
    <circle cx='${size * 1}' cy='${size * 1}' r='${size/2}' fill='${theme.f_high}'></circle>
    <circle cx='${size * 2}' cy='${size * 1}' r='${size/2}' fill='${theme.f_med}'></circle>
    <circle cx='${size * 3}' cy='${size * 1}' r='${size/2}' fill='${theme.f_low}'></circle>
    <circle cx='${size * 4}' cy='${size * 1}' r='${size/2}' fill='${theme.f_inv}'></circle>
    <circle cx='${size * 1}' cy='${size * 2}' r='${size/2}' fill='${theme.b_high}'></circle>
    <circle cx='${size * 2}' cy='${size * 2}' r='${size/2}' fill='${theme.b_med}'></circle>
    <circle cx='${size * 3}' cy='${size * 2}' r='${size/2}' fill='${theme.b_low}'></circle>
    <circle cx='${size * 4}' cy='${size * 2}' r='${size/2}' fill='${theme.b_inv}'></circle>
  </svg>`

  fs.writeFile("assets/"+name+".svg", html, function(err) {
    if(err) {return console.log(err);}
    console.log("Saved "+name)
  }); 
}

function build_theme(n,theme)
{
  var name = n.split(".")[0];
  return `## [${name}](themes/${name}.thm)\n![${name}](assets/${name}.svg)\n\n`
}

function is_json(text)
{
  try{
    JSON.parse(text);
    return true;
  }
  catch (error){
    return false;
  }
}

function generate(html)
{
  fs.writeFile("README.md", html, function(err) {
    if(err) {return console.log(err);}
    console.log("Done.")
  }); 
}

require("fs").readdirSync(normalizedPath).forEach(function(file_name) {
  fs.readFile('themes/'+file_name, 'utf8', function (err,data){
    if(err) { return console.log(err); }
    if(is_json(data)){
      var theme = JSON.parse(data)
      build_svg(file_name,theme)
      html += build_theme(file_name,theme)
    }
  });
});

setTimeout(function(){ generate(html); },1000)




