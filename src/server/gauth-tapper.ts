import { gauth_tapper_create_question, gauth_tapper_get_solution, gauth_tapper_upload_image } from "./gauth-requests";

export class GauthTapper {
    private device_id: string = "1234567890123456789";
    private device_platform = "web";
    private sub_platform = "web";
    private _region = "tw";
    private app_region = "tw";
    private app_name = "ehi_overseas";
    private language = "en";
    
    private _continent = "eu";
    private _subdivision = "6269131";
    private _city = "3333158";

    constructor() {
        this.randomize_device_id();
    }
  
    private randomize_device_id() {
        const digits = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10));
        this.device_id = digits.join('');
    }
  
    private get_url_parameters(): Record<string, string> {
        const url_parameters = {
            device_id: this.device_id,
            device_platform: this.device_platform,
            sub_platform: this.sub_platform,
            _region: this._region,
            app_region: this.app_region,
            app_name: this.app_name,
            language: this.language,
        }
        return url_parameters
    }
  
    private get_cookie_parameters(): Record<string, string> {
        const cookie_parameters = {
            _region: this._region,
            app_region: this.app_region,
            _continent: this._continent,
            _subdivision: this._subdivision,
            _city: this._city,
            device_id: this.device_id,
        }
        return cookie_parameters
    }
  
    public async answer_question(question_image: Base64URLString) {
        this.randomize_device_id()

        const uploaded_image_data = await gauth_tapper_upload_image(question_image, this.get_url_parameters())
        if (!uploaded_image_data) return null

        //await new Promise(resolve => setTimeout(resolve, 1500));

        const uploaded_question_id = await gauth_tapper_create_question(uploaded_image_data, this.get_url_parameters())
        if (!uploaded_question_id) return null

        await new Promise(resolve => setTimeout(resolve, 2500));

        const end_time = Date.now() + 2500 // 2.5 seconds

        while (Date.now() < end_time) {
            const solution_data = await gauth_tapper_get_solution(uploaded_question_id, this.get_url_parameters(), this.get_cookie_parameters())
            if (solution_data.ContentInfo.Answer) return solution_data
        }

        return null
    }
}