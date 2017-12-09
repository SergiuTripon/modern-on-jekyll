// search process

// variable to hold search error status
var searchHasError = false;

// check term while the user is typing
$("#term").on("change keyup", function(e) {
    var term = $('#term').val();
    if (e.keyCode != 9 && e.keyCode != 20) {
        if (term === '') {
            $("#icon-term-success").hide();
            $("#icon-term-fail").show();
            $("#text-term-fail").show();
        } else {
            $("#icon-term-fail").hide();
            $("#text-term-fail").hide();
            $("#icon-term-success").show();
        }
    }
});

// variable to hold search submit
var search_submit = $("#search-submit");
// variable to hold search form
var search_form = $("#form-search");

// on search submit click event
search_submit.click(function (e) {
    e.preventDefault();

    // change text on search submit
    search_submit.html('Working on it...');

    // check term is inputted
    var term = $('#term');
    var term_value = term.val();
    if (term_value === '') {
        $("#icon-term-success").hide();
        term.focus();
        $("#icon-term-fail").show();
        $("#text-term-fail").show();
        $('#search-submit').html('Send');
        searchHasError  = true;
        return false;
    } else {
        $("#icon-term-fail").hide();
        $("#text-term-fail").hide();
        $("#icon-term-success").show();
    }

    // if there are no errors, initialize the ajax call
    if(hasError == false) {
        // submit search form
        search_form.submit();
    }
});

// ------------------------------------------------------------------------------------------------------------------ //

// source: http://jekyll.tips/jekyll-casts/jekyll-search-using-lunr-js/
(function() {
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');
        var results_length = results.length;

        if (results.length) {
            var appendString =
                '<ol class="breadcrumb">' +
                '<li>Search results (' + results_length + ')</li>' +
                '</ol>';

            for (var i = 0; i < results.length; i++) {
                var item = store[results[i].ref];
                appendString +=
                    '<div class="panel panel-default panel-custom">' +
                    '<div class="panel-heading">' +
                    '<div class="panel-title">' +
                    '<h2><a href="' + item.url + '">' + item.title + '</a></h2>' +
                    '</div>' +
                    '</div>' +
                    '<div class="panel-body text-justify">';
                appendString +=
                    '<p>' + item.content.substring(0, 300) + '...</p>' +
                    '</div>' +
                    '</div>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML =
                '<ol class="breadcrumb">' +
                '<li>No results found</li>' +
                '</ol>';
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    var searchTerm = getQueryVariable('term');

    if (searchTerm) {
        document.getElementById('term').setAttribute("value", searchTerm);

        var idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('author');
            this.field('categories');
            this.field('tags');
            this.field('content');
        });

        for (var key in window.store) {
            idx.add({
                'id': key,
                'title': window.store[key].title,
                'author': window.store[key].author,
                'categories': window.store[key].categories,
                'tags': window.store[key].tags,
                'content': window.store[key].content
            });

            var results = idx.search(searchTerm);
            displaySearchResults(results, window.store);
        }
    }
})();