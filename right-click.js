var report_spam = chrome.contextMenus.create({
    "title": "Report Spam",
    "contexts": ["selection"],
    "onclick": sendToService
});

var detect_spam = chrome.contextMenus.create({
    "title": "Detect Spam",
    "contexts": ["selection"],
    "onclick": sendAndGet
});

function sendToService (info,tab){
    selectedWord=info.selectionText;
    var user = $.cookie('name')
    var SendInfo= {user: user,  tweet: selectedWord, label:"con_spam"};

    JSON.stringify(SendInfo)
    $.ajax({
        type: 'post',
        url: 'http://localhost:5000/detect_api/post_report',
        data: JSON.stringify(SendInfo),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            window.alert("Reported!")
        }
    });
}
function sendAndGet (info,tab){
    selectedWord=info.selectionText;
    var user = $.cookie('name')
    var SendInfo= { user: user, tweet: selectedWord, label:"Unknown"};
    JSON.stringify(SendInfo)
    $.ajax({
        type: 'post',
        url: 'http://localhost:5000/detect_api/post_detect',
        data: JSON.stringify(SendInfo),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            alert("Spam Detection:" + data['result'] +" Confidence Score: "+data['score'] + "%")
        }
    });
}