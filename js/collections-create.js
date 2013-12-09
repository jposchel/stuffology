// ---------------- collections-create.js -----------------


$(document).ready(function(){
    // code in here will be excuted once the page has loaded

    // set our Parse keys
    Parse.initialize("FPOlmLXJUEua1HOYMHHN8TPCvtlouzpj9LSzjMh0", "bh2d38avzROSyB9JzQa68tVtu3VnhZcXsdbTejl9");

    // This is the HTML template for a collection item
    // The template system is called handlebars and provdide by underscore.js
    // See here for more info: http://underscorejs.org/#template
    var collectionTemplate = " \
    <div class='col-md-3 col-sm-6 collection-item <%= collectionType %>'> \
        <a href='#' class='thumbnail collection-button existing-collection'> \
            <h1 class='thumbnail-attribute thumbnail-name'><%= collectionName %></h1> \
            <h3 class='thumbnail-attribute thumbnail-type'><%= collectionType %></h3> \
            <h3 class='thumbnail-attribute thumbnail-count'>Items: 0</h3> \
            <p class='thumbnail-attribute thumbnail-desc'><%= collectionDesc %></p> \
        </a> \
    </div> \
    <div class='arrow'></div>"

    // ----------------- original template -----------------
    /*var collectionTemplate = " \
    <div class='col-md-3 col-sm-6 collection-item <%= collectionType %>'> \
        <a href='#' class='thumbnail collection-button existing-collection'> \
            <h1 class='collection-name'><%= collectionName %></h1> \
            <h1 class='thumbnail-attribute thumbnail-name'><%= collectionName %></h1> \
            <h3 class='item-count'><%= collectionType %></h3> \
            <p class='edit-link'><%= collectionDesc %></p> \
        </a> \
    </div> \
    <div class='arrow'></div>"*/

    /*------------ Load the collections from Parse ------------*/
    var CollectionObject = Parse.Object.extend("Collection");
    var query = new Parse.Query(CollectionObject);
    query.notEqualTo("collectionName", "") // exclude collections w/ no name set
    query.find().then(function(results){
        // loop through each collection in the results (an array)
        for (i=0;i<results.length;++i) {
            var collection = results[i];
            // Render the HTML using the model data and the handlebars template
            var collectionHTML = _.template(collectionTemplate, collection.attributes);
            // Add the rendered collection to the container
            $("#collection-grid").append(collectionHTML);
        }
    });

});

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