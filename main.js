//Definitions
// types:
// 0 - Point
// 1 - Line
// 2 - Ellipse
// 3 - Rectangle
// 4 - Polygon

//Buttons
pointButton = document.getElementById("pointButton");
lineButton = document.getElementById("lineButton");
ellipseButton = document.getElementById("ellipseButton");
rectangleButton = document.getElementById("rectangleButton");
polygonButton = document.getElementById("polygonButton");
removeButton = document.getElementById("removeButton");
clearButton = document.getElementById("clearButton");
showInfoButton = document.getElementById("showInfoButton");
showButton = document.getElementById("showButton");

//PopUps
pointPopUp = document.getElementById("pointPopUp");
linePopUp = document.getElementById("linePopUp");
anglePopUp = document.getElementById("anglePopUp");

class Point {
  constructor(x_0, y_0, color) {
    this.color = color;
    this.x_0 = x_0;
    this.y_0 = y_0;
  }
}

class Line extends Point {
  constructor(x_0, y_0, x_1, y_1, color) {
    super(x_0, y_0, color);
    this.x_1 = x_1;
    this.y_1 = y_1;
  }
}

class Ellipse extends Point {
  constructor(x_0, y_0, filled, color) {
    super(x_0, y_0, color);
    this.filled = filled;
  }
}

class Rectangle extends Point {
  constructor(x_0, y_0, filled, color) {
    super(x_0, y_0, color);
    this.filled = filled;
  }
}

class Polygon extends Point {
  constructor(x_0, y_0, filled, color) {
    super(x_0, y_0, color);
    this.filled = filled;
  }
}

data = [
  new Point(100, 100, "#333"),
  new Line(0, 0, 190, 190, "#333"),
  new Ellipse(300, 300, true, "blue"),
  new Rectangle(500, 600, true, "#333"),
  new Polygon(700, 300, true, "green"),
];

