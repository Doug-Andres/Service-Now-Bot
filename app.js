/*
    bot.on('contactRelationUpdate', function (message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Hello %s... Thanks for adding me.", name || 'there');
        bot.send(reply);
    }
}); // https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-handle-conversation-events?view=azure-bot-service-3.0



var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
//var rp = require('request-promise');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'c43d6db8-fe06-4f37-8f5a-575a0897629f',
    appPassword: '*K]))-.Agxl(VSni'
});


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});


// Listen for messages from users 
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Welcome to the RobertHalf project assistant!");
    session.send("Type: 'help' to get started");
})

// ServiceNow
bot.dialog('help', function (session) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel)
    msg.attachments([
        new builder.HeroCard(session)
            .title("ServiceNow")
            .subtitle("Pull all sorts of useful project data from ServiceNow.")
            .text("You can pull project specific data like the changes and tasks that you are assigned to.")
            .images([builder.CardImage.create(session, 'https://prdimpblob.blob.core.windows.net/partners/RES/solutions/images/servicenow.png')])
            .buttons([
                builder.CardAction.imBack(session, "Finding tasks...", "Tasks"),
                builder.CardAction.imBack(session, "Finding my changes...", "Changes"),
            ]),
        new builder.HeroCard(session)
            .title("Planview")
            .subtitle("Pull all sorts of useful project data from Planview.")
            .text("You can pull project specific data like budget metrics and time information.")
            .images([builder.CardImage.create(session, 'https://www.planview.com/wp-content/themes/planview-wp-theme/img/planview-logo-social-media-400x400.jpg')])
            .buttons([
                builder.CardAction.imBack(session, "Find my budget metrics", "Budget Metrics"),
                builder.CardAction.imBack(session, "Find my time information", "Time"),
            ]),
        new builder.HeroCard(session)
            .title("Project Online")
            .subtitle("Pull all sorts of useful project data from Project Online.")
            .text("You can pull project specific data like ...")
            .images([builder.CardImage.create(session, 'https://tvt.gallerycdn.vsassets.io/extensions/tvt/tvt-pjo/1.1.10/1486158998669/img/logo.png')])
            .buttons([
                builder.CardAction.imBack(session, "Find my project online info", "Project Online"),
            ]),
        new builder.HeroCard(session)
            .title("SharePoint")
            .subtitle("Pull all sorts of useful project data from SharePoint.")
            .text("You can pull project specific data like ...")
            .images([builder.CardImage.create(session, 'https://tigerware.lsu.edu/image/506741ef-e6b9-4f42-83b4-198ccc24d94f.png?preset=Full')])
            .buttons([
                builder.CardAction.imBack(session, "Find my SharePoint info", "SharePoint"),
            ])
            

    ]);
    session.send(msg).endDialog();
}).triggerAction({ matches: /^(help|list)/i });

// ServiceNow 'Task' button click function
bot.dialog('taskButtonClick', [
    function (session, args, next) {
        /*
        var open_changes = [];
        implement(open_changes)
            .then(result => review(result))
            .then(result => buildTaskLink(result))
            .then(result => task(result))
            .then(result => print(result));
        */

        //implement(open_changes).then(result => review(result)).then(result => session.send(result));               */


