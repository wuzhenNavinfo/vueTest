//定义类
class StringLine {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }

   
    /**
     * 这是一个划线的方法
     * 
     * @memberof StringLine
     */
    drawLine() {
        console.info('drawLine');
    }
}
