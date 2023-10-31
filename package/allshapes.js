class BaseShape{
    constructor(){
        this.shapeColor=''
    }
    setColor(color){
        this.shapeColor=(color);
    }
}

class MyCircle extends BaseShape{
    render(){ return `<circle cx="50%" cy="50%" r="90" height="100%" width="100%" fill="${this.shapeColor}" />` }
}

class MyTriangle extends BaseShape{
    render(){
        return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.shapeColor}" />`
    }
};

class MySquare extends BaseShape{
    render(){return `<rect x="50" height="180" width="180" fill="${this.shapeColor}" />`}
}

module.exports = {MyCircle, MySquare, MyTriangle}