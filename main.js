const shortListHandler = () => {
  var debug = true;
  // set localstorage to an empty variable if on first load
  // or if the local storage is empty
  if (localStorage.shortListItems === undefined) {
    let shortListItems = [];
    localStorage.setItem("shortListItems", JSON.stringify(shortListItems));
  }
  // button to clear localstorage
  // only for testing
  if (debug) {
    let button = document.querySelector(".clear-storage");
    button.addEventListener("click", function() {
      localStorage.clear();
    });
    // check all the shortlist buttons for clicks
    const addRemoveShortlist = () => {
      // make an array with all the shortlist elements
      let elements = [];
      let shortlistItem = document.querySelectorAll(".item");
      shortlistItem.forEach(function(singleItem) {
        // push the items in the elements array
        elements.push(singleItem);
      });
      // all the elements are in an array
      // now loop through the elements and add
      // a click listener to see which one has been clicked
      // this is the function that adds to shortlist
      elements.forEach(function(element) {
        // check if the item is already in storage 
        // and decide what text to display
        const checkItemStatus = () => {
            // retrieve item from locastorage
            // and make it workable with json parse
            var elementText = element.querySelector('.add-shortlist__button');
            var removeShortlist = 'Remove from Shortlist';
            var addShortlist = 'Add to Shortlist';
                elementText.innerText = addShortlist;
            let retrieved = localStorage.getItem('shortListItems');
            let parsed = JSON.parse(retrieved);

            for(var i=0;i<parsed.length;i++) {
              let itemImage = element.querySelector('.item__image')
              .getAttribute('src');
              // check if current entry is already in localstorage
              if(parsed[i].image.indexOf(itemImage) > -1) {
                elementText.innerText = removeShortlist;
              }
            }
        }
        checkItemStatus();
        // onclick function to add/remove from localstorage
        element
          .querySelector('.add-shortlist__button')
          .addEventListener('click', function() {

            // get image, set url as id
            let itemImage, itemProperties, itemTitle;
            itemImage = element.querySelector('.item__image')
            .getAttribute('src');
            itemTitle = element.querySelector('.card-title')
            .textContent;   
            itemProperties = {
                title: itemTitle,
                image: itemImage
            }
            var match = false;
            // retrieve item from locastorage
            // and make it workable with json parse
            let retrieved = localStorage.getItem('shortListItems');
            let parsed = JSON.parse(retrieved);
            // end retrieve item
            // add to shortlist
            if(parsed.length === 0) {
              parsed.push(itemProperties);
            }
            else if(parsed.length !== 0) {
              for(var z=0;z<parsed.length;z++) {
               // if there's a match change the variable to true so the code doesn't execute
               if(parsed[z].image.indexOf(itemImage) > -1) {
                    // already present
                    match = true;
               } 
              }
              // if there's no match in the loop add it to the localstorage
                if(match === false) {
                  parsed.push(itemProperties);
                }
              }

            localStorage.setItem('shortListItems', JSON.stringify(parsed));
            checkItemStatus();
            // end add to shortlist
          });
      });
    };
    addRemoveShortlist();
  }
};




document.addEventListener("DOMContentLoaded", function() {
  shortListHandler();
});
