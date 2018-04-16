function getAllNode(anchor, focus) {
	let memo = [];
	if (!getAllNodeCore(anchor, focus, memo)) {
		return [];
	}
	return memo;
}

function getAllNodeCore(anchor, focus, memo) {
	memo.push(anchor);
	if (anchor == focus) {
		return true;
	}
	
	let temp = anchor;
	while (temp != null && temp.nextSibling == null) {
		temp = temp.parentNode;
		if (temp == focus) {
			return true;
		}
	}
	
	if (temp == null || temp.nextSibling == null) {
		return false;
	}
	temp = temp.nextSibling;
	if (temp == focus) {
		return true;
	}
	
	// 一番下まで掘る
	while (temp.childNodes.length > 0) {
		temp = temp.childNodes[0];
		if (temp == focus) {
			return true;
		}
	}
	
	return getAllNodeCore(temp, focus, memo);
}

function ReplaceToCapsule() {
	let selObj = getSelection();
	let anchor = selObj.anchorNode;
	let focus = selObj.focusNode;
	let anchorOffset = selObj.anchorOffset;
	let focusOffset = selObj.focusOffset;
	let nodes = [];
	try
	{
		nodes = getAllNode(anchor, focus);
	}
	catch (e)
	{
	}
	if (nodes.length == 0) {
		// 逆かもしれない
		let temp = anchor;
		anchor = focus;
		focus = temp;
		nodes = getAllNode(anchor, focus);
		let tempOffset = anchorOffset;
		anchorOffset = focusOffset;
		focusOffset = tempOffset;
	}

	if (anchorOffset > focusOffset && anchor == focus) {
		let tempOffset = anchorOffset;
		anchorOffset = focusOffset;
		focusOffset = tempOffset;
	}

	nodes.forEach(node =>
	{
		var len = node.textContent.replace(/\s/g, "").length;
		if (len > 0) {
			if (node == anchor && node == focus) {
				node.textContent = node.textContent.substr(0, anchorOffset) +
				getCapsule(focusOffset-anchorOffset) +
				node.textContent.substr(focusOffset);
			}
			else if (node == anchor) {
				node.textContent = node.textContent.substr(0, anchorOffset) +
				getCapsule(node.textContent.length-anchorOffset);
			}
			else if (node == focus) {
				node.textContent = getCapsule(focusOffset) +
				node.textContent.substr(focusOffset);
			}
			else {
				node.textContent = getCapsule(len);
			}
		}
	});
}

function getCapsule(len) {
	var c = "💊";
	var s = "";
	for (let i = 0; i < len; i++) s += c;
	return s;
}


ReplaceToCapsule();
