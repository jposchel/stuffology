// ---------------- collections-create.js -----------------


$(document).ready(function(){
    // code in here will be excuted once the page has loaded

    // set our Parse keys
    Parse.initialize("FPOlmLXJUEua1HOYMHHN8TPCvtlouzpj9LSzjMh0", "bh2d38avzROSyB9JzQa68tVtu3VnhZcXsdbTejl9");
    
    /*------------ Load the collections from Parse ------------*/
    var CollectionObject = Parse.Object.extend("Collection");
    var query = new Parse.Query(CollectionObject);
    query.notEqualTo("collectionName", "") // exclude collections w/ no name set
    query.find().then(function(results){
        // loop through each collection in the results (an array)
        for (i=0;i<results.length;++i) {
            var collection = results[i];
            renderCollectionThumbnail(collection);
        }
    });

    // if you want the popup to showup when page opens
    /*$('.image-link').magnificPopup({type:'image'});*/
});

// skateboard photo popup
$('.test-popup-link').magnificPopup({ 
  type: 'image'
    // other options
});

// form popup
$('.open-popup-link').magnificPopup({
  type:'inline',
  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});



function renderCollectionThumbnail(collectionModel) {
	var collectionTemplate = " \
    <div class='col-md-3 col-sm-6'> \
        <a href='images/gallery25-2.jpg' class='thumbnail test-popup-link'> \
            <h1 class='thumbnail-attribute thumbnail-name'><%= collectionName %></h1> \
            <h3 class='thumbnail-attribute thumbnail-type'><%= collectionType %></h3> \
            <h3 class='thumbnail-attribute thumbnail-count'>Items: 0</h3> \
            <p class='thumbnail-attribute thumbnail-desc'><%= collectionDesc %></p> \
            <p class='thumbnaile-attribute btnDeleteCollection'>Delete Me</p> \
        </a> \
        <div class='arrow'></div> \
    </div>"

    // Render the HTML using the model data and the handlebars template
    var collectionHTML = _.template(collectionTemplate, collectionModel.attributes);
    // Add the rendered collection to the container
    $("#collection-grid a.new-collection").parent().before(collectionHTML);
}

/*------------ Create New Collection ------------*/

$('#btnCreateCollection').click(function() {

    /* create a collection */
    var Collection = Parse.Object.extend("Collection");
    var collection = new Collection();

    /* save data from forms into the new collection */
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

    renderCollectionThumbnail(collection);

    //alert("You have successfully created\na new collection named " + thisCollectionName);

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

/*------------ Delete Collection ------------*/

$('.btnDeleteCollection').click(function() {

    /* create a collection */
    var Collection = Parse.Object.extend("Collection");
    var query = new Parse.Query(Collection);
    query.get("xWMyZ4YEGZ", {
      success: function(gameScore) {
        // The object was retrieved successfully.
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
      }
    });

    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.get("xWMyZ4YEGZ", {
      success: function(gameScore) {
        // The object was retrieved successfully.
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
      }
    });

    myObject.destroy({
      success: function(myObject) {
        // The object was deleted from the Parse Cloud.
      },
      error: function(myObject, error) {
        // The delete failed.
        // error is a Parse.Error with an error code and description.
      }
    });
     
    // Saves the field deletion to the Parse Cloud
    collection.save();

    renderCollectionThumbnail(collection);

    return false;
});