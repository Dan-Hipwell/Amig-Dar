/*
Function to create a contents page. 

Any header (h1, h2, h3, h4, h5 or h6) is included if it has a value for `.id`, headers are sorted by level (h1 > h2 > h3 > etc.)
*/
function buildContentsBox(contents) {
    // Do nothing if no page marked as contents
    if (contents === undefined) {
      return
    }
  
    /* 
    * Iterative function to get subheaders
    */
    function addSubnodes(parentHeader, parentNode) {
      // Get level of parent
      let lvl = parseInt(parentHeader.tagName.replace("H", ""));
      // List sibling headers
      let currentSibling = parentHeader.nextElementSibling;
      let finished = false;
      let siblingHeaders = [];
      while (!finished) {
        // Get next sibling
        currentSibling = currentSibling.nextElementSibling;
        if (!currentSibling) {
          // If sibling is blank, finished
          finished = true;
        } else if (!["H1", "H2", "H3", "H4", "H5", "H6"].includes(currentSibling.tagName)) {
          // If sibling isn't a heading, next sibling
        } else {
          // Work out its level
          siblingLvl = parseInt(currentSibling.tagName.replace("H", ""));
          if (siblingLvl && siblingLvl <= lvl) {
            // If its level is g/e to parent header, finished
            finished = true;
          } else if (currentSibling.id) {
            // If it's a header with an ID, add to list
            siblingHeaders.push(currentSibling);
          }
        }
      }
      // Add sibling headers
      let item
      for (let childHeader of siblingHeaders) {
        // Add node for this header
        item = addNode(childHeader, parentNode)
        // Iteratively call this function to populate children
        addSubnodes(childHeader, item)
      }
    }
  
    /*
    * Add node for given heading
    */
    function addNode(header, parentNode) {
      // Create link to id
      let link = document.createElement("a");
      link.href = `#${header.id}`;
      parentNode.appendChild(link);
      // Get text content of title (without suffixes)
      let item = document.createElement("li");
      item.textContent = Array.prototype.filter.call(header.childNodes, function (element) {
        return element.nodeType === Node.TEXT_NODE;
      }).map(function (element) {
        return element.textContent;
      }).join("");
      // Add item text to link
      link.appendChild(item)
  
      return item;
    }
  
    // Create header
    let header = document.createElement("h4");
    header.textContent = "Contents";
    contents.appendChild(header);
    // Add h1 nodes
    let thisItem;
    for (let header of document.getElementsByTagName("H1")) {
      // Skip page header
      if (header.parentElement.id === "home-page-header") {
        continue;
      }
      // Add node
      thisItem = addNode(header, contents)
      // Iteratively add child nodes
      addSubnodes(header, thisItem)
    }
  }
  
  /*
  * Add a link to IPA reader to any IPA pronunciation string.
  */
  function linkIPA(obj) {
    obj.href = `http://ipa-reader.xyz/?text=${obj.textContent}&voice=Brian`
  }