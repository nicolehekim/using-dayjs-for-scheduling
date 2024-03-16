// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
  
  var currentHour = dayjs().format('H');

  function colorBlock() {
    $('.time-block').each(function() {
      const hourBlock = parseInt(this.id);

      $(this).toggleClass('past', hourBlock < currentHour);
      $(this).toggleClass('present', hourBlock === currentHour);
      $(this).toggleClass('future', hourBlock > currentHour);
    });
  }

  function saveText() {
    $('#saveIcon').on('click', function () {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  function updateColor() {
    $('.time-block').each(function () {
      var hourBlock = parseInt(this.id);
      if (hourBlock == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (hourBlock < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else {
        $(this).removeClass('present past').addClass('future');
      }
    });
  }

  function updateTime() {
    var dateRN = $('#date');
    var timeRN = $('#time');
    var todaysDate = dayjs().format('dddd, MMMM D, YYYY');
    var currentTime = dayjs().format('hh:mm:ss A');
    dateRN.text(todaysDate);
    timeRN.text(currentTime);
  }
  colorBlock();
  saveText();
  updateColor();
  setInterval(updateTime, 1000);
  });