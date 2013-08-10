/**
 *   Responsible for most of the cloning group. Below is an example html that should be followed to use this.
 *  It's not very flexible!
 */
(function($) {
  $.widget("ui.form_clone", {
    options: {
      remBtnLabel: '- Remove',
      afterClone: undefined
    },

    _create: function() {
      var self = this,
          el = self.element;

      $('.btn-clone', el).click(function(e) {
        e.preventDefault();
        self.add();
      });

      self.attachDelBtn();
    },

    add: function() {
      var self = this,
          el = self.element;

      var clone = $('.clone-template', el).clone();

      clone.removeClass('clone-template').addClass('clone-clone');

      var num = $('.clone-clone', el).length + 1;
      var self_id = 'form-clone-' + num;
      var found = false;
      while(found == false) {
        if ($('#' + self_id).length <= 0) {
          found = true;
        }
        else {
          num = num + 1;
          self_id = 'form-clone-' + num;
        }
      }
      
      clone.attr('id', self_id);

      clone.find('[id]').each(function() { 
        var $th = $(this);
        var newID = $th.attr('id').replace(/-0-/, '-' + num + '-');
        $th.attr('id', newID);

        var str = $th.attr('name');
        if (str != undefined) {
          str = str.replace(/\[0\]/, '[' + num + ']');
          $th.attr('name', str);
        }

        $th.val('');
      });

      // labels
      clone.find('[for]').each(function() { 
        var $th = $(this);
        var str = $th.attr('for').replace(/-0-/, '-' + num + '-');
        $th.attr('for', str);

        str = $th.attr('class').replace(/-0-/, '-' + num + '-');
        $th.attr('class', str);
      });

      var remBtn = '<a href="#" class="btn-del-clone">' + self.options.remBtnLabel + '</a>';
      clone.append(remBtn);

      var el_id = '#' + el.attr('id');
      clone.appendTo(el_id + ' .clone-group');

      // Attach the event for the new button
      self.attachDelBtn();

      // Call any callback function after the clone
      if (self.options.afterClone != undefined) {
        self.options.afterClone.call(self);  
      }
    },

    attachDelBtn: function() {
      var el = self.element;

      $('.btn-del-clone:not(.fc-processed)', el).each(function(){
        $(this).addClass('fc-processed')
        $(this).click(function(e){
          e.preventDefault();
          $(this).parent('.clone-clone').fadeOut(500, function() { $(this).remove(); });
        });
      });
    }

  });
})(jQuery);