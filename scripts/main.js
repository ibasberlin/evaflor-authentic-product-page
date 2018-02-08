$(function () {
    $(".navbar-toggler").click(function () {
        $("nav.navbar").toggleClass("navbar-opened");
        if ($("nav.navbar").hasClass("navbar-opened")) {
            $(".languages-container").hide();
        } else {
            $(".languages-container").show();
        }
    });
    var products = [
        '<img src="../images/double.png" alt="" srcset="">',
        '<img src="../images/black.png" alt="" srcset="">',
        '<img src="../images/origin.png" alt="" srcset="">',
        '<img src="../images/red.png" alt="" srcset="">',
        '<img src="../images/silver.png" alt="" srcset="">',
        '<img src="../images/sport.png" alt="" srcset="">',
        '<img src="../images/vintage.png" alt="" srcset="">',
        '<img src="../images/whisky.png" alt="" srcset="">'
    ];
    var jackpot = new Jackpot("jackpot-machine", products);
    jackpot.init();

    $("#play-jackpot").click(function () {
        jackpot.spinAll();

        // $(this).animate({
        //     marginTop: "50px"
        // }, 1000);
    });
});

function Jackpot(id, products) {
    var that = this;

    this.time = 6500; //time in millis for a spin to take	
    this.howManySymbolsToAppend = Math.round(this.time / 325); //how many symbols each spin adds
    this.endingLocation = 7;
    this.products = products;
    this.container = $("#" + id);
    this.sliders = [];
    this.reelCount = 3;
    that.height = 91;

    this.init = function () {
        for (var i = 0; i < this.reelCount; i++) {
            var col4 = $('<div class="col-4"></div>');
            var slider = $('<div class="roulette"></div>');

            col4.append(slider);

            this.addSymbolsToStrip(slider, true);

            this.container.append(col4);
            this.sliders.push(slider);
        }
    };

    this.addSymbolsToStrip = function (slider, isOnInit) {
        var slots = this.products;
        var chosen = Math.floor(Math.random() * slots.length);

        for (var i = 0; i < that.howManySymbolsToAppend; i++) {
            var ctr = (i === this.endingLocation) ? chosen : Math.floor(Math.random() * products.length);

            //we nest "content" inside of "symbol" so we can do vertical and horizontal centering more easily
            var image = $(products[ctr]);
            var slot = $("<div class='slot'></div>");
            if (i === 0 && isOnInit) {
                slot.css({
                    "margin-top": "-55px"
                });
            }
            slot.append(image);
            slider.append(slot);
        }

        return chosen;
    };

    this.spinAll = function () {
        var results = [];
        for (var i = 0; i < this.reelCount; i++) {
            results.push(that.spinOne(that.sliders[i]));
        }

        return results;
    };

    this.spinOne = function (slider) {
        var heightBefore = parseInt(slider.css("height"), 10);
        var chosen = that.addSymbolsToStrip(slider, false);
        var marginTop = -(heightBefore + ((that.endingLocation) * that.height) + 28);
        slider.stop().animate({
            marginTop: marginTop + "px"
        }, {
            'duration': that.time + Math.round(Math.random() * 1000),
            'easing': "easeOutElastic"
        });
        return chosen;
    };
}