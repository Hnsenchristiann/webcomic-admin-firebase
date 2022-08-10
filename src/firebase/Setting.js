import Collection from "./Collection";
import utils from "./utils";

export default class extends Collection{
    static collection = 'settings'
    static fields = {
        'value': Object
    }

    static async getUserCounter(){
        return (await this.getDocument('user_counter')).value
    }

    static async getComicCounter(){
        return (await this.getDocument('comic_counter')).value
    }

    static async getSocials(){
        return await this.getDocument('socials')
    }

    static async getBanners(){
        const banners = await this.getDocument('banners')

        for(let i = 0; i < banners.value.length; i++){
            banners.value[i].banner_image_url = await utils.getDataUrlFromStorage(banners.value[i].banner_image_url)
        }

        return banners
    }
}
