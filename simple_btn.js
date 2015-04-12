(function($) {

	var Item = Backbone.Model.extend({
		defaults: function(){
			return {
				title: "title",
				description: "descr",
				viewed: false
				};
		},
		
		toggle: function(){
			this.save({viwed: !this.get("viewed")});
		}
	});
	
	var ItemsCollection = Backbone.Collection.extend({
		model: Item
	});
	
	var ItemView = Backbone.View.extend({
		tagName: "li",
		render: function(){
			$(this.el).html(this.model.get('description'));
			return this;
		}
	});
	
	var AppView = Backbone.View.extend({
		el: "body",
		
		events: {
			"click button": "addItem"
		},
		
		initialize: function(){
			this.collection = new ItemsCollection();
			this.collection.bind("add", this.appendItem);
			$(this.el).append("<ul></ul>");
			
			this.render();
		},
		
		render: function(){
			$(this.el).append("<h1>Hello</h1><button>Click me!</button>");
			var self = this;
			_(this.collection.models).each(function(item){
				self.appendItem(item)
			});
		},
		
		addItem: function(){
			var item = new Item();
			this.collection.add(item);
		},
		
		appendItem: function(item){
			var itemView = new ItemView({
				model: item
			});
			$("ul", this.el).append(itemView.render().el);
		}
	});
	
	var appView = new AppView();
})($);