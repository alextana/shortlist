const shortListHandler = () => {
  var debug = true;
  // set localstorage to an empty variable if on first load
  // or if the local storage is empty
  if (localStorage.shortListItems === undefined) {
    let shortListItems = [];
    localStorage.setItem("shortListItems", JSON.stringify(shortListItems));
  }

  function displayShortlistItems() {
    let shortlistContainer,shortlistOutput,retrieved,parsed;
        shortlistContainer = document.querySelector('.shortlist-output__container');
        shortlistOutput = document.querySelector('.shortlist-output');
        retrieved = localStorage.getItem('shortListItems');
        parsed = JSON.parse(retrieved);
    // erase old shortlist and refresh 
    shortlistOutput.innerHTML = '';
        //create items
        if(shortlistOutput) {
        for(var f=0;f<parsed.length;f++) {
            let containerDiv, image;
            containerDiv = document.createElement('div');
            image = document.createElement('img');
            image.classList.add('img-fluid');
            containerDiv.classList.add('col-sm-12','col-md-4', 'shortlist__item' , 'py-3');
            image.src = parsed[f].image;
            containerDiv.innerHTML = `<h2>${parsed[f].title}</h2>`;
            containerDiv.appendChild(image);
            if(shortlistOutput) {
            shortlistOutput.appendChild(containerDiv);
            }
          }
          if(document.querySelectorAll('.shortlist__item').length > 0) {
            shortlistContainer.classList.remove('no-height');
          } else {
            shortlistContainer.classList.add('no-height');
          } 
      }
  }

  // button to clear localstorage
  // only for testing
  if (debug) {
    let button = document.querySelector(".clear-storage");
    if(button) {
    button.addEventListener("click", function() {
      localStorage.clear();
    });
  }
}

    // check all the shortlist buttons for clicks
    const addRemoveShortlist = () => {
      // make an array with all the shortlist elements
      let elements = [];
      let shortlistItem = document.querySelectorAll(".item");

      shortlistItem.forEach(function(singleItem) {
        // push the items in the elements array
        elements.push(singleItem);
      });

      // this is the function that adds to shortlist
      elements.forEach(function(element) {
        // check if the item is already in storage 
        // and decide what text to display
        const checkItemStatus = () => {
            // retrieve item from locastorage
            var elementText,removeShortlist,addShortlist;
                elementText = element.querySelector('.add-shortlist__button');
                removeShortlist = 'Remove from Shortlist';
                addShortlist = 'Add to Shortlist';
            
                elementText.innerText = addShortlist;

            let retrieved, parsed;
                retrieved = localStorage.getItem('shortListItems');
                parsed = JSON.parse(retrieved);

            for(var i=0;i<parsed.length;i++) {
              let itemImage = element.querySelector('.item__image').getAttribute('src');
              // check if current entry is already in localstorage
              if(parsed[i].image.indexOf(itemImage) > -1) {
                elementText.innerText = removeShortlist;
              }
            }
        }
        
        checkItemStatus();
        // onclick function to add/remove from localstorage
        if(element) {
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
                    // if it's already present then remove
                    parsed.splice(z, 1);
               } 
              }
              // if there's no match in the loop add it to the localstorage
                if(match === false) {
                  parsed.push(itemProperties);
                }
              }
            localStorage.setItem('shortListItems', JSON.stringify(parsed));
            // check if needs to add or remove
            checkItemStatus();
            // end add to shortlist
            displayShortlistItems();
          });
        }
      });
    };
    addRemoveShortlist();
  
};
document.addEventListener("DOMContentLoaded", function() {
  shortListHandler();
});
