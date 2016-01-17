/*global $:false, _:false */
(function() {
  'use strict';

  var selectSign = function(problemType) {
    var types = ['add', 'sub'];
    if (problemType === 'both') {
      problemType = types[_.random(1)]; 
    }
    if (problemType === 'add') return '+';
    else return '-';
  }

  var regenerate = function() {
    var maxNumber = $('#maxnumber').val();
    var problemCount = $('#problemcount').val();
    var problemType = $('#problemtype').val();

    $('.problems').empty();
    var compiled = _.template('<section class="problem">' +
                              '<div class="topnumber number">' +
                              '<%- topNumber %></div>' +
                              '<div class="bottom">' +
                              '<div class="sign">' +
                              '<%- sign %></div>' +
                              '<div class="bottomnumber number">' +
                              '<%- bottomNumber %></div>' +
                              '</section>');
    var seen = [];
    var topNumber, bottomNumber;
    var duped, tries;
    var zeroCount = 0, oneCount = 0;
  
    for (var index = 0; index < problemCount; index++) {
      duped = true;
      tries = 0;
      while (duped !== null && tries < 10) {
        topNumber = _.random(0, maxNumber);
        bottomNumber = _.random(0, maxNumber - topNumber);
        // Dupe check - don't want to duplicate problems
        duped = _.result(_.find(seen, [topNumber, bottomNumber]), null);
        // Limit the number of problems that involve 0 or 1
        if (topNumber === 0 || bottomNumber === 0) {
          zeroCount++;
          if (zeroCount >= 3) {
            duped = true;
          }
        }
        if (topNumber === 1 || bottomNumber === 1) {
          oneCount++;
          if (oneCount >= 3) {
            duped = true;
          }
        }
        tries++;
      }
      var selectedSign = selectSign(problemType);
      if (selectedSign === '-' && bottomNumber > topNumber) {
        var tmp = bottomNumber;
        bottomNumber = topNumber;
        topNumber = tmp;
      }
      seen.push([topNumber, bottomNumber]); 
      var compiledHTML = compiled(
        {'topNumber': topNumber,
         'bottomNumber': bottomNumber,
         'sign' : selectedSign});
      $('.problems').append(compiledHTML);
    }
  };

  $( document ).ready(function() {
    regenerate();

    $('#regen').click(regenerate);
  });
}());