/*
        session.send("TASK BUTTON").endDialog();
    }   
]).triggerAction({ matches: /(Tasks|list)/i });

// ServiceNow 'Change' button click function
bot.dialog('changeButtonClick', [
    function (session, args, next) {
        console.log("CHANGE BUTTON");
        session.send("CHANGE BUTTON").endDialog();
    }   
]).triggerAction({ matches: /(Change|list)/i });

// Planview 'Budget' button click function
bot.dialog('budgetButtonClick', [
    function (session, args, next) {
        console.log("BUDGET BUTTON");
        session.send("BUDGET BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Budget|list)/i });

// Planview 'Time' button click function
bot.dialog('timeButtonClick', [
    function (session, args, next) {
        console.log("TIME BUTTON");
        session.send("TIME BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Time|list)/i });

// Project Online button click function
bot.dialog('projectButtonClick', [
    function (session, args, next) {
        console.log("PROJECT ONLINE BUTTON");
        session.send("PROJECT ONLINE BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Project|list)/i });

// SharePoint button click function
bot.dialog('sharepointButtonClick', [
    function (session, args, next) {
        console.log("SHAREPOINT BUTTON");
        session.send("SHAREPOINT BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Sharepoint|list)/i });

/******************************************************* 

function implement(param) {
    console.log('start implement');
    var implement_query_url = 'https://dev19152.service-now.com/api/now/table/change_request?sysparm_query=state%3D-1&sysparm_limit=10'; // need to change limit for production **
    var implement_data = [];

    var implement_options = {
        url: implement_query_url,
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        'auth': {
            'user': 'admin',
            'pass': '007146972Clyde$d@leRH',
            'sendImmediately':false
        }
    };
    
    // Return new promise 
    return new Promise(function(resolve, reject) {
        var implement_res = request.get(implement_options, function(err, response, body) { // get changes in implement state
            if (err) {
                console.log("ERROR", err);
                reject(err);
            } else {
                implement_data = JSON.parse(body);
                console.log(body);
                for (counter = 0; counter < implement_data.result.length; counter++ ) {
                    param.push(implement_data['result'][counter]['number']);
                    console.log('IMPLEMENT: ', implement_data['result'][counter]['number']); 
                    console.log(implement_data);
                }
                resolve(param);
            }
        }) 
    })
}


function review(param) {
    var review_query_url = 'https://dev19152.service-now.com/api/now/table/change_request?sysparm_query=state%3D0&sysparm_limit=10' // need to change limit for production **
    var review_data = [];

    var review_options = {
        url: review_query_url,
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        'auth': {
            'user': 'admin',
            'pass': '007146972Clyde$d@leRH',
            'sendImmediately':false
        }
    };
    
    // Return new promise 
    return new Promise(function(resolve, reject) {
        var review_res = request.get(review_options, function(err, response, body) { // get changes in review state
            if (err) {
                reject(err);
            } else {
                review_data = JSON.parse(body);
                for (counter = 0; counter < review_data.result.length; counter++ ) {
                    param.push(review_data['result'][counter]['number']);
                    console.log('review: ', review_data['result'][counter]['number']); 
                }
                resolve(param);
            }
        }) 
    })
}

function buildTaskLink(param) {
    var task_query_url_1 = 'https://dev19152.service-now.com/api/now/table/change_task?sysparm_query=number%3D';
    var task_query_url_2 = '&sysparm_limit=10'; // need to change limit for production
    var task_query_url;
    var complete_links = [];

    // param[counter]
    // 'CHG0030001'

    return new Promise(function(resolve, reject) {
        for (counter = 0; counter < param.length; counter++ ) {
            task_query_url = task_query_url_1 + param[counter] + task_query_url_2;
            console.log('LINK: ' + counter + ' - ' + task_query_url);
            complete_links.push(task_query_url);
        }
        resolve(complete_links);
    })
}

function task(param) { // PROBLEM IS IN THE TASK FUNCTION
    var task_data = [];
    var task_json;

    return new Promise(function(resolve, reject) {
        for (counter = 0; counter < param.length; counter++ ) {
            var options = {
                uri: param[counter],
                headers: {
                    'User-Agent': 'Request-Promise',
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                'auth': {
                    'user': 'admin',
                    'pass': '007146972Clyde$d@leRH',
                    'sendImmediately':false
                },
                json: true // Automatically parses the JSON string in the response
            };

            rp(options)
                .then(function (repos) {
                    //console.log(repos['result'][counter]['number']);
                    console.log(repos['result'][0]);
                    task_data.push(repos['result'][0]); 
                })
                .catch(function (err) {
                    console.log('No Task');
                })
        }
        resolve(task_data);
    })
}

function print(param) {
    return new Promise(function(resolve, reject) {
        console.log('Print Function');
        for (counter = 0; counter < param.length; counter++ ) {
            var data = JSON.parse(param[counter]);
            session.send('PARAM: '+ counter, ' ', data['result'][counter]);
            console.log('PARAM: '+ counter, ' ', data['result'][counter]); 
        }
        resolve(param);
    })
}
*/

var azure = require('botbuilder-azure'); 
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

var documentDbOptions = {
    host: 'https://dou.documents.azure.com:443/', 
    masterKey: 'Vg9bLvI5pXhI69QKzhrGnKsUeKLOuSDXajjtTEU7vfRhewiD30fuDxwRDed907UXaDyVqc6Xi4HuIiCnoPmQaQ==', 
    database: 'botdocs',   
    collection: 'botdata'
};