class Canvas {
  addFunctions = {
    0: () => this.addPoint(),
    1: () => this.addLine(),
    2: () => this.addEllipse(),
    3: () => this.addRectangle(),
    4: () => this.addPolygon(),
  };
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d"); // Инициализация ctx здесь
    this.data = null;
    this.canvas.width = 800; // ваша ширина
    this.canvas.height = 600;
  }
  init(data) {
    this.data = data;
  }

  add(type) {
    this.addFunctions[type]();
  }

  remove() {
    console.log("remove");
  }

  clear() {
    console.log("clear");
  }

  showInfo() {
    console.log("showInfo");
    console.log(data);
  }

  show() {
    console.log("this.canvas.width: ", this.canvas.width);
    console.log("this.canvas.height: ", this.canvas.height);
    console.log("show");
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Отрисовываем каждый элемент из массива data
    this.data.forEach((element) => {
      if (element.constructor.name == "Point") {
        // Пример отрисовки точки
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x_0, element.y_0, 5, 5);
      } else if (element.constructor.name == "Line") {
        ctx.strokeStyle = element.color;
        ctx.beginPath();
        ctx.moveTo(element.x_0, element.y_0); // Установка начальной точки
        ctx.lineTo(element.x_1, element.y_1); // Рисование линии до конечной точки
        ctx.stroke();
      } else if (element.constructor.name == "Rectangle") {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x_0, element.y_0, 200, 200);
      } else if (element.constructor.name == "Ellipse") {
        ctx.fillStyle = element.color;
        ctx.beginPath();
        ctx.ellipse(
          element.x_0 + 50, // x-координата центра эллипса (левый верхний угол прямоугольника + половина ширины)
          element.y_0 + 25, // y-координата центра эллипса (левый верхний угол прямоугольника + половина высоты)
          50, // радиус по оси X (половина ширины прямоугольника)
          25, // радиус по оси Y (половина высоты прямоугольника)
          0, // начальный угол
          0, // конечный угол
          2 * Math.PI // направление: по часовой стрелке
        );
        ctx.fill();
      } else if (element.constructor.name == "Polygon") {
        ctx.fillStyle = element.color;
        ctx.beginPath();
        ctx.moveTo(element.x_0, element.y_0); // Вершина треугольника
        ctx.lineTo(element.x_0 + 30, element.y_0 + 60); // Вершина справа внизу
        ctx.lineTo(element.x_0 - 30, element.y_0 + 60); // Вершина слева внизу
        ctx.closePath(); // Замкнуть треугольник
        ctx.fill();
      }
    });
  }

  addPoint() {
    // Открытие pop-up
    pointPopUp.classList.add("pop_up_active");

    // Находим элементы формы в pop-up
    const xInput = document.getElementById("x_0");
    const yInput = document.getElementById("y_0");
    const colorInput = document.getElementById("color");
    const submitButton = document.getElementById("pointSubmit");

    // Добавляем слушатель события для кнопки submit
    submitButton.addEventListener("click", () => {
      // Получаем значения из полей формы
      const xValue = parseFloat(xInput.value);
      const yValue = parseFloat(yInput.value);
      const colorValue = colorInput.value;

      // Проверка на корректность введенных данных
      if (!isNaN(xValue) && !isNaN(yValue)) {
        // Создаем объект Point
        const newPoint = new Point(xValue, yValue, colorValue);

        // Добавляем объект в массив данных
        this.data.push(newPoint);

        // Закрываем pop-up
        pointPopUp.classList.remove("pop_up_active");

        // Очищаем значения в форме
        xInput.value = "";
        yInput.value = "";
        colorInput.value = "#000000";
      } else {
        // Выводим сообщение об ошибке в консоль
        console.error("Invalid input. Please enter valid numeric values.");
      }
    });
  }
  addLine() {
    linePopUp.classList.add("pop_up_active");

    const x_0Input = document.getElementById("x_0_line");
    const y_0Input = document.getElementById("y_0_line");
    const x_1Input = document.getElementById("x_1_line");
    const y_1Input = document.getElementById("y_1_line");
    const colorInput = document.getElementById("lineColor");
    const submitButton_line = document.getElementById("lineSubmit");

    submitButton_line.addEventListener("click", () => {
      const x_0Value = parseFloat(x_0Input.value);
      const y_0Value = parseFloat(y_0Input.value);
      const x_1Value = parseFloat(x_1Input.value);
      const y_1Value = parseFloat(y_1Input.value);
      const colorValue = colorInput.value;

      if (
        !isNaN(x_0Value) &&
        !isNaN(y_0Value) &&
        !isNaN(x_1Value) &&
        !isNaN(y_1Value)
      ) {
        const newLine = new Line(
          x_0Value,
          y_0Value,
          x_1Value,
          y_1Value,
          colorValue
        );
        this.data.push(newLine);
        linePopUp.classList.remove("pop_up_active");
        x_0Input.value = "";
        y_0Input.value = "";
        x_1Input.value = "";
        y_1Input.value = "";
        colorInput.value = "#000000";
      } else {
        console.error("Invalid input. Please enter valid numeric values.");
      }
    });
  }
  addEllipse() {
    anglePopUp.classList.add("pop_up_active");

    const x_0Input = document.getElementById("x_0_angle");
    const y_0Input = document.getElementById("y_0_angle");
    const filledInput = document.getElementById("filled");
    const colorInput = document.getElementById("color_angle");
    const submitButton_angle = document.getElementById("angleSubmit");

    submitButton_angle.addEventListener("click", () => {
      const x_0Value = parseFloat(x_0Input.value);
      const y_0Value = parseFloat(y_0Input.value);
      const filledValue = filledInput.value;
      const colorValue = colorInput.value;
      if (!isNaN(x_0Value) && !isNaN(y_0Value)) {
        const newEllipse = new Ellipse(
          x_0Value,
          y_0Value,
          filledValue,
          colorValue
        );
        this.data.push(newEllipse);
        anglePopUp.classList.remove("pop_up_active");
        x_0Input.value = "";
        y_0Input.value = "";
        filledInput.value = "True";
        colorInput.value = "#000000";
      } else {
        console.error("Invalid input. Please enter valid numeric values.");
      }
    });
  }
  addRectangle() {
    anglePopUp.classList.add("pop_up_active");

    const x_0Input = document.getElementById("x_0_angle");
    const y_0Input = document.getElementById("y_0_angle");
    const filledInput = document.getElementById("filled");
    const colorInput = document.getElementById("color_angle");
    const submitButton_angle = document.getElementById("angleSubmit");

    submitButton_angle.addEventListener("click", () => {
      const x_0Value = parseFloat(x_0Input.value);
      const y_0Value = parseFloat(y_0Input.value);
      const filledValue = filledInput.value;
      const colorValue = colorInput.value;
      if (!isNaN(x_0Value) && !isNaN(y_0Value)) {
        const newRectangle = new Rectangle(
          x_0Value,
          y_0Value,
          filledValue,
          colorValue
        );
        this.data.push(newRectangle);
        anglePopUp.classList.remove("pop_up_active");
        x_0Input.value = "";
        y_0Input.value = "";
        filledInput.value = "True";
        colorInput.value = "#000000";
      } else {
        console.error("Invalid input. Please enter valid numeric values.");
      }
    });
  }
  addPolygon() {
    anglePopUp.classList.add("pop_up_active");

    const x_0Input = document.getElementById("x_0_angle");
    const y_0Input = document.getElementById("y_0_angle");
    const filledInput = document.getElementById("filled");
    const colorInput = document.getElementById("color_angle");
    const submitButton_angle = document.getElementById("angleSubmit");

    submitButton_angle.addEventListener("click", () => {
      const x_0Value = parseFloat(x_0Input.value);
      const y_0Value = parseFloat(y_0Input.value);
      const filledValue = filledInput.value;
      const colorValue = colorInput.value;
      if (!isNaN(x_0Value) && !isNaN(y_0Value)) {
        const newPolygon = new Polygon(
          x_0Value,
          y_0Value,
          filledValue,
          colorValue
        );
        this.data.push(newPolygon);
        anglePopUp.classList.remove("pop_up_active");
        x_0Input.value = "";
        y_0Input.value = "";
        filledInput.value = "True";
        colorInput.value = "#000000";
      } else {
        console.error("Invalid input. Please enter valid numeric values.");
      }
    });
  }
}

//Init
const canvas = new Canvas();
canvas.init(data);

//EventListeners
pointButton.addEventListener("click", () => canvas.add(0));
lineButton.addEventListener("click", () => canvas.add(1));
ellipseButton.addEventListener("click", () => canvas.add(2));
rectangleButton.addEventListener("click", () => canvas.add(3));
polygonButton.addEventListener("click", () => canvas.add(4));
removeButton.addEventListener("click", () => canvas.remove());
clearButton.addEventListener("click", () => canvas.clear());
showInfoButton.addEventListener("click", () => canvas.showInfo());
showButton.addEventListener("click", canvas.show.bind(canvas));

data.forEach((element) => {
  console.log(element.constructor.name);
});
