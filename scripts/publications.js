//This script is the REST API connection to the backend
//Only works for logged in users

//Get the data from the clicked element
//Each <a> element has an ID tag with the mongo ID

//On edit button click

const resetFields = () => {
    $('.publication-number-input').val("");
    $('.publication-title-input').val("");
    $('.publication-description-input').val("");
    $('.publication-author-input').val("");
    $('.publication-date-input').val("");
    $('.publication-imagePath-input').val("");
    $('.publication-imagePreview').attr('src', "");
    $('.publication-imageDescription-input').val("");
    $('.publication-doi-link-input').val("");
    $('.publication-pmcid-link-input').val("");
    $('.publication-doi-title-input').val("");
    $('.publication-pmcid-title-input').val("");
    $('.selectpicker').selectpicker('deselectAll');
};

$('.add-publication').click(() => {
    resetFields();
    $('.modal-title').text("Add Publication");
});



let mongoID = "";

$(".list-group").on("click", ".edit-button", function (event) {
    event.preventDefault();

    $('.modal-title').text("Edit Publication");
    //Turn add button into save button
    $('.add-button').css("display", "none");
    $('.save-button').css("display", "");

    let number = ($(this).attr("number"));
    console.log(number);
    //Get the whole publication DOM element
    const publication = 'div[number=\"' + number + '\"]';
    //Get publication mongoID
    mongoID = $(publication).attr("id");
    console.log(mongoID);
    $.get(`/publications/get/${mongoID}`, {}, (data) => {
        console.log(data);
        //Load our fields with the data
        $('.publication-number-input').val(data.number);
        $('.publication-title-input').val(data.title);
        $('.publication-description-input').val(data.description);
        $('.publication-author-input').val(data.authors);
        $('.publication-date-input').val(data.date);
        $('.publication-imagePath-input').val(data.imagePath);
        $('.publication-imagePreview').attr('src', data.imagePath);
        $('.publication-imageDescription-input').val(data.imageDescription);
        $('.publication-doi-link-input').val(data.dlink);
        $('.publication-pmcid-link-input').val(data.plink);
        $('.publication-doi-title-input').val(data.doi);
        $('.publication-pmcid-title-input').val(data.pmcid);
        $('.selectpicker').selectpicker('val', data.tags);
    });
});

$('.save-button').click(() => {
    //Get current info from fields
    jsonString = {
        number: $('.publication-number-input').val(),
        title: $('.publication-title-input').val(),
        description: $('.publication-description-input').val(),
        authors: $('.publication-author-input').val(),
        date: $('.publication-date-input').val(),
        imagePath: $('.publication-imagePath-input').val(),
        imageDescription: $('.publication-imageDescription-input').val(),
        dlink: $('.publication-doi-link-input').val(),
        plink: $('.publication-pmcid-link-input').val(),
        doi: $('.publication-doi-title-input').val(),
        pmcid: $('.publication-pmcid-title-input').val(),
        tags: $('.selectpicker').val()
    };
    if (!jsonString.pmcid){

    }
    console.log(jsonString)
    //Update info in DB
    $.ajax({
        url: `/publications/update/${mongoID}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(jsonString),
        success: (code) => {
            if (code==='success'){
                location.reload();
            }
        }
    });
    resetFields();
});





$(".list-group").on("click", ".delete-button", function (event) {
        
    const number = ($(this).attr("number"));
    const publication = 'div[number=\"' + number + '\"]';
    const mongoID = $(publication).attr("id");
    console.log(mongoID)
    $.ajax({
        url: `publications/delete/${mongoID}`,
        type: 'DELETE',
        contentType: 'application/json',
        success: (code) => {
            if (code==='success'){
                location.reload();
            }
        }
    });  
});

$('.add-button').click(() => {
    const jsonString = {
        number: $('.publication-number-input').val(),
        title: $('.publication-title-input').val(),
        description: $('.publication-description-input').val(),
        authors: $('.publication-author-input').val(),
        link: $('.publication-link-input').val(),
        date: $('.publication-date-input').val(),
        imagePath: $('.publication-imagePath-input').val(),
        imageDescription: $('.publication-imageDescription-input').val(),
        dlink: $('.publication-doi-link-input').val(),
        plink: $('.publication-pmcid-link-input').val(),
        doi: $('.publication-doi-title-input').val(),
        pmcid: $('.publication-pmcid-title-input').val(),
        tags: $('.selectpicker').val()
    };
    $.ajax({
        url: '/publications/add',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonString),
        success: (code) => {
            if (code==='success'){
                location.reload();
            }
        }
    });
    resetFields();

});


$('#exampleModal').on('hidden.bs.modal', () => {
    resetFields();
});

//Set selection
$(".dropdown-menu-sort a").click(function(){
    console.log("CLICKED");
    $(".dropdown-sort").text("Show Year: " + $(this).text());
});

//Sorting
$(".all-dates").click(() => {
    reset();
});

const reset = () => {
    $('.pub-date').each( (index, value) => {
        value.parentElement.parentElement.parentElement.parentElement.style.display = "";
    });
};

$(".2021").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        console.log(value.textContent);
        if (value.textContent != 2021){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2020").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        console.log(value.textContent);
        if (value.textContent != 2020){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2019").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        console.log(value.textContent);
        if (value.textContent != 2019){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2018").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2018){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2017").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2017){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2016").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2016){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2015").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2015){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2014").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2014){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2013").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2013){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2012").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2012){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2011").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2011){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".2010").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent != 2010){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".older").click(() => {
    reset();
    $('.pub-date').each( (index, value) => {
        console.log(value.parentElement.parentElement.parentElement.parentElement);
        if (value.textContent >= 2010){
            value.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

$(".select-all").on('click', () => {
    $('.selectpicker').selectpicker('selectAll');
})
$(".deselect-all").on('click', () => {
    $('.selectpicker').selectpicker('deselectAll');
})

$(".add-tag").on('click', () => {
    let tagName = $('.publication-tag-input').val()
    console.log(tagName);
    $.ajax({
        url: '/publications/newtag',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({name: tagName}),
        success: (code) => {
            if (code === 'success'){
                $('.publication-tag-input').val('');
                $('.selectpicker').append(`<option>${tagName}</option>`)
                $('.selectpicker').selectpicker('refresh');
            }
        }
    });
})