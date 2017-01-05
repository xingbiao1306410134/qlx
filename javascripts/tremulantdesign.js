(function(d, w, jQuery){

    jQuery.prototype.extend({

        contextualize: function() {

            return this.each(function(){

                var s = $(this);
                
               
                $("form.validate", s).validate();

            });

        },

        validate: function() {

            return this.each(function(){

                var self = $(this);

                self.attr("novalidate", "novalidate").on('submit', function() {

                    var alert_on = true;
                    var msg = '';
                    var valid = true;
                    var email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/i;

                    $(".error", self).removeClass("error");

                    self.find("[required]").each(function() {

                        var req_elem = $(this);

                        if(req_elem.hasClass("inputgroup")) {
                            var value = $(":checked", req_elem).length ? "Checked" : "";
                        } else {
                            var value = req_elem.val();
                        }

                        if(value == "" || (req_elem.prop("title") && value == req_elem.prop("title")) || (req_elem.is('.email,[type="email"]') && !email_pattern.test(value))) {
                            valid = false;
                            var label = req_elem.prev("label").text() || req_elem.prop("title");
                            msg += '\n-> '+label.replace(/[\*|:]/gi, "")+' is required';
                            req_elem.addClass("error");
                        }
                    });

                    if(!valid) {

                        $(".error:first").not('input[type="hidden"]').focus();

                        if(alert_on) {
                            alert('Please fill in these fields. Thanks.'+msg);
                        } else {
                            $(".error-message", this).show().css('visibility', 'visible');
                        }

                        return false;
                    }

                    if(self.hasClass("ajax")) {
                        
                        var action = self.attr("action"),
                            datastr = self.serialize() + "&type=json&form=" + ( (self.attr("id") != undefined) ? self.attr("id").replace(/-/g, "").toLowerCase() : "undefined" ),
                            query = (self.hasClass("mailer")) ? $("body").attr("data-path-php") + "mai"+"ler"+"."+"php" : action,
                            submit = $('input[type="submit"]', self);

                        $.ajax({
                            type: "POST",
                            url: query,  
                            data: datastr,
                            dataType: "json",
                            success: function(data){

                                var type = data.type.toString();

                                if(type == 'success') {
                                    self.clearForm();
                                    submit.attr("value", "Thanks!");
                                } else if(type == 'error') {
                                    alert(data.msg);
                                }
                                
                                if(data.redirect != undefined) {
                                    location.href = data.redirect.toString();
                                }
                            },
                            complete: function(jqXHR, textStatus) {
                                
                            }
                        });

                        return false;

                    }

                });

            });

        },

        clearForm: function() {
            return this.each(function() {
                $("label.placeholder", this).not(".hide").removeClass("blur").show();
                var type = this.type, tag = this.tagName.toLowerCase();
                if (tag == 'form')
                    return $(':input',this).clearForm();
                if (type == 'text' || type == 'password' || type == 'email' || tag == 'textarea') {
                    if($(this).attr('title')) {
                        this.value = $(this).attr('title');
                    } else {
                        this.value = '';
                    }
                } else if (type == 'checkbox' || type == 'radio') {
                    this.checked = false;
                } else if (tag == 'select') {
                    this.selectedIndex = 0;
                }
            });
        }

    });

    $(d).ready(function(){

        var s = $(this),
        path_js = $('body').attr("data-path-js"),
        scripts = [
            //path_js + "jquery.name.js",
        ];

        if(scripts.length > 0) {

            $.getScript(scripts, function(data, textStatus) {
                $(d).contextualize();
            });

        } else $(d).contextualize();

    });

})(document, window, jQuery);
