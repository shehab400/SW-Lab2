/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class pt {
  //this constructor is used to construct the pt class
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

class Rectangle {
  constructor(startingPoint, w, h) {
    if (!h || h <= 0 || !w || w <= 0) {
      throw Error("invalid Width and Height"); // throws an error in cas of width or height < 0
    } 
    this.startingPoint = startingPoint;
    this.w = w; // w is the width
    this.h = h; // h is the height
  }

  // ***************
  // METHODS
  // ***************

  area() {
    return this.w * this.h;
  }

  calculatePerimeter() {
    return 2 * this.w + 2 * this.h;
  }
  // getPerimeter() {
  //   return 2 * this.w + 2 * this.h;
  // }

  updateMyHeight(height) {
    if (height && height > 0) {
      if (this.w === this.h) {
        this.w = height;
      }
      this.h = height;
    }
    //TODO: handle case of updating the height of square
  }

  update({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); // throws an error in cas of width or height < 0
    }
    this.startingPoint = startingPoint;
    this.w = width;
    this.h = height;
  }

  fetchHeight() {
    return this.h;
  }

  //function that print the endpoints
  endPoints() {
    const topRight = this.startingPoint.coordX + this.broad;
    const bottomLeft = this.startingPoint.coordY + this.h;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

  getWidth() {
    return this.w;
  }
}

function buildObject(Width, x, Height, y) {
  const mainPoint = new pt(x, y);
  const rect = new Rectangle(mainPoint, Width, Height);
  return rect;
}

function construct_Square(cord_x, CordY, SquareHeight) {
  let square;
  if (!SquareHeight || SquareHeight <= 0) {
    square = buildObject(SquareHeight, cord_x, SquareHeight, CordY);
  }
  const square_area = square.area();
  const squarePerimeter = square.calculatePerimeter();
  console.log("square Area ", square_area);
  console.log("square Perimeter ", squarePerimeter);
}

const myRect = buildObject(2, 3, 5, 4);
// const sq = construct_Square();

// console.log(sq.calculatePerimeter());
// sq.endPoints();

myRect.updateMyHeight(3);
