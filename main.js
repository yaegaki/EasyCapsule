function onClickHandler(info, tab) {

	if (info.menuItemId == "selection") {
		chrome.tabs.getSelected(null, tab => {
			chrome.tabs.executeScript(tab.id, { file: 'script.js' }, function () {
			});
		});
	}
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		"title": "カプセル化!!!",
		"contexts": [　"selection"　],
		"id": "selection"
	});
});