const prompt = require('prompt-sync')();


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const RandomNumber=(number)=>{
    return (Math.floor(Math.random()*number))
}
const sliceIntoChunks=(arr, chunkSize)=>{
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

const splitToLoaction=(number)=>{
    return([Math.floor(number/10),number%10])
}




class Field {
    constructor(field, pathIndex, hatIndex){
        this._field=field;
        this._pathIndex=pathIndex;
        this._hatIndex=hatIndex;
    }
    game() {
        this.print(this._field);

        let y=splitToLoaction(this._pathIndex)[0];
        let x=splitToLoaction(this._pathIndex)[1];

        while (this._field[y][x]===pathCharacter || this._field[y][x]===fieldCharacter){
            const youLost=()=>{
                console.log('YOU LOST !! OH NOOOOOOO')
            }

            const direction =prompt('which way do you want to go? please enter W- for UP, S- for DOWN, A- for Left, D- for Right ');

            if (direction.toUpperCase()==='W') {
                if (y===0) {
                    youLost()
                }
                else{
                    y-=1
                }
            }
            if (direction.toUpperCase()==='S') {
                if (y===this._field.length) {
                    youLost();

                }
                else{
                    y+=1
                }
            }
            if (direction.toUpperCase()==='A') {
                if (x===0) {
                    youLost()
                }
                else{
                    x-=1
                }
            }
            if (direction.toUpperCase()==='D') {
                if (x===this._field[y].length) {
                    youLost()
                }
                else{
                    x+=1
                }
            }

            if (this._field[y][x]===hat){
                console.log('YOU WIN! YOU FOUND THE HAT!')
            }
            else if (this._field[y][x]===hole){
                console.log('YOU LOST, YOU FELL IN A HOLE! OH NOOOOOOOOOO')
            }
            else{
                this._field[y][x]=pathCharacter;
                this.print(this._field)
            }

        }
    }
    print(){
        for (let row of this._field){
            console.log(row.join(' '));
        };
    }

    static buildMap(){
        //number value= the amount of blocks in the map(10X10 == 100)
        let number=100
        let holesToFieldRatio=0.20;
        //the location of the hat
        const hatIndex=RandomNumber(number);
        //the location of the starting point
        const pathIndex=RandomNumber(number);

        if (this.hatIndex===this.pathIndex){
            this.pathIndex=RandomNumber(number)
        }
        let holesArray=[];
        let holesAmount=number*holesToFieldRatio;
        for(let i=0;i<holesAmount;i++){
            let randomIndex=RandomNumber(number);
            if(randomIndex===hatIndex ||randomIndex===pathIndex || holesArray.includes(randomIndex)){
                randomIndex=RandomNumber(number);
            }
            holesArray.push(randomIndex)
        }
        let mapList=[];
        for (let index=0;index<number;index++){
            if (index===hatIndex){
                mapList[index]=hat;
            }
            else if (index===pathIndex){
                mapList[index]=pathCharacter;
            }
            else if (holesArray.includes(index)){
                mapList[index]=hole;
            }
            else{mapList[index]=fieldCharacter;}
        }
            const field=sliceIntoChunks(mapList,10)
            return ([field,pathIndex,hatIndex])
        }


}

const gameParameters= Field.buildMap()
const map=gameParameters[0];
const startingPoint=gameParameters[1];
const endingPoint=gameParameters[2];

const newGame = new Field(map,startingPoint,endingPoint)
newGame.game()

