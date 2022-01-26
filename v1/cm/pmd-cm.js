/* BUILD */

var pcmStorage = sessionStorage;

window.addEventListener('DOMContentLoaded', () => {
	pcmInt();
});

function pcmAccept() {
	pcmStorage.setItem('pmd_pcm', 'true');

	var pcmDiv = document.getElementById("pmd-pcm");
	pcmDiv.classList.remove('fadeIn');
	pcmDiv.classList.add('fadeOut');
}

function pcmInt() {
	var scripts = document.getElementsByTagName('script');
	var pmdPermalink = 'https://www.protejameusdados.com.br';

	for (script of scripts) {
		if (script.src.includes('pmd-cm.js')) {
			var pmdId = script.getAttribute('data-pmd-id');
			if (pmdId)
				pmdPermalink += '/r?p=' + pmdId;

			var dataStorage = script.getAttribute('data-storage');
			if (dataStorage == 'session')
				pcmStorage = sessionStorage;
			if (dataStorage == 'local')
				pcmStorage = localStorage;
		}
	}

	var pmdPcm = pcmStorage.getItem('pmd_pcm');
	if (pmdPcm == 'true')
		return;

	var title = "Aviso de cookies"
	var text = "Para otimizar sua experi\u00EAncia durante a navega\u00E7\u00E3o, fazemos uso de cookies. Ao continuar no site, consideramos que voc\u00EA est\u00E1 de acordo com o uso de cookies durante a navega\u00E7\u00E3o.";

	const pcmElements = [
		{
			tag: "h3",
			html: title
		},
		{
			tag: "p",
			html: text
		},
		{
			tag: "div",
			childs: [
				{
					tag: "a",
					html: "Aceitar",
					href: "javascript:pcmAccept()",
					classList: ['pmd-pcm-btn'],
					childs: [

					]
				},
				{
					tag: "a",
					classList: ['pmd-pcm-logo'],
					href: pmdPermalink,
					childs: [
						{
							tag: "img",
							src: "https://s3.us-east-2.amazonaws.com/cdn.protejameusdados.com.br/logo/pmd_icon_white.svg",
							classList: ['pmd-pcm-logo'],
						}
					]
				}
			]
		}
	];

	var pcmDiv = document.getElementById("pmd-pcm");
	if (pcmDiv == null) {
		pcmDiv = document.createElement('div');
		pcmDiv.id = 'pmd-pcm';
	}

	pcmDiv.classList.add('animated', 'fadeIn');
	pcmBuildElements(pcmDiv, pcmElements);

	/* CSS */
	
	var pcmLink = document.createElement('link');
	pcmLink.rel = 'stylesheet';
	
	var cssFile = pcmDiv.getAttribute('data-css-file');
	if (!(cssFile))
		cssFile = 'https://cdn.jsdelivr.net/gh/protejameusdados/cm@latest/pmd-cm.css';

	pcmLink.href = cssFile;

	var pcmHead = document.getElementsByTagName('HEAD')[0];
	pcmHead.appendChild(pcmLink);

	/* APPEND DIV */

	var pcmBody = document.getElementsByTagName('body')[0];
	pcmBody.appendChild(pcmDiv);


	/* FUNCTION */
	
	function pcmBuildElements(parent, childs) {
		for (item of childs) {
			var obj = document.createElement(item.tag);
			parent.appendChild(obj);

			if (item.id)
				obj.id = item.id;

			if (item.html)
				obj.innerHTML = item.html;

			if (item.text)
				obj.text = item.text;

			if (item.href)
				obj.href = item.href;

			if (item.src)
				obj.src = item.src;

			if (item.classList)
				obj.classList.add(item.classList);

			if (item.childs)
				pcmBuildElements(obj, item.childs);
		}
	}
}