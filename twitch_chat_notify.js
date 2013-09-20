/* Alert when broadcaster or specified person enters something into chat
 * Configure the chat sender username and/or the start of the chat text 
 * to play a notification. If the name isn't specified, it will assume
 * the streamer's name. If no chat text is specified, it will play the
 * notification each time that person sends a chat.
 * 
 * TODO: 
 * After configured event fires, submit a specified message into chat
 * Parse separate event for win
 * 
 * Potential notification sounds:
 * 'Yoo hoo' http://www.sounddogs.com/previews/51/mp3/478889_SOUNDDOGS__ri.mp3
 * 'Trampoline' http://www.sounddogs.com/previews/51/mp3/478912_SOUNDDOGS__ri.mp3
 */

/* Streamer Notes:
 * RavenKnot: User Rkbot enters raffle results.
 * Lexyu: Cecipez can start raffle too. Lexbot lists winners?
 * Dacapitalist: VIEWER GIVEAWAYS ARE NOW OPEN!!! -- Type !makeitrain for a chance to spin!!! 3 X Winners comin up!
 */

(function($) {
    
    // Configure notification
    var chat_name = '',
        chat_text = '!raffle',
        notification_url = 'http://www.sounddogs.com/previews/51/mp3/478912_SOUNDDOGS__ri.mp3';
    
    // Configure selectors
    var chatbox_selector = '#chat_line_list',
        broadcaster_selector = 'span.broadcaster',
        chat_line_selector = 'span.chat_line';
    
    // if no chat name is specified (empty string), it will grab the streamer's name from document title
    if (!chat_name) {
        chat_name = document.title;
    }
    
    // overwriting the append function to trigger the 'append' event
    var orig_append = $.fn.append;
    $.fn.append = function () {
        return orig_append.apply(this, arguments).trigger('append');
    };
    
    var play_notification = function () {
        $('body embed').remove();
        $('body').append('<embed src="' + notification_url + '" autostart="true" hidden="true">');
    };
    
    // bind append listener to check if config conditions are met to notify
    $(chatbox_selector).bind('append', function () {
        var chat_line = $(chatbox_selector + ' li:last');
        var chat_sender = chat_line.attr('data-sender');
        if (chat_sender && chat_sender.toLowerCase() == chat_name.toLowerCase()) {
            // if chat text is not specified (empty string) it will always run the notification when matched chat name
            if (chat_text) {
                // return without running notification if the text doesn't match
                var chat_line_text = chat_line.find(chat_line_selector).text().trim();
                if (typeof chat_line_text != 'string' || !chat_line_text.match('^'+chat_text)) return;
            }
            play_notification();
        }
    });
    
})(jQuery);
