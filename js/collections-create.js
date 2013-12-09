// ---------------- collections-create.js -----------------

/*------------ Create New Collection ------------*/

    $('#btnCreateCollection').click(function() {
      // create a collection
      var Collection = Parse.Object.extend("Collection");
      var collection = new Collection();

      // save data from forms into the new collection
      var thisCollectionName = document.getElementById('inputCollectionName').value;
      var thisCollectionType = document.getElementById('inputCollectionType').value;
      var thisCollectionDesc = document.getElementById('inputCollectionDesc').value;

      collection.set("collectionName", thisCollectionName);
      collection.set("collectionType", thisCollectionType);
      collection.set("collectionDesc", thisCollectionDesc);
      collection.save();

      /* resets form fields to blank */
      $('#inputCollectionName').val(""); 
      $('#inputCollectionType').val("");
      $('#inputCollectionDesc').val("");

      alert("You have successfully created\na new collection named " + thisCollectionName);

      /* adds collection icon representing new collection */
      /* $('.new-collection').before("<a class='collection-button existing-collection' href='#'><p class='collection-name'>I do not exist yet!</p><p class='item-count'>Items: 0</p><p class='edit-link'>Edit</p><div class='arrow'></div></a>");
      $('a.existing-collection div.arrow').hide(); */

      return false;
    });

    /*
    $(".order_form").hide().before("<a href='#' class='order_now'>Order Now</a>");
    $(".order_now").click(function() {
      var $link = $(this);
      $link.nex().show("slow");
      $link.remove();
      return false;
    });
    */

    $(".collectionDropdown").hide();
    /*$(".arrow").hide();*/



/*------------ New Collection Form Handler ------------*/

    var collFormIsExpanded = false;
    var $newCollLink = $(".newCollectionForm");

    $(".new-collection").click(function() {
      if (collFormIsExpanded === false) {
        $newCollLink.show("fast");
        $("a.new-collection div.arrow").show("fast");
        collFormIsExpanded = true;
      } else {
        $newCollLink.hide("fast");
        $("a.new-collection div.arrow").hide("fast");
        collFormIsExpanded = false;

        /* resets form fields to blank */
        $('#inputCollectionName').val(""); 
        $('#inputCollectionType').val("");
        $('#inputCollectionDesc').val("");
      }
      return false;
    });