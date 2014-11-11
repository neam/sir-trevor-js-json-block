/**
 * Created by motin on 2014-11-11.
 */

SirTrevor.Blocks.Json = (function () {

    return SirTrevor.Block.extend({

        // String; Names the block
        // Note – please use underscores when naming
        // Eg example_block should be ExampleBlock
        type: 'json',

        // Function; the title displayed in the toolbar
        // Can return a translated string (if required)
        title: function () {
            return i18n.t('blocks:json:title');
        },
        icon_name: 'json',

        formattable: false,

        toData: function () {
            var dataObj = {};
            var json = this.getTextBlock().html();
            if (json !== '') {
                dataObj = JSON.parse(json);
            }
            this.loadData(dataObj);
            this.setData(dataObj);
        },

        editorHTML: function () {
            return "<code><pre class='st-text-block prettyprint linenmus' contenteditable='true'></pre></code>";
        },

        // Array; defines custom validator methods to call
        validations: ['myCustomValidator'],

        // Example custom validator
        myCustomValidator: function () {
            var field = this.$('.a-field');

            if (field.val() === 'herp derp') {
                this.setError(field, "A validation fail message");
            }
        },

        // Function; Executed on render of the block if some data is provided.
        // LoadData gives us a means to convert JSON data into the editor dom
        // In this example we convert the text from markdown to HTML and show it inside the element
        loadData: function (data) {
            this.getTextBlock().html(this.toHTML(data));
        },

        // Function; Returns true or false whether there is data in the block
        isEmpty: function () {
            return _.isEmpty(this.saveAndGetData()); // Default implementation
        },

        // Function; Any extra markdown parsing can be defined in here.
        // Returns; String (Required)
        toMarkdown: function (markdown) {
            return markdown.replace(/^(.+)$/mg, "> $1");
        },

        // Function; Any extra HTML parsing can be defined in here.
        // Returns; String (Required)
        toHTML: function (data) {
            return JSON.stringify(data, null, 4);
        }
    });

})();