var docDbClient = new azure.DocumentDbClient(documentDbOptions);

var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Bot Framework Credentials
process.env.MICROSOFT_APP_ID = "c43d6db8-fe06-4f37-8f5a-575a0897629f";
process.env.MICROSOFT_APP_PASSWORD = "*K]))-.Agxl(VSni";

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
     session.send("Welcome to the RobertHalf project assistant!");
     session.send("Type: 'help' to get started");
    
     var user = message.user; 
     var name = message.user.name;
     session.send("User " + user);
     session.send("Name " + name);
})
.set('storage', cosmosStorage);

/*
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded && message.membersAdded.length > 0) {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Hello %s... !", name || 'there');
        bot.send(reply);
    } else if (message.membersRemoved) {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Goodbye %s... !", name || 'there');
        bot.send(reply);
    }
}); 
*/

// ServiceNow
bot.dialog('help', function (session) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel)
    msg.attachments([
        new builder.HeroCard(session)
            .title("ServiceNow")
            .subtitle("Pull all sorts of useful project data from ServiceNow.")
            .text("You can pull project specific data like the changes and tasks that you are assigned to.")
            .images([builder.CardImage.create(session, 'https://prdimpblob.blob.core.windows.net/partners/RES/solutions/images/servicenow.png')])
            .buttons([
                builder.CardAction.imBack(session, "Finding tasks...", "Tasks"),
                builder.CardAction.imBack(session, "Finding my changes...", "Changes"),
            ]),
        new builder.HeroCard(session)
            .title("Planview")
            .subtitle("Pull all sorts of useful project data from Planview.")
            .text("You can pull project specific data like budget metrics and time information.")
            .images([builder.CardImage.create(session, 'https://www.planview.com/wp-content/themes/planview-wp-theme/img/planview-logo-social-media-400x400.jpg')])
            .buttons([
                builder.CardAction.imBack(session, "Find my budget metrics", "Budget Metrics"),
                builder.CardAction.imBack(session, "Find my time information", "Time"),
            ]),
        new builder.HeroCard(session)
            .title("Project Online")
            .subtitle("Pull all sorts of useful project data from Project Online.")
            .text("You can pull project specific data like ...")
            .images([builder.CardImage.create(session, 'https://tvt.gallerycdn.vsassets.io/extensions/tvt/tvt-pjo/1.1.10/1486158998669/img/logo.png')])
            .buttons([
                builder.CardAction.imBack(session, "Find my project online info", "Project Online"),
            ]),
        new builder.HeroCard(session)
            .title("SharePoint")
            .subtitle("Pull all sorts of useful project data from SharePoint.")
            .text("You can pull project specific data like ...")
            .images([builder.CardImage.create(session, 'https://tigerware.lsu.edu/image/506741ef-e6b9-4f42-83b4-198ccc24d94f.png?preset=Full')])
            .buttons([
                builder.CardAction.imBack(session, "Find my SharePoint info", "SharePoint"),
            ])
            

    ]);
    session.send(msg).endDialog();
}).triggerAction({ matches: /^(help|list)/i });

