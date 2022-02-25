let example = {
  issue_text: "same",
  issue_title: "leet",
  created_by: "james",
  assigned_to: "",
  status_text: "",
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
  let newObject = object;
  Object.keys(newObject).forEach((key) => {
    if (newObject[key] === "") {
      delete newObject[key];
    }
  });
  return newObject;
}

let remove = emptyPropertyRemover(example);
let finder = obj.find((x) => x._id === obj[0]._id);

let newObj = Object.assign({}, finder, remove);
console.log(`yeet`, [newObj]);
//Create a function that removes the _id at the given arr[i] point
//then push the newly created objected onto the array
///Part of this can be a delete, then update function lol
