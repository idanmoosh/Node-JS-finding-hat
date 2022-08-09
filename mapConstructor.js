
//randomize number from 0-100
const randomOutOf100=()=>{
    return (Math.floor(Math.random()*100))
}
//slices array to equal chuncks
function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
//creates a map that randomly put the hat, starting position and holes in place
export const mapper=()=>{
    // hat location in a 10X10 grid
    let hatIndex=randomOutOf100();
    // starting location in a 10X10 grid
    let pathIndex=randomOutOf100();
    //making sure not in the same place
    if(hatIndex===pathIndex){
        pathIndex=randomOutOf100()
    };
    //holes location in a 10X10 grid
    let holesArray=[];
    let holesAmount=25;
    for(let i=0;i<holesAmount;i++){
        let randomIndex=randomOutOf100();
        if(randomIndex===hatIndex ||randomIndex===pathIndex || holesArray.includes(randomIndex)){
            randomIndex=randomOutOf100();
        }
        holesArray.push(randomIndex)
    }
    let mapList=[];
    for (let index=0;index<100;index++){
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
    const map=sliceIntoChunks(mapList,10);
    return [map,hatIndex,pathIndex];
}

export const splitToLoaction=(number)=>{
    return([Math.floor(number/10),number%10])
}

const mapData=mapper();
const map=mapData[0];


const hatLocation=(splitToLoaction(mapData[1]))
const pathLoaction=(splitToLoaction(mapData[2]))


