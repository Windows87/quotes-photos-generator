# Quotes Photo Generator
Generator of Photos with Quotes, made with NodeJS.

## How to install
```bash
npm install --save quotes-photos-generator
```

## Params

| Param                   | Required | Default     | 
|-------------------------|----------|-------------|
| imageUrl                | true     |             |
| color                   | true     |             |
| quote                   | true     |             |
| specialWords            | false    | []          |
| font                    | false    | Russo One*  |
| author                  | false    | ""          |
| path                    | false    | ./image.png |
| blur                    | false    | 0           |
| width                   | false    | 720         |
| height                  | false    | 1280        |
| backgroundColorActivate | false    | true        |

* [Download Here](https://fonts.google.com/specimen/Russo+One)

## Example Usage

```js
const Generator = require('quotes-photos-generator');
const generator = new Generator();

async function start() {
  await generator.start({
    imageUrl: './mountain.jpg',
    color: '4CAF50',
    quote: "Your limmitation - it's only your imagination",
    specialWords: ['limmitation', 'imagination'],
    author: 'Mountain Quotes',
    path: './my-quote.png',
    blur: 2
  });

  console.log('Well done!');
}

start();
```

### Example Result

![Result](https://i.imgsafe.org/bb/bb4afbba1c.png)
