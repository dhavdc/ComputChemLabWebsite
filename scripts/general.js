const DRUG_DESIGN_DESCRIPTION =
    `We demonstrated that CpHMD can be used to significantly \
advance structure-based drug design, beyond pH-dependent \
structure-function relationships and protein-ligand binding.
`;

const PKA_CALCULATIONS =
    `
Predict pKa Values and Protonation States for Dynamical Systems
`;

const CHANNEL_TRANSPORTERS =
    `
The extension of the hybrid-solvent CpHMD for transmembrane \
proteins has opened a door for obtaining previously unattainable \
insights into biological proton/ion transport. To pave the way, \
we demonstrated that CpHMD can directly reveal the atomic details \
of the pH-dependent conformational transitions of a proton channel, \
an antiporter, and a multi-drug efflux pump.
`;

const MATERIAL_DESIGN =
    `
Our materials projects were motivated by questions from our partners \
in industry and engineering. For example, knowledge of the pKa’s of \
surfactants in various environments would be valuable for detergent \
formulation; however, the lack of structure makes the problem extremely \
challenging if possible at all for traditional structure-based continuum \
methods. We published the first study showing that the pKa's of surfactant \
micelles can be accurately calculated using hybrid-solvent CpHMD. Later, we \
also published the first study that calculates surfactant phase transition pKa’s. \
More recently, we extended the method to study self-assembly and dynamics of \
polysaccharide-based hydrogels using all-atom CpHMD. 
`;

$(document).ready(function () {

    //Show toast after adding application
    if (window.location.hash == "#add") {
        console.log("TEST");
        $.toast({
            text: "<h2>Publication Succesfully Added</h2> ",
            showHideTransition: 'slide', // It can be plain, fade or slide
            bgColor: 'white',
            loaderBg: 'green', // Background color for toast
            textColor: 'green',
            textAlign: 'center', // text color
            allowToastClose: false, // Show the close button or not
            hideAfter: 5000, // `false` to make it sticky or time in miliseconds to hide after
            stack: 5,
            position: {
                top: '0',
                bottom: '-',
                left: '-',
                right: '0'
            } // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        });
        window.location.hash = '';
    }

    $('.add-button').click(() => {
        window.location.hash = 'add';
        const jsonString = {
            title: $('.publication-title-input').val(),
            description: $('.publication-description-input').val(),
            authors: $('.publication-author-input').val(),
            link: $('.publication-link-input').val(),
            date: $('.publication-date-input').val(),
            imagePath: $('.publication-imagePath-input').val(),
            imageDescription: $('.publication-imageDescription-input').val()
        };
        $.ajax({
            url: '/publications/add',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonString),
            success: location.reload()

        });
    });

    //Delete functionality on each publication
    $(".list-group").on("click", ".delete-button", function (event) {
        number = ($(this).attr("number"));
        const publication = 'a[number=\"' + number + '\"]';
        const ID = $(publication).attr("id");
        console.log(ID);
        $.ajax({
            url: `publications/delete/${ID}`,
            type: 'DELETE',
            contentType: 'application/json',
            success: location.reload()
        });
    });
    //Edit functionality on each publication
    $(".list-group").on("click", ".edit-button", function (event) {
        event.preventDefault();
        $('.modal-title').text("Edit Publication");
        $('.add-button').css("display", "none");
        $('.save-button').css("display", "");
        number = ($(this).attr("number"));
        const publication = 'a[number=\"' + number + '\"]';
        const title = $(publication + " .pub-title").text();
        const description = $(publication + " .pub-description").text();
        const link = $(publication).attr("href");
        const authors = $(publication + " .pub-authors").text();
        const date = $(publication + " .pub-date").text();
        const imagePath = $(publication + " .pub-img").attr("src");
        const imageDescription = $(publication + " .pub-img-description").text();
        $('.publication-title-input').val(title);
        $('.publication-description-input').val(description);
        $('.publication-author-input').val(authors);
        $('.publication-link-input').val(link);
        $('.publication-date-input').val(date);
        $('.publication-imagePath-input').val(imagePath);
        $('.publication-imageDescription-input').val(imageDescription);


        $('.save-button').click(() => {
            let mongooseID = $(publication).attr("id");
            jsonString = {
                title: $('.publication-title-input').val(),
                description: $('.publication-description-input').val(),
                authors: $('.publication-author-input').val(),
                link: $('.publication-link-input').val(),
                date: $('.publication-date-input').val(),
                imagePath: $('.publication-imagePath-input').val(),
                imageDescription: $('.publication-imageDescription-input').val()
            };
            //Update request
            $.ajax({
                url: `/publications/update/${mongooseID}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(jsonString),
                success: location.reload()
            });



            $('#exampleModal').on('hidden.bs.modal', function () {
                $('.add-button').css("display", "");
                $('.save-button').css("display", "none");
                $('.publication-title-input').val("");
                $('.publication-description-input').val("");
                $('.publication-author-input').val("");
                $('.publication-link-input').val("");
                $('.publication-imagePath-input').val("");
                $('.publication-imageDescription-input').val("");
            });
        });

        $('.close-button').click(() => {
            console.log("clicked from list");
            $('#exampleModal').on('hidden.bs.modal', function () {
                $('.add-button').css("display", "");
                $('.save-button').css("display", "none");
                $('.publication-title-input').val("");
                $('.publication-description-input').val("");
                $('.publication-author-input').val("");
                $('.publication-link-input').val("");
                $('.publication-imagePath-input').val("");
                $('.publication-imageDescription-input').val("");
            });
        });
    });

    //Set selection
    $(".dropdown-menu-sort a").click(function () {
        console.log("CLICKED");
        $(".dropdown-sort").text("Show Year: " + $(this).text());
    });

    //Sorting
    $(".all-dates").click(() => {
        reset();
    });

    const reset = () => {
        $('.pub-date').each((index, value) => {
            value.parentElement.parentElement.parentElement.parentElement.style.display = "";
        });
    };

    $(".2019").click(() => {
        reset();
        $('.pub-date').each((index, value) => {
            console.log(value.parentElement.parentElement.parentElement.parentElement);
            console.log(value.textContent);
            if (value.textContent != 2019) {
                value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            }
        });
    });

    $(".2018").click(() => {
        reset();
        $('.pub-date').each((index, value) => {
            console.log(value.parentElement.parentElement.parentElement.parentElement);
            if (value.textContent != 2018) {
                value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            }
        });
    });

    $(".2017").click(() => {
        reset();
        $('.pub-date').each((index, value) => {
            console.log(value.parentElement.parentElement.parentElement.parentElement);
            if (value.textContent != 2017) {
                value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            }
        });
    });

    $(".2016").click(() => {
        reset();
        $('.pub-date').each((index, value) => {
            console.log(value.parentElement.parentElement.parentElement.parentElement);
            if (value.textContent != 2016) {
                value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            }
        });
    });

    $(".older").click(() => {
        reset();
        $('.pub-date').each((index, value) => {
            console.log(value.parentElement.parentElement.parentElement.parentElement);
            if (value.textContent >= 2016) {
                value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            }
        });
    });

    const $nav = $('.jump-nav'); //Caching element
    // hide .navbar first - you can also do this in css .nav{display:none;}
    $nav.hide();

    // fade in .navbar
    $(function () {
        $(window).scroll(function () {
            // set distance user needs to scroll before we start fadeIn
            if ($(this).scrollTop() > $nav.height()) { //For dynamic effect use $nav.height() instead of '100'
                $nav.fadeIn();
            } else {
                $nav.hide();
            }
        });
    });
    /* Set the width of the side navigation to 250px */
    

});