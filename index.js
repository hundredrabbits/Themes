fs = require('fs');
path = require('path');
var normalizedPath = require("path").join(__dirname, "themes");

var html = "# Collection\n\n"

//  opt in to upgrade the schema change
//  would require to do 'theme = theme.data' in client apps
//  idea is tradeoff for authorship and versioning, potentially multiple codepaths
//  if, in the future, more colors are ever added
//var generate_v2 = false;

function build_svg(n,theme)
{
  var name = n.split(".")[0];
  var size = 16

  var html = `
  <svg class="vector" width="${(size * 6) + size}px" height="${(size * 4)}px" xmlns="http://www.w3.org/2000/svg" baseProfile="full" version="1.1">
    <rect width='${(size * 6)}' height='${(size * 4)}' fill='${theme.data.background}' rx='5' ry='5'></rect>
    <circle cx='${(size * 1.5)}' cy='${(size * 1.5)}' r='${size/2}' fill='${theme.data.f_high}'></circle>
    <circle cx='${(size * 2.5)}' cy='${(size * 1.5)}' r='${size/2}' fill='${theme.data.f_med}'></circle>
    <circle cx='${(size * 3.5)}' cy='${(size * 1.5)}' r='${size/2}' fill='${theme.data.f_low}'></circle>
    <circle cx='${(size * 4.5)}' cy='${(size * 1.5)}' r='${size/2}' fill='${theme.data.f_inv}'></circle>
    <circle cx='${(size * 1.5)}' cy='${(size * 2.5)}' r='${size/2}' fill='${theme.data.b_high}'></circle>
    <circle cx='${(size * 2.5)}' cy='${(size * 2.5)}' r='${size/2}' fill='${theme.data.b_med}'></circle>
    <circle cx='${(size * 3.5)}' cy='${(size * 2.5)}' r='${size/2}' fill='${theme.data.b_low}'></circle>
    <circle cx='${(size * 4.5)}' cy='${(size * 2.5)}' r='${size/2}' fill='${theme.data.b_inv}'></circle>
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

function safe_parse_json(text)
{
  try{
    return JSON.parse(text);
  }
  catch (error){
    return null;
  }
}

function generate(html)
{
  fs.writeFile("COLLECTION.md", html, function(err) {
    if(err) {return console.log(err);}
    console.log("Done.")
  });
}

function upgrade_with_defaults(theme)
{

  if ( !theme.hasOwnProperty("meta"))
  {
    //assume v1, provide default meta
    return {"meta":
      {
        "author": "unknown",
        "version": 2,
        "revision": 1
      },
        "data": theme
      }

    }else{
      //  v2 and up
      return theme;
    }
}

require("fs").readdirSync(normalizedPath).forEach(function(file_name) {
  fs.readFile('themes'+path.sep+file_name, 'utf8', function (err, data){
    if(err) { return console.log(err); }

    var theme = safe_parse_json(data);
    if (!theme ){ return console.log(err); }
    build_svg(file_name, theme)
    html += build_theme(file_name, theme)
    theme = upgrade_with_defaults(theme);

    fs.writeFileSync('themes' + path.sep + file_name, JSON.stringify(theme, null, 2));
  });
});

setTimeout(function(){ generate(html); },1000)




