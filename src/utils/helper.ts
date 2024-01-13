export function generateColor() {
  const possibleColors = 16777215;
  return "#" + Math.floor(Math.random() * possibleColors).toString(16);
}

export function uniqueColorGenerator(colors: string[]) {
  let colorIsUnique = false;
  let newColor: string = "";

  while (!colorIsUnique) {
    newColor = generateColor();
    for (const color of colors) {
      if (color.toLocaleLowerCase() === newColor.toLocaleLowerCase()) {
        break;
      }
    }
    colorIsUnique = true;
  }
  return newColor;
}
