$(document).ready(function(){
    // code in here will be excuted once the page has loaded

    // set our Parse keys
    Parse.initialize("FPOlmLXJUEua1HOYMHHN8TPCvtlouzpj9LSzjMh0", "bh2d38avzROSyB9JzQa68tVtu3VnhZcXsdbTejl9");

    // This is the HTML template for a collection item
    // The template system is provdide by underscore.js
    // See here for more info: http://underscorejs.org/#template
    var collectionTemplate = " \
    <div class='col-md-3 col-sm-6 collection-item <%= collectionType %>'> \
        <a href='#' class='thumbnail'> \
            <h1><%= collectionName %></h1> \
            <h3><%= collectionType %></h3> \
            <p><%= collectionDesc %></p> \
        </a> \
    </div>"

    // Load the collections from Parse
    var CollectionObject = Parse.Object.extend("Collection");
    var query = new Parse.Query(CollectionObject);
    query.notEqualTo("collectionName", "") // exclude collections w/ no name set
    query.find().then(function(results){
        // loop through each colleciton in the results
        for (i=0;i<results.length;++i) {
            var collection = results[i]
            // Render the HTNL using the model data and the handlebars template
            var collectionHTML = _.template(collectionTemplate, collection.attributes)
            // Add the rendered collection to the container
            $("#collection-grid").append(collectionHTML);
        }
    });

});