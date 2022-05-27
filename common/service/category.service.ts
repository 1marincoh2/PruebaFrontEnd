import { Api } from "../Axios.config";

export default class ProductService {
  private http = Api.Http;

  public async productCategoryGet() {
    return await this.http.get("product-category").then((res) => res.data);
  }

  public async productGet() {
    return await this.http.get("product").then((res) => res.data);
  }
}