

//Team Info Constants
const team = {
    jana:{
        name: "Jana Shen, Ph.D.",
        title: "Principle Investigator",
        description: "Dipl-Chem, Bergische Universität Wuppertal, Germany "+
        "MS Theoretical Chemistry, University of Calgary, Canada "+
        "PhD Physical Chemistry, University of Minnesota "+
        "Postdoc, The Scripps Research Institute"
    },
    robert:{
        name: "Robert Harris, Ph.D.",
        title: "Senior Postdoc Fellow",
        description: "BS Physics, Florida State University "+
        "PhD Physics, Florida State University"
    },
    paween:{
        name: "Paween Mahinthichaichan",
        title: "Postdoctoral Fellow",
        description: "BS Biochemistry, University of California, Riverside "+
        "PhD Biochemistry, University of Illinois, Urbana-Champaign"
    },
    jack:{
        name: "Jack Henderson",
        title: "PhD Student",
        description: "BS Chemistry, University of Colorado at Denver"
    },
    neha:{
        name: "Neha Verma, Ph.D.",
        title: "Postdoc Fellow",
        description: "BS Pharmacy, Gautam Buddh Technical University, India "+
        "MS Pharmacoinformatics, NIPER Mohali, India "+
        "PhD Pharm. Chemie, Heinrich-Heine-Universität Düsseldorf, Germany "
    },
    quynh:{
        name: "Quynh Vo, Ph.D.",
        title: "FDA ORISE Fellow",
        description: "BS Chemical Engineering, California State Polytechnical University, Pamona"+
        "PhD Chemical Engineering, University of California, Irvine"
    },
    ronald:{
        name: "Ronald Kasl",
        title: "Senior System Administrator",
        description: "TBS Information System, Las Positas College "+
        "MS Philosophy, University of California Berkeley"
    },
    daniel:{
        name: "Daniel Khavrutskii",
        title: "Undergraduate Research Intern",
        description: "BS Computer Science, University of Maryland Baltimore County, 2023"
    },
    sidath:{
        name: "Sidath",
        title: "Undergraduate Research Intern",
        description: "This is Sidath"
    },
};

openLeftNav = (member) => {
    $("#mySidenav").css({width: "25%"});
    $(".name").text(team[member].name);
    $(".title").text(team[member].title);
    $(".description").text(team[member].description);

    console.log(member);
};
closeLeftNav = () => {
    $("#mySidenav").css({width: "0"});
};

openRightNav = (member) => {
    $("#mySidenav2").css({width: "25%"});
    $(".name").text(team[member].name);
    $(".description").text(team[member].description);
    console.log(member);
};
closeRightNav = () => {
    $("#mySidenav2").css({width: "0"});
};



$(".row").on("mouseover", "img", function (event) {
    const member = ($(this).attr("member"));
    openLeftNav(member);
    openRightNav(member);
});
$(".row").on("mouseout", "img", function (event) {
    closeLeftNav();
    closeRightNav();
});