// ServiceNow 'Task' button click function
bot.dialog('taskButtonClick', [
    function (session, args, next) {
        session.send("TASK BUTTON").endDialog();
        var open_changes = [];
        /*
        implement(open_changes)
            .then(result => review(result))
            .then(result => buildTaskLink(result))
            .then(result => task(result))
            .then(result => print(result));
        */

        implement(open_changes).then(result => review(result)).then(result => session.send(result));               
    }   
]).triggerAction({ matches: /(Tasks|list)/i });
// ServiceNow 'Change' button click function
bot.dialog('changeButtonClick', [
    function (session, args, next) {
        console.log("CHANGE BUTTON");
        session.send("CHANGE BUTTON").endDialog();
    }   
]).triggerAction({ matches: /(Change|list)/i });
// Planview 'Budget' button click function
bot.dialog('budgetButtonClick', [
    function (session, args, next) {
        console.log("BUDGET BUTTON");
        session.send("BUDGET BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Budget|list)/i });
// Planview 'Time' button click function
bot.dialog('timeButtonClick', [
    function (session, args, next) {
        console.log("TIME BUTTON");
        session.send("TIME BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Time|list)/i });
// Project Online button click function
bot.dialog('projectButtonClick', [
    function (session, args, next) {
        console.log("PROJECT ONLINE BUTTON");
        session.send("PROJECT ONLINE BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Project|list)/i });
// SharePoint button click function
bot.dialog('sharepointButtonClick', [
    function (session, args, next) {
        console.log("SHAREPOINT BUTTON");
        session.send("SHAREPOINT BUTTON").endDialog()
    }   
]).triggerAction({ matches: /(Sharepoint|list)/i });
/*******************************************************/ 
function implement(param) {
    console.log('start implement');
    var implement_query_url = 'https://dev19152.service-now.com/api/now/table/change_request?sysparm_query=state%3D-1&sysparm_limit=10'; // need to change limit for production **
    var implement_data = [];
    var implement_options = {
        url: implement_query_url,
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        'auth': {
            'user': 'admin',
            'pass': '007146972Clyde$d@leRH',
            'sendImmediately':false
        }
    };
    
    // Return new promise 
    return new Promise(function(resolve, reject) {
        var implement_res = request.get(implement_options, function(err, response, body) { // get changes in implement state
            if (err) {
                console.log("ERROR", err);
                reject(err);
            } else {
                implement_data = JSON.parse(body);
                console.log(body);
                for (counter = 0; counter < implement_data.result.length; counter++ ) {
                    param.push(implement_data['result'][counter]['number']);
                    console.log('IMPLEMENT: ', implement_data['result'][counter]['number']); 
                    console.log(implement_data);
                }
                resolve(param);
            }
        }) 
    })
}
function review(param) {
    var review_query_url = 'https://dev19152.service-now.com/api/now/table/change_request?sysparm_query=state%3D0&sysparm_limit=10' // need to change limit for production **
    var review_data = [];
    var review_options = {
        url: review_query_url,
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        'auth': {
            'user': 'admin',
            'pass': '007146972Clyde$d@leRH',
            'sendImmediately':false
        }
    };
    
    // Return new promise 
    return new Promise(function(resolve, reject) {
        var review_res = request.get(review_options, function(err, response, body) { // get changes in review state
            if (err) {
                reject(err);
            } else {
                review_data = JSON.parse(body);
                for (counter = 0; counter < review_data.result.length; counter++ ) {
                    param.push(review_data['result'][counter]['number']);
                    console.log('review: ', review_data['result'][counter]['number']); 
                }
                resolve(param);
            }
        }) 
    })
}
function buildTaskLink(param) {
    var task_query_url_1 = 'https://dev19152.service-now.com/api/now/table/change_task?sysparm_query=number%3D';
    var task_query_url_2 = '&sysparm_limit=10'; // need to change limit for production
    var task_query_url;
    var complete_links = [];
    // param[counter]
    // 'CHG0030001'
    return new Promise(function(resolve, reject) {
        for (counter = 0; counter < param.length; counter++ ) {
            task_query_url = task_query_url_1 + param[counter] + task_query_url_2;
            console.log('LINK: ' + counter + ' - ' + task_query_url);
            complete_links.push(task_query_url);
        }
        resolve(complete_links);
    })
}
function task(param) { // PROBLEM IS IN THE TASK FUNCTION
    var task_data = [];
    var task_json;
    return new Promise(function(resolve, reject) {
        for (counter = 0; counter < param.length; counter++ ) {
            var options = {
                uri: param[counter],
                headers: {
                    'User-Agent': 'Request-Promise',
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                'auth': {
                    'user': 'admin',
                    'pass': '007146972Clyde$d@leRH',
                    'sendImmediately':false
                },
                json: true // Automatically parses the JSON string in the response
            };
            rp(options)
                .then(function (repos) {
                    //console.log(repos['result'][counter]['number']);
                    console.log(repos['result'][0]);
                    task_data.push(repos['result'][0]); 
                })
                .catch(function (err) {
                    console.log('No Task');
                })
        }
        resolve(task_data);
    })
}
function print(param) {
    return new Promise(function(resolve, reject) {
        console.log('Print Function');
        for (counter = 0; counter < param.length; counter++ ) {
            var data = JSON.parse(param[counter]);
            session.send('PARAM: '+ counter, ' ', data['result'][counter]);
            console.log('PARAM: '+ counter, ' ', data['result'][counter]); 
        }
        resolve(param);
    })
}
