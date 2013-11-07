var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "voisin"	: "list",
        "voisin/page/:page"	: "list",
        "voisin/add"         : "addVoisin",
        "voisin/:id"         : "voisinDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var voisinList = new VoisinCollection();
        wineList.fetch({success: function(){
            $("#content").html(new VoisinListView({model: voisinList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    allovoisinDetails: function (id) {
        var voisin = new Voisin({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new VoisinView({model: voisin}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addVoisin: function() {
        var voisin = new Voisin();
        $('#content').html(new Voisin({model: voisin}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'VoisinView', 'VoisinListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});