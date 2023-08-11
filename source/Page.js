var fps = new FramerateLoop();
var timedHandler = new TimedEvents(fps);
var shuffle = 
[
    "isn't it like the " + Math.floor(Math.random() * 1000) + "th time already???",
    "shits gonna take 10 years to be fixed",
    "placeholder",
    "changelog: its broken",
    "this shit took me 2 whole days",
    "soon...",
    "Haxe code ported to JS what???",
    "helppppppp",
    "i hate this so much",
    "Coming from CutsceneHandler.hx from Psych Engine",
    "give me ideas on what the fuck should i add here",
    "another placeholder",
    "ran out of ideas",
    "took me months to build this page",
    "i lost all of my progress thanks to codespaces retention limit",
    "this is even better actually",
    "the fuck",
    "how did it break now",
    "this error was hardcoded actually",
    "might need something better eventually",
    "empty",
    "please stop",
    "no",
    "arriba españa",
    "i agree",
    "i am probably doing a mess right now",
    "maybe im fucking up the code",
    "i MIGHT be doing something wrong",
    "SanicBTW owner of this bullshit",
    "xhyabunny is thicc",
    "bonndubz on all socials (except on twitter because twitter sucks)",
    "@TwtBonn on twitter",
    "my guy promotin its twitter on my page tf",
    "yeah i took this idea from sanic",
    "?",
    "Visual Studio sucks",
    'TOO MUCH ON THE LIST',
    'please have mercy',
    'oh god.',
    'not again-',
    'bruh',
    'fr?',
    ':skull:',
    'insert cringe ahh text',
    'please end with this',
    '*hammer and screwdriver sounds*',
    'im a slave of my own goals, please take me outside',
    'i need to see sunlight',
    'some day i will actually go outside, i swear',
    'yes.',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'webpage forked from sanic lmao sorry g',
    'fml',
    'i love js',
    'i hate js',
    'i love cs', 
    'i hate cs',
    'i love html',
    'i hate html',
    'i love u',
    'i hate u',
    'jk, or was i..',
    'm',
    'a',
    'b',
    'KFDJGIKDHPRIOGUAEHJPBIDFUHBIERAPDFOSBNOIFDKHBNAFGJMBVPFHBNFDIKHJDA',
    "@sancobtw on twitter",
    "@sanco on youtube",
    "thanks for the 41k views on the week 7 preview!"
];

var titleShuffle = 
[
    "the wrong way",
    "404",
    "oops",
    "page not found",
    "page not found!!!1",
    "where did it go",
    "not again",
    "not found",
    "sanic was here",
    "bondus was here"
];

var transitioning = false;

function showOffline(errorCode, errorText) 
{
    timedHandler.endTime = 25;
    var mainDiv = document.getElementById('notonline');

    timedHandler.finishCallback = () =>
    {
        document.body.addEventListener('keydown', (e) =>
        {
            if (e.key == "r")
            {
                if (transitioning || !titleShuffle.includes(document.title)) return;

                transitioning = true;
                obj3.style.opacity = 0;
                obj3.style.top = "-30px";
                var fuck = setInterval(() =>
                {
                    document.title = titleShuffle[Math.floor(Math.random() * titleShuffle.length)];
                    obj3.innerText = shuffle[Math.floor(Math.random() * shuffle.length)];
                    obj3.style.top = "0px";
                    obj3.style.opacity = 1;
                    transitioning = false;
                    clearInterval(fuck);
                }, 1000);
            }
        });
    }

    var obj1 = timedHandler.createObject("text1", "h1", "Oopsies", "animatedText");
    var obj2 = timedHandler.createObject("text2", "h2", errorText, "animatedText");
    var obj3 = timedHandler.createObject("text3", "p", shuffle[Math.floor(Math.random() * shuffle.length)], "animatedText");
    var obj4 = timedHandler.createObject("text4", "p", errorCode, "animatedTFixed");

    timedHandler.timer(0, function()
    {
        mainDiv.appendChild(obj1);
        obj1.style.zIndex = 5;

        mainDiv.appendChild(obj2);
        obj2.style.zIndex = 4;
        obj2.style.top = "-10px";

        mainDiv.appendChild(obj3);
        obj3.style.zIndex = 3;
        obj3.style.top = "-20px";

        mainDiv.appendChild(obj4);
        obj4.style.zIndex = 2;
        obj4.style.top = "-30px";
    });

    timedHandler.timer(4, function () 
    {
        obj1.style.opacity = 1;
    });

    timedHandler.timer(10, function () 
    {
        obj2.style.top = "0px";
        obj2.style.opacity = 1;
    });

    timedHandler.timer(14, function () 
    {
        obj3.style.top = "0px";
        obj3.style.opacity = 1;
    });

    timedHandler.timer(25, function ()
    {
        obj4.style.top = "0px";
        obj4.style.opacity = 0.5;
    });
}

document.addEventListener('DOMContentLoaded', () => 
{
    ["cut", "copy", "paste", "contextmenu", "drag"].forEach((val) => 
    {
        document.body.addEventListener(val, (e) => e.preventDefault());
    });

    var title = titleShuffle[Math.floor(Math.random() * titleShuffle.length)];
    var errorCode = "ERR_NOT_ASIGNED";
    var errorMsg = "Page not found";

    var searchWholeArgs = window.location.search.substring(window.location.search.indexOf("?") + 1).split("&");
    searchWholeArgs.forEach((arg) =>
    {
        var coolArgs = arg.split("=");
        coolArgs[1] = decodeURI(coolArgs[1]);
        switch(coolArgs[0])
        {
            case "err_code":
                errorCode = coolArgs[1];
                break;
            case "err_msg":
                errorMsg = coolArgs[1]; 
                break;
            case "title":
                title = coolArgs[1];
                break;
        }
    });

    document.title = title;

    showOffline(errorCode, errorMsg);
});