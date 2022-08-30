const screen = [window.innerWidth,window.innerHeight];
const datas={
    "Python": 45.36,
    "HTML": 112,
    "CSS": 102,
    "PHP": 87,
    "C#": 65,
    "SQL": 55,
    "JS": 92,
    "VB.Net": 36,
    "Git": 100,
    "Batch": 35,
    "Bash": 55,
    "Powershell": 25,
    "Unreal Engine":64,
    "CI/CD": 50,
    "Kafka":2.9
}
sortDatas=(d)=>Object.entries(d).sort((a,b)=>b[1]-a[1])
console.log(datas)

sorteddatas=sortDatas(datas)
m2total=screen[0]*screen[1]
totalpower=sorteddatas.map(c=>c[1]).reduce((a,b)=>a+b)
sorteddatas = sorteddatas.map(c=>[c[0],Math.sqrt((c[1]/totalpower)*m2total)])

console.log(sorteddatas,m2total)

h=(x,max,i=0,res=[])=>{
    max=x[0]+max<dimensionMax?max:dimensionMax-x[0]
    res.push([x[0]+i,x[1]+i])
    // console.error("~~",res,res.map(c=>grid[c[0]][c[1]]))
    unvalidcoords=Object.values(grid).flat()
    u=res.every(c=>unvalidcoords.filter(x=>x[0]==c[0]&&x[1]==c[1]).length==0)
    return u&&(i+1)<max?h(x,max,i+1,res):[i+(u?1:0),res];
}

const dimensionMax=screen[0]>screen[1]?screen[1]:screen[0]
console.log(screen,dimensionMax);

grid={}
toFill=[...sorteddatas]
toRetest=[]
hasToRetest=true;
mini=0
alreadydone=false;
while((toFill.length>0||hasToRetest)&&!alreadydone){
    if(toRetest.length>0 && hasToRetest){
        hasToRetest=false
        toFill.unshift(...toRetest);
        toRetest=[]
    }
    let e=toFill.shift();
    
    // Get coord of the first empty place to fill
    unvalidcoords=Object.values(grid).flat()
    unvalidcoords=listDim.map(c=>[c,unvalidcoords.filter(x=>x[0]==c).length>0?Math.max(...unvalidcoords.filter(x=>x[0]==c).map(x=>x[1])):0]);
    coord=unvalidcoords.filter(c=>c[0]>=mini&&c[1]<dimensionMax)[0]
    coord=coord?[coord[0],coord[1]]:[0,0]
    console.log(coord)
    // Get square available space
    availablespace=h(coord,e[0]);
    //console.error(coord,availablespace,e)

    if(e[0]<=availablespace[0]){
        hasToRetest=toRetest.length>0
        // console.error("#",availablespace[1])
        grid[e[1]]=availablespace[1]
        //console.error(grid.map(c=>c.join` `).join`\n`+"\n");
    }
    else toRetest.push(e);
    
    if(toFill.length==0 && toRetest.length>0){
        mini++
        hasToRetest=true;
        alreadydone=true;
    }
}

console.log(grid.map(c=>c.join` `).join`\n`);
