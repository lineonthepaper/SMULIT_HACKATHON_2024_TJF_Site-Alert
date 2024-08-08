var currentURL = null;
var isComplete;

//example list of phishing domains
var phishingDomains = ['example.com'];

//example list of trusted domains
var trustedDomains = ['www.google.com'];

// check if loading complete
let loadingCheck = new Promise(resolve => {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete'){
            isComplete = true;
            resolve();
        }
    });
});

// get domain of current tab and update icon
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
                else if (trustedDomains.includes(domain)) {
                    console.log("Good!!");
                    chrome.action.setIcon({
                        path: {
                            "128": "green128.png"
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
)