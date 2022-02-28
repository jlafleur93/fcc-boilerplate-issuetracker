let example = {
  assigned_to: "leet",
  created_by: "james",
  status_text: "same lol",
  yeet: "",
};
let obj = [
  {
    assigned_to: "z",
    created_by: "z",
    status_text: "z",
    _id: "02610573",
    created_on: 1645771273596,
    open: true,
    updated_on: 1645771273596,
  },
  {
    assigned_to: "epic",
    created_by: "pranks",
    status_text: "zztop",
    _id: "03",
    created_on: 5771273596,
    open: true,
    updated_on: 771273596,
  },
];
function emptyPropertyRemover(object) {
  let retobj = object;
  for (let key in retobj) {
    if (retobj[key] === "") {
      delete retobj[key];
    }
  }
  return retobj;
}

let remove = emptyPropertyRemover(example);
console.log(remove);
let finder = obj.find((x) => x._id === obj[0]._id);
console.log(`finder`, finder);
let newObj = Object.assign({}, finder, remove);
newObj.updated_on = Date.now();
console.log(`newobj here--`, newObj);
//Create a function that removes the _id at the given arr[i] point
//then push the newly created objected onto the array
///Part of this can be a delete, then update function lol
