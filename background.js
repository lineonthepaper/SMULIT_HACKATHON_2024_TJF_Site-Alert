console.log('a');

var currentURL = null;
var isComplete;

var phishingDomains = ['example.com'];

// check if loading complete
let myPromise = new Promise(resolve => {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete'){
            isComplete = true;
            resolve();
        }
    });
});

// get domain of current tab
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (isComplete){
            try {
                const curl = new URL(changeInfo.url);
                const domain = curl.hostname;
                console.log(domain);
                if(phishingDomains.includes(domain)) {
                    console.log("BAD!!!");
                    chrome.action.setIcon({
                        path: {
                            "128": "red128.png"
                        }
                    })
                }
                else {
                    chrome.action.setIcon({
                        path: {
                            "128": "default128.png"
                        }
                    })
                }
            }
            catch(err){}
        }
    }
        /*chrome.action.setIcon({
            path : {
                "128": "pathto128.png"
            }
        })*/
    
)