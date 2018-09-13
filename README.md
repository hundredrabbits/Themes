# Themes

This repo documents the specs of the theme format used across the Hundred Rabbits' [ecosystem](https://github.com/hundredrabbits). You can also implement the theme support into your own apps. See the [Collection](COLLECTION.md) for all available themes.

<img src='https://raw.githubusercontent.com/hundredrabbits/Themes/master/PREVIEW.jpg' width='600'/>

## Specs

```
{
  "meta": {
    "author": "aeriform",
    "version": 2,
    "revision": 1
  },
  "data": {
    "background": "#d4d3c0",
    "b_high": "#ede6d4",
    "b_med": "#534e41",
    "b_low": "#dfddca",
    "b_inv": "#cc295c"
    "f_high": "#534e41",
    "f_med": "#534e41",
    "f_low": "#ede6d4",
    "f_inv": "#cc295c",
  }
}
```

### Usage

To implement support, you need to add the [theme.js](https://github.com/hundredrabbits/Dotgrid/blob/master/desktop/sources/scripts/lib/theme.js), and the [theme.css](https://github.com/hundredrabbits/Dotgrid/blob/master/desktop/sources/links/theme.css). The CSS is where the style is applies onto the html elements. The **inverted style** is used, for example, on buttons or selection highlights.

- `background`, Background, general.
- `f_high`, Foreground, high-contrast.
- `f_med`, Foreground, medium-contrast.
- `f_low`, Foreground, low-contrast.
- `f_inv`, Foreground, inverted.
- `b_high`, Background, high-contrast.
- `b_med`, Background, medium-contrast.
- `b_low`, Background, low-contrast.
- `f_inv`, Background, inverted.

## Supported Applications

- [Marabu](https://github.com/hundredrabbits/Marabu), music tool.
- [Left](https://github.com/hundredrabbits/Left), writing tool.
- [Dotgrid](https://github.com/hundredrabbits/Dotgrid), vector tool.
- [Donsol](https://github.com/hundredrabbits/Donsol), card game.

This collection may also be used with
[Tape](https://aeriform.itch.io/tape) by Aeriform.

## Extras

You are welcome to submit your own themes to this collection!

