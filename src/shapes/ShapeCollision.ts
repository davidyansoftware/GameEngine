import Cartesian from "../coordinate/Cartesian";
import Circle from "./Circle";
import CircleTransform from "../CircleTransform";
import RectangleTransform from "../RectangleTransform";
import Rectangle from "./Rectangle";
import Coordinate from "../coordinate/Coordinate";

const coordinate = new Cartesian(0, 0);

export function circleCircleCollision(
    circle1: CircleTransform,
    circle2: CircleTransform,
): boolean {
      let distanceBetween = Math.sqrt(
        Math.pow(circle1.transform.position.absoluteX - circle2.transform.position.absoluteX, 2) +
          Math.pow(circle1.transform.position.absoluteY - circle2.transform.position.absoluteY, 2)
      );
  
      const circle1Shape = <Circle>circle1.transform.shape;
      const circle2Shape = <Circle>circle2.transform.shape;
      return distanceBetween <= circle1Shape.radius + circle2Shape.radius;
}

export function circleRectangleCollision(
    circle: CircleTransform,
    rectangle: RectangleTransform
): boolean {
    const rectCenterX = rectangle.transform.position.absoluteX;
    const rectCenterY = rectangle.transform.position.absoluteY;

    //TODO current workaround since rectangle does not fully impliment Shape
    const unknown = <unknown>rectangle.transform.shape;
    const rectShape = <Rectangle>unknown;

    const circleCenterX = circle.transform.position.absoluteX;
    const circleCenterY = circle.transform.position.absoluteY;

    const rectLeftX = rectCenterX - rectShape.width / 2;
    const rectRightX = rectLeftX + rectShape.width;
    const rectBottomY = rectCenterY - rectShape.height / 2;
    const rectTopY = rectBottomY + rectShape.height;
    
    let closestX;
    if (circleCenterX < rectLeftX) {
      closestX = rectLeftX;
    } else if (circleCenterX > rectRightX) {
      closestX = rectRightX;
    } else {
      closestX = circleCenterX;
    }

    let closestY;
    if (circleCenterY < rectBottomY) {
      closestY = rectBottomY;
    } else if (circleCenterY > rectTopY) {
      closestY = rectTopY;
    } else {
      closestY = circleCenterY;
    }

    coordinate.x = circleCenterX - closestX;
    coordinate.y = circleCenterY - closestY;

    const circleShape = <Circle>circle.transform.shape;

    return coordinate.magnitude <= circleShape.radius;
}

export function rectangleRectangleCollision (
  rectangle1: RectangleTransform,
  rectangle2: RectangleTransform
): boolean {
  return convexPolygonCollision(rectangle1._getCorners(), rectangle2._getCorners());
}

function convexPolygonCollision (
  polygon1: Array<Coordinate>,
  polygon2: Array<Coordinate>
): boolean {
  const polygons = [polygon1, polygon2];

  for (let i = 0; i < polygons.length; i++) {

      // for each polygon, look at each edge of the polygon, and determine if it separates
      // the two shapes
      var polygon = polygons[i];
      for (let i1 = 0; i1 < polygon.length; i1++) {

          // grab 2 vertices to create an edge
          var i2 = (i1 + 1) % polygon.length;
          var p1 = polygon[i1];
          var p2 = polygon[i2];

          // find the line perpendicular to this edge
          const normal = { x: p2.y - p1.y, y: p1.x - p2.x };

          // for each vertex in the first shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          let minA = Number.POSITIVE_INFINITY;
          let maxA = Number.NEGATIVE_INFINITY;
          for (let j = 0; j < polygon1.length; j++) {
              const projected = normal.x * polygon1[j].x + normal.y * polygon1[j].y;
              if (projected < minA) {
                  minA = projected;
              }
              if (projected > maxA) {
                  maxA = projected;
              }
          }

          // for each vertex in the second shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          let minB = Number.POSITIVE_INFINITY;
          let maxB = Number.NEGATIVE_INFINITY;
          for (let j = 0; j < polygon2.length; j++) {
              const projected = normal.x * polygon2[j].x + normal.y * polygon2[j].y;
              if (projected < minB) {
                  minB = projected;
              }
              if (projected > maxB) {
                  maxB = projected;
              }
          }

          // if there is no overlap between the projects, the edge we are looking at separates the two
          // polygons, and we know there is no overlap
          if (maxA < minB || maxB < minA) {
              return false;
          }
      }
  }
  return true;
}