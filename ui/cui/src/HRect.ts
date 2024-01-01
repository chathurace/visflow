export class HRect {

    _x: number = -1;
    _midX: number = -1;
    _y: number = -1;
    _midY: number = -1;
    _width: number = -1;
    _height: number = -1;

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
        this._midX = x + this._width / 2;
    }

    get midX(): number {
        return this._midX;
    }

    set midX(midX: number) {
        this._midX = midX;
        this._x = midX - this._width / 2;
    }

    get y(): number {
        return this._y;
    }

    get bottom(): number {
        return this._y + this._height;
    }

    set y(y: number) {
        this._y = y;
        this._midY = y + this._height / 2;
    }

    get midY(): number {
        return this._midY;
    }

    set midY(midY: number) {
        this._midY = midY;
        this._y = midY - this._height / 2;
    }

    get width(): number {
        return this._width;
    }

    set width(width: number) {
        this._width = width;
        this._midX = this._x + width / 2;
    }

    get height(): number {
        return this._height;
    }

    set height(height: number) {
        this._height = height;
    }
}