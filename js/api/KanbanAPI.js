export default class KanbanAPI{
    //CRUD Functions
    // READ
    static getItems(columnId){
        // read from local storage and see if that column exists
        const column = read().find(column => column.id == columnId)
        // if for some reason it doesn't exist
        if(!column){
            return[]
        }
        // if it does 
        return column.items
    }
    // CREATE - PASSING IN CONTENT TO THE COLUMN (BY ID)
    static insertItem(columnId, content){
        // Reading what's already there
        const data = read()
        // Figuring out which column to put the new item
        const column = data.find(column => column.id == columnId)
        const item = {
            // Generage a random number and round down
            id: Math.floor(Math.random() * 1000000),
            // content key value pair
            content
        }
        // If the column doesn't exist, throw error
        if(!column){
            throw new Error ("Column does not exist")
        }
        // An array to we can use array method .push to add the item
        column.items.push(item)
        // Save to local storage and return it to the front end
        save(data)
        return item
    }
}

// -- REUSABLE FUNCTIONS WE WILL CALL ON SEVERAL TIMES --

// Getting kanban data from the local storage
function read(){
    const json = localStorage.getItem("kanban-data")

    //Writing default data - setting up four column structure.
    // If there is nothing to get, we want to grab a defualt array of objects that are ready to accept an array of items.
    if(!json){
        return [
            // id: is referring to columns, not the number of items. 
            {id: 1,
            items:[]
        },
        {id: 2,
            items:[]
        },
        {id: 3,
            items:[]
        },
        {id: 4,
            items:[]
        }
        ]
    }

    // Grabbing the JSON data from the local storage so we can parse it later.
    return JSON.parse(json)



}
// Pass in data we want to save.
function save(data){
    // Turning the data into a string to save it to local storage. 
    localStorage.setItem("kanban-data", JSON.stringify(data))
}


