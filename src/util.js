export const sortData = (data) => {

    // we copy the data to another array
    const sortedData =[...data];


    //we give the comparison definition here
    sortedData.sort((a,b)=>{
        if(b.cases < a.cases ){
            return -1;
        } 
        else
        {
            return 1;
        }
    })
    return sortedData;
}

// can be done in one line
// return sortedData.sort((a,b)=> a.cases > b.cases ? -1 : 1 )
