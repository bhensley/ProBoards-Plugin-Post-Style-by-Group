var PostStyleByGroup = {
  /**
   * Plugin group settings
   */
  gs: pb.plugin.get('post_style_by_member_group').settings.group_styles,

  /**
   * Default values for background properties... just in case.
   */
  bg_pos_def: 'center center',
  bg_rep_def: 'no-repeat',

  /**
   * Loop throug all posts on a page, sending each post ot set_style
   * to determine what, if anything, needs to be done.
   */
  init: function () {
    var self = this;

    $('tr.item.post').each(function () {
      let group = $(this).find('a').first().attr('class').match(/group\-(\d+)/)[1];
      self.set_style(group, this);
    })
  },

  /**
   * Is the user group of the current poster in our settings?  If so,
   * apply the applicable styles.
   */
  set_style: function (group, elem) {
    for (let i = 0, len = this.gs.length; i < len; i++) {
      if (jQuery.inArray(String(group), this.gs[i].groups) !== -1) {
        // .content represents the post content area
        let content = $(elem).find('.content').first();

        // Background been set?  If so, apply it and the support styles
        if (this.gs[i].bg_image) {
          content.css('background-image', 'url(' + this.gs[i].bg_image + ')')
            .css('background-position', (this.gs[i].bg_pos ? this.gs[i].bg_pos : this.bg_pos_def))
            .css('background-repeat', (this.gs[i].bg_rep ? this.gs[i].bg_rep : this.bg_rep_def));
        }

        // Apply bg color if it exists
        if (this.gs[i].bg_color) {
          content.css('background-color', '#' + this.gs[i].bg_color);
        }

        // Apply font color if it exists
        if (this.gs[i].font_color) {
          content.css('color', '#' + this.gs[i].font_color);
        }

        // Apply bold font if set
        if (jQuery.inArray('bold', this.gs[i].font_styles) !== -1) {
          content.css('font-weight', 'bold');
        }

        // Apply italc font if set
        if (jQuery.inArray('italic', this.gs[i].font_styles) !== -1) {
          content.css('font-style', 'italic');
        }

        // Apply underline font if set
        if (jQuery.inArray('underline', this.gs[i].font_styles) !== -1) {
          content.css('text-decoration', 'underline');
        }
      }
    }
  }
}

/**
 * Determine if we're on a screen known to display posts/messages.
 * If we are, init.  Also, keep an eye on page changes, so that pagination
 * does not break the script.
 */
$(document).ready(function () {
  switch (pb.data('route').name) {
    case 'all_recent_posts':
    case 'conversation':
    case 'thread':
      PostStyleByGroup.init();
      break;
  }

  proboards.on('pageChange', function () {
    PostStyleByGroup.init();
  });
});