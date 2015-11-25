function flipnews() {
	'use strict';

	function updateNews() {
		var url = window.location.protocol + '//' + window.location.host;
		var $newsRequest = $.getJSON(url + '/app/data', {format: 'json'});

		$newsRequest.done(function(response) {
			var news = response.news;
			var $appContentDiv = $('#app_content');
			$appContentDiv.empty();

			news.forEach(function(item) {
				if (item !== null) {
					//---------------------------------------------------------
					var $timeHolderDiv = $('<div>');
					
					var $timeIconImg = $('<img>', { src: 'images/time.png' });
					$timeIconImg.addClass('time_icon');
					
					var $timeParagraph = $('<p>');
					$timeParagraph.addClass('time');
					$timeParagraph.text(item.time);

					$timeHolderDiv.append($timeIconImg);
					$timeHolderDiv.append($timeParagraph);

					//---------------------------------------------------------
					var $titleContainerDiv = $('<div>');
					$titleContainerDiv.addClass('title_container');

					var $titleH2 = $('<h2>');

					var $titleTextDiv = $('<div>');
					$titleTextDiv.addClass('news_title link');
					$titleTextDiv.text(item.title);

					$titleH2.append($titleTextDiv);

					$titleContainerDiv.append($titleH2);

					//---------------------------------------------------------
					var $sourceDiv = $('<div>');
					$sourceDiv.addClass('source');

					var $sourceImageContainerDiv = $('<div>');
					$sourceImageContainerDiv.addClass('source_img_container');

					var $sourceImg = $('<img>', { src: item.source.image });
					$sourceImg.addClass('news_source_img');

					$sourceImageContainerDiv.append($sourceImg);

					var $infoSourceDiv = $('<div>');
					$infoSourceDiv.addClass('info_source');

					var $infoSourceInnerDiv = $('<div>');

					var $sourceLabel = $('<p>');
					$sourceLabel.html('Source:');

					var $sourceName = $('<p>');
					$sourceName.html(item.source.name);

					$infoSourceInnerDiv.append($sourceLabel);
					$infoSourceInnerDiv.append($sourceName);
					$infoSourceDiv.append($infoSourceInnerDiv);
					
					var $likesDiv = $('<div>');
					$likesDiv.addClass('likes');

					var $likesImg = $('<img>', { src: 'images/like.png' });

					$likesDiv.append($likesImg);
					$likesDiv.append(item.likes);
					
					$sourceDiv.append($sourceImageContainerDiv);
					$sourceDiv.append($infoSourceDiv);
					$sourceDiv.append($likesDiv);
					
					//---------------------------------------------------------
					var $anchor = $('<a>', { target: '_blank', href: item.url });

					$anchor.append($timeHolderDiv);
					$anchor.append($titleContainerDiv);
					$anchor.append($sourceDiv);

					//---------------------------------------------------------
					var backgroundImage = 'url(' + item.image + ')';
					var $newsDiv = $('<div>');
					$newsDiv.addClass('news');
					$newsDiv.css('background', 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ' + backgroundImage);
					$newsDiv.css('background-position', 'center center');
					$newsDiv.css('background-repeat', 'none');
					$newsDiv.css('-webkit-background-size', 'cover');
					$newsDiv.css('-moz-background-size', 'cover');
					$newsDiv.css('background-size', 'cover');
					$newsDiv.css('-o-background-size', 'cover');

					$newsDiv.append($anchor);

					$newsDiv.hide();
					$appContentDiv.append($newsDiv);
					$newsDiv.fadeIn('slow');
				}
			});
		});
	}

	$('#updateNews').on('click', function() { updateNews(); });

	updateNews();
}

$(document).ready(flipnews);