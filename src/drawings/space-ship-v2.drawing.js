import { LayerPath } from "../../node_modules/streetzero/dist/streetzero.esm.js";

const wingBack = new Path2D();
wingBack.moveTo(3, 4);
wingBack.lineTo(13, 4);
wingBack.lineTo(10, 8);
wingBack.lineTo(13, 11);
wingBack.lineTo(13, 32);
wingBack.lineTo(10, 34);
wingBack.lineTo(14, 39);
wingBack.lineTo(3, 39);
wingBack.lineTo(11, 32);
wingBack.lineTo(11, 12);
wingBack.lineTo(3, 4);

wingBack.moveTo(26, 6);
wingBack.lineTo(29, 9);
wingBack.lineTo(22, 9);
wingBack.lineTo(26, 6);

wingBack.moveTo(26, 37);
wingBack.lineTo(29, 33);
wingBack.lineTo(22, 33);
wingBack.lineTo(26, 37);

wingBack.moveTo(20, 14);
wingBack.lineTo(40, 21);
wingBack.lineTo(20, 28);
wingBack.lineTo(20, 14);

wingBack.closePath();

const wingFront = new Path2D();
wingFront.moveTo(26, 5);
wingFront.lineTo(23, 3);
wingFront.lineTo(13, 13);
wingFront.lineTo(13, 29);
wingFront.lineTo(23, 39);
wingFront.lineTo(26, 37);
wingFront.lineTo(20, 31);
wingFront.lineTo(20, 11);
wingFront.lineTo(26, 5);

const fuellTancks = new Path2D();
fuellTancks.rect(14, 11, 10, 4);
fuellTancks.rect(14, 26, 10, 4);

const thrusters = new Path2D();
thrusters.moveTo(7, 12);
thrusters.lineTo(10, 15);
thrusters.lineTo(13, 19);
thrusters.lineTo(13, 23);
thrusters.lineTo(10, 27);
thrusters.lineTo(7, 30);
thrusters.lineTo(7, 23);
thrusters.lineTo(11, 23);
thrusters.lineTo(11, 19);
thrusters.lineTo(7, 19);
thrusters.lineTo(7, 12);
thrusters.closePath();
thrusters.rect(10, 15, 13, 4);
thrusters.rect(10, 23, 13, 4);


export const SpaceShipV2Drawing = (color, element)=>([
    new LayerPath(wingBack, color, element),
    new LayerPath(wingFront,'#bdbdbd', element),
    new LayerPath(fuellTancks, '#707070', element),
    new LayerPath(thrusters, 'grey', element)
])
