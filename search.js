//--------------------FOOD SEARCHER------------------------//
function getsource(id){
    $.ajax({
    url:"https://api.spoonacular.com/recipes/"+id+"/information?apiKey=db254b5cd61744d39a2deebd9c361444",
    success: function(res) {
    
    document.getElementById("sourceLink").innerHTML=res.sourceUrl
    document.getElementById("sourceLink").href=res.sourceUrl
    }
    });
    }
    
    function getrecepe(q){
    $.ajax({
    url:"https://api.spoonacular.com/recipes/search?apiKey=db254b5cd61744d39a2deebd9c361444&number=1&query="+q,
    success: function(res) {
    
    document.getElementById("output").innerHTML="<h1>"+res.results[0].title+"</h1><br><img src='"+res.baseUri+res.results[0].image+"' width='400' /><br><p>Preparation Time: "+res.results[0].readyInMinutes+" minutes</p>"
    getsource(res.results[0].id)
    }
    });
    }

//--------------------------INGREDIENT/MEAL PRICING-----------------------//
var app = new Vue({
    el: '#app',
    mounted() {
    },
    data: function () {
        return {
            spoonacularApiKey: '355eac413c2f4c769c22e4d2691ee905', 
            servings: 1,
            viewStyle: 2,
            ingredients: '',
        };
    },
    methods: {
        previewPriceWidget() {
            var postContent = this.ingredients;

            let self = this;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    self.previewWidgetCallback(xmlHttp.responseText);
                }
            }
            xmlHttp.open("POST", 'https://api.spoonacular.com/recipes/visualizePriceEstimator?apiKey=' + this.spoonacularApiKey, true);
            xmlHttp.send('defaultCss=true&servings=' + this.servings + '&mode=' + this.viewStyle + '&ingredientList=' + postContent);
        },

        previewWidgetCallback(response) {
            var el = document.createElement("script");
            el.setAttribute("type", "text/javascript");
            el.setAttribute("src", "https://code.jquery.com/jquery-1.9.1.min.js");
            document.getElementById('previewWidget').contentDocument.head.appendChild(el);

            el = document.createElement("script");
            el.setAttribute("type", "text/javascript");
            el.setAttribute("src", "https://spoonacular.com/application/frontend/js/jquery.canvasjs.min");
            document.getElementById('previewWidget').contentDocument.head.appendChild(el);

            // wait until jquery is loaded
            setTimeout(function () {
                var el = document.createElement("script");
                el.setAttribute("type", "text/javascript");
                el.setAttribute("src", "https://spoonacular.com/application/frontend/js/ingredientWidget.min.js?c=1");
                document.getElementById('previewWidget').contentDocument.body.appendChild(el);

                var iframeDocument = document.getElementById('previewWidget').contentDocument;
                iframeDocument.open();
                iframeDocument.write(response);
                iframeDocument.close();
            }, 1000);
        },
    },
});

