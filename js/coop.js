$(function() {

  // Objects for the menu categories and the relevant links.
  var menu_categories = ["Bagels, Muffins, Pastries", "Coop Meals", "Drinks", "From The Fryer",
    "Mexican", "Rice Bowls", "Salads", "Sandwiches"
  ];
  var menu_links = ["bagels-muffins-pastries.html", "#", "#", "#", "#", "#", "#", "#"];

  // Build our menu instead of hard-coding it in html.
  var buildMenu = function() {
    // Iterate through the categories, creating a list element for each.
    for (var i = 0; i < menu_categories.length; i++) {
      var li = $("<li>").addClass("table-view-cell");
      var a = $("<a>").addClass("navigate-right").attr("href", menu_links[i]);
      a.append(menu_categories[i]);
      li.append(a);
      $("#menu_categories").append(li);
    }
  };

  // If we're on the index with the menu_categories div, build the menu.
  if ($("#menu_categories")) {
    buildMenu();
  }

  // Build an e-mail to send for our order.
  var sendMail = function(item, total, extras) {

    // Empty string for our options.
    var message = "";

    // Build up our email message.
    message += "Your order is a " + item + ((extras.length > 0) ? " with " : "");

    // Add options to message.
    for (var i = 0; i < extras.length; i++) {
      // Add commas if multiple options.
      if (i < extras.length - 1) {
        message += extras[i] + ", ";
      } else {
        message += extras[i];
      }

    }
    message += ". Your total price is $" + total + ".";

    var link = "mailto:me@example.com?" + "&subject=" +
      encodeURIComponent("Coop Fountain Order") + "&body=" +
      encodeURIComponent(message);

    window.location.href = link;
  };

  // Add the order to tray on click.
  $('.order').click(function() {

    // Get the name of our item.
    var item = $(".content").attr("data-item");

    // Get the price from our data attribute.
    var base_price = $(".content").attr("data-plain");

    console.log(base_price);

    /// Get the checkboxes. 
    var list = $('.table-view-cell input:checkbox');

    // An array we'll use to save our options.
    var options = [];

    // Start building up our price. We parseFloat to get 
    // a decimal rather than a string.
    var price = parseFloat(base_price);

    // Save the options and prices of the checked boxes.
    for (var i = 0; i < list.length; i++) {

      // If the input is checked, add its value to our options array.
      if ($(list[i]).prop('checked')) {
        options.push($(list[i]).val());

        // We also get the price and add it to our total sum.
        price += parseFloat($(list[i]).attr("data-extra"));
      }
    }

    // Round to 2 decimal places.
    price = price.toFixed(2);

    // Call our send e-mail function.
    sendMail(item, price, options);

  });

});