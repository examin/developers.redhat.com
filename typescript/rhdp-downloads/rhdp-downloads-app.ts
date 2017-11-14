class RHDPDownloadsApp extends HTMLElement {
    constructor() {
        super();
    }

    _url;

    popularProduct = new RHDPDownloadsPopularProducts();
    products = new RHDPDownloadsProducts();

    get url() {
        return this._url;
    }


    set url(val) {
        if (this._url === val) return;
        this._url = val;
        this.setAttribute('url', this.url);
    }

    template = `<div class="hero hero-wide hero-downloads">
                    <div class="row">
                        <div class="large-12 medium-24 columns" id="downloads">
                            <h2>Downloads</h2>
                        </div>
                    </div>
                </div>
                <div class="most-popular-downloads">
                    <div class="row">
                        <div class="large-24 column">
                            <h3>Most Popular</h3>
                        </div>
                    </div>
                
                    <div class="row">
                    </div>
                </div>
                <div class="row" id="downloads">
                    <div class="large-24 columns">
                        <h3 class="downloads-header">All Downloads</h3>
                    </div>
                </div>`;



    connectedCallback() {
        this.innerHTML = this.template;
        this.setProductsDownloadData(this.url);

    }

    addGroups(productList){
        this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('accelerated_development_and_management','ACCELERATED DEVELOPMENT AND MANAGEMENT', productList));
        this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('developer_tools','DEVELOPER TOOLS', productList));
        this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('infrastructure','INFRASTRUCTURE', productList));
        this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('integration_and_automation','INTEGRATION AND AUTOMATION', productList));
        this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('mobile','MOBILE', productList));
        this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('cloud','CLOUD', productList));
        this.querySelector('#downloads .large-24').appendChild(this.downloadsAllFactory('runtimes','LANGUAGES AND COMPILERS', productList));

    }

    setPopularProducts(productList){
        this.popularProduct.productList = productList.products;
        this.querySelector('.most-popular-downloads .row').appendChild(this.popularProduct);

    }

    downloadsAllFactory(id, heading, productList){
        var downloads = new RHDPDownloadsAll();
        downloads.id = id;
        downloads.heading = heading;
        downloads.products = productList;

        return downloads;
    }

    setProductsDownloadData(url) {
        fetch(url, {headers : 'application/json'})
            .then((resp) => resp.json())
            .then((data) => {
                this.products.data = data;
                this.setPopularProducts(this.products);
                this.addGroups(this.products);

            });
    }

    static get observedAttributes() { 
        return ['url'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

}