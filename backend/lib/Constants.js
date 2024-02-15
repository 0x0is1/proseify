module.exports = class Constants {
    constructor (){
        this.access_token = null;
        this.BASEURL1 = "https://prod.pratilipicomics.com";
        this.BASEURL2 = "https://prod.pratilipi.com";
        this.STATICURL = "https://static-assets.pratilipi.com";
        this.ICONURL = "https://static-pratilipicomic.s3.ap-south-1.amazonaws.com/assets/comics-logo-copy-04.png";
        this.TOKENURL = "https://gamma.pratilipi.com/api/user/accesstoken";
        this.languages = [
            "HINDI",
            "ENGLISH",
            "GUJARATI",
            "MARATHI",
            "TAMIL",
        ];
        this.PROXY_URL = "https://cors-proxy.0x0is1.repl.co/proxy";

        this.home_url = (limit=100, language_code=0)=>{
            return `${this.BASEURL1}/comics/init/v4.3/comic-Webhome?limit=${limit}&language=${this.languages[language_code]}&bucketId=10`;
        }
        this.category_url = (slug_id, offset, limit) => {
            return `${this.BASEURL1}/pratilipis/v2.2?slug=${slug_id}&state=PUBLISHED&offset=${offset}&limit=${limit}`;
        }
        this.series_url = (slug_id) => {
            return `${this.BASEURL1}/series/v1.2?slug=${slug_id}`;
        }
        this.content_url = (pid) => {
            return `${this.BASEURL2}/api/pratilipi/content?pratilipiId=${pid}&_apiVer=4`
        }
        this.image_url = (pid, img_id) => {
            return `${this.STATICURL}/pratilipi/content/image?pratilipiId=${pid}&name=${img_id}&width=600`
        }
        this.make_request = async (url, req_type="GET", body=null, headers={}) => {
            try {
                const data = await fetch(url, {
                    method: req_type,
                    body: body,
                    headers: {
                        ...headers,
                        "access-token": this.access_token
                    },
                });
                let jsonData;
                try {
                    jsonData = await data.json();
                    return jsonData;
                } catch (error) {
                    return {url};
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                return null;
            }
        }
        this.make_request(this.TOKENURL).then(data=>{
            this.access_token = data.accessToken;
        })

    }
}